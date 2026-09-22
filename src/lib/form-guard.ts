/* ------------------------------------------------------------------ */
/*  Shared hardening for the site's public form endpoints.             */
/*                                                                      */
/*  Extracted from the lead route so a second endpoint cannot quietly   */
/*  ship with weaker checks than the first. Server-only: never import   */
/*  this from a client component.                                       */
/* ------------------------------------------------------------------ */

import { NextResponse } from "next/server";
import { z } from "zod";

/** Reject anything larger than this before parsing. A real submission is far under it. */
export const MAX_BODY_BYTES = 16 * 1024;

/** Forms completed faster than this are automated. */
export const MIN_FILL_MS = 3000;

export const json = (body: unknown, status: number) => NextResponse.json(body, { status });

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

/**
 * Per-IP fixed-window limiter.
 *
 * A factory rather than a shared map on purpose: each endpoint gets its own
 * bucket, so filling in the lead form never spends a visitor's budget for the
 * contributor pitch, and abuse of one cannot lock the other.
 *
 * In-memory, per serverless instance — it stops casual scripted abuse but
 * resets on cold start and is not shared across regions. For a durable limit,
 * back this with Upstash Redis.
 */
export function createRateLimiter({ windowMs, max }: { windowMs: number; max: number }) {
  const hits = new Map<string, number[]>();

  return function rateLimited(ip: string): boolean {
    const now = Date.now();
    const cutoff = now - windowMs;
    const recent = (hits.get(ip) ?? []).filter((t) => t > cutoff);
    // Bound memory on long-lived instances.
    if (hits.size > 5000) hits.clear();
    if (recent.length >= max) {
      hits.set(ip, recent);
      return true;
    }
    recent.push(now);
    hits.set(ip, recent);
    return false;
  };
}

/** Strips CR and LF so no field can inject an extra mail header. */
export const singleLine = (max: number) =>
  z
    .string()
    .max(max, `Keep this under ${max} characters.`)
    .transform((s) => s.replace(/[\r\n]+/g, " ").trim());

/**
 * For fields that land in the mail *body*, where newlines are legitimate.
 * Line endings are normalised and runs of blank lines collapsed, so a pasted
 * document cannot balloon the message.
 */
export const multiLine = (max: number) =>
  z
    .string()
    .max(max, `Keep this under ${max} characters.`)
    .transform((s) => s.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim());

/**
 * An optional http(s) URL. Rejects other schemes outright — `javascript:` and
 * `data:` links have no business arriving in a notification email that someone
 * on the team is going to click.
 */
export const optionalUrl = (max: number) =>
  singleLine(max)
    .refine((v) => v === "" || /^https?:\/\/\S+$/i.test(v), { message: "Enter a full link starting with https://" })
    .optional()
    .default("");

/** Turns a ZodError into `{ field: firstMessage }` for the client to show inline. */
export function fieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const fields: Record<string, string> = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "form");
    if (!fields[key]) fields[key] = issue.message;
  }
  return fields;
}

/** Method restriction helper. No CORS headers are set, so browsers keep these same-origin. */
export const methodNotAllowed = () =>
  NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405, headers: { Allow: "POST" } });

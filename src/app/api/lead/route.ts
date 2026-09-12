import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { NEEDS, ORG_TYPES, PROVIDER_COUNTS } from "@/data/content";
import { CONTACT } from "@/data/site";

/**
 * Lead form endpoint — the only write path on the site.
 *
 * Server-only. Every secret is read from process.env inside this handler and
 * is never imported into a client component. No NEXT_PUBLIC_ variable is used
 * or permitted here.
 *
 * Required environment variables (see .env.example):
 *   LEAD_SMTP_HOST, LEAD_SMTP_PORT, LEAD_SMTP_USER, LEAD_SMTP_PASS
 *   LEAD_TO    — where submissions are delivered (defaults to CONTACT.email)
 *   LEAD_FROM  — envelope sender (defaults to LEAD_SMTP_USER)
 *
 * When SMTP is not configured the route answers 503 with { configured: false }
 * and the browser falls back to opening the visitor's mail client with the
 * details prefilled, so a lead is never silently dropped.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Reject anything larger than this before parsing. A real submission is well under 2 KB. */
const MAX_BODY_BYTES = 8 * 1024;

/** Forms completed faster than this are automated. */
const MIN_FILL_MS = 3000;

/** Generous enough for a clinic behind one NAT address, tight enough to stop scripted abuse. */
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 10 };

/* ------------------------------------------------------------------ */
/*  Rate limiting                                                      */
/*                                                                      */
/*  In-memory, per serverless instance. It stops casual scripted abuse  */
/*  but resets on cold start and is not shared across regions. For a    */
/*  durable limit, swap the two marked lines for Upstash Redis — see    */
/*  the note in README under "Lead form".                              */
/* ------------------------------------------------------------------ */
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT.windowMs;
  const recent = (hits.get(ip) ?? []).filter((t) => t > cutoff);
  // Bound memory on long-lived instances.
  if (hits.size > 5000) hits.clear();
  if (recent.length >= RATE_LIMIT.max) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

/* ------------------------------------------------------------------ */
/*  Validation                                                         */
/* ------------------------------------------------------------------ */

/** Strips CR and LF so no field can inject an extra mail header. */
const singleLine = (max: number) =>
  z
    .string()
    .max(max, `Keep this under ${max} characters.`)
    .transform((s) => s.replace(/[\r\n]+/g, " ").trim());

const oneOf = (values: readonly string[], label: string) =>
  singleLine(80).refine((v) => values.includes(v), { message: `Choose a valid ${label}.` });

const LeadSchema = z.object({
  name: singleLine(120).pipe(z.string().min(1, "Your name is required.")),
  email: singleLine(254).pipe(z.email("Enter a valid work email address.")),
  organization: singleLine(160).pipe(z.string().min(1, "Your organization is required.")),
  phone: singleLine(40).optional().default(""),
  org: oneOf(ORG_TYPES, "organization type"),
  providers: oneOf(PROVIDER_COUNTS, "provider count"),
  need: oneOf(NEEDS, "service"),
  page: singleLine(300).optional().default(""),
  /** Honeypot. Real visitors never see or fill this. */
  website: z.string().max(200).optional().default(""),
  /** Milliseconds the visitor spent on the form, measured client-side. */
  elapsedMs: z.number().int().nonnegative().max(86_400_000).optional().default(0),
});

/* ------------------------------------------------------------------ */
/*  Handler                                                            */
/* ------------------------------------------------------------------ */

const json = (body: unknown, status: number) => NextResponse.json(body, { status });

export async function POST(req: Request) {
  // 1. Body size cap, before any parsing.
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return json({ ok: false, error: "Request too large." }, 413);

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: "Request too large." }, 413);

  // 2. Rate limit per IP.
  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a few minutes." },
      { status: 429, headers: { "Retry-After": String(RATE_LIMIT.windowMs / 1000) } },
    );
  }

  // 3. Parse.
  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // 4. Validate.
  const result = LeadSchema.safeParse(parsedJson);
  if (!result.success) {
    const fields: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fields[key]) fields[key] = issue.message;
    }
    return json({ ok: false, error: "Please check the highlighted fields.", fields }, 400);
  }
  const lead = result.data;

  // 5. Bot checks — accept silently so automation learns nothing.
  if (lead.website.trim()) return json({ ok: true }, 200);
  if (lead.elapsedMs > 0 && lead.elapsedMs < MIN_FILL_MS) return json({ ok: true }, 200);

  // 6. Delivery.
  const host = process.env.LEAD_SMTP_HOST;
  const user = process.env.LEAD_SMTP_USER;
  const pass = process.env.LEAD_SMTP_PASS;
  if (!host || !user || !pass) {
    console.error("[lead] SMTP is not configured — submission not delivered");
    return json({ ok: false, configured: false }, 503);
  }

  const port = Number(process.env.LEAD_SMTP_PORT ?? 587);
  const to = process.env.LEAD_TO ?? CONTACT.email;
  const from = process.env.LEAD_FROM ?? user;

  const body = [
    "New revenue audit request",
    "",
    `Name:          ${lead.name}`,
    `Work email:    ${lead.email}`,
    `Organization:  ${lead.organization}`,
    `Phone:         ${lead.phone || "—"}`,
    "",
    `Organization type: ${lead.org}`,
    `Providers:         ${lead.providers}`,
    `Needs help with:   ${lead.need}`,
    "",
    `Submitted from: ${lead.page || "—"}`,
    `Received:       ${new Date().toISOString()}`,
  ].join("\n");

  try {
    const transport = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
    await transport.sendMail({
      from,
      to,
      replyTo: lead.email,
      // Static subject: no user input reaches a mail header.
      subject: "New revenue audit request — Mindlox AI website",
      text: body,
    });
    return json({ ok: true }, 200);
  } catch (err) {
    // Log a short, redacted summary. Never the transport config or credentials.
    const reason = err instanceof Error ? `${err.name}: ${err.message}` : "unknown error";
    console.error(`[lead] delivery failed — ${reason}`);
    return json({ ok: false, error: "We could not send your request just now. Please email us directly." }, 502);
  }
}

/* Method restriction. No CORS headers are set, so browsers keep this same-origin. */
const methodNotAllowed = () =>
  NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405, headers: { Allow: "POST" } });

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const HEAD = methodNotAllowed;

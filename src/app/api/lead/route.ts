import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { NEEDS, ORG_TYPES, PROVIDER_COUNTS } from "@/data/content";
import { CONTACT } from "@/data/site";
import { MIN_FILL_MS, clientIp, createRateLimiter, fieldErrors, json, methodNotAllowed, singleLine } from "@/lib/form-guard";

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

/**
 * Generous enough for a clinic behind one NAT address, tight enough to stop
 * scripted abuse. Its own bucket, separate from the contributor pitch form.
 */
const rateLimited = createRateLimiter({ windowMs: 10 * 60 * 1000, max: 10 });

const RETRY_AFTER_SECONDS = 600;

/* ------------------------------------------------------------------ */
/*  Validation                                                         */
/* ------------------------------------------------------------------ */

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
      { status: 429, headers: { "Retry-After": String(RETRY_AFTER_SECONDS) } },
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
    return json({ ok: false, error: "Please check the highlighted fields.", fields: fieldErrors(result.error.issues) }, 400);
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
export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const HEAD = methodNotAllowed;

import nodemailer from "nodemailer";
import { z } from "zod";
import { CONTACT } from "@/data/site";
import {
  MAX_BODY_BYTES,
  MIN_FILL_MS,
  clientIp,
  createRateLimiter,
  fieldErrors,
  json,
  methodNotAllowed,
  multiLine,
  optionalUrl,
  singleLine,
} from "@/lib/form-guard";

/**
 * Contributor pitch endpoint — "Write for us" on the blog.
 *
 * Deliberately does not accept file uploads. A pitch is a few hundred words
 * of plain text; the draft itself arrives by email afterwards, which keeps
 * this route free of upload storage, virus scanning, and a much larger attack
 * surface for the sake of a step that happens a handful of times a month.
 *
 * Server-only. Secrets are read from process.env inside the handler and never
 * imported into a client component. Reuses the lead form's SMTP account:
 *   LEAD_SMTP_HOST, LEAD_SMTP_PORT, LEAD_SMTP_USER, LEAD_SMTP_PASS
 *   PITCH_TO  — where pitches are delivered (defaults to LEAD_TO, then CONTACT.email)
 *   LEAD_FROM — envelope sender (defaults to LEAD_SMTP_USER)
 *
 * With SMTP unconfigured it answers 503 { configured: false } and the browser
 * opens the visitor's mail client with the pitch prefilled, so nothing is lost.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Tighter than the lead form: a pitch is a considered action, not a repeat one. */
const rateLimited = createRateLimiter({ windowMs: 10 * 60 * 1000, max: 5 });

const PitchSchema = z.object({
  name: singleLine(120).pipe(z.string().min(1, "Your name is required.")),
  email: singleLine(254).pipe(z.email("Enter a valid email address.")),
  role: singleLine(160).pipe(z.string().min(1, "Tell us your role or credentials.")),
  topic: singleLine(160).pipe(z.string().min(1, "Propose a headline or topic.")),
  outline: multiLine(4000).pipe(
    z.string().min(60, "Give us at least a couple of sentences on what the post would cover."),
  ),
  /** Link to a draft, a Google Doc, or published work. */
  samples: optionalUrl(300),
  /** Honeypot. Real visitors never see or fill this. */
  website: z.string().max(200).optional().default(""),
  elapsedMs: z.number().int().nonnegative().max(86_400_000).optional().default(0),
});

export async function POST(req: Request) {
  // 1. Body size cap, before any parsing.
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return json({ ok: false, error: "Request too large." }, 413);

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: "Request too large." }, 413);

  // 2. Rate limit per IP.
  if (rateLimited(clientIp(req))) {
    return json({ ok: false, error: "Too many pitches from this connection. Please try again later." }, 429);
  }

  // 3. Parse.
  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // 4. Validate.
  const result = PitchSchema.safeParse(parsedJson);
  if (!result.success) {
    return json({ ok: false, error: "Please check the highlighted fields.", fields: fieldErrors(result.error.issues) }, 400);
  }
  const pitch = result.data;

  // 5. Bot checks — accept silently so automation learns nothing.
  if (pitch.website.trim()) return json({ ok: true }, 200);
  if (pitch.elapsedMs > 0 && pitch.elapsedMs < MIN_FILL_MS) return json({ ok: true }, 200);

  // 6. Delivery.
  const host = process.env.LEAD_SMTP_HOST;
  const user = process.env.LEAD_SMTP_USER;
  const pass = process.env.LEAD_SMTP_PASS;
  if (!host || !user || !pass) {
    console.error("[pitch] SMTP is not configured — submission not delivered");
    return json({ ok: false, configured: false }, 503);
  }

  const port = Number(process.env.LEAD_SMTP_PORT ?? 587);
  const to = process.env.PITCH_TO ?? process.env.LEAD_TO ?? CONTACT.email;
  const from = process.env.LEAD_FROM ?? user;

  const body = [
    "New blog contribution pitch",
    "",
    `Name:      ${pitch.name}`,
    `Email:     ${pitch.email}`,
    `Role:      ${pitch.role}`,
    `Samples:   ${pitch.samples || "—"}`,
    "",
    `Proposed topic: ${pitch.topic}`,
    "",
    "Outline",
    "-------",
    pitch.outline,
    "",
    `Received: ${new Date().toISOString()}`,
    "",
    "Reply to this email to accept or decline. If accepting, ask for the draft",
    "as a Google Doc or .docx and point them at CONTRIBUTING-BLOG.md.",
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
      replyTo: pitch.email,
      // Static subject: no user input reaches a mail header.
      subject: "New blog contribution pitch — Mindlox AI website",
      text: body,
    });
    return json({ ok: true }, 200);
  } catch (err) {
    // Log a short, redacted summary. Never the transport config or credentials.
    const reason = err instanceof Error ? `${err.name}: ${err.message}` : "unknown error";
    console.error(`[pitch] delivery failed — ${reason}`);
    return json({ ok: false, error: "We could not send your pitch just now. Please email us directly." }, 502);
  }
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const HEAD = methodNotAllowed;

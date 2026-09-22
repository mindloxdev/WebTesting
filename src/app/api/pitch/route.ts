import nodemailer from "nodemailer";
import { z } from "zod";
import { CONTACT } from "@/data/site";
import { ALLOWED_LABEL, MAX_FILE_BYTES, checkFile } from "@/lib/attachment";
import {
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
 * Accepts multipart/form-data with one optional document attachment, so a
 * writer can send a draft with the pitch rather than in a second email.
 *
 * The file is never written to disk and never served back: it is validated,
 * streamed into the notification email, and forgotten. There is no stored
 * object for anyone to fetch later, which is what keeps a public upload path
 * on a marketing site defensible. See src/lib/attachment.ts for the limits.
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

/** Text fields plus one attachment, with headroom for multipart framing. */
const MAX_REQUEST_BYTES = MAX_FILE_BYTES + 64 * 1024;

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
  // 1. Size cap, before reading anything.
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_REQUEST_BYTES) {
    return json({ ok: false, error: "That upload is too large.", fields: { file: `Keep the file under ${Math.round(MAX_FILE_BYTES / (1024 * 1024))} MB.` } }, 413);
  }

  // 2. Rate limit per IP.
  if (rateLimited(clientIp(req))) {
    return json({ ok: false, error: "Too many pitches from this connection. Please try again later." }, 429);
  }

  // 3. Parse the multipart body.
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  const text = (key: string) => {
    const v = form.get(key);
    return typeof v === "string" ? v : "";
  };

  const parsedJson = {
    name: text("name"),
    email: text("email"),
    role: text("role"),
    topic: text("topic"),
    outline: text("outline"),
    samples: text("samples"),
    website: text("website"),
    elapsedMs: Number(text("elapsedMs")) || 0,
  };

  // 4. Validate.
  const result = PitchSchema.safeParse(parsedJson);
  if (!result.success) {
    return json({ ok: false, error: "Please check the highlighted fields.", fields: fieldErrors(result.error.issues) }, 400);
  }
  const pitch = result.data;

  // 5. Bot checks — accept silently so automation learns nothing.
  if (pitch.website.trim()) return json({ ok: true }, 200);
  if (pitch.elapsedMs > 0 && pitch.elapsedMs < MIN_FILL_MS) return json({ ok: true }, 200);

  // 6. Attachment, if one came with the pitch.
  const upload = form.get("file");
  let attachment: { filename: string; content: Buffer } | null = null;

  if (upload && typeof upload !== "string" && upload.size > 0) {
    const verdict = checkFile({ name: upload.name, type: upload.type, size: upload.size });
    if (!verdict.ok) {
      return json({ ok: false, error: verdict.error, fields: { file: verdict.error } }, 400);
    }
    const bytes = Buffer.from(await upload.arrayBuffer());
    // Re-check after reading: `size` is client-reported until this point.
    if (bytes.byteLength > MAX_FILE_BYTES) {
      return json({ ok: false, error: "That upload is too large.", fields: { file: `Keep the file under ${Math.round(MAX_FILE_BYTES / (1024 * 1024))} MB.` } }, 413);
    }
    attachment = { filename: verdict.filename, content: bytes };
  }

  // 7. Delivery.
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
    `Attached:  ${attachment ? `${attachment.filename} (${Math.round(attachment.content.byteLength / 1024)} KB)` : "no file"}`,
    "",
    `Proposed topic: ${pitch.topic}`,
    "",
    "Outline",
    "-------",
    pitch.outline,
    "",
    `Received: ${new Date().toISOString()}`,
    "",
    `Reply to this email to accept or decline.${attachment ? " The draft is attached." : " If accepting, ask for the draft as a Google Doc or .docx."}`,
    "House rules for contributors are in CONTRIBUTING-BLOG.md.",
    "",
    `Attachments come from the public form: treat as untrusted (${ALLOWED_LABEL} only, scanned by your mail provider).`,
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
      ...(attachment ? { attachments: [attachment] } : {}),
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

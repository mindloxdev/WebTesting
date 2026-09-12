import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { CONTACT } from "@/data/site";

/**
 * Lead form endpoint. Emails each submission to the practice inbox.
 *
 * Configure SMTP in the hosting environment (see .env.example):
 *   LEAD_SMTP_HOST, LEAD_SMTP_PORT, LEAD_SMTP_USER, LEAD_SMTP_PASS
 *   LEAD_TO   (defaults to the CONTACT email)
 *   LEAD_FROM (defaults to LEAD_SMTP_USER)
 *
 * When SMTP is not configured the route answers 503 with { configured: false }
 * and the form falls back to opening the visitor's email app with the details
 * prefilled, so no lead is ever silently dropped.
 */

export const runtime = "nodejs";

type Lead = {
  name?: string;
  email?: string;
  organization?: string;
  phone?: string;
  org?: string;
  providers?: string;
  need?: string;
  page?: string;
  /** Honeypot — real visitors never fill this. */
  website?: string;
};

const clean = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Lead;
  try {
    body = (await req.json()) as Lead;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept bot submissions without sending anything.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const lead = {
    name: clean(body.name),
    email: clean(body.email),
    organization: clean(body.organization),
    phone: clean(body.phone, 40),
    org: clean(body.org),
    providers: clean(body.providers, 20),
    need: clean(body.need),
    page: clean(body.page, 300),
  };

  if (!lead.name || !EMAIL.test(lead.email) || !lead.organization) {
    return NextResponse.json({ ok: false, error: "Please provide your name, a valid work email, and your organization." }, { status: 422 });
  }

  const host = process.env.LEAD_SMTP_HOST;
  const user = process.env.LEAD_SMTP_USER;
  const pass = process.env.LEAD_SMTP_PASS;
  if (!host || !user || !pass) {
    return NextResponse.json({ ok: false, configured: false }, { status: 503 });
  }

  const port = Number(process.env.LEAD_SMTP_PORT ?? 587);
  const to = process.env.LEAD_TO ?? CONTACT.email;
  const from = process.env.LEAD_FROM ?? user;

  const lines = [
    `Name: ${lead.name}`,
    `Work email: ${lead.email}`,
    `Organization: ${lead.organization}`,
    `Phone: ${lead.phone || "—"}`,
    "",
    `Organization type: ${lead.org || "—"}`,
    `Providers: ${lead.providers || "—"}`,
    `Needs help with: ${lead.need || "—"}`,
    "",
    `Submitted from: ${lead.page || "—"}`,
    `Received: ${new Date().toISOString()}`,
  ];

  try {
    const transport = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
    await transport.sendMail({
      from,
      to,
      replyTo: lead.email,
      subject: `Revenue audit request — ${lead.organization} (${lead.name})`,
      text: lines.join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] send failed", err);
    return NextResponse.json({ ok: false, error: "We could not send your request just now." }, { status: 502 });
  }
}

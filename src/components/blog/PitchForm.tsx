"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Mail, Paperclip, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CONTACT } from "@/data/site";
import { ACCEPT_ATTR, ALLOWED_LABEL, MAX_FILE_BYTES } from "@/lib/attachment";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

type Answers = {
  name: string;
  email: string;
  role: string;
  topic: string;
  outline: string;
  samples: string;
};

const EMPTY: Answers = { name: "", email: "", role: "", topic: "", outline: "", samples: "" };

/** Outcome of a submission: delivered by the server, or handed to the mail app. */
type Delivery = "sent" | "mail-app";

/** Same fallback the lead form uses — a pitch is never silently dropped. */
function mailtoFor(a: Answers) {
  const body = [
    `Name: ${a.name}`,
    `Email: ${a.email}`,
    `Role / credentials: ${a.role}`,
    `Samples: ${a.samples || "—"}`,
    "",
    `Proposed topic: ${a.topic}`,
    "",
    "Outline:",
    a.outline,
  ].join("\n");
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent("Blog contribution pitch")}&body=${encodeURIComponent(body)}`;
}

/** Inline validation message. Module scope so it is not rebuilt each render. */
const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="mt-1.5 text-sm text-negative">{message}</p> : null;

const label = "block font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3";
const field =
  "mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 text-[15px] text-fg outline-none transition-colors placeholder:text-fg-3/70 focus:border-accent";

/**
 * Contributor pitch form. One screen, because the audience is already
 * motivated — the multi-step treatment the lead form uses would be friction
 * here, not reassurance.
 *
 * One optional document attachment. The file is posted as multipart and goes
 * straight into the notification email — it is never stored, so there is no
 * uploaded object on the site for anyone to reach.
 */
export function PitchForm({ className }: { className?: string }) {
  const [a, setA] = useState<Answers>(EMPTY);
  const [website, setWebsite] = useState(""); // honeypot
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<Delivery | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [sentWithFile, setSentWithFile] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  // Stamped on mount, not during render: feeds the server's minimum fill-time check.
  const openedAt = useRef(0);
  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  const set = (key: keyof Answers) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setA((s) => ({ ...s, [key]: e.target.value }));

  const clearFile = () => {
    setFile(null);
    // Reset the input too, or picking the same file again fires no change event.
    if (fileInput.current) fileInput.current.value = "";
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    setFieldErrors({});
    try {
      // multipart, not JSON: the attachment rides along with the fields.
      // The browser sets Content-Type (with the boundary) itself.
      const payload = new FormData();
      for (const [k, v] of Object.entries(a)) payload.append(k, v);
      payload.append("website", website);
      payload.append("elapsedMs", String(Date.now() - openedAt.current));
      if (file) payload.append("file", file);

      const res = await fetch("/api/pitch", { method: "POST", body: payload });
      if (res.ok) {
        setSentWithFile(file !== null);
        setDone("sent");
        return;
      }
      const data = (await res.json().catch(() => ({}))) as {
        configured?: boolean;
        error?: string;
        fields?: Record<string, string>;
      };
      if (res.status === 503 && data.configured === false) {
        window.location.href = mailtoFor(a);
        setDone("mail-app");
        return;
      }
      if (data.fields) setFieldErrors(data.fields);
      setError(data.error ?? "Something went wrong. Please try again or email us directly.");
    } catch {
      setError("We could not reach the server. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={cn("overflow-hidden rounded-[22px] border border-line bg-bg shadow-e3", className)}>
      <div className="border-b border-line px-6 py-4 lg:px-8">
        <p className="text-sm font-medium text-fg">Pitch an article</p>
      </div>

      <div className="p-6 lg:p-8">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-positive/12 text-positive">
                {done === "sent" ? <Check className="size-6" /> : <Mail className="size-6" />}
              </span>
              <p className="mt-5 font-display text-xl font-semibold text-fg">
                {done === "sent" ? "Pitch received." : "Finish in your email app."}
              </p>
              <p className="mt-3 text-fg-2">
                {done === "sent" ? (
                  <>
                    A specialist reads every pitch and replies either way, usually within a few working days.{" "}
                    {sentWithFile ? "Your file came through with it." : "If we say yes, send the draft to"}{" "}
                    {!sentWithFile && (
                      <a href={CONTACT.emailHref} className="font-medium text-accent underline underline-offset-[3px]">
                        {CONTACT.email}
                      </a>
                    )}{" "}
                    We edit, fact-check, and publish under your byline.
                  </>
                ) : (
                  <>
                    We opened your email app with the pitch filled in — press send and it reaches us the same way.
                    {file ? " Attach the file there as well: a mail link cannot carry it across." : ""}
                  </>
                )}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={submit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="p-name">
                    Your name
                  </label>
                  <input id="p-name" className={field} value={a.name} onChange={set("name")} required maxLength={120} />
                  <FieldError message={fieldErrors.name} />
                </div>
                <div>
                  <label className={label} htmlFor="p-email">
                    Email
                  </label>
                  <input
                    id="p-email"
                    type="email"
                    className={field}
                    value={a.email}
                    onChange={set("email")}
                    required
                    maxLength={254}
                  />
                  <FieldError message={fieldErrors.email} />
                </div>
              </div>

              <div>
                <label className={label} htmlFor="p-role">
                  Role or credentials
                </label>
                <input
                  id="p-role"
                  className={field}
                  placeholder="CPC, CPMA — Coding consultant"
                  value={a.role}
                  onChange={set("role")}
                  required
                  maxLength={160}
                />
                <FieldError message={fieldErrors.role} />
              </div>

              <div>
                <label className={label} htmlFor="p-topic">
                  Proposed headline
                </label>
                <input
                  id="p-topic"
                  className={field}
                  placeholder="Prior authorization for ASCs: what the note has to show"
                  value={a.topic}
                  onChange={set("topic")}
                  required
                  maxLength={160}
                />
                <FieldError message={fieldErrors.topic} />
              </div>

              <div>
                <label className={label} htmlFor="p-outline">
                  What would the post cover?
                </label>
                <textarea
                  id="p-outline"
                  className={cn(field, "min-h-[140px] resize-y")}
                  placeholder="A few sentences, or a short bullet outline. Tell us who it is for and what they should do differently after reading it."
                  value={a.outline}
                  onChange={set("outline")}
                  required
                  maxLength={4000}
                />
                <FieldError message={fieldErrors.outline} />
              </div>

              <div>
                <label className={label} htmlFor="p-samples">
                  Link to a draft or published work <span className="normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  id="p-samples"
                  type="url"
                  className={field}
                  placeholder="https://"
                  value={a.samples}
                  onChange={set("samples")}
                  maxLength={300}
                />
                <FieldError message={fieldErrors.samples} />
              </div>

              <div>
                <span className={label}>
                  Attach your draft <span className="normal-case tracking-normal">(optional)</span>
                </span>
                <input
                  ref={fileInput}
                  id="p-file"
                  type="file"
                  accept={ACCEPT_ATTR}
                  className="sr-only"
                  onChange={(e) => {
                    setFieldErrors((f) => ({ ...f, file: "" }));
                    setFile(e.target.files?.[0] ?? null);
                  }}
                />
                {file ? (
                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-line bg-bg-2/60 px-4 py-3">
                    <Paperclip className="size-4 shrink-0 text-accent" aria-hidden />
                    <span className="min-w-0 flex-1 truncate text-[15px] text-fg">{file.name}</span>
                    <span className="shrink-0 font-mono text-[11px] text-fg-3">{Math.max(1, Math.round(file.size / 1024))} KB</span>
                    <button
                      type="button"
                      onClick={clearFile}
                      className="shrink-0 rounded-full p-1 text-fg-3 transition-colors hover:bg-fg/8 hover:text-fg"
                      aria-label={`Remove ${file.name}`}
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="p-file"
                    className="mt-2 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-line bg-bg px-4 py-3 text-[15px] text-fg-3 transition-colors hover:border-accent hover:text-fg"
                  >
                    <Paperclip className="size-4 shrink-0" aria-hidden />
                    <span>Choose a file</span>
                  </label>
                )}
                <p className="mt-1.5 text-[13px] text-fg-3">
                  {ALLOWED_LABEL}, up to {Math.round(MAX_FILE_BYTES / (1024 * 1024))} MB. Optional — you can send the
                  draft later instead.
                </p>
                <FieldError message={fieldErrors.file} />
              </div>

              {/* Honeypot: hidden from people, irresistible to bots. */}
              <div className="absolute left-[-9999px]" aria-hidden>
                <label htmlFor="p-website">Website</label>
                <input
                  id="p-website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              {error && <p className="text-sm text-negative">{error}</p>}

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <MagneticButton type="submit" arrow disabled={sending}>
                  {sending ? "Sending…" : "Send pitch"}
                </MagneticButton>
                <p className="text-sm text-fg-3">
                  Or email{" "}
                  <a href={CONTACT.emailHref} className="font-medium text-accent underline underline-offset-[3px]">
                    {CONTACT.email}
                  </a>
                </p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

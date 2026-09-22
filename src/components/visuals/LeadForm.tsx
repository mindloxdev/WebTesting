"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, Lock, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NEEDS, ORG_TYPES, PROVIDER_COUNTS } from "@/data/content";
import { CONTACT } from "@/data/site";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

type Answers = { org?: string; providers?: string; need?: string; name?: string; email?: string; organization?: string; phone?: string; message?: string };

const STEPS = [
  { q: "What type of organization are you?", key: "org", options: ORG_TYPES },
  { q: "How many providers?", key: "providers", options: PROVIDER_COUNTS },
  { q: "What do you need help with?", key: "need", options: NEEDS },
  { q: "Where should we send your revenue audit?", key: "contact", options: [] },
] as const;

type Props = { className?: string; initialNeed?: string; title?: string };

/** How the submission was delivered: through the site's email endpoint, or via the visitor's own email app. */
type Delivery = "sent" | "mail-app";

/** Builds a prefilled email so a request is never lost when the server endpoint is unavailable. */
function mailtoFor(a: Answers) {
  const subject = encodeURIComponent(`Revenue audit request — ${a.organization ?? ""}`.trim());
  const body = encodeURIComponent(
    [
      `Name: ${a.name ?? ""}`,
      `Work email: ${a.email ?? ""}`,
      `Organization: ${a.organization ?? ""}`,
      `Phone: ${a.phone ?? ""}`,
      ...(a.message ? ["", "Message:", a.message] : []),
      "",
      `Organization type: ${a.org ?? ""}`,
      `Providers: ${a.providers ?? ""}`,
      `Needs help with: ${a.need ?? ""}`,
      "",
      "Please contact me to schedule a free revenue audit.",
    ].join("\n"),
  );
  return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
}

/**
 * Four-step conversational lead form. One question per screen, animated
 * progress, large tap targets, privacy reassurance, no PHI requested.
 * Submissions post to /api/lead; if that endpoint is not configured the
 * visitor's email app opens with the same details prefilled.
 */
export function LeadForm({ className, initialNeed, title = "Get your free revenue audit" }: Props) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [a, setA] = useState<Answers>({ need: initialNeed });
  const [website, setWebsite] = useState(""); // honeypot
  // Stamped on mount, not during render: used for the server-side minimum
  // fill-time check.
  const openedAt = useRef(0);
  useEffect(() => {
    openedAt.current = Date.now();
  }, []);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<Delivery | null>(null);

  const go = (n: number) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
  };
  const choose = (key: "org" | "providers" | "need", v: string) => {
    setA((s) => ({ ...s, [key]: v }));
    window.setTimeout(() => go(step + 1), 180);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...a,
          website,
          elapsedMs: Date.now() - openedAt.current,
          page: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      if (res.ok) {
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
      const firstField = data.fields ? Object.values(data.fields)[0] : undefined;
      setError(firstField ?? data.error ?? "Something went wrong. Please try again or email us directly.");
    } catch {
      setError("We could not reach the server. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };

  const progress = done ? 1 : step / (STEPS.length - 1);

  return (
    <div className={cn("overflow-hidden rounded-[22px] border border-line bg-bg shadow-e3", className)}>
      <div className="border-b border-line px-6 py-4 lg:px-8">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-fg">{title}</p>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3">
            {done ? "Complete" : `Step ${step + 1} of ${STEPS.length}`}
          </span>
        </div>
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-fg/8" aria-hidden>
          <motion.div className="h-full bg-accent" animate={{ width: `${Math.max(8, progress * 100)}%` }} transition={{ duration: 0.5, ease: EASE }} />
        </div>
      </div>

      <div className="relative min-h-[380px] p-6 lg:p-8">
        <AnimatePresence mode="wait" custom={dir}>
          {done ? (
            <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-positive/12 text-positive">
                <Check className="size-6" />
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-fg">Thank you{a.name ? `, ${a.name.split(" ")[0]}` : ""}.</h3>
              <p className="mt-2 text-fg-2">
                An RCM specialist will reach out to schedule your revenue audit for a {a.org?.toLowerCase() ?? "practice"} with {a.providers ?? "your"} provider{a.providers === "1" ? "" : "s"}, focused on {a.need?.toLowerCase() ?? "the full revenue cycle"}.
              </p>
              {done === "mail-app" ? (
                <p className="mt-6 rounded-xl bg-bg-2 p-4 text-sm text-fg-2">
                  We opened your email app with your details filled in — just press send. If it did not open, email us at{" "}
                  <a href={mailtoFor(a)} className="font-medium text-fg underline decoration-line underline-offset-4 hover:text-accent">
                    {CONTACT.email}
                  </a>
                  .
                </p>
              ) : (
                <p className="mt-6 flex items-center gap-2 rounded-xl bg-bg-2 p-4 text-sm text-fg-2">
                  <Mail className="size-4 shrink-0 text-accent" aria-hidden />
                  We sent a confirmation to our team. Expect a reply within one business day.
                </p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={step}
              custom={dir}
              initial={{ opacity: 0, x: dir * 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -32 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <h3 className="font-display text-2xl font-semibold text-fg lg:text-3xl">{STEPS[step].q}</h3>

              {step < 3 ? (
                <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {STEPS[step].options.map((o) => {
                    const key = STEPS[step].key as "org" | "providers" | "need";
                    const on = a[key] === o;
                    return (
                      <button
                        key={o}
                        type="button"
                        onClick={() => choose(key, o)}
                        aria-pressed={on}
                        className={cn(
                          "flex min-h-14 items-center justify-between rounded-xl border px-4 text-left text-[15px] font-medium transition-all duration-300 ease-out-expo",
                          on ? "border-accent bg-accent-soft text-accent" : "border-line bg-bg text-fg hover:border-line-strong hover:bg-bg-2",
                        )}
                      >
                        {o}
                        <span className={cn("inline-flex size-5 items-center justify-center rounded-full border", on ? "border-accent bg-accent text-accent-fg" : "border-line")}>
                          {on && <Check className="size-3" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" id="lf-name" required value={a.name ?? ""} onChange={(v) => setA((s) => ({ ...s, name: v }))} autoComplete="name" />
                  <Field label="Work email" id="lf-email" type="email" required value={a.email ?? ""} onChange={(v) => setA((s) => ({ ...s, email: v }))} autoComplete="email" />
                  <Field label="Organization" id="lf-org" required value={a.organization ?? ""} onChange={(v) => setA((s) => ({ ...s, organization: v }))} autoComplete="organization" />
                  <Field
                    label="Phone (optional)"
                    id="lf-phone"
                    type="tel"
                    value={a.phone ?? ""}
                    onChange={(v) => setA((s) => ({ ...s, phone: v }))}
                    autoComplete="tel"
                    // Country code shown in the placeholder: the rest of the form
                    // assumes a US practice, and a number without one is useless
                    // if the visitor is not in North America.
                    placeholder="+1 817 555 0123"
                  />
                  <TextArea
                    label="Anything else we should know? (optional)"
                    id="lf-message"
                    value={a.message ?? ""}
                    onChange={(v) => setA((s) => ({ ...s, message: v }))}
                    placeholder="Your payer mix, the systems you bill in, where the revenue is leaking, or anything the questions above did not cover. Write in whatever language you are comfortable in."
                    className="sm:col-span-2"
                  />
                  {/* Honeypot: hidden from people, filled by bots. */}
                  <div className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden" aria-hidden>
                    <label htmlFor="lf-website">Website</label>
                    <input id="lf-website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <MagneticButton type="submit" size="lg" fullWidth arrow magnetic={false} disabled={sending}>
                      {sending ? "Sending…" : "Get My Free Revenue Audit"}
                    </MagneticButton>
                    {error && (
                      <p role="alert" className="mt-3 rounded-xl border border-negative/30 bg-negative/8 px-4 py-3 text-sm text-fg">
                        {error}{" "}
                        <a href={mailtoFor(a)} className="font-medium underline decoration-line underline-offset-4 hover:text-accent">
                          Email us instead
                        </a>
                        .
                      </p>
                    )}
                    <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-fg-3">
                      <Lock className="size-3" /> No patient information is requested. Your details are used only to schedule your audit.
                    </p>
                  </div>
                </form>
              )}

              {step > 0 && (
                <button type="button" onClick={() => go(step - 1)} className="mt-6 inline-flex items-center gap-1.5 text-sm text-fg-3 hover:text-fg">
                  <ArrowLeft className="size-4" /> Back
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Field({ label, id, type = "text", required, value, onChange, autoComplete, placeholder }: { label: string; id: string; type?: string; required?: boolean; value: string; onChange: (v: string) => void; autoComplete?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-fg">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-line bg-bg px-4 text-[15px] text-fg outline-none transition-colors placeholder:text-fg-3 focus:border-accent"
      />
    </div>
  );
}

/**
 * Optional free-text note. Everything above it is a dropdown built around a
 * US practice; this is the one place a visitor those options do not describe
 * can tell us in their own words, so it spans the full width and is never
 * required.
 */
function TextArea({
  label,
  id,
  value,
  onChange,
  placeholder,
  className,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const MAX = 2000;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-fg">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        maxLength={MAX}
        className="w-full resize-y rounded-xl border border-line bg-bg px-4 py-3 text-[15px] leading-relaxed text-fg outline-none transition-colors placeholder:text-fg-3 focus:border-accent"
      />
      {value.length > MAX - 200 && (
        <p className="mt-1.5 text-right font-mono text-[11px] text-fg-3">
          {MAX - value.length} characters left
        </p>
      )}
    </div>
  );
}

"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { Bot, CornerDownLeft, ShieldCheck } from "lucide-react";
import { useRef, useState } from "react";
import { useTyping } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Assistant } from "@/components/visuals/CommandCenter";

const PROMPTS = [
  {
    q: "Which payers are slow this month?",
    a: "Medicaid is averaging 41 days to pay — 12 days above its trailing average. Commercial C is at 33 days with a 5.2% denial rate. I've queued a follow-up batch for 28 Medicaid claims over 45 days and flagged Commercial C for a contract-variance review.",
  },
  {
    q: "What can we appeal before Friday?",
    a: "12 claims are appealable with documentation already on file — $9,640 in total. Four are CO-50 medical-necessity denials where LCD criteria are met; the rest are CO-197 authorization denials with retro-auth windows still open. Drafts are ready for the denial specialist to review.",
  },
  {
    q: "Where were we underpaid?",
    a: "Commercial B paid 97110 at 12% below contract on 41 claims — $2,140 in variance. Two 99214 claims from Commercial A were short $61.80 each. A payer-pattern report is attached and a recovery project is open with the payment-integrity analyst.",
  },
];

/** Stage the assistant large, beside sample prompts that answer with a typing effect. Demo-labeled. */
export function AssistantShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [active, setActive] = useState<number | null>(null);
  const { typed, done } = useTyping(active === null ? "" : PROMPTS[active].a, active !== null, 44, 350);

  return (
    <Section id="assistant" tone="muted">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="The assistant"
            title="An assistant that speaks like a sharp billing manager."
            highlight="sharp billing manager."
            description="Not a chatbot bolted onto a dashboard. It reads the same claims, remittances, and payer patterns your team does — and tells you what to do next, with the evidence attached."
          />
          <div className="mt-8">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">Try a question</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Sample prompts">
              {PROMPTS.map((p, i) => {
                const on = active === i;
                return (
                  <motion.button
                    key={p.q}
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300",
                      on ? "border-accent bg-accent text-accent-fg shadow-glow" : "border-line bg-bg text-fg-2 hover:border-line-strong hover:text-fg",
                    )}
                  >
                    {p.q}
                    <CornerDownLeft className="size-3.5 opacity-60" aria-hidden />
                  </motion.button>
                );
              })}
            </div>
          </div>
          <p className="mt-8 flex items-start gap-2 text-sm text-fg-2">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" />
            AI-assisted and human-reviewed. The assistant recommends; billing specialists decide. It never files, appeals, or adjusts a claim on its own.
          </p>
        </div>

        <div ref={ref} className="relative overflow-hidden rounded-[22px] border border-line bg-bg shadow-e4">
          <div className="flex items-center justify-between border-b border-line bg-bg-2/70 px-4 py-2.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">Mindlox Assistant · session</span>
            <DemoBadge />
          </div>
          <div className="p-3 lg:p-4">
            <Assistant start={inView} />
            <AnimatePresence mode="wait">
              {active !== null && (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="mt-3 space-y-3"
                >
                  <div className="flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-br-md bg-fg px-4 py-2.5 text-sm text-bg">{PROMPTS[active].q}</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-fg">
                      <Bot className="size-3.5" />
                    </span>
                    <p className="min-h-[3.4em] max-w-[90%] rounded-2xl rounded-tl-md border border-line bg-bg-2/70 px-4 py-2.5 text-sm leading-relaxed text-fg">
                      {typed}
                      {!done && <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-accent" aria-hidden />}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { EASE } from "@/lib/motion";
import { cn, pad2 } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/ui/Section";

const CARDS = [
  {
    title: "Coders who know your codes",
    lead: "Certified coders aligned to your specialty's CPT, ICD-10-CM, and HCPCS families — not a generalist queue.",
    points: [
      "E/M leveling and modifier logic specific to your procedures",
      "Documentation feedback written in your clinical language",
      "NCCI edit and MUE awareness by code family",
    ],
    codes: ["CPT", "ICD-10-CM", "HCPCS", "Modifiers 25 · 59 · 26/TC"],
  },
  {
    title: "Denial patterns by specialty",
    lead: "Denials categorized with CARC/RARC-driven taxonomies built per specialty, so prevention targets the real root causes.",
    points: [
      "Specialty-specific denial taxonomy from day one",
      "Appeal templates by payer and procedure family",
      "Prevention loops back to scheduling and registration",
    ],
    codes: ["CO-50", "CO-197", "CO-27", "CO-29", "CO-4"],
  },
  {
    title: "Payer rules that change quarterly",
    lead: "LCD/NCD coverage criteria, telehealth policies, and prior-auth lists shift constantly. We track them per specialty and per payer.",
    points: [
      "LCD/NCD medical-necessity checks before submission",
      "Telehealth POS and modifier policy library",
      "Authorization matrices per payer and CPT",
    ],
    codes: ["LCD / NCD", "POS 02 · 10", "Modifier 95 · GT", "Auth matrix"],
  },
];

/** Three exploration cards — hover or tap to open. Figma-style: every touch rewards. */
export function SpecialtyDepth() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="depth">
      <SectionHeading
        eyebrow="Specialty-first"
        title="What specialty-first actually means."
        highlight="actually means."
        description="Three things a generalist billing queue cannot do — and the reason specialty-aligned teams recover more with less rework."
      />
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {CARDS.map((c, i) => {
          const on = open === i;
          return (
            <motion.article
              key={c.title}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              onMouseEnter={() => setOpen(i)}
              className={cn(
                "card-surface relative overflow-hidden p-6 transition-[border-color,box-shadow,transform] duration-500 ease-out-expo lg:p-7",
                on ? "border-accent/40 shadow-e3" : "hover:-translate-y-0.5 hover:border-line-strong",
              )}
            >
              <span
                aria-hidden
                className={cn("pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent to-transparent transition-opacity duration-500", on ? "opacity-100" : "opacity-0")}
              />
              <button
                type="button"
                onClick={() => setOpen(on ? null : i)}
                aria-expanded={on}
                className="flex w-full items-start justify-between gap-4 text-left"
              >
                <div>
                  <span className="font-mono text-[11px] text-fg-3">{pad2(i + 1)}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-fg">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-2">{c.lead}</p>
                </div>
                <span
                  className={cn(
                    "inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-line transition-transform duration-500 ease-out-expo",
                    on && "rotate-45 border-accent text-accent",
                  )}
                >
                  <Plus className="size-4" aria-hidden />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-5 space-y-2 border-t border-line pt-5">
                      {c.points.map((p, pi) => (
                        <motion.li
                          key={p}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08 + pi * 0.06, duration: 0.4, ease: EASE }}
                          className="flex items-start gap-2.5 text-sm text-fg"
                        >
                          <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                            <Check className="size-3" strokeWidth={3} />
                          </span>
                          {p}
                        </motion.li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {c.codes.map((k) => (
                        <span key={k} className="rounded-md bg-accent-soft px-2 py-0.5 font-mono text-[11px] text-accent">
                          {k}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}

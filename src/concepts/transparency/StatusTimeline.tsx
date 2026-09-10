"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check, Radio } from "lucide-react";
import { useRef, useState } from "react";
import { useInterval } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { cn, currency } from "@/lib/utils";
import { DemoBadge } from "@/components/ui/DemoBadge";

const STEPS = ["Submitted", "Adjudicated", "Paid", "Posted"] as const;
const DAYS = ["Day 1", "Day 12", "Day 16", "Day 16"];

const ROWS = [
  { id: "MLX-10471", service: "99214 · Office visit", payer: "Commercial A", amount: 246 },
  { id: "MLX-10472", service: "93306 · Echocardiogram", payer: "Medicare", amount: 1248 },
  { id: "MLX-10473", service: "97110 · Therapeutic exercise", payer: "Commercial B", amount: 118 },
  { id: "MLX-10474", service: "90837 · Psychotherapy, 60 min", payer: "Commercial C", amount: 164 },
  { id: "MLX-10475", service: "45380 · Colonoscopy w/ biopsy", payer: "Medicaid", amount: 612 },
  { id: "MLX-10476", service: "17000 · Destruction, lesion", payer: "Commercial A", amount: 132 },
];

const INITIAL = [3, 2, 1, 1, 0, 0];

type Props = { className?: string };

/**
 * A live-feeling claim status board. Claims advance Submitted → Adjudicated →
 * Paid → Posted while in view; every status is visible, nothing is hidden.
 */
export function StatusTimeline({ className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [stages, setStages] = useState<number[]>(INITIAL);
  const [resting, setResting] = useState(false);
  const pointer = useRef(0);

  useInterval(
    () => {
      setStages((s) => {
        if (s.every((v) => v >= STEPS.length - 1)) {
          setResting(true);
          window.setTimeout(() => {
            setStages([0, 0, 0, 1, 1, 2]);
            setResting(false);
          }, 2200);
          return s;
        }
        const next = [...s];
        for (let k = 0; k < next.length; k++) {
          const i = (pointer.current + k) % next.length;
          if (next[i] < STEPS.length - 1) {
            next[i] += 1;
            pointer.current = (i + 1) % next.length;
            break;
          }
        }
        return next;
      });
    },
    inView && !reduce && !resting ? 1500 : null,
  );

  const posted = stages.filter((s) => s === STEPS.length - 1).length;
  const total = ROWS.reduce((a, r) => a + r.amount, 0);

  return (
    <div ref={ref} className={cn("overflow-hidden rounded-[22px] border border-line bg-bg shadow-e3", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-bg-2/70 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <Radio className="size-4 text-accent" />
          <span className="text-sm font-medium text-fg">Claim status board</span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3 sm:inline">
            {posted}/{ROWS.length} posted · {currency(total)} in flight
          </span>
        </div>
        <DemoBadge />
      </div>

      {/* header row */}
      <div className="hidden grid-cols-[130px_1.4fr_1fr_90px_1.6fr] gap-4 border-b border-line px-5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3 md:grid">
        <span>Claim</span>
        <span>Service</span>
        <span>Payer</span>
        <span className="text-right">Amount</span>
        <span>Status</span>
      </div>

      <ul className="divide-y divide-line">
        {ROWS.map((r, i) => {
          const stage = stages[i];
          const done = stage === STEPS.length - 1;
          return (
            <li key={r.id} className="grid gap-3 px-5 py-3.5 md:grid-cols-[130px_1.4fr_1fr_90px_1.6fr] md:items-center md:gap-4">
              <span className="font-mono text-xs font-semibold text-fg">#{r.id}</span>
              <span className="text-sm text-fg">{r.service}</span>
              <span className="text-sm text-fg-2">{r.payer}</span>
              <span className="font-mono text-xs tabular text-fg-2 md:text-right">{currency(r.amount, { maximumFractionDigits: 2 })}</span>
              <div className="flex items-center gap-3">
                <div className="flex flex-1 gap-1" aria-hidden>
                  {STEPS.map((_, k) => (
                    <div key={k} className="h-1.5 flex-1 overflow-hidden rounded-full bg-fg/8">
                      <motion.div
                        className={cn("h-full rounded-full", done ? "bg-positive" : "bg-accent")}
                        initial={false}
                        animate={{ width: k <= stage ? "100%" : "0%" }}
                        transition={{ duration: 0.5, ease: EASE }}
                      />
                    </div>
                  ))}
                </div>
                <div className="relative w-[118px] shrink-0">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={stage}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className={cn(
                        "inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em]",
                        done ? "border-positive/30 bg-positive/10 text-positive" : "border-accent/30 bg-accent-soft text-accent",
                      )}
                      aria-live="polite"
                    >
                      {done && <Check className="size-3" />}
                      {STEPS[stage]}
                      <span className="ml-1 text-fg-3">{DAYS[stage]}</span>
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line bg-bg-2/50 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">
        <span>Every status change is logged with who, what, and when</span>
        <span>Illustrative claims · demo data</span>
      </div>
    </div>
  );
}

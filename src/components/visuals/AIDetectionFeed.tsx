"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { AlertTriangle, Code2, DollarSign, FileCheck2, KeyRound, ShieldAlert, Zap, UserCheck, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DETECTIONS, type Detection } from "@/data/dashboard";
import { useInterval } from "@/lib/hooks";
import { EASE, SPRING } from "@/lib/motion";
import { cn, currency } from "@/lib/utils";
import { DemoBadge } from "@/components/ui/DemoBadge";

const META: Record<Detection["type"], { icon: typeof Zap; tone: string; label: string }> = {
  "denial-risk": { icon: AlertTriangle, tone: "text-warning bg-warning/12", label: "Denial risk" },
  eligibility: { icon: ShieldAlert, tone: "text-accent-2 bg-accent-2/12", label: "Eligibility" },
  underpayment: { icon: DollarSign, tone: "text-positive bg-positive/12", label: "Underpayment" },
  "high-risk": { icon: Zap, tone: "text-negative bg-negative/12", label: "High risk" },
  appeal: { icon: FileCheck2, tone: "text-accent bg-accent-soft", label: "Appeal" },
  coding: { icon: Code2, tone: "text-accent-3 bg-accent-3/12", label: "Coding" },
  auth: { icon: KeyRound, tone: "text-warning bg-warning/12", label: "Authorization" },
};

type Live = Detection & { seq: number; resolved: boolean };

type Props = {
  items?: Detection[];
  /** ms between new detections. */
  interval?: number;
  max?: number;
  /** Show the human specialist handoff line. */
  handoff?: boolean;
  className?: string;
  title?: string;
  compact?: boolean;
};

/**
 * Live-feeling detection stream. New cards slide in with intent; after a
 * beat, a named human role picks each one up — the human/AI handoff.
 */
export function AIDetectionFeed({
  items = DETECTIONS,
  interval = 2600,
  max = 4,
  handoff = true,
  className,
  title = "AI detection feed",
  compact,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" });
  const [list, setList] = useState<Live[]>([]);
  const seq = useRef(0);

  const push = () => {
    const next = items[seq.current % items.length];
    const id = seq.current++;
    setList((l) => [{ ...next, seq: id, resolved: false }, ...l].slice(0, max));
    if (handoff) {
      window.setTimeout(() => {
        setList((l) => l.map((x) => (x.seq === id ? { ...x, resolved: true } : x)));
      }, 1500);
    }
  };

  useEffect(() => {
    if (inView && list.length === 0) push();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useInterval(push, inView ? interval : null);

  return (
    <div ref={ref} className={cn("relative overflow-hidden rounded-2xl border border-line bg-bg-2/70", className)}>
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-accent" />
          <span className="text-sm font-medium text-fg">{title}</span>
          <span className="relative ml-1 flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping-soft rounded-full bg-positive" />
            <span className="relative inline-flex size-1.5 rounded-full bg-positive" />
          </span>
        </div>
        <DemoBadge />
      </div>
      <ul className={cn("space-y-2 p-3", compact ? "min-h-[220px]" : "min-h-[340px]")} aria-live="polite">
        <AnimatePresence initial={false}>
          {list.map((d) => {
            const m = META[d.type];
            const Icon = m.icon;
            return (
              <motion.li
                key={d.seq}
                layout
                initial={{ opacity: 0, y: -18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
                transition={{ ...SPRING, opacity: { duration: 0.35, ease: EASE } }}
                className="rounded-xl border border-line bg-bg p-3 shadow-e1"
              >
                <div className="flex items-start gap-3">
                  <span className={cn("mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg", m.tone)}>
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-fg">{d.title}</p>
                      {d.amount !== undefined && (
                        <span className="shrink-0 font-mono text-xs tabular text-fg-2">{currency(d.amount, { maximumFractionDigits: 2 })}</span>
                      )}
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-xs text-fg-2">{d.detail}</p>
                    <div className="mt-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">
                      <span>Claim {d.claim}</span>
                      <span aria-hidden>·</span>
                      <span>{m.label}</span>
                    </div>
                    {handoff && (
                      <AnimatePresence>
                        {d.resolved && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.4, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <div className="mt-2 flex items-center gap-1.5 rounded-md bg-positive/10 px-2 py-1 text-[11px] text-positive">
                              <UserCheck className="size-3.5" />
                              Picked up by {d.resolver}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}

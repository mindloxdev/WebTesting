"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { Command, Filter, Sparkles, UserCheck } from "lucide-react";
import { useRef, useState } from "react";
import { useInterval } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { AIDetectionFeed } from "@/components/visuals/AIDetectionFeed";

const TABS = ["Claims", "Denials", "A/R", "Payments", "Eligibility", "Coding", "Credentialing"] as const;

const ROLES = [
  { role: "Certified Coder", initials: "CC", statuses: ["Reviewing 99214 + 25", "Modifier 25 added", "Resolved"] },
  { role: "Denial Specialist", initials: "DS", statuses: ["Reviewing CO-50", "Appeal drafted", "Appeal filed"] },
  { role: "A/R Specialist", initials: "AR", statuses: ["Prioritizing 90+ bucket", "Payer contacted", "Resolved"] },
  { role: "Eligibility Specialist", initials: "ES", statuses: ["Verifying 270/271", "Plan updated", "Resolved"] },
  { role: "Payment Integrity Analyst", initials: "PI", statuses: ["Comparing to contract", "Variance confirmed", "Recovery opened"] },
  { role: "Authorization Coordinator", initials: "AC", statuses: ["Auth requested", "Awaiting payer", "Approved"] },
];

const TONE = [
  "bg-warning/12 text-warning",
  "bg-accent-soft text-accent",
  "bg-positive/12 text-positive",
];

/**
 * The Handoff: AI detects on the left, specialists resolve on the right, and a
 * pulse travels the connector between them every few seconds.
 */
export function Handoff({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const live = useInView(ref, { margin: "-10% 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Claims");
  const [stage, setStage] = useState<number[]>(() => ROLES.map((_, i) => i % 3));
  const [tick, setTick] = useState(0);

  useInterval(
    () => {
      setTick((t) => t + 1);
      setStage((s) => {
        const i = tick % ROLES.length;
        const next = [...s];
        next[i] = (next[i] + 1) % 3;
        return next;
      });
    },
    live && !reduce ? 2600 : null,
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, rotateX: 8 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
      transition={{ duration: 1, ease: EASE, delay: 0.3 }}
      style={{ transformPerspective: 1400, transformOrigin: "50% 0%" }}
      className={cn("overflow-hidden rounded-[22px] glass-strong shadow-e4", className)}
    >
      {/* toolbar */}
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-fg/15" />
            <span className="size-2.5 rounded-full bg-fg/15" />
            <span className="size-2.5 rounded-full bg-fg/15" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">Mindlox AI · Operations</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1 rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-fg-3 sm:inline-flex" aria-hidden>
            <Filter className="size-3" /> Filter
          </span>
          <span className="hidden items-center gap-1 rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-fg-3 sm:inline-flex" aria-hidden>
            <Command className="size-3" />K
          </span>
          <DemoBadge />
        </div>
      </div>

      {/* tabs */}
      <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line px-3 py-2" role="tablist" aria-label="Work queues">
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={cn("relative shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors", tab === t ? "text-fg" : "text-fg-3 hover:text-fg-2")}
          >
            {tab === t && <motion.span layoutId="handoff-tab" className="absolute inset-0 rounded-full bg-fg/8" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <span className="relative">{t}</span>
          </button>
        ))}
      </div>

      {/* lanes */}
      <div className="grid gap-4 p-3 lg:grid-cols-[1fr_72px_1fr] lg:gap-0 lg:p-4">
        <div className="min-w-0">
          <AIDetectionFeed handoff={false} compact max={3} title="AI detects" interval={2600} />
        </div>

        {/* connector — desktop */}
        <div className="relative hidden lg:block" aria-hidden>
          <svg viewBox="0 0 72 340" className="h-full w-full" preserveAspectRatio="none">
            {[70, 170, 270].map((y, i) => (
              <g key={y}>
                <line x1={0} y1={y} x2={64} y2={y} stroke="var(--line-strong)" strokeDasharray="3 5" />
                <polygon points={`62,${y - 4} 70,${y} 62,${y + 4}`} fill="var(--fg-3)" />
                {!reduce && (
                  <motion.circle
                    cy={y}
                    r={3.5}
                    fill="var(--accent)"
                    style={{ filter: "drop-shadow(0 0 6px var(--glow))" }}
                    initial={{ cx: 0, opacity: 0 }}
                    animate={{ cx: [0, 66], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.2, delay: i * 0.85, ease: "easeInOut" }}
                  />
                )}
              </g>
            ))}
          </svg>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full glass px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-fg-3">
            handoff
          </span>
        </div>
        {/* connector — mobile */}
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3 lg:hidden" aria-hidden>
          <span className="h-px flex-1 bg-line" /> handed to specialists <span className="h-px flex-1 bg-line" />
        </div>

        <div className="min-w-0 overflow-hidden rounded-2xl border border-line bg-bg-2/70">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div className="flex items-center gap-2">
              <UserCheck className="size-4 text-positive" />
              <span className="text-sm font-medium text-fg">Specialists resolve</span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">{ROLES.length} on shift</span>
          </div>
          <ul className="space-y-2 p-3">
            {ROLES.map((r, i) => {
              const s = stage[i];
              return (
                <li key={r.role} className="flex items-center gap-3 rounded-xl border border-line bg-bg px-3 py-2.5 shadow-e1">
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-accent to-accent-3 font-mono text-[11px] font-semibold text-white">
                    {r.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-fg">{r.role}</p>
                    <p className="truncate text-xs text-fg-3">{r.statuses[s]}</p>
                  </div>
                  <span className={cn("inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em]", TONE[s])}>
                    {s === 0 ? (
                      <span className="flex gap-0.5" aria-hidden>
                        {[0, 1, 2].map((d) => (
                          <span key={d} className="size-1 rounded-full bg-current animate-pulse-soft" style={{ animationDelay: `${d * 0.25}s` }} />
                        ))}
                      </span>
                    ) : s === 1 ? (
                      <Sparkles className="size-3" />
                    ) : (
                      <UserCheck className="size-3" />
                    )}
                    {s === 0 ? "Reviewing" : s === 1 ? "In progress" : "Resolved"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

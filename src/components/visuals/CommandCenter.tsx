"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { Bot, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  AI_MORNING,
  AR_AGING,
  DEMO_METRICS,
  DENIAL_TREND,
  PAYER_MIX,
  PAYER_PERFORMANCE,
  REVENUE_TREND,
  TOP_DENIAL_REASONS,
} from "@/data/dashboard";
import { useTyping } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { cn, number } from "@/lib/utils";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart, HBarChart } from "@/components/charts/BarChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { MetricCard } from "./MetricCard";

type Props = {
  /** "hero" = fewer panels, larger type; "full" = every panel with tabs. */
  variant?: "hero" | "full";
  className?: string;
  /** 3D tilt on entry (hero use). */
  tilt?: boolean;
  /** Show the AI assistant rail. */
  assistant?: boolean;
};

const TABS = ["Overview", "Claims", "Denials", "A/R", "Payers", "Providers"] as const;
type Tab = (typeof TABS)[number];

/**
 * The RCM Command Center. Charts draw on entry, metrics count up, and the
 * AI assistant types its morning summary. Every panel is demo-labeled.
 */
export function CommandCenter({ variant = "full", className, tilt, assistant = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [tab, setTab] = useState<Tab>("Overview");
  const metrics = variant === "hero" ? DEMO_METRICS.slice(0, 4) : DEMO_METRICS;

  return (
    <motion.div
      ref={ref}
      initial={tilt ? { opacity: 0, rotateX: 14, y: 40, scale: 0.96 } : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, rotateX: 0, y: 0, scale: 1 } : undefined}
      transition={{ duration: 1.1, ease: EASE }}
      style={{ transformPerspective: 1600, transformOrigin: "50% 0%" }}
      className={cn(
        "relative overflow-hidden rounded-[22px] border border-line bg-bg shadow-e4",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[22px] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_40%)]",
        className,
      )}
    >
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-line bg-bg-2/70 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-fg/15" />
            <span className="size-2.5 rounded-full bg-fg/15" />
            <span className="size-2.5 rounded-full bg-fg/15" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">Mindlox AI · Command Center</span>
        </div>
        <DemoBadge label="Example Dashboard" />
      </div>

      {variant === "full" && (
        <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line px-3 py-2" role="tablist" aria-label="Dashboard views">
          {TABS.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn(
                "relative shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                tab === t ? "text-fg" : "text-fg-3 hover:text-fg-2",
              )}
            >
              {tab === t && (
                <motion.span layoutId="cc-tab" className="absolute inset-0 rounded-full bg-fg/8" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              )}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>
      )}

      <div className={cn("grid gap-3 p-3 lg:p-4", assistant ? "lg:grid-cols-[1fr_300px]" : "")}>
        <div className="min-w-0 space-y-3">
          <div className={cn("grid gap-3", variant === "hero" ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2 lg:grid-cols-4")}>
            {metrics.map((m, i) => (
              <MetricCard key={m.key} metric={m} delay={0.2 + i * 0.08} compactMode={variant === "full" && i >= 4} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="grid gap-3 lg:grid-cols-5"
            >
              {(variant === "hero" || tab === "Overview") && (
                <>
                  <Panel title="Revenue trend" sub="Collected vs. charges · $M" className="lg:col-span-3">
                    <LineChart
                      series={[
                        { name: "Collected", values: REVENUE_TREND.collected },
                        { name: "Charges", values: REVENUE_TREND.charges, color: "var(--fg-3)", dashed: true },
                      ]}
                      labels={REVENUE_TREND.labels}
                      height={200}
                      formatValue={(n) => `$${number(n, 2)}M`}
                    />
                  </Panel>
                  <Panel title="Payer mix" sub="Share of collections" className="lg:col-span-2">
                    <DonutChart data={PAYER_MIX.map((p) => ({ label: p.payer, value: p.value }))} size={150} thickness={16} centerValue="5" centerLabel="payers" />
                  </Panel>
                </>
              )}
              {variant === "full" && tab === "Claims" && (
                <>
                  <Panel title="Claims submitted" sub="Monthly volume" className="lg:col-span-3">
                    <BarChart data={REVENUE_TREND.labels.slice(0, 8).map((l, i) => ({ label: l, value: DEMO_METRICS[4].spark[i] }))} height={200} formatValue={(n) => number(n / 1000, 1) + "k"} accentIndex={7} />
                  </Panel>
                  <Panel title="Clean claim rate" sub="First-pass acceptance" className="lg:col-span-2">
                    <LineChart series={[{ name: "Clean claim rate", values: DEMO_METRICS[2].spark }]} labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]} height={200} formatValue={(n) => `${number(n, 1)}%`} />
                  </Panel>
                </>
              )}
              {variant === "full" && tab === "Denials" && (
                <>
                  <Panel title="Denial rate trend" sub="Percent of submitted claims" className="lg:col-span-3">
                    <LineChart series={[{ name: "Denial rate", values: DENIAL_TREND.values, color: "var(--negative)" }]} labels={DENIAL_TREND.labels} height={200} formatValue={(n) => `${number(n, 1)}%`} min={0} />
                  </Panel>
                  <Panel title="Top denial reasons" sub="Share of denials · CARC" className="lg:col-span-2">
                    <HBarChart data={TOP_DENIAL_REASONS.map((r) => ({ label: r.reason, value: r.value, sub: r.code }))} formatValue={(n) => `${n}%`} />
                  </Panel>
                </>
              )}
              {variant === "full" && tab === "A/R" && (
                <>
                  <Panel title="A/R aging" sub="Outstanding by bucket · $K" className="lg:col-span-3">
                    <BarChart data={AR_AGING.map((b) => ({ label: b.bucket, value: b.value }))} height={200} formatValue={(n) => `$${n}k`} />
                  </Panel>
                  <Panel title="A/R days" sub="Trailing eight months" className="lg:col-span-2">
                    <LineChart series={[{ name: "A/R days", values: DEMO_METRICS[1].spark, color: "var(--accent-2)" }]} labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]} height={200} formatValue={(n) => `${number(n, 0)} days`} />
                  </Panel>
                </>
              )}
              {variant === "full" && tab === "Payers" && (
                <Panel title="Payer performance" sub="Days to pay · denial rate · paid-as-expected" className="lg:col-span-5">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">
                        <th className="pb-2 font-medium">Payer</th>
                        <th className="pb-2 font-medium">Days to pay</th>
                        <th className="pb-2 font-medium">Denial rate</th>
                        <th className="pb-2 font-medium">Paid as expected</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PAYER_PERFORMANCE.map((p, i) => (
                        <motion.tr
                          key={p.payer}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06, duration: 0.4, ease: EASE }}
                          className="border-t border-line"
                        >
                          <td className="py-2.5 text-fg">{p.payer}</td>
                          <td className="py-2.5 font-mono tabular text-fg-2">{p.days}</td>
                          <td className={cn("py-2.5 font-mono tabular", p.denial > 5 ? "text-negative" : "text-fg-2")}>{p.denial}%</td>
                          <td className="py-2.5">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-fg/8">
                                <motion.div className="h-full bg-positive" initial={{ width: 0 }} animate={{ width: `${p.paid}%` }} transition={{ duration: 0.9, ease: EASE, delay: 0.2 + i * 0.06 }} />
                              </div>
                              <span className="font-mono text-xs tabular text-fg-2">{p.paid}%</span>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </Panel>
              )}
              {variant === "full" && tab === "Providers" && (
                <>
                  <Panel title="Provider productivity" sub="Charges per provider · $K" className="lg:col-span-3">
                    <BarChart data={["Dr. A", "Dr. B", "Dr. C", "NP D", "PA E", "Dr. F"].map((l, i) => ({ label: l, value: [184, 162, 151, 98, 91, 143][i] }))} height={200} formatValue={(n) => `$${n}k`} />
                  </Panel>
                  <Panel title="Coding accuracy" sub="Audit sample by provider" className="lg:col-span-2">
                    <HBarChart data={["Dr. A", "Dr. B", "Dr. C", "NP D"].map((l, i) => ({ label: l, value: [98, 96, 93, 97][i] }))} formatValue={(n) => `${n}%`} />
                  </Panel>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {assistant && <Assistant start={inView} />}
      </div>
    </motion.div>
  );
}

function Panel({ title, sub, children, className }: { title: string; sub?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("min-w-0 rounded-2xl border border-line bg-bg-2/60 p-4", className)}>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-fg">{title}</span>
        {sub && <span className="truncate font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">{sub}</span>}
      </div>
      {children}
    </div>
  );
}

/** The AI assistant rail — speaks like a sharp billing manager. */
export function Assistant({ start, className }: { start: boolean; className?: string }) {
  const { typed, done } = useTyping(AI_MORNING.greeting, start, 34, 900);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!done) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= AI_MORNING.recommendations.length) window.clearInterval(id);
    }, 520);
    return () => window.clearInterval(id);
  }, [done]);

  return (
    <aside className={cn("flex flex-col rounded-2xl border border-line bg-bg-2/60 p-4", className)} aria-label="AI assistant">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-accent text-accent-fg">
          <Bot className="size-4" />
        </span>
        <div>
          <p className="text-sm font-medium text-fg">Mindlox Assistant</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">AI-assisted · human-reviewed</p>
        </div>
      </div>
      <p className="mt-4 min-h-[3.2em] text-[15px] leading-relaxed text-fg">
        {typed}
        {!done && <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-accent" aria-hidden />}
      </p>
      <ul className="mt-3 space-y-2">
        {AI_MORNING.recommendations.slice(0, shown).map((r, i) => (
          <motion.li
            key={r.text}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className={cn(
              "flex items-center gap-2.5 rounded-xl border border-line bg-bg px-3 py-2.5 text-sm",
              i === AI_MORNING.recommendations.length - 1 && "border-accent/30 bg-accent-soft",
            )}
          >
            {i === AI_MORNING.recommendations.length - 1 ? (
              <Sparkles className="size-4 shrink-0 text-accent" />
            ) : (
              <CheckCircle2 className="size-4 shrink-0 text-positive" />
            )}
            <span className="flex-1 text-fg">{r.text}</span>
            {r.value && <span className="font-mono text-xs tabular text-fg-2">{r.value}</span>}
          </motion.li>
        ))}
      </ul>
      {shown >= AI_MORNING.recommendations.length && (
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 inline-flex items-center justify-center gap-1 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg"
        >
          Review the 37 claims <ChevronRight className="size-4" />
        </motion.button>
      )}
      <p className="mt-auto pt-4 font-mono text-[10px] text-fg-3">Demo data · illustrative recommendations</p>
    </aside>
  );
}

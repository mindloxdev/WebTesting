"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { DEMO_METRICS, type Metric } from "@/data/dashboard";
import { EASE } from "@/lib/motion";
import { cn, number } from "@/lib/utils";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LineChart } from "@/components/charts/LineChart";
import { formatMetric } from "@/components/visuals/MetricCard";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

const COPY: Record<string, { meaning: string; action: string; rec: string }> = {
  ncr: {
    meaning:
      "Net collection rate is what you actually collected divided by what you were contractually allowed to collect, after contractual adjustments. It is the cleanest measure of how much earned revenue your practice keeps.",
    action:
      "Mindlox AI raises it by preventing write-offs at the source — underpayment detection on every remittance, timely-filing protection on aging claims, and appeals prioritized by recoverable value.",
    rec: "3 payers below contract this month — variance review queued.",
  },
  ar: {
    meaning:
      "Days in A/R measures how long it takes, on average, to turn a charge into cash. Every day beyond the 30–40 range is working capital sitting in payer queues.",
    action:
      "Mindlox AI shortens it with same-day claim submission, daily 835 posting, and payer-specific follow-up cadences that start before balances age.",
    rec: "Medicaid claims aging past 45 days — follow-up batch prioritized.",
  },
  ccr: {
    meaning:
      "Clean claim rate is the share of claims accepted and paid on first submission without rejection, edit, or rework. It is the leading indicator for predictable cash flow.",
    action:
      "Mindlox AI scrubs against payer edits, NCCI rules, and specialty requirements before release, then feeds rejection patterns back into registration and coding.",
    rec: "Modifier 25 conflicts flagged on 11 claims before submission.",
  },
  denial: {
    meaning:
      "Denial rate is the share of submitted claims a payer refuses to pay as billed. Most denials are preventable, and a large share are never reworked at all.",
    action:
      "Mindlox AI scores denial risk before submission, categorizes every denial by CARC root cause, and works appeals in order of recoverable value and deadline.",
    rec: "8 CO-197 denials trace back to a single scheduling gap — fixed at the source.",
  },
  submitted: {
    meaning:
      "Volume of claims transmitted to payers. Consistent daily submission keeps cash flow smooth; weekly batching creates lumpy revenue and timely-filing risk.",
    action: "Mindlox AI submits daily with same-day rejection triage and charge-lag reporting back to providers.",
    rec: "Charge lag on 2 providers exceeds 3 days — reconciliation report sent.",
  },
  posted: {
    meaning:
      "Dollar value of remittances posted and reconciled to claims. Posting speed and accuracy decide whether underpayments and secondary balances surface in time to act.",
    action: "Mindlox AI posts 835s daily and validates every line against contracted rates, so variances appear the same day they arrive.",
    rec: "$5,940 in contract variances identified this week.",
  },
  recovered: {
    meaning:
      "Revenue brought back from denials, underpayments, and aged A/R that would otherwise have been written off.",
    action:
      "Mindlox AI runs recovery as a prioritized program — highest value, highest likelihood, shortest timely-filing window first — with specialists on the appeals.",
    rec: "Appeal batch of 17 claims worth $23,410 ready for review.",
  },
  outstanding: {
    meaning:
      "Total unpaid balances owed by payers and patients, best read by aging bucket. Balances past 90 days are at risk; past 120 they are usually write-offs.",
    action: "Mindlox AI segments A/R by age, payer, and value, and protects every timely-filing limit with dated follow-up.",
    rec: "$17k in the 120+ bucket — 6 claims still inside their appeal window.",
  },
};

/** "Eight numbers that run the revenue cycle" — select a KPI, read it plainly, see what we do about it. */
export function KpiDeepDive() {
  const [key, setKey] = useState<string>(DEMO_METRICS[0].key);
  const m: Metric = DEMO_METRICS.find((x) => x.key === key) ?? DEMO_METRICS[0];
  const good = m.upIsGood ? m.delta >= 0 : m.delta <= 0;
  const Arrow = m.delta >= 0 ? ArrowUpRight : ArrowDownRight;
  const c = COPY[m.key];

  return (
    <Section id="kpis">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="The numbers"
          title="Eight numbers that run the revenue cycle."
          highlight="run the revenue cycle."
          description="Pick one. We'll tell you what it actually means — and what Mindlox AI does about it."
        />
        <DemoBadge label="Example dashboard" className="lg:mb-2" />
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)]">
        <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1" role="tablist" aria-label="Key performance indicators">
          {DEMO_METRICS.map((x) => {
            const on = x.key === key;
            return (
              <li key={x.key}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setKey(x.key)}
                  className={cn(
                    "relative flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition-colors duration-300",
                    on ? "text-fg" : "text-fg-2 hover:text-fg",
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="kpi-active"
                      className="absolute inset-0 rounded-xl border border-accent/30 bg-accent-soft"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative text-sm font-medium">{x.label}</span>
                  <span className="relative font-mono text-xs tabular text-fg-3">{formatMetric(x, x.value)}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="relative min-h-[420px] overflow-hidden rounded-[22px] border border-line bg-bg-2/60 p-6 lg:p-8">
          <div className="pointer-events-none absolute inset-0 mesh-bg opacity-40" aria-hidden />
          <AnimatePresence mode="wait">
            <motion.div
              key={m.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative"
            >
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">{m.label}</p>
                  <p className="mt-2 font-display text-5xl font-bold tracking-tight text-fg lg:text-6xl">
                    <AnimatedNumber value={m.value} format={(v) => formatMetric(m, v)} duration={1.2} startOnView={false} />
                    {m.format === "days" && <span className="ml-2 text-lg font-medium text-fg-3">days</span>}
                  </p>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-xs tabular",
                    good ? "bg-positive/12 text-positive" : "bg-negative/12 text-negative",
                  )}
                >
                  <Arrow className="size-3.5" />
                  {m.delta > 0 ? "+" : ""}
                  {number(m.delta, 1)}
                  {m.format === "days" ? "d" : "%"} vs. baseline
                </span>
              </div>

              <div className="mt-6 rounded-2xl border border-line bg-bg p-4">
                <LineChart
                  series={[{ name: m.label, values: m.spark, color: good ? "var(--positive)" : "var(--negative)" }]}
                  labels={MONTHS}
                  height={170}
                  formatValue={(n) => formatMetric(m, n)}
                />
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <div>
                  <p className="eyebrow mb-2">What it means</p>
                  <p className="text-sm leading-relaxed text-fg-2">{c.meaning}</p>
                </div>
                <div>
                  <p className="eyebrow mb-2">What Mindlox AI does</p>
                  <p className="text-sm leading-relaxed text-fg-2">{c.action}</p>
                </div>
              </div>

              <div className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1.5 text-xs text-fg">
                <Sparkles className="size-3.5 shrink-0 text-accent" />
                <span className="truncate">
                  <span className="font-mono uppercase tracking-[0.12em] text-accent">AI recommendation · </span>
                  {c.rec}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

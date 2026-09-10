"use client";

import { Counter } from "@/components/ui/AnimatedNumber";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";

/* Illustrative demo values only — not Mindlox AI results. */
const STATS = [
  { label: "Days from visit to payment", value: 16, suffix: "", unit: "days", decimals: 0, note: "Median for a clean claim in the demo dataset." },
  { label: "First-pass acceptance", value: 96.8, suffix: "%", unit: "", decimals: 1, note: "Claims accepted on first submission in the demo dataset." },
  { label: "Denials prevented before submission", value: 412, suffix: "", unit: "/ month", decimals: 0, note: "Flagged by denial-risk scoring, corrected by coders before release." },
];

/** "The engine, measured" — three counting demo numbers between the problem and the lifecycle. */
export function EngineStats() {
  return (
    <div className="border-y border-line bg-bg-2/40">
      <div className="container-x py-14 lg:py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Eyebrow>The engine, measured</Eyebrow>
          <DemoBadge />
        </div>
        <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3" staggerChildren={0.08}>
          {STATS.map((s, i) => (
            <RevealItem key={s.label} className="bg-bg p-6 lg:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">{s.label}</p>
              <p className="mt-4 font-display text-5xl font-bold tracking-tight text-fg lg:text-6xl">
                <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} delay={i * 0.12} duration={1.8} />
                {s.unit && <span className="ml-2 text-lg font-medium text-fg-3">{s.unit}</span>}
              </p>
              <p className="mt-3 text-sm text-fg-2">{s.note}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-4 font-mono text-[11px] text-fg-3">Demo data — illustrative values for the concept, not Mindlox AI results. Replace with verified metrics.</p>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { CTA } from "@/data/site";
import { EASE } from "@/lib/motion";
import { cn, currency, number } from "@/lib/utils";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { MagneticButton } from "@/components/ui/MagneticButton";

/* Illustrative model. Every multiplier is shown to the visitor. No guarantees. */
const ASSUMPTIONS = {
  deniedNeverReworked: 0.35, // share of denied value that is never successfully reworked
  arDragPer30Days: 0.02, // cost of every 30 days of A/R beyond 30
  underpaymentShare: 0.02, // share of expected collections paid below contract
  recoverableShare: 0.6, // share of leakage Mindlox AI typically targets for recovery
};

type Inputs = {
  monthlyCharges: number;
  providers: number;
  monthlyClaims: number;
  denialRate: number;
  arDays: number;
  avgReimbursement: number;
};

const DEFAULTS: Inputs = {
  monthlyCharges: 450000,
  providers: 6,
  monthlyClaims: 2400,
  denialRate: 9,
  arDays: 48,
  avgReimbursement: 165,
};

const FIELDS: { key: keyof Inputs; label: string; min: number; max: number; step: number; fmt: (n: number) => string }[] = [
  { key: "monthlyCharges", label: "Monthly charges", min: 25000, max: 5000000, step: 5000, fmt: (n) => currency(n) },
  { key: "providers", label: "Number of providers", min: 1, max: 200, step: 1, fmt: (n) => `${n}` },
  { key: "monthlyClaims", label: "Average monthly claims", min: 100, max: 40000, step: 50, fmt: (n) => number(n) },
  { key: "denialRate", label: "Current denial rate", min: 1, max: 30, step: 0.5, fmt: (n) => `${number(n, 1)}%` },
  { key: "arDays", label: "Current A/R days", min: 15, max: 120, step: 1, fmt: (n) => `${n} days` },
  { key: "avgReimbursement", label: "Average reimbursement per claim", min: 25, max: 2500, step: 5, fmt: (n) => currency(n) },
];

export function computeLeakage(i: Inputs) {
  const expected = Math.min(i.monthlyClaims * i.avgReimbursement, i.monthlyCharges);
  const deniedValue = expected * (i.denialRate / 100);
  const denialLeak = deniedValue * ASSUMPTIONS.deniedNeverReworked;
  const arLeak = (Math.max(0, i.arDays - 30) / 30) * expected * ASSUMPTIONS.arDragPer30Days;
  const underpay = expected * ASSUMPTIONS.underpaymentShare;
  const leakage = denialLeak + arLeak + underpay;
  const recovery = leakage * ASSUMPTIONS.recoverableShare;
  return { expected, denialLeak, arLeak, underpay, leakage, recovery, annual: recovery * 12 };
}

type Props = { className?: string; compact?: boolean };

/** Inputs animate outputs in real time. Numbers roll, they never jump. */
export function LeakageCalculator({ className, compact }: Props) {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const [showAssumptions, setShowAssumptions] = useState(false);
  const r = useMemo(() => computeLeakage(inputs), [inputs]);
  const set = (k: keyof Inputs, v: number) => setInputs((s) => ({ ...s, [k]: v }));

  const parts = [
    { label: "Denials never reworked", value: r.denialLeak, color: "var(--negative)" },
    { label: "A/R drag & timely filing", value: r.arLeak, color: "var(--warning)" },
    { label: "Underpayments", value: r.underpay, color: "var(--accent-3)" },
  ];

  return (
    <div className={cn("overflow-hidden rounded-[22px] border border-line bg-bg shadow-e3", className)}>
      <div className={cn("grid", compact ? "lg:grid-cols-[1fr_1fr]" : "lg:grid-cols-[1.1fr_1fr]")}>
        {/* Inputs */}
        <div className="border-b border-line p-6 lg:border-b-0 lg:border-r lg:p-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="eyebrow">Your practice</p>
            <DemoBadge label="Illustrative estimate" />
          </div>
          <div className="space-y-5">
            {FIELDS.map((f) => (
              <div key={f.key}>
                <div className="mb-2 flex items-baseline justify-between">
                  <label htmlFor={`calc-${f.key}`} className="text-sm font-medium text-fg">
                    {f.label}
                  </label>
                  <span className="font-mono text-sm tabular text-accent">{f.fmt(inputs[f.key])}</span>
                </div>
                <input
                  id={`calc-${f.key}`}
                  type="range"
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  value={inputs[f.key]}
                  onChange={(e) => set(f.key, Number(e.target.value))}
                  className="calc-range w-full"
                  aria-valuetext={f.fmt(inputs[f.key])}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Outputs */}
        <div className="relative p-6 lg:p-8">
          <div className="pointer-events-none absolute inset-0 mesh-bg opacity-60" aria-hidden />
          <div className="relative">
            <p className="eyebrow mb-6">Estimated impact</p>

            <div className="space-y-5">
              <Output label="Estimated revenue leakage" sub="per month" value={r.leakage} large tone="negative" />
              <Output label="Potential recovery" sub="per month" value={r.recovery} tone="positive" />
              <Output label="Potential annual impact" sub="12 months" value={r.annual} tone="accent" />
            </div>

            {/* composition bar */}
            <div className="mt-6">
              <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-fg/8">
                {parts.map((p) => (
                  <motion.div
                    key={p.label}
                    className="h-full"
                    style={{ background: p.color }}
                    animate={{ width: `${(p.value / (r.leakage || 1)) * 100}%` }}
                    transition={{ duration: 0.7, ease: EASE }}
                  />
                ))}
              </div>
              <ul className="mt-3 grid gap-1.5 text-xs text-fg-2 sm:grid-cols-3">
                {parts.map((p) => (
                  <li key={p.label} className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full" style={{ background: p.color }} />
                    {p.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <MagneticButton href={CTA.auditHref} arrow hoverLabel="Get My Personalized Audit">
                Get a Personalized Revenue Audit
              </MagneticButton>
            </div>

            <button
              type="button"
              onClick={() => setShowAssumptions((s) => !s)}
              className="mt-5 inline-flex items-center gap-1 text-xs text-fg-3 hover:text-fg"
              aria-expanded={showAssumptions}
            >
              Illustrative estimate — see assumptions
              <ChevronDown className={cn("size-3.5 transition-transform", showAssumptions && "rotate-180")} />
            </button>
            {showAssumptions && (
              <ul className="mt-2 space-y-1 rounded-xl bg-bg-2 p-3 font-mono text-[11px] leading-relaxed text-fg-3">
                <li>Expected collections = min(claims × avg reimbursement, monthly charges)</li>
                <li>Denial leak = expected × denial rate × {ASSUMPTIONS.deniedNeverReworked * 100}% never reworked</li>
                <li>A/R drag = {ASSUMPTIONS.arDragPer30Days * 100}% of expected per 30 days beyond 30 A/R days</li>
                <li>Underpayments = {ASSUMPTIONS.underpaymentShare * 100}% of expected collections</li>
                <li>Recovery = {ASSUMPTIONS.recoverableShare * 100}% of leakage. Not a guarantee. Actual results vary by practice, payer mix, and specialty.</li>
              </ul>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

function Output({ label, sub, value, large, tone }: { label: string; sub: string; value: number; large?: boolean; tone: "negative" | "positive" | "accent" }) {
  const color = tone === "negative" ? "text-negative" : tone === "positive" ? "text-positive" : "text-accent";
  return (
    <div className="flex items-end justify-between gap-4 border-b border-line pb-4 last:border-b-0">
      <div>
        <p className="text-sm font-medium text-fg">{label}</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">{sub}</p>
      </div>
      <span className={cn("font-display font-bold tracking-tight", color, large ? "text-4xl lg:text-5xl" : "text-2xl lg:text-3xl")}>
        <AnimatedNumber value={value} format={(n) => currency(n)} duration={1.2} />
      </span>
    </div>
  );
}

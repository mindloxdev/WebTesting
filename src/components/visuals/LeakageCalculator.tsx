"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  /** Months before recovery reaches full run-rate. Months 1..n ramp linearly. */
  rampMonths: 3,
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

type Field = {
  key: keyof Inputs;
  label: string;
  min: number;
  max: number;
  step: number;
  fmt: (n: number) => string;
};

const FIELDS: Field[] = [
  { key: "monthlyCharges", label: "Monthly charges", min: 25000, max: 5000000, step: 5000, fmt: (n) => currency(n) },
  { key: "providers", label: "Number of providers", min: 1, max: 200, step: 1, fmt: (n) => `${n}` },
  { key: "monthlyClaims", label: "Average monthly claims", min: 100, max: 40000, step: 50, fmt: (n) => number(n) },
  { key: "denialRate", label: "Current denial rate", min: 1, max: 30, step: 0.5, fmt: (n) => `${number(n, 1)}%` },
  { key: "arDays", label: "Current A/R days", min: 15, max: 120, step: 1, fmt: (n) => `${n} days` },
  { key: "avgReimbursement", label: "Average reimbursement per claim", min: 25, max: 2500, step: 5, fmt: (n) => currency(n) },
];

/**
 * Benchmark starting points so a visitor sees a figure shaped like their own
 * practice before touching a single slider. Illustrative mid-size profiles —
 * charges always sit above expected collections, as they do in reality.
 */
const PRESETS: { label: string; inputs: Inputs }[] = [
  { label: "Primary Care", inputs: DEFAULTS },
  { label: "Cardiology", inputs: { monthlyCharges: 1150000, providers: 8, monthlyClaims: 3200, denialRate: 11, arDays: 52, avgReimbursement: 310 } },
  { label: "Orthopedics", inputs: { monthlyCharges: 1250000, providers: 7, monthlyClaims: 2100, denialRate: 12.5, arDays: 55, avgReimbursement: 520 } },
  { label: "Behavioral Health", inputs: { monthlyCharges: 480000, providers: 10, monthlyClaims: 3400, denialRate: 13, arDays: 44, avgReimbursement: 120 } },
  { label: "Urgent Care", inputs: { monthlyCharges: 810000, providers: 12, monthlyClaims: 5200, denialRate: 8, arDays: 38, avgReimbursement: 135 } },
  { label: "Radiology", inputs: { monthlyCharges: 880000, providers: 9, monthlyClaims: 8000, denialRate: 10, arDays: 46, avgReimbursement: 95 } },
];

/** Clamp to the slider's own range and fall back to the default if the value is not a finite number. */
const clamp = (v: number, key: keyof Inputs) => {
  const f = FIELDS.find((x) => x.key === key)!;
  if (!Number.isFinite(v)) return DEFAULTS[key];
  return Math.min(f.max, Math.max(f.min, v));
};

/**
 * Pure and total: every input is clamped to its slider range first, so no entry
 * can produce NaN, a negative figure, or a zero result. At the floor of every
 * slider the model still returns a positive leakage figure.
 */
export function computeLeakage(input: Inputs) {
  const i: Inputs = {
    monthlyCharges: clamp(input.monthlyCharges, "monthlyCharges"),
    providers: clamp(input.providers, "providers"),
    monthlyClaims: clamp(input.monthlyClaims, "monthlyClaims"),
    denialRate: clamp(input.denialRate, "denialRate"),
    arDays: clamp(input.arDays, "arDays"),
    avgReimbursement: clamp(input.avgReimbursement, "avgReimbursement"),
  };
  const expected = Math.min(i.monthlyClaims * i.avgReimbursement, i.monthlyCharges);
  const deniedValue = expected * (i.denialRate / 100);
  const denialLeak = deniedValue * ASSUMPTIONS.deniedNeverReworked;
  const arLeak = (Math.max(0, i.arDays - 30) / 30) * expected * ASSUMPTIONS.arDragPer30Days;
  const underpay = expected * ASSUMPTIONS.underpaymentShare;
  const leakage = denialLeak + arLeak + underpay;
  const recovery = leakage * ASSUMPTIONS.recoverableShare;
  return { expected, denialLeak, arLeak, underpay, leakage, recovery, annual: recovery * 12, perProvider: leakage / i.providers };
}

/**
 * Twelve cumulative months of leaking vs. recovering, side by side.
 *
 * Recovery ramps over the first `rampMonths` instead of starting at full
 * run-rate — a program takes a quarter to reach steady state, and a chart that
 * pretended otherwise would overstate month one.
 */
function project(monthly: { leakage: number; recovery: number }) {
  const out: { month: number; leaked: number; recovered: number }[] = [];
  let leaked = 0;
  let recovered = 0;
  for (let m = 1; m <= 12; m++) {
    leaked += monthly.leakage;
    recovered += monthly.recovery * Math.min(1, m / ASSUMPTIONS.rampMonths);
    out.push({ month: m, leaked, recovered });
  }
  return out;
}

type Props = {
  className?: string;
  compact?: boolean;
  /**
   * Adds the breakdown-by-cause band and the 12-month projection below the
   * card. Used on the dedicated calculator page; the home page section stays
   * lean so it does not outweigh the sections around it.
   */
  detailed?: boolean;
};

/** Inputs animate outputs in real time. Numbers roll, they never jump. */
export function LeakageCalculator({ className, compact, detailed }: Props) {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const [showAssumptions, setShowAssumptions] = useState(false);
  const r = useMemo(() => computeLeakage(inputs), [inputs]);
  const set = (k: keyof Inputs, v: number) => setInputs((s) => ({ ...s, [k]: clamp(v, k) }));

  /** Matched by value, not by a stored id — so editing any slider drops back to "Custom" on its own. */
  const activePreset = PRESETS.find((p) => FIELDS.every((f) => p.inputs[f.key] === inputs[f.key]))?.label ?? null;

  const parts = [
    {
      label: "Denials never reworked",
      value: r.denialLeak,
      color: "var(--negative)",
      formula: `Expected × denial rate × ${ASSUMPTIONS.deniedNeverReworked * 100}% never reworked`,
      fix: "Root-cause coding fixes, prioritized appeals, and prevention rules so the same denial stops coming back.",
    },
    {
      label: "A/R drag & timely filing",
      value: r.arLeak,
      color: "var(--warning)",
      formula: `${ASSUMPTIONS.arDragPer30Days * 100}% of expected per 30 days beyond 30 A/R days`,
      fix: "Aging worked by payer strategy and filing deadline — not in queue order, where the oldest dollars die last.",
    },
    {
      label: "Underpayments",
      value: r.underpay,
      color: "var(--accent-3)",
      formula: `${ASSUMPTIONS.underpaymentShare * 100}% of expected collections`,
      fix: "Every remit matched against contracted rates, with variances flagged and appealed.",
    },
  ];

  return (
    <div className={cn("overflow-hidden rounded-[22px] border border-line bg-bg shadow-e3", className)}>
      <div className={cn("grid", compact ? "lg:grid-cols-[1fr_1fr]" : "lg:grid-cols-[1.1fr_1fr]")}>
        {/* Inputs */}
        <div className="flex flex-col border-b border-line p-6 lg:border-b-0 lg:border-r lg:p-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="eyebrow">Your practice</p>
            <DemoBadge label="Illustrative estimate" />
          </div>

          {/* Specialty benchmarks */}
          <div className="mb-6">
            <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">
              Start from a benchmark
            </p>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((p) => {
                const on = activePreset === p.label;
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setInputs(p.inputs)}
                    aria-pressed={on}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors",
                      on
                        ? "border-accent bg-accent-soft text-accent"
                        : "border-line text-fg-2 hover:border-fg/20 hover:text-fg",
                    )}
                  >
                    {p.label}
                  </button>
                );
              })}
              <span
                className={cn(
                  "rounded-full border border-dashed border-line px-3 py-1.5 text-[12.5px] font-medium text-fg-3 transition-opacity",
                  activePreset ? "opacity-0" : "opacity-100",
                )}
                aria-hidden={!!activePreset}
              >
                Custom
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-between gap-5">
            {FIELDS.map((f) => (
              <div key={f.key}>
                <div className="mb-2 flex items-baseline justify-between gap-3">
                  <label htmlFor={`calc-${f.key}`} className="text-sm font-medium text-fg">
                    {f.label}
                  </label>
                  <ValueInput field={f} value={inputs[f.key]} onCommit={(v) => set(f.key, v)} />
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

            {/* Per-provider framing — the figure a physician-owner recognises. */}
            <p className="mt-5 text-sm text-fg-2">
              That is roughly{" "}
              <span className="font-mono font-semibold tabular text-fg">
                <AnimatedNumber value={r.perProvider} format={(n) => currency(n)} duration={1} immediate />
              </span>{" "}
              per provider, per month.
            </p>

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
                {detailed && (
                  <li>
                    Projection ramps recovery over the first {ASSUMPTIONS.rampMonths} months (⅓, ⅔, then full run-rate)
                    rather than assuming month one performs like month twelve.
                  </li>
                )}
                <li>Specialty benchmarks are illustrative starting points, not published averages.</li>
              </ul>
            )}

            {/* Fills the space left under the CTA: the outputs column is shorter
                than the inputs column, and the projection belongs beside the
                figures it projects rather than in a band further down. */}
            {detailed && <Projection result={r} />}
          </div>
        </div>
      </div>

      {detailed && <DetailBand parts={parts} result={r} />}
    </div>
  );
}

/**
 * Editable readout. Typing commits live while the entry is inside the slider's
 * range, and clamps on blur — so a half-typed "4" on a field with a 25,000
 * floor does not snap under the cursor mid-keystroke.
 */
function ValueInput({ field, value, onCommit }: { field: Field; value: number; onCommit: (v: number) => void }) {
  const [draft, setDraft] = useState<string | null>(null);
  const parse = (s: string) => {
    const n = Number(s.replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) && s.replace(/[^0-9.]/g, "") !== "" ? n : null;
  };
  return (
    <input
      type="text"
      inputMode="decimal"
      aria-label={`${field.label} value`}
      value={draft ?? field.fmt(value)}
      onFocus={(e) => {
        setDraft(String(value));
        e.currentTarget.select();
      }}
      onChange={(e) => {
        const raw = e.target.value;
        setDraft(raw);
        const n = parse(raw);
        if (n !== null && n >= field.min && n <= field.max) onCommit(n);
      }}
      onBlur={() => {
        const n = draft === null ? null : parse(draft);
        if (n !== null) onCommit(n);
        setDraft(null);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.currentTarget.blur();
        if (e.key === "Escape") {
          setDraft(null);
          e.currentTarget.blur();
        }
      }}
      className="w-28 rounded-md border border-transparent bg-transparent px-1.5 py-0.5 text-right font-mono text-sm tabular text-accent transition-colors hover:border-line focus:border-accent focus:bg-bg focus:outline-none"
    />
  );
}

type Part = { label: string; value: number; color: string; formula: string; fix: string };

/** Full-width band under the card: what each leak is, and how to fix it. */
function DetailBand({ parts, result }: { parts: Part[]; result: ReturnType<typeof computeLeakage> }) {
  return (
    <div className="border-t border-line bg-bg-2/50">
      <div className="grid gap-px bg-line md:grid-cols-3">
        {parts.map((p) => (
          <div key={p.label} className="bg-bg p-6">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ background: p.color }} />
              <h4 className="text-sm font-semibold text-fg">{p.label}</h4>
            </div>
            <p className="mt-3 font-display text-2xl font-bold tracking-tight text-fg">
              <AnimatedNumber value={p.value} format={(n) => currency(n)} duration={1} immediate />
              <span className="ml-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-fg-3">
                /mo · {number((p.value / (result.leakage || 1)) * 100)}%
              </span>
            </p>
            <p className="mt-3 font-mono text-[11px] leading-relaxed text-fg-3">{p.formula}</p>
            <p className="mt-3 text-sm leading-relaxed text-fg-2">{p.fix}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Twelve bars, kept deliberately short so the band reads as a footnote to the
 * figures above rather than a second chart competing with them. Full height is
 * what leaks if nothing changes; the fill is what a program targets back.
 */
function Projection({ result }: { result: ReturnType<typeof computeLeakage> }) {
  const reduce = useReducedMotion();
  const data = useMemo(() => project(result), [result]);
  const max = data[data.length - 1].leaked || 1;
  const final = data[data.length - 1];

  return (
    <div className="mt-8 border-t border-line pt-6">
      <p className="eyebrow">The cost of waiting</p>
      <p className="mt-2 text-sm leading-relaxed text-fg-2">Leakage compounds every month it goes unaddressed.</p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
        <Legend swatch="color-mix(in oklab, var(--negative) 22%, transparent)" label="Leaked, cumulative" value={final.leaked} />
        <Legend swatch="var(--accent)" label="Recovered, cumulative" value={final.recovered} />
      </div>

      {/*
        Bars are absolutely positioned inside a relatively-positioned plot area.
        A percentage height needs a containing block with a definite height, and
        only the plot area has one — a bar laid out in normal flow would resolve
        its percentage against an auto height and collapse to nothing.
      */}
      <div
        className="mt-5 flex h-24 gap-1 sm:gap-1.5"
        role="img"
        aria-label={`Twelve-month projection: ${currency(final.leaked)} leaked cumulatively, ${currency(final.recovered)} potentially recovered.`}
      >
        {data.map((d) => (
          <div key={d.month} className="flex flex-1 flex-col">
            <div className="relative flex-1">
              <motion.div
                className="absolute inset-x-0 bottom-0 rounded-t-md"
                style={{ background: "color-mix(in oklab, var(--negative) 18%, transparent)" }}
                animate={{ height: `${(d.leaked / max) * 100}%` }}
                transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
              >
                <motion.div
                  className="absolute inset-x-0 bottom-0 rounded-t-md"
                  style={{ background: "linear-gradient(to top, var(--accent), var(--accent-2))" }}
                  animate={{ height: `${(d.recovered / (d.leaked || 1)) * 100}%` }}
                  transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
                />
              </motion.div>
            </div>
            <span className="mt-1.5 text-center font-mono text-[10px] text-fg-3">{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Legend({ swatch, label, value }: { swatch: string; label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center gap-1.5">
        <span className="size-2 rounded-full" style={{ background: swatch }} />
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">{label}</span>
      </div>
      <p className="mt-1 font-display text-lg font-bold tracking-tight text-fg">
        <AnimatedNumber value={value} format={(n) => currency(n)} duration={1} immediate />
      </p>
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
        <AnimatedNumber value={value} format={(n) => currency(n)} duration={1.2} immediate />
      </span>
    </div>
  );
}

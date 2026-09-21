"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, FileCode2, Scale, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { EASE } from "@/lib/motion";
import { cn, number } from "@/lib/utils";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { MagneticButton } from "@/components/ui/MagneticButton";

/**
 * Where a denial is born. A denial is almost never created by the team that
 * receives it, which is why sorting by stage changes the conversation: the
 * fix for a CO-197 lives at the front desk, not in the appeals queue.
 */
const STAGES = {
  front: { label: "Front end", icon: ClipboardCheck, blurb: "Created before the patient is seen — eligibility, benefits, and authorization." },
  coding: { label: "Coding", icon: FileCode2, blurb: "Created in documentation and code selection, after the visit but before submission." },
  submission: { label: "Submission", icon: Send, blurb: "Created in the claim itself — data, attachments, and timing." },
  contract: { label: "Payer & contract", icon: Scale, blurb: "Created by the contract and the payer's own adjudication rules." },
} as const;

type StageKey = keyof typeof STAGES;

/** How much of the denied dollar a clean appeal process typically gets back. */
type Recovery = "High" | "Partial" | "Low";

type Denial = {
  code: string;
  title: string;
  /** Illustrative share of denied claims, not a published statistic. */
  share: number;
  stage: StageKey;
  recovery: Recovery;
  /** The payer's own language, paraphrased. */
  means: string;
  why: string;
  prevent: string;
};

/**
 * The eight CARC codes that account for most denied volume in a typical
 * outpatient practice. Shares are illustrative and deliberately sum to 93 —
 * the remaining 7% is the long tail of everything else.
 */
const DENIALS: Denial[] = [
  {
    code: "CO-197",
    title: "Prior authorization absent",
    share: 19,
    stage: "front",
    recovery: "Partial",
    means: "Precertification, authorization, or notification was required and is missing.",
    why: "The service was scheduled and performed before anyone confirmed the payer required an auth — or the auth existed but covered a different CPT, date, or place of service than the one billed.",
    prevent: "An auth requirement check at scheduling, not at check-in, plus a tracked worklist for every pending request. Retro-auth windows are short, so the clock starts the day of service.",
  },
  {
    code: "CO-16",
    title: "Claim lacks information",
    share: 17,
    stage: "submission",
    recovery: "High",
    means: "The claim or service is missing information, or has a submission or billing error.",
    why: "Almost always a data problem rather than a clinical one: a missing modifier, an absent referring NPI, a blank accident date, or an attachment the payer expected and did not receive.",
    prevent: "Payer-specific scrubbing rules at the clearinghouse so the claim never leaves with the field empty. This is the single most preventable code on the list.",
  },
  {
    code: "CO-11",
    title: "Diagnosis inconsistent with procedure",
    share: 13,
    stage: "coding",
    recovery: "High",
    means: "The diagnosis reported does not support the procedure billed.",
    why: "The documentation supports the service but the selected ICD-10 code does not link to it, or the highest-specificity code was available and a general one was chosen instead.",
    prevent: "Specialty-aware coding review with payer LCD/NCD edits applied before submission, and feedback to the provider when the documentation itself is the gap.",
  },
  {
    code: "CO-97",
    title: "Bundled into another service",
    share: 11,
    stage: "coding",
    recovery: "Partial",
    means: "The benefit for this service is included in the payment for another service already adjudicated.",
    why: "An NCCI edit pair was billed without the modifier that documents a separate, distinct service — or the two really were one service and the second line should not have been billed.",
    prevent: "NCCI and MUE edits run pre-submission, with modifier 25 and 59 applied only where the record genuinely supports them. Applied reflexively, they invite an audit.",
  },
  {
    code: "CO-50",
    title: "Not deemed medically necessary",
    share: 10,
    stage: "coding",
    recovery: "Partial",
    means: "The payer does not consider the service medically necessary as documented.",
    why: "The note does not establish what the payer's coverage policy asks for — failed conservative therapy, a required duration, or a prior result — even when the care was plainly appropriate.",
    prevent: "Coverage-policy criteria surfaced at the point of documentation, and an appeal packet built from the record rather than a form letter. These overturn often when they are worked properly.",
  },
  {
    code: "PR-204",
    title: "Not covered under the plan",
    share: 9,
    stage: "front",
    recovery: "Low",
    means: "The service, equipment, or drug is not a benefit under the patient's current plan.",
    why: "Coverage was verified at a plan level but not at a benefit level, so a genuinely non-covered service was performed with no financial conversation beforehand.",
    prevent: "Benefit-level verification for the specific CPT, and a signed ABN or financial-responsibility form before the visit. The dollar is collectable from the patient only if the conversation happened first.",
  },
  {
    code: "CO-45",
    title: "Charge exceeds allowable",
    share: 8,
    stage: "contract",
    recovery: "Low",
    means: "The charge exceeds the fee schedule or maximum allowable amount.",
    why: "Usually a legitimate contractual write-off — which is exactly why it goes unexamined. Underpayments hide here when the payer's allowable is below the rate the contract actually specifies.",
    prevent: "Every remit matched against loaded contract rates, so a CO-45 that is really an underpayment is flagged as a variance instead of written off automatically.",
  },
  {
    code: "CO-29",
    title: "Timely filing expired",
    share: 6,
    stage: "submission",
    recovery: "Low",
    means: "The time limit for filing the claim has expired.",
    why: "The claim sat in a hold queue, bounced between a secondary payer and the practice, or was denied once and never reworked before the window closed.",
    prevent: "Aging worked by filing deadline rather than by balance, so the claims closest to expiry move first. Once this code lands, the money is almost always gone.",
  },
];

/** Illustrative share of denials not covered by the eight codes above. */
const LONG_TAIL = 100 - DENIALS.reduce((s, d) => s + d.share, 0);

const RECOVERY_STYLE: Record<Recovery, string> = {
  High: "border-positive/30 bg-positive/10 text-positive",
  Partial: "border-warning/30 bg-warning/10 text-warning",
  Low: "border-negative/30 bg-negative/10 text-negative",
};

const RECOVERY_NOTE: Record<Recovery, string> = {
  High: "Usually recoverable — correct and resubmit or appeal.",
  Partial: "Sometimes recoverable — depends on the record and the window.",
  Low: "Rarely recoverable once it lands. Prevention is the only real fix.",
};

const FILTERS = [{ key: "all" as const, label: "All denials" }, ...(Object.keys(STAGES) as StageKey[]).map((k) => ({ key: k, label: STAGES[k].label }))];

type Props = { className?: string };

/**
 * The denial codes a practice actually sees, sorted by where they are created
 * rather than by who ends up working them. Pick a stage to see which denials
 * originate there; pick a code to see what it means and what stops it.
 */
export function DenialExplorer({ className }: Props) {
  const [filter, setFilter] = useState<StageKey | "all">("all");
  const [selected, setSelected] = useState<string>(DENIALS[0].code);

  const visible = useMemo(
    () => (filter === "all" ? DENIALS : DENIALS.filter((d) => d.stage === filter)),
    [filter],
  );

  // Filtering must never leave the detail pane showing a code the list no
  // longer offers, so fall back to the first row still on screen.
  const active = visible.find((d) => d.code === selected) ?? visible[0];
  const filteredShare = visible.reduce((s, d) => s + d.share, 0);
  const StageIcon = STAGES[active.stage].icon;

  return (
    <div className={cn("overflow-hidden rounded-[22px] border border-line bg-bg shadow-e3", className)}>
      {/* Stage filter */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line p-6 lg:px-8">
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => {
            const on = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={on}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors",
                  on ? "border-accent bg-accent-soft text-accent" : "border-line text-fg-2 hover:border-fg/20 hover:text-fg",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-fg-3">
            {visible.length} {visible.length === 1 ? "code" : "codes"} · ~{number(filteredShare)}% of denials
          </span>
          <DemoBadge label="Illustrative" />
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.05fr]">
        {/* Code list */}
        <ul className="border-b border-line p-3 lg:border-b-0 lg:border-r lg:p-4">
          {visible.map((d) => {
            const on = d.code === active.code;
            return (
              <li key={d.code}>
                <button
                  type="button"
                  onClick={() => setSelected(d.code)}
                  aria-current={on}
                  className={cn(
                    "group w-full rounded-xl px-4 py-3.5 text-left transition-colors",
                    on ? "bg-accent-soft" : "hover:bg-fg/4",
                  )}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className={cn("font-mono text-[13px] font-semibold", on ? "text-accent" : "text-fg-2")}>
                      {d.code}
                    </span>
                    <span className="font-mono text-[11px] tabular text-fg-3">{d.share}%</span>
                  </div>
                  <p className={cn("mt-0.5 text-[15px] font-medium", on ? "text-fg" : "text-fg-2 group-hover:text-fg")}>
                    {d.title}
                  </p>
                  {/* Share bar — the visual weight of each code against the largest one. */}
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-fg/8">
                    <motion.div
                      className={cn("h-full rounded-full", on ? "bg-accent" : "bg-fg/25")}
                      initial={false}
                      animate={{ width: `${(d.share / DENIALS[0].share) * 100}%` }}
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  </div>
                </button>
              </li>
            );
          })}
          {filter === "all" && (
            <li className="px-4 py-3 font-mono text-[11px] text-fg-3">
              + ~{LONG_TAIL}% across the long tail of remaining codes
            </li>
          )}
        </ul>

        {/* Detail */}
        {/*
          Keyed remount with no exit animation, deliberately. An
          AnimatePresence `mode="wait"` here would leave this column empty for a
          frame between codes; the card would collapse to the list's height, the
          document would shorten, and the browser would yank the scroll position.
          Mounting the new panel in the same commit keeps the height continuous.
        */}
        <div className="relative p-6 lg:p-8">
          <div className="pointer-events-none absolute inset-0 mesh-bg opacity-60" aria-hidden />
          <div className="lg:min-h-[30rem]">
            <motion.div
              key={active.code}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="relative"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-line bg-bg px-2 py-1 font-mono text-[12px] font-semibold text-fg">
                  {active.code}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg px-2.5 py-1 text-[11px] font-medium text-fg-2">
                  <StageIcon className="size-3.5" aria-hidden />
                  {STAGES[active.stage].label}
                </span>
                <span className={cn("rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em]", RECOVERY_STYLE[active.recovery])}>
                  {active.recovery} recovery
                </span>
              </div>

              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-fg lg:text-3xl">
                {active.title}
              </h3>
              <p className="mt-2 text-sm italic leading-relaxed text-fg-3">&ldquo;{active.means}&rdquo;</p>

              <Block label="Why it happens" body={active.why} />
              <Block label="What stops it" body={active.prevent} accent />

              <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-fg-3">
                {RECOVERY_NOTE[active.recovery]} Roughly{" "}
                <span className="font-mono font-semibold text-fg-2">{active.share}%</span> of denied claims in a typical
                practice carry this code.
              </p>

              <div className="mt-6">
                <MagneticButton href="/#calculator" size="sm" arrow magnetic={false}>
                  Estimate what denials cost you
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Block({ label, body, accent }: { label: string; body: string; accent?: boolean }) {
  return (
    <div className={cn("mt-5 rounded-xl border p-4", accent ? "border-accent/25 bg-accent-soft" : "border-line bg-bg")}>
      <p className={cn("eyebrow mb-2", accent && "text-accent")}>{label}</p>
      <p className="text-sm leading-relaxed text-fg-2">{body}</p>
    </div>
  );
}

/** Stage legend — the four places a denial is created, for the section around the explorer. */
export function DenialStages({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {(Object.keys(STAGES) as StageKey[]).map((k) => {
        const s = STAGES[k];
        const Icon = s.icon;
        const count = DENIALS.filter((d) => d.stage === k).length;
        const share = DENIALS.filter((d) => d.stage === k).reduce((a, d) => a + d.share, 0);
        return (
          <div key={k} className="rounded-2xl border border-line bg-bg p-5">
            <Icon className="size-5 text-accent" aria-hidden />
            <p className="mt-3 font-display text-base font-semibold text-fg">{s.label}</p>
            <p className="mt-1 font-mono text-[11px] text-fg-3">
              {count} codes · ~{share}% of denials
            </p>
            <p className="mt-2 text-sm leading-relaxed text-fg-2">{s.blurb}</p>
          </div>
        );
      })}
    </div>
  );
}

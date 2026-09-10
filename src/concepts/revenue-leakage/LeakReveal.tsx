"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Check, Search, Wrench } from "lucide-react";
import { useRef, useState } from "react";
import { LEAK_CAUSES } from "@/data/dashboard";
import { EASE } from "@/lib/motion";
import { cn, currency, pad2 } from "@/lib/utils";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { TextReveal } from "@/components/ui/TextReveal";

/* Illustrative scenario — every figure is demo data. */
const BASE = 2_400_000; // annual collections of the example practice
const LEAK_RATE = 0.18; // share of revenue leaking across the seven causes
const LEAK_TOTAL = BASE * LEAK_RATE;
const RECOVER_SHARE = 0.6; // share of the leak the recovery steps target

const CAUSE_COLORS = ["#f0466a", "#f4633f", "#f59e0b", "#e0557f", "#c05cff", "#ff7a59", "#d9822b"];

const RECOVERY = [
  {
    title: "Find it.",
    icon: Search,
    detail: "AI-assisted pattern detection scores every claim for denial risk, flags eligibility mismatches, and compares every remittance to contract.",
  },
  {
    title: "Fix it.",
    icon: Wrench,
    detail: "Certified coders, denial specialists, and A/R strategists resolve the root cause — and feed it back to the front end so it doesn't recur.",
  },
  {
    title: "Recover it.",
    icon: Check,
    detail: "Appeals filed before deadlines, underpayments pursued, aged A/R worked by value. Revenue returns to the practice.",
  },
];

type Step = { kind: "cause"; i: number } | { kind: "beat" } | { kind: "recover"; i: number };
const STEPS: Step[] = [
  ...LEAK_CAUSES.map((_, i) => ({ kind: "cause" as const, i })),
  { kind: "beat" as const },
  ...RECOVERY.map((_, i) => ({ kind: "recover" as const, i })),
];
const N = STEPS.length;
const CAUSE_COUNT = LEAK_CAUSES.length;
const BEAT = CAUSE_COUNT;
const RECOVER_START = CAUSE_COUNT + 1;

/**
 * The Leak Reveal — Apple-style sticky storytelling. The pinned vessel drains
 * through seven causes as they scroll past, then refills stage by stage.
 * Numbers roll; they never jump.
 */
export function LeakReveal({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(-1);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 55%", "end 45%"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(v <= 0 ? -1 : Math.min(N - 1, Math.floor(v * N)));
  });

  const drained = active < 0 ? 0 : Math.min(CAUSE_COUNT, active + 1);
  const recoverStep = active >= RECOVER_START ? active - RECOVER_START : -1; // 0 find, 1 fix, 2 recover
  const recoveredFrac = recoverStep === 1 ? 0.5 : recoverStep === 2 ? 1 : 0;

  const drainedAmount = LEAK_CAUSES.slice(0, drained).reduce((a, c) => a + (c.share / 100) * LEAK_TOTAL, 0);
  const recoveredAmount = LEAK_TOTAL * RECOVER_SHARE * recoveredFrac;
  const kept = BASE - drainedAmount + recoveredAmount;
  const keptPct = (kept / BASE) * 100;

  /* how many drained segments are green at each recovery step */
  const greenUpTo = recoverStep === 2 ? CAUSE_COUNT : recoverStep === 1 ? Math.ceil(CAUSE_COUNT / 2) : 0;

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        {/* Pinned visual */}
        <div className="sticky top-[68px] z-10 h-[42vh] bg-bg py-3 lg:top-24 lg:h-[calc(100vh-7rem)] lg:py-0">
          <div className="flex h-full flex-col">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">Illustrative practice · {currency(BASE)} annual collections</span>
              <DemoBadge label="Illustrative Data" />
            </div>

            <div className="mt-3 flex items-baseline gap-3 lg:mt-6">
              <span className="font-display text-3xl font-bold tracking-tight text-fg lg:text-5xl">
                <AnimatedNumber value={kept} from={BASE} startOnView={false} format={(n) => currency(n)} duration={0.9} />
              </span>
              <span className="text-sm text-fg-3">revenue kept</span>
            </div>
            <div className="mt-1 h-5 font-mono text-xs tabular">
              {recoverStep >= 0 ? (
                <span className="text-positive">+{currency(recoveredAmount)} recovered</span>
              ) : drained > 0 ? (
                <span className="text-negative">−{currency(drainedAmount)} leaked</span>
              ) : (
                <span className="text-fg-3">Every dollar accounted for — for now.</span>
              )}
            </div>

            {/* vessels */}
            <div className="mt-4 flex min-h-0 flex-1 gap-5 lg:mt-8 lg:gap-8">
              {/* Revenue kept */}
              <div className="flex w-[84px] shrink-0 flex-col lg:w-[110px]">
                <div className="relative flex-1 overflow-hidden rounded-2xl border border-line bg-bg-2">
                  <motion.div
                    className="absolute inset-x-0 bottom-0 bg-linear-to-t from-accent to-accent-2"
                    animate={{ height: `${keptPct}%` }}
                    transition={{ duration: reduce ? 0 : 0.9, ease: EASE }}
                  />
                </div>
                <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">Kept</p>
              </div>

              {/* Where it went */}
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="relative flex flex-1 flex-col-reverse overflow-hidden rounded-2xl border border-dashed border-line">
                  {LEAK_CAUSES.map((c, i) => {
                    const on = i < drained;
                    const green = i < greenUpTo;
                    const finding = recoverStep === 0;
                    return (
                      <motion.div
                        key={c.name}
                        className="relative flex items-center justify-between gap-2 overflow-hidden border-t border-bg px-2.5 text-[11px] lg:px-3.5 lg:text-xs"
                        style={{ height: `${c.share}%`, background: green ? "var(--positive)" : CAUSE_COLORS[i] }}
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: on ? 1 : 0, x: on ? 0 : -24, outline: finding ? "2px dashed var(--fg)" : "0px dashed transparent", outlineOffset: -3 }}
                        transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
                      >
                        <span className="truncate font-medium text-white">
                          {green && <Check className="mr-1 inline size-3" aria-hidden />}
                          {c.name}
                        </span>
                        <span className="shrink-0 font-mono text-white/80">{c.share}%</span>
                      </motion.div>
                    );
                  })}
                </div>
                <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">
                  {recoverStep >= 0 ? "Recovered" : "Where it went"} · share of leak
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling steps */}
        <ol className="relative">
          {STEPS.map((s, idx) => {
            const on = idx === active;
            return (
              <li key={idx} className="flex min-h-[52vh] items-center lg:min-h-[62vh]">
                <motion.div
                  animate={{ opacity: on ? 1 : 0.28, y: on ? 0 : 8 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="w-full"
                >
                  {s.kind === "cause" && <CauseCard i={s.i} />}
                  {s.kind === "beat" && <BeatCard active={active >= BEAT} />}
                  {s.kind === "recover" && <RecoverCard i={s.i} />}
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function CauseCard({ i }: { i: number }) {
  const c = LEAK_CAUSES[i];
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm text-fg-3">{pad2(i + 1)}</span>
        <span className="h-px w-8 bg-line" aria-hidden />
        <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: CAUSE_COLORS[i] }}>
          {c.share}% of the leak
        </span>
      </div>
      <h3 className="mt-4 font-display text-display-md font-bold text-fg">{c.name}</h3>
      <p className="mt-3 max-w-md text-lg text-fg-2">{c.detail}</p>
      <p className="mt-4 font-mono text-xs tabular text-negative">−{currency((c.share / 100) * LEAK_TOTAL)} per year · illustrative</p>
    </div>
  );
}

function BeatCard({ active }: { active: boolean }) {
  return (
    <div>
      <span className="eyebrow">Mindlox AI</span>
      {active ? (
        <TextReveal as="h3" text={"Find it.\nFix it.\nRecover it."} immediate className="mt-4 text-display-xl font-bold text-fg" />
      ) : (
        <h3 className="mt-4 text-display-xl font-bold text-fg opacity-0">Find it. Fix it. Recover it.</h3>
      )}
      <p className="mt-5 max-w-md text-lg text-fg-2">Seven causes. One accountable partner. Keep scrolling to watch the revenue come back.</p>
    </div>
  );
}

function RecoverCard({ i }: { i: number }) {
  const r = RECOVERY[i];
  const Icon = r.icon;
  return (
    <div>
      <span className="inline-flex size-11 items-center justify-center rounded-xl bg-positive/12 text-positive">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-5 font-display text-display-md font-bold text-fg">{r.title}</h3>
      <p className="mt-3 max-w-md text-lg text-fg-2">{r.detail}</p>
    </div>
  );
}

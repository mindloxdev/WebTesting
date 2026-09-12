"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Check, X } from "lucide-react";
import { useRef } from "react";
import { BEFORE_AFTER } from "@/data/dashboard";
import { LogoMark } from "@/components/ui/Logo";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Scattered "before" placement (% of stage) with a little rotation. */
const SCATTER = [
  { x: 6, y: 8, r: -9 },
  { x: 56, y: 3, r: 7 },
  { x: 18, y: 42, r: 12 },
  { x: 64, y: 36, r: -6 },
  { x: 3, y: 74, r: 5 },
  { x: 52, y: 70, r: -11 },
];

/** Calm, aligned "after" grid. */
const GRID = [
  { x: 8, y: 16 },
  { x: 54, y: 16 },
  { x: 8, y: 42 },
  { x: 54, y: 42 },
  { x: 8, y: 68 },
  { x: 54, y: 68 },
];

const BEATS = [
  {
    eyebrow: "Before",
    title: "The practice runs on chasing.",
    body: "Denials sit in a queue nobody owns. A/R ages quietly. Staff spend evenings on claims instead of patients.",
    range: [0, 0.3] as const,
  },
  {
    eyebrow: "The switch",
    title: "Then Mindlox AI steps in.",
    body: "A dedicated team, intelligent automation, and dashboards on from day one. Your revenue never pauses.",
    range: [0.38, 0.62] as const,
  },
  {
    eyebrow: "After",
    title: "The practice runs on care.",
    body: "Cleaner claims, faster payments, recovered revenue — and time back for the people who deliver care.",
    range: [0.7, 1] as const,
  },
];

const BEFORE_BG = "rgba(240, 70, 106, 0.12)";
const AFTER_BG = "rgba(16, 185, 129, 0.14)";
const BEFORE_BORDER = "rgba(240, 70, 106, 0.4)";
const AFTER_BORDER = "rgba(16, 185, 129, 0.45)";
const BEFORE_TEXT = "rgb(178, 28, 64)";
const AFTER_TEXT = "rgb(8, 110, 78)";

/**
 * Sticky before/after transformation. The pinned stage turns six scattered,
 * red-tinted problems into an aligned, calm grid of outcomes as the visitor
 * scrolls three beats of copy. Mobile gets two stacked panels.
 */
export function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.6 });

  return (
    <>
      {/* Desktop — pinned stage */}
      <section ref={ref} className="relative hidden lg:block" style={{ height: "350vh" }} aria-label="Before and after Mindlox AI">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="container-x grid w-full grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-16">
            <div className="relative h-[52vh]">
              {BEATS.map((b) => (
                <Beat key={b.eyebrow} b={b} progress={progress} />
              ))}
            </div>
            <Stage progress={progress} />
          </div>
        </div>
      </section>

      {/* Mobile — stacked */}
      <section className="section-y lg:hidden" aria-label="Before and after Mindlox AI">
        <div className="container-x space-y-12">
          <div>
            <Reveal>
              <p className="eyebrow mb-3 text-negative">Before</p>
              <h3 className="font-display text-display-md font-bold text-fg">The practice runs on chasing.</h3>
              <p className="mt-3 text-fg-2">{BEATS[0].body}</p>
            </Reveal>
            <RevealGroup className="mt-6 grid grid-cols-2 gap-3" staggerChildren={0.06}>
              {BEFORE_AFTER.before.map((t, i) => (
                <RevealItem key={t}>
                  <div
                    className="flex items-center gap-2 rounded-2xl border px-3.5 py-3 text-sm font-medium"
                    style={{ background: BEFORE_BG, borderColor: BEFORE_BORDER, color: BEFORE_TEXT, rotate: `${SCATTER[i].r / 2}deg` }}
                  >
                    <X className="size-3.5 shrink-0" /> {t}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal className="flex items-center gap-4">
            <span className="h-px flex-1 bg-line" />
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-4 py-2 text-sm font-medium text-fg shadow-e1">
              <LogoMark size={20} /> Then Mindlox AI steps in
            </span>
            <span className="h-px flex-1 bg-line" />
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow mb-3 text-positive">After</p>
              <h3 className="font-display text-display-md font-bold text-fg">The practice runs on care.</h3>
              <p className="mt-3 text-fg-2">{BEATS[2].body}</p>
            </Reveal>
            <RevealGroup className="mt-6 grid grid-cols-2 gap-3" staggerChildren={0.06}>
              {BEFORE_AFTER.after.map((t) => (
                <RevealItem key={t}>
                  <div className="flex items-center gap-2 rounded-2xl border px-3.5 py-3 text-sm font-medium" style={{ background: AFTER_BG, borderColor: AFTER_BORDER, color: AFTER_TEXT }}>
                    <Check className="size-3.5 shrink-0" /> {t}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>
    </>
  );
}

function Beat({ b, progress }: { b: (typeof BEATS)[number]; progress: MotionValue<number> }) {
  const [s, e] = b.range;
  const inA = Math.max(0, s - 0.06);
  const outB = Math.min(1, e + 0.06);
  const opacity = useTransform(progress, [inA, s, e, outB], [s === 0 ? 1 : 0, 1, 1, e === 1 ? 1 : 0]);
  const y = useTransform(progress, [inA, s, e, outB], [s === 0 ? 0 : 24, 0, 0, e === 1 ? 0 : -24]);
  const tone = b.eyebrow === "Before" ? "text-negative" : b.eyebrow === "After" ? "text-positive" : "text-accent";
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <p className={cn("eyebrow mb-4", tone)}>{b.eyebrow}</p>
      <h3 className="font-display text-display-lg font-bold text-fg">{b.title}</h3>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-fg-2">{b.body}</p>
    </motion.div>
  );
}

function Stage({ progress }: { progress: MotionValue<number> }) {
  const bg = useTransform(progress, [0.35, 0.65], ["rgba(240, 70, 106, 0.05)", "rgba(16, 185, 129, 0.06)"]);
  const markScale = useTransform(progress, [0.3, 0.5, 0.72], [0, 1.12, 1]);
  const markOpacity = useTransform(progress, [0.3, 0.42, 0.8, 0.92], [0, 1, 1, 0.85]);
  const ringScale = useTransform(progress, [0.4, 0.75], [0.6, 2.6]);
  const ringOpacity = useTransform(progress, [0.4, 0.55, 0.75], [0, 0.5, 0]);
  return (
    <motion.div
      style={{ backgroundColor: bg }}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-line shadow-e3 dot-bg"
      aria-hidden
    >
      <motion.span
        style={{ scale: ringScale, opacity: ringOpacity }}
        className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-positive"
      />
      <motion.div style={{ scale: markScale, opacity: markOpacity }} className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="flex size-20 items-center justify-center rounded-3xl glass-strong shadow-e4">
          <LogoMark size={40} />
        </div>
      </motion.div>
      {BEFORE_AFTER.before.map((t, i) => (
        <Chip key={t} i={i} before={t} after={BEFORE_AFTER.after[i]} progress={progress} />
      ))}
    </motion.div>
  );
}

function Chip({ i, before, after, progress }: { i: number; before: string; after: string; progress: MotionValue<number> }) {
  const s = SCATTER[i];
  const g = GRID[i];
  const delay = i * 0.02;
  const left = useTransform(progress, [0.18 + delay, 0.64 + delay], [`${s.x}%`, `${g.x}%`]);
  const top = useTransform(progress, [0.18 + delay, 0.64 + delay], [`${s.y}%`, `${g.y}%`]);
  const rotate = useTransform(progress, [0.18 + delay, 0.64 + delay], [s.r, 0]);
  const backgroundColor = useTransform(progress, [0.42, 0.6], [BEFORE_BG, AFTER_BG]);
  const borderColor = useTransform(progress, [0.42, 0.6], [BEFORE_BORDER, AFTER_BORDER]);
  const color = useTransform(progress, [0.42, 0.6], [BEFORE_TEXT, AFTER_TEXT]);
  const beforeOpacity = useTransform(progress, [0.44, 0.54], [1, 0]);
  const afterOpacity = useTransform(progress, [0.5, 0.6], [0, 1]);
  return (
    <motion.div
      style={{ left, top, rotate, backgroundColor, borderColor, color }}
      className="absolute w-[38%] rounded-2xl border px-4 py-3 text-sm font-medium shadow-e1 backdrop-blur-sm"
    >
      <motion.span style={{ opacity: beforeOpacity }} className="flex items-center gap-2">
        <X className="size-3.5 shrink-0" /> {before}
      </motion.span>
      <motion.span style={{ opacity: afterOpacity }} className="absolute inset-0 flex items-center gap-2 px-4">
        <Check className="size-3.5 shrink-0" /> {after}
      </motion.span>
    </motion.div>
  );
}

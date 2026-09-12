"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const W = 1200;
const H = 600;

/** Twelve upward-curving growth lines, low-left to top-right. */
const LINES = Array.from({ length: 12 }, (_, i) => {
  const t = i / 11;
  const x0 = -120 + t * 520;
  const y0 = H + 40;
  const x1 = 280 + t * 480;
  const y1 = 440 - t * 110;
  const x2 = 680 + t * 420;
  const y2 = 250 - t * 150;
  const x3 = W + 120;
  const y3 = 70 - t * 40 - (i % 3) * 26;
  return { d: `M${x0},${y0} C${x1},${y1} ${x2},${y2} ${x3},${y3}`, w: 1 + (i % 4) * 0.4, o: 0.35 + t * 0.55 };
});

const PARTICLES = [120, 310, 480, 660, 830, 990, 1130].map((x, i) => ({ x, delay: i * 0.9, dur: 7 + (i % 3) * 1.6, r: 2 + (i % 2) }));

/** Abstract full-bleed growth visual for the hero. Draws in on entry; particles rise. Decorative. */
export function GrowthField({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const id = useId();

  return (
    <div className={cn("pointer-events-none", className)} aria-hidden>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" className="h-full w-full">
        <defs>
          <linearGradient id={`${id}-gf`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.05" />
            <stop offset="0.55" stopColor="var(--accent)" stopOpacity="0.55" />
            <stop offset="1" stopColor="var(--accent-2)" stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id={`${id}-glow`}>
            <stop offset="0" stopColor="var(--accent-2)" stopOpacity="0.9" />
            <stop offset="1" stopColor="var(--accent-2)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {LINES.map((l, i) => (
          <motion.path
            key={i}
            d={l.d}
            fill="none"
            stroke={`url(#${id}-gf)`}
            strokeWidth={l.w}
            strokeLinecap="round"
            style={{ opacity: l.o }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: reduce ? 0 : 2.4, ease: EASE, delay: 0.2 + i * 0.08 }}
          />
        ))}

        {!reduce &&
          PARTICLES.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              r={p.r * 3}
              fill={`url(#${id}-glow)`}
              initial={{ cy: H + 20, opacity: 0 }}
              animate={{ cy: [H + 20, -30], opacity: [0, 0.9, 0.9, 0] }}
              transition={{ duration: p.dur, delay: 1.2 + p.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
      </svg>
    </div>
  );
}

"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect } from "react";
import { SPECIALTIES } from "@/data/specialties";
import { cn } from "@/lib/utils";

/** Deterministic pseudo-random in [0, 1) so SSR and client agree. */
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

type Orb = {
  slug: string;
  name: string;
  hue: number;
  featured: boolean;
  x: number;
  y: number;
  size: number;
  depth: number;
  delay: number;
  dur: number;
};

/** Two-decimal values so the server HTML matches what the browser reports back during hydration. */
const r2 = (n: number) => Math.round(n * 100) / 100;

const ORBS: Orb[] = SPECIALTIES.map((s, i) => ({
  slug: s.slug,
  name: s.name,
  hue: s.hue,
  featured: !!s.featured,
  x: r2(3 + seeded(i, 1) * 94),
  y: r2(4 + seeded(i, 2) * 90),
  size: Math.round(7 + seeded(i, 3) * 14),
  depth: r2(0.4 + seeded(i, 4) * 0.8),
  delay: r2(seeded(i, 5) * 6),
  dur: r2(7 + seeded(i, 6) * 6),
}));

/**
 * Twenty-five specialty orbs, each in its specialty hue, floating gently and
 * drifting a few pixels toward the cursor on desktop. Featured specialties
 * glow and pulse. Purely decorative.
 */
export function SpecialtyConstellation({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 22, mass: 0.8 });
  const sy = useSpring(my, { stiffness: 50, damping: 22, mass: 0.8 });

  useEffect(() => {
    if (reduce) return;
    const m = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    if (!m.matches) return;
    const on = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, [mx, my, reduce]);

  return (
    <div className={cn("pointer-events-none overflow-hidden", className)} aria-hidden>
      {ORBS.map((o) => (
        <OrbDot key={o.slug} o={o} sx={sx} sy={sy} reduce={!!reduce} />
      ))}
    </div>
  );
}

function OrbDot({ o, sx, sy, reduce }: { o: Orb; sx: MotionValue<number>; sy: MotionValue<number>; reduce: boolean }) {
  const x = useTransform(sx, (v) => v * 12 * o.depth);
  const y = useTransform(sy, (v) => v * 12 * o.depth);
  const color = `oklch(0.62 0.17 ${o.hue})`;
  return (
    <motion.div className="absolute" style={{ left: `${o.x}%`, top: `${o.y}%`, x, y }}>
      <div className={cn(!reduce && "animate-float")} style={{ animationDelay: `${o.delay}s`, animationDuration: `${o.dur}s` }}>
        <span
          className="relative block rounded-full"
          style={{
            width: o.size,
            height: o.size,
            backgroundColor: color,
            opacity: o.featured ? 0.9 : 0.42,
            boxShadow: o.featured ? `0 0 28px oklch(0.62 0.17 ${o.hue} / 0.55)` : undefined,
          }}
        >
          {o.featured && !reduce && (
            <span className="absolute inset-0 animate-ping-soft rounded-full" style={{ backgroundColor: color, animationDelay: `${o.delay}s` }} />
          )}
        </span>
      </div>
    </motion.div>
  );
}

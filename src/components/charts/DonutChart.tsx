"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Slice = { label: string; value: number; color?: string };

type Props = {
  data: Slice[];
  size?: number;
  thickness?: number;
  className?: string;
  centerLabel?: string;
  centerValue?: string;
  legend?: boolean;
};

const PALETTE = [
  "var(--accent)",
  "var(--accent-2)",
  "var(--accent-3)",
  "color-mix(in oklab, var(--fg) 40%, transparent)",
  "color-mix(in oklab, var(--fg) 20%, transparent)",
];

/** Arcs sweep in sequence on entry. */
export function DonutChart({
  data,
  size = 180,
  thickness = 18,
  className,
  centerLabel,
  centerValue,
  legend = true,
}: Props) {
  const reduce = useReducedMotion();
  const total = data.reduce((a, b) => a + b.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className={cn("flex items-center gap-6", className)}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" role="img" aria-label="Donut chart">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={thickness} />
          {data.map((d, i) => {
            const frac = d.value / total;
            const start = offset;
            offset += frac;
            return (
              <motion.circle
                key={d.label}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={d.color ?? PALETTE[i % PALETTE.length]}
                strokeWidth={thickness}
                strokeLinecap="butt"
                strokeDasharray={`${frac * c - 2} ${c}`}
                style={{ rotate: start * 360, transformOrigin: "center" }}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: reduce ? 0 : 1.1, ease: EASE, delay: i * 0.12 }}
                pathLength={1}
                strokeDashoffset={0}
              />
            );
          })}
        </svg>
        {(centerLabel || centerValue) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            {centerValue && <span className="font-display text-2xl font-bold tabular text-fg">{centerValue}</span>}
            {centerLabel && <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">{centerLabel}</span>}
          </div>
        )}
      </div>
      {legend && (
        <ul className="space-y-2 text-sm">
          {data.map((d, i) => (
            <li key={d.label} className="flex items-center gap-2.5">
              <span className="size-2 shrink-0 rounded-full" style={{ background: d.color ?? PALETTE[i % PALETTE.length] }} />
              <span className="text-fg-2">{d.label}</span>
              <span className="ml-auto pl-4 font-mono text-xs tabular text-fg">{Math.round((d.value / total) * 100)}%</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

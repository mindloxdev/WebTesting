"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Datum = { label: string; value: number; color?: string; sub?: string };

type Props = {
  data: Datum[];
  height?: number;
  formatValue?: (n: number) => string;
  className?: string;
  /** Highlight the first (or a specified) bar with the accent. */
  accentIndex?: number;
};

const W = 600;
const PAD = { t: 22, r: 8, b: 26, l: 8 };

/** Vertical bars grow from the baseline on entry. */
export function BarChart({ data, height = 200, formatValue = (n) => String(n), className, accentIndex = 0 }: Props) {
  const reduce = useReducedMotion();
  const H = height;
  const max = Math.max(...data.map((d) => d.value)) || 1;
  const n = data.length;
  const slot = (W - PAD.l - PAD.r) / n;
  const bw = Math.min(56, slot * 0.6);
  const base = H - PAD.b;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={cn("h-auto w-full", className)} role="img" aria-label="Bar chart">
      <line x1={PAD.l} x2={W - PAD.r} y1={base} y2={base} stroke="var(--line)" />
      {data.map((d, i) => {
        const h = ((d.value / max) * (base - PAD.t));
        const x = PAD.l + slot * i + (slot - bw) / 2;
        const color = d.color ?? (i === accentIndex ? "var(--accent)" : "color-mix(in oklab, var(--fg) 22%, transparent)");
        return (
          <g key={d.label}>
            <motion.rect
              x={x}
              width={bw}
              rx={6}
              fill={color}
              initial={{ height: 0, y: base }}
              whileInView={{ height: h, y: base - h }}
              viewport={{ once: true }}
              transition={{ duration: reduce ? 0 : 0.9, ease: EASE, delay: i * 0.06 }}
            />
            <motion.text
              x={x + bw / 2}
              y={base - h - 8}
              textAnchor="middle"
              fontSize="11"
              fontFamily="var(--font-mono)"
              fill="var(--fg-2)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: reduce ? 0 : 0.6 + i * 0.06 }}
            >
              {formatValue(d.value)}
            </motion.text>
            <text
              x={x + bw / 2}
              y={H - 8}
              textAnchor="middle"
              fontSize="11"
              fontFamily="var(--font-mono)"
              fill="var(--fg-3)"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** Horizontal bars (rank lists like "top denial reasons"). Pure HTML for crisp text. */
export function HBarChart({
  data,
  formatValue = (n) => String(n),
  className,
}: {
  data: Datum[];
  formatValue?: (n: number) => string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const max = Math.max(...data.map((d) => d.value)) || 1;
  return (
    <ul className={cn("space-y-3", className)}>
      {data.map((d, i) => (
        <li key={d.label}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
            <span className="truncate text-fg">
              {d.label}
              {d.sub && <span className="ml-2 font-mono text-[11px] text-fg-3">{d.sub}</span>}
            </span>
            <span className="shrink-0 font-mono text-xs tabular text-fg-2">{formatValue(d.value)}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-fg/8">
            <motion.div
              className="h-full rounded-full"
              style={{ background: d.color ?? (i === 0 ? "var(--accent)" : "color-mix(in oklab, var(--accent) 45%, var(--fg-3))") }}
              initial={{ width: 0 }}
              whileInView={{ width: `${(d.value / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: reduce ? 0 : 1, ease: EASE, delay: i * 0.07 }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

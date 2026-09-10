"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = {
  values: number[];
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  fill?: boolean;
  delay?: number;
};

export function Sparkline({ values, width = 120, height = 36, color = "var(--accent)", className, fill = true, delay = 0 }: Props) {
  const id = useId();
  const reduce = useReducedMotion();
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const pts = values.map((v, i) => {
    const x = (i / Math.max(1, values.length - 1)) * (width - 4) + 2;
    const y = height - 3 - ((v - lo) / (hi - lo || 1)) * (height - 6);
    return [x, y] as const;
  });
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  const area = `${d} L${pts[pts.length - 1][0]},${height} L${pts[0][0]},${height} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={cn("overflow-visible", className)} aria-hidden>
      <defs>
        <linearGradient id={`${id}-sp`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && (
        <motion.path
          d={area}
          fill={`url(#${id}-sp)`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + (reduce ? 0 : 0.8) }}
        />
      )}
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 1.2, ease: EASE, delay }}
      />
    </svg>
  );
}

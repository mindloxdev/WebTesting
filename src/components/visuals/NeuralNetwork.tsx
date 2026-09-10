"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = { className?: string; labels?: string[] };

const DEFAULT_LABELS = ["Claims", "Eligibility", "Coding", "Remits", "Denials", "A/R", "Payers"];

/**
 * A neural network connected to claim data. Links draw in, nodes pulse,
 * and signal dots travel along the links. Purely decorative (aria-hidden).
 */
export function NeuralNetwork({ className, labels = DEFAULT_LABELS }: Props) {
  const reduce = useReducedMotion();
  const W = 560;
  const H = 380;

  const layers = useMemo(() => {
    const inputs = labels.map((l, i) => ({ x: 70, y: 40 + (i * (H - 80)) / (labels.length - 1), label: l }));
    const hidden = [0, 1, 2, 3, 4].map((i) => ({ x: 280, y: 70 + (i * (H - 140)) / 4 }));
    const outputs = ["Denial risk", "Underpayment", "Priority"].map((l, i) => ({ x: 490, y: 100 + (i * (H - 200)) / 2, label: l }));
    return { inputs, hidden, outputs };
  }, [labels]);

  const links: { x1: number; y1: number; x2: number; y2: number; k: string }[] = [];
  layers.inputs.forEach((a, i) => layers.hidden.forEach((b, j) => links.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, k: `i${i}h${j}` })));
  layers.hidden.forEach((a, i) => layers.outputs.forEach((b, j) => links.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, k: `h${i}o${j}` })));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={cn("h-auto w-full", className)} aria-hidden>
      <defs>
        <linearGradient id="nn-link" x1="0" x2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.15" />
          <stop offset="1" stopColor="var(--accent-2)" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id="nn-node">
          <stop offset="0" stopColor="var(--accent-2)" />
          <stop offset="1" stopColor="var(--accent)" />
        </radialGradient>
      </defs>

      {links.map((l, i) => (
        <motion.line
          key={l.k}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="url(#nn-link)"
          strokeWidth={1}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 1.2, ease: EASE, delay: (i % 12) * 0.05 }}
        />
      ))}

      {/* traveling signals */}
      {!reduce &&
        [0, 7, 14, 21, 28].map((li, i) => {
          const l = links[li % links.length];
          return (
            <motion.circle
              key={`sig-${i}`}
              r={2.5}
              fill="var(--accent-2)"
              initial={{ cx: l.x1, cy: l.y1, opacity: 0 }}
              animate={{ cx: [l.x1, l.x2], cy: [l.y1, l.y2], opacity: [0, 1, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
            />
          );
        })}

      {layers.inputs.map((n, i) => (
        <g key={`in-${i}`}>
          <motion.circle
            cx={n.x}
            cy={n.y}
            r={7}
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth={1.5}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.06, type: "spring", stiffness: 260, damping: 18 }}
          />
          <text x={n.x - 16} y={n.y + 4} textAnchor="end" fontSize="11" fontFamily="var(--font-mono)" fill="var(--fg-2)">
            {n.label}
          </text>
        </g>
      ))}

      {layers.hidden.map((n, i) => (
        <motion.circle
          key={`h-${i}`}
          cx={n.x}
          cy={n.y}
          r={10}
          fill="url(#nn-node)"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: [0, 1.15, 1], opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 + i * 0.08, duration: 0.8, ease: EASE }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        />
      ))}
      {!reduce &&
        layers.hidden.map((n, i) => (
          <motion.circle
            key={`hp-${i}`}
            cx={n.x}
            cy={n.y}
            r={10}
            fill="none"
            stroke="var(--accent-2)"
            strokeWidth={1}
            animate={{ r: [10, 22], opacity: [0.6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
          />
        ))}

      {layers.outputs.map((n, i) => (
        <g key={`out-${i}`}>
          <motion.rect
            x={n.x - 8}
            y={n.y - 8}
            width={16}
            height={16}
            rx={4}
            fill="var(--accent)"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1 + i * 0.1, type: "spring", stiffness: 260, damping: 18 }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          />
          <text x={n.x + 16} y={n.y + 4} fontSize="11" fontFamily="var(--font-mono)" fill="var(--fg)">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

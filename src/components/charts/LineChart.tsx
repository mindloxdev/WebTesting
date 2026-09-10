"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, useMemo, useState } from "react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type Series = { name: string; values: number[]; color?: string; dashed?: boolean };

type Props = {
  series: Series[];
  labels?: string[];
  height?: number;
  /** Fill the first series. */
  area?: boolean;
  grid?: boolean;
  formatValue?: (n: number) => string;
  className?: string;
  /** Draw duration in seconds. */
  duration?: number;
  min?: number;
  max?: number;
  smooth?: boolean;
};

const W = 600;
const PAD = { t: 12, r: 12, b: 26, l: 8 };

function pathFrom(points: [number, number][], smooth: boolean) {
  if (points.length === 0) return "";
  if (!smooth || points.length < 3) return points.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const t = 0.18;
    const c1x = p1[0] + (p2[0] - p0[0]) * t;
    const c1y = p1[1] + (p2[1] - p0[1]) * t;
    const c2x = p2[0] - (p3[0] - p1[0]) * t;
    const c2y = p2[1] - (p3[1] - p1[1]) * t;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }
  return d;
}

/** Lines draw themselves on entry. Hover for a crosshair + readout (desktop). */
export function LineChart({
  series,
  labels,
  height = 220,
  area = true,
  grid = true,
  formatValue = (n) => String(n),
  className,
  duration = 1.6,
  min,
  max,
  smooth = true,
}: Props) {
  const id = useId();
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);

  const H = height;
  const all = series.flatMap((s) => s.values);
  const lo = min ?? Math.min(...all) * 0.96;
  const hi = max ?? Math.max(...all) * 1.04;
  const n = Math.max(...series.map((s) => s.values.length));

  const x = (i: number) => PAD.l + (i / Math.max(1, n - 1)) * (W - PAD.l - PAD.r);
  const y = (v: number) => PAD.t + (1 - (v - lo) / (hi - lo || 1)) * (H - PAD.t - PAD.b);

  const paths = useMemo(
    () =>
      series.map((s) => {
        const pts = s.values.map((v, i) => [x(i), y(v)] as [number, number]);
        return { d: pathFrom(pts, smooth), pts };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [series, lo, hi, H, smooth],
  );

  const first = paths[0];
  const areaD = first
    ? `${first.d} L${x(n - 1)},${H - PAD.b} L${x(0)},${H - PAD.b} Z`
    : "";

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((px - PAD.l) / (W - PAD.l - PAD.r)) * (n - 1));
    setHover(Math.max(0, Math.min(n - 1, i)));
  };

  return (
    <div className={cn("relative w-full", className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label={series.map((s) => s.name).join(", ")}
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={series[0]?.color ?? "var(--accent)"} stopOpacity="0.28" />
            <stop offset="100%" stopColor={series[0]?.color ?? "var(--accent)"} stopOpacity="0" />
          </linearGradient>
        </defs>

        {grid &&
          [0, 0.25, 0.5, 0.75, 1].map((t) => (
            <line
              key={t}
              x1={PAD.l}
              x2={W - PAD.r}
              y1={PAD.t + t * (H - PAD.t - PAD.b)}
              y2={PAD.t + t * (H - PAD.t - PAD.b)}
              stroke="var(--line)"
              strokeDasharray={t === 1 ? undefined : "2 6"}
            />
          ))}

        {area && first && (
          <motion.path
            d={areaD}
            fill={`url(#${id}-area)`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: reduce ? 0 : duration * 0.6 }}
          />
        )}

        {paths.map((p, i) => (
          <motion.path
            key={series[i].name}
            d={p.d}
            fill="none"
            stroke={series[i].color ?? (i === 0 ? "var(--accent)" : "var(--fg-3)")}
            strokeWidth={i === 0 ? 2.4 : 1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={series[i].dashed ? "4 6" : undefined}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : duration, ease: EASE, delay: i * 0.15 }}
          />
        ))}

        {/* end dots */}
        {paths.map((p, i) => {
          const last = p.pts[p.pts.length - 1];
          if (!last) return null;
          return (
            <motion.circle
              key={`dot-${i}`}
              cx={last[0]}
              cy={last[1]}
              r={i === 0 ? 4.5 : 3}
              fill={series[i].color ?? (i === 0 ? "var(--accent)" : "var(--fg-3)")}
              stroke="var(--bg)"
              strokeWidth={2}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: reduce ? 0 : duration, type: "spring", stiffness: 300, damping: 18 }}
            />
          );
        })}

        {labels &&
          labels.map((l, i) =>
            n <= 12 || i % 2 === 0 ? (
              <text
                key={l + i}
                x={x(i)}
                y={H - 6}
                textAnchor="middle"
                fontSize="11"
                fontFamily="var(--font-mono)"
                fill="var(--fg-3)"
              >
                {l}
              </text>
            ) : null,
          )}

        {hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={PAD.t} y2={H - PAD.b} stroke="var(--fg-3)" strokeDasharray="3 4" />
            {paths.map((p, i) => (
              <circle
                key={`h-${i}`}
                cx={p.pts[hover]?.[0]}
                cy={p.pts[hover]?.[1]}
                r={4}
                fill={series[i].color ?? "var(--accent)"}
                stroke="var(--bg)"
                strokeWidth={2}
              />
            ))}
          </g>
        )}
      </svg>

      {hover !== null && (
        <div
          className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-lg glass-strong px-3 py-2 text-xs shadow-e2"
          style={{ left: `${(x(hover) / W) * 100}%` }}
        >
          {labels && <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-fg-3">{labels[hover]}</div>}
          {series.map((s) => (
            <div key={s.name} className="flex items-center gap-2 whitespace-nowrap">
              <span className="size-1.5 rounded-full" style={{ background: s.color ?? "var(--accent)" }} />
              <span className="text-fg-2">{s.name}</span>
              <span className="ml-auto pl-3 font-medium tabular text-fg">{formatValue(s.values[hover] ?? 0)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { Metric } from "@/data/dashboard";
import { cn, compact, number } from "@/lib/utils";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Sparkline } from "@/components/charts/Sparkline";

type Props = {
  metric: Metric;
  className?: string;
  delay?: number;
  compactMode?: boolean;
};

export function formatMetric(m: Metric, v: number) {
  switch (m.format) {
    case "percent":
      return `${number(v, 1)}%`;
    case "days":
      return `${number(v, 0)}`;
    case "currency":
      return v >= 1_000_000 ? `$${number(v / 1_000_000, 2)}M` : `$${compact(v)}`;
    default:
      return number(v, 0);
  }
}

/** Metric card: label, counting value, delta chip, sparkline. Demo-labeled by its parent. */
export function MetricCard({ metric, className, delay = 0, compactMode }: Props) {
  const good = metric.upIsGood ? metric.delta >= 0 : metric.delta <= 0;
  const Arrow = metric.delta >= 0 ? ArrowUpRight : ArrowDownRight;
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-line bg-bg-2/60 p-4 lg:p-5", className)}>
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">{metric.label}</span>
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-mono text-[10px] tabular",
            good ? "bg-positive/12 text-positive" : "bg-negative/12 text-negative",
          )}
        >
          <Arrow className="size-3" />
          {metric.delta > 0 ? "+" : ""}
          {number(metric.delta, 1)}
          {metric.format === "days" ? "d" : "%"}
        </span>
      </div>
      <div className={cn("mt-2 flex items-end justify-between gap-3", compactMode && "mt-1")}>
        <span className={cn("font-display font-bold tracking-tight text-fg", compactMode ? "text-2xl" : "text-3xl lg:text-[34px]")}>
          <AnimatedNumber value={metric.value} format={(v) => formatMetric(metric, v)} duration={1.6} delay={delay} />
          {metric.format === "days" && <span className="ml-1 text-sm font-medium text-fg-3">days</span>}
        </span>
        {!compactMode && <Sparkline values={metric.spark} width={96} height={32} delay={delay + 0.2} color={good ? "var(--positive)" : "var(--negative)"} />}
      </div>
    </div>
  );
}

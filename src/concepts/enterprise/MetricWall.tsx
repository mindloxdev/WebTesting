import { DEMO_METRICS } from "@/data/dashboard";
import { PLACEHOLDER_METRICS } from "@/data/site";
import { cn } from "@/lib/utils";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MetricCard } from "@/components/visuals/MetricCard";

/**
 * Enterprise metric wall: placeholder outcome metrics ([X]) plus demo
 * operational metrics — one label, no fabricated numbers.
 */
export function MetricWall({ className }: { className?: string }) {
  return (
    <div className={cn("border border-line bg-bg", className)}>
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">Revenue operating metrics</span>
        <DemoBadge />
      </div>

      <RevealGroup className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4" staggerChildren={0.06}>
        {PLACEHOLDER_METRICS.map((m) => (
          <RevealItem key={m.label} className="bg-bg p-4 lg:p-5">
            <p className="font-display text-3xl font-bold tracking-tight text-fg">{m.value}</p>
            <p className="mt-1 text-xs text-fg-2">{m.label}</p>
            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-fg-3">placeholder · verify</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="grid grid-cols-2 gap-3 border-t border-line p-3 lg:grid-cols-4">
        {DEMO_METRICS.slice(0, 4).map((m, i) => (
          <MetricCard key={m.key} metric={m} compactMode delay={0.3 + i * 0.08} className="rounded-none border-line bg-bg-2/40" />
        ))}
      </div>

      <p className="border-t border-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">
        Outcome metrics are placeholders until verified · operational metrics are illustrative
      </p>
    </div>
  );
}

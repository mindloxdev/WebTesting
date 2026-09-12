"use client";

import { useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useInterval } from "@/lib/hooks";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Marquee } from "@/components/ui/Marquee";

type Kind = "payment" | "appeal" | "eligibility" | "underpayment" | "claims" | "auth" | "denial" | "credentialing";

const COLOR: Record<Kind, string> = {
  payment: "var(--positive)",
  appeal: "var(--accent)",
  eligibility: "var(--accent-3)",
  underpayment: "var(--warning)",
  claims: "var(--accent-2)",
  auth: "var(--accent-3)",
  denial: "var(--negative)",
  credentialing: "var(--positive)",
};

const EVENTS: { kind: Kind; text: string; ago: number }[] = [
  { kind: "payment", text: "Payment posted · $3,412.75 · Commercial A", ago: 2 },
  { kind: "appeal", text: "Appeal filed · MLX-10883 · CO-197 · $1,268.40", ago: 4 },
  { kind: "eligibility", text: "Eligibility verified · 48 h ahead · 178 patients", ago: 6 },
  { kind: "underpayment", text: "Underpayment flagged · 73721 · Commercial C · $612.40", ago: 9 },
  { kind: "claims", text: "Claims submitted · 389 · clearinghouse accepted 387", ago: 12 },
  { kind: "auth", text: "Prior auth approved · CT abdomen and pelvis · MLX-11026", ago: 15 },
  { kind: "denial", text: "Denial prevented · modifier 59 added · MLX-10957", ago: 21 },
  { kind: "credentialing", text: "Payer enrollment effective · Provider F · Medicare", ago: 34 },
];

/** Live-feeling event ticker under the hero. Timestamps age in real time. Demo-labeled. */
export function MetricStrip() {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);
  useInterval(() => setTick((t) => t + 1), reduce ? null : 20000);

  return (
    <div className="border-y border-line bg-bg-2/50" aria-label="Recent revenue-cycle events (sample)">
      <div className="container-x flex items-center gap-4 py-3">
        <DemoBadge className="shrink-0" />
        <Marquee speed={64} className="min-w-0 flex-1" gap="2.75rem">
          {EVENTS.map((e) => (
            <span key={e.text} className="flex items-center gap-2.5 whitespace-nowrap font-mono text-[11px] tracking-wide text-fg-2">
              <span className="size-1.5 rounded-full" style={{ background: COLOR[e.kind], boxShadow: `0 0 8px ${COLOR[e.kind]}` }} aria-hidden />
              {e.text}
              <span className="text-fg-3">· {e.ago + tick}m ago</span>
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import type { Concept } from "@/data/concepts";
import { CTA } from "@/data/site";
import { HeroCopy, DEFAULT_TRUST } from "@/components/sections";
import { RevenueEngine } from "./RevenueEngine";

/** Copy left, living engine right (stacked on mobile). The hero container drives the engine's scroll index. */
export function EngineHero({ concept }: { concept: Concept }) {
  const ref = useRef<HTMLElement>(null);
  return (
    <section ref={ref} className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-28" aria-label="Hero">
      <div className="pointer-events-none absolute inset-0 mesh-bg" aria-hidden />
      <div className="pointer-events-none absolute inset-0 grid-bg fade-mask-b opacity-40" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" aria-hidden />
      <div className="container-x relative grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-10">
        <HeroCopy
          eyebrow="Medical billing · revenue cycle management"
          headline={concept.headline}
          highlight="Predictable Revenue."
          support={concept.support}
          size="xl"
          primary={{ label: concept.cta, hoverLabel: concept.ctaHover, href: CTA.auditHref }}
          secondary={{ label: concept.secondaryCta ?? CTA.tertiary, href: "/services" }}
          trust={DEFAULT_TRUST}
        />
        <RevenueEngine scrollTarget={ref} />
      </div>
    </section>
  );
}

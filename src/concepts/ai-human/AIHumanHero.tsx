import type { Concept } from "@/data/concepts";
import { CTA } from "@/data/site";
import { HeroCopy } from "@/components/sections";
import { Handoff } from "./Handoff";

/** Centered statement, then the full-width operations panel — interface as marketing. */
export function AIHumanHero({ concept }: { concept: Concept }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24" aria-label="Hero">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-80" aria-hidden />
      <div className="pointer-events-none absolute inset-0 dot-bg fade-mask-b opacity-30" aria-hidden />
      <div className="container-x relative">
        <HeroCopy
          eyebrow="An intelligent operating system for the revenue cycle"
          headline={concept.headline}
          highlight="AI-Powered Precision."
          support={concept.support}
          align="center"
          size="2xl"
          primary={{ label: concept.cta, hoverLabel: concept.ctaHover, href: CTA.auditHref }}
          secondary={{ label: CTA.secondary, href: CTA.specialistHref }}
          trust={["AI-assisted, human-reviewed", "Named specialists", "Full audit trail", "HIPAA-conscious workflows"]}
        />
        <Handoff className="mt-16 lg:mt-20" />
      </div>
    </section>
  );
}

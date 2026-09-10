import type { Metadata } from "next";
import { ConceptFrame } from "@/components/layout/Frame";
import { getConcept } from "@/data/concepts";
import { CTA } from "@/data/site";
import {
  HeroCopy,
  DEFAULT_TRUST,
  TrustStrip,
  CalculatorSection,
  LifecycleSection,
  ServicesSection,
  ProcessSection,
  TestimonialsSection,
  FinalCTA,
} from "@/components/sections";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GrowthField } from "@/concepts/growth-partner/GrowthField";
import { BeforeAfter } from "@/concepts/growth-partner/BeforeAfter";
import { Chapter } from "@/concepts/growth-partner/Chapter";
import { Outcomes } from "@/concepts/growth-partner/Outcomes";

const concept = getConcept("growth-partner")!;

export const metadata: Metadata = {
  title: `Concept 09 — ${concept.name}`,
  description: concept.support,
};

/** CONCEPT 09 — THE PRACTICE GROWTH PARTNER · Tesla's outcome-first single scroll. */
export default function Page() {
  return (
    <ConceptFrame concept={concept}>
      {/* Hero — full-bleed, one statement, one CTA */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-28 pb-20">
        <GrowthField className="absolute inset-x-0 bottom-0 h-[78%] opacity-90 fade-mask-t" />
        <div className="container-x relative">
          <HeroCopy
            align="center"
            size="2xl"
            eyebrow="The practice growth partner"
            headline={concept.headline}
            highlight="Start Growing Your Practice."
            support={concept.support}
            primary={{ label: concept.cta, hoverLabel: concept.ctaHover, href: CTA.auditHref }}
            trust={DEFAULT_TRUST}
          />
        </div>
      </section>

      <TrustStrip variant="pillars" marquee={false} />

      <BeforeAfter />

      {/* Statement chapter — dark */}
      <Chapter dark>
        <div className="container-x text-center">
          <TextReveal
            as="h2"
            text={"Your practice should focus on healthcare.\nWe'll focus on the revenue cycle."}
            highlight="We'll focus on the revenue cycle."
            className="mx-auto max-w-5xl text-display-xl font-bold text-fg"
          />
          <Reveal delay={0.3} className="mx-auto mt-8 max-w-2xl">
            <p className="text-lg text-fg-2 lg:text-xl">
              Not another vendor to manage. An extension of your practice that owns the revenue cycle end to end — so growth stops waiting on billing.
            </p>
          </Reveal>
          <Reveal delay={0.45} className="mt-9 flex justify-center">
            <MagneticButton href={CTA.auditHref} size="lg" arrow hoverLabel={concept.ctaHover}>
              {concept.cta}
            </MagneticButton>
          </Reveal>
        </div>
      </Chapter>

      <Outcomes />

      <CalculatorSection tone="default" />
      <LifecycleSection tone="muted" />
      <ServicesSection
        initial={8}
        title="Everything the revenue cycle needs, handled."
        description="Twenty-four services, one accountable team — so your practice never has to think about billing again."
      />
      <ProcessSection tone="default" />
      <TestimonialsSection />
      <FinalCTA
        variant="accent"
        title="Let's grow your practice."
        highlight="grow your practice."
        description="Start with a free revenue audit — findings you keep, whether or not we work together."
        primary="Let's Grow Your Practice"
        primaryHover="Start the Transformation"
      />
    </ConceptFrame>
  );
}

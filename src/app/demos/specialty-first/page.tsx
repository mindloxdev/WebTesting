import type { Metadata } from "next";
import { ConceptFrame } from "@/components/layout/Frame";
import { getConcept } from "@/data/concepts";
import { CTA } from "@/data/site";
import { SPECIALTIES } from "@/data/specialties";
import {
  HeroCopy,
  DEFAULT_TRUST,
  TrustStrip,
  SpecialtyGrid,
  ServicesSection,
  LifecycleSection,
  CalculatorSection,
  ComparisonSection,
  ProcessSection,
  FAQSection,
  FinalCTA,
} from "@/components/sections";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SpecialtyHero } from "@/concepts/specialty-first/SpecialtyHero";
import { SpecialtyDepth } from "@/concepts/specialty-first/SpecialtyDepth";

const concept = getConcept("specialty-first")!;

export const metadata: Metadata = {
  title: `Concept 07 — ${concept.name}`,
  description: concept.support,
};

/** CONCEPT 07 — SPECIALTY-FIRST · Figma's exploration-rewarding interaction. */
export default function Page() {
  return (
    <ConceptFrame concept={concept}>
      <SpecialtyHero>
        <HeroCopy
          align="center"
          size="2xl"
          eyebrow={`${SPECIALTIES.length} specialties · one accountable team`}
          headline={concept.headline}
          highlight="Your Specialty."
          support={concept.support}
          primary={{ label: concept.cta, hoverLabel: concept.ctaHover, href: "#specialty-morph" }}
          secondary={{ label: CTA.primary, href: CTA.auditHref }}
          trust={DEFAULT_TRUST}
        />
      </SpecialtyHero>

      <TrustStrip variant="pillars" />

      <SpecialtyDepth />

      <Section id="all-specialties" tone="muted">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Every specialty"
            title="Twenty-five specialties. One accountable team."
            highlight="One accountable team."
            description="Each specialty page carries its own billing reality — coding notes, denial types, workflow, and how Mindlox AI solves it."
          />
          <Reveal className="lg:mb-2">
            <MagneticButton href="/specialties" variant="outline" arrow hoverLabel="Open the Specialty Index">
              Browse all specialties
            </MagneticButton>
          </Reveal>
        </div>
        <div className="mt-12">
          <SpecialtyGrid />
        </div>
      </Section>

      <ServicesSection
        initial={8}
        title="Specialty billing still needs every service done right."
        description="Twenty-four services behind every specialty playbook — engage end-to-end or start where it hurts."
      />
      <LifecycleSection tone="muted" />
      <CalculatorSection tone="default" />
      <ComparisonSection tone="muted" whySwitch={false} />
      <ProcessSection tone="default" />
      <FAQSection tone="muted" limit={8} />
      <FinalCTA
        title="Your specialty deserves a billing partner that speaks it."
        highlight="speaks it."
        description="Tell us your specialty and organization type — we'll map your denial patterns, payer rules, and recovery opportunities in a free revenue audit."
        form
      />
    </ConceptFrame>
  );
}

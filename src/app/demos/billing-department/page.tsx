import type { Metadata } from "next";
import { ConceptFrame } from "@/components/layout/Frame";
import {
  ComparisonSection,
  DEFAULT_TRUST,
  FAQSection,
  FinalCTA,
  HeroCopy,
  ProblemSection,
  ProcessSection,
  ServicesSection,
  SpecialtiesSection,
  TestimonialsSection,
} from "@/components/sections";
import { getConcept } from "@/data/concepts";
import { CTA } from "@/data/site";
import { TeamAssembly } from "@/concepts/billing-department/TeamAssembly";
import { Department } from "@/concepts/billing-department/Department";

const concept = getConcept("billing-department")!;

export const metadata: Metadata = {
  title: `Concept 04 — ${concept.name}`,
  description: concept.support,
};

/** CONCEPT 04 — "Your Billing Department, Upgraded". Notion-warm, team-first. */
export default function Page() {
  return (
    <ConceptFrame concept={concept}>
      {/* Hero copy */}
      <section className="relative overflow-hidden pt-36 pb-6 lg:pt-44 lg:pb-8">
        <div className="pointer-events-none absolute inset-0 dot-bg opacity-40 fade-mask-b" aria-hidden />
        <div className="container-x relative">
          <HeroCopy
            align="center"
            eyebrow="Your billing department, upgraded"
            headline={concept.headline}
            highlight="Without the Billing Headaches."
            support={concept.support}
            primary={{ label: concept.cta, hoverLabel: concept.ctaHover, href: CTA.auditHref }}
            secondary={{ label: "Meet the team", href: "#department" }}
            trust={DEFAULT_TRUST}
          />
          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-fg-3">
            Keep scrolling — your department assembles as you go.
          </p>
        </div>
      </section>

      {/* Signature: sticky team assembly */}
      <TeamAssembly />

      {/* Meet the department + how it works with yours */}
      <Department />

      <ProblemSection tone="muted" />
      <ProcessSection tone="default" />
      <ServicesSection initial={8} tone="muted" title="Everything the department handles." description="Twenty-four services, one accountable team — from the front desk to the posted payment." />
      <SpecialtiesSection variant="morph" limit={8} tone="default" />
      <ComparisonSection tone="muted" />
      <TestimonialsSection tone="default" />
      <FAQSection limit={8} tone="muted" />
      <FinalCTA form title="Build the billing department you always wanted." highlight="always wanted." description="Tell us about your practice. We'll show you the team, the plan, and where your revenue is leaking — before you commit to anything." />
    </ConceptFrame>
  );
}

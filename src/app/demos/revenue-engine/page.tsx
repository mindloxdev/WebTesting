import type { Metadata } from "next";
import { ConceptFrame } from "@/components/layout/Frame";
import { getConcept } from "@/data/concepts";
import {
  TrustStrip,
  ProblemSection,
  LifecycleSection,
  ServicesSection,
  CalculatorSection,
  AISection,
  DashboardSection,
  SpecialtiesSection,
  IntegrationsSection,
  ComparisonSection,
  ProcessSection,
  CaseStudiesSection,
  TestimonialsSection,
  FAQSection,
  FinalCTA,
} from "@/components/sections";
import { EngineHero } from "@/concepts/revenue-engine/EngineHero";
import { EngineStats } from "@/concepts/revenue-engine/EngineStats";

const concept = getConcept("revenue-engine")!;

export const metadata: Metadata = {
  title: `Concept 01 — ${concept.name}`,
  description: concept.support,
};

/** CONCEPT 01 — THE REVENUE ENGINE. Reference: Stripe's animated payment flow. */
export default function Page() {
  return (
    <ConceptFrame concept={concept}>
      <EngineHero concept={concept} />
      <TrustStrip />
      <ProblemSection />
      <EngineStats />
      <LifecycleSection tone="muted" />
      <ServicesSection />
      <CalculatorSection />
      <AISection />
      <DashboardSection />
      <SpecialtiesSection variant="morph" limit={10} tone="muted" />
      <IntegrationsSection tone="default" />
      <ComparisonSection tone="muted" />
      <ProcessSection tone="default" />
      <CaseStudiesSection tone="muted" />
      <TestimonialsSection tone="default" />
      <FAQSection limit={8} tone="muted" />
      <FinalCTA form />
    </ConceptFrame>
  );
}

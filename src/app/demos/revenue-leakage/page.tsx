import type { Metadata } from "next";
import { ConceptFrame } from "@/components/layout/Frame";
import { getConcept } from "@/data/concepts";
import {
  CalculatorSection,
  LifecycleSection,
  ServicesSection,
  DashboardSection,
  ComparisonSection,
  ProcessSection,
  TestimonialsSection,
  FAQSection,
  FinalCTA,
  TrustStrip,
} from "@/components/sections";
import { LeakHero } from "@/concepts/revenue-leakage/LeakHero";
import { LeakReveal } from "@/concepts/revenue-leakage/LeakReveal";

const concept = getConcept("revenue-leakage")!;

export const metadata: Metadata = {
  title: `Concept 02 — ${concept.name}`,
  description: concept.support,
};

/** CONCEPT 02 — STOP REVENUE LEAKAGE. Reference: Apple sticky-scroll narrative. */
export default function Page() {
  return (
    <ConceptFrame concept={concept}>
      <LeakHero concept={concept} />
      <LeakReveal className="pb-24" />
      <TrustStrip variant="pillars" />
      <CalculatorSection tone="muted" />
      <LifecycleSection />
      <ServicesSection initial={8} tone="muted" />
      <DashboardSection />
      <ComparisonSection tone="muted" />
      <ProcessSection tone="default" />
      <TestimonialsSection tone="muted" />
      <FAQSection limit={8} />
      <FinalCTA title="Stop the leaks. Keep the revenue." highlight="Keep the revenue." primary="Find My Revenue Leaks" primaryHover="Show Me Where It's Leaking" />
    </ConceptFrame>
  );
}

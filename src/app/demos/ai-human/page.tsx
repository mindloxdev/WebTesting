import type { Metadata } from "next";
import { ConceptFrame } from "@/components/layout/Frame";
import { getConcept } from "@/data/concepts";
import {
  AISection,
  DashboardSection,
  LifecycleSection,
  ServicesSection,
  SpecialtiesSection,
  ComparisonSection,
  ProcessSection,
  FAQSection,
  FinalCTA,
  TrustStrip,
} from "@/components/sections";
import { AIHumanHero } from "@/concepts/ai-human/AIHumanHero";
import { HandoffExplained } from "@/concepts/ai-human/HandoffExplained";

const concept = getConcept("ai-human")!;

export const metadata: Metadata = {
  title: `Concept 03 — ${concept.name}`,
  description: concept.support,
};

/** CONCEPT 03 — AI + HUMAN EXPERTISE. Reference: Intercom's AI-as-colleague + Linear's interface-as-marketing. */
export default function Page() {
  return (
    <ConceptFrame concept={concept}>
      <AIHumanHero concept={concept} />
      <TrustStrip variant="pillars" />
      <HandoffExplained />
      <AISection feed={false} />
      <DashboardSection tone="muted" />
      <LifecycleSection />
      <ServicesSection tone="muted" />
      <SpecialtiesSection variant="morph" />
      <ComparisonSection whySwitch={false} tone="muted" />
      <ProcessSection tone="default" />
      <FAQSection limit={8} tone="muted" />
      <FinalCTA variant="inverse" title="Intelligence you can see. Experts you can reach." highlight="Experts you can reach." />
    </ConceptFrame>
  );
}

import {
  AISection,
  CalculatorSection,
  CaseStudiesSection,
  ComparisonSection,
  DashboardSection,
  FAQSection,
  FinalCTA,
  IntegrationsSection,
  LifecycleSection,
  ProblemSection,
  ProcessSection,
  ResourcesSection,
  ServicesSection,
  SpecialtiesSection,
  TestimonialsSection,
  TrustStrip,
} from "@/components/sections";
import { DarkBlock, LightBlock } from "./SchemeBlock";
import { ProofOfSystem } from "./ProofOfSystem";
import { UltimateHero } from "./UltimateHero";

/**
 * CONCEPT 10 — THE ULTIMATE MINDLOX AI (flagship, recommended).
 * Cinematic dark hero → clean light body → dark closing CTA. Every proven
 * section, in the master-prompt order. Rendered by `/` and `/demos/ultimate`.
 */
export function UltimatePage() {
  return (
    <>
      <UltimateHero />
      <TrustStrip />

      <LightBlock>
        <ProblemSection />
        <LifecycleSection tone="muted" id="solution" />
        <ServicesSection />
        <ProofOfSystem />
        <CalculatorSection tone="default" />
        <AISection tone="muted" />
        <DashboardSection />
        <SpecialtiesSection tone="muted" variant="morph" limit={10} />
        <IntegrationsSection tone="default" />
        <ComparisonSection tone="muted" whySwitch />
        <ProcessSection tone="default" />
        <CaseStudiesSection tone="muted" />
        <TestimonialsSection tone="default" />
        <ResourcesSection tone="muted" />
        <FAQSection />
      </LightBlock>

      <DarkBlock>
        <FinalCTA form />
      </DarkBlock>
    </>
  );
}

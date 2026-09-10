import type { ReactNode } from "react";
import { HOME, type HomeSection, type HomeSectionId } from "@/content/home";
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
import { DarkBlock, LightBlock } from "@/concepts/ultimate/SchemeBlock";
import { ProofOfSystem } from "@/concepts/ultimate/ProofOfSystem";
import { UltimateHero } from "@/concepts/ultimate/UltimateHero";

/**
 * Section registry — maps an id from src/content/home.ts to a component.
 * To add a new home section: add the id to `HomeSectionId`, add a line here,
 * then list it in `HOME.sections`.
 */
const REGISTRY: Record<HomeSectionId, (s: HomeSection) => ReactNode> = {
  trust: () => <TrustStrip />,
  problem: (s) => <ProblemSection tone={s.tone} ctaHref={s.ctaHref} />,
  lifecycle: (s) => <LifecycleSection tone={s.tone} id="solution" />,
  services: (s) => <ServicesSection tone={s.tone} compact initial={s.limit ?? 6} moreHref={s.moreHref} />,
  proof: () => <ProofOfSystem />,
  ai: (s) => <AISection tone={s.tone} feed moreHref={s.moreHref} />,
  dashboard: (s) => <DashboardSection tone={s.tone} compact ctaHref={s.moreHref} />,
  specialties: (s) => <SpecialtiesSection tone={s.tone} variant="compact" limit={s.limit ?? 8} />,
  comparison: (s) => <ComparisonSection tone={s.tone} whySwitch={false} limit={s.limit} moreHref={s.moreHref} />,
  process: (s) => <ProcessSection tone={s.tone} />,
  calculator: (s) => <CalculatorSection tone={s.tone} />,
  integrations: (s) => <IntegrationsSection tone={s.tone} />,
  "case-studies": (s) => <CaseStudiesSection tone={s.tone} />,
  testimonials: (s) => <TestimonialsSection tone={s.tone} />,
  resources: (s) => <ResourcesSection tone={s.tone} />,
  faq: (s) => <FAQSection tone={s.tone} limit={s.limit} moreHref={s.moreHref} />,
  cta: () => (
    <FinalCTA
      title={HOME.cta.title}
      highlight={HOME.cta.highlight}
      description={HOME.cta.description}
      primary={HOME.cta.primary}
      secondary={HOME.cta.secondary}
      form={HOME.cta.form}
    />
  ),
};

/**
 * The live home page. Dark cinematic hero → light body → dark closing CTA.
 * Composition and copy come from src/content/home.ts.
 */
export function HomePage() {
  const enabled = HOME.sections.filter((s) => s.enabled);
  const body = enabled.filter((s) => s.id !== "trust" && s.id !== "cta");
  const trust = enabled.find((s) => s.id === "trust");
  const cta = enabled.find((s) => s.id === "cta");

  return (
    <>
      <UltimateHero badge={HOME.hero.badge} hero={HOME.hero} />
      {trust && REGISTRY.trust(trust)}
      <LightBlock>{body.map((s) => <div key={s.id}>{REGISTRY[s.id](s)}</div>)}</LightBlock>
      {cta && <DarkBlock>{REGISTRY.cta(cta)}</DarkBlock>}
    </>
  );
}

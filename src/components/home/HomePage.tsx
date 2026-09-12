import type { ReactNode } from "react";
import { HOME, type HomeSection, type HomeSectionId } from "@/content/home";
import {
  AISection,
  CalculatorSection,
  ComparisonSection,
  DashboardSection,
  FAQSection,
  FinalCTA,
  IntegrationsSection,
  LifecycleSection,
  ProblemSection,
  ProcessSection,
  ServicesSection,
  SpecialtiesSection,
  TrustStrip,
} from "@/components/sections";
import { cn } from "@/lib/utils";
import { ProofOfSystem } from "./ProofOfSystem";
import { HomeHero } from "./HomeHero";

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
  ai: (s) => <AISection tone={s.tone} feed={s.feed ?? false} moreHref={s.moreHref} />,
  dashboard: (s) => <DashboardSection tone={s.tone} compact ctaHref={s.moreHref} />,
  specialties: (s) => <SpecialtiesSection tone={s.tone} variant="compact" limit={s.limit ?? 4} />,
  comparison: (s) => <ComparisonSection tone={s.tone} whySwitch={false} limit={s.limit} moreHref={s.moreHref} />,
  process: (s) => <ProcessSection tone={s.tone} />,
  calculator: (s) => <CalculatorSection tone={s.tone} />,
  integrations: (s) => <IntegrationsSection tone={s.tone} />,
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
 * The live home page: hero, the enabled sections, then the closing CTA.
 * Composition and copy come from src/content/home.ts. With `layout.compact`
 * the hero loses its 92vh minimum and every section uses the tighter
 * `.home-compact` spacing and type from globals.css, so the page stays short.
 */
export function HomePage() {
  const enabled = HOME.sections.filter((s) => s.enabled);
  const body = enabled.filter((s) => s.id !== "trust" && s.id !== "cta");
  const trust = enabled.find((s) => s.id === "trust");
  const cta = enabled.find((s) => s.id === "cta");

  return (
    <div className={cn(HOME.layout.compact && "home-compact")}>
      <HomeHero hero={HOME.hero} compact={HOME.layout.compact} />
      {trust && REGISTRY.trust(trust)}
      {body.map((s) => (
        <div key={s.id}>{REGISTRY[s.id](s)}</div>
      ))}
      {cta && REGISTRY.cta(cta)}
    </div>
  );
}

import type { Metadata } from "next";
import { ConceptFrame } from "@/components/layout/Frame";
import {
  ComparisonSection,
  DashboardSection,
  DEFAULT_TRUST,
  FAQSection,
  FinalCTA,
  HeroCopy,
  IntegrationsSection,
  LifecycleSection,
  ProcessSection,
  ServicesSection,
  TrustStrip,
} from "@/components/sections";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ClaimJourney } from "@/components/visuals/ClaimJourney";
import { getConcept } from "@/data/concepts";
import { CTA } from "@/data/site";
import { PromisesStrip, TrustArchitecture } from "@/concepts/transparency/TrustArchitecture";
import { StatusTimeline } from "@/concepts/transparency/StatusTimeline";

const concept = getConcept("transparency")!;

export const metadata: Metadata = {
  title: `Concept 05 — ${concept.name}`,
  description: concept.support,
};

/** CONCEPT 05 — "The Transparent RCM Company". Airbnb trust systems + Stripe clarity. */
export default function Page() {
  return (
    <ConceptFrame concept={concept}>
      {/* Hero: copy, then the claim journey IS the visual */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[60%] mesh-bg opacity-60 fade-mask-b" aria-hidden />
        <div className="container-x relative">
          <HeroCopy
            eyebrow="The transparent RCM company"
            headline={concept.headline}
            highlight="See Where Your Revenue Goes."
            support={concept.support}
            primary={{ label: concept.cta, hoverLabel: concept.ctaHover, href: "#journey" }}
            secondary={{ label: CTA.primary, href: CTA.auditHref }}
            trust={DEFAULT_TRUST}
          />
          <Reveal y={40} delay={0.6} className="mt-14" amount={0.1}>
            <div id="journey" className="scroll-mt-28">
              <ClaimJourney />
            </div>
          </Reveal>
          <Reveal delay={0.2} className="mt-5 flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3">
            <span>Click any stage — every one expands to show exactly what Mindlox AI did there</span>
            <span className="hidden sm:inline">Demo claim · illustrative data</span>
          </Reveal>
        </div>
      </section>

      <TrustStrip variant="pillars" />
      <PromisesStrip />
      <TrustArchitecture />

      {/* Signature: live status board */}
      <Section id="status" tone="muted">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Live status"
            title="Every claim has a status you can see."
            highlight="you can see."
            description="Submitted, adjudicated, paid, posted — with the day it happened and the person who touched it. You never have to call to ask where a claim is."
          />
          <Reveal className="lg:mb-2">
            <MagneticButton href={CTA.auditHref} arrow variant="outline" hoverLabel="See My Claims Like This">
              See My Claims Like This
            </MagneticButton>
          </Reveal>
        </div>
        <Reveal className="mt-12" delay={0.1} y={30}>
          <StatusTimeline />
        </Reveal>
      </Section>

      <DashboardSection />
      <LifecycleSection tone="muted" />
      <ServicesSection initial={8} />
      <ComparisonSection tone="muted" />
      <ProcessSection tone="default" />
      <IntegrationsSection tone="muted" />
      <FAQSection limit={8} />
      <FinalCTA
        form
        title="See your revenue. All of it."
        highlight="All of it."
        description="Start with a free revenue audit. You'll see exactly where claims are stalling, where denials come from, and where dollars are leaking — findings you keep either way."
      />
    </ConceptFrame>
  );
}

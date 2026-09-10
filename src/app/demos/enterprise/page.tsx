import type { Metadata } from "next";
import { ConceptFrame } from "@/components/layout/Frame";
import {
  CaseStudiesSection,
  ComparisonSection,
  DashboardSection,
  FAQSection,
  IntegrationsSection,
  LifecycleSection,
  ProcessSection,
  ServicesSection,
  TrustStrip,
} from "@/components/sections";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { getConcept } from "@/data/concepts";
import { CTA } from "@/data/site";
import { TARGET_ORGS } from "@/data/content";
import { OrgSelector } from "@/concepts/enterprise/OrgSelector";
import { MetricWall } from "@/concepts/enterprise/MetricWall";
import { Readiness } from "@/concepts/enterprise/Readiness";

const concept = getConcept("enterprise")!;

export const metadata: Metadata = {
  title: `Concept 06 — ${concept.name}`,
  description: concept.support,
};

/** CONCEPT 06 — "Enterprise Healthcare". Vercel monochrome grid + Fluent depth. One accent. Zero fluff. */
export default function Page() {
  return (
    <ConceptFrame concept={concept}>
      {/* Hero: copy left, metric wall right, faint grid */}
      <section className="relative overflow-hidden border-b border-line pt-32 pb-16 lg:pt-44 lg:pb-24">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60 fade-mask-b" aria-hidden />
        <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Reveal y={10} className="mb-6">
              <Eyebrow>Enterprise revenue cycle management</Eyebrow>
            </Reveal>
            <TextReveal as="h1" text={concept.headline} highlight="Modern Healthcare." highlightClassName="text-accent" immediate delay={0.1} className="text-display-xl font-bold text-fg" />
            <Reveal delay={0.55} y={16} className="mt-7 max-w-xl">
              <p className="text-lg leading-relaxed text-fg-2 lg:text-xl">{concept.support}</p>
            </Reveal>
            <Reveal delay={0.75} y={14} className="mt-9 flex flex-wrap items-center gap-3">
              <MagneticButton href={CTA.specialistHref} size="lg" arrow hoverLabel={concept.ctaHover}>
                {concept.cta}
              </MagneticButton>
              <MagneticButton href="/services" size="lg" variant="secondary">
                {concept.secondaryCta ?? "Explore Our RCM"}
              </MagneticButton>
            </Reveal>
            <Reveal delay={0.95} y={8} className="mt-10">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3 sm:grid-cols-3">
                {TARGET_ORGS.slice(0, 6).map((o) => (
                  <li key={o} className="flex items-center gap-2">
                    <span className="size-1 bg-fg" aria-hidden />
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.4} y={30} className="lg:col-span-6">
            <MetricWall />
          </Reveal>
        </div>
      </section>

      <TrustStrip variant="pillars" marquee={false} />

      {/* Signature: organization-type selector */}
      <Section id="organizations">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionHeading eyebrow="Built for your organization" title="Ten organization types. One disciplined revenue system." highlight="One disciplined revenue system." description="Select your organization type. The brief reshapes: what matters, where revenue leaks, and how Mindlox AI is deployed." />
          </div>
          <Reveal className="lg:col-span-4 lg:pb-2 lg:text-right">
            <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-fg-3">Category-level guidance · specifics confirmed in discovery</p>
          </Reveal>
        </div>
        <Reveal className="mt-12" delay={0.1}>
          <OrgSelector />
        </Reveal>
      </Section>

      <LifecycleSection tone="muted" />
      <ServicesSection initial={12} title="Every service, one operating model." description="Twenty-four services under one accountable team, one set of dashboards, and one governance cadence." />
      <DashboardSection tone="muted" />
      <Readiness className="bg-bg" />
      <IntegrationsSection tone="default" />
      <ComparisonSection whySwitch={false} tone="muted" />
      <ProcessSection tone="default" />
      <CaseStudiesSection tone="muted" />
      <FAQSection limit={8} />

      {/* Closing: black block, white type, one accent */}
      <section
        data-scheme="dark"
        className="relative overflow-hidden section-y bg-bg text-fg"
        style={{ ["--bg" as string]: "#0a0a0a", ["--bg-2" as string]: "#141414", ["--bg-3" as string]: "#1c1c1c", ["--fg" as string]: "#ffffff", ["--fg-2" as string]: "#b3b3b3", ["--fg-3" as string]: "#7a7a7a", ["--line" as string]: "rgb(255 255 255 / 0.12)", ["--line-strong" as string]: "rgb(255 255 255 / 0.24)", ["--surface" as string]: "rgb(255 255 255 / 0.06)", ["--accent" as string]: "#2b6bff", ["--glow" as string]: "rgb(43 107 255 / 0.45)" }}
      >
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <TextReveal as="h2" text="Let's build your revenue operating model." highlight="revenue operating model." highlightClassName="text-accent" className="text-display-lg font-bold text-fg" />
            <Reveal delay={0.15} className="mt-6">
              <p className="max-w-2xl text-lg text-fg-2 lg:text-xl">A working session with an RCM specialist: your payer mix, your systems, your organization's structure — and a plan you keep either way.</p>
            </Reveal>
          </div>
          <Reveal delay={0.25} className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <MagneticButton href={CTA.specialistHref} size="lg" arrow hoverLabel="Schedule a Working Session">
              Talk to an RCM Specialist
            </MagneticButton>
            <MagneticButton href={CTA.auditHref} size="lg" variant="glass">
              {CTA.primaryShort}
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </ConceptFrame>
  );
}

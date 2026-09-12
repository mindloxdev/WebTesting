import type { Metadata } from "next";
import { Frame } from "@/components/layout/Frame";
import { PageHero, TrustStrip, FinalCTA, ProcessSection } from "@/components/sections";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { JsonLd, ORGANIZATION_LD, breadcrumbLd } from "@/components/seo/JsonLd";
import { CTA } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mindlox AI is a medical billing and healthcare revenue-cycle management company serving providers across the United States — experienced billing specialists, modern automation, and AI-assisted intelligence.",
  alternates: { canonical: "/about" },
};

const BELIEFS = [
  { n: "01", title: "Transparency is the product", detail: "If you have to call to find out where a claim is, the system has already failed. Every dollar should be visible without asking." },
  { n: "02", title: "Prevention over rework", detail: "A denial worked is a denial that shouldn't have happened. Every root cause feeds back to the front end." },
  { n: "03", title: "Specialty depth wins", detail: "Cardiology and behavioral health don't share a denial pattern. They shouldn't share a queue." },
  { n: "04", title: "Partnership over vendor", detail: "A named team, a weekly cadence, and a clear escalation path. We become an extension of your practice." },
  { n: "05", title: "Responsible AI", detail: "AI finds patterns at scale. People decide. We never claim outcomes we can't stand behind." },
];

export default function AboutPage() {
  return (
    <Frame scheme="light" theme="theme-ultimate">
      <JsonLd data={[ORGANIZATION_LD, breadcrumbLd([{ name: "Home", url: "https://mindlox.ai/" }, { name: "About", url: "https://mindlox.ai/about" }])]} />

      <PageHero
        crumbs={[{ label: "About" }]}
        eyebrow="About Mindlox AI"
        title="Experienced billing humans. Modern technology. AI-assisted intelligence."
        highlight="AI-assisted intelligence."
        description="Mindlox AI is a medical billing and revenue-cycle management company serving healthcare providers across the United States."
        primary={{ label: CTA.primary, hoverLabel: CTA.primaryHover }}
        secondary={{ label: CTA.secondary }}
      />

      <Section id="mission" tone="muted" tight>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <p className="eyebrow">Our mission</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-display text-display-sm font-semibold text-fg">
              We combine experienced billing professionals with modern automation and AI-assisted intelligence to help providers get paid faster, reduce denials, recover lost revenue, and see exactly where their money is.
            </p>
            <p className="mt-6 max-w-2xl text-lg text-fg-2">
              We don't join the medical billing market as one more vendor. We reframe it: transparent by default, specialty-deep, intelligent at scale, and accountable to a named team you can actually reach.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section id="beliefs">
        <SectionHeading eyebrow="What we believe" title="Five principles, applied to every claim." highlight="every claim." />
        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5" staggerChildren={0.06}>
          {BELIEFS.map((b) => (
            <RevealItem key={b.n}>
              <Card className="h-full" padding="md">
                <span className="font-mono text-[11px] text-accent">{b.n}</span>
                <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-fg">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-2">{b.detail}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <TrustStrip />

      {/* How we work with you — the five-step onboarding (also on /services). */}
      <ProcessSection id="how-we-work" tone="muted" />

      <Section id="careers" tight>
        <Reveal>
          <div className="flex flex-col gap-6 rounded-[22px] border border-line bg-bg-2/60 p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
            <div className="max-w-2xl">
              <p className="eyebrow mb-3">Careers</p>
              <h2 className="font-display text-display-sm font-semibold text-fg">Coders, billers, A/R strategists, and engineers who think revenue should be visible.</h2>
              <p className="mt-3 text-fg-2">If you've ever wanted to fix the revenue cycle instead of just working it, we'd like to talk.</p>
            </div>
            <MagneticButton href="/careers" arrow variant="outline" hoverLabel="Introduce Yourself">
              See careers
            </MagneticButton>
          </div>
        </Reveal>
      </Section>

      <FinalCTA />
    </Frame>
  );
}

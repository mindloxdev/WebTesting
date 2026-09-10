import type { Metadata } from "next";
import { Check, ShieldCheck } from "lucide-react";
import { Frame } from "@/components/layout/Frame";
import { PageHero, IntegrationsSection, ComparisonSection, FinalCTA } from "@/components/sections";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { JsonLd, faqLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { WHY_SWITCH } from "@/data/content";
import { CTA } from "@/data/site";
import { SWITCH_OBJECTIONS, WHAT_YOU_KEEP } from "@/data/compare";
import { SwitchTimeline } from "@/concepts/company/SwitchTimeline";

export const metadata: Metadata = {
  title: "Switch to Mindlox AI",
  description:
    "A calm, no-disruption transition to Mindlox AI: parallel-run planning, legacy A/R strategy, payer connectivity review, and dashboards on from day one. Your revenue never pauses.",
  alternates: { canonical: "/switch" },
};

export default function SwitchPage() {
  return (
    <Frame scheme="light" theme="theme-ultimate">
      <JsonLd data={[faqLd(SWITCH_OBJECTIONS), breadcrumbLd([{ name: "Home", url: "https://mindlox.ai/" }, { name: "Switch to Mindlox AI", url: "https://mindlox.ai/switch" }])]} />

      <PageHero
        crumbs={[{ label: "Switch to Mindlox AI" }]}
        eyebrow="Switch to Mindlox AI"
        title="Switching billing partners shouldn't pause your revenue. It won't."
        highlight="It won't."
        description="A parallel run, a single cutover date, a plan for every open balance, and dashboards on from day one. Switching is a project we've designed to feel uneventful."
        primary={{ label: "Plan My Switch", hoverLabel: "Start With a Revenue Audit" }}
        secondary={{ label: CTA.secondary }}
        aside={
          <div className="rounded-[22px] border border-line bg-bg p-6 shadow-e3 lg:p-8">
            <p className="eyebrow mb-4">The switch, in one line</p>
            <ul className="space-y-3">
              {["Nothing is cancelled before the plan is agreed", "New charges cut over on one agreed date", "Every open balance has a named owner", "Timely-filing deadlines tracked from day one", "You watch it happen in your dashboard"].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px] text-fg">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-positive/15 text-positive">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      {/* Why practices switch */}
      <Section id="why-switch" tone="muted">
        <SectionHeading
          eyebrow="Why practices switch"
          title="Practices typically move to Mindlox AI when they experience…"
          description="Patterns, not names. If two or three of these are familiar, the switch is easier than you think."
        />
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerChildren={0.06}>
          {WHY_SWITCH.map((w, i) => (
            <RevealItem key={w.title}>
              <Card className="h-full" padding="md">
                <span className="font-mono text-[11px] text-fg-3">0{i + 1}</span>
                <h3 className="mt-5 font-display text-xl font-semibold text-fg">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-2">{w.detail}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Transition timeline */}
      <Section id="transition">
        <SectionHeading
          eyebrow="The no-disruption transition"
          title="Six steps. One cutover date. Zero orphaned claims."
          highlight="Zero orphaned claims."
          description="Every transition follows the same disciplined sequence, adjusted for your specialties, systems, and current arrangement."
        />
        <Reveal className="mt-14" delay={0.1}>
          <SwitchTimeline />
        </Reveal>
      </Section>

      {/* What you keep */}
      <Section id="what-you-keep" tone="muted">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <SectionHeading
            eyebrow="What you keep"
            title="Everything that makes your practice yours."
            highlight="yours."
            description="A change of billing partner should change your results — not your systems, your contracts, or how patients experience you."
          />
          <RevealGroup className="grid gap-4 sm:grid-cols-2" staggerChildren={0.07}>
            {WHAT_YOU_KEEP.map((k) => (
              <RevealItem key={k.title}>
                <div className="flex h-full gap-4 rounded-2xl border border-line bg-bg p-6">
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <ShieldCheck className="size-4.5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-fg">{k.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-2">{k.detail}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <IntegrationsSection tone="default" />

      {/* Objections */}
      <Section id="objections" tone="muted">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading eyebrow="Objections, answered" size="md" title="The questions every practice asks before switching." description="Straight answers. If yours isn't here, an RCM specialist will answer it on the first call." />
            <Reveal className="mt-8">
              <MagneticButton href={CTA.specialistHref} arrow variant="outline" hoverLabel="Ask an RCM Specialist">
                Ask a Question
              </MagneticButton>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Accordion items={SWITCH_OBJECTIONS} />
          </Reveal>
        </div>
      </Section>

      <ComparisonSection whySwitch={false} tone="default" id="compare" />

      <FinalCTA
        form
        title="Plan a switch where revenue never pauses."
        highlight="never pauses."
        description="Start with a free revenue audit. You'll see where revenue is leaking today and get a transition plan built around your practice — findings are yours to keep."
      />
    </Frame>
  );
}

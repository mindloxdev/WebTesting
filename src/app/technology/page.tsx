import type { Metadata } from "next";
import { Check, Lock, X } from "lucide-react";
import { Frame } from "@/components/layout/Frame";
import { PageHero, AISection, DashboardSection, IntegrationsSection, FinalCTA } from "@/components/sections";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbLd, faqLd } from "@/components/seo/JsonLd";
import { FAQ } from "@/data/content";
import { CTA } from "@/data/site";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "The Mindlox AI intelligence layer: denial-risk scoring, underpayment detection, eligibility mismatch detection, A/R prioritization, payer-pattern analysis — AI-assisted, human-reviewed, inside the systems you already use.",
  alternates: { canonical: "/technology" },
};

const DOES = [
  "Scores denial risk on every claim before submission",
  "Compares every remittance to contracted rates to detect underpayments",
  "Detects eligibility mismatches between registration and payer response",
  "Prioritizes A/R follow-up by value, likelihood, and timely-filing risk",
  "Surfaces systematic payer behavior across thousands of claims",
  "Flags anomalies in charges, units, and diagnosis pairings",
];

const DOESNT = [
  "Make final coding decisions — certified coders do",
  "Submit a claim without human review of flagged items",
  "Guarantee outcomes, collection rates, or zero denials",
  "Replace your team — it gives them better information",
];

const SECURITY = [
  { title: "HIPAA-conscious workflows", detail: "Minimum-necessary access and documented handling procedures across every stage." },
  { title: "Role-based access", detail: "Team members see only the accounts and data their role requires." },
  { title: "Audit logging", detail: "Every claim action is recorded and visible to you." },
  { title: "Encryption in transit and at rest", detail: "[Confirm specifics before publishing.]" },
  { title: "BAA where applicable", detail: "Business Associate Agreements with covered entities. [Confirm legal language before publishing.]" },
  { title: "Secure payer connectivity", detail: "Clearinghouse, ERA, and EFT exchange through established secure channels." },
];

const TECH_FAQ = FAQ.filter((f) => /AI|patient information|Business Associate|EHR|claim volume/i.test(f.q));

export default function TechnologyPage() {
  return (
    <Frame scheme="light" theme="theme-ultimate">
      <JsonLd data={[faqLd(TECH_FAQ), breadcrumbLd([{ name: "Home", url: "https://mindlox.ai/" }, { name: "Technology", url: "https://mindlox.ai/technology" }])]} />

      <PageHero
        crumbs={[{ label: "Technology" }]}
        eyebrow="Technology"
        title="An intelligent operating system for the revenue cycle."
        highlight="intelligent operating system"
        description="AI-assisted pattern detection and decision support layered on the EHR and practice management systems you already use — with experienced billing specialists making every call."
        primary={{ label: "See What AI Finds in My Claims", hoverLabel: "Start With a Revenue Audit" }}
        secondary={{ label: "Experience the Command Center", href: "/demos/command-center" }}
      />

      <AISection feed tone="muted" />

      <Section id="does-doesnt">
        <SectionHeading eyebrow="Responsible by design" title="What the AI does — and doesn't." highlight="and doesn't." description="Clear boundaries make the intelligence trustworthy. It finds patterns at a scale no team can. People decide." align="center" />
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[22px] border border-positive/30 bg-positive/5 p-6 lg:p-8">
              <p className="eyebrow mb-5 !text-positive">It does</p>
              <ul className="space-y-3">
                {DOES.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-[15px] text-fg">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-positive/15 text-positive">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-[22px] border border-line bg-bg-2/60 p-6 lg:p-8">
              <p className="eyebrow mb-5 !text-fg-3">It doesn't</p>
              <ul className="space-y-3">
                {DOESNT.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-[15px] text-fg">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-fg/8 text-fg-2">
                      <X className="size-3" strokeWidth={3} />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-mono text-[11px] text-fg-3">Language rule: AI-assisted, intelligent automation, decision support, pattern detection. Never "guarantees zero denials."</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <DashboardSection tone="muted" ctaHref="/demos/command-center" />

      <IntegrationsSection tone="default" />

      <Section id="security" tone="muted">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-start">
          <SectionHeading eyebrow="Security & data handling" size="md" title="Patient data handled the way a covered entity would expect." description="Security posture stated only where we can stand behind it. Documentation is available on request." />
          <RevealGroup className="grid gap-3 sm:grid-cols-2" staggerChildren={0.05}>
            {SECURITY.map((s) => (
              <RevealItem key={s.title}>
                <div className="flex h-full gap-3 rounded-2xl border border-line bg-bg p-5">
                  <Lock className="mt-0.5 size-4 shrink-0 text-accent" />
                  <div>
                    <p className="font-medium text-fg">{s.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-fg-2">{s.detail}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Section id="faq">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="FAQ" size="md" title="How we use AI, and how we protect data." description={`Straight answers. For anything else, ${CTA.secondary.toLowerCase()}.`} />
          <Reveal delay={0.1}>
            <Accordion items={TECH_FAQ.slice(0, 5)} />
          </Reveal>
        </div>
      </Section>

      <FinalCTA />
    </Frame>
  );
}

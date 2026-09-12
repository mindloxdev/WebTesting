import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, Sparkles, Stethoscope, Timer, MonitorSmartphone, Handshake } from "lucide-react";
import { Frame } from "@/components/layout/Frame";
import { PageHero, ComparisonSection, FAQSection, FinalCTA, PromisesStrip, TrustArchitecture, HandoffExplained } from "@/components/sections";
import { ProofOfSystem } from "@/components/home/ProofOfSystem";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { CTA } from "@/data/site";

export const metadata: Metadata = {
  title: "Why Mindlox AI",
  description:
    "Transparency, AI + human expertise, specialty depth, speed to value, a modern experience, and partnership over vendor — the six gaps Mindlox AI owns in medical billing and RCM.",
  alternates: { canonical: "/why-mindlox-ai" },
};

const GAPS = [
  { icon: Eye, title: "Transparency", proof: "Claim-level dashboards, not monthly PDFs.", detail: "See where every dollar is. The clickable claim journey and live dashboards are proof, not promises.", href: "/technology#status", link: "See a claim's status" },
  { icon: Sparkles, title: "AI + Human", proof: "Intelligence finds. Specialists decide.", detail: "Not software you learn, not an agency you chase — an intelligent operating system with expert humans behind it.", href: "/technology", link: "See the technology" },
  { icon: Stethoscope, title: "Specialty depth", proof: "30+ specialty playbooks.", detail: "Coders and denial specialists aligned to your specialty's code sets, denial patterns, and payer rules.", href: "/specialties", link: "Explore specialties" },
  { icon: Timer, title: "Speed to value", proof: "Insight before the sales call.", detail: "A free revenue audit and a leakage calculator give you real findings before anyone asks for a signature.", href: "/contact", link: "Get the audit" },
  { icon: MonitorSmartphone, title: "Modern experience", proof: "The website is evidence.", detail: "How a company builds its front door says how it thinks about technology. Ours is built like modern software because that's what we run.", href: "/revenue-leakage-calculator", link: "Try the calculator" },
  { icon: Handshake, title: "Partnership over vendor", proof: "We become an extension of your practice.", detail: "A named account team, weekly reviews, and clear escalation — not a ticket number.", href: "/switch", link: "How partnership starts" },
];

export default function WhyPage() {
  return (
    <Frame theme="theme-ultimate">
      <JsonLd data={breadcrumbLd([{ name: "Home", url: "https://mindlox.ai/" }, { name: "Why Mindlox AI", url: "https://mindlox.ai/why-mindlox-ai" }])} />

      <PageHero
        crumbs={[{ label: "Why Mindlox AI" }]}
        eyebrow="Why Mindlox AI"
        title="Built for how modern practices actually get paid."
        highlight="actually get paid."
        description="Most billing relationships are built around submitting claims. Mindlox AI is built around the six things practices say they're missing — and shows the proof on the page."
        primary={{ label: CTA.primary, hoverLabel: CTA.primaryHover }}
        secondary={{ label: CTA.secondary }}
      />

      <PromisesStrip />

      <Section id="gaps">
        <SectionHeading eyebrow="The six gaps we own" title="Six things practices were missing. Six things we built the company around." highlight="built the company around." />
        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3" staggerChildren={0.06}>
          {GAPS.map((g) => {
            const Icon = g.icon;
            return (
              <RevealItem key={g.title}>
                <Card className="h-full" padding="md">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-fg">{g.title}</h3>
                  <p className="mt-1 text-sm font-medium text-accent">{g.proof}</p>
                  <p className="mt-3 text-sm leading-relaxed text-fg-2">{g.detail}</p>
                  <Link href={g.href} className="group/l mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-accent">
                    {g.link}
                    <ArrowRight className="size-4 transition-transform group-hover/l:translate-x-0.5" />
                  </Link>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <HandoffExplained />

      <ComparisonSection whySwitch id="compare" />

      <ProofOfSystem />

      <TrustArchitecture />

      <FAQSection limit={6} tone="muted" />

      <FinalCTA form />
    </Frame>
  );
}

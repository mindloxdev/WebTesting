import type { Metadata } from "next";
import { Frame } from "@/components/layout/Frame";
import { PageHero, FinalCTA } from "@/components/sections";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { LeakageCalculator } from "@/components/visuals/LeakageCalculator";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { CTA } from "@/data/site";

const SITE = "https://mindlox.ai";

export const metadata: Metadata = {
  title: "Revenue Leakage Calculator",
  description:
    "Estimate what denials, aging A/R, and underpayments cost your practice each month. Start from a specialty benchmark or enter your own figures — every assumption is shown.",
  alternates: { canonical: "/revenue-leakage-calculator" },
};

const MEASURES = [
  {
    title: "Denials never reworked",
    detail:
      "A share of every denial is never touched again. The model counts those claims as lost rather than pending, because that is what they are once the filing window closes.",
  },
  {
    title: "A/R drag and timely filing",
    detail:
      "Balances aging past 30 days lose value, and past a payer's deadline they lose all of it. The model charges a cost for every 30 days beyond the first.",
  },
  {
    title: "Underpayments",
    detail:
      "Payers pay below contracted rates more often than most practices check. The model assumes a modest share of collections is short-paid and never appealed.",
  },
];

/**
 * The calculator's own page, for the Resources menu and for linking to
 * directly. The home page keeps its own copy of the section — this route
 * renders the same component, so the two can never drift apart.
 */
export default function CalculatorPage() {
  return (
    <Frame theme="theme-ultimate">
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: `${SITE}/` },
          { name: "Resources", url: `${SITE}/resources` },
          { name: "Revenue Leakage Calculator", url: `${SITE}/revenue-leakage-calculator` },
        ])}
      />

      <PageHero
        crumbs={[{ label: "Resources", href: "/resources" }, { label: "Revenue Leakage Calculator" }]}
        eyebrow="Free tool"
        title="How much revenue are you losing?"
        highlight="are you losing?"
        description="Test different scenarios in real time, and see exactly how every dollar is calculated."
        size="lg"
        primary={{ label: CTA.primary, hoverLabel: CTA.primaryHover }}
        secondary={{ label: CTA.secondary }}
      />

      <Section tight className="pt-0">
        <Reveal y={16}>
          <LeakageCalculator detailed />
        </Reveal>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="What it measures"
          size="md"
          title="Three leaks, counted separately."
          description="Most practices feel the total and cannot name the causes. The estimate splits them so you know which one to work first."
        />
        <RevealGroup className="mt-10 grid gap-4 md:grid-cols-3" staggerChildren={0.06}>
          {MEASURES.map((m) => (
            <RevealItem key={m.title}>
              <Card className="h-full" padding="md">
                <h2 className="font-display text-lg font-semibold leading-snug text-fg">{m.title}</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-2">{m.detail}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-8">
          <p className="max-w-2xl text-sm leading-relaxed text-fg-3">
            The figures are an illustrative model, not a quote or a guarantee. Every assumption behind them is listed
            under the estimate, and a free revenue audit replaces them with your actual denial mix, A/R aging, and
            payer behavior.
          </p>
        </Reveal>
      </Section>

      <FinalCTA />
    </Frame>
  );
}

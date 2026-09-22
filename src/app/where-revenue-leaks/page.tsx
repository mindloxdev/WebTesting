import type { Metadata } from "next";
import { Frame } from "@/components/layout/Frame";
import { PageHero, FinalCTA, LifecycleSection } from "@/components/sections";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LeakReveal } from "@/components/visuals/LeakReveal";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";

const SITE = "https://mindlox.ai";

export const metadata: Metadata = {
  title: "Where revenue leaks",
  description:
    "Seven ways revenue leaves a practice — denials, underpayments, aging A/R, eligibility, coding, credentialing, and patient balances — and what it takes to recover each one.",
  alternates: { canonical: "/where-revenue-leaks" },
};

const READ = [
  {
    title: "The bar is what you keep",
    detail:
      "It starts at everything you earned. Each cause below takes its share as you scroll, so the gap between billed and banked stops being an abstraction.",
  },
  {
    title: "The causes compound",
    detail:
      "No single leak is fatal. Seven small ones running at once are, which is why practices feel the total long before they can name any one of them.",
  },
  {
    title: "Most of it is recoverable",
    detail:
      "Not all, and not instantly. The recovered portion is what a structured program targets once the causes are found and the controls are in place.",
  },
];

/**
 * The "where it goes" visual, lifted out of the Denial Reason Explorer onto
 * its own page. It answers a different question from that page — the explorer
 * is about which codes a practice sees, this is about where the money goes.
 */
export default function WhereRevenueLeaksPage() {
  return (
    <Frame theme="theme-ultimate">
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: `${SITE}/` },
          { name: "Resources", url: `${SITE}/resources` },
          { name: "Where revenue leaks", url: `${SITE}/where-revenue-leaks` },
        ])}
      />

      <PageHero
        crumbs={[{ label: "Resources", href: "/resources" }, { label: "Where revenue leaks" }]}
        eyebrow="Where it goes"
        title="Seven ways revenue leaks. One way to get it back."
        highlight="One way to get it back."
        description="Scroll through the causes. The bar on the left shows what a practice keeps as each one takes its share — and what comes back once they are found, fixed, and recovered."
        size="lg"
      />

      <Section id="where-it-goes" bleed ariaLabel="Where revenue goes" className="pt-0">
        <LeakReveal />
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="How to read it"
          size="md"
          title="Three things the bar tells you."
          description="What the visual is showing, and what to take from it."
        />
        <RevealGroup className="mt-10 grid gap-4 md:grid-cols-3" staggerChildren={0.06}>
          {READ.map((r) => (
            <RevealItem key={r.title}>
              <Card className="h-full" padding="md">
                <h2 className="font-display text-lg font-semibold leading-snug text-fg">{r.title}</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-2">{r.detail}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tight>
        <Reveal>
          <div className="overflow-hidden rounded-[22px] border border-line bg-bg p-8 shadow-e3 lg:p-10">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="eyebrow">Put a number on it</p>
                <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-fg lg:text-3xl">
                  The shares are illustrative. Your figures are not.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-fg-2">
                  The revenue leakage calculator estimates what denials, aging A/R, and underpayments take out of your
                  practice each month — with a cause breakdown and a twelve-month projection.
                </p>
              </div>
              <MagneticButton href="/revenue-leakage-calculator" size="lg" arrow hoverLabel="Run the Numbers">
                Open the calculator
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </Section>

      <LifecycleSection tone="muted" />
      <FinalCTA
        form
        title="Find out which of the seven is yours."
        highlight="is yours."
        description="A free revenue audit replaces the illustrative shares with your actual denial mix, A/R aging, and payer behavior."
      />
    </Frame>
  );
}

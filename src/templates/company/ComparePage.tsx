import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";
import type { ComparePage as CompareData } from "@/data/compare";
import { CTA } from "@/data/site";
import { Frame } from "@/components/layout/Frame";
import { PageHero, FinalCTA } from "@/components/sections";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ComparisonTable } from "@/components/visuals/ComparisonTable";
import { JsonLd, faqLd, breadcrumbLd } from "@/components/seo/JsonLd";

/** Neutral category comparison template. Fair language throughout. */
export function ComparePageView({ data }: { data: CompareData }) {
  const url = `https://mindlox.ai/compare/${data.slug}`;
  return (
    <Frame theme="theme-ultimate">
      <JsonLd data={[faqLd(data.faq), breadcrumbLd([{ name: "Home", url: "https://mindlox.ai/" }, { name: "Compare", url: "https://mindlox.ai/why-mindlox-ai" }, { name: data.title, url }])]} />

      <PageHero
        crumbs={[{ label: "Compare", href: "/why-mindlox-ai" }, { label: data.title }]}
        eyebrow="Category comparison"
        title={data.title}
        highlight="Mindlox AI"
        description={data.framing}
        primary={{ label: CTA.primary, hoverLabel: CTA.primaryHover }}
        secondary={{ label: "How switching works", href: "/switch" }}
        aside={
          <div className="rounded-[22px] border border-line bg-bg p-6 shadow-e3 lg:p-8">
            <div className="flex items-center gap-2">
              <Scale className="size-4 text-accent" />
              <p className="eyebrow">How we compare</p>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
              This page compares categories, not companies. Where {data.category} genuinely fits, we say so. Where practices tend to feel a gap, we describe the pattern — never a name.
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">
              <li>· Fair framing</li>
              <li>· Category-level</li>
              <li>· No fabricated stats</li>
              <li>· Findings you keep</li>
            </ul>
          </div>
        }
      />

      {/* When it makes sense */}
      <Section id="when" tone="muted">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <SectionHeading eyebrow="An honest starting point" size="md" title={`When ${data.category} makes sense`} description="Not every practice needs to change anything. These are the situations where the alternative is a reasonable fit." />
          <RevealGroup className="grid gap-4" staggerChildren={0.07}>
            {data.whenItMakesSense.map((w) => (
              <RevealItem key={w.title}>
                <div className="rounded-2xl border border-line bg-bg p-6">
                  <h3 className="font-display text-lg font-semibold text-fg">{w.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-2">{w.detail}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Where practices feel the gap */}
      <Section id="gaps">
        <SectionHeading eyebrow="Where practices feel the gap" title="The patterns that usually prompt a second look." highlight="second look." description="Described neutrally — these are structural tendencies of the category, not a verdict on any provider." />
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerChildren={0.06}>
          {data.gaps.map((g, i) => (
            <RevealItem key={g.title}>
              <Card className="h-full" padding="md">
                <span className="font-mono text-[11px] text-fg-3">0{i + 1}</span>
                <h3 className="mt-5 font-display text-lg font-semibold text-fg">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-2">{g.detail}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Table */}
      <Section id="table" tone="muted">
        <SectionHeading eyebrow="Side by side" title="How they differ in practice." highlight="in practice." description={`${data.columnLabel} versus Mindlox AI across the dimensions that decide net collections.`} />
        <Reveal className="mt-12" delay={0.1}>
          <ComparisonTable rows={data.rows} />
        </Reveal>
        <Reveal className="mt-3 text-center">
          <p className="font-mono text-[11px] text-fg-3">Left column describes the category in general terms. Individual providers vary.</p>
        </Reveal>
      </Section>

      {/* Switching */}
      <Section id="switching">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div>
            <SectionHeading eyebrow="What switching looks like" size="md" title="Uneventful, by design." description="A parallel run, a single cutover date, and a plan for every open balance. Your revenue never pauses." />
            <Reveal className="mt-8">
              <MagneticButton href="/switch" arrow variant="outline" hoverLabel="See the Transition Plan">
                How the switch works
              </MagneticButton>
            </Reveal>
          </div>
          <RevealGroup className="grid gap-4" staggerChildren={0.07}>
            {data.switching.map((s, i) => (
              <RevealItem key={s.title}>
                <div className="flex gap-4 rounded-2xl border border-line bg-bg-2/60 p-6">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-accent bg-bg font-mono text-xs text-accent">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-fg">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-2">{s.detail}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="muted">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading eyebrow="FAQ" size="md" title="Questions practices ask about this comparison." />
            <Reveal className="mt-6">
              <ul className="space-y-2 text-sm">
                {["/compare/traditional-billing-company", "/compare/in-house-billing", "/compare/ehr-bundled-billing"]
                  .filter((h) => !h.endsWith(data.slug))
                  .map((h) => (
                    <li key={h}>
                      <Link href={h} className="group inline-flex items-center gap-1.5 text-accent hover:text-fg">
                        Compare vs. {h.split("/").pop()?.replace(/-/g, " ")}
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Accordion items={data.faq} />
          </Reveal>
        </div>
      </Section>

      <FinalCTA form title="See the difference on your own claims." highlight="your own claims." description="A free revenue audit models denials, A/R aging, coding patterns, and underpayments for your practice — findings are yours to keep, whichever way you decide." />
    </Frame>
  );
}

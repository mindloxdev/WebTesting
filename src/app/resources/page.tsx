import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calculator, FileText } from "lucide-react";
import { Frame } from "@/components/layout/Frame";
import { PageHero, FAQSection, CaseStudiesSection, FinalCTA } from "@/components/sections";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { RESOURCES } from "@/data/content";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Medical billing guides, RCM insights, denial management guides, coding updates, credentialing resources, healthcare revenue reports, case studies, and FAQ from Mindlox AI.",
  alternates: { canonical: "/resources" },
};

const anchor = (href: string) => href.split("#")[1] ?? "";

export default function ResourcesPage() {
  return (
    <Frame scheme="light" theme="theme-ultimate">
      <JsonLd data={breadcrumbLd([{ name: "Home", url: "https://mindlox.ai/" }, { name: "Resources", url: "https://mindlox.ai/resources" }])} />

      <PageHero
        crumbs={[{ label: "Resources" }]}
        eyebrow="Resources"
        title="Guides, insights, and updates for revenue leaders."
        highlight="revenue leaders."
        description="Practical, specific, written by people who work claims every day. Eight collections — jump to the one you need."
        aside={
          <nav aria-label="Resource collections" className="rounded-[22px] border border-line bg-bg p-6 shadow-e3">
            <p className="eyebrow mb-4">Jump to</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {RESOURCES.map((r) => (
                <li key={r.title}>
                  <a href={`#${anchor(r.href)}`} className="text-sm text-fg-2 transition-colors hover:text-accent">
                    {r.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      {/* Tools — self-serve value before any sales call. */}
      <Section id="tools" tight>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Tools" size="md" title="Start with a number." description="Free, instant, and fully explained — no sales call required." />
        </div>
        <RevealGroup className="mt-10 grid gap-4 md:grid-cols-3" staggerChildren={0.06}>
          <RevealItem>
            <Card className="h-full" padding="md">
              <Link href="/revenue-leakage-calculator" className="block after:absolute after:inset-0" aria-label="Open the Revenue Leakage Calculator">
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Calculator className="size-4" aria-hidden />
                  </span>
                  <ArrowUpRight className="size-4 text-fg-3 transition-all duration-500 ease-out-expo group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-accent" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-fg">Revenue Leakage Calculator</h3>
                <p className="mt-2 text-sm text-fg-2">Estimate what denials, aging A/R, and underpayments cost your practice each month — every assumption shown.</p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">Interactive · 2 min</p>
              </Link>
            </Card>
          </RevealItem>
        </RevealGroup>
      </Section>

      {RESOURCES.map((r, i) => {
        const id = anchor(r.href);
        if (id === "faq") return <FAQSection key={id} id="faq" tone={i % 2 ? "muted" : "default"} />;
        if (id === "case-studies") return <CaseStudiesSection key={id} id="case-studies" tone={i % 2 ? "muted" : "default"} />;
        return (
          <Section key={id} id={id} tone={i % 2 ? "muted" : "default"} tight>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading eyebrow={r.category} size="md" title={r.title} description={r.blurb} />
              <DemoBadge label="Placeholder" className="lg:mb-2" />
            </div>
            <RevealGroup className="mt-10 grid gap-4 md:grid-cols-3" staggerChildren={0.06}>
              {[1, 2, 3].map((n) => (
                <RevealItem key={n}>
                  <Card className="h-full" padding="md">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">{r.category}</span>
                      <FileText className="size-4 text-fg-3" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-fg">[Article title placeholder]</h3>
                    <p className="mt-2 text-sm text-fg-2">[One-line summary placeholder — replace with the published article's summary.]</p>
                    <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">[X] min read</p>
                  </Card>
                </RevealItem>
              ))}
            </RevealGroup>
          </Section>
        );
      })}

      <FinalCTA />
    </Frame>
  );
}

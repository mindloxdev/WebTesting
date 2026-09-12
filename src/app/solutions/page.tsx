import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Frame } from "@/components/layout/Frame";
import { PageHero, LifecycleSection, FinalCTA, Readiness } from "@/components/sections";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { OrgSelector } from "@/components/visuals/OrgSelector";
import { Ecosystem } from "@/components/home/Ecosystem";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { CTA } from "@/data/site";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Mindlox AI revenue cycle solutions for physician groups, multi-specialty practices, hospitals, ASCs, urgent care, behavioral health, specialty clinics, laboratories, DME suppliers, and telehealth organizations.",
  alternates: { canonical: "/solutions" },
};

const BY_PROBLEM = [
  { title: "Denials", detail: "Prevent, prioritize, appeal, and learn — root-cause taxonomy with a prevention loop.", href: "/denial-management" },
  { title: "Aging A/R", detail: "Balances segmented by payer, value, and timely-filing risk — worked by strategy.", href: "/ar-recovery" },
  { title: "Credentialing delays", detail: "Enrollment, CAQH, and re-credentialing tracked to completion so providers bill sooner.", href: "/credentialing" },
  { title: "Coding accuracy", detail: "Specialty-accurate CPT, ICD-10-CM, and HCPCS with audit-ready documentation feedback.", href: "/medical-coding" },
  { title: "Visibility", detail: "Live dashboards across claims, payments, denials, A/R, and payer performance.", href: "/revenue-cycle-management" },
];

export default function SolutionsPage() {
  return (
    <Frame theme="theme-ultimate">
      <JsonLd data={breadcrumbLd([{ name: "Home", url: "https://mindlox.ai/" }, { name: "Solutions", url: "https://mindlox.ai/solutions" }])} />

      <PageHero
        crumbs={[{ label: "Solutions" }]}
        eyebrow="Solutions"
        title="Solutions for every kind of healthcare organization."
        highlight="every kind"
        description="The revenue cycle is the same fourteen stages everywhere. What changes is where the money leaks — so Mindlox AI is deployed differently for each organization type."
        primary={{ label: CTA.primary, hoverLabel: CTA.primaryHover }}
        secondary={{ label: CTA.secondary }}
        aside={<Ecosystem />}
      />

      <Section id="by-organization" tone="muted">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="By organization type" title="Ten organization types. One disciplined revenue system." highlight="One disciplined revenue system." description="Select your organization type. The brief reshapes: what matters, where revenue leaks, and how Mindlox AI is deployed." />
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3 lg:mb-2">Category-level guidance · specifics confirmed in discovery</p>
        </div>
        <Reveal className="mt-12" delay={0.1}>
          <OrgSelector />
        </Reveal>
      </Section>

      <Section id="by-problem">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-start">
          <SectionHeading eyebrow="By problem" size="md" title="Start with the stage that hurts most." description="You don't have to hand over the whole cycle on day one. Many practices begin with a single problem and expand from there." />
          <RevealGroup className="grid gap-3" staggerChildren={0.06}>
            {BY_PROBLEM.map((p) => (
              <RevealItem key={p.title}>
                <Link href={p.href} className="group flex items-center gap-5 rounded-2xl border border-line bg-bg-2/60 p-5 transition-colors hover:border-line-strong hover:bg-bg-2">
                  <div className="flex-1">
                    <p className="font-display text-lg font-semibold text-fg">{p.title}</p>
                    <p className="mt-1 text-sm text-fg-2">{p.detail}</p>
                  </div>
                  <ArrowRight className="size-5 shrink-0 text-fg-3 transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-accent" />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Readiness />

      <LifecycleSection tone="default" />

      <FinalCTA />
    </Frame>
  );
}

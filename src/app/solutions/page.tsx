import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Frame } from "@/components/layout/Frame";
import { PageHero, LifecycleSection, FinalCTA } from "@/components/sections";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { CTA } from "@/data/site";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Mindlox AI revenue cycle solutions for physician groups, multi-specialty practices, hospitals, ASCs, urgent care, behavioral health, specialty clinics, laboratories, DME suppliers, and telehealth organizations.",
  alternates: { canonical: "/solutions" },
};

const ORG_SOLUTIONS: { name: string; matters: string; deployed: string[] }[] = [
  {
    name: "Physician Groups",
    matters: "Consistent coding across providers and a single view of collections by provider, payer, and location.",
    deployed: ["Provider-level E/M leveling audits with feedback", "Consolidated dashboards across locations", "Payer performance analysis for contract negotiations"],
  },
  {
    name: "Multi-Specialty Practices",
    matters: "Every specialty carries its own code sets, denial patterns, and payer rules — one queue can't serve them all.",
    deployed: ["Specialty-aligned coders and denial specialists", "Specialty-level KPIs rolled up to leadership", "Cross-specialty credentialing calendar"],
  },
  {
    name: "Hospitals",
    matters: "Facility and professional billing, discharged-not-final-billed backlog, and case-mix accuracy drive net revenue.",
    deployed: ["UB-04 / 837I and professional 837P coordination", "DNFB monitoring and coding turnaround targets", "Denial root-cause programs by service line"],
  },
  {
    name: "Ambulatory Surgery Centers",
    matters: "Implant reimbursement, multiple-procedure reductions, and out-of-network strategy decide margin per case.",
    deployed: ["Implant and supply carve-out billing", "Multiple-procedure reduction validation", "Case-level contract variance detection"],
  },
  {
    name: "Urgent Care",
    matters: "Walk-in volume, S9083/S9088 contract codes, and high self-pay exposure reward front-end accuracy.",
    deployed: ["Real-time eligibility at check-in", "Contract-aware charge entry per payer", "Front-desk collection playbooks"],
  },
  {
    name: "Behavioral Health",
    matters: "Session limits, authorization renewals, parity rules, and clinician credentialing shape every claim.",
    deployed: ["Session-count and auth-expiry alerts", "Masters-level clinician credentialing program", "Telehealth POS and modifier accuracy"],
  },
  {
    name: "Specialty Clinics",
    matters: "Procedure bundling, imaging guidance, and frequency limits require payer-specific rule libraries.",
    deployed: ["LCD/NCD and frequency rule checks before submission", "Authorization desk for procedures and imaging", "Global-period management"],
  },
  {
    name: "Laboratories",
    matters: "Panel bundling, diagnosis-driven medical necessity, and client-bill versus third-party routing.",
    deployed: ["Panel bundling and modifier 91 validation", "Necessity rule library by payer", "Client billing reconciliation"],
  },
  {
    name: "DME Suppliers",
    matters: "Documentation completeness, capped rental cycles, and audit exposure decide whether claims get paid and stay paid.",
    deployed: ["Standard written order and proof-of-delivery checklists", "Rental cycle billing automation", "TPE / RAC audit response support"],
  },
  {
    name: "Telehealth Organizations",
    matters: "Place of service, modifiers, audio-only rules, and state parity laws shift constantly by payer.",
    deployed: ["Payer telehealth policy library", "POS 02 / 10 and modifier 95 automation", "Licensure-to-state validation"],
  },
];

const BY_PROBLEM = [
  { title: "Denials", detail: "Prevent, prioritize, appeal, and learn — root-cause taxonomy with a prevention loop.", href: "/denial-management" },
  { title: "Aging A/R", detail: "Balances segmented by payer, value, and timely-filing risk — worked by strategy.", href: "/ar-recovery" },
  { title: "Credentialing delays", detail: "Enrollment, CAQH, and re-credentialing tracked to completion so providers bill sooner.", href: "/credentialing" },
  { title: "Coding accuracy", detail: "Specialty-accurate CPT, ICD-10-CM, and HCPCS with audit-ready documentation feedback.", href: "/medical-coding" },
  { title: "Visibility", detail: "Live dashboards across claims, payments, denials, A/R, and payer performance.", href: "/revenue-cycle-management" },
];

export default function SolutionsPage() {
  return (
    <Frame scheme="light" theme="theme-ultimate">
      <JsonLd data={breadcrumbLd([{ name: "Home", url: "https://mindlox.ai/" }, { name: "Solutions", url: "https://mindlox.ai/solutions" }])} />

      <PageHero
        crumbs={[{ label: "Solutions" }]}
        eyebrow="Solutions"
        title="Solutions for every kind of healthcare organization."
        highlight="every kind"
        description="The revenue cycle is the same fourteen stages everywhere. What changes is where the money leaks — so Mindlox AI is deployed differently for each organization type."
        primary={{ label: CTA.primary, hoverLabel: CTA.primaryHover }}
        secondary={{ label: CTA.secondary }}
      />

      <Section id="by-organization" tone="muted">
        <SectionHeading eyebrow="By organization type" title="Deployed around how you actually get paid." highlight="actually get paid." description="Ten organization types, ten deployment patterns. Each links to a specialist conversation, not a generic form." />
        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3" staggerChildren={0.05}>
          {ORG_SOLUTIONS.map((o) => (
            <RevealItem key={o.name}>
              <Card className="h-full" padding="md">
                <Link href={CTA.specialistHref} className="block after:absolute after:inset-0" aria-label={`${o.name} — talk to an RCM specialist`}>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold text-fg">{o.name}</h3>
                    <ArrowUpRight className="mt-1 size-4 shrink-0 text-fg-3 transition-all duration-500 ease-out-expo group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-accent" />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-fg-2">{o.matters}</p>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">How Mindlox AI is deployed</p>
                  <ul className="mt-2 space-y-1.5">
                    {o.deployed.map((d) => (
                      <li key={d} className="flex gap-2 text-sm text-fg">
                        <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent-2" aria-hidden />
                        {d}
                      </li>
                    ))}
                  </ul>
                </Link>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
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

      <LifecycleSection tone="muted" />

      <FinalCTA />
    </Frame>
  );
}

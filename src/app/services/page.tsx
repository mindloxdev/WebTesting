import type { Metadata } from "next";
import { Check } from "lucide-react";
import { SERVICES, SERVICE_CATEGORIES, type ServiceCategory } from "@/data/services";
import { CTA } from "@/data/site";
import { pad2 } from "@/lib/utils";
import { Frame } from "@/components/layout/Frame";
import { FinalCTA, LifecycleSection, PageHero, ProcessSection, ServiceCard } from "@/components/sections";
import { JsonLd, ORGANIZATION_LD, breadcrumbLd } from "@/components/seo/JsonLd";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Twenty-four medical billing and revenue cycle management services — billing, coding, denial management, A/R recovery, credentialing, eligibility, authorization, posting, patient billing, and more — from one accountable partner.",
  alternates: { canonical: "/services" },
};

const CATEGORY_INTRO: Record<ServiceCategory, string> = {
  core: "The claim itself — captured, coded, scrubbed, submitted, and followed through until it pays.",
  "front-end": "Everything that has to be right before the visit: coverage, authorization, enrollment, connectivity.",
  "back-end": "What happens after adjudication: posting, denials, appeals, aging balances, and patient balances.",
  specialized: "Billing realities that need their own playbook — DME, telehealth, revenue integrity, underpayments, audits.",
  practice: "Operational support that makes the practice run smoother and bill cleaner.",
};

const ORDER: ServiceCategory[] = ["core", "front-end", "back-end", "specialized", "practice"];

export default function ServicesPage() {
  return (
    <Frame scheme="light" theme="theme-ultimate">
      <JsonLd
        data={[
          ORGANIZATION_LD,
          breadcrumbLd([
            { name: "Home", url: "https://mindlox.ai" },
            { name: "Services", url: "https://mindlox.ai/services" },
          ]),
        ]}
      />

      <PageHero
        crumbs={[{ label: "Services" }]}
        eyebrow="Services"
        title="Every stage of the revenue cycle. One accountable partner."
        highlight="One accountable partner."
        description="Twenty-four services across the front end, mid cycle, and back end — engage end-to-end, or start with the stage that hurts most. Specialty-aligned specialists, intelligent automation, and dashboards you never have to ask for."
        primary={{ label: "Get My Free Revenue Audit" }}
        secondary={{ label: CTA.secondary }}
      />

      {/* Catalogue */}
      <Section id="catalogue" tone="muted" className="pt-0 lg:pt-0">
        <Reveal className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-10 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:px-0" y={10}>
          {ORDER.map((cat) => (
            <a
              key={cat}
              href={`#${cat}`}
              className="shrink-0 rounded-full border border-line bg-bg px-3.5 py-1.5 text-sm font-medium text-fg-2 transition-colors hover:border-line-strong hover:text-fg"
            >
              {SERVICE_CATEGORIES[cat]}
              <span className="ml-2 font-mono text-[10px] text-fg-3">{SERVICES.filter((s) => s.category === cat).length}</span>
            </a>
          ))}
        </Reveal>

        <div className="space-y-20">
          {ORDER.map((cat, ci) => {
            const list = SERVICES.filter((s) => s.category === cat);
            const nonRoot = list.filter((s) => !s.root);
            return (
              <div key={cat} id={cat} className="scroll-mt-28">
                <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-end">
                  <SectionHeading eyebrow={`${pad2(ci + 1)} · ${list.length} services`} title={SERVICE_CATEGORIES[cat]} size="md" description={CATEGORY_INTRO[cat]} />
                </div>
                <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerChildren={0.05}>
                  {list.map((s) => (
                    <RevealItem key={s.slug}>
                      <ServiceCard s={s} />
                    </RevealItem>
                  ))}
                </RevealGroup>

                {nonRoot.length > 0 && (
                  <RevealGroup className="mt-6 grid gap-3 lg:grid-cols-2" staggerChildren={0.05}>
                    {nonRoot.map((s) => (
                      <RevealItem key={s.slug}>
                        <article id={s.slug} className="scroll-mt-28 rounded-2xl border border-line bg-bg p-6">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h3 className="font-display text-xl font-semibold text-fg">{s.name}</h3>
                            <Tag>{SERVICE_CATEGORIES[s.category]}</Tag>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-fg-2">{s.description}</p>
                          <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                            {s.outcomes.map((o) => (
                              <li key={o} className="flex items-start gap-2 text-sm text-fg">
                                <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-positive/15 text-positive">
                                  <Check className="size-3" aria-hidden />
                                </span>
                                {o}
                              </li>
                            ))}
                          </ul>
                        </article>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      <LifecycleSection tone="default" />
      <ProcessSection tone="muted" />
      <FinalCTA form />
    </Frame>
  );
}

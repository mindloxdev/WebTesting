import type { Metadata } from "next";
import { Frame } from "@/components/layout/Frame";
import { PageHero, TrustStrip, FinalCTA } from "@/components/sections";
import { CAREER_ROLES, CareersApply, APPLY_HREF } from "@/components/sections/CareersApply";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { JsonLd, ORGANIZATION_LD, breadcrumbLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Mindlox AI: certified coders, billers, A/R and denial specialists, credentialing specialists, account managers, and engineers who believe revenue should be visible.",
  alternates: { canonical: "/careers" },
};

const WHY = [
  { title: "Fix the cycle, not just work it", detail: "Every denial you resolve feeds a prevention loop. The job is to make the same problem not happen next week." },
  { title: "Specialty depth", detail: "You are aligned to specialties, not a generic queue, so your expertise compounds instead of resetting every shift." },
  { title: "Tools that respect your time", detail: "Automation handles the repetitive work. Specialists handle the exceptions, with the information to decide quickly." },
  { title: "Named accountability", detail: "Practices know who you are. You see your results in the same dashboards they do." },
  { title: "Remote-friendly", detail: "Most billing, coding, and A/R roles can be done remotely within the United States, with a defined cadence for team time." },
  { title: "Room to grow", detail: "Coders become auditors, billers become A/R leads, specialists become account managers. We promote from the work." },
];

export default function CareersPage() {
  return (
    <Frame scheme="light" theme="theme-ultimate" ctaLabel="Apply by email" ctaHref={APPLY_HREF}>
      <JsonLd data={[ORGANIZATION_LD, breadcrumbLd([{ name: "Home", url: "https://mindlox.ai/" }, { name: "Careers", url: "https://mindlox.ai/careers" }])]} />

      <PageHero
        crumbs={[{ label: "Careers" }]}
        eyebrow="Careers"
        title="Work on the revenue cycle the way it should work."
        highlight="the way it should work."
        description="Coders, billers, A/R and denial specialists, credentialing specialists, account managers, and engineers who think revenue should be visible, preventable, and fair to the people who earned it."
        primary={{ label: "Apply by email", href: APPLY_HREF, hoverLabel: "Open Your Email App" }}
        secondary={{ label: "See the roles", href: "#roles" }}
      />

      <TrustStrip />

      <Section id="why" tone="muted">
        <SectionHeading eyebrow="Why Mindlox AI" title="Six reasons people stay." highlight="people stay." />
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerChildren={0.06}>
          {WHY.map((w, i) => (
            <RevealItem key={w.title}>
              <Card className="h-full" padding="md">
                <span className="font-mono text-[11px] text-accent">0{i + 1}</span>
                <h3 className="mt-5 font-display text-lg font-semibold text-fg">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-2">{w.detail}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section id="roles">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <SectionHeading
            eyebrow="Roles we hire for"
            size="md"
            title="Seven kinds of work. One accountable team."
            description="These are the roles that make up every Mindlox AI team. If your experience fits one of them, we want to hear from you even when nothing is posted."
          />
          <RevealGroup className="grid gap-3" staggerChildren={0.05}>
            {CAREER_ROLES.map((r) => (
              <RevealItem key={r.title} className="rounded-2xl border border-line bg-bg-2/60 p-5">
                <p className="font-display text-lg font-semibold text-fg">{r.title}</p>
                <p className="mt-1 text-sm text-fg-2">{r.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Section id="apply" tone="muted">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <SectionHeading
            eyebrow="Apply"
            size="md"
            title="Three steps, no applicant tracking maze."
            description="We keep hiring as human as the work. You will hear back from a person, not an auto-reply."
          />
          <Reveal delay={0.1}>
            <CareersApply />
          </Reveal>
        </div>
      </Section>

      <FinalCTA
        title="Not looking for a job? Let's talk about your revenue instead."
        highlight="your revenue instead."
        description="A free revenue audit shows a practice where it is leaving money on the table. Findings are yours to keep."
      />
    </Frame>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FileText, ShieldCheck, Scale, Accessibility, Cookie, Sparkles } from "lucide-react";
import { Frame } from "@/components/layout/Frame";
import { PageHero, FinalCTA } from "@/components/sections";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { CONTACT } from "@/data/site";
import { LEGAL_UPDATED } from "@/templates/company/LegalPage";

export const metadata: Metadata = {
  title: "Policies",
  description: "Mindlox AI policies: privacy policy, terms of service, HIPAA and security practices, accessibility statement, cookie notice, and responsible AI principles.",
  alternates: { canonical: "/policies" },
};

const DOCS = [
  { icon: FileText, title: "Privacy Policy", detail: "What information this website and our services collect, how it is used, and the choices you have.", href: "/privacy" },
  { icon: Scale, title: "Terms of Service", detail: "The terms that govern use of this website. Service engagements are governed by separate written agreements.", href: "/terms" },
  { icon: ShieldCheck, title: "HIPAA & Security", detail: "How we handle protected health information as a business associate, and how we protect data.", href: "/security" },
];

const STATEMENTS = [
  {
    icon: Accessibility,
    id: "accessibility",
    title: "Accessibility statement",
    paragraphs: [
      "Mindlox AI wants everyone to be able to use this website. We build with semantic HTML, keyboard-reachable controls, visible focus states, sufficient color contrast, and support for reduced-motion preferences. Animations pause or simplify when your device asks for reduced motion.",
      `If any part of this site is difficult to use with assistive technology, tell us at ${CONTACT.email} or ${CONTACT.phone}. Describe the page and the problem, and we will work to fix it and offer the information in another form in the meantime.`,
    ],
  },
  {
    icon: Cookie,
    id: "cookies",
    title: "Cookie notice",
    paragraphs: [
      "This website stores a small amount of data in your browser to remember your display preferences, such as the light or dark theme. That data stays on your device and is not used to identify you.",
      "If we add analytics or advertising tools in the future, this notice and the Privacy Policy will be updated first, and you will be able to decline non-essential cookies.",
    ],
  },
  {
    icon: Sparkles,
    id: "responsible-ai",
    title: "Responsible AI",
    paragraphs: [
      "Our technology uses pattern detection and decision support to score denial risk, detect underpayments and eligibility mismatches, prioritize work, and surface payer behavior. It assists our billing professionals; it does not replace them.",
      "Certified coders make coding decisions. No claim is submitted without human review of flagged items. We do not guarantee outcomes, collection rates, or zero denials, and we describe our technology as AI-assisted and human-reviewed rather than autonomous.",
    ],
  },
];

export default function PoliciesPage() {
  return (
    <Frame theme="theme-ultimate">
      <JsonLd data={breadcrumbLd([{ name: "Home", url: "https://mindlox.ai/" }, { name: "Policies", url: "https://mindlox.ai/policies" }])} />

      <PageHero
        crumbs={[{ label: "Policies" }]}
        eyebrow="Policies"
        title="How we handle your information, your trust, and your time."
        highlight="your trust,"
        description={`Every policy that applies to this website and to working with Mindlox AI, in one place. Last updated ${LEGAL_UPDATED}.`}
        size="lg"
      />

      <Section id="documents" tone="muted" tight>
        <SectionHeading eyebrow="Documents" size="md" title="The three you may need to read in full." />
        <RevealGroup className="mt-10 grid gap-4 md:grid-cols-3" staggerChildren={0.06}>
          {DOCS.map((d) => {
            const Icon = d.icon;
            return (
              <RevealItem key={d.href}>
                <Card className="h-full" padding="md">
                  <Link href={d.href} className="block after:absolute after:inset-0" aria-label={d.title}>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex size-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <ArrowUpRight className="size-4 text-fg-3 transition-all duration-500 ease-out-expo group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-accent" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-fg">{d.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-2">{d.detail}</p>
                  </Link>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <Section id="statements">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="Statements" size="md" title="Accessibility, cookies, and responsible AI." description="Short, plain-language commitments that apply across the site and our services." />
          <div className="space-y-4">
            {STATEMENTS.map((s) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.id} y={12}>
                  <div id={s.id} className="scroll-mt-28 rounded-2xl border border-line bg-bg-2/60 p-6 lg:p-7">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <h3 className="font-display text-xl font-semibold text-fg">{s.title}</h3>
                    </div>
                    {s.paragraphs.map((p) => (
                      <p key={p} className="mt-3 text-[15px] leading-relaxed text-fg-2">
                        {p}
                      </p>
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      <Section id="contact" tone="muted" tight>
        <Reveal>
          <div className="rounded-[22px] border border-line bg-bg p-8 lg:p-10">
            <p className="eyebrow mb-3">Questions about a policy</p>
            <p className="font-display text-xl font-semibold text-fg">Write to us and a person will answer.</p>
            <p className="mt-2 text-fg-2">
              Email <a href={CONTACT.emailHref} className="font-medium text-fg underline decoration-line underline-offset-4 hover:text-accent">{CONTACT.email}</a>, call{" "}
              <a href={CONTACT.phoneHref} className="font-medium text-fg underline decoration-line underline-offset-4 hover:text-accent">{CONTACT.phone}</a>, or mail Mindlox AI, {CONTACT.address}.
            </p>
          </div>
        </Reveal>
      </Section>

      <FinalCTA variant="mesh" />
    </Frame>
  );
}

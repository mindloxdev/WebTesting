import type { Metadata } from "next";
import { Check } from "lucide-react";
import { CareersApply } from "@/components/sections/CareersApply";
import { Frame } from "@/components/layout/Frame";
import { Eyebrow } from "@/components/ui/Section";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { LeadForm } from "@/components/visuals/LeadForm";
import { JsonLd, ORGANIZATION_LD, breadcrumbLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/sections";
import { CONTACT } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get a free revenue audit or talk to a Mindlox AI RCM specialist. No patient information requested. Findings are yours to keep.",
  alternates: { canonical: "/contact" },
};

type Intent = "specialist" | "careers" | undefined;

const COPY: Record<"audit" | "specialist" | "careers", { eyebrow: string; title: string; highlight: string; description: string; formTitle: string }> = {
  audit: {
    eyebrow: "Free revenue audit",
    title: "Let's find the revenue your practice is missing.",
    highlight: "missing.",
    description: "A structured review of denials, A/R aging, coding patterns, and underpayment exposure. You receive the findings whether or not we work together.",
    formTitle: "Get your free revenue audit",
  },
  specialist: {
    eyebrow: "Talk to an RCM specialist",
    title: "Talk to an RCM specialist.",
    highlight: "RCM specialist.",
    description: "A working conversation about your specialty, payer mix, systems, and where revenue hurts today — with a named specialist, not a sales queue.",
    formTitle: "Talk to an RCM specialist",
  },
  careers: {
    eyebrow: "Careers",
    title: "Join Mindlox AI.",
    highlight: "Mindlox AI.",
    description: "Coders, billers, A/R strategists, credentialing specialists, and engineers who believe revenue should be visible.",
    formTitle: "Careers",
  },
};

const STEPS = [
  { n: "01", title: "15-minute discovery", detail: "Your specialties, systems, payer mix, and what's hurting." },
  { n: "02", title: "Data access + audit", detail: "Read-only access; we review denials, A/R aging, coding, and underpayments." },
  { n: "03", title: "Findings review", detail: "A clear picture of where revenue is leaking and a plan to recover it." },
];

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ intent?: string }> }) {
  const { intent } = await searchParams;
  const key: "audit" | "specialist" | "careers" = intent === "specialist" ? "specialist" : intent === "careers" ? "careers" : "audit";
  const c = COPY[key];
  const i = intent as Intent;

  return (
    <Frame theme="theme-ultimate" noMobileCta>
      <JsonLd data={[ORGANIZATION_LD, breadcrumbLd([{ name: "Home", url: "https://mindlox.ai/" }, { name: "Contact", url: "https://mindlox.ai/contact" }])]} />

      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 mesh-bg opacity-70" aria-hidden />
        <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="max-w-xl">
            <Reveal y={8} className="mb-6">
              <Breadcrumbs items={[{ label: "Contact" }]} />
            </Reveal>
            <Reveal y={10} className="mb-5">
              <Eyebrow>{c.eyebrow}</Eyebrow>
            </Reveal>
            <TextReveal as="h1" text={c.title} highlight={c.highlight} immediate delay={0.1} className="text-display-lg font-bold text-fg" />
            <Reveal delay={0.5} className="mt-6">
              <p className="text-lg leading-relaxed text-fg-2">{c.description}</p>
            </Reveal>

            {i !== "careers" && (
              <Reveal delay={0.65} className="mt-10">
                <p className="eyebrow mb-4">What happens next</p>
                <ol className="space-y-4">
                  {STEPS.map((s) => (
                    <li key={s.n} className="flex gap-4">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-accent bg-bg font-mono text-[11px] text-accent">{s.n}</span>
                      <div>
                        <p className="font-medium text-fg">{s.title}</p>
                        <p className="text-sm text-fg-2">{s.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}

            <Reveal delay={0.8} className="mt-10">
              <ul className="space-y-2 text-sm text-fg-2">
                {(i === "careers"
                  ? ["Remote-friendly roles across billing, coding, A/R, credentialing, and engineering", "No patient information is requested in this form", "A person reads every application"]
                  : ["No patient information is requested", "Findings are yours, whether or not we work together", "A named RCM specialist, not a sales queue"]
                ).map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-0.5 inline-flex size-4.5 shrink-0 items-center justify-center rounded-full bg-positive/15 text-positive">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.9} className="mt-10">
              <dl className="grid gap-5 rounded-2xl border border-line bg-bg-2/60 p-5 sm:grid-cols-3">
                <div>
                  <dt className="text-sm font-medium text-fg">Phone</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-fg-2">
                    <a href={CONTACT.phoneHref} className="transition-colors hover:text-fg">
                      {CONTACT.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-fg">Email</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-fg-2">
                    <a href={CONTACT.emailHref} className="transition-colors hover:text-fg">
                      {CONTACT.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-fg">Address</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-fg-2">
                    {CONTACT.street}
                    <br />
                    {CONTACT.locality}, {CONTACT.region} {CONTACT.postalCode}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal id="audit" delay={0.3} y={30}>
            <div id="audit-form">
              {i === "careers" ? (
                <CareersApply />
              ) : (
                <LeadForm title={c.formTitle} initialNeed={key === "audit" ? "Full RCM" : undefined} />
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </Frame>
  );
}

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { SERVICES } from "@/data/services";
import { CTA } from "@/data/site";
import { SPECIALTIES, type Specialty } from "@/data/specialties";
import { cn } from "@/lib/utils";
import { Frame } from "@/components/layout/Frame";
import { FinalCTA, PageHero, ServiceCard, SpecialtyDepth } from "@/components/sections";
import { JsonLd, breadcrumbLd, faqLd, serviceLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Card } from "@/components/ui/Card";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

const SITE = "https://mindlox.ai";

/** Names that should not be lowercased in running copy. */
const KEEP_CASE = new Set(["OB/GYN", "ENT", "DME"]);
const inCopy = (name: string) => (KEEP_CASE.has(name) ? name : name.toLowerCase());

const SERVICE_SLUGS = ["medical-billing", "medical-coding", "denial-management", "ar-recovery", "credentialing", "eligibility-verification"];

const BLOCKS: { key: "challenges" | "codingNotes" | "denialTypes" | "workflow" | "solutions"; title: string; eyebrow: string }[] = [
  { key: "challenges", title: "Billing challenges", eyebrow: "01" },
  { key: "codingNotes", title: "Coding complexity", eyebrow: "02" },
  { key: "denialTypes", title: "Common denial types", eyebrow: "03" },
  { key: "workflow", title: "RCM workflow", eyebrow: "04" },
  { key: "solutions", title: "How Mindlox AI solves it", eyebrow: "05" },
];

function buildFaq(s: Specialty) {
  const name = inCopy(s.name);
  return [
    {
      q: `Which ${s.name} denials do you see most often?`,
      a: `The ${name} denials we work most often are ${joinList(s.denialTypes.map((d) => d.toLowerCase()))}. Each one is categorized by root cause, prioritized by recoverable value and timely-filing risk, and fed back into prevention at the front desk and in coding.`,
    },
    {
      q: `Do your coders understand ${s.name} coding?`,
      a: `Yes. ${s.name} coding means getting details like ${joinList(s.codingNotes.slice(0, 2).map(lowerFirst))} right. Certified coders aligned to ${name} review documentation for specificity, modifiers, and the payer-specific rules that drive ${name} reimbursement.`,
    },
    {
      q: `What does the ${s.name} billing workflow look like with Mindlox AI?`,
      a: `${s.workflow.join(" → ")}. Every stage is visible in your dashboard, and a named account manager reviews performance with you weekly.`,
    },
  ];
}

function joinList(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function lowerFirst(s: string) {
  // Preserve acronyms / code strings (e.g., "E/M", "CPT", "99214") — only lowercase a leading plain word.
  return /^[A-Z][a-z]+\s/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s;
}

function PlaybookCard({ s, accent, soft }: { s: Specialty; accent: string; soft: string }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-line bg-bg shadow-e3">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5" style={{ background: `linear-gradient(100deg, ${soft}, transparent 70%)` }}>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: accent }}>
          {s.name} playbook
        </span>
        <span className="size-2.5 rounded-full" style={{ background: accent }} aria-hidden />
      </div>
      <div className="grid gap-px bg-line sm:grid-cols-2">
        <div className="bg-bg p-5">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">Billing challenges</p>
          <ul className="space-y-2">
            {s.challenges.map((c) => (
              <li key={c} className="flex gap-2 text-sm leading-snug text-fg">
                <span className="mt-[7px] size-1.5 shrink-0 rounded-full" style={{ background: accent }} aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-bg p-5">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">Common denial types</p>
          <ul className="space-y-2">
            {s.denialTypes.map((d) => (
              <li key={d} className="flex gap-2 text-sm leading-snug text-fg">
                <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-negative" aria-hidden />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line px-5 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">
        Specialty-aligned coders · denial specialists · payer rules kept current
      </div>
    </div>
  );
}

export function SpecialtyPage({ specialty: s }: { specialty: Specialty }) {
  const accent = `oklch(0.62 0.17 ${s.hue})`;
  const soft = `oklch(0.62 0.17 ${s.hue} / 0.12)`;
  const url = `${SITE}/specialties/${s.slug}`;
  const name = inCopy(s.name);
  const faq = buildFaq(s);
  const services = SERVICE_SLUGS.map((slug) => SERVICES.find((x) => x.slug === slug)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const others = SPECIALTIES.filter((x) => x.slug !== s.slug).slice(0, 8);

  return (
    <Frame scheme="light" theme="theme-ultimate">
      <JsonLd
        data={[
          serviceLd(`${s.name} Medical Billing & Revenue Cycle Management`, `${s.tagline} Specialty-aligned medical billing, coding, denial management, and A/R recovery for ${name} practices.`, url),
          breadcrumbLd([
            { name: "Home", url: SITE },
            { name: "Specialties", url: `${SITE}/specialties` },
            { name: s.name, url },
          ]),
          faqLd(faq),
        ]}
      />

      <div style={{ ["--sp" as string]: accent, ["--sp-soft" as string]: soft }}>
        <PageHero
          crumbs={[{ label: "Specialties", href: "/specialties" }, { label: s.name }]}
          eyebrow="Specialty billing"
          title={`${s.name} medical billing, done by people who know ${name}.`}
          highlight={s.name}
          description={`${s.tagline} Mindlox AI pairs ${name}-aligned coders and denial specialists with intelligent automation, so the details that decide ${name} reimbursement are handled before they become denials.`}
          primary={{ label: "Get My Free Revenue Audit" }}
          secondary={{ label: CTA.secondary }}
          aside={<PlaybookCard s={s} accent={accent} soft={soft} />}
        />

        {/* Playbook */}
        <Section id="playbook" tone="muted">
          <SectionHeading
            eyebrow={`The ${s.name} playbook`}
            title={`What makes ${name} billing different — and how we handle it.`}
            highlight="how we handle it."
            description="Five things every billing partner should be able to tell you about your specialty before you sign anything."
          />
          <Reveal className="mt-12" delay={0.1}>
            <div className="overflow-hidden rounded-[22px] border border-line bg-bg shadow-e2">
              <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
                {BLOCKS.map((b) => (
                  <div
                    key={b.key}
                    className={cn("bg-bg p-5 lg:p-6", b.key === "solutions" && "sm:col-span-2 lg:col-span-1")}
                    style={b.key === "solutions" ? { background: soft } : undefined}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: accent }}>
                      {b.eyebrow}
                    </p>
                    <h3 className="mt-1 font-display text-base font-semibold text-fg">{b.title}</h3>
                    <ul className="mt-4 space-y-2.5">
                      {s[b.key].map((item) => (
                        <li key={item} className="flex gap-2 text-sm leading-snug text-fg">
                          {b.key === "solutions" ? (
                            <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-positive/15 text-positive">
                              <Check className="size-3" aria-hidden />
                            </span>
                          ) : (
                            <span className="mt-[7px] size-1.5 shrink-0 rounded-full" style={{ background: accent }} aria-hidden />
                          )}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Section>

        {/* What specialty-first means in practice */}
        <SpecialtyDepth />

        {/* Services for this specialty */}
        <Section id="services">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="Services" title={`Services for ${name} practices.`} highlight={`${name} practices.`} size="md" description={`Start with one stage or engage end to end — the same ${name}-aligned team either way.`} />
            <Reveal className="lg:mb-2">
              <MagneticButton href="/services" variant="outline" arrow magnetic={false}>
                All {SERVICES.length} services
              </MagneticButton>
            </Reveal>
          </div>
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerChildren={0.05}>
            {services.map((sv) => (
              <RevealItem key={sv.slug}>
                <ServiceCard s={sv} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>

        {/* FAQ */}
        <Section id="faq" tone="muted">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
            <SectionHeading eyebrow="FAQ" title={`${s.name} billing questions.`} size="md" description="Specific to your specialty. If it's not here, an RCM specialist will answer it directly." />
            <Reveal delay={0.1}>
              <Accordion items={faq} />
            </Reveal>
          </div>
        </Section>

        {/* Other specialties */}
        <Section id="others">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="More specialties" title="Multi-specialty? We cover that too." highlight="cover that too." size="md" description="30+ specialties, each with its own playbook, under one set of dashboards." />
            <Reveal className="lg:mb-2">
              <MagneticButton href="/specialties" variant="outline" arrow magnetic={false}>
                All 30+ specialties
              </MagneticButton>
            </Reveal>
          </div>
          <RevealGroup className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" staggerChildren={0.035}>
            {others.map((o) => (
              <RevealItem key={o.slug}>
                <Card padding="sm" className="h-full">
                  <Link href={`/specialties/${o.slug}`} className="block after:absolute after:inset-0">
                    <div className="flex items-center justify-between">
                      <span className="size-2.5 rounded-full" style={{ background: `oklch(0.62 0.17 ${o.hue})` }} aria-hidden />
                      <ArrowUpRight className="size-4 text-fg-3 transition-all duration-500 ease-out-expo group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-accent" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold text-fg">{o.name}</h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-fg-2">{o.tagline}</p>
                  </Link>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>

        <FinalCTA
          form
          title={`Let's find the revenue your ${s.name} practice is missing.`}
          highlight="is missing."
          description={`A structured review of your ${name} denials, A/R aging, coding patterns, and underpayments — findings are yours to keep, whether or not we work together.`}
        />
      </div>
    </Frame>
  );
}

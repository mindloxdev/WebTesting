import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { DETECTIONS, type Detection } from "@/data/dashboard";
import { LIFECYCLE } from "@/data/lifecycle";
import { SERVICES, SERVICE_CATEGORIES, type Service } from "@/data/services";
import { CTA, SPECIALTY_COUNT } from "@/data/site";
import { FEATURED_SPECIALTIES, SPECIALTIES } from "@/data/specialties";
import { cn, pad2 } from "@/lib/utils";
import { Frame } from "@/components/layout/Frame";
import { FinalCTA, PageHero, ServiceCard } from "@/components/sections";
import { JsonLd, breadcrumbLd, faqLd, serviceLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowLink, MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { AIDetectionFeed } from "@/components/visuals/AIDetectionFeed";
import { ClaimJourney } from "@/components/visuals/ClaimJourney";
import { Handoff } from "@/components/visuals/Handoff";
import { RevenueEngine } from "@/components/visuals/RevenueEngine";
import { StatusTimeline } from "@/components/visuals/StatusTimeline";
import { getServiceContent } from "./service-content";

const SITE = "https://mindlox.ai";

const FEED_FILTER: Record<string, Detection["type"][]> = {
  "denial-management": ["denial-risk", "appeal", "high-risk", "coding"],
  "ar-recovery": ["high-risk", "appeal", "underpayment"],
  "eligibility-verification": ["eligibility", "auth"],
  "payment-posting": ["underpayment"],
};

/** Fourteen-dot lifecycle strip with the stages this service covers highlighted. */
function StageStrip({ stages, accentAll }: { stages: number[]; accentAll?: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-1" aria-hidden>
        {LIFECYCLE.map((s) => {
          const on = accentAll || stages.includes(s.id);
          return (
            <span
              key={s.id}
              title={s.name}
              className={cn("h-1.5 flex-1 rounded-full transition-colors", on ? "bg-accent" : "bg-fg/10")}
            />
          );
        })}
      </div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">
        {stages.length === 14
          ? "All 14 stages of the revenue cycle"
          : stages.length === 0
            ? "Cross-cutting · supports every stage"
            : `Stage${stages.length > 1 ? "s" : ""} ${stages.map(pad2).join(" · ")} of 14`}
      </p>
    </div>
  );
}

function OutcomesCard({ service, stages }: { service: Service; stages: number[] }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-line bg-bg shadow-e3">
      <div className="flex items-center justify-between border-b border-line bg-bg-2/70 px-5 py-3.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">{SERVICE_CATEGORIES[service.category]}</span>
        <Tag tone="accent">End-to-end RCM</Tag>
      </div>
      <div className="p-6">
        <p className="font-display text-2xl font-semibold text-fg">{service.name}</p>
        <p className="mt-2 text-sm text-fg-2">{service.short}</p>
        <ul className="mt-5 space-y-2.5">
          {service.outcomes.map((o) => (
            <li key={o} className="flex items-start gap-2.5 text-sm text-fg">
              <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-positive/15 text-positive">
                <Check className="size-3" aria-hidden />
              </span>
              {o}
            </li>
          ))}
        </ul>
        <div className="mt-6 border-t border-line pt-5">
          <StageStrip stages={stages} />
        </div>
      </div>
    </div>
  );
}

export function ServicePage({ service }: { service: Service }) {
  const c = getServiceContent(service.slug);
  const url = `${SITE}/${service.slug}`;
  const related = SERVICES.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 3);
  const relatedFilled =
    related.length >= 3 ? related : [...related, ...SERVICES.filter((s) => s.category !== service.category && s.root && s.slug !== service.slug)].slice(0, 3);
  const included = [...service.outcomes, ...c.extras];
  const feedItems = FEED_FILTER[service.slug] ? DETECTIONS.filter((d) => FEED_FILTER[service.slug].includes(d.type)) : DETECTIONS;

  const aside =
    c.visual === "feed" ? (
      <AIDetectionFeed compact max={3} items={feedItems} title={`AI detection · ${service.name}`} />
    ) : (
      <OutcomesCard service={service} stages={c.stages} />
    );

  const lowerName = service.name;
  /** Signature sections alternate with the claim-journey block when both are present. */
  const sigTone = c.visual === "journey" ? "default" : "muted";

  return (
    <Frame theme="theme-ultimate">
      <JsonLd
        data={[
          serviceLd(service.name, service.description, url),
          breadcrumbLd([
            { name: "Home", url: SITE },
            { name: "Services", url: `${SITE}/services` },
            { name: service.name, url },
          ]),
          faqLd(c.faq),
        ]}
      />

      <PageHero
        crumbs={[{ label: "Services", href: "/services" }, { label: service.name }]}
        eyebrow={`Mindlox AI · ${SERVICE_CATEGORIES[service.category]}`}
        title={c.h1 || service.name}
        highlight={c.highlight}
        description={service.description}
        primary={{ label: "Get My Free Revenue Audit" }}
        secondary={{ label: CTA.secondary }}
        aside={aside}
      />

      {c.visual === "journey" && (
        <Section tone="muted" id="journey" ariaLabel="Follow a claim">
          <SectionHeading
            eyebrow="Transparency"
            title="Follow a claim from visit to posted payment."
            highlight="posted payment."
            description="Every stage expands to show exactly what Mindlox AI does there. This is how your claims are worked — and how you see them in your dashboard."
          />
          <Reveal className="mt-12" delay={0.1}>
            <ClaimJourney autoplay />
          </Reveal>
        </Section>
      )}

      {c.signature === "engine" && (
        <Section tone={sigTone} id="engine" ariaLabel="The revenue engine">
          <SectionHeading
            eyebrow="The revenue engine"
            title="Eight stages. One continuous flow of revenue."
            highlight="One continuous flow"
            description="From the patient visit to posted revenue, every stage feeds the next. Watch a clean claim move through the engine — and where Mindlox AI keeps it moving."
          />
          <Reveal className="mt-12" delay={0.1}>
            <RevenueEngine />
          </Reveal>
        </Section>
      )}

      {c.signature === "status-board" && (
        <Section tone={sigTone} id="status" ariaLabel="Claim status board">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-center">
            <SectionHeading
              eyebrow="Live status"
              title="Every claim has a status you can see."
              highlight="you can see."
              size="md"
              description="Submitted, adjudicated, paid, posted — with the day it happened and the person who touched it. You never have to call to ask where a claim is."
            >
              <MagneticButton href={CTA.auditHref} arrow hoverLabel="Start With a Revenue Audit">
                See My Claims Like This
              </MagneticButton>
            </SectionHeading>
            <Reveal delay={0.1}>
              <StatusTimeline />
            </Reveal>
          </div>
        </Section>
      )}

      {c.signature === "handoff" && (
        <Section tone={sigTone} id="handoff" ariaLabel="AI to specialist handoff">
          <SectionHeading
            eyebrow="How the work moves"
            title="AI flags the risk. A specialist owns the resolution."
            highlight="A specialist owns the resolution."
            description="Detections stream in from every queue. A named specialist picks each one up, decides, and closes it — nothing is auto-submitted."
          />
          <Reveal className="mt-12" delay={0.1}>
            <Handoff />
          </Reveal>
        </Section>
      )}

      <Section id="included">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="What's included" title={`${lowerName}, end to end.`} highlight="end to end." size="md" />
          <RevealGroup className="grid gap-3 sm:grid-cols-2" staggerChildren={0.05}>
            {included.map((item) => (
              <RevealItem key={item} className="flex items-start gap-3 rounded-2xl border border-line bg-bg-2/60 p-4">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg">
                  <Check className="size-3" strokeWidth={3} aria-hidden />
                </span>
                <span className="text-[15px] leading-snug text-fg">{item}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Section id="how" tone="muted">
        <SectionHeading
          eyebrow="How it works"
          title={`How Mindlox AI works ${lowerName.toLowerCase().startsWith("a/r") ? "A/R recovery" : lowerName.toLowerCase()}.`}
          description="Specialists own every step. Automation handles the repetitive work. Nothing waits in a queue nobody is watching."
        />
        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4" staggerChildren={0.08}>
          {c.steps.map((s, i) => (
            <RevealItem key={s.title} className="relative rounded-2xl border border-line bg-bg p-6">
              <span className="font-display text-4xl font-bold tracking-tight text-accent">{pad2(i + 1)}</span>
              <h3 className="mt-4 font-display text-lg font-semibold text-fg">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{s.detail}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section id="ai">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <SectionHeading
            eyebrow="Intelligence"
            title="AI finds. Specialists decide."
            highlight="Specialists decide."
            description="AI-assisted pattern detection and decision support that works alongside our billing professionals — never instead of them."
            size="md"
          >
            <ArrowLink href="/technology">How Mindlox AI uses AI</ArrowLink>
          </SectionHeading>
          <RevealGroup className="space-y-3" staggerChildren={0.07}>
            {c.ai.map((a) => (
              <RevealItem key={a} className="flex items-start gap-3 rounded-2xl border border-line bg-bg-2/60 p-5">
                <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Sparkles className="size-4" aria-hidden />
                </span>
                <p className="text-[15px] leading-relaxed text-fg">{a}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Section id="specialties" tone="muted" tight>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeading eyebrow="Specialties" title={`${lowerName} for your specialty.`} size="md" description="Specialty-aligned specialists who know your payer rules." />
          <RevealGroup className="flex flex-wrap gap-2 lg:max-w-xl lg:justify-end" staggerChildren={0.04}>
            {FEATURED_SPECIALTIES.concat(SPECIALTIES.filter((s) => !s.featured).slice(0, 8 - FEATURED_SPECIALTIES.length)).slice(0, 8).map((sp) => (
              <RevealItem key={sp.slug}>
                <Link
                  href={`/specialties/${sp.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-3.5 py-2 text-sm font-medium text-fg transition-colors hover:border-line-strong hover:bg-bg-2"
                >
                  <span className="size-2 rounded-full" style={{ background: `oklch(0.62 0.17 ${sp.hue})` }} aria-hidden />
                  {sp.name}
                </Link>
              </RevealItem>
            ))}
            <RevealItem>
              <Link href="/specialties" className="inline-flex items-center rounded-full border border-dashed border-line px-3.5 py-2 text-sm text-fg-3 hover:text-fg">
                All {SPECIALTY_COUNT} specialties
              </Link>
            </RevealItem>
          </RevealGroup>
        </div>
      </Section>

      <Section id="related">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Related services" title="Stronger together." size="md" description={`${lowerName} works best when the stages around it are handled by the same accountable team.`} />
          <Reveal className="lg:mb-2">
            <MagneticButton href="/services" variant="outline" arrow magnetic={false}>
              All {SERVICES.length} services
            </MagneticButton>
          </Reveal>
        </div>
        <RevealGroup className="mt-10 grid gap-4 md:grid-cols-3" staggerChildren={0.06}>
          {relatedFilled.map((s) => (
            <RevealItem key={s.slug}>
              <ServiceCard s={s} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section id="faq" tone="muted">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="FAQ" title={`${lowerName} questions, answered.`} size="md" description="If it's not here, an RCM specialist will answer it directly." />
          <Reveal delay={0.1}>
            <Accordion items={c.faq} />
          </Reveal>
        </div>
      </Section>

      <FinalCTA form title={c.ctaTitle} highlight={c.ctaHighlight} description="A structured review of denials, A/R aging, coding, and underpayments — findings are yours to keep, whether or not we work together." />
    </Frame>
  );
}

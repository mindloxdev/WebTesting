import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { CASE_STUDIES, RESOURCES, TESTIMONIALS } from "@/data/content";
import { Card } from "@/components/ui/Card";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

type Props = { className?: string; tone?: "default" | "muted"; id?: string };

/** Case studies — placeholder structure. Never invent results. */
export function CaseStudiesSection({ className, tone = "default", id = "case-studies" }: Props) {
  return (
    <Section id={id} tone={tone} className={className}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading eyebrow="Results" title="Before. The Mindlox approach. After." description="Published once verified and authorized. The structure is ready — the numbers are placeholders until they are real." />
        <DemoBadge label="Placeholder" className="lg:mb-2" />
      </div>
      <RevealGroup className="mt-12 grid gap-4 lg:grid-cols-3" staggerChildren={0.08}>
        {CASE_STUDIES.map((c, i) => (
          <RevealItem key={i}>
            <Card className="h-full" padding="md" spotlight={false}>
              <p className="font-display text-lg font-semibold text-fg">{c.specialty}</p>
              <p className="font-mono text-[11px] text-fg-3">{c.size}</p>
              {[
                { t: "Before", items: c.before, cls: "text-negative" },
                { t: "Mindlox approach", items: c.approach, cls: "text-accent" },
                { t: "Results", items: c.results, cls: "text-positive" },
              ].map((b) => (
                <div key={b.t} className="mt-5">
                  <p className={`mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] ${b.cls}`}>{b.t}</p>
                  <ul className="space-y-1 text-sm text-fg-2">
                    {b.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

/** Testimonials — clearly marked demo. Replace with verified client testimonials. */
export function TestimonialsSection({ className, tone = "muted", id = "testimonials" }: Props) {
  return (
    <Section id={id} tone={tone} className={className}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading eyebrow="What clients say" title="An extension of the practice — not another vendor." highlight="not another vendor." />
        <DemoBadge label="Demo Testimonial" className="lg:mb-2" />
      </div>
      <RevealGroup className="mt-12 grid gap-4 lg:grid-cols-3" staggerChildren={0.08}>
        {TESTIMONIALS.map((t, i) => (
          <RevealItem key={i}>
            <figure className="flex h-full flex-col rounded-2xl border border-line bg-bg p-6">
              <Quote className="size-5 text-accent" aria-hidden />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-fg">{t.quote}</blockquote>
              <figcaption className="mt-6 border-t border-line pt-4">
                <p className="text-sm font-medium text-fg">{t.name}</p>
                <p className="text-xs text-fg-3">{t.role}</p>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

/** Resources — premium cards. */
export function ResourcesSection({ className, tone = "default", id = "resources" }: Props) {
  return (
    <Section id={id} tone={tone} className={className}>
      <SectionHeading eyebrow="Resources" title="Guides, insights, and updates for revenue leaders." highlight="revenue leaders." description="Practical, specific, written by people who work claims every day." />
      <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerChildren={0.05}>
        {RESOURCES.map((r) => (
          <RevealItem key={r.title}>
            <Card className="h-full" padding="md">
              <Link href={r.href} className="block after:absolute after:inset-0">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">{r.category}</span>
                  <ArrowUpRight className="size-4 text-fg-3 transition-all duration-500 ease-out-expo group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-accent" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-fg">{r.title}</h3>
                <p className="mt-2 text-sm text-fg-2">{r.blurb}</p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">{r.readTime} read</p>
              </Link>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

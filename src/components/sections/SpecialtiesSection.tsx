import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FEATURED_SPECIALTIES, SPECIALTIES, type Specialty } from "@/data/specialties";
import { CTA } from "@/data/site";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SpecialtyMorph } from "@/components/visuals/SpecialtyMorph";

type Props = {
  className?: string;
  tone?: "default" | "muted";
  id?: string;
  /** "morph" = interactive selector; "grid" = all cards; "compact" = featured cards + link (home page). */
  variant?: "morph" | "grid" | "compact";
  limit?: number;
};

export function SpecialtyGrid({ limit, className, items }: { limit?: number; className?: string; items?: Specialty[] }) {
  const source = items ?? SPECIALTIES;
  const list = limit ? source.slice(0, limit) : source;
  return (
    <RevealGroup className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-4", className)} staggerChildren={0.035}>
      {list.map((s) => (
        <RevealItem key={s.slug}>
          <Card padding="sm" className="h-full">
            <Link href={`/specialties/${s.slug}`} className="block after:absolute after:inset-0">
              <div className="flex items-center justify-between">
                <span className="size-2.5 rounded-full" style={{ background: `oklch(0.62 0.17 ${s.hue})` }} aria-hidden />
                <ArrowUpRight className="size-4 text-fg-3 transition-all duration-500 ease-out-expo group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-accent" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-fg">{s.name}</h3>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-fg-2">{s.tagline}</p>
            </Link>
          </Card>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/** Specialty-first — the morphing selector or the full grid. */
export function SpecialtiesSection({ className, tone = "default", id = "specialties", variant = "morph", limit = 10 }: Props) {
  return (
    <Section id={id} tone={tone} className={className}>
      <SectionHeading
        eyebrow="Specialties"
        title="Billing built around your specialty — not a generic queue."
        highlight="your specialty"
        description="30+ specialties, each with its own coding reality, denial patterns, and payer rules. Pick yours and see the playbook."
      />
      <Reveal className="mt-12" delay={0.1}>
        {variant === "morph" ? (
          <SpecialtyMorph limit={limit} />
        ) : variant === "compact" ? (
          <SpecialtyGrid items={[...FEATURED_SPECIALTIES, ...SPECIALTIES.filter((s) => !s.featured)]} limit={limit ?? 8} />
        ) : (
          <SpecialtyGrid />
        )}
      </Reveal>
      <Reveal className="mt-10 flex justify-center">
        <MagneticButton href="/specialties" arrow variant="outline" hoverLabel="See All 30+ Specialties">
          {CTA.specialty}
        </MagneticButton>
      </Reveal>
    </Section>
  );
}

import { PROBLEMS } from "@/data/content";
import { CTA } from "@/data/site";
import { cn, pad2 } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

type Props = { className?: string; tone?: "default" | "muted"; id?: string; ctaHref?: string };

/** "Healthcare Providers Don't Have a Billing Problem. They Have a Revenue Problem." */
export function ProblemSection({ className, tone = "default", id = "problem", ctaHref = CTA.auditHref }: Props) {
  return (
    <Section id={id} tone={tone} className={className}>
      <SectionHeading
        eyebrow="The problem"
        title="Healthcare providers don't have a billing problem. They have a revenue problem."
        highlight="revenue problem."
        description="Every one of these is quietly subtracting from what your practice actually earns — and most billing companies only report on them after the fact."
      />
      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerChildren={0.06}>
        {PROBLEMS.map((p, i) => (
          <RevealItem key={p.title}>
            <Card className="h-full" padding="md">
              <div className="flex items-start justify-between">
                <span className="font-mono text-[11px] text-fg-3">{pad2(i + 1)}</span>
                <span className="size-2 rounded-full bg-negative/70 transition-transform duration-500 group-hover/card:scale-150" aria-hidden />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-fg">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{p.detail}</p>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
      <Reveal className={cn("mt-10 flex justify-center")}>
        <MagneticButton href={ctaHref} arrow hoverLabel="Show Me the Leaks">
          {CTA.leaks}
        </MagneticButton>
      </Reveal>
    </Section>
  );
}

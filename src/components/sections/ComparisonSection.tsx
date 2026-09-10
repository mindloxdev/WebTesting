import { COMPARISON, WHY_SWITCH } from "@/data/content";
import { CTA } from "@/data/site";
import { ArrowLink, MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ComparisonTable } from "@/components/visuals/ComparisonTable";

type Props = {
  className?: string;
  tone?: "default" | "muted";
  id?: string;
  whySwitch?: boolean;
  /** Show only the first N rows (home page) with a link to the full comparison. */
  limit?: number;
  moreHref?: string;
};

/** "Why Mindlox AI / Why Practices Switch" — neutral, category-level comparison. */
export function ComparisonSection({ className, tone = "default", id = "why", whySwitch = true, limit, moreHref = "/why-mindlox-ai" }: Props) {
  const rows = limit ? COMPARISON.slice(0, limit) : COMPARISON;
  return (
    <Section id={id} tone={tone} className={className}>
      <SectionHeading
        eyebrow="Why Mindlox AI"
        title="Built for how modern practices actually get paid."
        highlight="actually get paid."
        description="Not software you have to learn. Not an agency you have to chase. An intelligent operating system for your revenue cycle with expert humans behind it."
      />
      <Reveal className="mt-12" delay={0.1}>
        <ComparisonTable rows={rows} />
      </Reveal>
      {limit && limit < COMPARISON.length && (
        <Reveal className="mt-5 flex justify-end">
          <ArrowLink href={moreHref}>See all {COMPARISON.length} dimensions</ArrowLink>
        </Reveal>
      )}

      {whySwitch && (
        <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading
              eyebrow="Why practices switch"
              size="md"
              title="Practices typically move to Mindlox AI when they experience…"
              description="Patterns, not names. If any of these sound familiar, the switch is easier than you think — your revenue never pauses."
            />
            <Reveal className="mt-6">
              <MagneticButton href="/switch" arrow variant="outline" hoverLabel="See the Transition Plan">
                How switching works
              </MagneticButton>
            </Reveal>
          </div>
          <RevealGroup className="grid gap-3 sm:grid-cols-2" staggerChildren={0.06}>
            {WHY_SWITCH.map((w) => (
              <RevealItem key={w.title} className="rounded-2xl border border-line bg-bg-2/60 p-5">
                <p className="font-display text-base font-semibold text-fg">{w.title}</p>
                <p className="mt-1 text-sm text-fg-2">{w.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      )}

      <Reveal className="mt-12 flex justify-center">
        <MagneticButton href={CTA.auditHref} arrow hoverLabel={CTA.primaryHover}>
          {CTA.primary}
        </MagneticButton>
      </Reveal>
    </Section>
  );
}

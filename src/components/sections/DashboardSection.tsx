import { CTA } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CommandCenter } from "@/components/visuals/CommandCenter";

type Props = {
  className?: string;
  tone?: "default" | "muted";
  id?: string;
  ctaHref?: string;
  /** Home-page mode: the smaller hero dashboard (four metrics, one chart) instead of the full tabbed one. */
  compact?: boolean;
};

/** Dashboard preview — Claims · Payments · Denials · A/R · Payers · Providers. Demo-labeled. */
export function DashboardSection({ className, tone = "default", id = "dashboard", ctaHref = "/technology#command-center", compact = false }: Props) {
  return (
    <Section id={id} tone={tone} className={className}>
      <SectionHeading
        eyebrow="Visibility"
        title="See where every dollar is. Without asking."
        highlight="every dollar"
        description="Claims, payments, denials, A/R, collections, payer and provider performance — living dashboards with recommendations attached, not a monthly PDF."
        align="center"
      />
      <Reveal className="mt-12" delay={0.1} y={40}>
        <CommandCenter variant={compact ? "hero" : "full"} />
      </Reveal>
      <Reveal className="mt-10 flex justify-center">
        <MagneticButton href={ctaHref} arrow hoverLabel={compact ? "See the Full Command Center" : "Open the Command Center"}>
          {compact ? "See the full command center" : CTA.command}
        </MagneticButton>
      </Reveal>
    </Section>
  );
}

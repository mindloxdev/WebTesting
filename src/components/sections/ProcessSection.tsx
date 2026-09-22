import { CTA } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProcessTimeline } from "@/components/visuals/ProcessTimeline";

type Props = { className?: string; tone?: "default" | "muted"; id?: string };

/** Five-step onboarding: Discovery → Audit → Transition → Implementation → Optimization. */
export function ProcessSection({ className, tone = "muted", id = "process" }: Props) {
  return (
    <Section id={id} tone={tone} className={className}>
      <SectionHeading
        eyebrow="How it works"
        title="From first call to continuous optimization."
        highlight="continuous optimization."
        description="A transition designed so your revenue never pauses — with a parallel-run option and dashboards on from day one."
      />
      <Reveal className="mx-auto mt-12 max-w-5xl" delay={0.1}>
        <ProcessTimeline />
      </Reveal>
      <Reveal className="mt-8 flex justify-center">
        <MagneticButton href={CTA.auditHref} arrow hoverLabel="Start With Discovery">
          Start With a Free Revenue Audit
        </MagneticButton>
      </Reveal>
    </Section>
  );
}

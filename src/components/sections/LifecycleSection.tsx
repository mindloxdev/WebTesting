import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Lifecycle } from "@/components/visuals/Lifecycle";

type Props = { className?: string; tone?: "default" | "muted"; id?: string };

/** "One Partner. Your Entire Revenue Cycle." — the 14 stages. */
export function LifecycleSection({ className, tone = "default", id = "solution" }: Props) {
  return (
    <Section id={id} tone={tone} className={className}>
      <SectionHeading
        eyebrow="The solution"
        title="One partner. Your entire revenue cycle."
        highlight="entire revenue cycle."
        description="Fourteen stages from patient registration to reporting — managed as one connected system, with AI assisting at every step and specialists making the calls."
      />
      <Reveal className="mt-12" delay={0.1}>
        <Lifecycle />
      </Reveal>
    </Section>
  );
}

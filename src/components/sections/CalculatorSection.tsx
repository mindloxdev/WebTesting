import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LeakageCalculator } from "@/components/visuals/LeakageCalculator";

type Props = { className?: string; tone?: "default" | "muted"; id?: string };

/** "How Much Revenue Are You Losing?" — instant self-serve value before any sales call. */
export function CalculatorSection({ className, tone = "muted", id = "calculator" }: Props) {
  return (
    <Section id={id} tone={tone} className={className}>
      <SectionHeading
        eyebrow="Revenue leakage calculator"
        title="How much revenue are you losing?"
        highlight="losing?"
        description="Move the sliders. The estimate updates in real time — an illustrative model with every assumption shown, not a guarantee."
        align="center"
      />
      <Reveal className="mt-12" delay={0.1}>
        <LeakageCalculator />
      </Reveal>
    </Section>
  );
}

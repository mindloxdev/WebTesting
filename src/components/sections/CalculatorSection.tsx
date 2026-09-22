import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LeakageCalculator } from "@/components/visuals/LeakageCalculator";

type Props = { className?: string; tone?: "default" | "muted"; id?: string };

/**
 * "How Much Revenue Are You Losing?" — instant self-serve value before any
 * sales call. This is the calculator's only home, so it renders the full
 * `detailed` build: cause breakdown and twelve-month projection included.
 */
export function CalculatorSection({ className, tone = "default", id = "calculator" }: Props) {
  return (
    <Section id={id} tone={tone} className={className}>
      <SectionHeading
        eyebrow="Revenue leakage calculator"
        title="How much revenue are you losing?"
        highlight="losing?"
        // The "illustrative estimate, see assumptions" caveat lives on the
        // calculator itself, next to the figures — it does not need repeating here.
        description="Test different scenarios in real time, and see exactly how every dollar is calculated."
      />
      <Reveal className="mt-12" delay={0.1}>
        <LeakageCalculator detailed />
      </Reveal>
    </Section>
  );
}

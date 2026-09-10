import { Counter } from "@/components/ui/AnimatedNumber";
import { Card } from "@/components/ui/Card";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { Chapter } from "./Chapter";

type Outcome = { title: string; detail: string; value: number; prefix?: string; suffix?: string; decimals?: number; label: string };

/** Illustrative values consistent with the demo dashboard — never presented as results. */
const OUTCOMES: Outcome[] = [
  { title: "Cleaner claims", detail: "Scrubbed against payer edits and specialty rules before they leave.", value: 96.8, suffix: "%", decimals: 1, label: "clean claim rate" },
  { title: "Faster payments", detail: "Daily submission, daily posting, payer-specific follow-up.", value: 31, label: "days in A/R" },
  { title: "Recovered revenue", detail: "Denials, underpayments, and aged balances worked as a program.", value: 186420, prefix: "$", label: "recovered year to date" },
  { title: "Transparent reporting", detail: "Every claim, every stage, visible without asking.", value: 14, label: "stages tracked live" },
  { title: "Less administrative work", detail: "Your team stops chasing claims and answering payer calls.", value: 20, suffix: "+", label: "staff hours returned weekly" },
  { title: "More time for patients", detail: "Clinicians document care, not appeals.", value: 12, suffix: "%", label: "more visit capacity" },
];

/** "Outcomes" chapter — six cards, six counting numbers, one demo label. */
export function Outcomes() {
  return (
    <Chapter id="outcomes">
      <div className="container-x w-full">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Outcomes"
            title="What growth looks like when billing stops being the bottleneck."
            highlight="stops being the bottleneck."
            description="Six outcomes practices actually feel — not features on a services list."
          />
          <DemoBadge label="Illustrative Data" className="lg:mb-2" />
        </div>
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerChildren={0.07}>
          {OUTCOMES.map((o, i) => (
            <RevealItem key={o.title}>
              <Card className="h-full" padding="md">
                <p className="font-display text-4xl font-bold tracking-tight text-fg lg:text-5xl">
                  <Counter value={o.value} prefix={o.prefix} suffix={o.suffix} decimals={o.decimals} delay={i * 0.08} />
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">{o.label}</p>
                <h3 className="mt-6 font-display text-xl font-semibold text-fg">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-2">{o.detail}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Chapter>
  );
}

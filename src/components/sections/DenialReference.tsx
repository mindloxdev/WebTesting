import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { DenialStages } from "@/components/visuals/DenialExplorer";

/**
 * The sections that sit around the interactive Denial Reason Explorer.
 *
 * The explorer moves to /denial-codes once the library's source file exists,
 * and /denial-reason-explorer redirects there. Both routes render these, so
 * the copy lives once: during the move there is never a moment where two URLs
 * serve two drifting copies of the same section.
 */

const READ = [
  { title: "Sorted by origin, not by owner", detail: "A denial is almost never created by the team that receives it. Filter by stage to see which codes are born at the front desk, in coding, in the claim itself, or in the contract." },
  { title: "What the code actually means", detail: "Each entry carries the payer's own language in plain terms, the root cause behind it, and whether the dollar is realistically recoverable once the denial lands." },
  { title: "What stops it coming back", detail: "Reworking a denial recovers one claim. Fixing the cause stops the next hundred — so every code lists the control that prevents it, not just the appeal that answers it." },
];

/** The four places a denial is created. */
export function DenialOrigins({ tone = "muted" }: { tone?: "default" | "muted" }) {
  return (
    <Section tone={tone}>
      <SectionHeading
        eyebrow="Four origins"
        title="Denials are created upstream of the people who work them."
        highlight="upstream"
        size="md"
        description="Which is why a denial rate never improves by hiring more people to appeal. Each stage owns a different set of codes and a different fix."
      />
      <Reveal className="mt-10" delay={0.05}>
        <DenialStages />
      </Reveal>
    </Section>
  );
}

/** How to read the explorer. */
export function DenialHowToRead({ tone = "default" }: { tone?: "default" | "muted" }) {
  return (
    <Section tone={tone}>
      <SectionHeading eyebrow="How to read it" title="Three things the explorer tells you." size="md" description="What each part means and how to use it." />
      <RevealGroup className="mt-10 grid gap-4 md:grid-cols-3" staggerChildren={0.07}>
        {READ.map((r, i) => (
          <RevealItem key={r.title} className="rounded-2xl border border-line bg-bg-2/50 p-6">
            <span className="font-mono text-[11px] text-fg-3">0{i + 1}</span>
            <h3 className="mt-3 font-display text-lg font-semibold text-fg">{r.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-2">{r.detail}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

/** The estimate itself lives on the home page — send people to it rather than duplicating it. */
export function DenialCalculatorCTA({ tone = "muted" }: { tone?: "default" | "muted" }) {
  return (
    <Section tone={tone} tight>
      <Reveal>
        <div className="overflow-hidden rounded-[22px] border border-line bg-bg p-8 shadow-e3 lg:p-10">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="eyebrow">Put a number on it</p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-fg lg:text-3xl">
                Knowing the codes is half of it. The other half is what they cost.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-fg-2">
                The revenue leakage calculator estimates what denials, aging A/R, and underpayments take out of your
                practice each month — with a cause breakdown and a twelve-month projection.
              </p>
            </div>
            <MagneticButton href="/revenue-leakage-calculator" size="lg" arrow hoverLabel="Run the Numbers">
              Open the calculator
            </MagneticButton>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

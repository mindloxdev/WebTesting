import { Building, ClipboardList, ShieldCheck } from "lucide-react";
import { CTA } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TextReveal } from "@/components/ui/TextReveal";
import { cn } from "@/lib/utils";

const PILLARS = [
  {
    icon: ShieldCheck,
    n: "01",
    title: "Security & Compliance",
    items: [
      "HIPAA-conscious workflows and workforce training",
      "Business Associate Agreements where applicable",
      "Role-based access controls; minimum-necessary by design",
      "Audit logging on every claim touch",
      "Security documentation available on request",
    ],
  },
  {
    icon: Building,
    n: "02",
    title: "Scale",
    items: [
      "Multi-location, multi-specialty, multi-entity structures",
      "High claim volume — automation handles the repetitive work",
      "Onboard new providers and sites without losing visibility",
      "Dedicated team sized to your volume",
      "Parallel-run transitions so revenue never pauses",
    ],
  },
  {
    icon: ClipboardList,
    n: "03",
    title: "Governance",
    items: [
      "Weekly operational reviews with your revenue team",
      "Monthly strategy sessions with leadership",
      "Executive reporting: net collection rate, A/R days, denial trends",
      "Defined escalation paths and response windows",
      "Quarterly payer-performance and contract reviews",
    ],
  },
];

/** Enterprise readiness — security, scale, governance as a hairline grid. */
export function Readiness({ className }: { className?: string }) {
  return (
    <Section id="readiness" tone="muted" className={className}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading eyebrow="Enterprise readiness" title="Built to pass procurement, not just the demo." highlight="pass procurement," description="Security, scale, and governance — documented, reviewable, and designed for organizations with more than one location and more than one decision-maker." />
        <Reveal className="lg:mb-2">
          <MagneticButton href={CTA.specialistHref} arrow variant="secondary" hoverLabel="Request the Readiness Packet">
            Request Security Documentation
          </MagneticButton>
        </Reveal>
      </div>

      <RevealGroup className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3" staggerChildren={0.08}>
        {PILLARS.map((p) => (
          <RevealItem key={p.title} className="bg-bg p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <span className="inline-flex size-10 items-center justify-center border border-line text-fg">
                <p.icon className="size-5" strokeWidth={1.7} />
              </span>
              <span className="font-mono text-[11px] text-fg-3">{p.n}</span>
            </div>
            <h3 className="mt-6 font-display text-xl font-semibold text-fg">{p.title}</h3>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {p.items.map((it) => (
                <li key={it} className={cn("py-2.5 text-sm leading-snug text-fg-2", it.includes("[") && "text-fg-3")}>
                  {it}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-14 border-t border-line pt-10">
        <TextReveal as="p" text="One accountable partner. One revenue system. One set of numbers everyone trusts." highlight="One set of numbers everyone trusts." highlightClassName="text-accent" className="max-w-4xl font-display text-display-sm font-semibold text-fg" />
      </div>
    </Section>
  );
}

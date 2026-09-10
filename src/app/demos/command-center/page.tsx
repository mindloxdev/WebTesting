import type { Metadata } from "next";
import { ConceptFrame } from "@/components/layout/Frame";
import { getConcept } from "@/data/concepts";
import { CTA } from "@/data/site";
import {
  HeroCopy,
  DEFAULT_TRUST,
  TrustStrip,
  AISection,
  LifecycleSection,
  ServicesSection,
  ComparisonSection,
  ProcessSection,
  FAQSection,
  FinalCTA,
} from "@/components/sections";
import { Reveal } from "@/components/ui/Reveal";
import { CommandCenter } from "@/components/visuals/CommandCenter";
import { MetricStrip } from "@/concepts/command-center/MetricStrip";
import { KpiDeepDive } from "@/concepts/command-center/KpiDeepDive";
import { AssistantShowcase } from "@/concepts/command-center/AssistantShowcase";
import { KbdHints } from "@/concepts/command-center/KbdHints";

const concept = getConcept("command-center")!;

export const metadata: Metadata = {
  title: `Concept 08 — ${concept.name}`,
  description: concept.support,
};

/** CONCEPT 08 — THE RCM COMMAND CENTER · Linear + Ramp/Mercury dashboards. */
export default function Page() {
  return (
    <ConceptFrame concept={concept}>
      <section className="relative overflow-hidden pt-32 pb-10 lg:pt-44 lg:pb-16">
        <div className="pointer-events-none absolute inset-0 grid-bg fade-mask-b opacity-50" aria-hidden />
        <div
          className="pointer-events-none absolute left-1/2 top-[34%] h-[70vh] w-[90vw] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--glow), transparent 70%)" }}
          aria-hidden
        />
        <div className="container-x relative">
          <HeroCopy
            align="center"
            size="2xl"
            eyebrow="The RCM command center"
            headline={concept.headline}
            highlight="One Intelligent Command Center."
            support={concept.support}
            primary={{ label: concept.cta, hoverLabel: concept.ctaHover, href: "#command-center" }}
            secondary={{ label: CTA.primary, href: CTA.auditHref }}
            trust={DEFAULT_TRUST}
          />
          <div id="command-center" className="mt-16 scroll-mt-28">
            <CommandCenter variant="full" tilt />
          </div>
          <KbdHints />
        </div>
      </section>

      <MetricStrip />

      <TrustStrip variant="pillars" marquee={false} />

      <KpiDeepDive />

      <AssistantShowcase />

      <AISection tone="default" feed />

      <Reveal>
        <LifecycleSection tone="muted" />
      </Reveal>

      <ServicesSection initial={8} />
      <ComparisonSection tone="muted" />
      <ProcessSection tone="default" />
      <FAQSection tone="muted" limit={8} />
      <FinalCTA
        variant="mesh"
        title="Run your revenue cycle from one screen."
        highlight="one screen."
        description="See every claim, every payer, and every dollar — with an assistant that tells you what to do next. Start with a free revenue audit."
        primary="Experience the Command Center"
        primaryHover="Open the Command Center"
      />
    </ConceptFrame>
  );
}

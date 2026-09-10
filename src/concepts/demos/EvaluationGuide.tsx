import { ShieldCheck } from "lucide-react";
import { pad2 } from "@/lib/utils";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { DemoBadge } from "@/components/ui/DemoBadge";

const TESTS = [
  { name: "The Big-Tech Test", qs: ["Would this hold up on a page beside Stripe, Linear, or Apple?", "Would a design showcase feature it?"] },
  { name: "The Competitor Test", qs: ["Next to the largest RCM and EHR players, does Mindlox AI look like the more modern, trustworthy, transparent choice?", "Does it match every feature category they market — and present it better?"] },
  { name: "The Buyer Test", qs: ["Does a physician understand the value in 5 seconds?", "Does an administrator trust the company? Does a CFO see control and visibility?", "Does the visitor want a revenue audit?"] },
  { name: "The Craft Test", qs: ["Did you stop scrolling at least three times?", "Does every number count, every chart draw, every button respond?", "Does it feel like 2026 — premium, fast, trustworthy, different?"] },
  { name: "The Integrity Test", qs: ["Zero fabricated statistics, awards, clients, testimonials, integrations, or certifications?", "All demo data labeled? All competitor language neutral and category-level?"] },
];

/** The five quality gates from the brief — how the Mindlox AI team should judge each concept. */
export function EvaluationGuide() {
  return (
    <Section id="guide" tone="muted">
      <SectionHeading eyebrow="How to evaluate these" title="Five tests. Every concept has to pass all of them." highlight="all of them." description="Scroll each concept at normal reading speed and ask these questions. If any answer is no, the fix is more craft — never more clutter." />
      <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5" staggerChildren={0.07}>
        {TESTS.map((t, i) => (
          <RevealItem key={t.name} className="rounded-2xl border border-line bg-bg p-5">
            <span className="font-mono text-[11px] text-accent">{pad2(i + 1)}</span>
            <h3 className="mt-3 font-display text-lg font-semibold text-fg">{t.name}</h3>
            <ul className="mt-3 space-y-2">
              {t.qs.map((q) => (
                <li key={q} className="flex gap-2 text-sm leading-snug text-fg-2">
                  <span className="mt-[7px] size-1 shrink-0 rounded-full bg-accent-2" aria-hidden />
                  {q}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>
      <Reveal className="mt-8 flex flex-col gap-3 rounded-2xl border border-line bg-bg p-5 sm:flex-row sm:items-center">
        <ShieldCheck className="size-5 shrink-0 text-positive" aria-hidden />
        <p className="flex-1 text-sm text-fg-2">
          Every number, chart, testimonial, and case study across all ten concepts is illustrative and labeled. Real metrics, clients, certifications, and integrations are placeholders until Mindlox AI provides verified data.
        </p>
        <div className="flex flex-wrap gap-2">
          <DemoBadge />
          <DemoBadge label="Placeholder" />
        </div>
      </Reveal>
    </Section>
  );
}

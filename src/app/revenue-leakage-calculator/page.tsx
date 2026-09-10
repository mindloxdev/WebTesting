import type { Metadata } from "next";
import { Frame } from "@/components/layout/Frame";
import { PageHero, FinalCTA, LifecycleSection } from "@/components/sections";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { LeakageCalculator } from "@/components/visuals/LeakageCalculator";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Revenue Leakage Calculator",
  description:
    "Estimate how much revenue your practice may be losing to denials, aging A/R, and underpayments — an illustrative model with every assumption shown.",
  alternates: { canonical: "/revenue-leakage-calculator" },
};

const READ = [
  { title: "Estimated revenue leakage", detail: "Revenue you earned but are not collecting each month — denials never reworked, balances that age past timely filing, and payments below contract." },
  { title: "Potential recovery", detail: "The share of that leakage a structured RCM program typically targets. It is an illustrative planning figure, not a guarantee." },
  { title: "Potential annual impact", detail: "Potential recovery across twelve months — the number to bring to your next leadership conversation." },
];

/** Self-serve value before any sales call. Lives under Resources; linked from the home page. */
export default function CalculatorPage() {
  return (
    <Frame scheme="light" theme="theme-ultimate">
      <JsonLd data={breadcrumbLd([{ name: "Home", url: "https://mindlox.ai/" }, { name: "Resources", url: "https://mindlox.ai/resources" }, { name: "Revenue Leakage Calculator", url: "https://mindlox.ai/revenue-leakage-calculator" }])} />
      <PageHero
        crumbs={[{ label: "Resources", href: "/resources" }, { label: "Revenue Leakage Calculator" }]}
        eyebrow="Free tool"
        title="How much revenue is your practice losing?"
        highlight="losing?"
        description="Move the sliders. The estimate updates in real time — an illustrative model with every assumption shown, so you can see exactly how it is calculated."
        size="lg"
      />
      <Section tight className="pt-0">
        <Reveal y={30}>
          <LeakageCalculator />
        </Reveal>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="How to read it" title="Three numbers, one conversation." size="md" description="What each output means and how to use it." />
        <RevealGroup className="mt-10 grid gap-4 md:grid-cols-3" staggerChildren={0.07}>
          {READ.map((r, i) => (
            <RevealItem key={r.title} className="rounded-2xl border border-line bg-bg p-6">
              <span className="font-mono text-[11px] text-fg-3">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-fg">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{r.detail}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <LifecycleSection />
      <FinalCTA form title="Turn the estimate into a plan." highlight="a plan." description="A free revenue audit replaces the assumptions with your actual denials, A/R aging, and payer behavior." />
    </Frame>
  );
}

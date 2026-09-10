import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Frame } from "@/components/layout/Frame";
import { HeroCopy } from "@/components/sections";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/ui/TextReveal";
import { CONCEPTS } from "@/data/concepts";
import { ConceptCard } from "@/concepts/demos/ConceptCard";
import { EvaluationGuide } from "@/concepts/demos/EvaluationGuide";

export const metadata: Metadata = {
  title: "Concept Demos",
  description: "Ten substantially different homepage concepts for Mindlox AI — each its own visual identity, hero, storytelling, motion, and conversion strategy.",
  robots: { index: false, follow: true },
};

const REGULAR = CONCEPTS.filter((c) => !c.recommended);
const FEATURED = CONCEPTS.find((c) => c.recommended)!;

/** /demos — the concept selector. The first thing the Mindlox AI team sees. */
export default function DemosPage() {
  return (
    <Frame scheme="dark" theme="theme-ultimate" ctaLabel="Open the recommended concept" ctaHref="/demos/ultimate">
      <section className="relative overflow-hidden pt-36 pb-10 lg:pt-44 lg:pb-16" aria-label="Concept selector">
        <div className="pointer-events-none absolute inset-0 mesh-bg" aria-hidden />
        <div className="pointer-events-none absolute inset-0 dot-bg fade-mask-b opacity-40" aria-hidden />
        <div className="container-x relative">
          <HeroCopy
            eyebrow="Concept selector · 10 homepage concepts"
            headline="Ten ways Mindlox AI can out-design the category."
            highlight="out-design the category."
            support="Ten substantially different homepage concepts — each its own visual identity, hero, storytelling, motion, and conversion strategy. Open any one; use the floating switcher to move between them."
            primary={{ label: "Open the recommended concept", hoverLabel: "Open Concept 10", href: "/demos/ultimate" }}
            secondary={{ label: "Read the brief", href: "#guide", hoverLabel: "See the Five Tests" }}
            size="xl"
          />
          <Reveal delay={0.9} className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
            <span>Next.js · TypeScript · Tailwind · Framer Motion</span>
            <span>All demo data labeled</span>
            <span>Reduced motion honored</span>
          </Reveal>
        </div>
      </section>

      <Section tight aria-label="Concepts">
        <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" staggerChildren={0.05}>
          {REGULAR.map((c) => (
            <RevealItem key={c.slug} className="h-full">
              <ConceptCard concept={c} />
            </RevealItem>
          ))}
          <RevealItem className="h-full lg:col-span-2">
            <ConceptCard concept={FEATURED} featured />
          </RevealItem>
          <RevealItem className="h-full">
            <Link href="#guide" className="group flex h-full min-h-[260px] flex-col justify-between rounded-[22px] border border-dashed border-line-strong p-6 transition-colors hover:border-accent hover:bg-accent-soft">
              <BookOpen className="size-6 text-accent" aria-hidden />
              <div>
                <p className="font-display text-xl font-semibold text-fg">How to evaluate these</p>
                <p className="mt-2 text-sm text-fg-2">The five quality gates every concept must pass — Big-Tech, Competitor, Buyer, Craft, Integrity.</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  Read the guide <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </Link>
          </RevealItem>
        </RevealGroup>
      </Section>

      <EvaluationGuide />

      <section className="relative overflow-hidden section-y" aria-label="Open the recommended concept">
        <div className="pointer-events-none absolute inset-0 mesh-bg" aria-hidden />
        <div className="container-x relative text-center">
          <TextReveal as="h2" text="Start with the one we'd ship." highlight="we'd ship." className="text-display-lg font-bold text-fg" />
          <Reveal delay={0.15} className="mt-5">
            <p className="mx-auto max-w-2xl text-lg text-fg-2">Concept 10 combines the strongest elements of the other nine: the living ecosystem, the command center, the claim journey, the calculator, and the comparison flip — in one page.</p>
          </Reveal>
          <Reveal delay={0.25} className="mt-9 flex flex-wrap justify-center gap-3">
            <MagneticButton href="/demos/ultimate" size="lg" arrow hoverLabel="Open Concept 10">
              Open the recommended concept
            </MagneticButton>
            <MagneticButton href="/" size="lg" variant="outline">
              View it as the live home page
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </Frame>
  );
}

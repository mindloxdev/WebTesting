import { Sparkles } from "lucide-react";
import { getConcept } from "@/data/concepts";
import { CTA } from "@/data/site";
import { DEFAULT_TRUST, HeroCopy } from "@/components/sections";
import { Reveal } from "@/components/ui/Reveal";
import { Ecosystem } from "./Ecosystem";

const concept = getConcept("ultimate")!;

type HeroCta = { label: string; hoverLabel?: string; href?: string };
export type UltimateHeroCopy = {
  eyebrow?: string;
  headline?: string;
  highlight?: string;
  support?: string;
  primary?: HeroCta;
  secondary?: HeroCta;
  trust?: readonly string[];
};

type Props = {
  /** Show the "Recommended · Concept 10" pill (concept demo only). */
  badge?: boolean;
  /** Copy overrides — the live home passes these from src/content/home.ts. */
  hero?: UltimateHeroCopy;
};

/** Flagship hero: one enormous statement beside the living revenue ecosystem. */
export function UltimateHero({ badge = true, hero }: Props = {}) {
  const copy = {
    eyebrow: hero?.eyebrow ?? "Medical billing + revenue cycle intelligence",
    headline: hero?.headline ?? concept.headline,
    highlight: hero?.highlight ?? "Smarter Revenue Cycle.",
    support: hero?.support ?? concept.support,
    primary: hero?.primary ?? { label: concept.cta, hoverLabel: concept.ctaHover, href: CTA.auditHref },
    secondary: hero?.secondary ?? { label: concept.secondaryCta ?? "Explore Mindlox AI", href: "#solution", hoverLabel: "See the Whole System" },
    trust: hero?.trust ?? DEFAULT_TRUST,
  };
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-32 pb-14 lg:pt-36 lg:pb-20" aria-label="Hero">
      <div className="pointer-events-none absolute inset-0 mesh-bg" aria-hidden />
      <div className="pointer-events-none absolute inset-0 grid-bg fade-mask-b opacity-30" aria-hidden />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" aria-hidden />

      <div className="container-x relative grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-10">
        <div>
          {badge && (
            <Reveal y={8} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                <Sparkles className="size-3" aria-hidden />
                Recommended for Mindlox AI · Concept 10
              </span>
            </Reveal>
          )}
          <HeroCopy
            eyebrow={copy.eyebrow}
            headline={copy.headline}
            highlight={copy.highlight}
            support={copy.support}
            primary={copy.primary}
            secondary={copy.secondary}
            trust={[...copy.trust]}
            size="xl"
          />
        </div>
        <div className="relative lg:pl-4">
          <Ecosystem />
        </div>
      </div>
    </section>
  );
}

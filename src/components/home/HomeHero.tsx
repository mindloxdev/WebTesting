import { CTA } from "@/data/site";
import { cn } from "@/lib/utils";
import { DEFAULT_TRUST, HeroCopy } from "@/components/sections";
import { Ecosystem } from "./Ecosystem";

type HeroCta = { label: string; hoverLabel?: string; href?: string };
export type HomeHeroCopy = {
  eyebrow?: string;
  headline?: string;
  highlight?: string;
  support?: string;
  primary?: HeroCta;
  secondary?: HeroCta;
  trust?: readonly string[];
};

type Props = {
  /** Copy overrides — the home page passes these from src/content/home.ts. */
  hero?: HomeHeroCopy;
  /** Shorter hero: no 92vh minimum and tighter padding (used with layout.compact). */
  compact?: boolean;
};

/** Home hero: one statement beside the living revenue ecosystem. */
export function HomeHero({ hero, compact = false }: Props = {}) {
  const copy = {
    eyebrow: hero?.eyebrow ?? "Medical billing + revenue cycle intelligence",
    headline: hero?.headline ?? "Healthcare Deserves a Smarter Revenue Cycle.",
    highlight: hero?.highlight ?? "Smarter Revenue Cycle.",
    support:
      hero?.support ??
      "Mindlox AI combines medical billing expertise, intelligent automation, and revenue-cycle intelligence to help healthcare organizations get paid faster, reduce denials, recover lost revenue, and spend less time fighting the billing process.",
    primary: hero?.primary ?? { label: CTA.primary, hoverLabel: CTA.primaryHover, href: CTA.auditHref },
    secondary: hero?.secondary ?? { label: "Explore Mindlox AI", href: "#solution", hoverLabel: "See the Whole System" },
    trust: hero?.trust ?? DEFAULT_TRUST,
  };
  return (
    <section
      className={cn(
        "relative flex items-center overflow-hidden",
        compact ? "pt-28 pb-12 lg:pt-32 lg:pb-16" : "min-h-[92vh] pt-32 pb-14 lg:pt-36 lg:pb-20",
      )}
      aria-label="Hero"
    >
      <div className="pointer-events-none absolute inset-0 mesh-bg" aria-hidden />
      <div className="pointer-events-none absolute inset-0 grid-bg fade-mask-b opacity-30" aria-hidden />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" aria-hidden />

      <div className="container-x relative grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-10">
        <div>
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

import type { ReactNode } from "react";
import { CTA } from "@/data/site";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Section";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

type Cta = { label: string; hoverLabel?: string; href?: string };

type Props = {
  eyebrow?: string;
  headline: string;
  highlight?: string;
  support?: string;
  primary?: Cta;
  secondary?: Cta;
  /** Small trust indicators under the CTAs. */
  trust?: string[];
  align?: "left" | "center";
  size?: "xl" | "2xl";
  className?: string;
  children?: ReactNode;
  supportClassName?: string;
};

/**
 * Hero copy block: eyebrow → masked headline reveal → two-line support →
 * primary + secondary CTA (the CTA settles last) → trust indicators.
 * The visual beside/behind it is page-specific.
 */
export function HeroCopy({
  eyebrow,
  headline,
  highlight,
  support,
  primary = { label: CTA.primary, hoverLabel: CTA.primaryHover, href: CTA.auditHref },
  secondary,
  trust,
  align = "left",
  size = "xl",
  className,
  children,
  supportClassName,
}: Props) {
  const center = align === "center";
  return (
    <div className={cn("relative", center && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal y={10} className={cn("mb-6", center && "flex justify-center")}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <TextReveal
        as="h1"
        text={headline}
        highlight={highlight}
        immediate
        delay={0.1}
        className={cn(size === "2xl" ? "text-display-2xl" : "text-display-xl", "font-bold text-fg")}
      />
      {support && (
        <Reveal delay={0.55} y={16} className={cn("mt-7 max-w-2xl", center && "mx-auto")}>
          <p className={cn("text-lg leading-relaxed text-fg-2 lg:text-xl", supportClassName)}>{support}</p>
        </Reveal>
      )}
      <Reveal delay={0.75} y={14} className={cn("mt-9 flex flex-wrap items-center gap-3", center && "justify-center")}>
        <MagneticButton href={primary.href ?? CTA.auditHref} size="lg" arrow hoverLabel={primary.hoverLabel}>
          {primary.label}
        </MagneticButton>
        {secondary && (
          <MagneticButton href={secondary.href ?? "/services"} size="lg" variant="outline" hoverLabel={secondary.hoverLabel}>
            {secondary.label}
          </MagneticButton>
        )}
      </Reveal>
      {trust && trust.length > 0 && (
        <Reveal delay={0.95} y={8} className={cn("mt-8", center && "flex justify-center")}>
          <ul className={cn("flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3", center && "justify-center")}>
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <span className="size-1 rounded-full bg-accent" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      )}
      {children}
    </div>
  );
}

export const DEFAULT_TRUST = ["HIPAA-conscious workflows", "U.S. healthcare focus", "End-to-end RCM"];

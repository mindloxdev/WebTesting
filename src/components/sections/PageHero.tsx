import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { CTA } from "@/data/site";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Section";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3", className)}>
      <Link href="/" className="hover:text-fg">
        Home
      </Link>
      {items.map((c, i) => (
        <span key={c.label} className="flex items-center gap-1.5">
          <ChevronRight className="size-3" aria-hidden />
          {c.href && i < items.length - 1 ? (
            <Link href={c.href} className="hover:text-fg">
              {c.label}
            </Link>
          ) : (
            <span className="text-fg-2" aria-current="page">
              {c.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

type Props = {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  crumbs?: Crumb[];
  primary?: { label: string; href?: string; hoverLabel?: string };
  secondary?: { label: string; href?: string };
  /** Visual beside the copy (desktop). */
  aside?: ReactNode;
  /** Decorative layer behind the copy (absolutely positioned by the caller). */
  background?: ReactNode;
  className?: string;
  size?: "lg" | "xl";
};

/**
 * Inner-page hero (services, specialties, compare, company pages).
 * Consistent rhythm: crumbs → eyebrow → masked title → description → CTAs.
 */
export function PageHero({ eyebrow, title, highlight, description, crumbs, primary, secondary, aside, background, className, size = "xl" }: Props) {
  return (
    <section className={cn("relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-24", className)}>
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-70" aria-hidden />
      {background}
      <div className={cn("container-x relative", !!aside && "grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center")}>
        <div className="max-w-3xl">
          {crumbs && (
            <Reveal y={8} className="mb-6">
              <Breadcrumbs items={crumbs} />
            </Reveal>
          )}
          {eyebrow && (
            <Reveal y={10} className="mb-5">
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
          )}
          <TextReveal as="h1" text={title} highlight={highlight} immediate delay={0.1} className={cn(size === "xl" ? "text-display-xl" : "text-display-lg", "font-bold text-fg")} />
          {description && (
            <Reveal delay={0.5} className="mt-6">
              <p className="max-w-2xl text-lg leading-relaxed text-fg-2 lg:text-xl">{description}</p>
            </Reveal>
          )}
          {(primary || secondary) && (
            <Reveal delay={0.7} className="mt-9 flex flex-wrap gap-3">
              {primary && (
                <MagneticButton href={primary.href ?? CTA.auditHref} size="lg" arrow hoverLabel={primary.hoverLabel ?? CTA.primaryHover}>
                  {primary.label}
                </MagneticButton>
              )}
              {secondary && (
                <MagneticButton href={secondary.href ?? CTA.specialistHref} size="lg" variant="outline">
                  {secondary.label}
                </MagneticButton>
              )}
            </Reveal>
          )}
        </div>
        {aside && (
          <Reveal delay={0.3} y={30} className="relative">
            {aside}
          </Reveal>
        )}
      </div>
    </section>
  );
}

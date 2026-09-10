import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Background treatment. */
  tone?: "default" | "muted" | "inverse" | "transparent";
  /** Remove the inner container (for full-bleed visuals). */
  bleed?: boolean;
  /** Reduce vertical padding. */
  tight?: boolean;
  ariaLabel?: string;
};

export function Section({ id, children, className, tone = "default", bleed, tight, ariaLabel }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "relative",
        tight ? "py-14 lg:py-20" : "section-y",
        tone === "muted" && "bg-bg-2",
        tone === "inverse" && "bg-fg text-bg",
        className,
      )}
    >
      {bleed ? children : <div className="container-x">{children}</div>}
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("eyebrow inline-flex items-center gap-2", className)}>
      <span className="inline-block h-px w-5 bg-current opacity-60" aria-hidden />
      {children}
    </span>
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  size?: "md" | "lg" | "xl";
  as?: "h1" | "h2" | "h3";
  className?: string;
  children?: ReactNode;
};

const SIZE = { md: "text-display-md", lg: "text-display-lg", xl: "text-display-xl" } as const;

/** Section heading: eyebrow → masked title reveal → description → optional actions. */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
  size = "lg",
  as = "h2",
  className,
  children,
}: HeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal y={12} className={cn("mb-5", align === "center" && "flex justify-center")}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <TextReveal as={as} text={title} highlight={highlight} className={cn(SIZE[size], "font-bold text-fg")} />
      {description && (
        <Reveal delay={0.15} className="mt-6">
          <p className={cn("text-lg leading-relaxed text-fg-2 lg:text-xl", align === "center" && "mx-auto max-w-2xl")}>
            {description}
          </p>
        </Reveal>
      )}
      {children && (
        <Reveal delay={0.25} className={cn("mt-8 flex flex-wrap gap-3", align === "center" && "justify-center")}>
          {children}
        </Reveal>
      )}
    </div>
  );
}

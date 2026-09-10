import { CTA } from "@/data/site";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { LeadForm } from "@/components/visuals/LeadForm";

type Props = {
  className?: string;
  id?: string;
  title?: string;
  highlight?: string;
  description?: string;
  primary?: string;
  primaryHover?: string;
  secondary?: string;
  /** Embed the four-step lead form beside the copy. */
  form?: boolean;
  /** "mesh" = ambient gradient on bg; "inverse" = fg-colored block. */
  variant?: "mesh" | "inverse" | "accent";
};

/** "Your Revenue Deserves a Smarter Strategy." — the closing beat. */
export function FinalCTA({
  className,
  id = "cta",
  title = "Your revenue deserves a smarter strategy.",
  highlight = "smarter strategy.",
  description = "Let's identify where your practice is losing revenue — and build a plan to recover it.",
  primary = "Get My Free Revenue Audit",
  primaryHover = CTA.primaryHover,
  secondary = CTA.secondary,
  form = false,
  variant = "mesh",
}: Props) {
  const inverse = variant === "inverse";
  const accent = variant === "accent";
  return (
    <section id={id} className={cn("relative overflow-hidden section-y", inverse && "bg-fg text-bg", accent && "bg-accent text-accent-fg", className)}>
      {variant === "mesh" && <div className="pointer-events-none absolute inset-0 mesh-bg" aria-hidden />}
      {accent && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_20%,rgba(255,255,255,0.18),transparent_60%)]" aria-hidden />
      )}
      <div className={cn("container-x relative", form ? "grid gap-12 lg:grid-cols-2 lg:items-center" : "text-center")}>
        <div className={cn(!form && "mx-auto max-w-3xl")}>
          <TextReveal
            as="h2"
            text={title}
            highlight={highlight}
            highlightClassName={inverse || accent ? "opacity-70" : "text-gradient"}
            className={cn("text-display-lg font-bold", inverse ? "text-bg" : accent ? "text-accent-fg" : "text-fg")}
          />
          <Reveal delay={0.15} className="mt-6">
            <p className={cn("text-lg lg:text-xl", inverse ? "text-bg/70" : accent ? "text-accent-fg/80" : "text-fg-2", !form && "mx-auto max-w-2xl")}>{description}</p>
          </Reveal>
          {!form && (
            <Reveal delay={0.25} className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton
                href={CTA.auditHref}
                size="lg"
                arrow
                hoverLabel={primaryHover}
                variant="primary"
                className={accent ? "[&_a]:bg-white [&_a]:text-accent [&_a]:shadow-none" : undefined}
              >
                {primary}
              </MagneticButton>
              <MagneticButton
                href={CTA.specialistHref}
                size="lg"
                variant="outline"
                className={
                  inverse
                    ? "[&_a]:border-bg/30 [&_a]:text-bg [&_a]:hover:border-bg/60 [&_a]:hover:bg-bg/10"
                    : accent
                      ? "[&_a]:border-white/40 [&_a]:text-white [&_a]:hover:border-white/70 [&_a]:hover:bg-white/10"
                      : undefined
                }
              >
                {secondary}
              </MagneticButton>
            </Reveal>
          )}
          {form && (
            <Reveal delay={0.25} className="mt-8">
              <ul className={cn("space-y-2 text-sm", inverse ? "text-bg/70" : "text-fg-2")}>
                <li>· Findings you keep, whether or not we work together</li>
                <li>· No patient information requested</li>
                <li>· A named RCM specialist, not a sales queue</li>
              </ul>
            </Reveal>
          )}
        </div>
        {form && (
          <Reveal delay={0.2} y={30}>
            <LeadForm />
          </Reveal>
        )}
      </div>
    </section>
  );
}

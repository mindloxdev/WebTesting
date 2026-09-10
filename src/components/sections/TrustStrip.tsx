import { PLACEHOLDER_METRICS, TRUST_PILLARS } from "@/data/site";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/Marquee";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

type Props = {
  className?: string;
  /** "pillars" = five trust statements; "metrics" = placeholder metrics; "both" = default. */
  variant?: "pillars" | "metrics" | "both";
  marquee?: boolean;
};

/**
 * Trust strip. Metrics are placeholders ([X]+) until verified Mindlox AI
 * data is provided — never fabricated.
 */
export function TrustStrip({ className, variant = "both", marquee = true }: Props) {
  return (
    <div className={cn("border-y border-line bg-bg-2/60", className)}>
      {(variant === "pillars" || variant === "both") &&
        (marquee ? (
          <Marquee speed={46} className="py-4">
            {TRUST_PILLARS.map((p) => (
              <span key={p.label} className="flex items-center gap-2.5 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em] text-fg-2">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                {p.label}
              </span>
            ))}
          </Marquee>
        ) : (
          <ul className="container-x flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4">
            {TRUST_PILLARS.map((p) => (
              <li key={p.label} className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-2">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                {p.label}
              </li>
            ))}
          </ul>
        ))}

      {(variant === "metrics" || variant === "both") && (
        <div className={cn("container-x", variant === "both" && "border-t border-line")}>
          <RevealGroup className="grid grid-cols-2 divide-line py-8 md:grid-cols-4 md:divide-x">
            {PLACEHOLDER_METRICS.map((m) => (
              <RevealItem key={m.label} className="px-4 text-center first:pl-0 last:pr-0">
                <p className="font-display text-3xl font-bold tracking-tight text-fg lg:text-4xl">{m.value}</p>
                <p className="mt-1 text-sm text-fg-2">{m.label}</p>
                <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-fg-3">placeholder</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      )}
    </div>
  );
}

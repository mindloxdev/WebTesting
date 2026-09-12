import { TRUST_PILLARS } from "@/data/site";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/Marquee";

type Props = {
  className?: string;
  /** Scrolling marquee (default) or a static wrapped row. */
  marquee?: boolean;
};

/** Trust strip: the five trust pillars in one line. */
export function TrustStrip({ className, marquee = true }: Props) {
  return (
    <div className={cn("border-y border-line bg-bg-2/60", className)}>
      {marquee ? (
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
      )}
    </div>
  );
}

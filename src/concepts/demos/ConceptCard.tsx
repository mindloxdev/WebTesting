import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Concept } from "@/data/concepts";
import { cn, pad2 } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { ConceptPreview } from "./ConceptPreview";

type Props = { concept: Concept; featured?: boolean; className?: string };

/** Selector card: live preview + name, headline, reference, signature interactions. */
export function ConceptCard({ concept: c, featured, className }: Props) {
  return (
    <Card padding="none" className={cn("h-full", featured && "lg:col-span-2", className)}>
      <Link href={`/demos/${c.slug}`} className={cn("block h-full after:absolute after:inset-0", featured && "lg:grid lg:grid-cols-2")} aria-label={`Open concept ${pad2(c.n)} — ${c.name}`}>
        <div className={cn("aspect-[16/10] border-b border-line", featured && "lg:aspect-auto lg:h-full lg:border-b-0 lg:border-r")}>
          <ConceptPreview concept={c} />
        </div>
        <div className={cn("p-5 lg:p-6", featured && "flex flex-col justify-center lg:p-8")}>
          <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">
            <span className="text-accent">Concept {pad2(c.n)}</span>
            <span className="truncate">{c.reference}</span>
          </div>
          {c.recommended && (
            <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-fg shadow-glow">
              <Sparkles className="size-3" aria-hidden /> Recommended for Mindlox AI
            </span>
          )}
          <h3 className={cn("mt-3 font-display font-semibold text-fg", featured ? "text-3xl" : "text-xl")}>{c.name}</h3>
          <p className={cn("mt-2 font-display text-fg-2", featured ? "text-lg" : "text-[15px]")}>“{c.headline}”</p>
          <p className="mt-3 text-sm leading-relaxed text-fg-2">{c.blurb}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Signature interactions">
            {c.signature.slice(0, 3).map((s) => (
              <li key={s} className="rounded-full border border-line bg-bg-2/60 px-2.5 py-0.5 text-[11px] text-fg-2">
                {s}
              </li>
            ))}
          </ul>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-[gap] duration-300 group-hover/card:gap-2.5">
            Open concept <ArrowRight className="size-4" aria-hidden />
          </span>
        </div>
      </Link>
    </Card>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useId, useState } from "react";
import { SPECIALTIES, type Specialty } from "@/data/specialties";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  initial?: string;
  /** Limit the selector to featured specialties + "more". */
  limit?: number;
  /** Larger layout used as a hero. */
  hero?: boolean;
};

const BLOCKS: { key: keyof Pick<Specialty, "challenges" | "codingNotes" | "denialTypes" | "workflow" | "solutions">; title: string }[] = [
  { key: "challenges", title: "Billing challenges" },
  { key: "codingNotes", title: "Coding complexity" },
  { key: "denialTypes", title: "Common denial types" },
  { key: "workflow", title: "RCM workflow" },
  { key: "solutions", title: "How Mindlox AI solves it" },
];

/**
 * Selecting a specialty morphs the challenges, coding notes, denial types,
 * workflow, and solutions in place — staggered, never a page reload.
 *
 * Every selectable specialty's playbook is in the server HTML, with the
 * inactive ones carrying the `hidden` attribute instead of being mounted on
 * click, so a crawler reads all of them without pressing a tab.
 */
export function SpecialtyMorph({ className, initial = "cardiology", limit, hero }: Props) {
  const [slug, setSlug] = useState(initial);
  const list = limit ? SPECIALTIES.slice(0, limit) : SPECIALTIES;
  // The initial specialty is always selectable, even when `limit` would have
  // cut it from the list — otherwise its panel would have no tab to reach it.
  const panels = list.some((x) => x.slug === initial) ? list : [...list, SPECIALTIES.find((x) => x.slug === initial) ?? SPECIALTIES[0]];
  const s = panels.find((x) => x.slug === slug) ?? panels[0];
  const accent = `oklch(0.62 0.17 ${s.hue})`;
  const soft = `oklch(0.62 0.17 ${s.hue} / 0.12)`;
  const uid = useId();

  return (
    <div className={cn("relative", className)} style={{ ["--sp" as string]: accent, ["--sp-soft" as string]: soft }}>
      {/* selector */}
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:px-0" role="tablist" aria-label="Specialties">
        {panels.map((sp) => {
          const on = sp.slug === slug;
          return (
            <button
              key={sp.slug}
              role="tab"
              aria-selected={on}
              aria-controls={`${uid}-${sp.slug}`}
              onClick={() => setSlug(sp.slug)}
              className={cn(
                "relative shrink-0 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-300 ease-out-expo",
                on ? "border-transparent text-white shadow-e2" : "border-line bg-bg text-fg-2 hover:border-line-strong hover:text-fg",
              )}
              style={on ? { background: `oklch(0.58 0.17 ${sp.hue})` } : undefined}
            >
              {sp.name}
            </button>
          );
        })}
        {limit && SPECIALTIES.length > panels.length && (
          <Link href="/specialties" className="shrink-0 rounded-full border border-dashed border-line px-3.5 py-2 text-sm text-fg-3 hover:text-fg">
            +{SPECIALTIES.length - panels.length} more
          </Link>
        )}
      </div>

      {/* morphing panel */}
      <div className={cn("mt-6 overflow-hidden rounded-[22px] border border-line bg-bg shadow-e3", hero && "lg:mt-8")}>
        {panels.map((sp) => {
          const on = sp.slug === slug;
          const spAccent = `oklch(0.62 0.17 ${sp.hue})`;
          const spSoft = `oklch(0.62 0.17 ${sp.hue} / 0.12)`;
          return (
            <div key={sp.slug} id={`${uid}-${sp.slug}`} role="tabpanel" aria-label={sp.name} hidden={!on} inert={!on}>
              <div
                className={cn("flex flex-wrap items-end justify-between gap-4 border-b border-line p-6 lg:p-8", on && "animate-panel-in")}
                style={{ background: `linear-gradient(100deg, ${spSoft}, transparent 60%)` }}
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: spAccent }}>
                    Specialty playbook
                  </p>
                  <h3 className={cn("mt-2 font-display font-bold tracking-tight text-fg", hero ? "text-4xl lg:text-5xl" : "text-3xl")}>{sp.name}</h3>
                  <p className="mt-2 max-w-xl text-fg-2">{sp.tagline}</p>
                </div>
                <Link
                  href={`/specialties/${sp.slug}`}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-bg px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-line-strong"
                >
                  {sp.name} billing
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
                {BLOCKS.map((b, bi) => (
                  <div
                    key={b.key}
                    className={cn("bg-bg p-5", b.key === "solutions" && "sm:col-span-2 lg:col-span-1", on && "animate-panel-in")}
                    style={{
                      ...(b.key === "solutions" ? { background: spSoft } : null),
                      ...(on ? { animationDelay: `${50 + bi * 50}ms` } : null),
                    }}
                  >
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">{b.title}</p>
                    <ul className="space-y-2">
                      {sp[b.key].map((item) => (
                        <li key={item} className="flex gap-2 text-sm leading-snug text-fg">
                          <span className="mt-[7px] size-1.5 shrink-0 rounded-full" style={{ background: spAccent }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

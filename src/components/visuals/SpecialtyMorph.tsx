"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { SPECIALTIES, type Specialty } from "@/data/specialties";
import { EASE } from "@/lib/motion";
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
 */
export function SpecialtyMorph({ className, initial = "cardiology", limit, hero }: Props) {
  const [slug, setSlug] = useState(initial);
  const s = SPECIALTIES.find((x) => x.slug === slug) ?? SPECIALTIES[0];
  const list = limit ? SPECIALTIES.slice(0, limit) : SPECIALTIES;
  const accent = `oklch(0.62 0.17 ${s.hue})`;
  const soft = `oklch(0.62 0.17 ${s.hue} / 0.12)`;

  return (
    <div className={cn("relative", className)} style={{ ["--sp" as string]: accent, ["--sp-soft" as string]: soft }}>
      {/* selector */}
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:px-0" role="tablist" aria-label="Specialties">
        {list.map((sp) => {
          const on = sp.slug === slug;
          return (
            <button
              key={sp.slug}
              role="tab"
              aria-selected={on}
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
        {limit && (
          <Link href="/specialties" className="shrink-0 rounded-full border border-dashed border-line px-3.5 py-2 text-sm text-fg-3 hover:text-fg">
            +{SPECIALTIES.length - limit} more
          </Link>
        )}
      </div>

      {/* morphing panel */}
      <div className={cn("mt-6 overflow-hidden rounded-[22px] border border-line bg-bg shadow-e3", hero && "lg:mt-8")}>
        <AnimatePresence mode="wait">
          <motion.div
            key={s.slug}
            initial="hidden"
            animate="show"
            exit="exit"
            variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } }, exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } } }}
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }, exit: { opacity: 0, y: -6, transition: { duration: 0.2 } } }}
              className="flex flex-wrap items-end justify-between gap-4 border-b border-line p-6 lg:p-8"
              style={{ background: `linear-gradient(100deg, var(--sp-soft), transparent 60%)` }}
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: accent }}>
                  Specialty playbook
                </p>
                <h3 className={cn("mt-2 font-display font-bold tracking-tight text-fg", hero ? "text-4xl lg:text-5xl" : "text-3xl")}>{s.name}</h3>
                <p className="mt-2 max-w-xl text-fg-2">{s.tagline}</p>
              </div>
              <Link
                href={`/specialties/${s.slug}`}
                className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-bg px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-line-strong"
              >
                {s.name} billing
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
              {BLOCKS.map((b) => (
                <motion.div
                  key={b.key}
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }, exit: { opacity: 0, y: -6, transition: { duration: 0.2 } } }}
                  className={cn("bg-bg p-5", b.key === "solutions" && "sm:col-span-2 lg:col-span-1")}
                  style={b.key === "solutions" ? { background: `var(--sp-soft)` } : undefined}
                >
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">{b.title}</p>
                  <ul className="space-y-2">
                    {s[b.key].map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-snug text-fg">
                        <span className="mt-[7px] size-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

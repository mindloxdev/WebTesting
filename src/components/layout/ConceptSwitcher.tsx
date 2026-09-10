"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, LayoutGrid, X } from "lucide-react";
import { useState } from "react";
import type { Concept } from "@/data/concepts";
import { EASE } from "@/lib/motion";
import { cn, pad2 } from "@/lib/utils";

type Props = { current: Concept; concepts: Concept[] };

/**
 * Floating concept navigator for the Mindlox AI team — previous / next /
 * all ten. Desktop only; the mobile viewport keeps its bottom CTA bar.
 */
export function ConceptSwitcher({ current, concepts }: Props) {
  const [open, setOpen] = useState(false);
  const idx = concepts.findIndex((c) => c.slug === current.slug);
  const prev = concepts[(idx - 1 + concepts.length) % concepts.length];
  const next = concepts[(idx + 1) % concepts.length];

  return (
    <div className="fixed bottom-5 right-5 z-40 hidden lg:block">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mb-3 ml-auto w-[340px] overflow-hidden rounded-2xl glass-strong shadow-e4"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">10 homepage concepts</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-fg-3 hover:text-fg"
                aria-label="Close concept list"
              >
                <X className="size-4" />
              </button>
            </div>
            <ul className="max-h-[60vh] overflow-y-auto p-2">
              {concepts.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/demos/${c.slug}`}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-fg/5",
                      c.slug === current.slug && "bg-accent-soft text-accent",
                    )}
                  >
                    <span className="font-mono text-[11px] text-fg-3">{pad2(c.n)}</span>
                    <span className="flex-1 font-medium">{c.name}</span>
                    {c.recommended && (
                      <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-accent-fg">
                        Recommended
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-line p-2">
              <Link
                href="/demos"
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-fg-2 hover:bg-fg/5 hover:text-fg"
              >
                <LayoutGrid className="size-4" /> Open the /demos selector
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-1 rounded-full glass-strong p-1 shadow-e3">
        <Link
          href={`/demos/${prev.slug}`}
          className="inline-flex size-9 items-center justify-center rounded-full text-fg-2 transition-colors hover:bg-fg/5 hover:text-fg"
          aria-label={`Previous concept: ${prev.name}`}
        >
          <ChevronLeft className="size-4" />
        </Link>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-left transition-colors hover:bg-fg/5"
          aria-expanded={open}
        >
          <span className="font-mono text-[11px] text-accent">{pad2(current.n)}/10</span>
          <span className="max-w-[180px] truncate text-sm font-medium text-fg">{current.name}</span>
        </button>
        <Link
          href={`/demos/${next.slug}`}
          className="inline-flex size-9 items-center justify-center rounded-full text-fg-2 transition-colors hover:bg-fg/5 hover:text-fg"
          aria-label={`Next concept: ${next.name}`}
        >
          <ChevronRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}

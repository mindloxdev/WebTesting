"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Item = { q: string; a: string };

type Props = { items: Item[]; className?: string; defaultOpen?: number | null };

export function Accordion({ items, className, defaultOpen = 0 }: Props) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const id = useId();
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={it.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(on ? null : i)}
                aria-expanded={on}
                aria-controls={`${id}-${i}`}
                className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-accent"
              >
                <span className={cn("font-display text-lg font-semibold", on ? "text-accent" : "text-fg")}>{it.q}</span>
                <span className={cn("inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-line transition-transform duration-500 ease-out-expo", on && "rotate-45 border-accent text-accent")}>
                  <Plus className="size-4" aria-hidden />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  id={`${id}-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-6 text-[15px] leading-relaxed text-fg-2">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { COMPARISON } from "@/data/content";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = { className?: string; rows?: typeof COMPARISON };

/**
 * Comparison Flip — Traditional Billing Company vs. Mindlox AI. Rows
 * resolve one by one as they scroll into view. Category-level language only.
 */
export function ComparisonTable({ className, rows = COMPARISON }: Props) {
  return (
    <div className={cn("overflow-hidden rounded-[22px] border border-line bg-bg", className)}>
      <div className="grid grid-cols-[1fr_1.4fr_1.4fr] border-b border-line bg-bg-2/70 text-xs font-medium sm:text-sm">
        <div className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3 sm:px-6">Dimension</div>
        <div className="px-4 py-3 text-fg-2 sm:px-6">Traditional billing company</div>
        <div className="flex items-center gap-2 bg-accent-soft px-4 py-3 text-accent sm:px-6">
          <span className="size-1.5 rounded-full bg-accent" aria-hidden /> Mindlox AI
        </div>
      </div>
      <ul>
        {rows.map((r, i) => (
          <motion.li
            key={r.dimension}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="grid grid-cols-[1fr_1.4fr_1.4fr] border-b border-line last:border-b-0"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } } }}
              className="px-4 py-4 text-sm font-medium text-fg sm:px-6 sm:py-5"
            >
              {r.dimension}
            </motion.div>
            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5, ease: EASE } } }}
              className="flex items-start gap-2 px-4 py-4 text-xs text-fg-2 sm:px-6 sm:py-5 sm:text-sm"
            >
              <Minus className="mt-0.5 size-3.5 shrink-0 text-fg-3" aria-hidden />
              {r.traditional}
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 8, backgroundColor: "rgba(0,0,0,0)" },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE, delay: 0.1 } },
              }}
              className={cn("flex items-start gap-2 bg-accent-soft/60 px-4 py-4 text-xs text-fg sm:px-6 sm:py-5 sm:text-sm", i === rows.length - 1 && "rounded-br-[22px]")}
            >
              <motion.span
                variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { type: "spring", stiffness: 300, damping: 16, delay: 0.25 } } }}
                className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg"
              >
                <Check className="size-2.5" strokeWidth={3} aria-hidden />
              </motion.span>
              {r.mindlox}
            </motion.div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

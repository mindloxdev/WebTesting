"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { SWITCH_STEPS } from "@/data/compare";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = { className?: string };

/**
 * Six-step no-disruption transition. A progress line draws as the visitor
 * scrolls the steps; on desktop the phase labels sit beside a horizontal rail.
 */
export function SwitchTimeline({ className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const scaleY = useTransform(progress, [0, 1], [0, 1]);
  const scaleX = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Desktop rail */}
      <div className="relative hidden lg:block">
        <div className="absolute left-0 right-0 top-5 h-px bg-line" aria-hidden />
        <motion.div className="absolute left-0 top-5 h-px w-full origin-left bg-accent shadow-[0_0_12px_var(--glow)]" style={{ scaleX }} aria-hidden />
        <ol className="relative grid grid-cols-6 gap-4">
          {SWITCH_STEPS.map((s, i) => (
            <li key={s.n} className="pt-0">
              <motion.span
                initial={{ scale: 0.4, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: i * 0.05 }}
                className="flex size-10 items-center justify-center rounded-full border border-accent bg-bg font-mono text-xs text-accent shadow-glow"
              >
                {s.n}
              </motion.span>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
                className="mt-5"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">{s.when}</span>
                <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug text-fg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-2">{s.detail}</p>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile / tablet vertical */}
      <ol className="relative lg:hidden">
        <div className="absolute bottom-2 left-5 top-2 w-px bg-line" aria-hidden />
        <motion.div className="absolute bottom-2 left-5 top-2 w-px origin-top bg-accent" style={{ scaleY }} aria-hidden />
        {SWITCH_STEPS.map((s, i) => (
          <li key={s.n} className="relative py-5 pl-14">
            <motion.span
              initial={{ scale: 0.4, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="absolute left-5 top-6 flex size-10 -translate-x-1/2 items-center justify-center rounded-full border border-accent bg-bg font-mono text-xs text-accent shadow-glow"
            >
              {s.n}
            </motion.span>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.03 }}
              className="rounded-2xl border border-line bg-bg p-5 shadow-e1"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">{s.when}</span>
              <h3 className="mt-1.5 font-display text-lg font-semibold text-fg">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{s.detail}</p>
            </motion.div>
          </li>
        ))}
      </ol>
    </div>
  );
}

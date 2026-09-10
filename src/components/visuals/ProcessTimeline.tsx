"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { PROCESS } from "@/data/content";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = { className?: string };

/** Five-step onboarding. The progress line draws as the visitor scrolls the steps. */
export function ProcessTimeline({ className }: Props) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const scaleY = useTransform(progress, [0, 1], [0, 1]);

  return (
    <ol ref={ref} className={cn("relative", className)}>
      <div className="absolute left-5 top-2 bottom-2 w-px bg-line lg:left-1/2" aria-hidden />
      <motion.div
        className="absolute left-5 top-2 bottom-2 w-px origin-top bg-accent lg:left-1/2"
        style={{ scaleY }}
        aria-hidden
      />
      {PROCESS.map((p, i) => {
        const right = i % 2 === 1;
        return (
          <li key={p.n} className={cn("relative grid gap-4 py-6 pl-14 lg:grid-cols-2 lg:gap-16 lg:pl-0 lg:py-10", right ? "lg:[&>div]:col-start-2" : "")}>
            <motion.span
              initial={{ scale: 0.4, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="absolute left-5 top-8 z-10 flex size-10 -translate-x-1/2 items-center justify-center rounded-full border border-accent bg-bg font-mono text-xs text-accent shadow-glow lg:left-1/2 lg:top-12"
            >
              {p.n}
            </motion.span>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className={cn("rounded-2xl border border-line bg-bg p-6 shadow-e1", right ? "lg:ml-10" : "lg:mr-10")}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">{p.duration}</span>
              </div>
              <h3 className="mt-2 font-display text-xl font-semibold text-fg">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{p.detail}</p>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}

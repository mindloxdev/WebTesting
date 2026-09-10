"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Concept } from "@/data/concepts";
import { CTA } from "@/data/site";
import { HeroCopy } from "@/components/sections";

/** Centered, restrained, one idea — then a scroll cue into the Leak Reveal. */
export function LeakHero({ concept }: { concept: Concept }) {
  const reduce = useReducedMotion();
  return (
    <section className="relative flex min-h-[88vh] flex-col justify-center overflow-hidden pt-28 pb-10 lg:pt-32" aria-label="Hero">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklab,var(--accent)_10%,transparent),transparent_70%)]" aria-hidden />
      <div className="container-x relative">
        <HeroCopy
          eyebrow="Revenue leakage · found, fixed, recovered"
          headline={concept.headline}
          highlight="Stop Losing Revenue."
          support={concept.support}
          align="center"
          size="2xl"
          primary={{ label: concept.cta, hoverLabel: concept.ctaHover, href: CTA.auditHref }}
          secondary={{ label: CTA.secondary, href: CTA.specialistHref }}
          supportClassName="text-xl lg:text-2xl"
        />
      </div>
      <motion.div
        className="mt-16 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-hidden
      >
        Scroll to see where it goes
        <motion.span animate={reduce ? undefined : { y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="size-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}

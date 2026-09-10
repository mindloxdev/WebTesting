"use client";

import { motion, useReducedMotion } from "framer-motion";
import { INTEGRATIONS } from "@/data/content";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/ui/Logo";

type Props = { className?: string };

/**
 * EHR / PM ecosystem orbiting the Mindlox AI mark. Chips counter-rotate so
 * their labels stay upright. Wording elsewhere: "integration support".
 */
export function EcosystemOrbit({ className }: Props) {
  const reduce = useReducedMotion();
  const inner = INTEGRATIONS.slice(0, 5);
  const outer = INTEGRATIONS.slice(5);

  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[520px]", className)} aria-hidden>
      <div className="absolute inset-0 rounded-full border border-dashed border-line" />
      <div className="absolute inset-[18%] rounded-full border border-line" />
      <div className="absolute inset-[36%] rounded-full bg-accent-soft blur-2xl" />

      {/* center */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
        className="absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-3xl glass-strong shadow-e3"
      >
        <LogoMark size={36} />
        <span className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-fg-3">Mindlox AI</span>
      </motion.div>

      <Ring items={inner} radius={32} duration={46} reduce={!!reduce} />
      <Ring items={outer} radius={50} duration={72} reduce={!!reduce} reverse />
    </div>
  );
}

function Ring({ items, radius, duration, reverse, reduce }: { items: { name: string }[]; radius: number; duration: number; reverse?: boolean; reduce: boolean }) {
  return (
    <div
      className="absolute inset-0"
      style={reduce ? undefined : { animation: `spin ${duration}s linear infinite`, animationDirection: reverse ? "reverse" : "normal" }}
    >
      {items.map((it, i) => {
        const angle = (i / items.length) * 360;
        return (
          <div
            key={it.name}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `rotate(${angle}deg) translate(${radius}%) rotate(${-angle}deg)` }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: EASE }}
              className="-translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-line bg-bg px-3 py-1.5 text-xs font-medium text-fg shadow-e1"
              style={reduce ? undefined : { animation: `spin ${duration}s linear infinite`, animationDirection: reverse ? "normal" : "reverse" }}
            >
              {it.name}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

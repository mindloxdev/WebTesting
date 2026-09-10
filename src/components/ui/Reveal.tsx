"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, fadeUp, stagger } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds. */
  delay?: number;
  /** Pixels to travel. */
  y?: number;
  x?: number;
  duration?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  scale?: number;
  style?: React.CSSProperties;
  id?: string;
};

/**
 * Scroll-triggered reveal. Physics: custom expo ease, 400–800 ms band.
 * Honors reduced motion (opacity only).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  x = 0,
  duration = 0.7,
  once = true,
  amount = 0.25,
  scale,
  style,
  id,
}: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y: reduce ? 0 : y, x: reduce ? 0 : x, scale: reduce ? 1 : scale ?? 1 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, amount }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

type GroupProps = {
  children: ReactNode;
  className?: string;
  /** Seconds between children. 40–80 ms is the house range. */
  staggerChildren?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  style?: React.CSSProperties;
};

/** Stagger container. Pair with <RevealItem>. */
export function RevealGroup({
  children,
  className,
  staggerChildren = 0.06,
  delayChildren = 0.08,
  once = true,
  amount = 0.2,
  style,
}: GroupProps) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={stagger(staggerChildren, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div className={className} style={style} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

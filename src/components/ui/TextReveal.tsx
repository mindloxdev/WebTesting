"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

const TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
} as const;

type Props = {
  /** Use "\n" for hard line breaks. */
  text: string;
  as?: Tag;
  className?: string;
  /** Phrase inside `text` to render with the gradient treatment. */
  highlight?: string;
  highlightClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
  /** Animate immediately on mount instead of on scroll (hero use). */
  immediate?: boolean;
  id?: string;
};

/**
 * Splits `text` into lines of words, recording where each word starts in the
 * original string so the highlight range can be matched against it.
 */
function toLines(text: string) {
  let cursor = 0;
  return text.split("\n").map((line) =>
    line.split(" ").map((word) => {
      const start = cursor;
      cursor += word.length + 1; // the trailing space, or the newline on the last word
      return { word, start };
    }),
  );
}

/**
 * Masked word-by-word reveal. Each word rises from beneath a clip mask —
 * the "expensive" text reveal used in the heroes.
 */
export function TextReveal({
  text,
  as = "h2",
  className,
  highlight,
  highlightClassName = "text-gradient",
  delay = 0,
  stagger = 0.045,
  duration = 0.8,
  once = true,
  immediate = false,
  id,
}: Props) {
  const reduce = useReducedMotion();
  const Comp = TAGS[as];

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { y: reduce ? 0 : "110%", opacity: reduce ? 0 : 1 },
    show: { y: 0, opacity: 1, transition: { duration, ease: EASE } },
  };

  const hStart = highlight ? text.indexOf(highlight) : -1;
  const hEnd = hStart >= 0 && highlight ? hStart + highlight.length : -1;

  const lines = toLines(text);

  return (
    <Comp
      id={id}
      className={cn("[&_.w]:inline-block", className)}
      aria-label={text.replace(/\n/g, " ")}
      variants={container}
      initial="hidden"
      {...(immediate ? { animate: "show" } : { whileInView: "show", viewport: { once, amount: 0.5 } })}
    >
      {lines.map((words, li) => {
        const nodes = words.map(({ word: w, start }, wi) => {
          const hl = hStart >= 0 && start >= hStart && start < hEnd;
          return (
            <span key={`${li}-${wi}`} aria-hidden>
              <span className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] pr-[0.06em] -mr-[0.06em]">
                <motion.span className={cn("w will-change-transform", hl && highlightClassName)} variants={word}>
                  {w}
                </motion.span>
              </span>
              {wi < words.length - 1 ? " " : null}
            </span>
          );
        });
        return (
          <span key={li} className="block">
            {nodes}
          </span>
        );
      })}
    </Comp>
  );
}

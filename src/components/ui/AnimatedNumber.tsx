"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/motion";
import { cn, currency, number } from "@/lib/utils";

type Props = {
  value: number;
  /** Format the interpolated value. Defaults to a plain integer. */
  format?: (n: number) => string;
  duration?: number;
  delay?: number;
  /** Start from this value on first mount. */
  from?: number;
  /** Wait until scrolled into view. */
  startOnView?: boolean;
  /**
   * Render the real value on the server and on first paint, then animate only
   * when `value` later changes. Use for figures that must be correct before any
   * interaction — calculator outputs, for example — so they never read $0.
   */
  immediate?: boolean;
  className?: string;
};

/**
 * Numbers never appear instantly — they count, roll, or slide.
 * Re-animates from the previous value whenever `value` changes, which is
 * what the calculator uses for "rolling" outputs.
 */
export function AnimatedNumber({
  value,
  format = (n) => number(n),
  duration = 1.4,
  delay = 0,
  from = 0,
  startOnView = true,
  immediate = false,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(immediate ? value : from);
  const prev = useRef(immediate ? value : from);
  const started = useRef(false);

  useEffect(() => {
    // Immediate mode: the correct figure is already painted, so the first pass
    // only records it. Later changes animate from there.
    if (immediate && !started.current) {
      started.current = true;
      prev.current = value;
      return;
    }
    if (startOnView && !inView) return;
    // Reduced motion renders `value` straight from the props below, so the
    // effect only has to keep the baseline in sync.
    if (reduce) {
      prev.current = value;
      return;
    }
    const first = !started.current;
    started.current = true;
    const controls = animate(prev.current, value, {
      duration: first ? duration : Math.min(duration, 0.9),
      delay: first ? delay : 0,
      ease: EASE,
      onUpdate: (v) => setDisplay(v),
    });
    prev.current = value;
    return () => controls.stop();
  }, [value, inView, startOnView, reduce, duration, delay, immediate]);

  return (
    <span ref={ref} className={cn("tabular", className)}>
      {format(reduce ? value : display)}
    </span>
  );
}

type CounterProps = Omit<Props, "format"> & {
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

/** Convenience: `<Counter value={97.4} suffix="%" decimals={1} />` */
export function Counter({ prefix = "", suffix = "", decimals = 0, ...rest }: CounterProps) {
  return <AnimatedNumber {...rest} format={(n) => `${prefix}${number(n, decimals)}${suffix}`} />;
}

/** Convenience: currency with no decimals. */
export function CurrencyCounter(props: Omit<Props, "format">) {
  return <AnimatedNumber {...props} format={(n) => currency(n)} />;
}

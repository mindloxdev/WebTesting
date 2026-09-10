import type { Transition, Variants } from "framer-motion";

/** Signature easing — used for every reveal. Never linear. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.76, 0, 0.24, 1];

/** Physics for interactive elements (hover, magnetic, morph). */
export const SPRING: Transition = { type: "spring", stiffness: 260, damping: 26, mass: 0.8 };
export const SPRING_SNAPPY: Transition = { type: "spring", stiffness: 420, damping: 30, mass: 0.6 };
export const SPRING_SOFT: Transition = { type: "spring", stiffness: 120, damping: 20, mass: 1 };

/** Reveal durations live in the 400–800 ms band. */
export const DUR = { fast: 0.4, base: 0.6, slow: 0.8 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.base, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: DUR.slow, ease: EASE } },
};

export const maskUp: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: DUR.slow, ease: EASE } },
};

export const stagger = (staggerChildren = 0.06, delayChildren = 0.08): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Standard viewport config for `whileInView`. */
export const viewportOnce = { once: true, margin: "-12% 0px -12% 0px" } as const;
export const viewportReplay = { once: false, margin: "-20% 0px -20% 0px" } as const;

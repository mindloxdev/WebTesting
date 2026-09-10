"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Global providers. `reducedMotion="user"` makes every Framer Motion
 * transform animation respect the OS-level "reduce motion" preference
 * automatically — opacity still transitions so the page stays premium.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

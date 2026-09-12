import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Light-scheme tokens, inlined. The global stylesheet declares light values on
 * `:root` and dark values on `[data-scheme="dark"]`, so a light block nested
 * inside a dark frame must re-declare them explicitly.
 */
export const LIGHT_VARS = {
  "--bg": "#ffffff",
  "--bg-2": "#f6f8fc",
  "--bg-3": "#eef1f8",
  "--fg": "#06091a",
  "--fg-2": "#4a5470",
  "--fg-3": "#8a93ab",
  "--line": "rgb(6 9 26 / 0.09)",
  "--line-strong": "rgb(6 9 26 / 0.16)",
  "--accent": "#2b6bff",
  "--accent-2": "#14b8dc",
  "--accent-3": "#7c5cff",
  "--accent-fg": "#ffffff",
  "--accent-soft": "rgb(43 107 255 / 0.1)",
  "--glow": "rgb(43 107 255 / 0.35)",
  "--surface": "rgb(255 255 255 / 0.72)",
  "--surface-strong": "rgb(255 255 255 / 0.92)",
  "--positive": "#10b981",
  "--negative": "#f0466a",
  "--warning": "#f59e0b",
  colorScheme: "light",
} as CSSProperties;

/**
 * Light body inside a dark frame. Tokens come from the global
 * `[data-scheme="light"]` rule (not inline) so the site-wide theme toggle
 * can still force white or dark across the whole page.
 */
export function LightBlock({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div data-scheme="light" className={cn("bg-bg text-fg", className)}>
      {children}
    </div>
  );
}

export function DarkBlock({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div data-scheme="dark" className={cn("theme-ultimate bg-bg text-fg", className)}>
      {children}
    </div>
  );
}

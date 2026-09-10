"use client";

import { Moon, Sun, SunMoon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type ThemePref = "auto" | "light" | "dark";
export const THEME_KEY = "mlx-theme";

const ORDER: ThemePref[] = ["auto", "light", "dark"];
const LABEL: Record<ThemePref, string> = {
  auto: "Concept default",
  light: "White theme",
  dark: "Dark theme",
};

export function applyTheme(pref: ThemePref) {
  const root = document.documentElement;
  if (pref === "auto") delete root.dataset.theme;
  else root.dataset.theme = pref;
}

/**
 * Site-wide theme switch: concept default → white → dark. Persists in
 * localStorage; an inline script in the root layout applies it before paint.
 */
export function ThemeToggle({ className, showLabel }: { className?: string; showLabel?: boolean }) {
  const [pref, setPref] = useState<ThemePref>("auto");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(THEME_KEY) as ThemePref | null;
      if (stored && ORDER.includes(stored)) setPref(stored);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const cycle = () => {
    const next = ORDER[(ORDER.indexOf(pref) + 1) % ORDER.length];
    setPref(next);
    applyTheme(next);
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const Icon = pref === "light" ? Sun : pref === "dark" ? Moon : SunMoon;

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${LABEL[pref]}. Switch theme`}
      title={`Theme: ${LABEL[pref]}`}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full border border-line px-3 text-fg-2 transition-colors hover:border-line-strong hover:text-fg",
        className,
      )}
    >
      <Icon className="size-4" aria-hidden />
      {showLabel && <span className="text-sm font-medium">{LABEL[pref]}</span>}
    </button>
  );
}

/** Inline script source — runs before hydration to avoid a theme flash. */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

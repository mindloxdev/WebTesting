import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MobileCTABar } from "./MobileCTABar";
import { BodyScheme } from "./BodyScheme";

type FrameProps = {
  children: ReactNode;
  scheme?: "dark" | "light";
  /** CSS theme class carrying the accent palette (see globals.css). */
  theme?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
  /** Hide the persistent mobile CTA bar (e.g. on the contact page). */
  noMobileCta?: boolean;
  noFooter?: boolean;
};

/**
 * Page shell: sets the color scheme + theme on an ancestor so every
 * semantic token (bg, fg, accent...) resolves for the whole subtree.
 */
export function Frame({
  children,
  scheme = "light",
  theme = "theme-ultimate",
  ctaLabel,
  ctaHref,
  className,
  noMobileCta,
  noFooter,
}: FrameProps) {
  return (
    <div data-scheme={scheme} className={cn(theme, "flex min-h-dvh flex-col bg-bg text-fg", className)}>
      <BodyScheme scheme={scheme} />
      <Navbar ctaLabel={ctaLabel} ctaHref={ctaHref} />
      <main className="flex-1">{children}</main>
      {!noFooter && <Footer />}
      {!noMobileCta && <MobileCTABar label={ctaLabel} href={ctaHref} />}
    </div>
  );
}

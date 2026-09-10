import type { ReactNode } from "react";
import { CONCEPTS, type Concept } from "@/data/concepts";
import { cn } from "@/lib/utils";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MobileCTABar } from "./MobileCTABar";
import { ConceptSwitcher } from "./ConceptSwitcher";
import { BodyScheme } from "./BodyScheme";

type FrameProps = {
  children: ReactNode;
  scheme?: "dark" | "light";
  /** CSS theme class, e.g. "theme-ultimate". */
  theme?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
  /** Hide the persistent mobile CTA bar (e.g. on the contact page). */
  noMobileCta?: boolean;
  noFooter?: boolean;
};

/**
 * Page shell: sets the color scheme + concept theme on an ancestor so every
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

/** Frame for one of the ten homepage concepts. Adds the floating concept switcher. */
export function ConceptFrame({ concept, children }: { concept: Concept; children: ReactNode }) {
  return (
    <div data-scheme={concept.scheme} className={cn(concept.theme, "flex min-h-dvh flex-col bg-bg text-fg")}>
      <BodyScheme scheme={concept.scheme} />
      <Navbar ctaLabel={concept.cta} />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileCTABar label={concept.cta} />
      <ConceptSwitcher current={concept} concepts={CONCEPTS} />
    </div>
  );
}

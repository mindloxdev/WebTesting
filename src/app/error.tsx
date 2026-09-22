"use client";

import { useEffect } from "react";
import { Frame } from "@/components/layout/Frame";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { CONTACT } from "@/data/site";

/**
 * Route-level error boundary. The visitor sees a calm, on-brand page and a way
 * forward. The underlying error is logged to the server console only — no
 * stack trace, digest, or internal path is rendered into the page.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(`[app] render error${error.digest ? ` (digest ${error.digest})` : ""}: ${error.name}`);
  }, [error]);

  return (
    <Frame theme="theme-ultimate" noMobileCta>
      <section className="relative flex min-h-[70vh] items-center overflow-hidden pt-32 pb-20" aria-label="Something went wrong">
        <div className="pointer-events-none absolute inset-0 mesh-bg" aria-hidden />
        <div className="container-x relative">
            <div className="max-w-3xl">
            <Reveal y={8} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-warning/30 bg-warning/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-warning">
                Something went wrong
              </span>
            </Reveal>
            <TextReveal
              as="h1"
              text="This page hit an error. Your revenue didn't."
              highlight="Your revenue didn't."
              immediate
              delay={0.1}
              className="text-display-lg font-bold text-fg"
            />
            <Reveal delay={0.5} className="mt-6">
              <p className="max-w-xl text-lg text-fg-2">
                Try again in a moment. If it keeps happening, email{" "}
                <a href={CONTACT.emailHref} className="font-medium text-fg underline decoration-line underline-offset-4 hover:text-accent">
                  {CONTACT.email}
                </a>{" "}
                or call{" "}
                <a href={CONTACT.phoneHref} className="font-medium text-fg underline decoration-line underline-offset-4 hover:text-accent">
                  {CONTACT.phone}
                </a>{" "}
                and a person will help.
              </p>
            </Reveal>
            <Reveal delay={0.7} className="mt-9 flex flex-wrap gap-3">
              <MagneticButton onClick={reset} size="lg" arrow hoverLabel="Reload This Page">
                Try again
              </MagneticButton>
              <MagneticButton href="/" size="lg" variant="outline">
                Go to the home page
              </MagneticButton>
            </Reveal>
            </div>
        </div>
      </section>
    </Frame>
  );
}

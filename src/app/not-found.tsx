import type { Metadata } from "next";
import { Frame } from "@/components/layout/Frame";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";

export const metadata: Metadata = { title: "Page not found" };

/** 404 — designed, on-brand, and still pointing at the CTA. */
export default function NotFound() {
  return (
    <Frame theme="theme-ultimate" noMobileCta>
      <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-32 pb-20" aria-label="Page not found">
        <div className="pointer-events-none absolute inset-0 mesh-bg" aria-hidden />
        <div className="pointer-events-none absolute inset-0 grid-bg fade-mask-b opacity-30" aria-hidden />
        <div className="container-x relative max-w-3xl">
          <Reveal y={8} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-negative/30 bg-negative/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-negative">
              404 · Claim not found
            </span>
          </Reveal>
          <TextReveal as="h1" text="This page was denied — but your revenue doesn't have to be." highlight="doesn't have to be." immediate delay={0.1} className="text-display-xl font-bold text-fg" />
          <Reveal delay={0.5} className="mt-6">
            <p className="max-w-xl text-lg text-fg-2">The page you requested doesn&apos;t exist or has moved. The revenue audit, our services, and the home page are all one click away.</p>
          </Reveal>
          <Reveal delay={0.7} className="mt-9 flex flex-wrap gap-3">
            <MagneticButton href="/" size="lg" arrow hoverLabel="Back to Mindlox AI">
              Go to the home page
            </MagneticButton>
            <MagneticButton href="/services" size="lg" variant="outline">
              Explore our services
            </MagneticButton>
            <MagneticButton href="/contact" size="lg" variant="ghost">
              Get a free revenue audit
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </Frame>
  );
}

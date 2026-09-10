import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SpecialtyMorph } from "@/components/visuals/SpecialtyMorph";
import { SpecialtyConstellation } from "./SpecialtyConstellation";

/**
 * Hero shell for the Specialty-First concept: constellation ambience behind
 * the centered copy, then the full 25-specialty morph directly below.
 */
export function SpecialtyHero({ children }: { children: ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-12 lg:pt-44 lg:pb-20">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-60" aria-hidden />
      <SpecialtyConstellation className="absolute inset-x-0 top-0 h-[72vh] opacity-80 fade-mask-b" />
      <div className="container-x relative">
        {children}
        <div id="specialty-morph" className="mt-14 scroll-mt-28 lg:mt-20">
          <Reveal delay={0.9} y={30} amount={0.05}>
            <SpecialtyMorph hero initial="cardiology" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

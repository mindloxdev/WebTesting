"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Cpu, Sparkles, Users, Plus, Equal } from "lucide-react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

const PANELS = [
  {
    icon: Users,
    eyebrow: "Humans",
    title: "Experienced billing specialists",
    copy: "Certified coders, billers, A/R and denial specialists, credentialing experts, and a named account manager. They make the decisions.",
    bullets: ["Specialty-aligned teams", "Weekly performance reviews", "Named escalation paths"],
  },
  {
    icon: Cpu,
    eyebrow: "Technology",
    title: "Modern, connected operations",
    copy: "Intelligent automation across eligibility, scrubbing, posting, and follow-up — layered on the EHR and PM systems you already use.",
    bullets: ["Works inside your existing systems", "Daily 835 posting and reconciliation", "Living dashboards, not monthly PDFs"],
  },
  {
    icon: Sparkles,
    eyebrow: "Intelligence",
    title: "AI-assisted decision support",
    copy: "Pattern detection that surfaces denial risk before submission, underpayments at posting, and A/R priorities every morning.",
    bullets: ["Denial-risk scoring", "Contract variance detection", "Payer pattern analysis"],
  },
] as const;

/**
 * "One intelligent system" — the formula behind Mindlox AI, as three panels
 * joined by a live connecting line.
 */
export function ProofOfSystem() {
  const reduce = useReducedMotion();
  return (
    <Section id="system" tone="muted">
      <SectionHeading
        eyebrow="The Mindlox AI formula"
        title="One intelligent system. Three kinds of strength."
        highlight="One intelligent system."
        description="Not software you have to learn. Not an agency you have to chase. Experienced billing humans, modern technology, and AI-assisted intelligence — working as one accountable partner."
      />

      <div className="relative mt-14">
        {/* connecting line — horizontal on desktop, vertical on mobile */}
        <svg className="pointer-events-none absolute left-[27px] top-6 hidden h-[calc(100%-3rem)] w-px lg:hidden" aria-hidden />
        <div className="pointer-events-none absolute inset-x-[16.6%] top-[56px] hidden h-px lg:block" aria-hidden>
          <svg className="h-2 w-full overflow-visible" viewBox="0 0 100 2" preserveAspectRatio="none">
            <motion.line x1="0" y1="1" x2="100" y2="1" stroke="var(--accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.5 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: EASE }} />
            <line x1="0" y1="1" x2="100" y2="1" stroke="var(--accent-2)" strokeWidth="2" strokeDasharray="6 6" vectorEffect="non-scaling-stroke" className={cn("opacity-70", !reduce && "animate-dash")} />
          </svg>
        </div>

        <RevealGroup className="relative grid gap-4 lg:grid-cols-3 lg:gap-6" staggerChildren={0.1}>
          {PANELS.map((p) => (
            <RevealItem key={p.eyebrow} className="relative">
              <div className="group relative h-full rounded-[22px] border border-line bg-bg p-6 shadow-e1 transition-[transform,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-line-strong hover:shadow-e3 lg:p-7">
                <span className="relative z-10 inline-flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-fg shadow-glow">
                  <p.icon className="size-6" aria-hidden />
                </span>
                <p className="eyebrow mt-6">{p.eyebrow}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-fg">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{p.copy}</p>
                <ul className="mt-5 space-y-2">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-fg">
                      <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent-2" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-2 font-display text-lg font-semibold text-fg lg:text-xl">
        <span className="rounded-full border border-line bg-bg px-4 py-1.5">Humans</span>
        <Plus className="size-4 text-fg-3" aria-hidden />
        <span className="rounded-full border border-line bg-bg px-4 py-1.5">Technology</span>
        <Plus className="size-4 text-fg-3" aria-hidden />
        <span className="rounded-full border border-line bg-bg px-4 py-1.5">Intelligence</span>
        <Equal className="size-4 text-fg-3" aria-hidden />
        <span className="rounded-full bg-accent px-4 py-1.5 text-accent-fg shadow-glow">One accountable revenue partner</span>
      </Reveal>
    </Section>
  );
}

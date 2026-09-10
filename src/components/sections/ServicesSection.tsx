"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { SERVICES, SERVICE_CATEGORIES, type Service, type ServiceCategory } from "@/data/services";
import { CTA } from "@/data/site";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

type Props = {
  className?: string;
  tone?: "default" | "muted";
  id?: string;
  /** How many cards before "Show all" (or the total shown in compact mode). */
  initial?: number;
  title?: string;
  description?: string;
  /** Home-page mode: a fixed preview of `initial` cards, no filters, plus a link to the full catalogue. */
  compact?: boolean;
  /** Where "View all services" points in compact mode. */
  moreHref?: string;
};

export function ServiceCard({ s, className }: { s: Service; className?: string }) {
  const href = s.root ? `/${s.slug}` : `/services#${s.slug}`;
  return (
    <Card className={cn("h-full", className)} padding="md">
      <Link href={href} className="block after:absolute after:inset-0" aria-label={`${s.name} — learn more`}>
        <div className="flex items-start justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">{SERVICE_CATEGORIES[s.category]}</span>
          <ArrowUpRight className="size-4 text-fg-3 transition-all duration-500 ease-out-expo group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-accent" />
        </div>
        <h3 className="mt-5 font-display text-lg font-semibold text-fg">{s.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-2">{s.short}</p>
      </Link>
    </Card>
  );
}

/** Premium service cards with category filter and expand-all. */
export function ServicesSection({
  className,
  tone = "default",
  id = "services",
  initial = 8,
  title = "Every service a modern revenue cycle needs.",
  description = "Twenty-four services, one accountable team. Engage end-to-end or start with the stage that hurts most.",
  compact = false,
  moreHref = "/services",
}: Props) {
  const [filter, setFilter] = useState<ServiceCategory | "all">("all");
  const [all, setAll] = useState(false);
  const list = SERVICES.filter((s) => filter === "all" || s.category === filter);
  const shown = compact ? SERVICES.slice(0, initial) : all || filter !== "all" ? list : list.slice(0, initial);

  if (compact) {
    return (
      <Section id={id} tone={tone} className={className}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Services" title={title} highlight="modern revenue cycle" description={description} />
          <Reveal className="lg:mb-2">
            <Link href={moreHref} className="inline-flex items-center gap-1.5 font-medium text-accent transition-colors hover:text-fg">
              View all {SERVICES.length} services <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((s, i) => (
            <motion.li
              key={s.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
            >
              <ServiceCard s={s} />
            </motion.li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton href={moreHref} variant="outline" arrow hoverLabel={`See All ${SERVICES.length} Services`}>
            Explore every service
          </MagneticButton>
          <MagneticButton href={CTA.auditHref} arrow hoverLabel="See My Revenue Opportunities">
            See My Revenue Opportunities
          </MagneticButton>
        </div>
      </Section>
    );
  }

  return (
    <Section id={id} tone={tone} className={className}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading eyebrow="Services" title={title} highlight="modern revenue cycle" description={description} />
      </div>

      <Reveal className="mt-10 flex flex-wrap gap-2" y={10}>
        {(["all", ...Object.keys(SERVICE_CATEGORIES)] as (ServiceCategory | "all")[]).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors duration-300",
              filter === c ? "border-fg bg-fg text-bg" : "border-line text-fg-2 hover:border-line-strong hover:text-fg",
            )}
          >
            {c === "all" ? "All services" : SERVICE_CATEGORIES[c]}
          </button>
        ))}
      </Reveal>

      <motion.ul layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((s, i) => (
            <motion.li
              key={s.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: EASE, delay: Math.min(i, 8) * 0.03 }}
            >
              <ServiceCard s={s} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        {filter === "all" && list.length > initial && (
          <button
            type="button"
            onClick={() => setAll((a) => !a)}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-6 text-[15px] font-medium text-fg transition-colors hover:border-line-strong hover:bg-bg-2"
            aria-expanded={all}
          >
            {all ? "Show fewer" : `Show all ${SERVICES.length} services`}
            <ChevronDown className={cn("size-4 transition-transform", all && "rotate-180")} />
          </button>
        )}
        <MagneticButton href={CTA.auditHref} arrow hoverLabel="See My Revenue Opportunities">
          See My Revenue Opportunities
        </MagneticButton>
      </div>
    </Section>
  );
}

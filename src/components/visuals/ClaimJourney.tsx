"use client";

import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { useRef, useState } from "react";
import { CLAIM_ID, CLAIM_JOURNEY } from "@/data/dashboard";
import { useInterval } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { cn, pad2 } from "@/lib/utils";
import { DemoBadge } from "@/components/ui/DemoBadge";

type Props = {
  className?: string;
  /** Cycle through stages until the visitor interacts. */
  autoplay?: boolean;
  intervalMs?: number;
};

/**
 * CLAIM #MLX-10492 — every stage expandable, showing exactly what Mindlox AI
 * does there. Horizontal stepper on desktop, vertical on mobile.
 *
 * Both layouts render all six stage panels into the server HTML and hide the
 * inactive ones with the `hidden` attribute, rather than mounting a panel on
 * click, so a crawler reads every stage without interacting.
 */
export function ClaimJourney({ className, autoplay = true, intervalMs = 3200 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const stages = CLAIM_JOURNEY;

  useInterval(
    () => setActive((a) => (a + 1) % stages.length),
    autoplay && inView && !touched ? intervalMs : null,
  );

  // Rewind to the first stage each time the stepper scrolls back into view.
  // Adjusted during render rather than in an effect, so no extra paint shows
  // the stale stage.
  const [wasInView, setWasInView] = useState(inView);
  if (inView !== wasInView) {
    setWasInView(inView);
    if (inView) setActive(0);
  }

  const select = (i: number) => {
    setTouched(true);
    setActive(i);
  };

  const progress = active / (stages.length - 1);

  return (
    <div ref={ref} className={cn("overflow-hidden rounded-[22px] border border-line bg-bg shadow-e3", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-bg-2/70 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-fg-3">Claim</span>
          <span className="font-mono text-sm font-semibold text-fg">#{CLAIM_ID}</span>
          <span className="hidden rounded-full bg-positive/12 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-positive sm:inline">
            Paid · Posted
          </span>
        </div>
        <DemoBadge />
      </div>

      {/* Desktop stepper */}
      <div className="hidden px-6 pt-8 md:block">
        <div className="relative">
          <div className="absolute left-[calc(100%/12)] right-[calc(100%/12)] top-5 h-px bg-line" aria-hidden />
          <motion.div
            className="absolute left-[calc(100%/12)] top-5 h-px bg-accent"
            style={{ width: `calc((100% - 100% / 6) * ${progress})` }}
            transition={{ duration: 0.6, ease: EASE }}
            layout
            aria-hidden
          />
          <ol className="relative grid grid-cols-6">
            {stages.map((st, i) => {
              const done = i < active;
              const cur = i === active;
              return (
                <li key={st.id} className="flex flex-col items-center text-center">
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-current={cur ? "step" : undefined}
                    className={cn(
                      "relative z-10 flex size-10 items-center justify-center rounded-full border font-mono text-xs transition-all duration-500 ease-out-expo",
                      cur
                        ? "scale-110 border-accent bg-accent text-accent-fg shadow-glow"
                        : done
                          ? "border-accent/40 bg-accent-soft text-accent"
                          : "border-line bg-bg text-fg-3 hover:border-line-strong",
                    )}
                  >
                    {done ? <Check className="size-4" /> : pad2(st.id)}
                    {cur && <span className="absolute inset-0 animate-ping-soft rounded-full bg-accent/40" aria-hidden />}
                  </button>
                  <span className={cn("mt-3 text-sm font-medium transition-colors", cur ? "text-fg" : "text-fg-2")}>{st.name}</span>
                  <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-3">{st.status}</span>
                </li>
              );
            })}
          </ol>
        </div>

        {stages.map((st, i) => {
          const cur = i === active;
          return (
            <div
              key={st.id}
              hidden={!cur}
              inert={!cur}
              className={cn(
                "mt-8 grid gap-6 border-t border-line py-6 lg:grid-cols-[1.2fr_1fr]",
                cur && "animate-panel-in",
              )}
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-fg-3">{st.timestamp}</span>
                  {st.amount && <span className="rounded-full bg-positive/12 px-2 py-0.5 font-mono text-xs text-positive">{st.amount}</span>}
                </div>
                <h3 className="mt-2 font-display text-2xl font-semibold text-fg">
                  {st.name} <span className="text-fg-3">·</span> {st.status}
                </h3>
                <p className="mt-3 max-w-xl text-fg-2">{st.detail}</p>
              </div>
              <div className="rounded-2xl bg-bg-2 p-5">
                <p className="eyebrow mb-3">What Mindlox AI did here</p>
                <ul className="space-y-2">
                  {st.work.map((w, wi) => (
                    <li
                      key={w}
                      className={cn("flex items-start gap-2.5 text-sm text-fg", cur && "animate-panel-in")}
                      style={cur ? { animationDelay: `${100 + wi * 70}ms` } : undefined}
                    >
                      <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-positive/15 text-positive">
                        <Check className="size-3" />
                      </span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile vertical */}
      <ol className="divide-y divide-line md:hidden">
        {stages.map((st, i) => {
          const cur = i === active;
          return (
            <li key={st.id}>
              <button
                type="button"
                onClick={() => select(i)}
                aria-expanded={cur}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full border font-mono text-[11px]",
                    cur ? "border-accent bg-accent text-accent-fg" : i < active ? "border-accent/40 bg-accent-soft text-accent" : "border-line text-fg-3",
                  )}
                >
                  {i < active ? <Check className="size-3.5" /> : pad2(st.id)}
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-medium text-fg">{st.name}</span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-fg-3">{st.status}</span>
                </span>
                {st.amount && <span className="font-mono text-xs text-positive">{st.amount}</span>}
              </button>
              <motion.div
                initial={false}
                animate={cur ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="overflow-hidden"
                inert={!cur}
              >
                <div className="px-4 pb-4 pl-[60px]">
                  <p className="text-sm text-fg-2">{st.detail}</p>
                  <ul className="mt-3 space-y-1.5">
                    {st.work.map((w) => (
                      <li key={w} className="flex items-start gap-2 text-sm text-fg">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-positive" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

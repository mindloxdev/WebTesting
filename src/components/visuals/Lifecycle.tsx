"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { LIFECYCLE, PHASE_LABELS } from "@/data/lifecycle";
import { useInterval } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { cn, pad2 } from "@/lib/utils";

type Props = { className?: string; autoplay?: boolean };

/**
 * The 14-stage revenue cycle as a horizontal, interactive track. The path
 * lights up stage by stage; clicking any stage opens what Mindlox AI does there.
 */
export function Lifecycle({ className, autoplay = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px" });
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useInterval(
    () => {
      setActive((a) => {
        const n = (a + 1) % LIFECYCLE.length;
        scrollTo(n);
        return n;
      });
    },
    autoplay && inView && !touched ? 2400 : null,
  );

  /** Horizontal-only centering — never scrollIntoView, which would hijack the page's vertical scroll. */
  const scrollTo = (i: number) => {
    const sc = scroller.current;
    const el = sc?.querySelector<HTMLElement>(`[data-stage="${i}"]`);
    if (!sc || !el) return;
    const scRect = sc.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const left = sc.scrollLeft + (elRect.left - scRect.left) - (sc.clientWidth - elRect.width) / 2;
    sc.scrollTo({ left, behavior: "smooth" });
  };

  const select = (i: number) => {
    setTouched(true);
    setActive(i);
    scrollTo(i);
  };

  const s = LIFECYCLE[active];

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div ref={scroller} className="no-scrollbar -mx-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <ol className="relative flex w-max items-start gap-2 pt-4" role="tablist" aria-label="Revenue cycle stages">
          <div className="absolute left-6 right-6 top-[38px] h-px bg-line" aria-hidden />
          <motion.div
            className="absolute left-6 top-[38px] h-px bg-accent shadow-[0_0_12px_var(--glow)]"
            animate={{ width: `calc((100% - 48px) * ${active / (LIFECYCLE.length - 1)})` }}
            transition={{ duration: 0.6, ease: EASE }}
            aria-hidden
          />
          {LIFECYCLE.map((st, i) => {
            const cur = i === active;
            const done = i < active;
            return (
              <li key={st.id} data-stage={i} className="relative w-[136px] shrink-0 text-center">
                {(i === 0 || LIFECYCLE[i - 1].phase !== st.phase) && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">
                    {PHASE_LABELS[st.phase]}
                  </span>
                )}
                <button
                  type="button"
                  role="tab"
                  aria-selected={cur}
                  onClick={() => select(i)}
                  className="group flex w-full flex-col items-center pt-3"
                >
                  <span
                    className={cn(
                      "relative z-10 flex size-10 items-center justify-center rounded-full border font-mono text-[11px] transition-all duration-500 ease-out-expo",
                      cur
                        ? "scale-110 border-accent bg-accent text-accent-fg shadow-glow"
                        : done
                          ? "border-accent/40 bg-accent-soft text-accent"
                          : "border-line bg-bg text-fg-3 group-hover:border-line-strong group-hover:text-fg",
                    )}
                  >
                    {pad2(st.id)}
                  </span>
                  <span className={cn("mt-3 text-[13px] font-medium leading-tight transition-colors", cur ? "text-fg" : "text-fg-2")}>
                    {st.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="mt-4 grid gap-4 rounded-2xl border border-line bg-bg-2/70 p-6 lg:grid-cols-[auto_1fr_1fr] lg:gap-8 lg:p-7"
        >
          <div className="flex items-center gap-3 lg:flex-col lg:items-start">
            <span className="font-display text-5xl font-bold tracking-tight text-accent">{pad2(s.id)}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">
              {PHASE_LABELS[s.phase]} · of 14
            </span>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-fg">{s.name}</h3>
            <p className="mt-2 text-fg-2">{s.action}</p>
          </div>
          <div className="rounded-xl bg-bg p-4">
            <p className="mb-1.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
              <Sparkles className="size-3.5" /> Where AI assists
            </p>
            <p className="text-sm text-fg-2">{s.ai}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Building2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, type RefObject } from "react";
import { TEAM_ROLES } from "@/data/dashboard";
import { cn } from "@/lib/utils";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

/* Sample status chips — labeled on the stage. */
const STATUS = [
  "18 charts coded today",
  "52 claims out the door",
  "$6,840 recovered this week",
  "5 appeals filed today",
  "3 enrollments approved",
  "Weekly review · Thursday",
  "24 claims flagged overnight",
];

const N = TEAM_ROLES.length;
const RX = 37; // % of stage width
const RY = 40; // % of stage height
const WINDOW = 0.105;
const FIRST = 0.06;

const POSITIONS = TEAM_ROLES.map((_, i) => {
  const a = ((-90 + (i * 360) / N) * Math.PI) / 180;
  return { x: Math.round((50 + RX * Math.cos(a)) * 1000) / 1000, y: Math.round((50 + RY * Math.sin(a)) * 1000) / 1000, a };
});

const initials = (role: string) =>
  role
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function useStageSize(ref: RefObject<HTMLDivElement | null>) {
  const [s, setS] = useState({ w: 1100, h: 640 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setS({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return s;
}

/** Docking progress for card `i`: 0 = off stage, 1 = docked (spring-eased). */
function useDock(progress: MotionValue<number>, i: number) {
  const start = FIRST + i * WINDOW;
  const raw = useTransform(progress, [start, start + 0.13], [0, 1]);
  return useSpring(raw, { stiffness: 150, damping: 22, mass: 0.7 });
}

function RoleCard({ i, progress, size, reduce }: { i: number; progress: MotionValue<number>; size: { w: number; h: number }; reduce: boolean }) {
  const p = POSITIONS[i];
  const t = useDock(progress, i);
  const ox = Math.cos(p.a) * size.w * 0.55;
  const oy = Math.sin(p.a) * size.h * 0.7;
  const x = useTransform(() => (reduce ? 0 : ox * (1 - t.get())));
  const y = useTransform(() => (reduce ? 0 : oy * (1 - t.get())));
  const opacity = useTransform(() => (reduce ? 1 : Math.min(1, Math.max(0, t.get() * 1.6))));
  const scale = useTransform(() => (reduce ? 1 : 0.82 + 0.18 * Math.min(1.08, t.get())));
  const role = TEAM_ROLES[i];
  const ai = role.role === "AI Automation";

  return (
    <motion.div
      className="absolute w-[212px] -ml-[106px] -mt-[62px] will-change-transform"
      style={{ left: `${p.x}%`, top: `${p.y}%`, x, y, opacity, scale }}
    >
      <RoleTile role={role.role} detail={role.detail} status={STATUS[i]} ai={ai} />
    </motion.div>
  );
}

function RoleTile({ role, detail, status, ai, className }: { role: string; detail: string; status: string; ai: boolean; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-line bg-bg p-3.5 shadow-e2", className)}>
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            "inline-flex size-9 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold",
            ai ? "bg-accent text-accent-fg" : "bg-accent-3/20 text-fg",
          )}
        >
          {ai ? <Sparkles className="size-4" /> : initials(role)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-fg">{role}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">{ai ? "Always on" : "Dedicated"}</p>
        </div>
      </div>
      <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-fg-2">{detail}</p>
      <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-bg-2 px-2 py-0.5 font-mono text-[10px] text-fg-2">
        <span className="size-1.5 rounded-full bg-positive" aria-hidden />
        {status}
      </span>
    </div>
  );
}

function Connector({ i, progress, reduce }: { i: number; progress: MotionValue<number>; reduce: boolean }) {
  const p = POSITIONS[i];
  const t = useDock(progress, i);
  const pathLength = useTransform(() => (reduce ? 1 : Math.min(1, Math.max(0, t.get()))));
  return (
    <motion.line
      x1={50}
      y1={50}
      x2={p.x}
      y2={p.y}
      stroke="var(--line-strong)"
      strokeWidth={1.5}
      strokeDasharray="3 5"
      vectorEffect="non-scaling-stroke"
      style={{ pathLength }}
    />
  );
}

function PracticeTile() {
  return (
    <div className="relative">
      <span className="absolute inset-0 animate-ping-soft rounded-3xl bg-accent/20" aria-hidden />
      <div className="relative flex w-[188px] flex-col items-center rounded-3xl border border-line bg-bg p-5 text-center shadow-e3">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <Building2 className="size-6" />
        </span>
        <p className="mt-3 font-display text-base font-semibold text-fg">Your Practice</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">At the center</p>
      </div>
    </div>
  );
}

/**
 * Sticky-scroll assembly: as the visitor scrolls, seven specialist roles fly in
 * one by one and dock around the practice, each drawing a connector.
 * Mobile renders a staggered vertical stack instead of pinning.
 */
export function TeamAssembly({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const size = useStageSize(stage);
  const [docked, setDocked] = useState(reduce ? N : 0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const n = Math.max(0, Math.min(N, Math.floor((v - FIRST) / WINDOW) + 1));
    setDocked(reduce ? N : n);
  });

  const msgO = useTransform(scrollYProgress, [0.82, 0.92], [0, 1]);
  const msgY = useTransform(scrollYProgress, [0.82, 0.92], [16, 0]);

  return (
    <section className={cn("relative", className)} aria-label="Your billing department assembling">
      {/* Desktop: pinned stage */}
      <div ref={ref} className="relative hidden h-[280vh] lg:block">
        <div className="sticky top-0 flex h-screen items-center">
          <div className="container-x">
            <div ref={stage} className="relative h-[min(680px,calc(100vh-120px))] overflow-hidden rounded-[28px] border border-line bg-bg-2/60">
              <div className="pointer-events-none absolute inset-0 dot-bg opacity-50" aria-hidden />

              <div className="absolute left-6 top-5 z-10 flex items-center gap-3">
                <span className="eyebrow">Assembling your department</span>
                <span className="font-mono text-[11px] tabular text-fg-3">
                  {docked}/{N} docked
                </span>
              </div>
              <div className="absolute right-6 top-5 z-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">A typical engagement</span>
              </div>

              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                {TEAM_ROLES.map((_, i) => (
                  <Connector key={i} i={i} progress={scrollYProgress} reduce={reduce} />
                ))}
              </svg>

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <PracticeTile />
              </div>

              {TEAM_ROLES.map((_, i) => (
                <RoleCard key={i} i={i} progress={scrollYProgress} size={size} reduce={reduce} />
              ))}

            </div>
            <motion.p
              style={reduce ? undefined : { opacity: msgO, y: msgY }}
              className="mx-auto mt-5 max-w-xl text-center font-display text-lg font-semibold text-fg"
            >
              We become an extension of your practice — <span className="text-accent">not another vendor you have to manage.</span>
            </motion.p>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: staggered stack */}
      <div className="container-x py-12 lg:hidden">
        <div className="relative rounded-[24px] border border-line bg-bg-2/60 p-5">
          <div className="pointer-events-none absolute inset-0 dot-bg opacity-50" aria-hidden />
          <div className="relative">
            <div className="mb-5 flex items-center justify-between">
              <span className="eyebrow">Your department</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">A typical engagement</span>
            </div>
            <div className="flex justify-center">
              <PracticeTile />
            </div>
            <RevealGroup className="mt-6 grid gap-3 sm:grid-cols-2" staggerChildren={0.07}>
              {TEAM_ROLES.map((r, i) => (
                <RevealItem key={r.role}>
                  <RoleTile role={r.role} detail={r.detail} status={STATUS[i]} ai={r.role === "AI Automation"} />
                </RevealItem>
              ))}
            </RevealGroup>
            <RevealItem className="mt-6 text-center font-display text-lg font-semibold text-fg">
              We become an extension of your practice — <span className="text-accent">not another vendor you have to manage.</span>
            </RevealItem>
          </div>
        </div>
      </div>
    </section>
  );
}

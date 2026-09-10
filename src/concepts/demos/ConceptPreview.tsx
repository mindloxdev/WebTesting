"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { Concept, ConceptSlug } from "@/data/concepts";
import { cn } from "@/lib/utils";

type V = { play: boolean };
const INF = { repeat: Infinity, ease: "easeInOut" as const };

/* 01 — Revenue Engine: a glowing path with dollars traveling along it. */
function Engine({ play }: V) {
  const d = "M18,76 C90,18 140,110 200,54 S290,40 302,62";
  return (
    <svg viewBox="0 0 320 120" className="h-full w-full">
      <path d={d} fill="none" stroke="var(--line-strong)" strokeWidth="1.5" />
      <path d={d} fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="6 6" className={cn("opacity-80", play && "animate-dash")} />
      {[0, 1, 2].map((i) => (
        <circle key={i} r="4" fill="var(--accent-2)" opacity={play ? 1 : 0}>
          {play && <animateMotion dur="2.8s" begin={`${i * 0.9}s`} repeatCount="indefinite" path={d} />}
        </circle>
      ))}
      {[[18, 76], [302, 62]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x={x} y={y + 22} textAnchor="middle" fontSize="8" fontFamily="var(--font-mono)" fill="var(--fg-3)">{i ? "REVENUE" : "VISIT"}</text>
        </g>
      ))}
    </svg>
  );
}

/* 02 — Revenue Leakage: the bar drains, then refills. */
function Leak({ play }: V) {
  return (
    <div className="flex h-full flex-col justify-center gap-3 px-7">
      <div className="flex justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-fg-3"><span>Revenue</span><span>Recovered</span></div>
      <div className="h-4 w-full overflow-hidden rounded-full bg-fg/8">
        <motion.div className="h-full rounded-full" animate={play ? { width: ["100%", "38%", "38%", "100%", "100%"], backgroundColor: ["#2b6bff", "#f0466a", "#f0466a", "#10b981", "#2b6bff"] } : { width: "100%", backgroundColor: "#2b6bff" }} transition={{ duration: 5.2, times: [0, 0.35, 0.5, 0.85, 1], ...INF }} />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {["Denials", "Coding", "Eligibility", "A/R"].map((l, i) => (
          <motion.span key={l} className="rounded-full border border-line px-2 py-0.5 text-[9px] text-fg-2" animate={play ? { opacity: [0.3, 1, 1, 0.3, 0.3] } : { opacity: 0.6 }} transition={{ duration: 5.2, times: [0, 0.1 + i * 0.07, 0.5, 0.85, 1], ...INF }}>{l}</motion.span>
        ))}
      </div>
    </div>
  );
}

/* 03 — AI + Human: detection cards slide in and get picked up. */
function Feed({ play }: V) {
  return (
    <div className="flex h-full flex-col justify-center gap-2 px-8">
      {[0, 1, 2].map((i) => (
        <motion.div key={i} className="flex items-center gap-2 rounded-lg border border-line bg-bg-2 px-2.5 py-1.5" animate={play ? { y: [18, 0, 0, -6], opacity: [0, 1, 1, 0] } : { opacity: 1 }} transition={{ duration: 3.6, times: [0, 0.15, 0.85, 1], delay: i * 1.2, ...INF }}>
          <span className="size-2 rounded-full bg-accent" />
          <span className="h-1.5 flex-1 rounded-full bg-fg/15" />
          <span className="h-1.5 w-8 rounded-full bg-positive/60" />
        </motion.div>
      ))}
    </div>
  );
}

/* 04 — Billing Department: role chips dock around the practice. */
function Team({ play }: V) {
  const roles = ["Coders", "Billers", "A/R", "Denials", "Credentialing", "AI"];
  return (
    <div className="relative h-full w-full">
      <div className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-accent font-mono text-[8px] text-accent-fg">YOU</div>
      {roles.map((r, i) => {
        const a = (i / roles.length) * Math.PI * 2 - Math.PI / 2;
        const tx = Math.round(Math.cos(a) * 38 * 1000) / 1000;
        const ty = Math.round(Math.sin(a) * 30 * 1000) / 1000;
        return (
          <motion.span key={r} className="absolute left-1/2 top-1/2 rounded-full border border-line bg-bg px-2 py-0.5 text-[9px] text-fg" style={{ marginLeft: -22, marginTop: -8 }} animate={play ? { x: [`${tx * 3}%`, `${tx}%`, `${tx}%`, `${tx * 3}%`], y: [`${ty * 4}%`, `${ty * 1.6}%`, `${ty * 1.6}%`, `${ty * 4}%`], opacity: [0, 1, 1, 0] } : { x: `${tx}%`, y: `${ty * 1.6}%`, opacity: 1 }} transition={{ duration: 4.4, times: [0, 0.25, 0.8, 1], delay: i * 0.12, ...INF }}>{r}</motion.span>
        );
      })}
    </div>
  );
}

/* 05 — Transparency: a claim moves through the stepper. */
function Stepper({ play }: V) {
  return (
    <div className="flex h-full flex-col justify-center px-8">
      <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.14em] text-fg-3">Claim #MLX-10492</div>
      <div className="relative flex items-center justify-between">
        <div className="absolute inset-x-2 top-1/2 h-px bg-line" />
        <motion.div className="absolute left-2 top-1/2 h-px origin-left bg-accent" style={{ right: 8 }} animate={play ? { scaleX: [0, 1, 1, 0] } : { scaleX: 1 }} transition={{ duration: 4.5, times: [0, 0.7, 0.9, 1], ...INF }} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.span key={i} className="relative flex size-4 items-center justify-center rounded-full border border-line bg-bg" animate={play ? { borderColor: ["var(--line)", "#0ea5e9", "#0ea5e9", "var(--line)"], scale: [1, 1.3, 1, 1] } : {}} transition={{ duration: 4.5, times: [0, 0.14 + i * 0.11, 0.2 + i * 0.11, 1], ...INF }} />
        ))}
      </div>
    </div>
  );
}

/* 06 — Enterprise: monochrome grid, one accent block moving with discipline. */
function Grid({ play }: V) {
  return (
    <div className="relative h-full w-full p-5">
      <div className="grid h-full grid-cols-4 grid-rows-3 gap-1">
        {Array.from({ length: 12 }).map((_, i) => <div key={i} className="rounded-sm border border-line bg-bg-2" />)}
      </div>
      <motion.div className="absolute left-5 top-5 h-[calc((100%-2.5rem-0.5rem)/3)] w-[calc((100%-2.5rem-0.75rem)/4)] rounded-sm bg-accent" animate={play ? { x: ["0%", "0%", "213%", "213%", "320%", "320%", "107%", "107%", "0%"], y: ["0%", "0%", "0%", "0%", "108%", "108%", "216%", "216%", "0%"] } : {}} transition={{ duration: 6, ease: [0.16, 1, 0.3, 1], repeat: Infinity }} />
    </div>
  );
}

/* 07 — Specialty-First: chips morph hue in place. */
function Chips({ play }: V) {
  const names = ["Cardiology", "Orthopedics", "Dermatology", "Behavioral", "Urgent Care", "Radiology"];
  return (
    <div className="flex h-full flex-wrap content-center gap-1.5 px-7">
      {names.map((n, i) => (
        <motion.span key={n} className="rounded-full px-2.5 py-1 text-[9px] font-medium text-white" animate={play ? { backgroundColor: ["hsl(250 80% 62%)", "hsl(350 75% 58%)", "hsl(190 70% 45%)", "hsl(25 85% 55%)", "hsl(250 80% 62%)"], scale: [1, 1.06, 1, 1.06, 1] } : { backgroundColor: "hsl(250 80% 62%)" }} transition={{ duration: 6, delay: i * 0.35, ...INF }}>{n}</motion.span>
      ))}
    </div>
  );
}

/* 08 — Command Center: bars grow, a line draws, a metric ticks. */
function Command({ play }: V) {
  return (
    <div className="flex h-full items-end gap-4 px-7 pb-6 pt-5">
      <div className="flex h-full flex-1 items-end gap-1.5">
        {[0.4, 0.55, 0.5, 0.7, 0.62, 0.85, 0.78, 1].map((h, i) => (
          <motion.div key={i} className="flex-1 origin-bottom rounded-sm bg-accent" style={{ height: `${h * 100}%`, opacity: i === 7 ? 1 : 0.45 }} animate={play ? { scaleY: [0, 1, 1, 0] } : { scaleY: 1 }} transition={{ duration: 4, times: [0, 0.3, 0.85, 1], delay: i * 0.07, ...INF }} />
        ))}
      </div>
      <div className="w-24 rounded-lg border border-line bg-bg-2 p-2">
        <div className="font-mono text-[8px] uppercase tracking-[0.12em] text-fg-3">Net collection</div>
        <motion.div className="font-display text-lg font-bold text-fg" animate={play ? { opacity: [0, 1, 1, 0] } : { opacity: 1 }} transition={{ duration: 4, times: [0, 0.3, 0.85, 1], ...INF }}>97.4%</motion.div>
        <svg viewBox="0 0 80 20" className="mt-1 w-full"><motion.path d="M0,16 C15,14 25,8 40,9 S65,4 80,2" fill="none" stroke="var(--accent-2)" strokeWidth="1.5" animate={play ? { pathLength: [0, 1, 1, 0] } : { pathLength: 1 }} transition={{ duration: 4, times: [0, 0.5, 0.85, 1], ...INF }} /></svg>
      </div>
    </div>
  );
}

/* 09 — Growth Partner: scattered chaos aligns into order. */
function Align({ play }: V) {
  const items = ["Denials", "Aging A/R", "Overload", "Manual", "Burnout", "Unpaid"];
  const after = ["Clean claims", "Faster pay", "Recovered", "Transparent", "Less admin", "Patients"];
  return (
    <div className="grid h-full grid-cols-3 content-center gap-1.5 px-7">
      {items.map((b, i) => (
        <motion.div key={b} className="relative h-6 overflow-hidden rounded-md text-center text-[9px] leading-6" animate={play ? { x: [(i % 3) * 14 - 14, 0, 0, (i % 3) * 14 - 14], y: [i % 2 ? 10 : -10, 0, 0, i % 2 ? 10 : -10], rotate: [i % 2 ? 8 : -8, 0, 0, i % 2 ? 8 : -8], backgroundColor: ["rgba(240,70,106,0.18)", "rgba(16,185,129,0.18)", "rgba(16,185,129,0.18)", "rgba(240,70,106,0.18)"] } : { backgroundColor: "rgba(16,185,129,0.18)" }} transition={{ duration: 5, times: [0, 0.4, 0.8, 1], delay: i * 0.08, ...INF }}>
          <motion.span className="absolute inset-0 text-negative" animate={play ? { opacity: [1, 0, 0, 1] } : { opacity: 0 }} transition={{ duration: 5, times: [0, 0.4, 0.8, 1], delay: i * 0.08, ...INF }}>{b}</motion.span>
          <motion.span className="absolute inset-0 text-positive" animate={play ? { opacity: [0, 1, 1, 0] } : { opacity: 1 }} transition={{ duration: 5, times: [0, 0.4, 0.8, 1], delay: i * 0.08, ...INF }}>{after[i]}</motion.span>
        </motion.div>
      ))}
    </div>
  );
}

/* 10 — Ultimate: a small living ecosystem. */
function Eco({ play }: V) {
  const nodes = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2;
    // Rounded so SSR and client markup match exactly (hydration).
    return { x: Math.round((160 + Math.cos(a) * 44) * 1000) / 1000, y: Math.round((60 + Math.sin(a) * 40) * 1000) / 1000 };
  });
  return (
    <svg viewBox="0 0 320 120" className="h-full w-full">
      <g className={cn(play && "animate-spin-slow")} style={{ transformOrigin: "160px 60px" }}>
        {nodes.map((n, i) => <line key={i} x1="160" y1="60" x2={n.x} y2={n.y} stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="1" />)}
        {nodes.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r="5" fill="var(--bg-2)" stroke="var(--accent-2)" strokeWidth="1.2" />)}
      </g>
      <motion.circle cx="160" cy="60" r="12" fill="var(--accent)" animate={play ? { r: [12, 14, 12] } : {}} transition={{ duration: 2.4, ...INF }} />
      <text x="160" y="64" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="var(--font-display)" fill="#fff">AI</text>
    </svg>
  );
}

const VIGNETTES: Record<ConceptSlug, (p: V) => React.ReactElement> = {
  "revenue-engine": Engine,
  "revenue-leakage": Leak,
  "ai-human": Feed,
  "billing-department": Team,
  transparency: Stepper,
  enterprise: Grid,
  "specialty-first": Chips,
  "command-center": Command,
  "growth-partner": Align,
  ultimate: Eco,
};

/** Live micro-animation thumbnail for a concept card, rendered in that concept's own theme. */
export function ConceptPreview({ concept, className }: { concept: Concept; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -5% 0px" });
  const reduce = useReducedMotion();
  const play = inView && !reduce;
  const Vignette = VIGNETTES[concept.slug];
  return (
    <div ref={ref} data-scheme={concept.scheme} className={cn(concept.theme, "relative h-full w-full overflow-hidden bg-bg text-fg", className)} aria-hidden>
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-60" />
      <div className="relative h-full w-full">
        <Vignette play={play} />
      </div>
    </div>
  );
}

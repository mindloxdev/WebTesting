"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTime,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const C = 300;
const R_INNER = 125;
const R_OUTER = 232;

type Node = { id: string; label: string; x: number; y: number; ring: 0 | 1 | 2; caption: string };
type Link = { a: string; b: string; d: string };

const CENTER = { id: "ai", label: "AI", caption: "AI-assisted intelligence — denial-risk scoring, underpayment and eligibility detection, and work-queue prioritization. It finds; specialists decide." };

const INNER = [
  { id: "billing", label: "Medical Billing", caption: "Clean claims out daily. Rejections triaged within one business day." },
  { id: "coding", label: "Coding", caption: "Specialty-accurate CPT, ICD-10-CM, and HCPCS with modifier and NCCI review." },
  { id: "claims", label: "Claims", caption: "Scrubbed against payer edits before release; 999/277 acceptance tracked." },
  { id: "denials", label: "Denials", caption: "Root-cause taxonomy, prioritized appeals, and a prevention loop to the front end." },
  { id: "ar", label: "A/R", caption: "Aging balances worked by value, likelihood, and timely-filing risk." },
];

const OUTER = [
  { id: "credentialing", label: "Credentialing", caption: "Enrollment, CAQH, and re-credentialing calendars tracked to completion." },
  { id: "eligibility", label: "Eligibility", caption: "Coverage, benefits, and patient responsibility confirmed before the visit." },
  { id: "payments", label: "Payments", caption: "835 remittances posted daily; contract variance detection flags underpayments." },
  { id: "analytics", label: "Analytics", caption: "Living dashboards and monthly strategy reviews on every KPI that matters." },
  { id: "patient", label: "Patient Billing", caption: "Plain-language statements, payment plans, and respectful follow-up." },
];

function polar(r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  // Rounded so server- and client-rendered SVG attributes match exactly (hydration).
  return { x: Math.round((C + r * Math.cos(a)) * 1000) / 1000, y: Math.round((C + r * Math.sin(a)) * 1000) / 1000 };
}

function curve(ax: number, ay: number, bx: number, by: number) {
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const cx = mx + (C - mx) * 0.22;
  const cy = my + (C - my) * 0.22;
  return `M${ax.toFixed(1)},${ay.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${bx.toFixed(1)},${by.toFixed(1)}`;
}

function buildGraph() {
  const nodes: Node[] = [{ ...CENTER, x: C, y: C, ring: 0 }];
  INNER.forEach((n, i) => {
    const p = polar(R_INNER, -90 + i * 72);
    nodes.push({ ...n, ...p, ring: 1 });
  });
  OUTER.forEach((n, i) => {
    const p = polar(R_OUTER, -54 + i * 72);
    nodes.push({ ...n, ...p, ring: 2 });
  });
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const pair = (a: string, b: string): Link => ({ a, b, d: curve(byId[a].x, byId[a].y, byId[b].x, byId[b].y) });
  const links: Link[] = [];
  INNER.forEach((n, i) => {
    links.push(pair("ai", n.id));
    links.push(pair(n.id, OUTER[i].id));
    links.push(pair(n.id, OUTER[(i + 4) % 5].id));
    links.push(pair(OUTER[i].id, OUTER[(i + 1) % 5].id));
  });
  return { nodes, links };
}

type Signal = { key: number; d: string };

type Props = { className?: string };

/**
 * The living revenue ecosystem. Eleven nodes connected into one system:
 * links draw in, the ring drifts, signals travel, hover isolates a node's
 * connections, and the whole system responds to scroll.
 */
export function Ecosystem({ className }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(wrap, { margin: "-10% 0px -10% 0px" });
  const [active, setActive] = useState<string | null>(null);
  const [signals, setSignals] = useState<Signal[]>([]);
  const seq = useRef(0);
  const { nodes, links } = useMemo(() => buildGraph(), []);

  // Orbital drift — the whole system rotates, labels counter-rotate.
  const time = useTime();
  const rotate = useTransform(time, (t) => (reduce ? 0 : (t / 1000) * 1.1));
  const neg = useTransform(rotate, (r) => -r);
  const groupT = useMotionTemplate`rotate(${rotate} ${C} ${C})`;

  // Scroll response — parallax + glow intensifies as the hero scrolls.
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const glow = useTransform(scrollYProgress, [0, 0.6], [0.45, 1]);
  const sys = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  // Fire a signal down a random link every 1.5s. Inlined as an effect rather
  // than useInterval so the random pick sits inside the effect, where impure
  // calls belong.
  const play = inView && !reduce;
  useEffect(() => {
    if (!play) return;
    const timeouts = new Set<number>();
    const id = window.setInterval(() => {
      const l = links[Math.floor(Math.random() * links.length)];
      const key = seq.current++;
      setSignals((s) => [...s.slice(-5), { key, d: l.d }]);
      const t = window.setTimeout(() => {
        timeouts.delete(t);
        setSignals((s) => s.filter((x) => x.key !== key));
      }, 1700);
      timeouts.add(t);
    }, 1500);
    return () => {
      window.clearInterval(id);
      timeouts.forEach((t) => window.clearTimeout(t));
    };
  }, [play, links]);

  const activeNode = nodes.find((n) => n.id === active) ?? null;
  const hot = (l: Link) => !!active && (l.a === active || l.b === active);
  const dimNode = (n: Node) => !!active && n.id !== active && !links.some((l) => (l.a === active && l.b === n.id) || (l.b === active && l.a === n.id));

  return (
    <div ref={wrap} className={cn("relative mx-auto w-full max-w-[560px]", className)}>
      <motion.div style={{ opacity: glow }} className="pointer-events-none absolute inset-[12%] rounded-full bg-accent/30 blur-3xl" aria-hidden />
      <motion.div style={{ y, scale: sys }} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: EASE, delay: 0.2 }} className="relative aspect-square w-full">
        <svg viewBox="0 0 600 600" className="h-full w-full overflow-visible" role="img" aria-label="The Mindlox AI revenue ecosystem: AI connected to billing, coding, claims, denials, A/R, credentialing, eligibility, payments, analytics, and patient billing.">
          <defs>
            <linearGradient id="eco-link" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="var(--accent)" stopOpacity="0.9" />
              <stop offset="1" stopColor="var(--accent-2)" stopOpacity="0.9" />
            </linearGradient>
            <radialGradient id="eco-core">
              <stop offset="0" stopColor="var(--accent-2)" />
              <stop offset="1" stopColor="var(--accent)" />
            </radialGradient>
            <filter id="eco-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* rings */}
          <circle cx={C} cy={C} r={R_INNER} fill="none" stroke="var(--line)" strokeDasharray="2 8" />
          <circle cx={C} cy={C} r={R_OUTER} fill="none" stroke="var(--line)" strokeDasharray="2 8" />

          <motion.g transform={groupT}>
            {links.map((l, i) => {
              const h = hot(l);
              return (
                <motion.path
                  key={`${l.a}-${l.b}`}
                  d={l.d}
                  fill="none"
                  stroke={h ? "var(--accent-2)" : "url(#eco-link)"}
                  strokeWidth={h ? 2 : 1}
                  strokeLinecap="round"
                  filter={h ? "url(#eco-glow)" : undefined}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: active ? (h ? 1 : 0.1) : 0.5 }}
                  transition={{ pathLength: { duration: 1.4, ease: EASE, delay: 0.35 + i * 0.04 }, opacity: { duration: 0.4 } }}
                />
              );
            })}

            {signals.map((s) => (
              <circle key={s.key} r={3.2} fill="var(--accent-2)" filter="url(#eco-glow)">
                <animateMotion dur="1.4s" path={s.d} fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1" keyTimes="0;1" />
              </circle>
            ))}

            {nodes.map((n, i) => (
              <NodeView
                key={n.id}
                n={n}
                index={i}
                neg={neg}
                active={active === n.id}
                dim={dimNode(n)}
                onEnter={() => setActive(n.id)}
                onLeave={() => setActive(null)}
                onToggle={() => setActive((a) => (a === n.id ? null : n.id))}
              />
            ))}
          </motion.g>
        </svg>
      </motion.div>

      {/* caption */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-2 flex justify-center lg:justify-start">
        <AnimatePresence mode="wait">
          {activeNode ? (
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="max-w-xs rounded-xl glass-strong px-4 py-3 shadow-e3"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">{activeNode.label}</p>
              <p className="mt-1 text-sm leading-snug text-fg">{activeNode.caption}</p>
            </motion.div>
          ) : (
            <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 1.6, duration: 0.6 }} className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-3">
              One connected system · hover or tap a node
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function NodeView({
  n,
  index,
  neg,
  active,
  dim,
  onEnter,
  onLeave,
  onToggle,
}: {
  n: Node;
  index: number;
  neg: ReturnType<typeof useTransform<number, number>>;
  active: boolean;
  dim: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
}) {
  const t = useMotionTemplate`rotate(${neg} ${n.x} ${n.y})`;
  const r = n.ring === 0 ? 36 : n.ring === 1 ? 22 : 19;
  const core = n.ring === 0;
  return (
    <motion.g
      transform={t}
      animate={{ opacity: dim ? 0.3 : 1 }}
      transition={{ duration: 0.35 }}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onClick={onToggle}
      onFocus={onEnter}
      onBlur={onLeave}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${n.label}: ${n.caption}`}
      aria-pressed={active}
      className="cursor-pointer outline-none"
    >
      {active && (
        <motion.circle
          cx={n.x}
          cy={n.y}
          r={r}
          fill="none"
          stroke="var(--accent-2)"
          strokeWidth={1.5}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: [0.7, 0], scale: [1, 1.9] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          style={{ originX: 0.5, originY: 0.5 }}
        />
      )}
      <motion.circle
        cx={n.x}
        cy={n.y}
        r={r}
        fill={core ? "url(#eco-core)" : "var(--bg-2)"}
        stroke={active ? "var(--accent-2)" : core ? "transparent" : "var(--line-strong)"}
        strokeWidth={active ? 2 : 1}
        filter={core || active ? "url(#eco-glow)" : undefined}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.5 + index * 0.06 }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
      {core ? (
        <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="15" fontWeight="700" fontFamily="var(--font-display)" fill="#fff" style={{ pointerEvents: "none" }}>
          AI
        </text>
      ) : (
        <circle cx={n.x} cy={n.y} r={4} fill={active ? "var(--accent-2)" : "var(--accent)"} style={{ pointerEvents: "none" }} />
      )}
      <motion.text
        x={n.x}
        y={n.y + r + 16}
        textAnchor="middle"
        fontSize="11.5"
        fontWeight={active ? 600 : 500}
        fontFamily="var(--font-sans)"
        fill={active ? "var(--fg)" : "var(--fg-2)"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 + index * 0.06, duration: 0.6 }}
        style={{ pointerEvents: "none" }}
      >
        {n.label}
      </motion.text>
    </motion.g>
  );
}

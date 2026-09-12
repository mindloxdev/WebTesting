"use client";

import { AnimatePresence, motion, useInView, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useId, useRef, useState, type RefObject } from "react";
import { useInterval, useMedia, useMounted } from "@/lib/hooks";
import { EASE, SPRING } from "@/lib/motion";
import { cn, pad2 } from "@/lib/utils";
import { DemoBadge } from "@/components/ui/DemoBadge";

const STAGES = [
  { name: "Patient Visit", caption: "Demographics + insurance captured" },
  { name: "Eligibility", caption: "270/271 coverage verified" },
  { name: "Coding", caption: "CPT · ICD-10 reviewed by a certified coder" },
  { name: "Claim", caption: "Scrubbed against payer edits · 837P built" },
  { name: "Payer", caption: "Tracked daily · adjudicated" },
  { name: "Payment", caption: "835 posted · contract variance 0%" },
  { name: "A/R", caption: "Worked by value × timely-filing risk" },
  { name: "Revenue", caption: "Predictable. Visible. Yours." },
];

/* Node coordinates — the path is a Catmull-Rom curve through these exact points. */
const DESKTOP: [number, number][] = [
  [58, 252],
  [160, 170],
  [262, 108],
  [366, 128],
  [466, 226],
  [566, 262],
  [664, 190],
  [752, 92],
];
const MOBILE: [number, number][] = [
  [96, 48],
  [252, 138],
  [104, 236],
  [252, 336],
  [104, 436],
  [252, 536],
  [104, 636],
  [252, 736],
];

function smoothPath(points: [number, number][]) {
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const t = 0.2;
    d += ` C${p1[0] + (p2[0] - p0[0]) * t},${p1[1] + (p2[1] - p0[1]) * t} ${p2[0] - (p3[0] - p1[0]) * t},${p2[1] - (p3[1] - p1[1]) * t} ${p2[0]},${p2[1]}`;
  }
  return d;
}

type Props = {
  /** Hero container — scrolling it away drives the stage index. */
  scrollTarget?: RefObject<HTMLElement | null>;
  className?: string;
};

/**
 * The Revenue Engine: eight stages on a glowing path. Dollar particles flow
 * continuously, stages illuminate one by one on load and follow scroll after
 * the visitor moves. The active node "hums" (motion only, never sound).
 */
export function RevenueEngine({ scrollTarget, className }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { margin: "-10% 0px -10% 0px" });
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const desktop = useMedia("(min-width: 1024px)");

  const [auto, setAuto] = useState(0);
  const [scrollIdx, setScrollIdx] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({ target: scrollTarget, offset: ["start start", "end start"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.04) setScrollIdx(Math.min(7, Math.floor(v * 9)));
    else setScrollIdx(null);
  });

  useInterval(() => setAuto((a) => a + 1), inView && !reduce ? (auto < 8 ? 640 : 2200) : null);

  const lit = Math.min(7, auto);
  const active = scrollIdx ?? (auto <= 7 ? auto : auto % 8);

  return (
    <div ref={wrap} className={cn("relative", className)}>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">The revenue engine · 8 stages</span>
        <DemoBadge label="Illustrative" />
      </div>

      {/* Desktop — horizontal S-curve */}
      <div className="relative hidden lg:block">
        <EngineSvg points={DESKTOP} w={800} h={330} active={active} lit={lit} particles={mounted && desktop && !reduce} />
        <Caption points={DESKTOP} w={800} h={330} active={active} />
      </div>

      {/* Mobile — vertical */}
      <div className="lg:hidden">
        <MobileCaption active={active} />
        <EngineSvg points={MOBILE} w={360} h={790} vertical active={active} lit={lit} particles={mounted && !desktop && !reduce} />
      </div>
    </div>
  );
}

function EngineSvg({
  points,
  w,
  h,
  vertical,
  active,
  lit,
  particles,
}: {
  points: [number, number][];
  w: number;
  h: number;
  vertical?: boolean;
  active: number;
  lit: number;
  particles: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const d = smoothPath(points);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full overflow-visible" role="img" aria-label="Revenue engine: patient visit to revenue">
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2={vertical ? "0" : "1"} y2={vertical ? "1" : "0"}>
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
        <filter id={`${id}-blur`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* glow */}
      <path d={d} fill="none" stroke={`url(#${id}-g)`} strokeWidth={12} opacity={0.32} filter={`url(#${id}-blur)`} />
      {/* rail */}
      <motion.path
        id={`${id}-path`}
        d={d}
        fill="none"
        stroke={`url(#${id}-g)`}
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduce ? 0 : 1.8, ease: EASE }}
      />
      {/* flowing dash */}
      {!reduce && (
        <path d={d} fill="none" stroke="var(--accent-2)" strokeWidth={1.4} strokeDasharray="4 8" strokeLinecap="round" opacity={0.7} className="animate-dash" />
      )}

      {/* dollar particles */}
      {particles &&
        Array.from({ length: 8 }).map((_, i) => {
          const dur = 7 + (i % 3) * 1.5;
          const begin = `${-(i * 1.1)}s`;
          const glyph = i % 3 === 0;
          return (
            <g key={i}>
              <circle r={glyph ? 9 : 5} fill="var(--accent-2)" opacity={0.18}>
                <animateMotion dur={`${dur}s`} begin={begin} repeatCount="indefinite">
                  <mpath href={`#${id}-path`} />
                </animateMotion>
              </circle>
              {glyph ? (
                <text fontSize="10" fontFamily="var(--font-mono)" fontWeight="600" fill="var(--accent-2)" textAnchor="middle" dominantBaseline="central">
                  $
                  <animateMotion dur={`${dur}s`} begin={begin} repeatCount="indefinite">
                    <mpath href={`#${id}-path`} />
                  </animateMotion>
                </text>
              ) : (
                <circle r={2.6} fill="var(--accent-2)">
                  <animateMotion dur={`${dur}s`} begin={begin} repeatCount="indefinite">
                    <mpath href={`#${id}-path`} />
                  </animateMotion>
                </circle>
              )}
            </g>
          );
        })}

      {/* nodes */}
      {points.map((p, i) => {
        const isLit = i <= lit;
        const isActive = i === active;
        const left = vertical && p[0] < w / 2;
        return (
          <g key={i}>
            {isActive && !reduce && (
              <motion.circle
                cx={p[0]}
                cy={p[1]}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={1.5}
                initial={{ r: 14, opacity: 0.7 }}
                animate={{ r: [14, 32], opacity: [0.7, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <motion.circle
              cx={p[0]}
              cy={p[1]}
              fill={isActive ? "var(--accent)" : isLit ? "color-mix(in oklab, var(--accent) 22%, var(--bg))" : "var(--bg)"}
              stroke={isLit ? "var(--accent)" : "var(--line-strong)"}
              strokeWidth={1.5}
              initial={{ r: 13 }}
              animate={{ r: isActive ? 16 : 13 }}
              transition={SPRING}
              style={isActive ? { filter: "drop-shadow(0 0 10px var(--glow))" } : undefined}
            />
            <text
              x={p[0]}
              y={p[1] + 3.5}
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="var(--font-mono)"
              fill={isActive ? "var(--accent-fg)" : isLit ? "var(--accent)" : "var(--fg-3)"}
            >
              {pad2(i + 1)}
            </text>
            <text
              x={vertical ? p[0] + (left ? -26 : 26) : p[0]}
              y={vertical ? p[1] + 4 : p[1] + 34}
              textAnchor={vertical ? (left ? "end" : "start") : "middle"}
              fontSize="11.5"
              fontFamily="var(--font-sans)"
              fontWeight={isActive ? 600 : 500}
              fill={isActive ? "var(--fg)" : isLit ? "var(--fg-2)" : "var(--fg-3)"}
            >
              {STAGES[i].name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Caption({ points, w, h, active }: { points: [number, number][]; w: number; h: number; active: number }) {
  const p = points[active];
  const flipY = p[1] < 150;
  return (
    <div
      className="pointer-events-none absolute z-10"
      style={{
        left: `${(p[0] / w) * 100}%`,
        top: `${(p[1] / h) * 100}%`,
        transform: flipY ? "translate(-50%, 38px)" : "translate(-50%, calc(-100% - 30px))",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: flipY ? -6 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: flipY ? -4 : 4 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="whitespace-nowrap rounded-xl glass-strong px-3 py-2 shadow-e2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">{STAGES[active].name}</span>
          <p className="text-xs text-fg">{STAGES[active].caption}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function MobileCaption({ active }: { active: number }) {
  return (
    <div className="mb-4 h-[52px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="flex items-center gap-3 rounded-xl glass-strong px-3 py-2.5"
        >
          <span className="font-mono text-xs text-accent">{pad2(active + 1)}</span>
          <div>
            <p className="text-sm font-medium text-fg">{STAGES[active].name}</p>
            <p className="text-xs text-fg-2">{STAGES[active].caption}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

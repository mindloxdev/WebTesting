"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Cursor-following radial highlight (desktop only). */
  spotlight?: boolean;
  /** Lift + shadow on hover. */
  lift?: boolean;
  as?: "div" | "article" | "li";
  padding?: "none" | "sm" | "md" | "lg";
  onClick?: () => void;
  role?: string;
  tabIndex?: number;
  ariaPressed?: boolean;
};

const PAD = { none: "", sm: "p-5", md: "p-6 lg:p-7", lg: "p-8 lg:p-10" } as const;

/** Layered surface. Hairline border, soft elevation, optional spotlight. */
export function Card({
  children,
  className,
  spotlight = true,
  lift = true,
  as = "div",
  padding = "md",
  onClick,
  role,
  tabIndex,
  ariaPressed,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!spotlight || e.pointerType !== "mouse") return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    },
    [spotlight],
  );

  const Comp = as as "div";

  return (
    <Comp
      ref={ref}
      onPointerMove={onMove}
      onClick={onClick}
      role={role}
      tabIndex={tabIndex}
      aria-pressed={ariaPressed}
      className={cn(
        "group/card relative overflow-hidden card-surface transition-[transform,box-shadow,border-color] duration-500 ease-out-expo",
        lift && "hover:-translate-y-1 hover:border-line-strong hover:shadow-e3",
        onClick && "cursor-pointer",
        PAD[padding],
        className,
      )}
    >
      {spotlight && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 spotlight opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        />
      )}
      <div className="relative">{children}</div>
    </Comp>
  );
}

"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCallback, useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "glass";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  /** Label that slides in on hover (e.g. "Start Your Revenue Review"). */
  hoverLabel?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Trailing arrow. */
  arrow?: boolean;
  /** Cursor-following pull on fine-pointer devices. */
  magnetic?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  ariaLabel?: string;
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-fg shadow-e2 hover:shadow-glow hover:brightness-110 active:brightness-95",
  secondary:
    "bg-fg text-bg hover:opacity-90",
  outline:
    "hairline text-fg bg-transparent hover:border-line-strong hover:bg-accent-soft",
  ghost:
    "text-fg hover:bg-fg/5",
  glass:
    "glass text-fg hover:border-line-strong hover:shadow-e2",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm gap-1.5",
  md: "h-12 px-6 text-[15px] gap-2",
  lg: "h-14 px-8 text-base gap-2.5",
  xl: "h-16 px-10 text-lg gap-3",
};

/**
 * Primary CTA. Magnetic on desktop (subtle 0.22 pull), spring return,
 * optional label morph on hover, always keyboard-accessible.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  hoverLabel,
  variant = "primary",
  size = "md",
  arrow = false,
  magnetic = true,
  type = "button",
  disabled,
  className,
  fullWidth,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 320, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 320, damping: 22, mass: 0.5 });

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!magnetic || e.pointerType !== "mouse") return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      mx.set(dx * 0.22);
      my.set(dy * 0.28);
    },
    [magnetic, mx, my],
  );

  const onLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  const classes = cn(
    "group relative inline-flex select-none items-center justify-center whitespace-nowrap rounded-full font-medium tracking-[-0.01em]",
    "transition-[box-shadow,background-color,color,border-color,filter,opacity] duration-300 ease-out-expo",
    "disabled:pointer-events-none disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
    fullWidth && "w-full",
  );

  const content = (
    <>
      {hoverLabel ? (
        <span className="relative block overflow-hidden">
          <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-[120%]">
            {children}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 block translate-y-[120%] transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
          >
            {hoverLabel}
          </span>
        </span>
      ) : (
        <span>{children}</span>
      )}
      {arrow && (
        <ArrowRight
          className="size-[1.05em] shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
          strokeWidth={2.2}
          aria-hidden
        />
      )}
    </>
  );

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("inline-block", fullWidth && "w-full", className)}
    >
      {href ? (
        <Link href={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
          {content}
        </Link>
      ) : (
        <button type={type} className={classes} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
          {content}
        </button>
      )}
    </motion.div>
  );
}

/** Text link with a travelling arrow — the tertiary CTA. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 font-medium text-accent transition-colors hover:text-fg",
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight
        className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
        strokeWidth={2.2}
        aria-hidden
      />
    </Link>
  );
}

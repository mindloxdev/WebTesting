import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "accent" | "positive" | "negative" | "warning";
  size?: "sm" | "md";
};

const TONES = {
  neutral: "border-line bg-bg-2 text-fg-2",
  accent: "border-accent/25 bg-accent-soft text-accent",
  positive: "border-positive/25 bg-positive/10 text-positive",
  negative: "border-negative/25 bg-negative/10 text-negative",
  warning: "border-warning/30 bg-warning/10 text-warning",
} as const;

export function Tag({ children, className, tone = "neutral", size = "sm" }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

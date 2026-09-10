import { cn } from "@/lib/utils";

type Props = {
  label?: "Demo Data" | "Illustrative Data" | "Example Dashboard" | "Illustrative Estimate" | "Demo Testimonial" | "Placeholder" | (string & {});
  className?: string;
  tone?: "neutral" | "accent";
};

/** Every piece of sample data wears one of these. Integrity is a feature. */
export function DemoBadge({ label = "Demo Data", className, tone = "neutral" }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em]",
        tone === "neutral" ? "border-line bg-bg/60 text-fg-3" : "border-accent/30 bg-accent-soft text-accent",
        className,
      )}
    >
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping-soft rounded-full bg-current opacity-60" />
        <span className="relative inline-flex size-1.5 rounded-full bg-current" />
      </span>
      {label}
    </span>
  );
}

import Link from "next/link";
import { cn } from "@/lib/utils";
import { BRAND } from "@/data/site";

type Props = {
  className?: string;
  size?: number;
  wordmark?: boolean;
  href?: string;
};

/** Mark: a rounded tile with an "M" drawn as a revenue pulse. */
export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id="mlx-g" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
      <rect width="28" height="28" rx="8" fill="url(#mlx-g)" />
      <path
        d="M6.5 19.5 L10.2 9 L14 16.2 L17.8 9 L21.5 19.5"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="21" r="1.4" fill="#fff" />
    </svg>
  );
}

export function Logo({ className, size = 28, wordmark = true, href = "/" }: Props) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2.5 rounded-md text-fg", className)}
      aria-label={`${BRAND.name} — home`}
    >
      <LogoMark size={size} />
      {wordmark && (
        <span className="flex items-baseline gap-1.5 font-display text-[17px] font-bold tracking-[-0.02em]">
          <span>{BRAND.wordmark}</span>
          <span className="rounded-[5px] bg-accent-soft px-1.5 py-px font-mono text-[10px] font-semibold tracking-[0.12em] text-accent">
            {BRAND.suffix}
          </span>
        </span>
      )}
    </Link>
  );
}

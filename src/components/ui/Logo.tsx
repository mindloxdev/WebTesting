import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BRAND } from "@/data/site";
import logoMark from "../../../public/logo.png";

type Props = {
  className?: string;
  size?: number;
  wordmark?: boolean;
  href?: string;
};

/** Natural aspect ratio of the mark (368 × 420), used to derive width from height. */
const ASPECT = logoMark.width / logoMark.height;

/**
 * The Mindlox AI mark: a circuit hexagon around a lightbulb.
 * `size` is the rendered height in pixels; width follows the artwork's ratio.
 */
export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  // Request 3x the display size so the mark stays sharp on high-density screens,
  // then let CSS scale it down to `size`. next/image picks the source width from
  // the `width` prop, so asking for the display size alone renders it soft.
  const intrinsic = size * 3;
  return (
    <Image
      src={logoMark}
      alt=""
      aria-hidden
      height={intrinsic}
      width={Math.round(intrinsic * ASPECT)}
      priority
      quality={95}
      className={cn("shrink-0 select-none", className)}
      style={{ height: size, width: "auto" }}
    />
  );
}

export function Logo({ className, size = 30, wordmark = true, href = "/" }: Props) {
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

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Seconds per loop. */
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  gap?: string;
};

/** Infinite horizontal scroller. Content is duplicated once for a seamless loop. */
export function Marquee({ children, className, speed = 40, reverse, pauseOnHover = true, gap = "3rem" }: Props) {
  return (
    <div className={cn("group/m relative w-full overflow-hidden fade-mask-x", className)}>
      <div
        className={cn(
          "flex w-max animate-marquee will-change-transform",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover/m:[animation-play-state:paused]",
        )}
        style={{ animationDuration: `${speed}s`, gap }}
      >
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" style={{ gap }} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

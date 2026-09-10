"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { CTA } from "@/data/site";
import { EASE } from "@/lib/motion";
import { MagneticButton } from "@/components/ui/MagneticButton";

type Props = { label?: string; href?: string };

/** Persistent bottom CTA on mobile — slides in once the hero CTA scrolls away. */
export function MobileCTABar({ label = CTA.primaryShort, href = CTA.auditHref }: Props) {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 480));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
        >
          <div className="glass-strong border-t border-line px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3">
            <div className="flex items-center gap-2">
              <MagneticButton href={href} fullWidth size="lg" magnetic={false} arrow>
                {label}
              </MagneticButton>
              <Link
                href={CTA.specialistHref}
                aria-label={CTA.secondary}
                className="inline-flex size-14 shrink-0 items-center justify-center rounded-full border border-line bg-bg text-fg"
              >
                <MessageSquare className="size-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

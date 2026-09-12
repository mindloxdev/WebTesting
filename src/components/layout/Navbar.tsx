"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CTA, NAV, type NavItem } from "@/data/site";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

type Props = {
  ctaLabel?: string;
  ctaHref?: string;
};

/**
 * Sticky, glass-on-scroll navigation. Shrinks slightly after 24 px,
 * keeps the primary CTA visible at every scroll position.
 */
export function Navbar({ ctaLabel = CTA.primary, ctaHref = CTA.auditHref }: Props) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const enter = useCallback((label: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(label);
  }, []);
  const leave = useCallback(() => {
    closeTimer.current = window.setTimeout(() => setOpen(null), 120);
  }, []);

  const active = NAV.find((n) => n.label === open && n.mega);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-out-expo",
          scrolled || open ? "glass-strong border-b border-line" : "border-b border-transparent",
        )}
        onMouseLeave={leave}
      >
        <div
          className={cn(
            "container-x flex items-center justify-between transition-[height] duration-500 ease-out-expo",
            scrolled ? "h-[60px]" : "h-[76px]",
          )}
        >
          <Logo />

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {NAV.map((item) => (
              <NavLink key={item.label} item={item} open={open === item.label} onEnter={enter} onLeave={leave} />
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle className="h-9 px-2.5" />
            <MagneticButton href={ctaHref} size="sm" hoverLabel={CTA.primaryHover} magnetic={false}>
              <span className="xl:hidden">{CTA.primaryShort}</span>
              <span className="hidden xl:inline">{ctaLabel}</span>
            </MagneticButton>
          </div>

          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-fg lg:hidden"
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            onClick={() => setMobile((m) => !m)}
          >
            {mobile ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {active?.mega && (
            <motion.div
              key={active.label}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="absolute inset-x-0 top-full hidden border-b border-line glass-strong lg:block"
              onMouseEnter={() => enter(active.label)}
              onMouseLeave={leave}
            >
              <div className="container-x grid grid-cols-[1fr_1fr_minmax(0,0.9fr)] gap-10 py-8">
                {active.mega.columns.map((col) => (
                  <div key={col.title}>
                    <p className="eyebrow mb-4">{col.title}</p>
                    <ul className="space-y-1">
                      {col.links.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            className="group block rounded-lg px-3 py-2 transition-colors hover:bg-fg/5"
                            onClick={() => setOpen(null)}
                          >
                            <span className="block text-[15px] font-medium text-fg">{l.label}</span>
                            {l.description && <span className="block text-sm text-fg-3">{l.description}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="rounded-2xl bg-accent-soft p-6">
                  <p className="eyebrow mb-3">Start here</p>
                  <p className="font-display text-xl font-semibold text-fg">
                    Find out where your practice is losing revenue.
                  </p>
                  <p className="mt-2 text-sm text-fg-2">
                    A structured review of denials, A/R aging, coding, and underpayments — findings are yours to keep.
                  </p>
                  <div className="mt-5">
                    <MagneticButton href={ctaHref} size="sm" arrow magnetic={false}>
                      {CTA.primaryShort}
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-bg pt-[76px] lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <motion.nav
              className="container-x flex-1 overflow-y-auto pb-32 pt-4"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
            >
              {NAV.map((item) => (
                <MobileItem key={item.label} item={item} onNavigate={() => setMobile(false)} />
              ))}
              <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} className="mt-4 flex flex-wrap gap-2">
                <ThemeToggle showLabel className="h-12 px-4" />
              </motion.div>
            </motion.nav>
            <div className="container-x fixed inset-x-0 bottom-0 border-t border-line glass-strong py-4">
              <MagneticButton href={ctaHref} fullWidth size="lg" magnetic={false} onClick={() => setMobile(false)}>
                {ctaLabel}
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  item,
  open,
  onEnter,
  onLeave,
}: {
  item: NavItem;
  open: boolean;
  onEnter: (l: string) => void;
  onLeave: () => void;
}) {
  const base =
    "inline-flex h-10 items-center gap-1 whitespace-nowrap rounded-full px-3 text-[14px] font-medium text-fg-2 transition-colors hover:text-fg";
  if (!item.mega) {
    return (
      <Link href={item.href} className={base} onMouseEnter={() => onEnter("")}>
        {item.label}
      </Link>
    );
  }
  return (
    <div onMouseEnter={() => onEnter(item.label)} onMouseLeave={onLeave} className="relative">
      <Link
        href={item.href}
        className={cn(base, open && "text-fg")}
        aria-haspopup="true"
        aria-expanded={open}
        onFocus={() => onEnter(item.label)}
      >
        {item.label}
        <ChevronDown
          className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")}
          aria-hidden
        />
      </Link>
    </div>
  );
}

function MobileItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const v = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };
  if (!item.mega) {
    return (
      <motion.div variants={v}>
        <Link
          href={item.href}
          onClick={onNavigate}
          className="flex min-h-14 items-center border-b border-line font-display text-2xl font-semibold text-fg"
        >
          {item.label}
        </Link>
      </motion.div>
    );
  }
  return (
    <motion.div variants={v} className="border-b border-line">
      <button
        type="button"
        className="flex min-h-14 w-full items-center justify-between font-display text-2xl font-semibold text-fg"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
      >
        {item.label}
        <ChevronDown className={cn("size-5 transition-transform duration-300", expanded && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-1 pb-4 sm:grid-cols-2">
              {item.mega.columns.flatMap((c) => c.links).map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={onNavigate}
                  className="rounded-lg px-2 py-2.5 text-base text-fg-2 hover:bg-fg/5 hover:text-fg"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

import { LogoMark } from "@/components/ui/Logo";

/**
 * Branded loading state — a pulse and a shimmering hairline, never a spinner.
 * Use inside a <Suspense fallback={<BrandedLoader />}> around any slow,
 * dynamic block (e.g. a future live dashboard). Not mounted as a root
 * loading boundary: every page is static, so HTML renders instantly.
 */
export function BrandedLoader({ label = "Loading Mindlox AI" }: { label?: string }) {
  return (
    <div
      data-scheme="dark"
      className="theme-ultimate flex min-h-[60vh] flex-col items-center justify-center bg-bg text-fg"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="relative flex items-center justify-center">
        <span className="absolute size-16 animate-ping-soft rounded-2xl bg-accent/40" aria-hidden />
        <span className="absolute size-16 rounded-2xl bg-accent/10 blur-xl" aria-hidden />
        <LogoMark size={44} className="relative" />
      </div>
      <div className="mt-8 h-0.5 w-44 overflow-hidden rounded-full skeleton" aria-hidden />
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-3">{label}</p>
    </div>
  );
}

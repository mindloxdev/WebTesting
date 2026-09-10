import { Reveal } from "@/components/ui/Reveal";

const HINTS: { keys: string[]; label: string }[] = [
  { keys: ["⌘", "K"], label: "Search any claim" },
  { keys: ["G", "D"], label: "Denials queue" },
  { keys: ["G", "A"], label: "A/R by payer" },
  { keys: ["?"], label: "Ask the assistant" },
];

/** Linear-style keyboard hints — decorative, signals interface-grade software. */
export function KbdHints() {
  return (
    <Reveal delay={0.2} className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-hidden>
      {HINTS.map((h) => (
        <span key={h.label} className="inline-flex items-center gap-2 font-mono text-[11px] text-fg-3">
          <span className="flex gap-1">
            {h.keys.map((k) => (
              <kbd key={k} className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-line bg-bg-2 px-1.5 text-[11px] text-fg-2 shadow-e1">
                {k}
              </kbd>
            ))}
          </span>
          {h.label}
        </span>
      ))}
    </Reveal>
  );
}

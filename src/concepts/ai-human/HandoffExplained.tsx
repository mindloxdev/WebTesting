import { RefreshCw, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

const STEPS = [
  {
    icon: Sparkles,
    n: "01",
    title: "AI finds",
    detail: "Every claim, remittance, and eligibility response is scored and compared — denial risk, contract variance, coverage mismatches, payer patterns. Thousands of checks, continuously.",
    chips: ["Denial-risk scoring", "Contract variance", "Eligibility mismatch"],
  },
  {
    icon: UserCheck,
    n: "02",
    title: "Human decides",
    detail: "A certified coder, denial specialist, or A/R strategist picks up each finding with the context attached. They make the call, file the appeal, correct the claim, talk to the payer.",
    chips: ["Named specialist", "Payer-specific playbooks", "Audit trail"],
  },
  {
    icon: RefreshCw,
    n: "03",
    title: "System learns",
    detail: "Resolutions feed back into front-end prevention: the same denial doesn't recur, the same payer pattern is caught earlier, the queue gets smarter every week.",
    chips: ["Prevention loop", "Weekly reviews", "Pattern library"],
  },
];

/** "The handoff, explained" — AI finds → Human decides → System learns. */
export function HandoffExplained() {
  return (
    <Section tone="muted" id="handoff">
      <SectionHeading
        eyebrow="The handoff, explained"
        title="AI finds it. A specialist owns it. The system gets smarter."
        highlight="A specialist owns it."
        description="Not software you have to learn. Not an agency you have to chase. Decision support for people who work claims every day."
      />
      <RevealGroup className="mt-14 grid gap-4 lg:grid-cols-3" staggerChildren={0.09}>
        {STEPS.map((s) => {
          const Icon = s.icon;
          return (
            <RevealItem key={s.title} className="relative rounded-[22px] border border-line bg-bg p-7 lg:p-8">
              <div className="flex items-center justify-between">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="size-5" />
                </span>
                <span className="font-mono text-xs text-fg-3">{s.n}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold text-fg">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{s.detail}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {s.chips.map((c) => (
                  <li key={c} className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-3">
                    {c}
                  </li>
                ))}
              </ul>
            </RevealItem>
          );
        })}
      </RevealGroup>
      <Reveal className="mt-6">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-bg px-5 py-4 text-sm text-fg-2">
          <ShieldCheck className="size-4 shrink-0 text-positive" />
          Responsible by design: AI assists and prioritizes. Humans decide. Every action carries an audit trail. No claim is submitted or appealed without a specialist's review.
        </div>
      </Reveal>
    </Section>
  );
}

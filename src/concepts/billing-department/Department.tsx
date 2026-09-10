import { CalendarCheck, Sparkles, UserRound, Waypoints } from "lucide-react";
import { CTA } from "@/data/site";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

type Role = { role: string; initials: string; summary: string; bullets: string[]; ai?: boolean };

const DEPARTMENT: Role[] = [
  {
    role: "Medical Coders",
    initials: "MC",
    summary: "Certified, specialty-aligned coding with documentation feedback.",
    bullets: [
      "Assign CPT, ICD-10-CM, and HCPCS from documentation — modifiers, NCCI edits, and payer rules checked before release",
      "Return documentation-improvement feedback to providers within one business day",
      "Run periodic coding accuracy audits by provider and specialty",
    ],
  },
  {
    role: "Billers",
    initials: "BL",
    summary: "Clean claims out daily; rejections handled within one business day.",
    bullets: [
      "Build and scrub 837P/837I claims daily and transmit through your clearinghouse",
      "Work clearinghouse and payer rejections within one business day, then resubmit corrected claims",
      "Reconcile submitted vs. accepted so nothing falls through the cracks",
    ],
  },
  {
    role: "A/R Specialists",
    initials: "AR",
    summary: "Aging balances worked by payer strategy and timely-filing risk.",
    bullets: [
      "Segment insurance and patient A/R by age, payer, and value",
      "Follow up on a defined cadence with timely-filing limits tracked per payer",
      "Escalate systematic payer behavior to your account manager with evidence",
    ],
  },
  {
    role: "Denial Specialists",
    initials: "DS",
    summary: "Root-cause analysis, prioritized appeals, prevention loops.",
    bullets: [
      "Categorize every denial by CARC/RARC root cause",
      "Prioritize appeals by recoverable value and deadline; write payer-specific appeals with clinical support",
      "Feed prevention rules back to the front end so the same denial doesn't recur",
    ],
  },
  {
    role: "Credentialing Specialists",
    initials: "CS",
    summary: "Enrollment, CAQH, and re-credentialing tracked to completion.",
    bullets: [
      "Manage CAQH profiles, payer applications, and re-credentialing calendars",
      "Track enrollment status by provider and payer with effective dates",
      "Set up EDI, ERA, and EFT connectivity so remittances arrive electronically",
    ],
  },
  {
    role: "Account Managers",
    initials: "AM",
    summary: "Your named point of contact, weekly reviews, clear escalation.",
    bullets: [
      "One person who knows your practice, your payers, and your providers",
      "Run the weekly performance review and the monthly strategy session",
      "Own escalations and keep leadership informed in plain language",
    ],
  },
  {
    role: "AI Automation",
    initials: "AI",
    ai: true,
    summary: "Denial risk, underpayment, and eligibility detection at scale.",
    bullets: [
      "Score denial risk before submission and flag coding conflicts for coder review",
      "Detect underpayments against contracted rates and eligibility mismatches",
      "Rank the A/R work queue by value, likelihood, and timely-filing risk",
    ],
  },
];

const WORKING = [
  { icon: CalendarCheck, title: "A weekly review", detail: "A 30-minute standing call: what was submitted, paid, denied — and the few things that need your input." },
  { icon: UserRound, title: "A named account manager", detail: "One person with a direct line. Response within one business day. [Confirm SLA before publishing.]" },
  { icon: Waypoints, title: "A clear escalation path", detail: "Account manager → RCM director → leadership, with defined response windows. [Placeholder windows.]" },
];

/** "Meet the department" — seven roles, expanded responsibilities, and how the team plugs into yours. */
export function Department({ className }: { className?: string }) {
  return (
    <Section id="department" className={className}>
      <SectionHeading
        eyebrow="Meet the department"
        title="Seven roles. One team that already knows your specialty."
        highlight="One team"
        description="Not a shared inbox. A department with named people, defined responsibilities, and AI doing the repetitive work so the specialists can focus on exceptions."
      />

      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerChildren={0.06}>
        {DEPARTMENT.map((r) => (
          <RevealItem key={r.role} className={cn(r.ai && "lg:col-span-1")}>
            <Card className={cn("h-full", r.ai && "border-accent/30")} padding="md">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "inline-flex size-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold transition-transform duration-500 ease-out-expo group-hover/card:scale-110",
                    r.ai ? "bg-accent text-accent-fg" : "bg-accent-3/20 text-fg",
                  )}
                >
                  {r.ai ? <Sparkles className="size-5" /> : r.initials}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-fg">{r.role}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">{r.ai ? "AI-assisted · human-reviewed" : "Dedicated to your practice"}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-fg-2">{r.summary}</p>
              <ul className="mt-4 space-y-2 border-t border-line pt-4">
                {r.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-sm leading-snug text-fg">
                    <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent-2" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-start">
        <SectionHeading
          eyebrow="How the team works with yours"
          size="md"
          title="Plugged into your practice, not bolted on."
          description="Your front desk, your providers, and your office manager keep doing what they do. The department handles everything from the encounter to the posted payment — and tells you what it found."
        >
          <MagneticButton href={CTA.auditHref} arrow hoverLabel="Assemble My Team">
            Build My RCM Team
          </MagneticButton>
        </SectionHeading>
        <RevealGroup className="grid gap-3" staggerChildren={0.08}>
          {WORKING.map((w) => (
            <RevealItem key={w.title} className="flex gap-4 rounded-2xl border border-line bg-bg-2/70 p-5">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <w.icon className="size-5" />
              </span>
              <div>
                <p className="font-display text-base font-semibold text-fg">{w.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-fg-2">{w.detail}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <Reveal className="mt-12 rounded-2xl border border-dashed border-line p-5 text-center font-mono text-[11px] text-fg-3">
        Team composition scales with your volume and specialties. Roles shown are illustrative of a typical engagement.
      </Reveal>
    </Section>
  );
}

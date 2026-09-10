import { Eye, FileSignature, KeyRound, Lock, ShieldCheck, Users } from "lucide-react";
import { CTA } from "@/data/site";
import { Card } from "@/components/ui/Card";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TextReveal } from "@/components/ui/TextReveal";

const MODULES = [
  {
    icon: ShieldCheck,
    title: "HIPAA-Conscious Workflows",
    detail: "Minimum-necessary access, secure data handling, and workforce training built into every workflow that touches PHI.",
    confirm: false,
  },
  {
    icon: FileSignature,
    title: "Business Associate Agreements",
    detail: "Where applicable, Mindlox AI enters into a BAA with your organization before any protected data is exchanged.",
    confirm: true,
  },
  {
    icon: KeyRound,
    title: "Role-Based Access & Audit Trails",
    detail: "Every specialist sees only what their role requires. Every touch on a claim is logged with who, what, and when.",
    confirm: false,
  },
  {
    icon: Lock,
    title: "Data Protection",
    detail: "Encryption in transit and at rest, secure connectivity to your systems, and documented incident response.",
    confirm: true,
  },
  {
    icon: Users,
    title: "Named Account Team",
    detail: "A named account manager and a dedicated team — real people with a direct line, not a ticket queue.",
    confirm: false,
  },
  {
    icon: Eye,
    title: "Live Claim-Level Visibility",
    detail: "Every claim has a status you can see. Every dollar has a trail. Dashboards update daily, not monthly.",
    confirm: false,
  },
];

const PROMISES = ["You never chase your billing company.", "Every claim has a status you can see.", "Every dollar has a trail."];

/** Transparency promises — three statements as a designed strip. */
export function PromisesStrip() {
  return (
    <div className="border-y border-line bg-bg-2/60">
      <RevealGroup className="container-x grid divide-line md:grid-cols-3 md:divide-x" staggerChildren={0.1}>
        {PROMISES.map((p, i) => (
          <RevealItem key={p} className="flex items-start gap-4 py-8 md:px-8 md:first:pl-0 md:last:pr-0">
            <span className="font-mono text-xs text-accent">0{i + 1}</span>
            <p className="font-display text-xl font-semibold text-fg lg:text-2xl">{p}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}

/** Trust designed as a system: six modules, each a visible commitment. */
export function TrustArchitecture({ className }: { className?: string }) {
  return (
    <Section id="trust" className={className}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Trust architecture"
            size="md"
            title="Trust isn't a footer link. It's how the company is built."
            highlight="how the company is built."
            description="Healthcare buyers buy trust first. So we designed it as a system — security, agreements, access, and visibility you can point to."
          />
          <Reveal className="mt-8">
            <MagneticButton href={CTA.specialistHref} arrow variant="outline" hoverLabel="Request Security Documentation">
              Ask About Security & BAAs
            </MagneticButton>
          </Reveal>
          <Reveal className="mt-6">
            <p className="font-mono text-[11px] leading-relaxed text-fg-3">
              Certifications, attestations, and client references are shown only when verified. Items marked [confirm] require legal review before publishing.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="grid gap-4 sm:grid-cols-2" staggerChildren={0.07}>
          {MODULES.map((m) => (
            <RevealItem key={m.title}>
              <Card className="h-full" padding="md">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-transform duration-500 ease-out-expo group-hover/card:scale-110">
                  <m.icon className="size-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-fg">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-2">{m.detail}</p>
                {m.confirm && <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-warning">[Confirm before publishing]</p>}
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <div className="mt-20 rounded-[22px] border border-line bg-bg-2/60 p-8 text-center lg:p-12">
        <TextReveal as="p" text="If you can't see it, it isn't managed. We built Mindlox AI so you can always see it." highlight="you can always see it." className="mx-auto max-w-3xl font-display text-display-sm font-semibold text-fg" />
      </div>
    </Section>
  );
}

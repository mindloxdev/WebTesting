import { INTEGRATIONS } from "@/data/content";
import { CTA } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { EcosystemOrbit } from "@/components/visuals/EcosystemOrbit";

type Props = { className?: string; tone?: "default" | "muted"; id?: string };

/** EHR / EMR / PM ecosystem. Wording rule: integration support, never a confirmed integration. */
export function IntegrationsSection({ className, tone = "muted", id = "integrations" }: Props) {
  return (
    <Section id={id} tone={tone} className={className}>
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal delay={0.1}>
          <EcosystemOrbit />
        </Reveal>
        <div>
          <SectionHeading
            eyebrow="Systems"
            title="Connect your existing systems. Keep your workflows."
            highlight="existing systems."
            description="Mindlox AI works within the EHR, EMR, and practice management systems you already use — integration support and compatible workflows, confirmed during discovery."
          />
          <RevealGroup className="mt-8 flex flex-wrap gap-2" staggerChildren={0.04}>
            {INTEGRATIONS.map((i) => (
              <RevealItem key={i.name}>
                <span className="inline-flex items-center rounded-full border border-line bg-bg px-3 py-1.5 text-sm text-fg-2">
                  {i.name}
                  {i.note && <span className="ml-2 font-mono text-[10px] text-fg-3">{i.note}</span>}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-4">
            <p className="font-mono text-[11px] text-fg-3">
              Integration support and compatible workflows. Specific connectivity is confirmed per practice during discovery.
            </p>
          </Reveal>
          <Reveal className="mt-8">
            <MagneticButton href={CTA.specialistHref} arrow variant="outline" hoverLabel="Ask About My EHR">
              Ask About Your EHR
            </MagneticButton>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

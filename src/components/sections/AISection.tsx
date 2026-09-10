import { AI_CAPABILITIES } from "@/data/content";
import { CTA } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { AIDetectionFeed } from "@/components/visuals/AIDetectionFeed";
import { NeuralNetwork } from "@/components/visuals/NeuralNetwork";

type Props = { className?: string; tone?: "default" | "muted"; id?: string; feed?: boolean; moreHref?: string };

/** "Meet the Intelligence Behind Mindlox AI." Responsible AI language only. */
export function AISection({ className, tone = "default", id = "ai", feed = true, moreHref }: Props) {
  return (
    <Section id={id} tone={tone} className={className}>
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Intelligence"
            title="Meet the intelligence behind Mindlox AI."
            highlight="intelligence"
            description="AI-assisted pattern detection and decision support that works alongside our billing professionals — not instead of them. It finds. Specialists decide."
          />
          <RevealGroup className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2" staggerChildren={0.05}>
            {AI_CAPABILITIES.map((c) => (
              <RevealItem key={c.title} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-2" aria-hidden />
                <div>
                  <p className="font-medium text-fg">{c.title}</p>
                  <p className="text-sm text-fg-2">{c.detail}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-10 flex flex-wrap gap-3">
            <MagneticButton href={CTA.auditHref} arrow variant="outline" hoverLabel="See It on My Claims">
              See What AI Finds in Your Claims
            </MagneticButton>
            {moreHref && (
              <MagneticButton href={moreHref} variant="ghost" arrow>
                How the technology works
              </MagneticButton>
            )}
          </Reveal>
        </div>
        <div className="space-y-4">
          <Reveal delay={0.1} className="rounded-[22px] border border-line bg-bg-2/60 p-4 lg:p-6">
            <NeuralNetwork />
          </Reveal>
          {feed && (
            <Reveal delay={0.2}>
              <AIDetectionFeed compact max={3} />
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  );
}

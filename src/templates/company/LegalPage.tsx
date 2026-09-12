import { Frame } from "@/components/layout/Frame";
import { PageHero, FinalCTA } from "@/components/sections";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export type LegalSection = { heading: string; paragraphs: string[]; bullets?: string[] };

/** Effective date shown on every policy page. Update when a policy changes. */
export const LEGAL_UPDATED = "September 12, 2026";

type Props = {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  crumb: string;
  sections: LegalSection[];
  updated?: string;
};

/** Long-form policy document with a sticky on-page outline. */
export function LegalPage({ eyebrow, title, highlight, description, crumb, sections, updated = LEGAL_UPDATED }: Props) {
  return (
    <Frame scheme="light" theme="theme-ultimate">
      <PageHero crumbs={[{ label: "Policies", href: "/policies" }, { label: crumb }]} eyebrow={eyebrow} title={title} highlight={highlight} description={description} size="lg" />
      <Section tight>
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3">Last updated</p>
            <p className="text-sm text-fg-2">{updated}</p>
            <nav aria-label="On this page" className="mt-6 hidden lg:block">
              <ul className="space-y-2">
                {sections.map((s, i) => (
                  <li key={s.heading}>
                    <a href={`#s-${i + 1}`} className="text-sm text-fg-2 hover:text-accent">
                      {i + 1}. {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <div className="max-w-3xl">
            {sections.map((s, i) => (
              <Reveal key={s.heading} y={12} className="mb-10">
                <h2 id={`s-${i + 1}`} className="scroll-mt-28 font-display text-2xl font-semibold text-fg">
                  {i + 1}. {s.heading}
                </h2>
                {s.paragraphs.map((p, j) => (
                  <p key={j} className="mt-3 text-[15px] leading-relaxed text-fg-2">
                    {p}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="mt-3 space-y-1.5">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-[15px] text-fg-2">
                        <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
      <FinalCTA variant="mesh" />
    </Frame>
  );
}

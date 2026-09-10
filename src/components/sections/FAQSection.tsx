import { FAQ } from "@/data/content";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowLink } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

type Props = {
  className?: string;
  tone?: "default" | "muted";
  id?: string;
  limit?: number;
  /** Link to the full FAQ when `limit` hides some questions. */
  moreHref?: string;
};

export function FAQSection({ className, tone = "default", id = "faq", limit, moreHref = "/resources#faq" }: Props) {
  const items = limit ? FAQ.slice(0, limit) : FAQ;
  return (
    <Section id={id} tone={tone} className={className}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading eyebrow="FAQ" title="Straight answers." description="Onboarding, pricing, security, specialties, and how we actually use AI. If it's not here, ask an RCM specialist." size="md" />
        <Reveal delay={0.1}>
          <Accordion items={items} />
          {limit && limit < FAQ.length && (
            <div className="mt-5 flex justify-end">
              <ArrowLink href={moreHref}>All {FAQ.length} questions</ArrowLink>
            </div>
          )}
        </Reveal>
      </div>
    </Section>
  );
}

import type { Metadata } from "next";
import { Frame } from "@/components/layout/Frame";
import { PageHero, FinalCTA } from "@/components/sections";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { PitchForm } from "@/components/blog/PitchForm";
import { CONTACT } from "@/data/site";

const SITE = "https://mindlox.ai";

export const metadata: Metadata = {
  title: "Write for us",
  description:
    "Pitch an article to the Mindlox AI blog. We publish practical writing on medical billing and revenue cycle management from people who work claims — with a byline, credentials, and an author page.",
  alternates: { canonical: "/blog/write-for-us" },
};

const STEPS = [
  {
    n: "01",
    title: "Send a pitch",
    body: "A proposed headline and a few sentences on what the post would cover. No draft needed yet — we would rather shape the angle with you first than have you write something we cannot run.",
  },
  {
    n: "02",
    title: "We reply either way",
    body: "A billing specialist reads every pitch, usually within a few working days. If it overlaps something we have already covered or planned, we will say so and suggest an angle that does not.",
  },
  {
    n: "03",
    title: "Send the draft by email",
    body: "Once we have agreed the angle, email the draft as a Google Doc or .docx. Plain headings, bullets and paragraphs — no tracked changes or embedded images.",
  },
  {
    n: "04",
    title: "We edit and publish",
    body: "We copy-edit, fact-check against payer and CMS sources, and publish under your byline with your credentials, bio, and an author page listing your work.",
  },
];

const WANTED = [
  "One specific question answered properly — 'Prior authorization for ASCs' beats 'RCM best practices'.",
  "Written for someone who works claims for a living and already knows what a CARC is.",
  "Concrete: the actual denial code, the actual workflow, the actual deadline.",
  "A clear next action. A post that describes a problem without one is not finished.",
  "800–1,500 words is the usual range, but length follows the topic.",
];

const NOT_WANTED = [
  "Guaranteed outcomes. No 'eliminates denials', no promised percentages.",
  "Numbers without a nameable source — CMS, a payer policy, or a published study.",
  "Any real patient or claim detail. Examples must be illustrative and look it.",
  "Vendor pitches, link insertions, or AI-generated filler. We can tell, and we will decline.",
  "Anything already covered on the blog, unless you are adding something genuinely new.",
];

export default function WriteForUsPage() {
  return (
    <Frame theme="theme-ultimate">
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: SITE },
          { name: "Blog", url: `${SITE}/blog` },
          { name: "Write for us", url: `${SITE}/blog/write-for-us` },
        ])}
      />

      <PageHero
        crumbs={[{ label: "Blog", href: "/blog" }, { label: "Write for us" }]}
        eyebrow="Write for us"
        title="Know something practitioners need to know?"
        highlight="need to know?"
        description="We publish billers, coders, credentialing specialists, and practice managers who have worked the problem they are writing about. You get a byline, your credentials, and an author page. Pitch the idea first — the draft comes later."
        primary={{ label: "Read the blog", href: "/blog" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />

      <Section id="how" tone="muted">
        <SectionHeading
          eyebrow="How it works"
          size="md"
          title="Pitch first, write second."
          description="Four steps, and no work wasted on something we were never going to run."
        />
        <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4" staggerChildren={0.06}>
          {STEPS.map((s) => (
            <RevealItem key={s.n}>
              <Card className="h-full" padding="md">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">{s.n}</span>
                <h2 className="mt-4 font-display text-lg font-semibold leading-snug text-fg">{s.title}</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-2">{s.body}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section id="standards">
        <SectionHeading
          eyebrow="What we publish"
          size="md"
          title="The bar, stated plainly."
          description="So you can decide before writing whether this is worth your time."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <Card padding="lg" className="h-full">
              <p className="eyebrow mb-5 text-positive">What gets published</p>
              <ul className="space-y-3">
                {WANTED.map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-fg-2">
                    <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-positive" aria-hidden />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card padding="lg" className="h-full">
              <p className="eyebrow mb-5 !text-fg-3">What gets declined</p>
              <ul className="space-y-3">
                {NOT_WANTED.map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-fg-2">
                    <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-fg/25" aria-hidden />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section id="pitch" tone="muted">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Your pitch"
              size="md"
              title="Tell us the idea."
              description="Two minutes. We reply either way."
            />
            <p className="mt-6 text-fg-2">
              Prefer email? Send the same details to{" "}
              <a href={CONTACT.emailHref} className="font-medium text-accent underline underline-offset-[3px]">
                {CONTACT.email}
              </a>{" "}
              with &ldquo;Blog pitch&rdquo; in the subject line.
            </p>
            <p className="mt-4 text-sm text-fg-3">
              We do not accept file uploads here — once we have agreed the angle, the draft comes by email.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <PitchForm />
          </Reveal>
        </div>
      </Section>

      <FinalCTA />
    </Frame>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, PenLine } from "lucide-react";
import { Frame } from "@/components/layout/Frame";
import { PageHero, FinalCTA } from "@/components/sections";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { CTA } from "@/data/site";
import { formatDate, readingTime, sortedPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical articles on medical billing and revenue cycle management from the Mindlox AI team: clean claims, denials, timely filing, eligibility, and out-of-network claims.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  // Newest first, every post in one grid. sortedPosts() does the ordering.
  const posts = sortedPosts();

  return (
    <Frame theme="theme-ultimate">
      <JsonLd data={breadcrumbLd([{ name: "Home", url: "https://mindlox.ai/" }, { name: "Blog", url: "https://mindlox.ai/blog" }])} />

      <PageHero
        crumbs={[{ label: "Blog" }]}
        eyebrow="Blog"
        title="Notes from the revenue cycle."
        highlight="revenue cycle."
        description="Practical, specific articles written by people who work claims every day. No jargon for its own sake, no numbers we cannot stand behind."
        primary={{ label: CTA.primary, hoverLabel: CTA.primaryHover }}
        secondary={{ label: CTA.secondary }}
      />

      <Section id="all">
        <SectionHeading eyebrow="All articles" size="md" title="Read by topic." description="Metrics, denials, A/R, the front end, and out-of-network claims." />
        <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3" staggerChildren={0.06}>
          {posts.map((p) => (
            <RevealItem key={p.slug}>
              <Card className="h-full" padding="md">
                <Link href={`/blog/${p.slug}`} className="block after:absolute after:inset-0" aria-label={p.title}>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">{p.category}</span>
                    <ArrowUpRight className="size-4 text-fg-3 transition-all duration-500 ease-out-expo group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-accent" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-fg">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-2">{p.excerpt}</p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">
                    {formatDate(p.date)} · {readingTime(p)} min read
                  </p>
                </Link>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section id="write-for-us" tone="muted" tight>
        <Reveal>
          {/* Card renders its children inside its own wrapper, so the row layout
              belongs here rather than on the Card itself. */}
          <Card padding="lg">
            <div className="lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="max-w-2xl">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <PenLine className="size-5" />
                </span>
                <h2 className="mt-5 font-display text-display-sm font-semibold text-fg">Write for us.</h2>
                <p className="mt-3 text-lg leading-relaxed text-fg-2">
                  We publish billers, coders, and practice managers who have worked the problem they are writing about.
                  You get a byline, your credentials, and an author page. Pitch the idea first — the draft comes later.
                </p>
              </div>
              <div className="mt-7 shrink-0 lg:mt-0">
                <MagneticButton href="/blog/write-for-us" size="lg" arrow>
                  Pitch an article
                </MagneticButton>
              </div>
            </div>
          </Card>
        </Reveal>
      </Section>

      <FinalCTA />
    </Frame>
  );
}

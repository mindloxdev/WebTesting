import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Frame } from "@/components/layout/Frame";
import { PageHero, FinalCTA } from "@/components/sections";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
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
  const posts = sortedPosts();
  const [featured, ...rest] = posts;

  return (
    <Frame scheme="light" theme="theme-ultimate">
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

      <Section id="featured" tone="muted" tight>
        <RevealGroup staggerChildren={0.08}>
          <RevealItem>
            <Card padding="lg" className="lg:grid lg:grid-cols-[1fr_1.2fr] lg:gap-12">
              <Link href={`/blog/${featured.slug}`} className="block after:absolute after:inset-0" aria-label={featured.title}>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">Latest</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">{featured.category}</span>
                </div>
                <h2 className="mt-5 font-display text-display-sm font-semibold text-fg">{featured.title}</h2>
              </Link>
              <div className="mt-6 lg:mt-0">
                <p className="text-lg leading-relaxed text-fg-2">{featured.excerpt}</p>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3">
                  {formatDate(featured.date)} · {readingTime(featured)} min read
                </p>
              </div>
            </Card>
          </RevealItem>
        </RevealGroup>
      </Section>

      <Section id="all">
        <SectionHeading eyebrow="All articles" size="md" title="Read by topic." description="Metrics, denials, A/R, the front end, and out-of-network claims." />
        <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3" staggerChildren={0.06}>
          {rest.map((p) => (
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

      <FinalCTA />
    </Frame>
  );
}

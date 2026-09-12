import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Calculator } from "lucide-react";
import { Frame } from "@/components/layout/Frame";
import { PageHero, FAQSection, FinalCTA } from "@/components/sections";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { formatDate, readingTime, sortedPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Resources",
  description: "Free tools, practical articles, and straight answers on medical billing and revenue cycle management from Mindlox AI.",
  alternates: { canonical: "/resources" },
};

const JUMP = [
  { label: "Revenue Leakage Calculator", href: "#tools" },
  { label: "From the blog", href: "#blog" },
  { label: "FAQ", href: "#faq" },
  { label: "Policies", href: "/policies" },
];

export default function ResourcesPage() {
  const posts = sortedPosts().slice(0, 3);

  return (
    <Frame theme="theme-ultimate">
      <JsonLd data={breadcrumbLd([{ name: "Home", url: "https://mindlox.ai/" }, { name: "Resources", url: "https://mindlox.ai/resources" }])} />

      <PageHero
        crumbs={[{ label: "Resources" }]}
        eyebrow="Resources"
        title="Tools, articles, and straight answers for revenue leaders."
        highlight="revenue leaders."
        description="Practical and specific, written by people who work claims every day. Start with a number, read the thinking behind it, and get answers before any sales call."
        aside={
          <nav aria-label="On this page" className="rounded-[22px] border border-line bg-bg p-6 shadow-e3">
            <p className="eyebrow mb-4">Jump to</p>
            <ul className="space-y-2">
              {JUMP.map((j) => (
                <li key={j.href}>
                  <a href={j.href} className="inline-flex items-center gap-1.5 text-sm text-fg-2 transition-colors hover:text-accent">
                    {j.label} <ArrowRight className="size-3.5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      {/* Tools — self-serve value before any sales call. */}
      <Section id="tools" tight>
        <SectionHeading eyebrow="Tools" size="md" title="Start with a number." description="Free, instant, and fully explained — no sales call required." />
        <RevealGroup className="mt-10 grid gap-4 md:grid-cols-3" staggerChildren={0.06}>
          <RevealItem>
            <Card className="h-full" padding="md">
              <Link href="/revenue-leakage-calculator" className="block after:absolute after:inset-0" aria-label="Open the Revenue Leakage Calculator">
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Calculator className="size-4" aria-hidden />
                  </span>
                  <ArrowUpRight className="size-4 text-fg-3 transition-all duration-500 ease-out-expo group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-accent" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-fg">Revenue Leakage Calculator</h3>
                <p className="mt-2 text-sm text-fg-2">Estimate what denials, aging A/R, and underpayments cost your practice each month — every assumption shown.</p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">Interactive · 2 min</p>
              </Link>
            </Card>
          </RevealItem>
        </RevealGroup>
      </Section>

      {/* Blog */}
      <Section id="blog" tone="muted">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="From the blog" size="md" title="Notes from the revenue cycle." description="Clean claims, denial codes, timely filing, eligibility, and out-of-network claims — explained the way we explain them to clients." />
          <Reveal className="lg:mb-2">
            <Link href="/blog" className="inline-flex items-center gap-1.5 font-medium text-accent transition-colors hover:text-fg">
              All articles <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
        <RevealGroup className="mt-10 grid gap-4 md:grid-cols-3" staggerChildren={0.06}>
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

      <FAQSection id="faq" />

      <FinalCTA />
    </Frame>
  );
}

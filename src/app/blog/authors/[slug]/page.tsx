import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Frame } from "@/components/layout/Frame";
import { PageHero, FinalCTA } from "@/components/sections";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { CTA } from "@/data/site";
import { CONTRIBUTORS, getAuthor } from "@/data/authors";
import { formatDate, postsByAuthor, readingTime } from "@/data/blog";

const SITE = "https://mindlox.ai";

export const dynamicParams = false;

export function generateStaticParams() {
  return CONTRIBUTORS.map((a) => ({ slug: a.id }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  return {
    title: `${author.name} — ${author.role}`,
    description: author.bio,
    alternates: { canonical: `/blog/authors/${author.id}` },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author || author.id === "mindlox-team") notFound();

  const posts = postsByAuthor(author.id);
  const url = `${SITE}/blog/authors/${author.id}`;

  return (
    <Frame theme="theme-ultimate">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: author.name,
            jobTitle: author.role,
            description: author.bio,
            url,
            ...(author.url ? { sameAs: [author.url] } : {}),
            ...(author.staff ? { worksFor: { "@type": "Organization", name: "Mindlox AI", url: SITE } } : {}),
          },
          breadcrumbLd([
            { name: "Home", url: SITE },
            { name: "Blog", url: `${SITE}/blog` },
            { name: author.name, url },
          ]),
        ]}
      />

      <PageHero
        crumbs={[{ label: "Blog", href: "/blog" }, { label: author.name }]}
        eyebrow={author.staff ? author.role : "Guest contributor"}
        title={author.name}
        description={author.bio}
        primary={{ label: CTA.primary, hoverLabel: CTA.primaryHover }}
        secondary={{ label: CTA.secondary }}
      />

      <Section id="posts" tone="muted">
        <div className="flex items-end justify-between gap-6">
          <p className="eyebrow">
            {posts.length} {posts.length === 1 ? "article" : "articles"}
          </p>
          {author.url && (
            <a
              href={author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-accent"
            >
              Profile <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>

        <RevealGroup className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3" staggerChildren={0.06}>
          {posts.map((p) => (
            <RevealItem key={p.slug}>
              <Card className="h-full" padding="md">
                <Link href={`/blog/${p.slug}`} className="block after:absolute after:inset-0" aria-label={p.title}>
                  <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
                    {p.category}
                  </span>
                  <h2 className="mt-5 font-display text-lg font-semibold leading-snug text-fg">{p.title}</h2>
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

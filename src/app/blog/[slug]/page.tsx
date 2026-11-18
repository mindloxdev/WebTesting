import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Frame } from "@/components/layout/Frame";
import { Breadcrumbs, FinalCTA } from "@/components/sections";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { JsonLd, articleLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { CTA, SITE_URL } from "@/data/site";
import { allPosts, formatDate, getPost, readingTime, sortedPosts } from "@/data/blog";
import { Prose } from "@/components/blog/Prose";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { pageMetadata, withSuffix } from "@/lib/seo";

const SITE = SITE_URL;

export const dynamicParams = false;

export function generateStaticParams() {
  return allPosts().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: withSuffix(post.title),
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    article: { publishedTime: post.date },
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE}/blog/${post.slug}`;
  const more = sortedPosts().filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <Frame theme="theme-ultimate">
      <JsonLd
        data={[
          articleLd({
            headline: post.title,
            description: post.excerpt,
            url,
            datePublished: post.date,
            // No post carries a revision date yet, so published is the honest
            // value for dateModified. Replace it with a real one when posts
            // start recording edits.
            dateModified: post.date,
            // The team byline is the organization itself; a named contributor
            // is a Person with their own author page.
            author:
              post.author === "mindlox-team"
                ? undefined
                : { name: post.authorRef.name, url: `${SITE}/blog/authors/${post.author}` },
          }),
          breadcrumbLd([
            { name: "Home", url: SITE },
            { name: "Blog", url: `${SITE}/blog` },
            { name: post.title, url },
          ]),
        ]}
      />

      <article>
        <header className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-24">
          <div className="pointer-events-none absolute inset-0 mesh-bg opacity-70" aria-hidden />
          <div className="container-x relative">
            <div className="max-w-3xl">
              <Reveal y={8} className="mb-6">
                <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.category }]} />
              </Reveal>
              <Reveal y={10} className="mb-5">
                <Eyebrow>{post.category}</Eyebrow>
              </Reveal>
              <TextReveal as="h1" text={post.title} immediate delay={0.1} className="text-display-lg font-bold text-fg" />
              <Reveal delay={0.5} className="mt-6">
                <p className="text-lg leading-relaxed text-fg-2 lg:text-xl">{post.excerpt}</p>
              </Reveal>
              <Reveal delay={0.6} className="mt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3">
                  {post.author === "mindlox-team" ? (
                    post.authorRef.name
                  ) : (
                    <Link href={`/blog/authors/${post.author}`} className="text-fg-2 hover:text-accent">
                      {post.authorRef.name}
                    </Link>
                  )}{" "}
                  · {formatDate(post.date)} · {readingTime(post)} min read
                </p>
              </Reveal>
            </div>
          </div>
        </header>

        <div className="container-x pb-20 lg:pb-32">
          <Reveal delay={0.1} className="max-w-3xl">
            <Prose blocks={post.body} />
          </Reveal>

          <Reveal className="mt-14 max-w-3xl">
            <AuthorCard author={post.authorRef} />
          </Reveal>

          <Reveal className="mt-8 max-w-3xl rounded-[22px] border border-line bg-bg-2/60 p-6 lg:p-8">
            <p className="eyebrow mb-3">Put this to work</p>
            <p className="font-display text-xl font-semibold text-fg">See how these numbers look in your own practice.</p>
            <p className="mt-2 text-fg-2">A free revenue audit reviews your denials, A/R aging, coding patterns, and underpayments. The findings are yours to keep.</p>
            <div className="mt-5">
              <MagneticButton href={CTA.auditHref} arrow hoverLabel={CTA.primaryHover}>
                {CTA.primary}
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </article>

      <section className="border-t border-line bg-bg-2 py-14 lg:py-20" aria-label="More articles">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <p className="eyebrow">More from the blog</p>
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-accent">
              All articles <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {more.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group block h-full rounded-2xl border border-line bg-bg p-5 transition-colors hover:border-line-strong">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">{p.category}</span>
                  <p className="mt-3 font-display text-lg font-semibold leading-snug text-fg group-hover:text-accent">{p.title}</p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">{readingTime(p)} min read</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA />
    </Frame>
  );
}

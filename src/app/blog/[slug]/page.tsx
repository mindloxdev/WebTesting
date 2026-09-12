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
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { CTA } from "@/data/site";
import { POSTS, formatDate, getPost, readingTime, sortedPosts, type BlogBlock } from "@/data/blog";

const SITE = "https://mindlox.ai";

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.date },
  };
}

function Block({ b }: { b: BlogBlock }) {
  if (b.type === "h2") return <h2 className="mt-10 font-display text-2xl font-semibold text-fg">{b.text}</h2>;
  if (b.type === "quote")
    return (
      <blockquote className="my-8 border-l-2 border-accent pl-5 font-display text-xl font-medium leading-snug text-fg">{b.text}</blockquote>
    );
  if (b.type === "ul")
    return (
      <ul className="mt-4 space-y-2.5">
        {b.items.map((it) => (
          <li key={it} className="flex gap-3 text-[16px] leading-relaxed text-fg-2">
            <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    );
  return <p className="mt-4 text-[16px] leading-relaxed text-fg-2">{b.text}</p>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE}/blog/${post.slug}`;
  const more = sortedPosts().filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <Frame scheme="light" theme="theme-ultimate">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: { "@type": "Organization", name: "Mindlox AI", url: SITE },
            publisher: { "@type": "Organization", name: "Mindlox AI", url: SITE },
            mainEntityOfPage: url,
          },
          breadcrumbLd([
            { name: "Home", url: SITE },
            { name: "Blog", url: `${SITE}/blog` },
            { name: post.title, url },
          ]),
        ]}
      />

      <article>
        <header className="relative overflow-hidden pt-32 pb-12 lg:pt-44 lg:pb-16">
          <div className="pointer-events-none absolute inset-0 mesh-bg opacity-70" aria-hidden />
          <div className="container-x relative max-w-3xl">
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
                {post.author} · {formatDate(post.date)} · {readingTime(post)} min read
              </p>
            </Reveal>
          </div>
        </header>

        <div className="container-x pb-20 lg:pb-28">
          <Reveal delay={0.1} className="max-w-3xl">
            {post.body.map((b, i) => (
              <Block key={i} b={b} />
            ))}
          </Reveal>

          <Reveal className="mt-14 max-w-3xl rounded-[22px] border border-line bg-bg-2/60 p-6 lg:p-8">
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

      <section className="border-t border-line bg-bg-2 py-16 lg:py-20" aria-label="More articles">
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

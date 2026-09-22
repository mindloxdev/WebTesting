/* ------------------------------------------------------------------ */
/*  BLOG — one Markdown file per post in src/content/blog.             */
/*                                                                      */
/*  Add a post: drop a .md file in that folder. No TypeScript, no       */
/*  rebuild of this file, nothing to register. The format and the       */
/*  house style rules are in CONTRIBUTING-BLOG.md at the repo root.     */
/*                                                                      */
/*  Read at module load, which happens during `next build` — every      */
/*  blog route is prerendered, so no file is touched at request time.   */
/*  Validation is strict and throws: a malformed post fails the build   */
/*  and the deploy, rather than shipping a broken page.                 */
/* ------------------------------------------------------------------ */

import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { getAuthor, type Author } from "@/data/authors";
import { inlineText, parseFrontmatter, parseMarkdown, type BlogBlock } from "@/lib/markdown";

export type { BlogBlock, Inline } from "@/lib/markdown";

const DIR = path.join(process.cwd(), "src", "content", "blog");

const Frontmatter = z.object({
  title: z.string().min(1).max(120),
  excerpt: z.string().min(1).max(320),
  category: z.string().min(1),
  /** ISO date, YYYY-MM-DD. */
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  author: z.string().min(1),
  /** Set true to hold a finished draft out of the published site. */
  draft: z.boolean().optional(),
});

export type BlogPost = z.infer<typeof Frontmatter> & {
  slug: string;
  body: BlogBlock[];
  authorRef: Author;
};

function load(): BlogPost[] {
  if (!fs.existsSync(DIR)) return [];

  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(DIR, file), "utf8");

      let data: Record<string, unknown>;
      let body: string;
      try {
        ({ data, body } = parseFrontmatter(raw));
      } catch (e) {
        throw new Error(`blog/${file}: ${(e as Error).message}`);
      }

      const parsed = Frontmatter.safeParse(data);
      if (!parsed.success) {
        const issues = parsed.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`).join("; ");
        throw new Error(`blog/${file}: invalid frontmatter — ${issues}`);
      }

      const authorRef = getAuthor(parsed.data.author);
      if (!authorRef) {
        throw new Error(`blog/${file}: unknown author "${parsed.data.author}". Add them to src/data/authors.ts first.`);
      }

      const blocks = parseMarkdown(body);
      if (blocks.length === 0) throw new Error(`blog/${file}: the post has no body.`);

      return { ...parsed.data, slug, body: blocks, authorRef };
    })
    .filter((p) => !p.draft);
}

let cache: BlogPost[] | null = null;

/**
 * Every post, unsorted.
 *
 * Cached for production, where the files cannot change after the build. In
 * development the directory is re-read on every call, so a post saved in
 * Keystatic — or a .md file dropped in by hand — shows up on the next refresh
 * instead of after a server restart.
 */
export function allPosts(): BlogPost[] {
  if (process.env.NODE_ENV !== "production") return load();
  cache ??= load();
  return cache;
}

export const getPost = (slug: string) => allPosts().find((p) => p.slug === slug);

/** Posts newest first. */
export const sortedPosts = () => [...allPosts()].sort((a, b) => (a.date < b.date ? 1 : -1));

export const postsByAuthor = (id: string) => sortedPosts().filter((p) => p.author === id);

/** Approximate reading time in minutes at ~220 words per minute. */
export const readingTime = (post: BlogPost) => {
  const words = post.body
    .map((b) => {
      if (b.type === "ul" || b.type === "ol") return b.items.map(inlineText).join(" ");
      if (b.type === "p") return inlineText(b.content);
      return b.text;
    })
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(2, Math.round(words / 220));
};

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

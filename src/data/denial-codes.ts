/* ------------------------------------------------------------------ */
/*  DENIAL CODES — the library at /denial-codes, built from one JSON   */
/*  file in src/content.                                               */
/*                                                                      */
/*  Every word on those pages comes from src/content/denial-codes.json. */
/*  Nothing here writes medical content: this module validates the      */
/*  file and hands it to the templates, and it throws on a malformed    */
/*  entry so a bad edit fails the build rather than shipping a broken   */
/*  page.                                                               */
/*                                                                      */
/*  The file is optional on purpose. Until it exists the library is      */
/*  switched off everywhere — no hub, no code pages, no sitemap entries, */
/*  and the Resources links keep pointing at /denial-reason-explorer.    */
/*  Drop the file in and the whole section turns on, with no other       */
/*  change. The flag the rest of the app reads is HAS_LIBRARY, which     */
/*  lives in ./denial-codes-flag so client components can read it too.   */
/* ------------------------------------------------------------------ */

import "server-only";
import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { HAS_LIBRARY } from "@/data/denial-codes-flag";

export { HAS_LIBRARY, DENIAL_CODES_HREF, DENIAL_CODES_LABEL } from "@/data/denial-codes-flag";

const FILE = path.join(process.cwd(), "src", "content", "denial-codes.json");

/** A line of body copy, or several paragraphs. Written as a string or a list of strings. */
const Prose = z.union([z.string().min(1), z.array(z.string().min(1)).min(1)]);

const GroupCode = z.object({
  /** The group code itself, e.g. "CO". */
  code: z.string().min(1).max(12),
  name: z.string().min(1).max(120),
  meaning: Prose,
});

const Hub = z.object({
  title: z.string().min(1).max(160),
  metaDescription: z.string().min(1).max(320),
  h1: z.string().min(1).max(160),
  intro: Prose,
  groupCodes: z.array(GroupCode).min(1),
});

const Code = z.object({
  /** URL segment, lowercase. The page lives at /denial-codes/<slug>. */
  slug: z.string().min(1).max(80).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase and hyphenated"),
  /** The code as a reader writes it, e.g. "CO-197". Used in the breadcrumb. */
  code: z.string().min(1).max(24),
  title: z.string().min(1).max(160),
  metaDescription: z.string().min(1).max(320),
  h1: z.string().min(1).max(160),
  meaning: Prose,
  whoPays: Prose,
  commonCauses: z.array(z.string().min(1)).min(1),
  howToFix: z.array(z.string().min(1)).min(1),
  howToPrevent: z.array(z.string().min(1)).min(1),
  appealNote: z.string().min(1),
  /** Internal path to the service that owns this code, e.g. "/denial-management". */
  relatedService: z.string().startsWith("/"),
  /** Optional further reading. Empty array or absent means none, and nothing renders. */
  relatedReading: z
    .array(z.object({ label: z.string().min(1), href: z.string().min(1) }))
    .default([]),
});

const Library = z.object({
  hub: Hub,
  codes: z.array(Code).min(1),
  /**
   * Slugs that are planned but unwritten. No page is built for these, and
   * they stay out of the sitemap and the hub list.
   */
  backlogNoindexUntilWritten: z.array(z.string()).default([]),
});

export type DenialGroupCode = z.infer<typeof GroupCode>;
export type DenialHub = z.infer<typeof Hub>;
export type DenialCode = z.infer<typeof Code>;
export type DenialLibrary = z.infer<typeof Library>;

/** Normalize the string-or-list prose fields to a list of paragraphs. */
export const paragraphs = (p: z.infer<typeof Prose>): string[] => (Array.isArray(p) ? p : [p]);

/** First sentence of a prose field — the hub list shows this under each code. */
export function firstSentence(p: z.infer<typeof Prose>): string {
  const text = paragraphs(p)[0];
  const end = text.search(/[.!?](\s|$)/);
  return end === -1 ? text : text.slice(0, end + 1);
}

function load(): DenialLibrary | null {
  if (!fs.existsSync(FILE)) {
    if (HAS_LIBRARY) {
      throw new Error(
        "NEXT_PUBLIC_HAS_DENIAL_LIBRARY says the denial-code library is live, but src/content/denial-codes.json is missing. Restart the build so next.config.ts re-checks.",
      );
    }
    return null;
  }

  let raw: unknown;
  try {
    raw = JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch (e) {
    throw new Error(`src/content/denial-codes.json is not valid JSON — ${(e as Error).message}`);
  }

  const parsed = Library.safeParse(raw);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`).join("; ");
    throw new Error(`src/content/denial-codes.json is invalid — ${issues}`);
  }

  const backlog = new Set(parsed.data.backlogNoindexUntilWritten);
  const codes = parsed.data.codes.filter((c) => !backlog.has(c.slug));

  const seen = new Set<string>();
  for (const c of codes) {
    if (seen.has(c.slug)) throw new Error(`src/content/denial-codes.json: duplicate slug "${c.slug}".`);
    seen.add(c.slug);
  }
  if (codes.length === 0) {
    throw new Error("src/content/denial-codes.json: every code is in backlogNoindexUntilWritten, so there is nothing to build.");
  }

  return { ...parsed.data, codes };
}

let cache: DenialLibrary | null | undefined;

/**
 * The library, or null when the source file is not in the repo yet.
 *
 * Cached for production, where the file cannot change after the build. In
 * development it is re-read on every call, so an edit shows up on the next
 * refresh instead of after a server restart.
 */
export function denialLibrary(): DenialLibrary | null {
  if (process.env.NODE_ENV !== "production") return load();
  if (cache === undefined) cache = load();
  return cache;
}

/** Every code that has a page, in file order. */
export const denialCodes = (): DenialCode[] => denialLibrary()?.codes ?? [];

export const getDenialCode = (slug: string) => denialCodes().find((c) => c.slug === slug);

/** Previous and next code, for the links at the foot of each page. */
export function denialCodeNeighbours(slug: string): { prev: DenialCode | null; next: DenialCode | null } {
  const all = denialCodes();
  const i = all.findIndex((c) => c.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return { prev: all[i - 1] ?? null, next: all[i + 1] ?? null };
}


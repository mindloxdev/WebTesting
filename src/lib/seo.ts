import type { Metadata } from "next";
import { BRAND, SITE_URL } from "@/data/site";

/** The one title suffix. Every page's <title> ends with it, bar none. */
export const TITLE_SUFFIX = ` | ${BRAND.name}`;

/** Append the suffix unless the title already carries it. */
export const withSuffix = (title: string) => (title.endsWith(TITLE_SUFFIX) ? title : `${title}${TITLE_SUFFIX}`);

/**
 * The sitewide share card, rendered by app/opengraph-image.tsx.
 *
 * It has to be named explicitly: Next only folds the opengraph-image file
 * convention in for routes whose metadata does not declare `openGraph`, and
 * every page here declares one so that og:title and og:description can match
 * the page. The route ignores the query string the convention would add.
 */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${BRAND.name} — ${BRAND.tagline}`,
  type: "image/png",
} as const;

/** Absolute URL for a route path. "/" is the bare origin, with no trailing slash. */
export const absoluteUrl = (path: string) => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);

type Args = {
  /** The complete <title>, suffix included. Build it with `withSuffix`. */
  title: string;
  description: string;
  /** Route path, e.g. "/resources" or "/". */
  path: string;
  /** Articles carry their own OG type and publication dates. */
  article?: { publishedTime?: string; modifiedTime?: string };
};

/**
 * One metadata shape for every page.
 *
 * Open Graph is replaced wholesale by the nearest segment that declares it,
 * never merged field by field, and it is not derived from `title` — so a page
 * that sets only `title` and `description` ends up sharing the root layout's
 * homepage preview. Routing every page through this helper is what keeps
 * og:title, og:description, twitter:title and twitter:description equal to the
 * page's own title and meta description.
 */
export function pageMetadata({ title, description, path, article }: Args): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: article ? "article" : "website",
      siteName: BRAND.name,
      url: absoluteUrl(path),
      title,
      description,
      ...(article?.publishedTime ? { publishedTime: article.publishedTime } : null),
      ...(article?.modifiedTime ? { modifiedTime: article.modifiedTime } : null),
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  };
}

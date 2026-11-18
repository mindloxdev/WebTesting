/** Schema.org JSON-LD. Only emit facts the site actually asserts — no fabricated ratings, addresses, or reviews. */
import { BRAND, CONTACT, SITE_URL, SOCIAL } from "@/data/site";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Stable node ids, so every other object can point at these instead of repeating them. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Declared once, in the root layout. Every field is read from the shared
 * config in src/data/site.ts, so the footer, the contact page and this object
 * can never drift apart.
 */
export const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: BRAND.name,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Medical billing and revenue cycle management for U.S. healthcare organizations: experienced billing specialists, intelligent automation and AI-assisted intelligence.",
  email: CONTACT.email,
  telephone: CONTACT.telephone,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.street,
    addressLocality: CONTACT.locality,
    addressRegion: CONTACT.region,
    postalCode: CONTACT.postalCode,
    addressCountry: "US",
  },
  areaServed: { "@type": "Country", name: "United States" },
  sameAs: SOCIAL.filter((s) => s.href.trim().length > 0).map((s) => s.href),
};

export const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: BRAND.name,
  publisher: { "@id": ORGANIZATION_ID },
};

export const serviceLd = (name: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url,
  serviceType: "Medical billing and revenue cycle management",
  provider: { "@id": ORGANIZATION_ID },
  areaServed: { "@type": "Country", name: "United States" },
});

/**
 * Only call this with answers that are rendered on the page. Every accordion
 * keeps all of its answers in the server HTML, so the text here and the text a
 * reader sees are the same string.
 */
export const faqLd = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((i) => ({
    "@type": "Question",
    name: i.q,
    acceptedAnswer: { "@type": "Answer", text: i.a },
  })),
});

export const breadcrumbLd = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.url })),
});

/** Blog posts. `author` stays the organization until the post carries a named byline. */
export const articleLd = ({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  author,
}: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: { name: string; url?: string };
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline,
  description,
  url,
  datePublished,
  dateModified: dateModified ?? datePublished,
  author: author
    ? { "@type": "Person", name: author.name, ...(author.url ? { url: author.url } : null) }
    : { "@type": "Organization", name: BRAND.name, "@id": ORGANIZATION_ID },
  publisher: { "@id": ORGANIZATION_ID },
  mainEntityOfPage: { "@type": "WebPage", "@id": url },
});

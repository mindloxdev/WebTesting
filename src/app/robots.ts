import type { MetadataRoute } from "next";

/** Evaluated per request so a promoted preview build serves the right rules. */
export const dynamic = "force-dynamic";

/**
 * Production (mindlox.ai) is fully crawlable. Preview and development
 * deployments are not, so Vercel preview URLs never compete with the real
 * site in search results. The matching X-Robots-Tag header is set in
 * next.config.ts for belt and braces.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production";

  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: "https://mindlox.ai/sitemap.xml",
    host: "https://mindlox.ai",
  };
}

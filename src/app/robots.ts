import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://mindlox.ai/sitemap.xml",
    host: "https://mindlox.ai",
  };
}

import type { MetadataRoute } from "next";
import { ROOT_SERVICES } from "@/data/services";
import { SPECIALTIES } from "@/data/specialties";
import { COMPARE_PAGES } from "@/data/compare";
import { allPosts } from "@/data/blog";
import { CONTRIBUTORS } from "@/data/authors";

const BASE = "https://mindlox.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly"): MetadataRoute.Sitemap[number] => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "weekly"),
    entry("/services", 0.9),
    ...ROOT_SERVICES.map((s) => entry(`/${s.slug}`, 0.9)),
    entry("/specialties", 0.9),
    ...SPECIALTIES.map((s) => entry(`/specialties/${s.slug}`, 0.8)),
    entry("/switch", 0.8),
    ...COMPARE_PAGES.map((c) => entry(`/compare/${c.slug}`, 0.7)),
    entry("/solutions", 0.8),
    entry("/why-mindlox-ai", 0.8),
    entry("/technology", 0.7),
    entry("/resources", 0.6, "weekly"),
    entry("/blog", 0.7, "weekly"),
    ...allPosts().map((p) => entry(`/blog/${p.slug}`, 0.6)),
    ...CONTRIBUTORS.map((a) => entry(`/blog/authors/${a.id}`, 0.4)),
    entry("/calculator", 0.7),
    entry("/revenue-leakage-calculator", 0.7),
    entry("/where-revenue-leaks", 0.6),
    entry("/about", 0.6),
    entry("/contact", 0.9),
    entry("/careers", 0.5),
    entry("/policies", 0.4),
  ];
}

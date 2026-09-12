import type { Metadata } from "next";
import { Frame } from "@/components/layout/Frame";
import { HomePage } from "@/components/home/HomePage";
import { JsonLd, ORGANIZATION_LD } from "@/components/seo/JsonLd";
import { HOME } from "@/content/home";

export const metadata: Metadata = {
  title: { absolute: HOME.seo.title },
  description: HOME.seo.description,
  alternates: { canonical: "/" },
};

/**
 * Home / landing page. Composition and copy live in src/content/home.ts —
 * edit that file to change text, reorder sections, or switch sections on/off.
 */
export default function Home() {
  return (
    <Frame theme="theme-ultimate">
      <JsonLd data={ORGANIZATION_LD} />
      <HomePage />
    </Frame>
  );
}

import { Frame } from "@/components/layout/Frame";
import { HomePage } from "@/components/home/HomePage";
import { HOME } from "@/content/home";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mindlox AI | AI-Assisted Medical Billing & RCM Company",
  description: HOME.seo.description,
  path: "/",
});

/**
 * Home / landing page. Composition and copy live in src/content/home.ts —
 * edit that file to change text, reorder sections, or switch sections on/off.
 */
export default function Home() {
  return (
    <Frame theme="theme-ultimate">
      {/* Organization and WebSite are declared once, in the root layout. */}
      <HomePage />
    </Frame>
  );
}

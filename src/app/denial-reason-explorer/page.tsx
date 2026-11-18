import { notFound } from "next/navigation";
import { Frame } from "@/components/layout/Frame";
import {
  PageHero,
  FinalCTA,
  LifecycleSection,
  DenialOrigins,
  DenialHowToRead,
  DenialCalculatorCTA,
} from "@/components/sections";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { DenialExplorer } from "@/components/visuals/DenialExplorer";
import { GrowthField } from "@/components/visuals/GrowthField";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { pageMetadata, withSuffix } from "@/lib/seo";
import { SITE_URL } from "@/data/site";
import { HAS_LIBRARY } from "@/data/denial-codes";

export const metadata = pageMetadata({
  title: withSuffix("Denial Reason Explorer"),
  description:
    "The denial codes a practice actually sees — CO-197, CO-16, CO-11 and the rest — sorted by where each one is created, what it means, and what stops it from coming back.",
  path: "/denial-reason-explorer",
});

/**
 * The explorer's original home.
 *
 * Once src/content/denial-codes.json exists the explorer moves to
 * /denial-codes and next.config.ts redirects this path there permanently, so
 * this page is unreachable and returns 404 if the redirect is ever removed —
 * better than quietly serving a second copy of the hub at an old URL.
 */
export default function DenialExplorerPage() {
  if (HAS_LIBRARY) notFound();

  return (
    <Frame theme="theme-ultimate">
      <JsonLd data={breadcrumbLd([{ name: "Home", url: SITE_URL }, { name: "Resources", url: `${SITE_URL}/resources` }, { name: "Denial Reason Explorer", url: `${SITE_URL}/denial-reason-explorer` }])} />
      <PageHero
        crumbs={[{ label: "Resources", href: "/resources" }, { label: "Denial Reason Explorer" }]}
        eyebrow="Free tool"
        title="Every denial has an address."
        highlight="an address."
        description="The codes a practice actually sees, sorted by where each one is created. Pick a stage to see what originates there, or a code to see what it means, why it happens, and what stops it."
        size="lg"
        background={<GrowthField className="absolute inset-x-0 bottom-0 h-[70%] opacity-50 fade-mask-t" />}
      />
      <Section tight className="pt-0">
        <Reveal y={30}>
          <DenialExplorer />
        </Reveal>
      </Section>

      <DenialOrigins />
      <DenialHowToRead />
      <DenialCalculatorCTA />

      <LifecycleSection tone="muted" />
      <FinalCTA form title="Turn the codes into a plan." highlight="a plan." description="A free revenue audit replaces the illustrative shares with your actual denial mix, A/R aging, and payer behavior." />
    </Frame>
  );
}

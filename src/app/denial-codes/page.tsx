import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Frame } from "@/components/layout/Frame";
import {
  PageHero,
  FinalCTA,
  LifecycleSection,
  DenialOrigins,
  DenialHowToRead,
  DenialCalculatorCTA,
} from "@/components/sections";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { DenialExplorer } from "@/components/visuals/DenialExplorer";
import { GrowthField } from "@/components/visuals/GrowthField";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/data/site";
import { denialCodes, denialLibrary, firstSentence, paragraphs } from "@/data/denial-codes";

export function generateMetadata(): Metadata {
  const hub = denialLibrary()?.hub;
  if (!hub) return {};
  return pageMetadata({ title: hub.title, description: hub.metaDescription, path: "/denial-codes" });
}

/**
 * The denial-code library's hub.
 *
 * Copy comes from the `hub` key of src/content/denial-codes.json and the list
 * from `codes` — nothing on this page is written here. The interactive
 * explorer moved from /denial-reason-explorer unchanged; Part A put every
 * code's panel in the server HTML, so the whole thing is crawlable.
 */
export default function DenialCodesPage() {
  const library = denialLibrary();
  if (!library) notFound();

  const { hub } = library;
  const codes = denialCodes();
  const intro = paragraphs(hub.intro);

  return (
    <Frame theme="theme-ultimate">
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: SITE_URL },
          { name: "Resources", url: `${SITE_URL}/resources` },
          { name: "Denial codes", url: `${SITE_URL}/denial-codes` },
        ])}
      />
      <PageHero
        crumbs={[{ label: "Resources", href: "/resources" }, { label: "Denial codes" }]}
        eyebrow="Denial code library"
        title={hub.h1}
        description={intro[0]}
        size="lg"
        background={<GrowthField className="absolute inset-x-0 bottom-0 h-[70%] opacity-50 fade-mask-t" />}
      />

      {/* Any intro paragraphs beyond the one the hero shows. */}
      {intro.length > 1 && (
        <Section tight className="pt-0">
          <Reveal>
            <div className="max-w-3xl">
              {intro.slice(1).map((p) => (
                <p key={p} className="mt-4 text-[15px] leading-relaxed text-fg-2">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </Section>
      )}

      <Section tight className="pt-0">
        <Reveal y={30}>
          <DenialExplorer />
        </Reveal>
      </Section>

      {/* Group codes — what the letters in front of the number mean. */}
      <Section id="group-codes">
        <SectionHeading
          eyebrow="Group codes"
          title="The letters before the number decide who owes the balance."
          highlight="who owes the balance"
          size="md"
        />
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerChildren={0.06}>
          {hub.groupCodes.map((g) => (
            <RevealItem key={g.code} className="rounded-2xl border border-line bg-bg-2/50 p-6">
              <span className="inline-flex items-center rounded-md border border-line bg-bg px-2 py-1 font-mono text-[12px] font-semibold text-fg">
                {g.code}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-fg">{g.name}</h3>
              {paragraphs(g.meaning).map((p) => (
                <p key={p} className="mt-2 text-sm leading-relaxed text-fg-2">
                  {p}
                </p>
              ))}
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* The library itself: one link per code, rendered server-side. */}
      <Section id="codes" tone="muted">
        <SectionHeading
          eyebrow="Every code"
          title={`${codes.length} denial ${codes.length === 1 ? "code" : "codes"}, one page each.`}
          size="md"
          description="What it means, who pays, what causes it, how to fix it, and how to stop it coming back."
        />
        <RevealGroup className="mt-10 grid gap-3 md:grid-cols-2" staggerChildren={0.04}>
          {codes.map((c) => (
            <RevealItem key={c.slug}>
              <Link
                href={`/denial-codes/${c.slug}`}
                className="group/code flex h-full flex-col rounded-2xl border border-line bg-bg p-5 transition-colors hover:border-line-strong"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex shrink-0 items-center rounded-md border border-line bg-bg-2 px-2 py-1 font-mono text-[12px] font-semibold text-fg">
                    {c.code}
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-fg-3 transition-all duration-500 ease-out-expo group-hover/code:-translate-y-0.5 group-hover/code:translate-x-0.5 group-hover/code:text-accent" />
                </div>
                <h3 className="mt-3 font-display text-base font-semibold leading-snug text-fg">{c.h1}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-2">{firstSentence(c.meaning)}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <DenialOrigins tone="default" />
      <DenialHowToRead tone="muted" />
      <DenialCalculatorCTA tone="default" />

      <LifecycleSection tone="muted" />
      <FinalCTA
        form
        title="Turn the codes into a plan."
        highlight="a plan."
        description="A free revenue audit replaces the illustrative shares with your actual denial mix, A/R aging, and payer behavior."
      />
    </Frame>
  );
}

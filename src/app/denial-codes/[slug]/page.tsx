import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Info } from "lucide-react";
import { Frame } from "@/components/layout/Frame";
import { PageHero, FinalCTA } from "@/components/sections";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/data/site";
import { getService } from "@/data/services";
import {
  denialCodeNeighbours,
  denialCodes,
  getDenialCode,
  paragraphs,
  type DenialCode,
} from "@/data/denial-codes";

type Props = { params: Promise<{ slug: string }> };

/** Only the codes in the file get a page. Anything in the backlog is already filtered out. */
export const dynamicParams = false;

export function generateStaticParams() {
  return denialCodes().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const code = getDenialCode(slug);
  if (!code) return {};
  return pageMetadata({ title: code.title, description: code.metaDescription, path: `/denial-codes/${slug}` });
}

/** A prose section: one heading, one or more paragraphs. */
function Prose({ heading, body }: { heading: string; body: DenialCode["meaning"] }) {
  return (
    <Reveal y={12} className="mb-10">
      <h2 className="scroll-mt-28 font-display text-2xl font-semibold tracking-tight text-fg">{heading}</h2>
      {paragraphs(body).map((p) => (
        <p key={p} className="mt-3 text-[15px] leading-relaxed text-fg-2">
          {p}
        </p>
      ))}
    </Reveal>
  );
}

/** A list section: one heading, bulleted items. */
function Bullets({ heading, items, check }: { heading: string; items: string[]; check?: boolean }) {
  return (
    <Reveal y={12} className="mb-10">
      <h2 className="scroll-mt-28 font-display text-2xl font-semibold tracking-tight text-fg">{heading}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-fg">
            {check ? (
              <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-positive/15 text-positive">
                <Check className="size-3" aria-hidden />
              </span>
            ) : (
              <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            )}
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

/**
 * One page per denial code, built entirely from src/content/denial-codes.json.
 * No medical content is written here: every section renders a field of the file.
 */
export default async function DenialCodePage({ params }: Props) {
  const { slug } = await params;
  const code = getDenialCode(slug);
  if (!code) notFound();

  const url = `${SITE_URL}/denial-codes/${code.slug}`;
  const { prev, next } = denialCodeNeighbours(code.slug);
  const service = getService(code.relatedService.replace(/^\//, ""));

  return (
    <Frame theme="theme-ultimate">
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: SITE_URL },
          { name: "Resources", url: `${SITE_URL}/resources` },
          { name: "Denial codes", url: `${SITE_URL}/denial-codes` },
          { name: code.code, url },
        ])}
      />

      <PageHero
        crumbs={[
          { label: "Resources", href: "/resources" },
          { label: "Denial codes", href: "/denial-codes" },
          { label: code.code },
        ]}
        eyebrow={`Denial code ${code.code}`}
        title={code.h1}
        description={paragraphs(code.meaning)[0]}
        size="lg"
      />

      <Section tight>
        <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
          <div className="max-w-3xl">
            <Prose heading="What it means" body={code.meaning} />
            <Prose heading="Who pays" body={code.whoPays} />
            <Bullets heading="Common causes" items={code.commonCauses} />
            <Bullets heading="How to fix it" items={code.howToFix} check />
            <Bullets heading="How to prevent it" items={code.howToPrevent} check />

            {/* appealNote — a short callout, not a section. */}
            <Reveal y={12} className="mb-10">
              <div className="flex gap-3 rounded-2xl border border-accent/25 bg-accent-soft p-5">
                <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <Info className="size-3.5" aria-hidden />
                </span>
                <div>
                  <p className="eyebrow mb-1 text-accent">On appeal</p>
                  <p className="text-sm leading-relaxed text-fg-2">{code.appealNote}</p>
                </div>
              </div>
            </Reveal>

            {/* Previous and next code. */}
            <nav aria-label="Other denial codes" className="flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:justify-between">
              {prev ? (
                <Link href={`/denial-codes/${prev.slug}`} className="group inline-flex items-center gap-2 text-sm text-fg-2 transition-colors hover:text-fg">
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
                  <span>
                    <span className="font-mono text-[12px] text-fg-3">{prev.code}</span> {prev.h1}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link href={`/denial-codes/${next.slug}`} className="group inline-flex items-center gap-2 text-right text-sm text-fg-2 transition-colors hover:text-fg sm:justify-end">
                  <span>
                    <span className="font-mono text-[12px] text-fg-3">{next.code}</span> {next.h1}
                  </span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              )}
            </nav>
          </div>

          {/* Where to go next. */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-line bg-bg-2/50 p-6">
              <p className="eyebrow mb-4">The service that owns it</p>
              <Link href={code.relatedService} className="group inline-flex items-start gap-1.5 font-display text-base font-semibold text-fg transition-colors hover:text-accent">
                {service?.name ?? code.relatedService}
                <ArrowRight className="mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              {service && <p className="mt-2 text-sm leading-relaxed text-fg-2">{service.short}</p>}

              {code.relatedReading.length > 0 && (
                <>
                  <p className="eyebrow mb-3 mt-7">Related reading</p>
                  <ul className="space-y-2.5">
                    {code.relatedReading.map((r) => (
                      <li key={r.href}>
                        <Link href={r.href} className="text-sm text-fg-2 transition-colors hover:text-accent">
                          {r.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <p className="eyebrow mb-3 mt-7">Put a number on it</p>
              <p className="text-sm leading-relaxed text-fg-2">
                Estimate what denials like this cost your practice each month.
              </p>
              <div className="mt-4">
                <MagneticButton href="/revenue-leakage-calculator" size="sm" arrow magnetic={false}>
                  Open the calculator
                </MagneticButton>
              </div>

              <div className="mt-7 border-t border-line pt-6">
                <Link href="/denial-codes" className="text-sm text-fg-2 transition-colors hover:text-accent">
                  All denial codes
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <FinalCTA
        form
        title={`See how often ${code.code} lands on your claims.`}
        highlight={`${code.code}`}
        description={`A free revenue audit shows your actual denial mix, how much of it is ${code.code}, and what it is costing. The findings are yours to keep, whether or not we work together.`}
      />
    </Frame>
  );
}

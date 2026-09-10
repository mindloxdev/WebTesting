import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COMPARE_PAGES, getComparePage } from "@/data/compare";
import { ComparePageView } from "@/concepts/company/ComparePage";

export const dynamicParams = false;

export function generateStaticParams() {
  return COMPARE_PAGES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getComparePage(slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/compare/${page.slug}` },
  };
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getComparePage(slug);
  if (!page) notFound();
  return <ComparePageView data={page} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SPECIALTIES, getSpecialty } from "@/data/specialties";
import { SpecialtyPage } from "@/templates/seo/SpecialtyPage";
import { pageMetadata, withSuffix } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return SPECIALTIES.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getSpecialty(slug);
  if (!s) return {};
  const description = `${s.tagline} Specialty-aligned medical billing, coding, denial management, and A/R recovery for ${s.name} practices from Mindlox AI.`;
  return pageMetadata({
    title: withSuffix(`${s.name} Medical Billing & RCM Services`),
    description,
    path: `/specialties/${s.slug}`,
  });
}

export default async function SpecialtyRoute({ params }: Props) {
  const { slug } = await params;
  const s = getSpecialty(slug);
  if (!s) notFound();
  return <SpecialtyPage specialty={s} />;
}

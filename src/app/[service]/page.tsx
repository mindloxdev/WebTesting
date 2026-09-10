import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ROOT_SERVICES, getService } from "@/data/services";
import { ServicePage } from "@/concepts/seo/ServicePage";

export const dynamicParams = false;

export function generateStaticParams() {
  return ROOT_SERVICES.map((s) => ({ service: s.slug }));
}

type Props = { params: Promise<{ service: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const s = getService(service);
  if (!s || !s.root) return {};
  return {
    title: `${s.name} Services for U.S. Healthcare Providers`,
    description: s.description,
    alternates: { canonical: `/${s.slug}` },
    openGraph: { title: `${s.name} — Mindlox AI`, description: s.description },
  };
}

export default async function ServiceRoute({ params }: Props) {
  const { service } = await params;
  const s = getService(service);
  if (!s || !s.root) notFound();
  return <ServicePage service={s} />;
}

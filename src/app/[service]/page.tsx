import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ROOT_SERVICES, getService } from "@/data/services";
import { ServicePage } from "@/templates/seo/ServicePage";
import { pageMetadata, withSuffix } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return ROOT_SERVICES.map((s) => ({ service: s.slug }));
}

type Props = { params: Promise<{ service: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const s = getService(service);
  if (!s || !s.root) return {};
  return pageMetadata({
    title: withSuffix(`${s.name} Services for U.S. Healthcare Providers`),
    description: s.description,
    path: `/${s.slug}`,
  });
}

export default async function ServiceRoute({ params }: Props) {
  const { service } = await params;
  const s = getService(service);
  if (!s || !s.root) notFound();
  return <ServicePage service={s} />;
}

import { notFound } from "next/navigation";
import RoutePage from "@/components/ReferenceSite/RoutePage";
import {
  getPageMetadata,
  getServiceSlugs,
} from "@/lib/page-metadata";

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!getServiceSlugs().includes(slug)) return {};

  return getPageMetadata(slug);
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  if (!getServiceSlugs().includes(slug)) notFound();

  return <RoutePage slug={slug} />;
}

import RoutePage from "@/components/ReferenceSite/RoutePage";
import { getPageMetadata } from "@/lib/page-metadata";

export const metadata = getPageMetadata("services");

export default function ServicesPage() {
  return <RoutePage slug="services" />;
}

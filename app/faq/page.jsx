import RoutePage from "@/components/ReferenceSite/RoutePage";
import { getPageMetadata } from "@/lib/page-metadata";

export const metadata = getPageMetadata("faq");

export default function FaqPage() {
  return <RoutePage slug="faq" />;
}

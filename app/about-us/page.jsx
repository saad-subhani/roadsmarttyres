import RoutePage from "@/components/ReferenceSite/RoutePage";
import { getPageMetadata } from "@/lib/page-metadata";

export const metadata = getPageMetadata("about-us");

export default function AboutUsPage() {
  return <RoutePage slug="about-us" />;
}

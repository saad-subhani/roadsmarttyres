import RoutePage from "@/components/ReferenceSite/RoutePage";
import { getPageMetadata } from "@/lib/page-metadata";

export const metadata = getPageMetadata("blog");

export default function BlogPage() {
  return <RoutePage slug="blog" />;
}

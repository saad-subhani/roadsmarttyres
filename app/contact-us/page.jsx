import RoutePage from "@/components/ReferenceSite/RoutePage";
import { getPageMetadata } from "@/lib/page-metadata";

export const metadata = getPageMetadata("contact-us");

export default function ContactUsPage() {
  return <RoutePage slug="contact-us" />;
}

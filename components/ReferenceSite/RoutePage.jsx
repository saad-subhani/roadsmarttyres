import ReferencePage from "./ReferencePages";
import { getCmsContent } from "@/lib/cms";

export default async function RoutePage({ slug }) {
  const content = await getCmsContent();
  return <ReferencePage slug={slug} content={content} />;
}

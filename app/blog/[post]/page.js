import { notFound } from "next/navigation";
import ReferencePage from "@/components/ReferenceSite/ReferencePages";
import blogPosts from "@/components/ReferenceSite/blogPosts";
import { getCmsContent } from "@/lib/cms";

export async function generateMetadata({ params }) {
  const { post: slug } = await params;
  const content = await getCmsContent();
  const posts = content?.blogs ?? blogPosts;
  const post = posts.find((blogPost) => blogPost.slug === slug);

  if (!post) return {};

  return {
    title: `${post.title} | Road Smart Tyre`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Road Smart Tyre`,
      description: post.excerpt,
      type: "article",
      images: [post.image],
    },
  };
}

export default async function BlogArticle({ params }) {
  const { post } = await params;
  const content = await getCmsContent();
  const posts = content?.blogs ?? blogPosts;

  if (!posts.some((blogPost) => blogPost.slug === post)) notFound();

  return <ReferencePage slug={`blog-post:${post}`} content={content} />;
}

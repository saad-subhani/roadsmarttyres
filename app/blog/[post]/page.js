import { notFound } from "next/navigation";
import ReferencePage from "@/components/ReferenceSite/ReferencePages";
import blogPosts from "@/components/ReferenceSite/blogPosts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ post: post.slug }));
}

export async function generateMetadata({ params }) {
  const { post: slug } = await params;
  const post = blogPosts.find((blogPost) => blogPost.slug === slug);

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

  if (!blogPosts.some((blogPost) => blogPost.slug === post)) notFound();

  return <ReferencePage slug={`blog-post:${post}`} />;
}

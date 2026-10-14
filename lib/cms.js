function normalizeContent(content) {
  if (
    !content ||
    !Array.isArray(content.blogs) ||
    !Array.isArray(content.reviews)
  ) {
    throw new Error("The CMS returned an invalid public content response.");
  }

  return {
    ...content,
    blogs: content.blogs.map((post) => ({
      ...post,
      excerpt: post.excerpt || post.description || "",
      image: post.image,
      sections: Array.isArray(post.sections)
        ? post.sections.map((section) => ({
            ...section,
            image: section.image,
          }))
        : [],
    })),
    reviews: content.reviews.map((review) => ({
      ...review,
      name: review.name || review.title || "Customer",
      text: review.text || review.description || "",
      image: review.image,
    })),
  };
}

export async function getCmsContent() {
  const backendUrl = process.env.BACKEND_URL?.replace(/\/+$/, "");
  if (!backendUrl) return null;

  const response = await fetch(`${backendUrl}/api/content`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Road Smart Tyre CMS returned HTTP ${response.status}.`,
    );
  }

  return normalizeContent(await response.json());
}

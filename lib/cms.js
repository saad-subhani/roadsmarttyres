const backendUrl = process.env.BACKEND_URL?.replace(/\/+$/, "");

function resolveMediaUrl(value) {
  if (typeof value !== "string" || !value.startsWith("/backend/uploads/")) {
    return value;
  }

  if (!backendUrl) {
    throw new Error(
      "BACKEND_URL must be configured to display CMS-uploaded images.",
    );
  }

  return `${backendUrl}${value.replace(/^\/backend/, "")}`;
}

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
      image: resolveMediaUrl(post.image),
      sections: Array.isArray(post.sections)
        ? post.sections.map((section) => ({
            ...section,
            image: resolveMediaUrl(section.image),
          }))
        : [],
    })),
    reviews: content.reviews.map((review) => ({
      ...review,
      name: review.name || review.title || "Customer",
      text: review.text || review.description || "",
      image: resolveMediaUrl(review.image),
    })),
  };
}

export async function getCmsContent() {
  if (!backendUrl) return null;

  let response;
  try {
    response = await fetch(`${backendUrl}/api/content`, {
      cache: "no-store",
    });
  } catch (error) {
    throw new Error("Could not connect to the Road Smart Tyre CMS backend.", {
      cause: error,
    });
  }

  if (!response.ok) {
    throw new Error(
      `Road Smart Tyre CMS returned HTTP ${response.status}.`,
    );
  }

  return normalizeContent(await response.json());
}

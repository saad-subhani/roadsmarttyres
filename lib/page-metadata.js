const pages = {
  "about-us": {
    title: "Learn About Our Tyre Experts and Services | Road Smart Tyre",
    description:
      "At Road Smart Tyre, we provide reliable and affordable tyre and car care solutions all in one place. From brand new and part-worn tyres to puncture repairs, full servicing, and brake pads & discs.",
    image: "/images/car-service-workers-with-new-tires-at-the-shop.jpg",
  },
  services: {
    title: "Complete Tyre Repair and Mobile Services | Road Smart Tyre",
    description:
      "At Road Smart Tyre, we specialize in offering premium new and part-worn tyres, fast puncture repairs, full vehicle servicing, and expert brake maintenance.",
    image: "/images/workers-changing-wheels-at-the-car-service-1.jpg",
  },
  faq: {
    title: "Tyre FAQ Support and Guidance Online | Road Smart Tyre",
    description:
      "Find answers to common questions about our tyre services, brake repairs, puncture fixes, and full vehicle servicing.",
    image: "/images/off-road-tire-closeup.jpg",
  },
  blog: {
    title: "Blog - roadsmarttyres.co.uk",
    description: "Road Smart Tyre blog.",
    image: "/images/winter-tires-with-spikes-for-a-car-close-up.jpg",
  },
  "contact-us": {
    title: "Contact Us for Tyre Help and Enquiries | Road Smart Tyre",
    description:
      "Have questions or need more details? We’re here to help. Reach out to us and get clear, accurate information tailored to your needs.",
    image: "/images/workers-changing-wheels-at-the-car-service-1.jpg",
  },
  "brand-new-and-part-worn-tyres": {
    title: "Brand New & Part Worn Tyres Llford | Tyre Fitting Service",
    description:
      "We supply and fit brand new and certified part worn tyres to suit every driver and every budget.",
    image: "/images/car-service-workers-with-new-tires-at-the-shop.jpg",
  },
  "breakpads-and-discs": {
    title: "Brake Pad & Disc Replacement in Ilford | Car Brake Repair",
    description:
      "We supply and fit high-quality brake pads and discs for cars, vans, and 4x4s.",
    image: "/images/alloy-rim-on-white-background-1.png",
  },
  "full-service": {
    title: "Full Car Service & Oil Change in Ilford | Car Repairs UK",
    description:
      "Comprehensive full vehicle services, inspections, maintenance, and oil changes.",
    image: "/images/car-service-workers-with-new-tires-at-the-shop.jpg",
  },
  "punctures-repair": {
    title: "Mobile Tyre Repair in Ilford | Puncture Repair Near Me",
    description:
      "Professional puncture inspections and repairs carried out using industry-approved methods.",
    image:
      "/images/man-in-uniform-changing-tire-of-automobile-conception-of-car-service.jpg",
  },
};

export function getPageMetadata(slug) {
  const page = pages[slug];
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
      images: [page.image],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [page.image],
    },
  };
}

export function getServiceSlugs() {
  return [
    "brand-new-and-part-worn-tyres",
    "breakpads-and-discs",
    "full-service",
    "punctures-repair",
  ];
}

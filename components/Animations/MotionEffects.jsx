"use client";

import { useEffect } from "react";

const animatedElements = [
  "main > section",
  ".hero-boundary > section",
  ".hero-content",
  ".reference-main > section",
  ".reference-client-reviews",
  ".reference-page-banner-inner",
  ".reference-section-heading",
  ".reference-why-card",
  ".why-feature",
  ".service-card",
  ".reference-service-card",
  ".reference-blog-card",
  ".reference-blog-article-header",
  ".reference-review-card",
  ".review-card",
  ".reference-faq-item",
  ".reference-contact-card",
  ".reference-package",
  ".reference-tyre-overview article",
  ".reference-car-needs > div",
  ".reference-values article",
  ".reference-membership-inner",
  ".discount-banner",
];

export default function MotionEffects() {
  useEffect(() => {
    if (
      window.location.pathname.startsWith("/admin") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const targets = document.querySelectorAll(animatedElements.join(","));
    if (!targets.length) return;

    document.body.classList.add("motion-effects-ready");
    targets.forEach((element, index) => {
      element.classList.add("motion-reveal");
      element.style.setProperty("--motion-delay", `${(index % 5) * 70}ms`);
    });

    if (!("IntersectionObserver" in window)) {
      targets.forEach((element) => element.classList.add("is-visible"));
      return () => document.body.classList.remove("motion-effects-ready");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    targets.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      document.body.classList.remove("motion-effects-ready");
    };
  }, []);

  return null;
}

"use client";

import { FaStar } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRef } from "react";
import fallbackReviews from "@/components/ReferenceSite/fallbackReviews";
import "./Testimonials.css";

export default function Testimonials({
  reviews: cmsReviews,
  variant = "default",
}) {
  const reviewsTrack = useRef(null);

  const reviews = cmsReviews ?? fallbackReviews;

  const scrollReviews = (direction) => {
    const track = reviewsTrack.current;
    if (!track) return;

    const card = track.querySelector(".review-card");
    if (!card) return;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: "smooth",
    });
  };

  return (
    <section className={`reviews${variant === "services" ? " reviews--services" : ""}`}>
      <div className="container">
        <div className="reviews-heading">
          <p className="eyebrow">TESTIMONIALS</p>
          <h2 className="reviews-title">
            WHAT OUR CLIENTS <span className="red">SAY</span>
          </h2>
          <p className="reviews-intro">
            We&apos;re proud to share what our customers say about us. Quality
            service, trust, and satisfaction drive everything we do.
          </p>
        </div>

        <div className="reviews-layout">
          <aside className="reviews-summary">
            <div className="reviews-brand-mark" aria-hidden="true">
              <img src="/images/road-smart-tyre-logo-1.png" alt="" />
            </div>
            <div className="reviews-summary-copy">
              <h3>Road Smart Tyre</h3>
              <p>Customer reviews</p>
              <div className="review-stars" aria-label="Five stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span className="reviews-summary-note">Feedback from our customers</span>
            </div>
          </aside>

          <div className="reviews-carousel">
            <div className="reviews-grid" ref={reviewsTrack}>
              {reviews.map((r) => (
                <article className="review-card" key={r.id ?? r.slug ?? r.name}>
                  <div className="review-top">
                    <div className="review-author">
                      <span className="review-avatar" aria-hidden="true">
                        {r.name.charAt(0)}
                      </span>
                      <div>
                        <h3 className="review-name">{r.name}</h3>
                        <span className="review-date">Customer review</span>
                      </div>
                    </div>
                    <FcGoogle className="review-google" aria-label="Google" />
                  </div>
                  <div className="review-stars" aria-label="Five stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p className="review-text">&ldquo;{r.text}&rdquo;</p>
                </article>
              ))}
            </div>
            <div className="reviews-controls">
              <button
                type="button"
                className="reviews-arrow"
                aria-label="Previous reviews"
                onClick={() => scrollReviews(-1)}
              >
                <FiChevronLeft />
              </button>
              <button
                type="button"
                className="reviews-arrow"
                aria-label="Next reviews"
                onClick={() => scrollReviews(1)}
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

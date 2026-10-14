import "./Discount.css";

export default function Discount() {
  return (
    <section id="contact" className="discount">
      <div className="container discount-banner">
        <div className="discount-content">
          <p className="discount-eyebrow">JOIN WITH YOUR FRIENDS</p>
          <h2 className="discount-title">GET 30% DISCOUNT</h2>
          <p className="discount-text">
            Reach out to us directly through our website and claim your{" "}
            <strong>30% discount</strong> on tyre and car services. Quick, easy,
            and hassle-free.
          </p>
          <a href="/contact-us" className="btn btn-red discount-btn">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}

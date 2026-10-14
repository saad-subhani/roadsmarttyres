import {
  FiCheck,
  FiGlobe,
  FiArrowRight,
} from "react-icons/fi";
import "./CarNeeds.css";

const points = [
  "Trusted experts ready to assist you",
  "Solutions for both small and large vehicles",
  "Friendly guidance from our experienced staff",
  "Valued customer feedback drives our service",
];

export default function CarNeeds() {
  return (
    <section className="needs">
      <div className="container needs-grid">
        <div className="needs-image-wrap">
          <div
            className="needs-image img-box"
            style={{
              backgroundImage:
                "url(/images/workers-changing-wheels-at-the-car-service-1.jpg)",
            }}
          />
          <div className="needs-badge">
            <span>
              IF YOU NEED HELP, GET A <b>CONSULTATION</b>
            </span>
            <a href="/contact-us">
              Get Started <FiArrowRight />
            </a>
          </div>
        </div>

        <div className="needs-content">
          <p className="needs-eyebrow">
            <FiGlobe aria-hidden="true" />
            HIGH TECHNOLOGY
          </p>
          <h2 className="needs-title">
            GET ALL YOUR CAR NEEDS
            <br />
            <span className="red">IN OUR STORE</span>
          </h2>
          <p className="needs-text">
            We provide comprehensive tyre and vehicle care services to keep
            your car safe and performing at its best. Whether you need new
            tyres, repairs, or expert advice, we&apos;re here to help with
            quality you can trust.
          </p>

          <div className="needs-points">
            {points.map((p) => (
              <div className="needs-point" key={p}>
                <span className="needs-icon" aria-hidden="true">
                  <FiCheck />
                </span>
                <p>{p}</p>
              </div>
            ))}
          </div>

          <div className="needs-quality">
            <div className="needs-quality-item">
              <div className="needs-quality-label">
                <span>Quality Service</span>
                <span>95%</span>
              </div>
              <div className="needs-quality-track" aria-label="Quality Service: 95%">
                <span style={{ width: "95%" }} />
              </div>
            </div>
            <div className="needs-quality-item">
              <div className="needs-quality-label">
                <span>Product Quality</span>
                <span>90%</span>
              </div>
              <div className="needs-quality-track" aria-label="Product Quality: 90%">
                <span style={{ width: "90%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

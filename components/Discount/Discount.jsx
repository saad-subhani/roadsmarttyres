import {
  FiArrowRight,
  FiShield,
  FiTool,
  FiCheckCircle,
  FiDisc,
} from "react-icons/fi";
import "./Discount.css";

const benefits = [
  { icon: FiShield, label: "Premium Brands" },
  { icon: FiTool, label: "Expert Fitting" },
  { icon: FiCheckCircle, label: "Trusted Service" },
  { icon: FiDisc, label: "Better Performance" },
];

export default function Discount() {
  return (
    <section id="contact" className="discount">
      <div className="container discount-banner">
        <div className="discount-content">
          <p className="discount-eyebrow">SPECIAL OFFER</p>
          <h2 className="discount-title">
            UP TO <span>30% OFF</span>
          </h2>
          <h3 className="discount-subtitle">
            ON PREMIUM TYRES &amp; SELECTED SERVICES
          </h3>
          <p className="discount-text">
            Drive smarter. Save more. Keep going.
          </p>
          <a href="/contact-us" className="btn btn-red discount-btn">
            Contact Us <FiArrowRight aria-hidden="true" />
          </a>
        </div>
        <div className="discount-badge" aria-label="Up to 30% off">
          <span>UP TO</span>
          <strong>30%</strong>
          <span>OFF</span>
        </div>
        <div className="discount-benefits">
          {benefits.map(({ icon: Icon, label }) => (
            <div className="discount-benefit" key={label}>
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

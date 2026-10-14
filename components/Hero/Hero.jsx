import { FiArrowRight } from "react-icons/fi";
import TypewriterText from "./TypewriterText";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-content">
        <p className="eyebrow hero-eyebrow">WE ARE ROAD SMART TYRE</p>
        <h1 className="hero-title">
          PREMIUM TYRES &amp;
          <br />
          EXPERT <span className="red"><TypewriterText /></span>
        </h1>
        <p className="hero-text">
          We deliver high-quality tyres, expert puncture repair, complete
          servicing, and brake system maintenance to keep you safe with
          confidence.
        </p>
        <div className="hero-actions">
          <a href="/services" className="btn btn-red hero-btn">
            Explore Services <FiArrowRight />
          </a>
          <a href="tel:+447405419723" className="btn btn-outline hero-btn">
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}

import { GiCarWheel } from "react-icons/gi";
import TypewriterText from "./TypewriterText";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-content">
        <p className="eyebrow hero-eyebrow">
          <GiCarWheel size={24} className="hero-eyebrow-icon" />
          <span>WE ARE ROAD SMART TYRE</span>
        </p>
        <h1 className="hero-title">
          PREMIUM TYRES &amp; EXPERT
          <br />
          <span className="red"><TypewriterText /></span>
        </h1>
        <p className="hero-text">
          We deliver high-quality tyres, expert puncture repair, complete servicing, and brake system maintenance to keep you driving with confidence.
        </p>
        <div className="hero-actions">
          <a href="/services" className="btn btn-red hero-btn">
            Explore
          </a>
        </div>
      </div>
    </section>
  );
}

import { FiCheck, FiDisc } from "react-icons/fi";
import "./TyreProducts.css";

const servicePoints = [
  "Quality tyres from trusted brands",
  "Expert puncture repairs on the spot",
  "Comprehensive full-service checks",
  "Brake pads & discs replacement done right",
];

export default function TyreProducts() {
  return (
    <section className="tyres">
      <div className="container tyres-grid">
        <div className="tyres-intro">
          <p className="tyres-eyebrow">
            <FiDisc aria-hidden="true" />
            <span>TYRE SERVICES</span>
          </p>
          <p className="tyres-intro-text">
            At Road Smart Tyre, we specialize in offering premium new and
            part-worn tyres, fast puncture repairs, full vehicle servicing, and
            expert brake maintenance. Quality, safety, and customer satisfaction
            are our priorities.
          </p>
          <ul className="tyres-service-points">
            {servicePoints.map((point) => (
              <li key={point}>
                <FiCheck aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <a href="/contact-us" className="btn btn-red tyres-contact-btn">
            Contact Us
          </a>
        </div>

        <article className="tyres-feature">
          <h2>CAR TYRES FOR EVERY NEED</h2>
          <div
            className="tyres-feature-image"
            role="img"
            aria-label="Premium car tyre"
            style={{
              backgroundImage:
                "url(/images/car-wheel-on-alloy-disc-with-tyre-isolated-1.png)",
            }}
          />
          <h3>CAR TYRES</h3>
          <p>
            Choose from a wide selection of tyres tailored to your vehicle and
            budget. Whether you want brand new or part-worn, we have reliable
            options that deliver performance and safety.
          </p>
        </article>

        <article className="tyres-disk">
          <h2>TYRE AND DISK SERVICES</h2>
          <div
            className="tyres-disk-image"
            role="img"
            aria-label="Car tyre and alloy disk"
            style={{
              backgroundImage: "url(/images/alloy-rim-on-white-background-1.png)",
            }}
          />
          <h3>TYRE DISK</h3>
          <p>
            We provide professional tyre fitting and wheel balancing, plus
            brake pads and discs replacement for your vehicle&apos;s safety and
            smooth driving experience.
          </p>
        </article>
      </div>
    </section>
  );
}

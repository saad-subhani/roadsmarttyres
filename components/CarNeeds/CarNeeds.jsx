import {
  FiUserCheck,
  FiLayers,
  FiMessageCircle,
  FiHeart,
  FiArrowRight,
} from "react-icons/fi";
import "./CarNeeds.css";

const points = [
  {
    icon: <FiUserCheck />,
    title: "Trusted experts ready to assist you",
  },
  {
    icon: <FiLayers />,
    title: "Solutions for both small and large vehicles",
  },
  {
    icon: <FiMessageCircle />,
    title: "Friendly guidance from our experienced staff",
  },
  {
    icon: <FiHeart />,
    title: "Valued customer feedback drives our service",
  },
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
          <p className="eyebrow">HOW TECHNOLOGY</p>
          <h2 className="needs-title">
            GET ALL YOUR CAR NEEDS
            <br />
            <span className="red">IN OUR STORE</span>
          </h2>
          <p className="needs-text">
            <strong>We provide comprehensive</strong> tyre and vehicle care
            services to keep your car safe and performance at its best. Whether
            you need new tyres, repairs, or expert advice, we&apos;re here to
            help with quality you can trust.
          </p>

          <div className="needs-points">
            {points.map((p) => (
              <div className="needs-point" key={p.title}>
                <span className="needs-icon">{p.icon}</span>
                <p>{p.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

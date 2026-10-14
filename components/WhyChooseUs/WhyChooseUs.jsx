import { FiDollarSign, FiShield, FiAward } from "react-icons/fi";
import "./WhyChooseUs.css";

const features = [
  {
    icon: <FiDollarSign />,
    title: "AFFORDABLE PRICE",
    text: "Premium tyres and car care at cost effective prices.",
  },
  {
    icon: <FiShield />,
    title: "GOOD SERVICE",
    text: "Skilled, experts, timely service and customer satisfaction.",
  },
  {
    icon: <FiAward />,
    title: "HIGH QUALITY",
    text: "Top-quality tyres and genuine products for your safety.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why">
      <div className="container">
        <p className="eyebrow">WHY CHOOSE US</p>
        <h2 className="why-title">
          ALL YOU NEED IN <span className="red">ONE PLACE</span>
        </h2>
        <p className="why-sub">
          Your car deserves the best. We provide reliable services, quality
          products and expert care — all under one roof.
        </p>

        <div className="why-features">
          {features.map((f) => (
            <div className="why-feature" key={f.title}>
              <span className="why-icon">{f.icon}</span>
              <div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

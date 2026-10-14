import { FaDollarSign, FaThumbsUp } from "react-icons/fa6";
import { GiCarWheel } from "react-icons/gi";
import "./WhyChooseUs.css";

const features = [
  {
    icon: <FaDollarSign size={20} />,
    title: "AFFORDABLE PRICE",
    text: "Premium tyres and complete car care at competitive, budget-friendly prices.",
    image: "/images/garage-business-service-client-customer-person-make-a-payment-with-credit-card-or-money-to-buy.jpg",
    alt: "Affordable price customer payment",
  },
  {
    icon: <FaThumbsUp size={20} />,
    title: "GOOD SERVICE",
    text: "We take pride in delivering honest, dependable service to keep you safe on the road.",
    image: "/images/car-service-worker-changing-wheel.jpg",
    alt: "Good service mechanic with car tyre",
  },
  {
    icon: <GiCarWheel size={22} />,
    title: "HIGH QUALITY",
    text: "Top-quality tyres and services you can rely on. Built for safety and durability.",
    image: "/images/off-road-tire-closeup.jpg",
    alt: "High quality off-road tyre closeup",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why-section" id="why-choose-us">
      <div className="container why-container">
        {/* Eyebrow */}
        <div className="why-eyebrow">
          <GiCarWheel size={20} className="why-eyebrow-icon" />
          <span>WELCOME TO ROAD SMART TYRE</span>
        </div>

        {/* Main Heading */}
        <h2 className="why-main-title">
          ALL YOU NEED IN <span className="red">ONE PLACE</span>
        </h2>

        {/* Subtitle Paragraph */}
        <p className="why-description">
          All your tyre and car care needs in one place. We provide quality tyres, quick puncture repairs,
          <br className="why-desc-br" />
          full servicing, and expert brake pad and disc replacement for a smooth, safe drive.
        </p>

        {/* 3 Features Grid */}
        <div className="why-cards-grid">
          {features.map((item) => (
            <div className="why-card" key={item.title}>
              {/* Header with Icon + Text */}
              <div className="why-card-header">
                <div className="why-card-icon" aria-hidden="true">
                  {item.icon}
                </div>
                <div className="why-card-content">
                  <h3 className="why-card-title">{item.title}</h3>
                  <p className="why-card-text">{item.text}</p>
                </div>
              </div>

              {/* Image box below */}
              <div className="why-card-image-box">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="why-card-img"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

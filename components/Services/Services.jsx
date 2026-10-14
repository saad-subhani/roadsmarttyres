import { FiArrowRight } from "react-icons/fi";
import "./Services.css";

const services = [
  {
    title: "BRAND NEW & PART-WORN TYRES",
    href: "/brand-new-and-part-worn-tyres",
    text: "Wide range of high-quality new and part-worn tyres to suit your budget and vehicle.",
    img: "car-service-workers-with-new-tires-at-the-shop.jpg",
  },
  {
    title: "PUNCTURE REPAIR",
    href: "/punctures-repair",
    text: "Quick and reliable puncture repair services to get you back on the road safely.",
    img: "car-service-worker-changing-wheel-1.jpg",
  },
  {
    title: "FULL SERVICE",
    href: "/full-service",
    text: "Complete vehicle servicing including engine checks, oil changes, and overall maintenance.",
    img: "man-in-uniform-changing-tire-of-automobile-conception-of-car-service.jpg",
  },
  {
    title: "BRAKE PADS & DISCS",
    href: "/breakpads-and-discs",
    text: "Expert brake maintenance and replacement to ensure your vehicle's safety.",
    img: "alloy-rim-on-white-background-1.png",
  },
];

export default function Services() {
  return (
    <section id="services" className="services" style={{ backgroundColor: "#000" }}>
      <div className="container">
        <p className="eyebrow">OUR SERVICES</p>
        <h2 className="services-title">
          CAR TYRES AND AUTO CARE
          <br />
          SERVICES
        </h2>

        <div className="services-grid">
          {services.map((s) => (
            <article className="service-card" key={s.title}>
              <div
                className="service-img img-box"
                style={{ backgroundImage: `url(/images/${s.img})` }}
              />
              <div className="service-body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <a href={s.href} className="service-link">
                  Read More <FiArrowRight />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

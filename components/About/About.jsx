import { FiArrowRight } from "react-icons/fi";
import "./About.css";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container about-grid">
        <div className="about-image-wrap">
          <div
            className="about-image img-box"
            style={{
              backgroundImage:
                "url(/images/car-service-workers-with-new-tires-at-the-shop.jpg)",
            }}
          />
        </div>

        <div className="about-content">
          <p className="eyebrow">ABOUT US</p>
          <h2 className="about-title">
            THE BEST TYRE SOLUTION FOR
            <br />
            <span className="red">YOUR LOVELY CAR</span>
          </h2>
          <p className="about-text">
            At Road Smart Tyre, we provide reliable and affordable tyre care
            for your car. 24/7. From new tyres to puncture repair, we ensure
            your safety and smooth journeys.
          </p>
          <p className="about-text">
            With a focus on quality, honest service and customer satisfaction,
            we make sure your car is always in the best hands.
          </p>
          <a href="/about-us" className="btn btn-red about-btn">
            More About Us <FiArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}

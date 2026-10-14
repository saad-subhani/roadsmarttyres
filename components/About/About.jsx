import { FiPlus } from "react-icons/fi";
import "./About.css";

export default function About() {
  return (
    <section id="about" className="about about-reference">
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
          <p className="eyebrow">
            <span className="about-icon" aria-hidden="true">
              <FiPlus />
            </span>
            ABOUT US
          </p>
          <h2 className="about-title">
            THE BEST TYRE SOLUTION FOR
            <br />
            <span className="red">YOUR LOVELY CAR</span>
          </h2>
          <p className="about-text">
            At Road Smart Tyre, we provide reliable and affordable tyre and car
            care solutions all in one place. From brand new and part-worn tyres
            to puncture repairs, full servicing, and brake pads &amp; discs, our
            goal is to keep your vehicle safe, smooth, and road-ready.
          </p>
          <p className="about-text">
            With a focus on quality, honest service, and customer satisfaction,
            we make sure all job is done with care and precision. Whether it’s a
            quick repair or a full check-up, you can trust us to keep you moving
            with confidence.
          </p>
          <a href="/about-us" className="btn btn-red about-btn">
            MORE ABOUT US
          </a>
        </div>
      </div>
      <style>{`
        .about.about-reference {
          min-height: 100vh;
          padding: 5rem 0;
          color: #fff;
          background: #0c0c0c;
        }

        .about-reference::before,
        .about-reference::after {
          display: none;
        }

        .about-reference .about-grid {
          width: 80.8%;
          max-width: 150rem;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 7.5rem;
          align-items: center;
        }

        .about-reference .about-image-wrap {
          justify-content: stretch;
        }

        .about-reference .about-image-wrap::before {
          top: -1.2rem;
          right: -1.2rem;
          left: auto;
          width: 7.5rem;
          height: 7.5rem;
          border: 0;
          border-top: 0.35rem solid var(--red);
          border-right: 0.35rem solid var(--red);
          border-radius: 0;
        }

        .about-reference .about-image-wrap::after {
          bottom: -1.2rem;
          left: -1.2rem;
          width: 7.5rem;
          height: 7.5rem;
          border: 0;
          border-bottom: 0.35rem solid var(--red);
          border-left: 0.35rem solid var(--red);
          border-radius: 0;
        }

        .about-reference .about-image {
          width: 100%;
          height: clamp(36rem, 35vw, 49rem);
          border-radius: 0;
          background-size: cover;
          background-position: center;
        }

        .about-reference .about-content {
          max-width: 64rem;
          padding: 0;
        }

        .about-reference .eyebrow {
          gap: 1rem;
          margin: 0 0 1.3rem;
          color: #929292;
          font-size: 1.1rem;
          line-height: 1.5;
          letter-spacing: 0.16em;
        }

        .about-reference .eyebrow::before {
          display: none;
        }

        .about-reference .about-icon {
          display: inline-flex;
          width: 2.1rem;
          height: 2.1rem;
          align-items: center;
          justify-content: center;
          border: 0.12rem solid var(--red);
          border-radius: 50%;
          color: var(--red);
          font-size: 1.3rem;
          letter-spacing: 0;
        }

        .about-reference .about-title {
          margin: 0;
          font-size: clamp(3.4rem, 3.6vw, 5rem);
          line-height: 1;
          font-weight: 700;
          letter-spacing: 0;
        }

        .about-reference .about-text {
          max-width: 62rem;
          margin-top: 2.8rem;
          color: #929292;
          font-size: 1.35rem;
          line-height: 1.8;
        }

        .about-reference .about-text + .about-text {
          margin-top: 1.6rem;
        }

        .about-reference .about-btn {
          min-height: 4.4rem;
          margin-top: 2rem;
          padding: 0 3.2rem;
          border-radius: 0;
          font-size: 1.2rem;
          letter-spacing: 0.08em;
        }

        @media (max-width: 760px) {
          .about.about-reference {
            min-height: auto;
            padding: 6rem 0;
          }

          .about-reference .about-grid {
            width: 85.4%;
            grid-template-columns: 1fr;
            gap: 4rem;
          }

          .about-reference .about-image {
            height: clamp(30rem, 70vw, 42rem);
          }

          .about-reference .about-title {
            font-size: clamp(3.6rem, 8vw, 4.8rem);
          }

          .about-reference .about-text {
            margin-top: 2rem;
          }
        }
      `}</style>
    </section>
  );
}

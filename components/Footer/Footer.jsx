import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import {
  FiUser,
  FiMail,
  FiPhoneCall,
  FiChevronRight,
} from "react-icons/fi";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="/" className="footer-logo">
            <img
              className="footer-logo-image"
              src="/images/road-smart-tyre-logo-1.png"
              alt="Road Smart Tyre"
            />
          </a>
          <p>
            Road Smart Tyre LTD offers reliable tyre services, from brand new
            and part-worn tyres to puncture repairs and vehicle servicing,
            helping drivers in Ilford stay safe on the road.
          </p>
          <div className="footer-social">
            <a
              href="https://www.facebook.com/share/1DFHUZEgE7/"
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/roadsmarttyres/"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/447405419723"
              aria-label="WhatsApp"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.tiktok.com/@roadsmarttyre1"
              aria-label="TikTok"
              target="_blank"
              rel="noreferrer"
            >
              <FaTiktok />
            </a>
          </div>
        </div>

        <div>
          <h4>QUICK LINKS</h4>
          <ul className="footer-links">
            <li><a href="/"><FiChevronRight />Home</a></li>
            <li><a href="/about-us"><FiChevronRight />About Us</a></li>
            <li><a href="/services"><FiChevronRight />Services</a></li>
            <li><a href="/brand-new-and-part-worn-tyres"><FiChevronRight />Tyres</a></li>
            <li><a href="/contact-us"><FiChevronRight />Contact</a></li>
          </ul>
        </div>

        <div>
          <h4>SERVICES</h4>
          <ul className="footer-links">
            <li><a href="/brand-new-and-part-worn-tyres"><FiChevronRight />Tyres</a></li>
            <li><a href="/punctures-repair"><FiChevronRight />Puncture Repair</a></li>
            <li><a href="/full-service"><FiChevronRight />Full Service</a></li>
            <li><a href="/breakpads-and-discs"><FiChevronRight />Brake Service</a></li>
            <li><a href="/services"><FiChevronRight />All Services</a></li>
          </ul>
        </div>

        <div>
          <h4>GET IN TOUCH</h4>
          <ul className="footer-contact footer-contact--interior">
            <li>
              <FiUser /> RoadSmartTyreLtd
            </li>
            <li>
              <a href="mailto:roadsmarttyreltd@gmail.com">
                <FiMail /> roadsmarttyreltd@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+447405419723">
                <FiPhoneCall /> +44 7405 419723
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} Road Smart Tyre. All rights reserved.
        </p>
        <div>
          <a href="/contact-us">Contact Us</a>
          <span>|</span>
          <a href="/faq">FAQs</a>
        </div>
      </div>
    </footer>
  );
}

import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { FiMail, FiPhoneCall } from "react-icons/fi";
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
            to part-worn options, helping you stay safe on the road.
          </p>
        </div>

        <div>
          <h4>QUICK LINKS</h4>
          <ul className="footer-links">
            <li><a href="/about-us">About</a></li>
            <li><a href="/faq">Faq</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/contact-us">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4>CUSTOMER SERVICE</h4>
          <ul className="footer-links">
            <li><a href="/brand-new-and-part-worn-tyres">Brand new and part worn tyres</a></li>
            <li><a href="/breakpads-and-discs">Brakepads and discs</a></li>
            <li><a href="/punctures-repair">Punctures repair</a></li>
            <li><a href="/full-service">Full service</a></li>
          </ul>
        </div>

        <div>
          <h4>GET IN TOUCH</h4>
          <ul className="footer-contact">
            <li>
              <a href="mailto:roadsmarttyreltd@gmail.com">
                <FiMail />
                <span>
                  <strong>EMAIL</strong>
                  Roadsmarttyreltd@gmail.com
                </span>
              </a>
            </li>
            <li>
              <a href="tel:+447405419723">
                <FiPhoneCall />
                <span>
                  <strong>PHONE</strong>
                  +44 7405 419723
                </span>
              </a>
            </li>
          </ul>
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
      </div>

      <div className="container footer-bottom">
        <p className="footer-credit">
          ROAD SMART TYRE <span>DEVELOPED BY</span> <b>SOLTEKKERS LLC</b>
        </p>
        <p>Copyright © {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </footer>
  );
}

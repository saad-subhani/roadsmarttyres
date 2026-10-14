import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { FiMail, FiPhone, FiChevronRight } from "react-icons/fi";
import "./interior-site.css";

const quickLinks = [
  { label: "About", href: "/about-us" },
  { label: "Faq", href: "/faq" },
  { label: "Blog", href: "/blog-2" },
  { label: "Contact", href: "/contact-us" },
];

const serviceLinks = [
  {
    label: "Brand new and part worn tyres",
    href: "/brand-new-and-part-worn-tyres",
  },
  { label: "Brakepads and discs", href: "/breakpads-and-discs" },
  { label: "Punctures repair", href: "/punctures-repair" },
  { label: "Full service", href: "/full-service" },
];

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1DFHUZEgE7/",
    icon: <FaFacebookF />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/roadsmarttyres/",
    icon: <FaInstagram />,
  },
  {
    label: "Whatsapp",
    href: "https://wa.me/447405419723",
    icon: <FaWhatsapp />,
  },
  {
    label: "Tiktok",
    href: "https://www.tiktok.com/@roadsmarttyre1?_r=1&_t=ZN-94SazLwoUze",
    icon: <FaTiktok />,
  },
];

export default function InteriorFooter() {
  return (
    <footer className="reference-footer">
      <div className="reference-footer-grid">
        <section className="reference-footer-brand">
          <a href="/" className="reference-footer-logo">
            <img
              src="/images/road-smart-tyre-logo-1.png"
              alt="Road Smart Tyre"
            />
          </a>
          <p>
            Road Smart Tyre LTD offers reliable tyre services, from brand new to
            part worn options, helping you stay safe on the road.
          </p>
          <div className="reference-chat">
            <div className="reference-chat-title">
              <span className="reference-chat-status" />
              <div>
                <strong>ROADSMART TYRE</strong>
                <small>Online — usually replies instantly</small>
              </div>
            </div>
            <a href="https://wa.me/447405419723" className="reference-chat-link">
              <FaWhatsapp aria-hidden="true" /> WhatsApp
            </a>
            <a
              href="https://www.instagram.com/roadsmarttyres/"
              className="reference-chat-link"
            >
              <FaInstagram aria-hidden="true" /> Instagram
            </a>
            <a href="tel:+447405419723" className="reference-chat-link">
              <FiPhone aria-hidden="true" /> Call
            </a>
            <a
              href="https://soltekkersllc.com"
              className="reference-chat-credit"
              target="_blank"
              rel="noreferrer"
            >
              ⚡ Powered by Soltekkers LLC
            </a>
          </div>
        </section>

        <section>
          <h2>Quick Links</h2>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>
                  <FiChevronRight aria-hidden="true" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Customer Service</h2>
          <ul>
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>
                  <FiChevronRight aria-hidden="true" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="reference-footer-contact">
          <h2>Get In Touch</h2>
          <a href="mailto:Roadsmarttyreltd@gmail.com">
            <FiMail aria-hidden="true" />
            <span>
              <small>Email</small>
              Roadsmarttyreltd@gmail.com
            </span>
            <b aria-hidden="true">→</b>
          </a>
          <a href="tel:+447405419723">
            <FiPhone aria-hidden="true" />
            <span>
              <small>Phone</small>
              +44 7405 419723
            </span>
            <b aria-hidden="true">→</b>
          </a>
          <a href="https://wa.me/447405419723">
            <FaWhatsapp aria-hidden="true" />
            <span>
              <small>Whatsapp</small>
              +44 7405 419723
            </span>
            <b aria-hidden="true">→</b>
          </a>
        </section>
      </div>

      <div className="reference-footer-bottom">
        <a href="https://soltekkersll.com">
          Road Smart Tyre Developed by SOLTEKKERS LLC
        </a>
        <p>Copyright © 2026. All rights reserved.</p>
        <div className="reference-footer-socials">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noreferrer"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

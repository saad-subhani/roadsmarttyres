"use client";

import { useState } from "react";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import "../Logo/Logo.css";
import "./interior-site.css";

const links = [
  { label: "Home", href: "/", key: "home" },
  { label: "About Us", href: "/about-us", key: "about-us" },
  { label: "Services", href: "/services", key: "services" },
  { label: "FAQ", href: "/faq", key: "faq" },
  { label: "Blog", href: "/blog-2", key: "blog" },
  { label: "Contact Us", href: "/contact-us", key: "contact-us" },
];

const serviceLinks = [
  {
    label: "Brand new and part worn tyres",
    href: "/brand-new-and-part-worn-tyres",
  },
  { label: "Breakpads and discs", href: "/breakpads-and-discs" },
  { label: "Full service", href: "/full-service" },
  { label: "Punctures repair", href: "/punctures-repair" },
];

export default function InteriorHeader({ activePage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isServicePage = serviceLinks.some((link) =>
    link.href.endsWith(activePage),
  );

  return (
    <header className="reference-header">
      <div className="reference-header-top">
        <span>+44 7405 419723</span>
        <span>Roadsmarttyreltd@gmail.com</span>
      </div>
      <div className="reference-header-main">
        <a href="/" className="logo reference-logo">
          <img
            className="logo-image"
            src="/images/road-smart-tyre-logo-1.png"
            alt="Road Smart Tyre"
          />
        </a>
        <nav
          className={`reference-nav${menuOpen ? " is-open" : ""}`}
          aria-label="Main navigation"
        >
          {links.map((link) =>
            link.key === "services" ? (
              <div className="reference-nav-service" key={link.key}>
                <a
                  href={link.href}
                  aria-current={
                    activePage === "services" || isServicePage
                      ? "page"
                      : undefined
                  }
                >
                  {link.label}
                </a>
                <details className="reference-service-dropdown">
                  <summary aria-label="Show service pages">
                    <FiChevronDown aria-hidden="true" />
                  </summary>
                  <div>
                    {serviceLinks.map((service) => (
                      <a href={service.href} key={service.href}>
                        {service.label}
                      </a>
                    ))}
                  </div>
                </details>
              </div>
            ) : (
              <a
                href={link.href}
                key={link.key}
                aria-current={activePage === link.key ? "page" : undefined}
              >
                {link.label}
              </a>
            ),
          )}
        </nav>
        <button
          className="reference-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </header>
  );
}

"use client";

import { useState } from "react";
import { FiPhone } from "react-icons/fi";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import Logo from "../Logo/Logo";
import "./Header.css";

const links = [
  { label: "HOME", href: "/", page: "home" },
  { label: "ABOUT US", href: "/about-us", page: "about-us" },
  { label: "SERVICES", href: "/services", page: "services" },
  { label: "FAQ", href: "/faq", page: "faq" },
  { label: "BLOG", href: "/blog", page: "blog" },
  { label: "CONTACT US", href: "/contact-us", page: "contact-us" },
];

const servicePages = [
  "brand-new-and-part-worn-tyres",
  "breakpads-and-discs",
  "full-service",
  "punctures-repair",
];

const serviceLinks = [
  { label: "New and part-worn tyres", href: "/brand-new-and-part-worn-tyres" },
  { label: "Puncture repair", href: "/punctures-repair" },
  { label: "Full service", href: "/full-service" },
  { label: "Brake pads and discs", href: "/breakpads-and-discs" },
];

export default function Header({ activePage = "home" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPage =
    activePage === "blog-2" ? "blog" : activePage;

  return (
    <header className="header">
      <div className="header-inner">
        <Logo />
        <nav
          className={`header-nav${menuOpen ? " is-open" : ""}`}
          aria-label="Main navigation"
        >
          {links.map((l) =>
            l.page === "services" ? (
              <div className="header-service-menu" key={l.label}>
                <a
                  href={l.href}
                  className={
                    l.page === currentPage || servicePages.includes(currentPage)
                      ? "header-link active"
                      : "header-link"
                  }
                >
                  {l.label}
                </a>
                <details className="header-service-dropdown">
                  <summary aria-label="Show service pages">
                    <FiChevronDown aria-hidden="true" />
                  </summary>
                  <div className="header-service-dropdown-links">
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
                key={l.label}
                href={l.href}
                className={
                  l.page === currentPage ? "header-link active" : "header-link"
                }
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ),
          )}
        </nav>
        <a href="/contact-us" className="header-cta">
          <FiPhone /> Contact Us
        </a>
        <button
          className="header-menu-toggle"
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

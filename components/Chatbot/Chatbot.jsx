"use client";

import { useEffect, useRef, useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiMessageCircle, FiPhone, FiSend, FiX } from "react-icons/fi";
import "./Chatbot.css";

const quickReplies = [
  { label: "Tyres", message: "I need help choosing tyres" },
  { label: "Puncture repair", message: "I have a puncture" },
  { label: "Other services", message: "Tell me about your services" },
];

function getReply(message) {
  const query = message.toLowerCase();

  if (/puncture|flat tyre|flat tire|repair/.test(query)) {
    return {
      text: "We offer puncture inspections and repairs where it is safe to do so. A technician will need to check the tyre first.",
      label: "Puncture repair details",
      href: "/punctures-repair",
    };
  }

  if (/brake|disc|pad/.test(query)) {
    return {
      text: "We provide brake pad and disc services to help keep your vehicle stopping safely.",
      label: "Brake services",
      href: "/breakpads-and-discs",
    };
  }

  if (/service|servicing|oil|maintenance/.test(query)) {
    return {
      text: "We offer vehicle servicing and maintenance. Visit the service page or contact the team to discuss your vehicle.",
      label: "Full service",
      href: "/full-service",
    };
  }

  if (/tyre|tire|wheel|part worn|part-worn/.test(query)) {
    return {
      text: "We supply and fit brand-new and part-worn tyres for a range of vehicles. Contact us with your tyre size and we can help.",
      label: "Tyre options",
      href: "/brand-new-and-part-worn-tyres",
    };
  }

  return {
    text: "I can help with tyres, puncture repairs, brakes and servicing. Choose a topic above, or contact our team for help with anything else.",
    label: "Contact our team",
    href: "/contact-us",
  };
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([]);
  const messageBody = useRef(null);
  const nextId = useRef(0);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    if (messageBody.current) {
      messageBody.current.scrollTo({
        top: messageBody.current.scrollHeight,
        behavior: "smooth",
      });
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [messages, open]);

  function sendMessage(text) {
    const question = text.trim();
    if (!question) return;

    const reply = getReply(question);
    setMessages((current) => [
      ...current,
      { id: nextId.current++, role: "visitor", text: question },
      { id: nextId.current++, role: "assistant", ...reply },
    ]);
    setDraft("");
  }

  return (
    <div className="roadsmart-chat">
      {open ? (
        <section
          className="roadsmart-chat-panel"
          aria-label="Road Smart Tyre chat"
        >
          <header className="roadsmart-chat-header">
            <img
              src="/images/road-smart-tyre-logo-1.png"
              alt=""
              className="roadsmart-chat-logo"
            />
            <div className="roadsmart-chat-heading">
              <strong>ROADSMART TYRE</strong>
              <span>
                <i aria-hidden="true" /> Quick service help
              </span>
            </div>
            <button
              type="button"
              className="roadsmart-chat-close"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
            >
              <FiX aria-hidden="true" />
            </button>
          </header>

          <div className="roadsmart-chat-body" aria-live="polite" ref={messageBody}>
            <p className="roadsmart-chat-greeting">
              Hi there! What can we help you with today?
            </p>
            {messages.map((message) => (
              <div
                className={`roadsmart-chat-message roadsmart-chat-message--${message.role}`}
                key={message.id}
              >
                <p>{message.text}</p>
                {message.href ? (
                  <a href={message.href}>
                    {message.label} <span aria-hidden="true">→</span>
                  </a>
                ) : null}
              </div>
            ))}
            <div className="roadsmart-chat-quick-replies">
              {quickReplies.map((reply) => (
                <button
                  type="button"
                  key={reply.label}
                  onClick={() => sendMessage(reply.message)}
                >
                  {reply.label}
                </button>
              ))}
            </div>
          </div>

          <form
            className="roadsmart-chat-composer"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(draft);
            }}
          >
            <label className="roadsmart-chat-input-label" htmlFor="roadsmart-chat-input">
              Ask about our services
            </label>
            <input
              id="roadsmart-chat-input"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type your message..."
              maxLength={500}
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!draft.trim()}
            >
              <FiSend aria-hidden="true" />
            </button>
          </form>

          <nav className="roadsmart-chat-contact" aria-label="Contact options">
            <a
              href={`https://wa.me/447405419723?text=${encodeURIComponent("Hi Road Smart Tyre, I need help with " + (draft.trim() || "your services") + ".")}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp aria-hidden="true" /> WhatsApp
            </a>
            <a href="tel:+447405419723">
              <FiPhone aria-hidden="true" /> Call
            </a>
            <a
              href="https://www.instagram.com/roadsmarttyres/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram aria-hidden="true" /> Instagram
            </a>
          </nav>
        </section>
      ) : null}

      <button
        className="roadsmart-chat-toggle"
        type="button"
        aria-label={open ? "Close Road Smart Tyre chat" : "Open Road Smart Tyre chat"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <FiX aria-hidden="true" /> : <FiMessageCircle aria-hidden="true" />}
      </button>
    </div>
  );
}

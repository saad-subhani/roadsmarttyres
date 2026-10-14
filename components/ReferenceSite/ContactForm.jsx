"use client";

import { useState } from "react";

export default function ContactForm() {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitting(true);
    setMessage("");
    setSuccess(false);

    const formData = new FormData(form);
    const body = new URLSearchParams();
    body.set("name", String(formData.get("name") || ""));
    body.set("email", String(formData.get("email") || ""));
    body.set("service", String(formData.get("subject") || ""));
    body.set("message", String(formData.get("message") || ""));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body,
      });
      const result = await response.json();
      if (!response.ok && response.status !== 202) {
        throw new Error(result.error || "Your message could not be sent.");
      }

      setSuccess(true);
      setMessage(result.message || "Thanks — your message was received.");
      form.reset();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Your message could not be sent. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="reference-contact-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" placeholder="Your Name" maxLength="120" required />
      </label>
      <label>
        Email
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          maxLength="200"
          required
        />
      </label>
      <label>
        Subject
        <input
          name="subject"
          placeholder="Your Subject"
          maxLength="160"
          required
        />
      </label>
      <label className="reference-form-message">
        Message
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          maxLength="3000"
          required
        />
      </label>
      <button className="reference-button" type="submit" disabled={submitting}>
        {submitting ? "Sending..." : "Send Message"}
      </button>
      {message ? (
        <p className={success ? "contact-form-success" : "contact-form-error"} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}

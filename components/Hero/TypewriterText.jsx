"use client";

import { useEffect, useState } from "react";

const phrases = [
  "AUTO CARE",
  "TYRE REPAIR",
  "CAR SERVICING",
  "BRAKE SERVICES",
];

export default function TypewriterText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState(phrases[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      return undefined;
    }

    if (!deleting && text === currentPhrase) {
      const pause = window.setTimeout(() => setDeleting(true), 1600);
      return () => window.clearTimeout(pause);
    }

    if (deleting && text.length === 0) {
      setPhraseIndex((index) => (index + 1) % phrases.length);
      setDeleting(false);
      return undefined;
    }

    const typing = window.setTimeout(() => {
      setText(
        deleting
          ? text.slice(0, -1)
          : currentPhrase.slice(0, text.length + 1),
      );
    }, deleting ? 45 : 90);

    return () => window.clearTimeout(typing);
  }, [deleting, phraseIndex, text]);

  return (
    <span className="typewriter-text" aria-label="auto care, tyre repair, car servicing, brake services">
      <span aria-hidden="true">{text}</span>
    </span>
  );
}

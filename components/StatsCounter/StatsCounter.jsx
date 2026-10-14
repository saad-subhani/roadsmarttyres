"use client";

import { useEffect, useRef, useState } from "react";
import { FiClock, FiTool, FiDisc, FiStar } from "react-icons/fi";
import "./StatsCounter.css";

const stats = [
  { target: 24, suffix: "/7", label: "Tyre care support", icon: FiClock, alwaysOn: true },
  { target: 4, suffix: "+", label: "Auto care services", icon: FiTool },
  { target: 3, suffix: "", label: "Tyre categories", icon: FiDisc },
  { target: 100, suffix: "%", label: "Customer satisfaction", icon: FiStar },
];

export default function StatsCounter() {
  const counterRef = useRef(null);
  const [counts, setCounts] = useState(() => stats.map(() => 0));

  useEffect(() => {
    const counter = counterRef.current;
    if (!counter) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      setCounts(stats.map((stat) => stat.target));
      return undefined;
    }

    let frameId;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();
        const startedAt = performance.now();
        const duration = 1800;

        const animate = (now) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const easedProgress = 1 - (1 - progress) ** 3;
          setCounts(
            stats.map((stat) => Math.round(stat.target * easedProgress)),
          );

          if (progress < 1) {
            frameId = window.requestAnimationFrame(animate);
          }
        };

        frameId = window.requestAnimationFrame(animate);
      },
      { threshold: 0.25 },
    );
    observer.observe(counter);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      className="stats-counter"
      aria-label="Road Smart Tyre at a glance"
      ref={counterRef}
    >
      <div className="stats-counter-inner">
        {stats.map((stat, index) => (
          <div className="stats-counter-item" key={stat.label}>
            <span className="stats-counter-icon" aria-hidden="true">
              <stat.icon />
            </span>
            <div className="stats-counter-copy">
              <span
                className={`stats-counter-value${stat.alwaysOn ? " always-on" : ""}`}
              >
                {counts[index]}
                {stat.suffix}
              </span>
              <span className="stats-counter-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import "./Preloader.css";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 300);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="site-preloader" role="status" aria-label="Loading website">
      <div className="site-preloader-content">
        <img
          className="site-preloader-logo"
          src="/images/road-smart-tyre-logo-1.png"
          alt="Road Smart Tyre"
        />
        <span className="site-preloader-mark" aria-hidden="true" />
        <p className="site-preloader-brand">ROAD SMART TYRE</p>
        <p className="site-preloader-message">Getting everything ready</p>
      </div>
    </div>
  );
}

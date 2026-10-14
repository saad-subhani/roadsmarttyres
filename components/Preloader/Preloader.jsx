"use client";

import { useEffect, useState } from "react";
import "./Preloader.css";

function waitForImage(image) {
  if (image.complete) return Promise.resolve();

  return new Promise((resolve) => {
    const finish = () => {
      image.removeEventListener("load", finish);
      image.removeEventListener("error", finish);
      resolve();
    };

    image.addEventListener("load", finish, { once: true });
    image.addEventListener("error", finish, { once: true });
  });
}

function waitForVideo(video) {
  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const finish = () => {
      video.removeEventListener("loadeddata", finish);
      video.removeEventListener("error", finish);
      resolve();
    };

    video.addEventListener("loadeddata", finish, { once: true });
    video.addEventListener("error", finish, { once: true });
  });
}

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const imageTasks = [];
    const videos = Array.from(document.querySelectorAll("video"));
    const backgroundUrls = new Set();

    for (const element of document.querySelectorAll("*")) {
      const background = getComputedStyle(element).backgroundImage;
      for (const match of background.matchAll(/url\(["']?(.*?)["']?\)/g)) {
        if (match[1]) backgroundUrls.add(new URL(match[1], document.baseURI).href);
      }
    }

    for (const image of document.images) {
      image.loading = "eager";
      imageTasks.push(image.decode().catch(() => waitForImage(image)));
    }

    for (const url of backgroundUrls) {
      const image = new Image();
      image.src = url;
      imageTasks.push(image.decode().catch(() => waitForImage(image)));
    }

    const assets = [...imageTasks, ...videos.map(waitForVideo)];
    setTotal(assets.length);

    if (assets.length === 0) {
      setVisible(false);
      return () => {
        cancelled = true;
      };
    }

    void Promise.allSettled(
      assets.map((asset) =>
        asset.then(() => {
          if (!cancelled) setProgress((current) => current + 1);
        }),
      ),
    ).then(() => {
      if (!cancelled) setVisible(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!visible) return null;

  const percent = total ? Math.round((progress / total) * 100) : 0;

  return (
    <div
      className="site-preloader"
      role="status"
      aria-label="Loading website images and videos"
      aria-live="polite"
    >
      <div className="site-preloader-content">
        <span className="site-preloader-mark" aria-hidden="true" />
        <p className="site-preloader-brand">ROAD SMART TYRE</p>
        <p className="site-preloader-message">Getting everything ready</p>
        <div
          className="site-preloader-track"
          role="progressbar"
          aria-label="Loading media"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
        >
          <span style={{ width: `${percent}%` }} />
        </div>
        <span className="site-preloader-percent">{percent}%</span>
      </div>
    </div>
  );
}

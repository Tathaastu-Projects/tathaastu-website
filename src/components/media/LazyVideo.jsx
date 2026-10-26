"use client";

import React, { useEffect, useRef } from "react";

/**
 * Plays muted looping video only while in (or near) the viewport.
 * Cuts decode/bandwidth cost for hero/promo banners without changing layout.
 */
export default function LazyVideo({
  src,
  className,
  poster,
  preload = "metadata",
  rootMargin = "120px 0px",
  ...rest
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      video.removeAttribute("src");
      video.load();
      return undefined;
    }

    let cancelled = false;

    const ensureSrc = () => {
      if (video.getAttribute("src") !== src) {
        video.src = src;
        video.load();
      }
    };

    const tryPlay = () => {
      if (cancelled || !videoRef.current) return;
      video.muted = true;
      const p = video.play();
      if (p?.catch) p.catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          ensureSrc();
          if (video.readyState >= 2) tryPlay();
          else {
            video.addEventListener("loadeddata", tryPlay, { once: true });
            video.addEventListener("canplay", tryPlay, { once: true });
          }
        } else {
          video.pause();
        }
      },
      { root: null, rootMargin, threshold: 0.15 }
    );

    observer.observe(video);

    return () => {
      cancelled = true;
      observer.disconnect();
      video.pause();
    };
  }, [src, rootMargin]);

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      loop
      playsInline
      preload={preload}
      poster={poster}
      aria-hidden={rest["aria-hidden"] ?? "true"}
      {...rest}
    />
  );
}

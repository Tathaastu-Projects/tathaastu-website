"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

const PROMO_SRC = "/videos/short_video.mp4";

export default function FloatingPromoVideo() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const videoRef = useRef(null);

  // Only show on the marketing home page so other routes stay light.
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome || !visible) {
      setReady(false);
      return undefined;
    }

    let cancelled = false;
    const enable = () => {
      if (!cancelled) setReady(true);
    };

    // Defer media work until the browser is idle / first paint settles.
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(enable, { timeout: 2500 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timer = window.setTimeout(enable, 1200);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [isHome, visible]);

  useEffect(() => {
    if (!ready || !visible || !videoRef.current) return;
    const video = videoRef.current;
    video.muted = true;
    const playPromise = video.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {
        // Autoplay can be blocked until user interaction; keep muted loop ready.
      });
    }
  }, [ready, visible]);

  if (!isHome || !visible || !ready) return null;

  return (
    <div className="fixed right-4 bottom-[5.25rem] z-[60] w-[120px] overflow-hidden rounded-2xl bg-black shadow-[0_16px_40px_rgba(0,0,0,0.35)] sm:right-6 sm:bottom-[6.25rem] sm:w-[150px]">
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="absolute right-1.5 top-1.5 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/75 text-white transition hover:bg-black"
        aria-label="Close video"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      <video
        ref={videoRef}
        className="block h-[210px] w-full object-cover sm:h-[260px]"
        src={PROMO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-2.5 pb-2.5 pt-8">
        <span className="text-[11px] font-semibold tracking-wide text-white sm:text-xs">
          Watch Now
        </span>
      </div>
    </div>
  );
}

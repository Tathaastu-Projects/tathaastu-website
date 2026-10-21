"use client";

import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import promoVideo from "../assets/videos/short_video.mp4";

export default function FloatingPromoVideo() {
  const [visible, setVisible] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!visible || !videoRef.current) return;
    const video = videoRef.current;
    video.muted = true;
    const playPromise = video.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {
        // Autoplay can be blocked until user interaction; keep muted loop ready.
      });
    }
  }, [visible]);

  if (!visible) return null;

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
        src={promoVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-2.5 pb-2.5 pt-8">
        <span className="text-[11px] font-semibold tracking-wide text-white sm:text-xs">
          Watch Now
        </span>
      </div>
    </div>
  );
}

"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { Link } from "@/lib/router";
import { CATALOG_PRODUCTS } from "../../data/catalogProducts";
import { formatInr } from "../../data/storeData";
import shortVideo from "../../assets/videos/short_video.mp4";
import video2 from "../../assets/videos/video2.mp4";
import video4 from "../../assets/videos/video4.mp4";
import video5 from "../../assets/videos/video5.mp4";
import video6 from "../../assets/videos/video6.mp4";
import video7 from "../../assets/videos/video7.mp4";
import video8 from "../../assets/videos/video8.mp4";
import video9 from "../../assets/videos/video9.mp4";
import video10 from "../../assets/videos/video10.mp4";

const productBySlug = Object.fromEntries(CATALOG_PRODUCTS.map((product) => [product.slug, product]));

/** Max videos decoding/playing at once — keeps the page smooth. */
const MAX_CONCURRENT_PLAY = 3;

/**
 * Add more entries here as you drop new files into src/assets/videos.
 * The strip stays horizontally scrollable for future growth.
 */
export const CUSTOMER_VIDEOS = [
  { id: "video1", src: shortVideo, title: "Morning ritual", label: "Morning ritual", productSlug: "7-mukhi-rudraksha" },
  { id: "video2", src: video2, title: "Daily horoscope", label: "Daily guidance", productSlug: "amethyst-crystal" },
  { id: "video3", src: video7, title: "Evening offerings", label: "Home altar", overlay: "Evening offerings", productSlug: "annapurna-pyramid" },
  { id: "video4", src: video4, title: "Number stories", label: "Numerology", productSlug: "virgo-zodiac-bracelet" },
  { id: "video5", src: video5, title: "Vastu at home", label: "Vastu at home", productSlug: "money-wealth-pyramid" },
  { id: "video6", src: video6, title: "Crystal care", label: "Crystal care", productSlug: "green-aventurine" },
  { id: "video7", src: video8, title: "Career guidance", label: "Career", productSlug: "tigers-eye-stone" },
  { id: "video8", src: video9, title: "Relationships", label: "Relationships", productSlug: "libra-zodiac-bracelet" },
  { id: "video9", src: video10, title: "Sacred stones", label: "Sacred stones", productSlug: "lapis-lazuli" },
];

function VideoCard({ item, shouldLoad, shouldPlay, registerVideo }) {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const muteChoice = useRef(true);
  const [muted, setMuted] = useState(true);
  const product = productBySlug[item.productSlug];

  useEffect(() => {
    registerVideo(item.id, { cardRef, videoRef });
    return () => registerVideo(item.id, null);
  }, [item.id, registerVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!shouldLoad) {
      video.removeAttribute("src");
      video.load();
      return;
    }

    if (video.getAttribute("src") !== item.src) {
      video.src = item.src;
      video.load();
    }
  }, [shouldLoad, item.src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (!shouldPlay) {
      video.pause();
      return undefined;
    }

    let cancelled = false;

    const tryPlay = () => {
      if (cancelled || !videoRef.current) return;
      video.muted = muteChoice.current;
      const playPromise = video.play();
      if (playPromise?.catch) playPromise.catch(() => {});
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener("loadeddata", tryPlay, { once: true });
      video.addEventListener("canplay", tryPlay, { once: true });
    }

    return () => {
      cancelled = true;
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
    };
  }, [shouldPlay, shouldLoad]);

  const toggleMute = (event) => {
    event.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    muteChoice.current = video.muted;
    setMuted(video.muted);
  };

  return (
    <article ref={cardRef} className="astro-video-card" data-video-id={item.id}>
      <div className="astro-video-card__media">
        <video
          ref={videoRef}
          className="astro-video-card__video"
          muted
          playsInline
          loop
          preload="metadata"
          disablePictureInPicture
        />
        <span className="astro-video-card__label">{item.label}</span>
        <button
          type="button"
          className="astro-video-card__mute"
          onClick={toggleMute}
          aria-label={muted ? `Unmute ${item.title}` : `Mute ${item.title}`}
          aria-pressed={!muted}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
        {item.overlay ? <p className="astro-video-card__overlay">{item.overlay}</p> : null}
        {product ? (
          <div className="astro-video-card__shop">
            <img src={product.image} alt="" />
            <div className="astro-video-card__shop-copy">
              <p>{product.badge}</p>
              <strong>{product.name}</strong>
              <span>{formatInr(product.price)}</span>
              <span className="astro-video-card__dots" aria-hidden="true">
                <i className="is-on" />
                <i />
                <i />
              </span>
            </div>
            <a href="https://www.abhimantritstore.com/" target="_blank" rel="noopener noreferrer" className="astro-video-card__buy">
              Shop
            </a>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function CustomerVideosSection({
  title = "Explore reels",
  videos = CUSTOMER_VIDEOS,
}) {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const nodesRef = useRef(new Map());
  const ratiosRef = useRef(new Map());
  const [sectionInView, setSectionInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(
    typeof document === "undefined" ? true : document.visibilityState === "visible"
  );
  const [loadIds, setLoadIds] = useState(() => new Set());
  const [playIds, setPlayIds] = useState(() => new Set());

  const registerVideo = useCallback((id, refs) => {
    if (!refs) {
      nodesRef.current.delete(id);
      ratiosRef.current.delete(id);
      return;
    }
    nodesRef.current.set(id, refs);
  }, []);

  const recomputePlayback = useCallback(() => {
    if (!sectionInView || !pageVisible) {
      setPlayIds(new Set());
      return;
    }

    const ranked = [...ratiosRef.current.entries()]
      .filter(([, ratio]) => ratio > 0.35)
      .sort((a, b) => b[1] - a[1])
      .slice(0, MAX_CONCURRENT_PLAY)
      .map(([id]) => id);

    setPlayIds(new Set(ranked));

    const near = [...ratiosRef.current.entries()]
      .filter(([, ratio]) => ratio > 0.05)
      .map(([id]) => id);
    setLoadIds(new Set(near));
  }, [sectionInView, pageVisible]);

  useEffect(() => {
    const onVisibility = () => {
      setPageVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setSectionInView(entry.isIntersecting && entry.intersectionRatio > 0.15),
      { threshold: [0, 0.15, 0.35, 0.6] }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute("data-video-id");
          if (!id) continue;
          ratiosRef.current.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        recomputePlayback();
      },
      {
        root: track,
        threshold: [0, 0.15, 0.35, 0.5, 0.75, 1],
        rootMargin: "0px 40px",
      }
    );

    const observeAll = () => {
      track.querySelectorAll("[data-video-id]").forEach((node) => observer.observe(node));
    };
    observeAll();

    // Re-observe after React paints cards
    const raf = requestAnimationFrame(observeAll);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [videos, recomputePlayback]);

  useEffect(() => {
    recomputePlayback();
  }, [recomputePlayback]);

  const scrollByCards = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".astro-video-card");
    const amount = card ? card.getBoundingClientRect().width + 16 : 220;
    track.scrollBy({ left: dir * amount * 2, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="astro-section astro-videos-section"
      aria-labelledby="astro-videos-heading"
    >
      <div className="astro-videos-head">
        <h2 id="astro-videos-heading" className="astro-videos-kicker">
          {title} <span>({videos.length} reels)</span>
        </h2>
        <div className="astro-videos-nav" aria-hidden={videos.length < 2}>
          <button
            type="button"
            className="astro-videos-nav__btn"
            onClick={() => scrollByCards(-1)}
            aria-label="Scroll videos left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="astro-videos-nav__btn"
            onClick={() => scrollByCards(1)}
            aria-label="Scroll videos right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div ref={trackRef} className="astro-videos-track" tabIndex={0}>
        {videos.map((item) => (
          <VideoCard
            key={item.id}
            item={item}
            shouldLoad={loadIds.has(item.id) || playIds.has(item.id)}
            shouldPlay={playIds.has(item.id)}
            registerVideo={registerVideo}
          />
        ))}
      </div>
    </section>
  );
}

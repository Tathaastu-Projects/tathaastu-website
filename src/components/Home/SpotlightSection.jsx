"use client";

import React, { useState } from "react";
import { Play, ExternalLink, Sparkles } from "lucide-react";
import "./spotlight-section.css";

const YOUTUBE_ID = "c4xi7oBoeFo";
const YOUTUBE_WATCH_URL = `https://www.youtube.com/watch?v=${YOUTUBE_ID}`;
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1`;
const YOUTUBE_POSTER = `https://img.youtube.com/vi/${YOUTUBE_ID}/hqdefault.jpg`;

export default function SpotlightSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="astro-spotlight" aria-labelledby="spotlight-heading">
      <div className="astro-section astro-spotlight__inner">
        <div className="astro-spotlight__head">
          <div className="astro-spotlight__badge">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Featured Conversation</span>
          </div>
          <h2 id="spotlight-heading">In The Spotlight</h2>
          <p>
            Watch Dr. Priyanka Singh answer real questions about love, career, and life.
          </p>
        </div>

        <div className="astro-spotlight__stage">
          <div className="astro-spotlight__frame">
            <div className="astro-spotlight__trim" aria-hidden="true" />

            <div className="astro-spotlight__player">
              {playing ? (
                <iframe
                  title="Dr. Priyanka Singh — In The Spotlight"
                  src={`${YOUTUBE_EMBED_URL}&autoplay=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <button
                  type="button"
                  className="astro-spotlight__poster"
                  onClick={() => setPlaying(true)}
                  aria-label="Play spotlight video"
                >
                  <img
                    src={YOUTUBE_POSTER}
                    alt="Dr. Priyanka Singh answering questions about love, career, and life"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="astro-spotlight__play" aria-hidden="true">
                    <Play className="h-7 w-7" fill="currentColor" />
                  </span>
                </button>
              )}
            </div>

            <div className="astro-spotlight__meta">
              <div>
                <strong>Dr. Priyanka Singh</strong>
                <span>Founder & Occult Healer · Tathaastu</span>
              </div>
              <a
                href={YOUTUBE_WATCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="astro-spotlight__yt"
              >
                Watch on YouTube
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

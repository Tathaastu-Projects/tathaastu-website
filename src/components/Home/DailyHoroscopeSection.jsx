"use client";

import React, { useRef, useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Heart, Briefcase, Gem, Wallet } from "lucide-react";
import "./astro-horoscope.css";

export const ZODIAC_METADATA = {
  Aries: {
    dates: "Mar 21 – Apr 19",
    element: "Fire Element",
    ruler: "Mars",
    luckyNum: "9",
    luckyColor: "Crimson",
    mood: "Driven",
  },
  Taurus: {
    dates: "Apr 20 – May 20",
    element: "Earth Element",
    ruler: "Venus",
    luckyNum: "6",
    luckyColor: "Forest Green",
    mood: "Grounded",
  },
  Gemini: {
    dates: "May 21 – Jun 20",
    element: "Air Element",
    ruler: "Mercury",
    luckyNum: "5",
    luckyColor: "Solar Gold",
    mood: "Curious",
  },
  Cancer: {
    dates: "Jun 21 – Jul 22",
    element: "Water Element",
    ruler: "Moon",
    luckyNum: "2",
    luckyColor: "Pearl White",
    mood: "Intuitive",
  },
  Leo: {
    dates: "Jul 23 – Aug 22",
    element: "Fire Element",
    ruler: "Sun",
    luckyNum: "1",
    luckyColor: "Amber Gold",
    mood: "Radiant",
  },
  Virgo: {
    dates: "Aug 23 – Sep 22",
    element: "Earth Element",
    ruler: "Mercury",
    luckyNum: "5",
    luckyColor: "Emerald",
    mood: "Refined",
  },
  Libra: {
    dates: "Sep 23 – Oct 22",
    element: "Air Element",
    ruler: "Venus",
    luckyNum: "6",
    luckyColor: "Rose Quartz",
    mood: "Harmonious",
  },
  Scorpio: {
    dates: "Oct 23 – Nov 21",
    element: "Water Element",
    ruler: "Mars",
    luckyNum: "9",
    luckyColor: "Deep Maroon",
    mood: "Intuitive",
  },
  Sagittarius: {
    dates: "Nov 22 – Dec 21",
    element: "Fire Element",
    ruler: "Jupiter",
    luckyNum: "3",
    luckyColor: "Royal Purple",
    mood: "Expansive",
  },
  Capricorn: {
    dates: "Dec 22 – Jan 19",
    element: "Earth Element",
    ruler: "Saturn",
    luckyNum: "8",
    luckyColor: "Charcoal",
    mood: "Resolute",
  },
  Aquarius: {
    dates: "Jan 20 – Feb 18",
    element: "Air Element",
    ruler: "Saturn",
    luckyNum: "11",
    luckyColor: "Electric Blue",
    mood: "Visionary",
  },
  Pisces: {
    dates: "Feb 19 – Mar 20",
    element: "Water Element",
    ruler: "Jupiter",
    luckyNum: "7",
    luckyColor: "Aquamarine",
    mood: "Mystic",
  },
};

const DEFAULT_SCORE_META = [
  { key: "love", label: "Love", icon: Heart },
  { key: "career", label: "Career", icon: Briefcase },
  { key: "marriage", label: "Marriage", icon: Gem },
  { key: "finance", label: "Finance", icon: Wallet },
];

export default function DailyHoroscopeSection({
  zodiacCards = [],
  activeZodiac = 0,
  setActiveZodiac,
  goPrevZodiac,
  goNextZodiac,
  visibleZodiac = [],
  scoreMeta = DEFAULT_SCORE_META,
  leftMandala,
  rightMandala,
}) {
  const [touchStartX, setTouchStartX] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      goNextZodiac?.();
    } else if (diff < -50) {
      goPrevZodiac?.();
    }
    setTouchStartX(null);
  };

  return (
    <section id="daily-horoscope" className="astro-horoscope-section" aria-labelledby="horoscope-heading">
      {/* Slow Rotating Sacred Background Mandalas */}
      {leftMandala && (
        <img
          className="astro-horoscope-mandala astro-horoscope-mandala--left"
          src={leftMandala}
          alt=""
          aria-hidden="true"
        />
      )}
      {rightMandala && (
        <img
          className="astro-horoscope-mandala astro-horoscope-mandala--right"
          src={rightMandala}
          alt=""
          aria-hidden="true"
        />
      )}

      <div className="astro-section">
        {/* Header */}
        <div className="astro-horoscope-head">
          <div className="astro-horoscope-badge">
            <Sparkles className="h-3.5 w-3.5 astro-horoscope-badge__sparkle" />
            <span>Daily Celestial Forecast</span>
          </div>
          <h2 id="horoscope-heading">
            Your Cosmic Guidance <span>For Today</span>
          </h2>
          <p className="astro-horoscope-sub">
            Align with planetary transits, energy meters, and ancient Vedic wisdom tailored to your sun sign.
          </p>
        </div>

        {/* 3D Carousel Stage */}
        <div className="astro-horoscope-carousel">
          <button
            type="button"
            className="astro-horoscope-nav"
            onClick={goPrevZodiac}
            aria-label="Previous zodiac sign"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            className="astro-horoscope-track"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {visibleZodiac.map((z) => {
              const meta = ZODIAC_METADATA[z.name] || {
                dates: "Celestial Transit",
                element: "Cosmic",
                luckyNum: "7",
                luckyColor: "Gold",
                mood: "Harmonious",
              };
              const isActive = z.offset === 0;

              return (
                <article
                  key={`${z.name}-${z.offset}`}
                  className={`astro-horoscope-card is-offset-${Math.abs(z.offset)} ${
                    isActive ? "is-active" : ""
                  } ${z.offset < 0 ? "is-left" : ""} ${z.offset > 0 ? "is-right" : ""}`}
                  onClick={() => setActiveZodiac?.(z.index)}
                  tabIndex={isActive ? 0 : -1}
                  role="group"
                  aria-label={`${z.name} Horoscope`}
                >
                  {/* Decorative Corner Stars */}
                  <span className="astro-horoscope-card__star astro-horoscope-card__star--tl" aria-hidden="true">✦</span>
                  <span className="astro-horoscope-card__star astro-horoscope-card__star--tr" aria-hidden="true">✦</span>
                  <span className="astro-horoscope-card__star astro-horoscope-card__star--bl" aria-hidden="true">✦</span>
                  <span className="astro-horoscope-card__star astro-horoscope-card__star--br" aria-hidden="true">✦</span>

                  {/* Element Badge */}
                  <div className="astro-horoscope-card__element">
                    <span>{meta.element}</span>
                  </div>

                  {/* Zodiac Emblem Halo */}
                  <div className="astro-horoscope-card__logo">
                    <img src={z.logo} alt="" loading="lazy" />
                  </div>

                  {/* Zodiac Title & Dates */}
                  <h3>{z.name}</h3>
                  <p className="astro-horoscope-card__dates">{meta.dates}</p>

                  {/* Guidance Blurb */}
                  <p>{z.blurb}</p>

                  {/* Lucky Attributes Micro-Grid */}
                  <div className="astro-horoscope-card__lucky" aria-label="Daily Lucky Attributes">
                    <span className="astro-horoscope-lucky-pill">
                      Lucky No: <b>{meta.luckyNum}</b>
                    </span>
                    <span className="astro-horoscope-lucky-pill">
                      Color: <b>{meta.luckyColor}</b>
                    </span>
                    <span className="astro-horoscope-lucky-pill">
                      Mood: <b>{meta.mood}</b>
                    </span>
                  </div>

                  {/* Animated Aspect Energy Meters */}
                  <div className="astro-horoscope-scores" aria-label="Energy Scores">
                    {scoreMeta.map(({ key, label, icon: Icon }) => {
                      const scoreVal = z.scores?.[key] ?? 70;
                      return (
                        <div key={key} className="astro-horoscope-score">
                          <span className="astro-horoscope-score__label">
                            <Icon className="h-3.5 w-3.5" />
                            {label}
                          </span>
                          <span className="astro-horoscope-score__bar">
                            <i
                              style={{
                                width: isActive ? `${scoreVal}%` : `${Math.max(20, scoreVal - 20)}%`,
                              }}
                            />
                          </span>
                          <span className="astro-horoscope-score__percent">
                            {scoreVal}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            className="astro-horoscope-nav"
            onClick={goNextZodiac}
            aria-label="Next zodiac sign"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Quick-Select Zodiac Sign Ribbon */}
        <div className="astro-horoscope-quickbar" role="tablist" aria-label="Select Zodiac Sign">
          {zodiacCards.map((z, idx) => (
            <button
              key={z.name}
              type="button"
              role="tab"
              aria-selected={idx === activeZodiac}
              onClick={() => setActiveZodiac?.(idx)}
              className={`astro-horoscope-quickbtn ${idx === activeZodiac ? "is-active" : ""}`}
              title={z.name}
            >
              <img src={z.logo} alt="" aria-hidden="true" />
              <span>{z.name.slice(0, 3)}</span>
            </button>
          ))}
        </div>

        {/* Indicator Cosmic Dots */}
        <div className="astro-horoscope-dots" role="tablist" aria-label="Horoscope slide dots">
          {zodiacCards.map((z, idx) => (
            <button
              key={z.name}
              type="button"
              className={idx === activeZodiac ? "is-active" : ""}
              aria-label={`Jump to ${z.name}`}
              aria-selected={idx === activeZodiac}
              onClick={() => setActiveZodiac?.(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

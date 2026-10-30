"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Link } from "@/lib/router";
import { ArrowRight, Sparkles } from "lucide-react";
import { zodiacLogo } from "../../data/zodiacLogos";
import { fetchDailyHoroscopes } from "../../lib/dailyHoroscope";
import "./astro-horoscope.css";

const PERIODS = ["Today", "Tomorrow", "Week", "Month"];

const FALLBACK_CARDS = [
  {
    name: "Aries",
    blurb: "Bold, energetic, and driven. Today brings fresh momentum and opportunities to take the lead.",
    scores: { love: 50, career: 85, marriage: 62, finance: 78 },
  },
  {
    name: "Taurus",
    blurb: "Steady and grounded. Focus on comfort, patience, and one meaningful goal that builds lasting value.",
    scores: { love: 72, career: 60, marriage: 80, finance: 70 },
  },
  {
    name: "Gemini",
    blurb: "Curious energy opens doors. Conversations spark clarity—share ideas and stay flexible with plans.",
    scores: { love: 65, career: 88, marriage: 55, finance: 58 },
  },
  {
    name: "Cancer",
    blurb: "Emotional intuition is strong. Nurture close bonds and protect your peace with gentle boundaries.",
    scores: { love: 82, career: 54, marriage: 76, finance: 63 },
  },
  {
    name: "Leo",
    blurb: "Confidence shines today. Lead with warmth, celebrate progress, and let your creativity take center stage.",
    scores: { love: 78, career: 90, marriage: 68, finance: 74 },
  },
  {
    name: "Virgo",
    blurb: "Detail brings results. Organize priorities, refine routines, and trust careful steps over rush.",
    scores: { love: 58, career: 86, marriage: 70, finance: 81 },
  },
  {
    name: "Libra",
    blurb: "Balance and beauty guide you. Seek harmony in relationships and choose fairness in every decision.",
    scores: { love: 84, career: 66, marriage: 88, finance: 60 },
  },
  {
    name: "Scorpio",
    blurb: "Depth and focus intensify. Transform one lingering issue and trust your instinct on hidden truths.",
    scores: { love: 70, career: 75, marriage: 64, finance: 82 },
  },
  {
    name: "Sagittarius",
    blurb: "Adventure calls. Expand your view, say yes to learning, and keep optimism as your compass.",
    scores: { love: 67, career: 79, marriage: 58, finance: 69 },
  },
  {
    name: "Capricorn",
    blurb: "Discipline pays off. Climb steadily, honor commitments, and build toward a long-term win.",
    scores: { love: 55, career: 92, marriage: 72, finance: 88 },
  },
  {
    name: "Aquarius",
    blurb: "Fresh ideas flow freely. Innovate with community in mind and welcome unexpected allies.",
    scores: { love: 61, career: 84, marriage: 57, finance: 73 },
  },
  {
    name: "Pisces",
    blurb: "Dreams feel vivid. Soften into intuition, create space for rest, and let compassion lead.",
    scores: { love: 86, career: 52, marriage: 79, finance: 56 },
  },
];

export const ZODIAC_METADATA = {
  Aries: {
    hindi: "Mesh",
    dates: "Mar 21 – Apr 19",
    luckyNum: "9",
    luckyColor: "Crimson",
    colorHex: "#C62828",
    mood: "Driven",
    moodEmoji: "🔥",
  },
  Taurus: {
    hindi: "Vrishabh",
    dates: "Apr 20 – May 20",
    luckyNum: "6",
    luckyColor: "Forest Green",
    colorHex: "#2E7D32",
    mood: "Grounded",
    moodEmoji: "🌿",
  },
  Gemini: {
    hindi: "Mithun",
    dates: "May 21 – Jun 20",
    luckyNum: "5",
    luckyColor: "Solar Gold",
    colorHex: "#C9A227",
    mood: "Curious",
    moodEmoji: "✨",
  },
  Cancer: {
    hindi: "Kark",
    dates: "Jun 21 – Jul 22",
    luckyNum: "2",
    luckyColor: "Pearl White",
    colorHex: "#F5F5F5",
    mood: "Intuitive",
    moodEmoji: "🌙",
  },
  Leo: {
    hindi: "Singh",
    dates: "Jul 23 – Aug 22",
    luckyNum: "1",
    luckyColor: "Amber Gold",
    colorHex: "#D4A853",
    mood: "Radiant",
    moodEmoji: "😇",
  },
  Virgo: {
    hindi: "Kanya",
    dates: "Aug 23 – Sep 22",
    luckyNum: "5",
    luckyColor: "Emerald",
    colorHex: "#1B8A5A",
    mood: "Refined",
    moodEmoji: "💚",
  },
  Libra: {
    hindi: "Tula",
    dates: "Sep 23 – Oct 22",
    luckyNum: "6",
    luckyColor: "Rose Quartz",
    colorHex: "#E8A0B0",
    mood: "Harmonious",
    moodEmoji: "⚖️",
  },
  Scorpio: {
    hindi: "Vrishchik",
    dates: "Oct 23 – Nov 21",
    luckyNum: "9",
    luckyColor: "Deep Maroon",
    colorHex: "#7B1E3A",
    mood: "Focused",
    moodEmoji: "🦂",
  },
  Sagittarius: {
    hindi: "Dhanu",
    dates: "Nov 22 – Dec 21",
    luckyNum: "3",
    luckyColor: "Royal Purple",
    colorHex: "#6B5B95",
    mood: "Expansive",
    moodEmoji: "🏹",
  },
  Capricorn: {
    hindi: "Makar",
    dates: "Dec 22 – Jan 19",
    luckyNum: "8",
    luckyColor: "Charcoal",
    colorHex: "#455A64",
    mood: "Resolute",
    moodEmoji: "🏔️",
  },
  Aquarius: {
    hindi: "Kumbh",
    dates: "Jan 20 – Feb 18",
    luckyNum: "11",
    luckyColor: "Electric Blue",
    colorHex: "#0288D1",
    mood: "Visionary",
    moodEmoji: "💧",
  },
  Pisces: {
    hindi: "Meen",
    dates: "Feb 19 – Mar 20",
    luckyNum: "7",
    luckyColor: "Aquamarine",
    colorHex: "#26A69A",
    mood: "Mystic",
    moodEmoji: "🌊",
  },
};

const PILLARS = [
  { key: "love", label: "Love", tone: "love" },
  { key: "career", label: "Career", tone: "career" },
  { key: "marriage", label: "Health", tone: "health" },
  { key: "finance", label: "Money", tone: "money" },
];

function scoreLabel(value) {
  if (value >= 85) return "Strong";
  if (value >= 70) return "Good";
  if (value >= 55) return "Steady";
  return "Slow";
}

function formatStamp(period, apiDate) {
  try {
    if (period === "Week") return "This week";
    if (period === "Month") {
      return new Intl.DateTimeFormat("en-GB", {
        month: "long",
        year: "numeric",
      }).format(new Date());
    }
    const base = apiDate ? new Date(`${apiDate}T12:00:00`) : new Date();
    if (Number.isNaN(base.getTime())) {
      return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date());
    }
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(base);
  } catch {
    return "";
  }
}

export default function DailyHoroscopeSection() {
  const [period, setPeriod] = useState("Today");
  const [activeZodiac, setActiveZodiac] = useState(0);
  const [zodiacCards, setZodiacCards] = useState(FALLBACK_CARDS);
  const [loading, setLoading] = useState(true);
  const [apiDate, setApiDate] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const payload = await fetchDailyHoroscopes(period, controller.signal);
        if (cancelled) return;
        setApiDate(payload.date || null);
        setZodiacCards((prev) =>
          prev.map((card) => {
            const hit = payload.data.find((item) => item.name === card.name);
            if (!hit) return card;
            return {
              ...card,
              blurb: hit.blurb || card.blurb,
              scores: hit.scores || card.scores,
              extras: hit.extras || null,
            };
          })
        );
      } catch {
        /* keep last good / fallback cards */
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [period]);

  const dateStamp = useMemo(
    () => formatStamp(period, apiDate),
    [period, apiDate]
  );

  const active =
    zodiacCards[activeZodiac] ||
    zodiacCards[0] || {
      name: "Aries",
      blurb: "Bold energy opens the day. Lead with clarity and courage.",
      scores: { love: 70, career: 80, marriage: 65, finance: 72 },
    };

  const baseMeta = ZODIAC_METADATA[active.name] || {
    hindi: active.name,
    dates: "Celestial Transit",
    luckyNum: "7",
    luckyColor: "Gold",
    colorHex: "#D4A853",
    mood: "Harmonious",
    moodEmoji: "✨",
  };

  const meta = {
    ...baseMeta,
    ...(active.extras || {}),
  };

  const logoSrc = active.logo || zodiacLogo(active.name);

  return (
    <section
      id="daily-horoscope"
      className="astro-horoscope-section"
      aria-labelledby="horoscope-heading"
    >
      <div className="astro-section astro-horoscope-wrap">
        <div className="astro-horoscope-top">
          <div className="astro-horoscope-top__copy">
            <p className="astro-horoscope-kicker">Your Daily Horoscope</p>
            <h2 id="horoscope-heading">
              Your Cosmic Guidance <em>For Today</em>
            </h2>
            <p className="astro-horoscope-sub">
              Pick your raashi to see today’s pillars at a glance.
            </p>
          </div>

          <div className="astro-horoscope-periods" role="tablist" aria-label="Horoscope period">
            {PERIODS.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={period === item}
                className={`astro-horoscope-period ${period === item ? "is-active" : ""}`}
                onClick={() => setPeriod(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="astro-horoscope-signs" role="tablist" aria-label="Select zodiac sign">
          {zodiacCards.map((z, idx) => {
            const zMeta = ZODIAC_METADATA[z.name] || {};
            const src = z.logo || zodiacLogo(z.name);
            const isActive = idx === activeZodiac;
            return (
              <button
                key={z.name}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`astro-horoscope-sign ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveZodiac(idx)}
              >
                <span className="astro-horoscope-sign__avatar">
                  {src ? <img src={src} alt="" loading="lazy" decoding="async" /> : null}
                </span>
                <strong>{z.name}</strong>
                <span>{zMeta.hindi || z.name}</span>
              </button>
            );
          })}
        </div>

        <article
          className={`astro-horoscope-detail${loading ? " is-loading" : ""}`}
          aria-live="polite"
          aria-busy={loading}
        >
          <div className="astro-horoscope-detail__head">
            <div className="astro-horoscope-detail__identity">
              <span className="astro-horoscope-detail__avatar">
                {logoSrc ? <img src={logoSrc} alt="" /> : null}
              </span>
              <div>
                <h3>
                  {active.name}{" "}
                  <span className="astro-horoscope-detail__hindi">{meta.hindi}</span>
                </h3>
                <p>{meta.dates}</p>
              </div>
            </div>
            <span className="astro-horoscope-detail__stamp">
              {period}
              {dateStamp ? ` · ${dateStamp}` : ""}
            </span>
          </div>

          <div className="astro-horoscope-detail__body">
            <div className="astro-horoscope-detail__copy">
              <p>{active.blurb}</p>

              <div className="astro-horoscope-facts">
                <span>
                  Mood:{" "}
                  <b>
                    {meta.moodEmoji} {meta.mood}
                  </b>
                </span>
                <span>
                  Lucky #: <b className="is-accent">{meta.luckyNum}</b>
                </span>
                <span className="astro-horoscope-facts__color">
                  Color:
                  <i style={{ background: meta.colorHex }} aria-hidden="true" />
                  <b>{meta.luckyColor}</b>
                </span>
              </div>

              <div className="astro-horoscope-detail__actions">
                <Link to="/daily-horoscope" className="astro-horoscope-btn astro-horoscope-btn--primary">
                  Get my detailed horoscope
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/pricing?flow=consult&service=daily-horoscope"
                  className="astro-horoscope-btn astro-horoscope-btn--ghost"
                >
                  Talk to a specialist
                </Link>
              </div>
            </div>

            <div className="astro-horoscope-pillars" aria-label="Daily pillars">
              <div className="astro-horoscope-pillars__badge">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Energy pillars</span>
              </div>
              {PILLARS.map(({ key, label, tone }) => {
                const value = Number(active.scores?.[key] ?? 70);
                return (
                  <div key={key} className="astro-horoscope-pillar">
                    <span className="astro-horoscope-pillar__label">{label}</span>
                    <span className={`astro-horoscope-pillar__track tone-${tone}`}>
                      <i style={{ width: `${Math.max(8, Math.min(100, value))}%` }} />
                    </span>
                    <span className="astro-horoscope-pillar__state">{scoreLabel(value)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

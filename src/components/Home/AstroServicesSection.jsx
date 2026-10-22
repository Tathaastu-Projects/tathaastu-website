"use client";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "@/lib/router";
import { ArrowRight, Sparkles } from "lucide-react";
import FreeKundliLogo from "../../assets/home_services/Free-kundli.png";
import DailyHoroscopeLogo from "../../assets/home_services/Daily-Horoscope.png";
import TarotReadingLogo from "../../assets/home_services/tarot-reading.png";
import NumerologyLogo from "../../assets/home_services/Numerology.png";
import VastuLogo from "../../assets/home_services/Vastu.png";
import CrystalHealingLogo from "../../assets/home_services/crystal-healing.png";
import "./astro-services.css";

export const SERVICE_TILES = [
  {
    tag: "Vedic Chart",
    title: "Free Kundli",
    desc: "Understand Your Birth Chart And Get A Personalised View Of Your Life.",
    img: FreeKundliLogo,
    path: "/calculator",
  },
  {
    tag: "Daily Guidance",
    title: "Daily Horoscope",
    desc: "Start Your Day With Simple Guidance For What May Lie Ahead.",
    img: DailyHoroscopeLogo,
    path: "/pricing?flow=consult&service=daily-horoscope",
  },
  {
    tag: "Intuitive Cards",
    title: "Tarot Reading",
    desc: "Get A Fresh Perspective When You’re Looking For Clarity.",
    img: TarotReadingLogo,
    path: "/pricing?flow=consult&service=tarot",
  },
  {
    tag: "Sacred Numbers",
    title: "Numerology",
    desc: "Discover What Your Numbers Can Tell You About Your Journey.",
    img: NumerologyLogo,
    path: "/pricing?flow=consult&service=numerology",
  },
  {
    tag: "Space Harmony",
    title: "Vastu",
    desc: "Create A Home That Feels Balanced, Comfortable, And Positive.",
    img: VastuLogo,
    path: "/pricing?flow=consult&service=vastu",
  },
  {
    tag: "Energy Balance",
    title: "Crystal Healing",
    desc: "Bring A Little More Calm And Balance Into Your Everyday Life.",
    img: CrystalHealingLogo,
    path: "/pricing?flow=consult&service=crystal-healing",
  },
];

export default function AstroServicesSection() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Safety fallback: if IntersectionObserver is not available, immediately show
    if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(el);

    // Defensive fallback: ensure cards are always revealed after 1.2s regardless of scroll state
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`astro-services-container ${isVisible ? "is-visible" : ""}`}
    >
      <div className="astro-services-head">
        <div className="astro-services-eyebrow-badge">
          <Sparkles className="astro-services-sparkle h-3 w-3" />
          <span>Our Services</span>
          <Sparkles className="astro-services-sparkle h-3 w-3" />
        </div>
        <h2>Guidance For Every Part Of Your Journey</h2>
        <p className="astro-services-sub">
          Personalised Guidance For Your Journey, From Kundli And Astrology To Tarot, Vastu, And Healing.
        </p>
      </div>

      <div className="astro-service-grid">
        {SERVICE_TILES.map((s, idx) => (
          <Link
            key={s.title}
            to={s.path}
            className="astro-service-card"
            style={{ "--service-index": idx }}
          >
            <span className="astro-service-card__icon-wrap">
              <img src={s.img} alt={s.title} loading="lazy" />
            </span>

            <span className="astro-service-card__tag">
              <span>✦</span> {s.tag}
            </span>

            <strong className="astro-service-card__title">{s.title}</strong>
            <em className="astro-service-card__desc">{s.desc}</em>

            <span className="astro-service-card__btn" aria-hidden="true">
              <ArrowRight />
            </span>
          </Link>
        ))}
      </div>

      <div className="astro-services-cta">
        <Link to="/services" className="astro-services-cta__btn">
          View All Services <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

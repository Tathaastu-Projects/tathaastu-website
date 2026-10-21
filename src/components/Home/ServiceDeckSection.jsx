"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/router";
import kundliImg from "../../assets/AStrology kundli.jpg";
import vedicImg from "../../assets/Asstrology.jpeg";
import horoscopeImg from "../../assets/Horoscope Guidance.jpg";
import ritualImg from "../../assets/Crystal Healing.jpg";
import chakraImg from "../../assets/chakra.jpg";
import auraImg from "../../assets/Aura Healing & Scanning.jpg";
import vastuImg from "../../assets/Vastu Astrology.jpg";
import plantsImg from "../../assets/Vastu plants for positive energy.webp";
import vastuTipsImg from "../../assets/10 Vastu Tips for Home to Attract Positive Energy.webp";
import numerologyImg from "../../assets/Numerology.jpg";
import tarotImg from "../../assets/Tarot Reading.jpg";
import dowsingImg from "../../assets/dowsing.jpg";

const PANELS = [
  {
    id: "kundli",
    tab: "Vedic Kundli",
    eyebrow: "Birth chart",
    title: "Kundli, Read For The Questions You Brought",
    body: "Share your date, time, and place of birth. An expert walks through the chart with you, in plain language.",
    href: "/services/astrology-kundli",
    explore: "Explore Kundli",
    tiles: [
      { src: kundliImg, badge: "Chart", caption: "Your birth chart" },
      { src: vedicImg, badge: "Session", caption: "A guided reading" },
      { src: horoscopeImg, badge: "Today", caption: "Daily horoscope" },
    ],
  },
  {
    id: "pooja",
    tab: "Sacred Pooja",
    eyebrow: "Home ritual",
    title: "Pooja For The Day You Have In Mind",
    body: "Griha pravesh, a family pooja, or a havan. We help you arrange the ritual, the priest, and a time that suits you.",
    href: "/services/pooja-services",
    explore: "Explore Pooja",
    tiles: [
      { src: ritualImg, badge: "Ritual", caption: "A home offering" },
      { src: chakraImg, badge: "Space", caption: "A quiet corner" },
      { src: auraImg, badge: "Blessing", caption: "A prepared ceremony" },
    ],
  },
  {
    id: "vastu",
    tab: "Vastu Shastra",
    eyebrow: "Home",
    title: "Vastu For The Home You Already Live In",
    body: "We look at directions, rooms, and how you use the space, then suggest changes that do not mean tearing the house apart.",
    href: "/services/vastu-shastra",
    explore: "Explore Vastu",
    tiles: [
      { src: vastuImg, badge: "Layout", caption: "Rooms and directions" },
      { src: plantsImg, badge: "Living", caption: "Plants for the home" },
      { src: vastuTipsImg, badge: "Practice", caption: "Simple home shifts" },
    ],
  },
  {
    id: "matching",
    tab: "Horoscope Matching",
    eyebrow: "Two charts",
    title: "Matching Two Birth Charts",
    body: "A kundli comparison before marriage. You see where the charts sit well together, and where a conversation helps.",
    href: "/services/horoscope-matching",
    explore: "Explore Matching",
    tiles: [
      { src: horoscopeImg, badge: "Pair", caption: "Two charts, one reading" },
      { src: kundliImg, badge: "Kundli", caption: "The points we compare" },
      { src: numerologyImg, badge: "Names", caption: "Numbers beside the chart" },
    ],
  },
  {
    id: "healing",
    tab: "Aura & Healing",
    eyebrow: "Healing",
    title: "Crystals, Aura, And A Calmer Practice",
    body: "Crystal sessions, aura scanning, and ways to keep stones at home. These are supportive practices, not a medical treatment.",
    href: "/services/crystal-healing",
    explore: "Explore Healing",
    tiles: [
      { src: auraImg, badge: "Aura", caption: "A scanning session" },
      { src: chakraImg, badge: "Practice", caption: "A quiet sitting" },
      { src: dowsingImg, badge: "Dowsing", caption: "A second way to look" },
    ],
  },
  {
    id: "courses",
    tab: "Courses",
    eyebrow: "Study",
    title: "Learn Astrology, Vastu, And Tarot",
    body: "Classes if you want to study the practice yourself, from kundli basics to vastu, numerology, and tarot.",
    href: "/courses",
    explore: "Explore Courses",
    tiles: [
      { src: tarotImg, badge: "Tarot", caption: "Reading the cards" },
      { src: numerologyImg, badge: "Numbers", caption: "Name and date" },
      { src: plantsImg, badge: "Vastu", caption: "Study the home" },
    ],
  },
];

export default function ServiceDeckSection() {
  const rootRef = useRef(null);
  const pinRef = useRef(null);
  const [active, setActive] = useState(0);
  const [pinMode, setPinMode] = useState("top");
  const steps = Math.max(PANELS.length - 1, 1);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    if (!root || !pin) return undefined;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      root.classList.add("is-static");
      return undefined;
    }

    const cards = () => [...pin.querySelectorAll("[data-vedic-card]")];
    let frame = 0;
    let current = 0;
    let modeNow = "top";

    const update = () => {
      frame = 0;
      const rootRect = root.getBoundingClientRect();
      const pinH = pin.offsetHeight;
      const total = Math.max(root.offsetHeight - pinH, 1);
      let passed = 0;
      let mode = "top";

      if (rootRect.top > 0) {
        mode = "top";
        passed = 0;
      } else if (rootRect.bottom <= pinH + 1) {
        mode = "bottom";
        passed = total;
      } else {
        mode = "fixed";
        passed = -rootRect.top;
      }

      if (mode !== modeNow) {
        modeNow = mode;
        setPinMode(mode);
      }

      const cursor = Math.min(Math.max(passed / total, 0), 1) * steps;
      const stage = pin.querySelector(".vedic-stage");
      if (stage) stage.style.setProperty("--passed", cursor.toFixed(3));
      pin.querySelectorAll(".vedic-rims span").forEach((rim, index) => {
        const reveal = Math.min(Math.max(cursor - index, 0), 1);
        rim.style.opacity = String(reveal);
      });
      cards().forEach((card, index) => {
        const distance = index - cursor;
        if (distance > 0 && distance <= 1) {
          card.style.zIndex = "30";
          card.style.transform = `translate3d(0, ${distance * 100}%, 0)`;
          return;
        }
        card.style.zIndex = distance > 1 ? "1" : "10";
        card.style.transform = "translate3d(0, 0, 0)";
      });

      const index = Math.min(PANELS.length - 1, Math.max(0, Math.round(cursor)));
      if (index !== current) {
        current = index;
        setActive(index);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [steps]);

  const goTo = (index) => {
    const root = rootRef.current;
    const pin = pinRef.current;
    if (!root || !pin || root.classList.contains("is-static")) {
      setActive(index);
      return;
    }
    const total = Math.max(root.offsetHeight - pin.offsetHeight, 1);
    const top = root.getBoundingClientRect().top + window.scrollY + (index / steps) * total;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      ref={rootRef}
      className="vedic-deck-section"
      style={{ "--vedic-steps": steps }}
      aria-labelledby="vedic-deck-heading"
    >
      <div ref={pinRef} className={`vedic-deck-pin${pinMode === "fixed" ? " is-fixed" : ""}${pinMode === "bottom" ? " is-bottom" : ""}`}>
        <div className="vedic-deck-section__inner">
          <header className="vedic-deck-head">
            <p className="vedic-deck-pill">Practices under one roof</p>
            <h2 id="vedic-deck-heading">Choose The Guidance You Came For</h2>
          </header>

          <div className="vedic-deck-toolbar">
            <div className="vedic-tabs" role="tablist" aria-label="Practices">
              {PANELS.map((item, index) => {
                const selected = index === active;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    id={`vedic-tab-${item.id}`}
                    className={`vedic-tab${selected ? " is-on" : ""}`}
                    aria-selected={selected}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => goTo(index)}
                  >
                    <span className="vedic-tab__mark" aria-hidden="true" />
                    {item.tab}
                  </button>
                );
              })}
            </div>
            <Link to="/talk-to-astrologers" className="vedic-consult">
              Talk to an Expert <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="vedic-stack">
            <div className="vedic-stage">
              <div className="vedic-rims" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              {PANELS.map((panel, index) => (
                <div
                  key={panel.id}
                  data-vedic-card
                  className="vedic-card"
                  aria-hidden={index === active ? undefined : true}
                >
                  <div className="vedic-card__top">
                    <div>
                      <p className="vedic-card__eyebrow">{panel.eyebrow}</p>
                      <h3>{panel.title}</h3>
                      <p className="vedic-card__body">{panel.body}</p>
                    </div>
                    <Link to={panel.href} className="vedic-card__explore" tabIndex={index === active ? 0 : -1}>
                      {panel.explore} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="vedic-tiles">
                    {panel.tiles.map((tile) => (
                      <figure key={tile.caption} className="vedic-tile">
                        <img src={tile.src} alt="" />
                        <span className="vedic-tile__badge">{tile.badge}</span>
                        <figcaption>{tile.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

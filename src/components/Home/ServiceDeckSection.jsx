"use client";

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@/lib/router";
import "./astro-deck.css";

// Vedic Kundli SVGs
import kundliBirthChartSvg from "../../assets/home/Guidance/Vedic Kundli/Birth chart.svg";
import kundliGuidedReadingSvg from "../../assets/home/Guidance/Vedic Kundli/Guided reading.svg";
import kundliDailyHoroscopeSvg from "../../assets/home/Guidance/Vedic Kundli/Daily Horoscope.svg";

// Sacred Pooja SVGs
import poojaHomeOfferingSvg from "../../assets/home/Guidance/Scared Pooja/Home Offering.svg";
import poojaQuietCornerSvg from "../../assets/home/Guidance/Scared Pooja/Quite corner.svg";
import poojaPreparedCeremonySvg from "../../assets/home/Guidance/Scared Pooja/Prepared ceremony.svg";

// Vastu Shastra SVGs
import vastuRoomsDirectionsSvg from "../../assets/home/Guidance/Vastu Shastra/Rooms & Directions.svg";
import vastuPlantForHomeSvg from "../../assets/home/Guidance/Vastu Shastra/Plant for home.svg";
import vastuSimpleShiftsSvg from "../../assets/home/Guidance/Vastu Shastra/Simple home shifts.svg";

// Horoscope Matching SVGs
import matchingPairSvg from "../../assets/home/Guidance/Horoscope Matching/Two charts one reading(Pair).svg";
import matchingPointsSvg from "../../assets/home/Guidance/Horoscope Matching/The points we compare(Kundli).svg";
import matchingNumerologistSvg from "../../assets/home/Guidance/Horoscope Matching/Numerologist.svg";

// Aura & Healing SVGs
import healingScanningSvg from "../../assets/home/Guidance/Aura & Healing/Scannig session.svg";
import healingPractiseSvg from "../../assets/home/Guidance/Aura & Healing/Practise.svg";
import healingDowsingSvg from "../../assets/home/Guidance/Aura & Healing/Dowsing.svg";

// Courses SVGs
import courseTarotSvg from "../../assets/home/Guidance/Courses/Tarot.svg";
import courseNumerologySvg from "../../assets/home/Guidance/Courses/Numerology.svg";
import courseVastuSvg from "../../assets/home/Guidance/Courses/Vastu.svg";

const PANELS = [
  {
    id: "kundli",
    tab: "Vedic Kundli",
    eyebrow: "Birth Chart Guidance",
    title: "Kundli, Read For The Questions You Brought",
    body: "Share your date, time, and place of birth. An expert walks through the chart with you, in plain, compassionate language.",
    href: "/services/astrology-kundli",
    explore: "Explore Kundli",
    tiles: [
      { src: kundliBirthChartSvg, badge: "Chart", caption: "Your birth chart" },
      { src: kundliGuidedReadingSvg, badge: "Session", caption: "A guided reading" },
      { src: kundliDailyHoroscopeSvg, badge: "Today", caption: "Daily horoscope" },
    ],
  },
  {
    id: "pooja",
    tab: "Sacred Pooja",
    eyebrow: "Home Ritual",
    title: "Pooja For The Day You Have In Mind",
    body: "Griha pravesh, a family pooja, or a havan. We help you arrange the ritual, the priest, and a time that suits you.",
    href: "/services/pooja-services",
    explore: "Explore Pooja",
    tiles: [
      { src: poojaHomeOfferingSvg, badge: "Ritual", caption: "Home offerings" },
      { src: poojaQuietCornerSvg, badge: "Space", caption: "Quiet corner & altar" },
      { src: poojaPreparedCeremonySvg, badge: "Blessing", caption: "Prepared ceremony" },
    ],
  },
  {
    id: "vastu",
    tab: "Vastu Shastra",
    eyebrow: "Living Space",
    title: "Vastu For The Home You Already Live In",
    body: "We look at the directions, the rooms, and how you use the space, then suggest straightforward changes that make sense for you.",
    href: "/services/vastu-shastra",
    explore: "Explore Vastu",
    tiles: [
      { src: vastuRoomsDirectionsSvg, badge: "Layout", caption: "Rooms & directions" },
      { src: vastuPlantForHomeSvg, badge: "Plants", caption: "Plant for home" },
      { src: vastuSimpleShiftsSvg, badge: "Tips", caption: "Simple home shifts" },
    ],
  },
  {
    id: "matching",
    tab: "Horoscope Matching",
    eyebrow: "Compatibility",
    title: "Two Charts, Read Side By Side",
    body: "Bring both birth charts. We talk through what aligns naturally, where you might see friction, and what the years ahead suggest.",
    href: "/services/horoscope-matching",
    explore: "Explore Matching",
    tiles: [
      { src: matchingPairSvg, badge: "Pair", caption: "Two charts, one reading" },
      { src: matchingPointsSvg, badge: "Points", caption: "The points we compare" },
      { src: matchingNumerologistSvg, badge: "Outlook", caption: "Numerologist guidance" },
    ],
  },
  {
    id: "healing",
    tab: "Aura & Healing",
    eyebrow: "Wellbeing",
    title: "When You Need Space To Breathe",
    body: "Aura work, crystals, and quiet time with a practitioner who listens. A grounding session when everyday life feels heavy.",
    href: "/services/crystal-healing",
    explore: "Explore Healing",
    tiles: [
      { src: healingScanningSvg, badge: "Aura", caption: "Scanning session" },
      { src: healingPractiseSvg, badge: "Practice", caption: "Gentle energy practice" },
      { src: healingDowsingSvg, badge: "Quiet", caption: "Dowsing & reset" },
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
      { src: courseTarotSvg, badge: "Tarot", caption: "Tarot reading course" },
      { src: courseNumerologySvg, badge: "Numbers", caption: "Numerology course" },
      { src: courseVastuSvg, badge: "Vastu", caption: "Vastu shastra course" },
    ],
  },
];

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function ServiceDeckSection() {
  const rootRef = useRef(null);
  const pinRef = useRef(null);
  const [active, setActive] = useState(0);
  const [pinMode, setPinMode] = useState("top");
  const steps = Math.max(PANELS.length - 1, 1);

  useIsomorphicLayoutEffect(() => {
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
      <div
        ref={pinRef}
        className={`vedic-deck-pin${pinMode === "fixed" ? " is-fixed" : ""}${pinMode === "bottom" ? " is-bottom" : ""}`}
      >
        <div className="vedic-deck-section__inner">
          {/* Section Header */}
          <header className="vedic-deck-head">
            <p className="vedic-deck-pill">
              <span className="vedic-deck-pill__star">✦</span>
              <span>Practices Under One Roof</span>
              <span className="vedic-deck-pill__star">✦</span>
            </p>
            <h2 id="vedic-deck-heading">Choose The Guidance You Came For</h2>
          </header>

          {/* Navigation Toolbar */}
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
                    <span>{item.tab}</span>
                  </button>
                );
              })}
            </div>

            <Link to="/pricing?flow=consult" className="vedic-consult">
              <span>Talk to an Expert</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* 3D Stack Stage */}
          <div className="vedic-stack">
            <div className="vedic-stage">
              {/* Opulent 3D Stacked Deck Rims */}
              <div className="vedic-rims" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              {/* Stacked Cards */}
              {PANELS.map((panel, index) => (
                <div
                  key={panel.id}
                  data-vedic-card
                  className="vedic-card"
                  aria-hidden={index === active ? undefined : true}
                >
                  {/* Top Gold Trim Bar & Celestial Star Sparkles */}
                  <div className="vedic-card__trim" aria-hidden="true" />
                  <span className="vedic-card__star vedic-card__star--tl" aria-hidden="true">✦</span>
                  <span className="vedic-card__star vedic-card__star--tr" aria-hidden="true">✦</span>

                  {/* Card Header */}
                  <div className="vedic-card__top">
                    <div>
                      <p className="vedic-card__eyebrow">
                        <Sparkles className="h-3.5 w-3.5 text-[#d4a853]" aria-hidden="true" />
                        <span>{panel.eyebrow}</span>
                      </p>
                      <h3>{panel.title}</h3>
                      <p className="vedic-card__body">{panel.body}</p>
                    </div>

                    <Link
                      to={panel.href}
                      className="vedic-card__explore"
                      tabIndex={index === active ? 0 : -1}
                    >
                      <span>{panel.explore}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  {/* 3 Visual Practice Tiles */}
                  <div className="vedic-tiles">
                    {panel.tiles.map((tile) => (
                      <figure key={tile.caption} className="vedic-tile">
                        <img src={tile.src?.src || tile.src} alt={tile.caption} loading="lazy" />
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

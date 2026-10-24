"use client";

import React, { useState, useMemo } from "react";
import { Link } from "@/lib/router";
import { ArrowRight, Plus, Sparkles, MessageCircle } from "lucide-react";
import "./astro-faq.css";

export const FAQ_CATEGORIES = [
  "All",
  "General",
  "Consultations",
  "Kundli & Charts",
  "Privacy & Safety",
];

export const HOME_FAQS = [
  {
    category: "General",
    q: "What can I use Tathaastu for?",
    a: "Tathaastu helps you find authentic spiritual guidance for every area of life. You can generate your comprehensive Vedic Kundli, check daily horoscope transits, consult certified astrologers, or explore tarot reading, numerology analysis, Vastu Shastra remedies, and holistic energy healing.",
  },
  {
    category: "Consultations",
    q: "How can I talk to an expert?",
    a: "Choose a service and browse our verified Vedic experts. You can instantly connect via live chat, audio call, or video consultation based on your preference and schedule.",
  },
  {
    category: "Kundli & Charts",
    q: "What details do I need to create my Kundli?",
    a: "You will need your exact date of birth, precise time of birth, and birth city/location. These coordinates allow our astronomical calculations to map planetary positions and houses with pinpoint Vedic accuracy.",
  },
  {
    category: "Consultations",
    q: "How do I choose the right expert?",
    a: "Select your area of life — such as love & marriage, career & business, finance, or family harmony. You can then review expert ratings, years of experience, languages, and client reviews to pick the guide best suited to your needs.",
  },
  {
    category: "Consultations",
    q: "Can I ask questions during a consultation?",
    a: "Absolutely. Consultations are 100% private, interactive, and personalized. You can ask specific questions about upcoming planetary periods (Dashas), remedies, gemstones, or career moves and receive grounded, actionable clarity.",
  },
  {
    category: "General",
    q: "Is Tathaastu available anytime?",
    a: "Yes. Tathaastu is accessible online 24/7 across web and mobile. Our panel of astrologers spans global time zones, so you can book immediate sessions or schedule appointments at your convenience.",
  },
  {
    category: "Privacy & Safety",
    q: "Is my personal data and consultation 100% private?",
    a: "Complete confidentiality is our sacred commitment. Your birth details, question history, chat transcripts, and consultations are encrypted and strictly private between you and your chosen expert.",
  },
];

export default function AstroFaqSection({ id = "faq" }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState(0);

  const filteredFaqs = useMemo(() => {
    if (activeCategory === "All") return HOME_FAQS;
    return HOME_FAQS.filter((f) => f.category === activeCategory);
  }, [activeCategory]);

  const toggleFaq = (idx) => {
    setOpenFaq((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section id={id} className="astro-faq-section" aria-labelledby="faq-title">
      {/* Decorative ambient background flares */}
      <div className="astro-faq-ambient astro-faq-ambient--top" aria-hidden="true" />
      <div className="astro-faq-ambient astro-faq-ambient--bottom" aria-hidden="true" />

      <div className="astro-faq-container">
        {/* Header */}
        <div className="astro-faq-head">
          <div className="astro-faq-badge">
            <Sparkles className="h-3.5 w-3.5 astro-faq-badge__sparkle" />
            <span>Clarity & Spiritual Guidance</span>
          </div>
          <h2 id="faq-title" className="astro-faq-title">
            Frequently Asked <span>Questions</span>
          </h2>
          <p className="astro-faq-sub">
            Everything you need to know about Tathaastu, consultations, and your Vedic spiritual journey.
          </p>

          {/* Category Filter Chips */}
          <div className="astro-faq-filters" role="tablist" aria-label="FAQ categories">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenFaq(0);
                }}
                className={`astro-faq-filter-btn ${activeCategory === cat ? "is-active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Centered Accordion List */}
        <div className="astro-faq">
          {filteredFaqs.map((item, idx) => {
            const open = openFaq === idx;
            const num = String(idx + 1).padStart(2, "0");
            return (
              <div
                key={item.q}
                className={`astro-faq__item ${open ? "is-open" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="astro-faq__trigger"
                  aria-expanded={open}
                >
                  <span className="astro-faq__num" aria-hidden="true">
                    {num}
                  </span>
                  <div className="astro-faq__q-wrap">
                    <span className="astro-faq__category-tag">{item.category}</span>
                    <span className="astro-faq__q">{item.q}</span>
                  </div>
                  <span className={`astro-faq__toggle ${open ? "is-open" : ""}`} aria-hidden="true">
                    <Plus className="astro-faq__toggle-icon" />
                  </span>
                </button>
                <div className="astro-faq__content">
                  <div className="astro-faq__inner">
                    <p className="astro-faq__a">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Help Banner */}
        <div className="astro-faq-support">
          <div className="astro-faq-support__left">
            <div className="astro-faq-support__copy">
              <h4>Your planets are waiting for us</h4>
            </div>
          </div>
          <Link to="/talk-to-astrologers" className="astro-faq-support__btn">
            <MessageCircle className="h-4 w-4" />
            <span>Chat with an Astrologer</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

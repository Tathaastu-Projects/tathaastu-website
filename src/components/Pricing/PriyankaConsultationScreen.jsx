"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Clock,
  Video,
  Check,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Compass,
  ArrowLeft,
} from "lucide-react";
import "./priyanka-consultation.css";

export const PRIYANKA_PACKAGES = [
  {
    id: "01",
    serviceKey: "vastu",
    name: "Vastu Consultation",
    price: "₹21,000",
    priceInr: 21000,
    duration: "60 Minutes",
    description:
      "Understand your space through a personalised Vastu consultation with Dr. Priyanka Singh. Discuss your home, workplace, or property and explore guidance based on your space, requirements, and specific concerns.",
    inclusionsTitle: "Your Session Includes",
    inclusions: [
      {
        title: "Personalised Space Discussion",
        text: "Share your questions about your home, workplace, or property.",
      },
      {
        title: "Vastu Insights Tailored to You",
        text: "Explore how Vastu principles relate to your space, layout, and requirements.",
      },
      {
        title: "Guidance for Your Space",
        text: "Discuss suitable adjustments and recommendations based on your property's needs.",
      },
      {
        title: "Dedicated One-on-One Consultation",
        text: "Get personal attention and time to discuss your concerns directly with Dr. Priyanka Singh.",
      },
    ],
    ctaText: "Book Your Vastu Consultation",
  },
  {
    id: "02",
    serviceKey: "kundli",
    name: "Kundli Consultation",
    price: "₹21,000",
    priceInr: 21000,
    duration: "60 Minutes",
    description:
      "Explore your birth chart with Dr. Priyanka Singh and discuss the areas of life that matter most to you. Gain personalised astrological insights into your questions about career, relationships, family, personal growth, and important life decisions.",
    inclusionsTitle: "Your Session Includes",
    inclusions: [
      {
        title: "In-Depth Kundli Analysis",
        text: "Explore your birth chart and understand the astrological factors relevant to your questions.",
      },
      {
        title: "Insights into Key Life Areas",
        text: "Discuss career, relationships, family, personal growth, or other priorities.",
      },
      {
        title: "Personalised Astrological Guidance",
        text: "Explore interpretations and perspectives based on your individual birth chart.",
      },
      {
        title: "Time for Your Questions",
        text: "Have a focused conversation with Dr. Priyanka Singh about the concerns and decisions on your mind.",
      },
    ],
    ctaText: "Book Your Kundli Consultation",
  },
  {
    id: "03",
    serviceKey: "tarot",
    name: "Tarot Consultation",
    price: "₹11,000",
    priceInr: 11000,
    duration: "60 Minutes",
    description:
      "Bring your questions to a personal tarot reading with Dr. Priyanka Singh. Explore the symbolism of the cards, reflect on your current circumstances, and consider different perspectives on the areas of life you wish to understand better.",
    inclusionsTitle: "Your Session Includes",
    inclusions: [
      {
        title: "A Reading Focused on Your Questions",
        text: "Bring the situations, concerns, or decisions you would like to explore.",
      },
      {
        title: "Personalised Card Interpretation",
        text: "Understand the symbolism of the cards in relation to your questions.",
      },
      {
        title: "Insights into Your Current Situation",
        text: "Discuss themes relevant to your personal circumstances and priorities.",
      },
      {
        title: "Dedicated One-on-One Attention",
        text: "Ask questions and reflect on the insights shared during your session.",
      },
    ],
    ctaText: "Book Your Tarot Consultation",
  },
  {
    id: "04",
    serviceKey: "numerology",
    name: "Numerology Consultation",
    price: "₹11,000",
    priceInr: 11000,
    duration: "60 Minutes",
    description:
      "Explore numerology with Dr. Priyanka Singh through a personalised discussion of your numbers and the questions you would like to understand better. Discover how numerology interpretations may relate to your personal and professional interests.",
    inclusionsTitle: "Your Session Includes",
    inclusions: [
      {
        title: "A Personal Exploration of Your Numbers",
        text: "Discuss the numbers relevant to your numerology reading.",
      },
      {
        title: "Numerology Insights",
        text: "Explore traditional interpretations connected to your numbers and personal details.",
      },
      {
        title: "Guidance Based on Your Priorities",
        text: "Focus on the personal or professional areas you wish to discuss.",
      },
      {
        title: "One-on-One Discussion",
        text: "Ask questions and explore the interpretations directly with Dr. Priyanka Singh.",
      },
    ],
    ctaText: "Book Your Numerology Consultation",
  },
  {
    id: "05",
    serviceKey: "aura-energy",
    name: "Aura & Energy Consultation",
    price: "₹14,999",
    priceInr: 14999,
    duration: "60 Minutes",
    description:
      "Spend dedicated time with Dr. Priyanka Singh exploring your questions around aura and energy through a personalised spiritual consultation. Discuss your interests and concerns in a private, one-on-one setting designed around your needs.",
    inclusionsTitle: "Your Session Includes",
    inclusions: [
      {
        title: "A Personal Conversation",
        text: "Share your questions and interests around aura and energy.",
      },
      {
        title: "Individualised Spiritual Insights",
        text: "Explore perspectives relevant to the concerns you bring to the session.",
      },
      {
        title: "Guidance Focused on Your Needs",
        text: "Discuss the areas of spiritual interest that matter most to you.",
      },
      {
        title: "Time for Questions and Reflection",
        text: "Ask questions and discuss the guidance shared during your consultation.",
      },
    ],
    ctaText: "Book Your Aura & Energy Consultation",
  },
];

export default function PriyankaConsultationScreen({ onSelectPackage, onBackToAll }) {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredPackages =
    selectedFilter === "all"
      ? PRIYANKA_PACKAGES
      : PRIYANKA_PACKAGES.filter((p) => p.serviceKey === selectedFilter);

  const handleBook = (pkg) => {
    if (onSelectPackage) {
      onSelectPackage(pkg);
    }
  };

  return (
    <section className="priyanka-screen" id="priyanka-consultations">
      <div className="priyanka-screen__nebula" aria-hidden="true" />

      <div className="priyanka-screen__wrap">
        {/* =============================================================
            HERO HEADER
            ============================================================= */}
        <div className="priyanka-hero">
          <div className="priyanka-badge">
            <Sparkles size={14} />
            <span>EXCLUSIVE CONSULTATIONS WITH OUR FOUNDER</span>
            <Sparkles size={14} />
          </div>

          <h1 className="priyanka-hero__title">
            Personalised Guidance with <span>Dr. Priyanka Singh</span>
          </h1>

          <p className="priyanka-hero__copy">
            Some questions deserve more time, attention, and a personal conversation. Dr. Priyanka Singh offers dedicated one-on-one consultations for those seeking deeper insights into their lives, decisions, and personal concerns.
          </p>

          <p className="priyanka-hero__copy-sub">
            Choose from five specialised consultations and spend an hour discussing what matters to you, with guidance tailored to your needs.
          </p>

          {/* 3 VIP SPECS PILLS */}
          <div className="priyanka-specs-bar">
            <div className="priyanka-spec-pill">
              <div className="priyanka-spec-pill__icon">
                <Clock size={16} />
              </div>
              <div className="priyanka-spec-pill__text">
                <span className="priyanka-spec-pill__label">Consultation Duration</span>
                <span className="priyanka-spec-pill__val">60 Minutes</span>
              </div>
            </div>

            <div className="priyanka-spec-pill">
              <div className="priyanka-spec-pill__icon">
                <Video size={16} />
              </div>
              <div className="priyanka-spec-pill__text">
                <span className="priyanka-spec-pill__label">Format</span>
                <span className="priyanka-spec-pill__val">Face-to-Face or Video Call</span>
              </div>
            </div>

            <div className="priyanka-spec-pill">
              <div className="priyanka-spec-pill__icon">
                <Sparkles size={16} />
              </div>
              <div className="priyanka-spec-pill__text">
                <span className="priyanka-spec-pill__label">Starting Price</span>
                <span className="priyanka-spec-pill__val">₹11,000</span>
              </div>
            </div>
          </div>
        </div>

        {/* =============================================================
            FOUNDER SPOTLIGHT CARD
            ============================================================= */}
        <div className="priyanka-spotlight">
          <div className="priyanka-spotlight__left">
            <div className="priyanka-spotlight__avatar-frame">
              <img
                src="/Priyanka.webp"
                alt="Dr. Priyanka Singh - Founder of Tathaastu"
                className="priyanka-spotlight__avatar-img"
              />
            </div>
            <div className="priyanka-spotlight__info">
              <h3>Dr. Priyanka Singh</h3>
              <p>Founder &amp; Occult Healer · Lead Spiritual Mentor</p>
            </div>
          </div>

          <div className="priyanka-spotlight__badges">
            <span className="priyanka-spotlight__badge">
              <Award size={14} className="text-[#d4a853]" />
              <span>15+ Years Mastery</span>
            </span>
            <span className="priyanka-spotlight__badge">
              <Users size={14} className="text-[#d4a853]" />
              <span>10 Lakh+ Seekers Guided</span>
            </span>
            <span className="priyanka-spotlight__badge">
              <ShieldCheck size={14} className="text-[#d4a853]" />
              <span>100% Confidential 1-on-1</span>
            </span>
          </div>
        </div>

        {/* =============================================================
            FILTER NAVIGATION BAR
            ============================================================= */}
        <div className="priyanka-filter-nav">
          <button
            type="button"
            className={`priyanka-filter-btn ${selectedFilter === "all" ? "is-active" : ""}`}
            onClick={() => setSelectedFilter("all")}
          >
            <span>All Consultations (5)</span>
          </button>
          <button
            type="button"
            className={`priyanka-filter-btn ${selectedFilter === "vastu" ? "is-active" : ""}`}
            onClick={() => setSelectedFilter("vastu")}
          >
            <span>1. Vastu Consultation (₹21,000)</span>
          </button>
          <button
            type="button"
            className={`priyanka-filter-btn ${selectedFilter === "kundli" ? "is-active" : ""}`}
            onClick={() => setSelectedFilter("kundli")}
          >
            <span>2. Kundli Consultation (₹21,000)</span>
          </button>
          <button
            type="button"
            className={`priyanka-filter-btn ${selectedFilter === "tarot" ? "is-active" : ""}`}
            onClick={() => setSelectedFilter("tarot")}
          >
            <span>3. Tarot Consultation (₹11,000)</span>
          </button>
          <button
            type="button"
            className={`priyanka-filter-btn ${selectedFilter === "numerology" ? "is-active" : ""}`}
            onClick={() => setSelectedFilter("numerology")}
          >
            <span>4. Numerology Consultation (₹11,000)</span>
          </button>
          <button
            type="button"
            className={`priyanka-filter-btn ${selectedFilter === "aura-energy" ? "is-active" : ""}`}
            onClick={() => setSelectedFilter("aura-energy")}
          >
            <span>5. Aura &amp; Energy Consultation (₹14,999)</span>
          </button>
        </div>

        {/* =============================================================
            THE 5 PACKAGES GRID
            ============================================================= */}
        <div className="priyanka-packages-grid">
          {filteredPackages.map((pkg) => (
            <article key={pkg.id} className="priyanka-card">
              <div>
                <div className="priyanka-card__header">
                  <span className="priyanka-card__num-pill">
                    {pkg.id} · {pkg.name.toUpperCase()}
                  </span>
                  <span className="priyanka-card__duration-pill">
                    <Clock size={13} />
                    <span>{pkg.duration}</span>
                  </span>
                </div>

                <div className="priyanka-card__price-row">
                  <span className="priyanka-card__price-val">{pkg.price}</span>
                  <span className="priyanka-card__price-sub">| {pkg.duration}</span>
                </div>

                <h2 className="priyanka-card__title">{pkg.name}</h2>
                <p className="priyanka-card__desc">{pkg.description}</p>

                <div className="priyanka-card__divider" />

                <div className="priyanka-card__inclusions-head">
                  <Sparkles size={14} />
                  <span>{pkg.inclusionsTitle}</span>
                </div>

                <ul className="priyanka-card__inclusions-list">
                  {pkg.inclusions.map((item, idx) => (
                    <li key={idx} className="priyanka-card__inclusion-item">
                      <Check size={16} className="priyanka-card__inclusion-icon" />
                      <span>
                        <strong>{item.title}:</strong> {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleBook(pkg)}
                className="priyanka-card__btn"
              >
                <span>{pkg.ctaText}</span>
                <ArrowRight size={17} />
              </button>
            </article>
          ))}
        </div>

        {/* =============================================================
            CONCIERGE REASSURANCE FOOTER
            ============================================================= */}
        <div className="priyanka-concierge">
          <div className="priyanka-concierge__items">
            <div className="priyanka-concierge__item">
              <ShieldCheck size={18} className="priyanka-concierge__item-icon" />
              <span>Direct, private 1-on-1 consultation with Founder Dr. Priyanka Singh</span>
            </div>
            <div className="priyanka-concierge__item">
              <Compass size={18} className="priyanka-concierge__item-icon" />
              <span>Full 60-Minute in-depth clarity &amp; personalized remedies</span>
            </div>
          </div>

          {onBackToAll && (
            <button
              type="button"
              onClick={onBackToAll}
              className="priyanka-concierge__back-btn"
            >
              <ArrowLeft size={15} />
              <span>View All Astrologer Plans</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

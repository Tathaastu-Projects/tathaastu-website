"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  User,
  HelpCircle,
  CheckCircle2,
  Lock,
  MessageCircle,
  Eye,
  Flame,
  Compass
} from "lucide-react";
import { SPREAD_POSITIONS, QUICK_QUESTIONS, TAROT_DECK } from "../../data/tarotData";
import "./free-tarot.css";

// Ornate Sacred Mandala for Card Back
function TarotMandalaBack() {
  return (
    <svg viewBox="0 0 100 160" className="tarot-card-back__mandala" fill="none">
      {/* Outer Border Filigree */}
      <rect x="5" y="5" width="90" height="150" rx="6" stroke="#D4A853" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
      <rect x="9" y="9" width="82" height="142" rx="4" stroke="#D4A853" strokeWidth="1.2" opacity="0.8" />
      
      {/* Central Cosmic Sun & Mandala */}
      <circle cx="50" cy="80" r="28" stroke="#D4A853" strokeWidth="1" opacity="0.5" />
      <circle cx="50" cy="80" r="22" stroke="#ECD599" strokeWidth="1.2" />
      <circle cx="50" cy="80" r="14" fill="#0C2B22" stroke="#D4A853" strokeWidth="1.5" />
      
      {/* Sunburst Rays */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1="50"
          y1="80"
          x2={50 + 20 * Math.cos((deg * Math.PI) / 180)}
          y2={80 + 20 * Math.sin((deg * Math.PI) / 180)}
          stroke="#ECD599"
          strokeWidth="1.2"
          opacity="0.8"
        />
      ))}
      
      {/* Crescent Moons Top and Bottom */}
      <path d="M50 36 C42 42, 42 54, 50 60 C45 54, 45 42, 50 36 Z" fill="#D4A853" opacity="0.8" />
      <path d="M50 124 C42 118, 42 106, 50 100 C45 106, 45 118, 50 124 Z" fill="#D4A853" opacity="0.8" />
      
      {/* 4 Corner Sacred Eye & Stars */}
      <circle cx="20" cy="24" r="2.5" fill="#ECD599" />
      <circle cx="80" cy="24" r="2.5" fill="#ECD599" />
      <circle cx="20" cy="136" r="2.5" fill="#ECD599" />
      <circle cx="80" cy="136" r="2.5" fill="#ECD599" />
      
      {/* Sacred Cross Center */}
      <polygon points="50,73 52,79 58,80 52,81 50,87 48,81 42,80 48,79" fill="#ECD599" />
    </svg>
  );
}

// Iconic Symbolic Vector Artwork for Each Major Arcana Archetype
function TarotCardSymbol({ icon }) {
  switch (icon) {
    case "sun":
      return (
        <svg viewBox="0 0 60 60" className="tarot-card-front__symbol">
          <circle cx="30" cy="30" r="14" fill="#D4A853" opacity="0.3" />
          <circle cx="30" cy="30" r="10" stroke="#ECD599" strokeWidth="2" fill="#2A1F11" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line
              key={a}
              x1="30"
              y1="30"
              x2={30 + 22 * Math.cos((a * Math.PI) / 180)}
              y2={30 + 22 * Math.sin((a * Math.PI) / 180)}
              stroke="#D4A853"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          ))}
          <circle cx="30" cy="30" r="4" fill="#ECD599" />
        </svg>
      );
    case "moon":
    case "crescent":
      return (
        <svg viewBox="0 0 60 60" className="tarot-card-front__symbol">
          <path d="M35 12 C20 18, 20 42, 35 48 C22 44, 18 20, 35 12 Z" fill="#ECD599" stroke="#D4A853" strokeWidth="1.5" />
          <circle cx="38" cy="22" r="2" fill="#D4A853" />
          <circle cx="44" cy="32" r="1.5" fill="#ECD599" opacity="0.8" />
          <path d="M12 48 Q30 44 48 48" stroke="#D4A853" strokeWidth="2" fill="none" opacity="0.6" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 60 60" className="tarot-card-front__symbol">
          <polygon points="30,8 35,22 49,22 38,31 42,46 30,37 18,46 22,31 11,22 25,22" fill="#ECD599" stroke="#D4A853" strokeWidth="1.5" />
          <circle cx="30" cy="28" r="4" fill="#2A1F11" />
        </svg>
      );
    case "infinity":
      return (
        <svg viewBox="0 0 60 60" className="tarot-card-front__symbol">
          <path
            d="M20 30 C12 20, 4 40, 20 40 C30 40, 30 20, 40 20 C56 20, 48 40, 40 40 C30 40, 30 20, 20 20 Z"
            fill="none"
            stroke="#ECD599"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="30" cy="30" r="3" fill="#D4A853" />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 60 60" className="tarot-card-front__symbol">
          <path d="M30 48 C14 36, 10 24, 18 16 C24 10, 28 14, 30 18 C32 14, 36 10, 42 16 C50 24, 46 36, 30 48 Z" fill="#D4A853" opacity="0.35" stroke="#ECD599" strokeWidth="2" />
          <path d="M30 22 L30 42" stroke="#ECD599" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
      );
    case "scales":
      return (
        <svg viewBox="0 0 60 60" className="tarot-card-front__symbol">
          <line x1="30" y1="12" x2="30" y2="48" stroke="#ECD599" strokeWidth="2.5" />
          <line x1="14" y1="20" x2="46" y2="20" stroke="#ECD599" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M14 20 L8 34 H20 Z" fill="#D4A853" opacity="0.4" stroke="#ECD599" strokeWidth="1.5" />
          <path d="M46 20 L40 34 H52 Z" fill="#D4A853" opacity="0.4" stroke="#ECD599" strokeWidth="1.5" />
        </svg>
      );
    case "wheel":
      return (
        <svg viewBox="0 0 60 60" className="tarot-card-front__symbol">
          <circle cx="30" cy="30" r="18" stroke="#ECD599" strokeWidth="2.5" fill="none" />
          <circle cx="30" cy="30" r="8" stroke="#D4A853" strokeWidth="2" fill="#2A1F11" />
          {[0, 45, 90, 135].map((a) => (
            <line
              key={a}
              x1={30 - 18 * Math.cos((a * Math.PI) / 180)}
              y1={30 - 18 * Math.sin((a * Math.PI) / 180)}
              x2={30 + 18 * Math.cos((a * Math.PI) / 180)}
              y2={30 + 18 * Math.sin((a * Math.PI) / 180)}
              stroke="#D4A853"
              strokeWidth="2"
            />
          ))}
        </svg>
      );
    case "lightning":
      return (
        <svg viewBox="0 0 60 60" className="tarot-card-front__symbol">
          <polygon points="34,8 18,30 30,30 24,52 44,26 32,26" fill="#ECD599" stroke="#D4A853" strokeWidth="1.5" />
        </svg>
      );
    case "chalice":
      return (
        <svg viewBox="0 0 60 60" className="tarot-card-front__symbol">
          <path d="M20 16 Q30 14 40 16 L38 32 Q30 38 22 32 Z" fill="#D4A853" opacity="0.4" stroke="#ECD599" strokeWidth="2" />
          <line x1="30" y1="36" x2="30" y2="46" stroke="#ECD599" strokeWidth="2.5" />
          <line x1="22" y1="46" x2="38" y2="46" stroke="#ECD599" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 60 60" className="tarot-card-front__symbol">
          <path d="M30 12 L46 18 V32 C46 42 30 50 30 50 C30 50 14 42 14 32 V18 Z" fill="#D4A853" opacity="0.3" stroke="#ECD599" strokeWidth="2" />
          <circle cx="30" cy="30" r="5" fill="#ECD599" />
        </svg>
      );
    case "phoenix":
      return (
        <svg viewBox="0 0 60 60" className="tarot-card-front__symbol">
          <path d="M30 46 C24 38, 12 32, 10 20 C18 24, 24 30, 30 36 C36 30, 42 24, 50 20 C48 32, 36 38, 30 46 Z" fill="#ECD599" stroke="#D4A853" strokeWidth="1.5" />
          <circle cx="30" cy="22" r="3.5" fill="#ECD599" />
        </svg>
      );
    case "lantern":
      return (
        <svg viewBox="0 0 60 60" className="tarot-card-front__symbol">
          <circle cx="30" cy="20" r="12" fill="#D4A853" opacity="0.25" filter="blur(4px)" />
          <path d="M22 22 L24 40 H36 L38 22 Z" fill="#D4A853" opacity="0.5" stroke="#ECD599" strokeWidth="2" />
          <polygon points="30,12 20,22 40,22" fill="#2A1F11" stroke="#ECD599" strokeWidth="1.5" />
          <circle cx="30" cy="30" r="3" fill="#FFFFFF" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 60 60" className="tarot-card-front__symbol">
          <circle cx="30" cy="30" r="16" stroke="#ECD599" strokeWidth="2" fill="#D4A853" opacity="0.3" />
          <polygon points="30,18 34,26 42,30 34,34 30,42 26,34 18,30 26,26" fill="#ECD599" />
        </svg>
      );
  }
}

// Complete Tarot Card Component (With 3D Flip)
export function TarotCard({ card, isFlipped = false, onClick, className = "" }) {
  return (
    <div className={`tarot-card-scene ${className}`} onClick={onClick}>
      <div className={`tarot-card-body ${isFlipped ? "is-flipped" : ""}`}>
        {/* Back Face */}
        <div className="tarot-card-face tarot-card-face--back">
          <div className="tarot-card-back">
            <div className="tarot-card-back__inner">
              <span className="tarot-card-corner tarot-card-corner--tl" />
              <span className="tarot-card-corner tarot-card-corner--tr" />
              <span className="tarot-card-corner tarot-card-corner--bl" />
              <span className="tarot-card-corner tarot-card-corner--br" />
              <TarotMandalaBack />
            </div>
          </div>
        </div>

        {/* Front Face */}
        <div className="tarot-card-face tarot-card-face--front">
          <div className="tarot-card-front">
            <div className="tarot-card-front__frame" />
            <div className="tarot-card-front__top">
              <span className="tarot-card-front__roman">{card?.number || "✦"}</span>
              <span className="tarot-card-front__archetype">{card?.archetype || "Arcana"}</span>
            </div>
            <div className="tarot-card-front__illustration">
              <div className="tarot-card-front__halo" />
              <TarotCardSymbol icon={card?.icon} />
            </div>
            <div className="tarot-card-front__bottom">
              <div className="tarot-card-front__name">{card?.name || "Tarot"}</div>
              <div className="tarot-card-front__element">
                {card?.element} · {card?.zodiac}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FreeTarotSection({ onConsult }) {
  const [step, setStep] = useState("focus"); // "focus" | "pick" | "reveal"
  const [selectedTopic, setSelectedTopic] = useState(QUICK_QUESTIONS[0]?.label || "Love & Relationships");
  const [question, setQuestion] = useState(QUICK_QUESTIONS[0]?.question || "What guidance does tarot reveal about my relationship and soul connection?");
  const [deck, setDeck] = useState([]);
  const [pickedCards, setPickedCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([false, false, false, false, false, false]);
  const [activeDetailIdx, setActiveDetailIdx] = useState(0);

  // Initialize randomized fan of cards on mount
  useEffect(() => {
    // Shuffle and pick 14 cards for the fan
    const shuffled = [...TAROT_DECK].sort(() => 0.5 - Math.random());
    setDeck(shuffled.slice(0, 14));
  }, []);

  const handleStartPicking = (e) => {
    if (e) e.preventDefault();
    if (!question.trim()) {
      setQuestion("What important guidance does tarot have for me right now?");
    }
    setStep("pick");
  };

  const handlePickCard = (card) => {
    if (pickedCards.some((c) => c.id === card.id) || pickedCards.length >= 6) {
      return;
    }

    const nextPicked = [...pickedCards, card];
    setPickedCards(nextPicked);

    // If 6th card is picked, transition to reveal
    if (nextPicked.length === 6) {
      setTimeout(() => {
        setStep("reveal");
        // Sequentially flip cards with gold stagger
        [0, 1, 2, 3, 4, 5].forEach((idx) => {
          setTimeout(() => {
            setFlippedCards((prev) => {
              const updated = [...prev];
              updated[idx] = true;
              return updated;
            });
          }, (idx + 1) * 220);
        });
      }, 400);
    }
  };

  const handleReset = () => {
    setStep("focus");
    setPickedCards([]);
    setFlippedCards([false, false, false, false, false, false]);
    setActiveDetailIdx(0);
    // Reshuffle deck
    const shuffled = [...TAROT_DECK].sort(() => 0.5 - Math.random());
    setDeck(shuffled.slice(0, 14));
  };

  const activeCard = pickedCards[activeDetailIdx];
  const activePosition = SPREAD_POSITIONS[activeDetailIdx];

  // Synthesize an easy-to-understand summary from all 6 cards
  const masterSynthesis = useMemo(() => {
    if (pickedCards.length < 6) return "";
    const p1 = pickedCards[0]; // Past
    const p2 = pickedCards[1]; // Present
    const p3 = pickedCards[2]; // Obstacle
    const p4 = pickedCards[3]; // Advice
    const p5 = pickedCards[4]; // Future
    const p6 = pickedCards[5]; // Outcome

    return `Looking at your 6 cards, your past experiences with ${p1.name} helped build your inner strength. Right now, ${p2.name} shows that you are gaining new clarity and confidence. Your main challenge to watch out for is ${p3.name} — reminding you to let go of fear or doubts. By following the advice of ${p4.name}, you clear the way for positive changes with ${p5.name} in the coming weeks. In the end, ${p6.name} brings a rewarding outcome filled with peace, happiness, and clear direction.`;
  }, [pickedCards]);

  return (
    <section className="free-tarot-section" id="free-tarot-section">
      <div className="free-tarot-section__nebula" aria-hidden="true" />
      <div className="free-tarot-section__stars" aria-hidden="true" />

      <div className="free-tarot-wrap">
        {/* Section Heading */}
        <div className="free-tarot-head">
          <div className="free-tarot-badge">
            <Sparkles size={14} />
            <span>Free 6-Card Tarot Reading</span>
          </div>
          <h2 className="free-tarot-title">
            See What Tarot <span>Says About You</span>
          </h2>
          <p className="free-tarot-sub">
            Pick 6 cards to understand your past lessons, your present situation, challenges to watch out for, helpful advice, upcoming changes, and your final outcome.
          </p>
        </div>

        {/* ===================================================================
            STAGE 1: FOCUS & ASK YOUR QUESTION
            =================================================================== */}
        {step === "focus" && (
          <div className="tarot-stage-focus">
            <p className="tarot-theme-label">
              ✦ Choose Your Question Theme ✦
            </p>

            <div className="tarot-topics">
              {QUICK_QUESTIONS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={`tarot-topic-pill ${selectedTopic === item.label ? "is-active" : ""}`}
                  onClick={() => {
                    setSelectedTopic(item.label);
                    setQuestion(item.question);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="tarot-cta-btn"
              onClick={handleStartPicking}
            >
              <span>Shuffle Deck & Pick 6 Cards</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ===================================================================
            STAGE 2: PICK 6 CARDS FROM FAN
            =================================================================== */}
        {step === "pick" && (
          <div className="tarot-stage-pick">
            {/* Spread Dock Progress Indicator */}
            <div className="tarot-slots-dock">
              {SPREAD_POSITIONS.map((pos, idx) => {
                const isFilled = idx < pickedCards.length;
                const isCurrent = idx === pickedCards.length;
                const card = pickedCards[idx];

                return (
                  <div
                    key={pos.key}
                    className={`tarot-slot-box ${isFilled ? "is-filled" : ""} ${
                      isCurrent ? "is-current" : ""
                    }`}
                  >
                    <span className="tarot-slot-num">Card {idx + 1}</span>
                    <span className="tarot-slot-title">{pos.title}</span>
                    {isFilled && card ? (
                      <span className="tarot-slot-card-name">✦ {card.name}</span>
                    ) : (
                      <span className="tarot-slot-waiting-label">
                        {isCurrent ? "Pick Next" : "Waiting"}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="tarot-pick-prompt">
              <Sparkles size={18} className="text-[#c49232] animate-pulse" />
              <span>
                {pickedCards.length < 6 ? (
                  <>
                    Select Card {pickedCards.length + 1} of 6:{" "}
                    <span className="tarot-pick-prompt-highlight">
                      {SPREAD_POSITIONS[pickedCards.length].title} ({SPREAD_POSITIONS[pickedCards.length].subtitle})
                    </span>
                  </>
                ) : (
                  "All 6 Cards Chosen! Opening Your Reading..."
                )}
              </span>
            </p>

            {/* The 14-Card Interactive Deck Fan */}
            <div className="tarot-deck-fan">
              {deck.map((card, idx) => {
                const isPicked = pickedCards.some((c) => c.id === card.id);
                return (
                  <div
                    key={card.id || idx}
                    className={`tarot-fan-card ${isPicked ? "is-picked" : ""}`}
                    onClick={() => handlePickCard(card)}
                    role="button"
                    tabIndex={isPicked ? -1 : 0}
                    aria-label={`Select card ${idx + 1}`}
                  >
                    <TarotCard card={card} isFlipped={false} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================================================================
            STAGE 3: THE 6-CARD SACRED REVEAL
            =================================================================== */}
        {step === "reveal" && (
          <div className="tarot-stage-reveal">
            <div className="tarot-reveal-header">
              <p className="tarot-reveal-eyebrow">
                ✦ Your 6-Card Tarot Reading ✦
              </p>
              <h3 className="tarot-reveal-title">
                {selectedTopic ? `${selectedTopic} · ` : ""}
                <span className="italic font-serif">“{question}”</span>
              </h3>
              <p className="tarot-reveal-sub">
                Click any of the 6 cards below to read its meaning, advice, and message for you.
              </p>
            </div>

            {/* The 6 Cards Spread Grid */}
            <div className="tarot-spread-grid">
              {pickedCards.map((card, idx) => {
                const pos = SPREAD_POSITIONS[idx];
                const isFlipped = flippedCards[idx];
                const isSelected = activeDetailIdx === idx;

                return (
                  <div
                    key={pos.key}
                    className={`tarot-spread-item ${isSelected ? "is-selected" : ""}`}
                    onClick={() => setActiveDetailIdx(idx)}
                  >
                    <span className="tarot-position-pill">
                      Card {idx + 1}: {pos.title}
                    </span>

                    <TarotCard card={card} isFlipped={isFlipped} />

                    <div className="text-center mt-2.5">
                      <strong className="tarot-card-name-label">{card.name}</strong>
                      <span className="tarot-card-subtitle-label">{pos.subtitle}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Deep Reading Inspector & Cosmic Synthesis */}
            {activeCard && activePosition && (
              <div className="tarot-reading-deck-box">
                <div className="tarot-card-detail-view">
                  <div className="tarot-detail-card-wrap">
                    <TarotCard card={activeCard} isFlipped={true} />
                  </div>

                  <div className="tarot-detail-copy">
                    <span className="tarot-detail-eyebrow">
                      <Sparkles size={15} />
                      <span>
                        Card {activeDetailIdx + 1} of 6 · {activePosition.title} ({activePosition.subtitle})
                      </span>
                    </span>

                    <h3>{activeCard.name}</h3>
                    <p className="tarot-detail-archetype">
                      {activeCard.archetype} · Element: {activeCard.element} ({activeCard.zodiac})
                    </p>

                    <p className="tarot-detail-meaning">
                      {activeCard.meanings[activePosition.key]}
                    </p>

                    <div className="tarot-keywords-list">
                      {activeCard.keywords.map((kw) => (
                        <span key={kw} className="tarot-kw-chip">
                          ✦ {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Master Synthesis Narrative */}
                <div className="tarot-synthesis">
                  <h4>
                    <Flame size={18} className="text-[#c49232]" />
                    <span>Summary of Your 6-Card Reading</span>
                  </h4>
                  <p>{masterSynthesis}</p>
                  <div className="tarot-affirmation-box">
                    <strong>Daily Affirmation: </strong>
                    “I learn from my past, stay strong and confident today, and trust that good things are coming into my life.”
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="tarot-actions-row">
                  <button type="button" className="tarot-reset-btn" onClick={handleReset}>
                    <RotateCcw size={16} />
                    <span>Ask Another Question & Pick Again</span>
                  </button>

                  <button
                    type="button"
                    className="tarot-consult-btn"
                    onClick={() => {
                      if (onConsult) onConsult();
                      else {
                        const el = document.getElementById("astrologers-section");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    <MessageCircle size={18} />
                    <span>Consult a Tarot Expert (1-on-1 Guidance)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

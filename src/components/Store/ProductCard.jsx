"use client";

import React from "react";
import { Link } from "@/lib/router";
import {
  Star,
  Sparkles,
  ShieldCheck,
  Flame,
  Gem,
  Compass,
  Award,
  Leaf,
  Hammer,
} from "lucide-react";
import { formatInr } from "../../data/storeData";
import "./store.css";

function getProductHighlights(product) {
  if (product.highlights && Array.isArray(product.highlights) && product.highlights.length > 0) {
    return product.highlights;
  }

  const category = (product.category || "").toLowerCase();
  const badge = (product.badge || "").toLowerCase();
  const name = (product.name || "").toLowerCase();
  const slug = (product.slug || "").toLowerCase();

  // 1. Rudraksha
  if (category === "rudraksha" || slug.includes("rudraksha") || name.includes("rudraksha")) {
    const faces = product.faces;
    const faceText = faces ? `${faces} Natural\nFaces` : "Sacred\nBeads";
    return [
      { icon: Leaf, text: "100% Natural\n& Pure" },
      { icon: Award, text: faceText },
      { icon: Flame, text: "Vedic\nEnergized" },
      { icon: ShieldCheck, text: "Lab\nCertified" },
    ];
  }

  // 2. Zodiac & Healing Bracelets
  if (badge.includes("zodiac") || slug.includes("bracelet") || product.view === "bracelet" || name.includes("bracelet")) {
    return [
      { icon: Hammer, text: "Handcrafted\nBy Artisans" },
      { icon: Gem, text: "Natural\nGemstones" },
      { icon: Flame, text: "Vedic\nEnergized" },
      { icon: ShieldCheck, text: "Certified\nAuthentic" },
    ];
  }

  // 3. Crystals & Raw Stones
  if (category === "crystals" || slug.includes("crystal") || badge.includes("crystal") || product.view === "crystal" || name.includes("crystal")) {
    return [
      { icon: Gem, text: "Natural\nRaw Stone" },
      { icon: Sparkles, text: "Aura\nCleansing" },
      { icon: Flame, text: "Vedic\nEnergized" },
      { icon: ShieldCheck, text: "Lab\nTested" },
    ];
  }

  // 4. Vastu & Pyramids
  if (category === "vastu" || slug.includes("pyramid") || badge.includes("vastu") || product.view === "pyramid" || name.includes("pyramid")) {
    return [
      { icon: Compass, text: "Vastu\nHarmony" },
      { icon: Sparkles, text: "Wealth\nAttraction" },
      { icon: Gem, text: "Sacred\nGeometry" },
      { icon: Flame, text: "Vedic\nEnergized" },
    ];
  }

  // 5. Default Vedic highlights
  return [
    { icon: Hammer, text: "Handcrafted\nBy Artisans" },
    { icon: Gem, text: "100% Pure\n& Natural" },
    { icon: Flame, text: "Vedic\nEnergized" },
    { icon: ShieldCheck, text: "Certified\nQuality" },
  ];
}

export default function ProductCard({ product, imageSwap = false, hoverStrip = false }) {
  const highlights = hoverStrip ? getProductHighlights(product) : [];

  return (
    <article className={`store-card ${imageSwap ? "store-card--has-bag" : ""}`}>
      <a href="https://www.abhimantritstore.com/" target="_blank" rel="noopener noreferrer" className="store-card__media">
        <img
          className={imageSwap ? "store-card__shot" : undefined}
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
        {imageSwap && product.hoverImage ? (
          <img className="store-card__swap" src={product.hoverImage} alt="" aria-hidden="true" />
        ) : null}
        {product.badge ? <span className="store-card__badge">{product.badge}</span> : null}
        {product.rating != null ? (
          <span className="store-card__score">
            <Star className="store-card__score-star" aria-hidden="true" />
            <span>{Number(product.rating).toFixed(1)}</span>
          </span>
        ) : null}

        {/* ── Premium vertical hover strip (Ellementry-style) ── */}
        {hoverStrip ? (
          <div className="store-card__vstrip" aria-hidden="true">
            {highlights.map((item, idx) => {
              const Icon = item.icon || Sparkles;
              return (
                <div key={idx} className="store-card__vstrip-item">
                  <span className="store-card__vstrip-icon">
                    <Icon size={19} strokeWidth={1.6} />
                  </span>
                  <span className="store-card__vstrip-text">{item.text}</span>
                </div>
              );
            })}
          </div>
        ) : null}

        {/* ── Add to Bag (always on top of vertical strip, full-width at bottom) ── */}
        {imageSwap ? <span className="store-card__bag">Shop on Abhimantrit Store</span> : null}
      </a>

      <div className="store-card__body">
        <a href="https://www.abhimantritstore.com/" target="_blank" rel="noopener noreferrer" className="store-card__title">
          {product.name}
        </a>
        <div className="store-card__price">
          <strong>{formatInr(product.price)}</strong>
          {product.mrp ? <s>{formatInr(product.mrp)}</s> : null}
        </div>
        {imageSwap ? null : (
          <a
            href="https://www.abhimantritstore.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="store-btn store-btn--primary store-btn--block"
          >
            Shop Now
          </a>
        )}
      </div>
    </article>
  );
}

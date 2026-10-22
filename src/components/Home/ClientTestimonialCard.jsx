"use client";

import React, { useRef, useState } from "react";
import { Star, CheckCircle2, Quote, Sparkles } from "lucide-react";

export default function ClientTestimonialCard({ testimonial }) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0) scale3d(1, 1, 1)",
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
    isHovered: false,
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = Math.round((x / rect.width) * 100);
    const yPct = Math.round((y / rect.height) * 100);

    // Normalised coordinate range from -1 to 1
    const xNorm = (x / rect.width - 0.5) * 2;
    const yNorm = (y / rect.height - 0.5) * 2;

    // Gentle 3D tilt angle (max ~8 degrees for elegant luxury feel)
    const rotX = -yNorm * 7.5;
    const rotY = xNorm * 7.5;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(8px) scale3d(1.02, 1.02, 1.02)`,
      glareX: xPct,
      glareY: yPct,
      glareOpacity: 0.32,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0) scale3d(1, 1, 1)",
      glareX: 50,
      glareY: 50,
      glareOpacity: 0,
      isHovered: false,
    });
  };

  const TagIcon = testimonial.tagIcon || Sparkles;

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`astro-client-card ${style.isHovered ? "is-hovered" : ""}`}
      style={{
        transform: style.transform,
      }}
    >
      {/* 3D Dynamic Glare Reflection */}
      <div
        className="astro-client-card__glare"
        style={{
          background: `radial-gradient(circle at ${style.glareX}% ${style.glareY}%, rgba(218, 175, 88, 0.25) 0%, rgba(255, 255, 255, 0) 65%)`,
          opacity: style.glareOpacity,
        }}
        aria-hidden="true"
      />

      {/* Subtle watermark quote icon in the background */}
      <Quote className="astro-client-card__watermark" aria-hidden="true" />

      {/* Top Header: Service Pill Tag + 5 Stars */}
      <div className="astro-client-card__top">
        <span className="astro-client-card__service-tag">
          <TagIcon size={12} className="astro-client-card__service-icon" />
          <span>{testimonial.service}</span>
        </span>

        <div className="astro-client-card__stars" aria-label={`${testimonial.rating} out of 5 stars`}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="astro-client-card__star-icon" />
          ))}
          <span className="astro-client-card__stars-num">5.0</span>
        </div>
      </div>

      {/* Testimonial Quote */}
      <blockquote className="astro-client-card__quote">
        “{testimonial.quote}”
      </blockquote>

      {/* Customer Profile & Verification */}
      <div className="astro-client-card__meta">
        <div className="astro-client-card__avatar-wrap">
          <img
            src={testimonial.photo}
            alt={testimonial.name}
            className="astro-client-card__photo"
            loading="lazy"
          />
          <span className="astro-client-card__verified-badge" title="Verified Consultation">
            <CheckCircle2 size={13} strokeWidth={2.6} />
          </span>
        </div>

        <div className="astro-client-card__info">
          <div className="astro-client-card__name-row">
            <strong className="astro-client-card__name">
              {testimonial.name}, {testimonial.age}
            </strong>
          </div>
          <small className="astro-client-card__sub">
            {testimonial.role} · {testimonial.city}
          </small>
        </div>
      </div>
    </article>
  );
}

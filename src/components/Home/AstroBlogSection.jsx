"use client";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "@/lib/router";
import { ArrowRight, Calendar, Clock, Sparkles } from "lucide-react";
import "./astro-blog.css";

export default function AstroBlogSection({ blogs = [] }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
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
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="astro-blog-section" aria-labelledby="blog-heading">
      <div className="astro-blog-container">
        {/* Head */}
        <div className="astro-blog-head">
          <div className="astro-blog-head__copy">
            <div className="astro-blog-badge">
              <Sparkles className="h-3.5 w-3.5 astro-blog-badge__sparkle" />
              <span>Vedic Wisdom & Insights</span>
            </div>
            <h2 id="blog-heading" className="astro-blog-title">
              Explore Our Latest <span>Blogs</span>
            </h2>
            <p className="astro-blog-sub">
              Ancient astrology wisdom, Vastu secrets, horoscope transits, and holistic remedies decoded for modern living.
            </p>
          </div>
          <Link to="/blog" className="astro-blog-viewall">
            <span>View all blogs</span>
            <ArrowRight className="h-4 w-4 astro-blog-viewall__arrow" />
          </Link>
        </div>

        {/* Blog Grid with Staggered Scroll-Reveal */}
        <div className={`astro-blog-grid ${isVisible ? "is-visible" : ""}`}>
          {blogs.map((b, idx) => (
            <Link
              key={b.id || idx}
              to={`/blog/${b.slug}`}
              className="astro-blog-card"
              style={{ "--blog-index": idx }}
            >
              <span className="astro-blog-card__media">
                <img src={b.image} alt={b.title} loading="lazy" />
                <span className="astro-blog-card__scrim" aria-hidden="true" />
                <span className="astro-blog-card__category">{b.category}</span>
                {b.readTime && (
                  <span className="astro-blog-card__readtime">
                    <Clock className="h-3 w-3" />
                    <span>{b.readTime}</span>
                  </span>
                )}
              </span>
              <span className="astro-blog-card__body">
                <h3>{b.title}</h3>
                <p className="astro-blog-card__excerpt">{b.excerpt}</p>
                <span className="astro-blog-card__foot">
                  <span className="astro-blog-card__date">
                    <Calendar className="h-3.5 w-3.5 text-[#c4842a]" />
                    <span>{b.date}</span>
                  </span>
                  <span className="astro-blog-card__read-cta">
                    <span>Read Article</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "@/lib/router";
import {
  ArrowRight,
  Search,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  X,
  Compass,
  HeartHandshake,
  BookOpen,
  HelpCircle,
  Flame,
  Award,
  Layers,
} from "lucide-react";
import Footer from "../layout/Footer";
import SiteNavbar from "../layout/SiteNavbar";
import servicesData from "../data/servicesData";
import "./services-page.css";

const SERVICE_CATEGORY_MAP = {
  "astrology-kundli": "astrology",
  "vedic-astrology": "astrology",
  "horoscope-matching": "astrology",
  "vastu-shastra": "vastu",
  "numerologists": "tarot-numerology",
  "tarot-reading": "tarot-numerology",
  "pooja-services": "pooja",
  "aura-healing-scanning": "healing",
  "crystal-healing": "healing",
  "dowsing": "healing",
  "pet-healing": "healing",
};

const CATEGORIES = [
  { id: "all", label: "All Disciplines", count: 11 },
  { id: "astrology", label: "Vedic Astrology & Kundli", count: 3 },
  { id: "vastu", label: "Vaastu & Space Energy", count: 1 },
  { id: "tarot-numerology", label: "Tarot & Numerology", count: 2 },
  { id: "pooja", label: "Sacred Poojas & Havans", count: 1 },
  { id: "healing", label: "Energy & Bio-Field Healing", count: 4 },
];

const SERVICE_FOCUS_AREAS = {
  "astrology-kundli": [
    "Career & Wealth Forecast",
    "Kundli Milan & Marriage",
    "Dosh Nivaran & Grah Shanti",
    "Sade Sati & Dasha Periods",
  ],
  "vastu-shastra": [
    "Residential & Plot Energy",
    "Commercial & Office Harmony",
    "Brahmasthan Correction",
    "Remedies Without Demolition",
  ],
  "vedic-astrology": [
    "Authentic Jyotish Shastra",
    "Karmic Path & Life Purpose",
    "Planetary Transit Alignments",
    "Health & Family Harmony",
  ],
  "numerologists": [
    "Name & DOB Vibrational Analysis",
    "Life Path & Destiny Number",
    "Business Name Correction",
    "Favorable Dates & Signatures",
  ],
  "pooja-services": [
    "Navgrah Shanti Havan",
    "Griha Pravesh Sanctification",
    "Maha Mrityunjaya Japa",
    "Devotional Vedic Sankalp",
  ],
  "horoscope-matching": [
    "Ashtakoot Guna Milan (36 Gunas)",
    "Manglik Dosh In-Depth Review",
    "Emotional & Mental Compatibility",
    "Constructive Life Remedies",
  ],
  "tarot-reading": [
    "Immediate Decision Crossroads",
    "Relationship & Love Clarifications",
    "Career Shift & Astral Insights",
    "Intuitive Celtic Cross Spread",
  ],
  "crystal-healing": [
    "Chakra Alignment & Clearing",
    "Emotional Stress & Anxiety Relief",
    "Vibrational Grounding",
    "Personalized Sacred Crystals",
  ],
  "pet-healing": [
    "Anxiety & Stress Relief for Pets",
    "Gentle Energy Balancing",
    "Post-Op & Trauma Comfort",
    "Deep Harmonization with Family",
  ],
  "dowsing": [
    "Pendulum Radiesthesia Guidance",
    "Geopathic Energy Mapping",
    "Binary Life Choices & Clarity",
    "Subtle Energy Unblocking",
  ],
  "aura-healing-scanning": [
    "Bio-Field Pranic Scanning",
    "Chakra Blockage Identification",
    "Negative Frequency Cleansing",
    "Spiritual Protection Shield",
  ],
};

const SERVICE_PREP_TIPS = {
  "astrology-kundli": "Keep your exact date, time, and place of birth ready.",
  "vastu-shastra": "Keep a rough floor plan/layout and property directional orientation handy.",
  "vedic-astrology": "Have your birth details and 2-3 specific life questions prepared.",
  "numerologists": "Keep your full official name and exact date of birth ready.",
  "pooja-services": "Have your preferred ceremony date, family gotra, and sankalp intention ready.",
  "horoscope-matching": "Keep birth details of both individuals (date, time, place) ready.",
  "tarot-reading": "Focus on 1-3 open-ended questions about your relationships, career, or personal crossroads.",
  "crystal-healing": "Be in a calm, quiet room and note down any physical or emotional areas of heaviness.",
  "pet-healing": "Have your pet's recent photo, age, behavior changes, and calm space ready.",
  "dowsing": "Prepare clear, specific questions that seek directional energetic clarity.",
  "aura-healing-scanning": "Sit comfortably in a relaxed posture and note any recent feelings of fatigue or stress.",
};

const FAQS = [
  {
    q: "How do I choose the right spiritual discipline for my situation?",
    a: "If you have questions regarding timing, life purpose, career milestones, or marriage, Kundli Reading & Vedic Astrology are recommended. If you feel unexplained heaviness, financial friction, or discord at home or workplace, a Vaastu assessment provides immediate spatial alignment. For fast clarity during acute decision crossroads, Tarot Reading offers intuitive breakthroughs. You can also explore multiple disciplines with our masters.",
  },
  {
    q: "How does the consultation booking process work?",
    a: "Simply click 'Consult an Expert' on any discipline. You will be guided to our transparent Consultation Packages screen where you choose your preferred session mode (Chat, Voice Call, or Video Consultation). Once your package is confirmed, you select from our certified Vedic masters and schedule your session at your convenience.",
  },
  {
    q: "Are the suggested remedies complicated or expensive?",
    a: "No. At Tathaastu, we adhere strictly to satvik, practical, and non-fear-based Vedic remedies. Our masters recommend accessible solutions such as mantra chanting, lifestyle adjustments, charity (daan), gemstone recommendations, or simple non-demolition Vaastu alignments designed for lasting harmony.",
  },
  {
    q: "Is my personal birth data and discussion kept confidential?",
    a: "Yes, 100%. Every consultation is conducted in a strictly private and encrypted environment. We honor the sanctity of your life journey, and your birth chart details or personal conversations are never shared with third parties.",
  },
  {
    q: "Can consultations and Vaastu audits be conducted online?",
    a: "Yes. All our astrology, tarot, numerology, and healing sessions are seamlessly conducted via high-definition 1-on-1 video or voice calls. For Vaastu, our masters perform comprehensive remote audits using your directional floor plan, photographs, and satellite orientation.",
  },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedServiceId, setExpandedServiceId] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const listRef = useRef(null);

  // Smooth hash scroll on mount or hash change
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash ? window.location.hash.substring(1) : "";
      if (hash) {
        const el = document.getElementById(hash);
        if (el) {
          const yOffset = -90;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
          el.classList.add("svc-row--highlighted");
          setTimeout(() => el.classList.remove("svc-row--highlighted"), 2500);
        }
      }
    };

    const timer = setTimeout(scrollToHash, 200);
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  // Filtered services based on category and search query
  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const category = SERVICE_CATEGORY_MAP[service.id] || "other";
      const matchesCategory =
        activeCategory === "all" || category === activeCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const focusAreas = SERVICE_FOCUS_AREAS[service.id] || [];
      const whyChooseUs = Array.isArray(service.whyChooseUs)
        ? service.whyChooseUs
        : [];

      return (
        service.title.toLowerCase().includes(q) ||
        (service.description && service.description.toLowerCase().includes(q)) ||
        focusAreas.some((tag) => tag.toLowerCase().includes(q)) ||
        whyChooseUs.some((w) => w.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, searchQuery]);

  const toggleExpand = (id) => {
    setExpandedServiceId((prev) => (prev === id ? null : id));
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="svc-page">
      <SiteNavbar />

      {/* Hero Header Section */}
      <section className="svc-hero">
        <div className="svc-hero__bg-ornaments" aria-hidden="true">
          <div className="svc-hero__glow-top" />
          <div className="svc-hero__mandala" />
        </div>

        <div className="svc-hero__container">
          <div className="svc-hero__badge">
            <Sparkles className="w-4 h-4 text-[#C9A227]" />
            <span>SACRED VEDIC SCIENCES & SPIRITUAL DISCIPLINES</span>
          </div>

          <h1 className="svc-hero__title">
            Divine Guidance for Life’s <span className="svc-hero__gold">Sacred Journey</span>
          </h1>

          <p className="svc-hero__subtitle">
            Explore authentic Vedic wisdom, celestial astrology, sacred spatial Vaastu, and deep vibrational healing curated by revered masters to restore clarity, prosperity, and harmony.
          </p>

          <div className="svc-hero__trust-strip">
            <div className="svc-hero__trust-item">
              <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
              <span>100% Confidential & Sacred</span>
            </div>
            <div className="svc-hero__trust-item">
              <Award className="w-4 h-4 text-[#C9A227]" />
              <span>Certified Vedic Lineage</span>
            </div>
            <div className="svc-hero__trust-item">
              <Compass className="w-4 h-4 text-[#C9A227]" />
              <span>Actionable & Satvik Guidance</span>
            </div>
            <div className="svc-hero__trust-item">
              <Layers className="w-4 h-4 text-[#C9A227]" />
              <span>11+ Sacred Disciplines</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Interactive Filter & Search Bar */}
      <nav className="svc-control-bar" aria-label="Services Navigation and Filter">
        <div className="svc-control-bar__inner">
          {/* Search Box */}
          <div className="svc-search">
            <Search className="svc-search__icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search e.g. Kundli, Vastu, Marriage, Career, Pooja..."
              className="svc-search__input"
              aria-label="Search services"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="svc-search__clear"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="svc-categories" role="tablist">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`svc-category-btn ${isActive ? "svc-category-btn--active" : ""}`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Services List Area */}
      <main className="svc-main" ref={listRef}>
        <div className="svc-meta-status">
          <p className="svc-meta-status__text">
            Showing <strong>{filteredServices.length}</strong> {filteredServices.length === 1 ? "discipline" : "disciplines"}
            {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
          </p>
          {(searchQuery || activeCategory !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="svc-meta-status__reset"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 ? (
          <div className="svc-empty-state">
            <Compass className="w-12 h-12 text-[#C9A227] mx-auto mb-3 opacity-80" />
            <h3>No matching services found</h3>
            <p>
              We couldn&apos;t find any service matching &ldquo;{searchQuery}&rdquo;. Try searching for &ldquo;Astrology&rdquo;, &ldquo;Vastu&rdquo;, &ldquo;Tarot&rdquo;, or &ldquo;Pooja&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="svc-empty-state__btn"
            >
              View All 11 Services
            </button>
          </div>
        ) : (
          <div className="svc-cards-container">
            {filteredServices.map((service, index) => {
              const isExpanded = expandedServiceId === service.id;
              const focusAreas = SERVICE_FOCUS_AREAS[service.id] || [];
              const whyChooseUs = Array.isArray(service.whyChooseUs) ? service.whyChooseUs : [];
              const prepTip = SERVICE_PREP_TIPS[service.id];
              const categorySlug = SERVICE_CATEGORY_MAP[service.id] || "Vedic Science";

              // Consultation flow routes to pricing packages first per business rules
              const consultHref = `/pricing?flow=consult&service=${service.slug || service.id}`;

              return (
                <article
                  key={service.id}
                  id={service.slug || service.id}
                  className="svc-card"
                >
                  <div className="svc-card__body">
                    {/* Content Column */}
                    <div className="svc-card__content">
                      <div className="svc-card__top">
                        <span className="svc-card__index">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="svc-card__category-badge">
                          {categorySlug.replace("-", " & ").toUpperCase()}
                        </span>
                      </div>

                      <h2 className="svc-card__title">{service.title}</h2>

                      <p className="svc-card__description">
                        {service.description}
                      </p>

                      {/* Core Focus Areas */}
                      {focusAreas.length > 0 && (
                        <div className="svc-card__focus-areas">
                          <span className="svc-card__focus-title">Key Focus Areas:</span>
                          <div className="svc-card__focus-pills">
                            {focusAreas.map((area) => (
                              <span key={area} className="svc-card__focus-pill">
                                ✦ {area}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Benefits Checklist */}
                      {whyChooseUs.length > 0 && (
                        <ul className="svc-card__benefits">
                          {whyChooseUs.slice(0, 3).map((benefit, bIdx) => (
                            <li key={bIdx}>
                              <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Action Bar - Zero Pricing */}
                      <div className="svc-card__actions">
                        <Link
                          to={consultHref}
                          className="svc-btn-consult"
                          aria-label={`Consult an expert for ${service.title}`}
                        >
                          <span>Consult an Expert</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => toggleExpand(service.id)}
                          className="svc-btn-deepdive"
                          aria-expanded={isExpanded}
                        >
                          <span>{isExpanded ? "Close Overview" : "Vedic Deep-Dive"}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {/* In-Card Expandable Vedic Deep-Dive Drawer */}
                      {isExpanded && (
                        <div className="svc-deepdive-drawer">
                          <div className="svc-deepdive-drawer__inner">
                            <div className="svc-deepdive-block">
                              <h4 className="svc-deepdive-block__title">
                                <BookOpen className="w-4 h-4 text-[#C9A227]" />
                                <span>Detailed Vedic Overview</span>
                              </h4>
                              <p className="svc-deepdive-block__text">
                                {service.longDescription || service.description}
                              </p>
                            </div>

                            {whyChooseUs.length > 3 && (
                              <div className="svc-deepdive-block">
                                <h4 className="svc-deepdive-block__title">
                                  <Sparkles className="w-4 h-4 text-[#C9A227]" />
                                  <span>Holistic Benefits & Principles</span>
                                </h4>
                                <ul className="svc-deepdive-list">
                                  {whyChooseUs.map((point, pIdx) => (
                                    <li key={pIdx}>
                                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A227] shrink-0 mt-0.5" />
                                      <span>{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {prepTip && (
                              <div className="svc-deepdive-tip">
                                <span className="font-semibold text-[#0B4B41]">Session Preparation: </span>
                                <span>{prepTip}</span>
                              </div>
                            )}

                            <div className="svc-deepdive-cta-row">
                              <Link
                                to={consultHref}
                                className="svc-deepdive-confirm-btn"
                              >
                                Select Consultation Package for {service.title} &rarr;
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Media Column */}
                    <div className="svc-card__media-wrap">
                      <div className="svc-card__media">
                        <img
                          src={service.image}
                          alt={service.title}
                          loading="lazy"
                          decoding="async"
                          className="svc-card__img"
                        />
                        <div className="svc-card__media-badge">
                          <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
                          <span>1-on-1 Certified Guidance</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* The Tathaastu Sacred Promise Grid */}
      <section className="svc-promise-section">
        <div className="svc-promise-container">
          <div className="svc-section-header">
            <span className="svc-section-tag">THE TATHAASTU SACRED PROMISE</span>
            <h2 className="svc-section-title">Rooted in Tradition, Empowered by Ethics</h2>
            <p className="svc-section-subtitle">
              Every consultation at Tathaastu honors the sacred integrity of ancient Vedic sciences with modern confidentiality and compassion.
            </p>
          </div>

          <div className="svc-promise-grid">
            <div className="svc-promise-card">
              <div className="svc-promise-card__icon">
                <BookOpen className="w-6 h-6 text-[#C9A227]" />
              </div>
              <h3 className="svc-promise-card__title">Authentic Parampara</h3>
              <p className="svc-promise-card__desc">
                Rooted directly in classical Parashara and authentic Vedic shastras. We do not use generic horoscope templates or algorithmic shortcuts.
              </p>
            </div>

            <div className="svc-promise-card">
              <div className="svc-promise-card__icon">
                <ShieldCheck className="w-6 h-6 text-[#C9A227]" />
              </div>
              <h3 className="svc-promise-card__title">Absolute Confidentiality</h3>
              <p className="svc-promise-card__desc">
                Your birth chart, private questions, and life discussions are protected by complete client-practitioner sanctity.
              </p>
            </div>

            <div className="svc-promise-card">
              <div className="svc-promise-card__icon">
                <HeartHandshake className="w-6 h-6 text-[#C9A227]" />
              </div>
              <h3 className="svc-promise-card__title">Non-Fear-Based Remedies</h3>
              <p className="svc-promise-card__desc">
                We believe astrology empowers rather than frightens. Our remedies are uplifting, satvik, and easily integrated into daily life.
              </p>
            </div>

            <div className="svc-promise-card">
              <div className="svc-promise-card__icon">
                <Flame className="w-6 h-6 text-[#C9A227]" />
              </div>
              <h3 className="svc-promise-card__title">Holistic Harmonization</h3>
              <p className="svc-promise-card__desc">
                Synthesizing planetary timing (Kundli), physical living spaces (Vaastu), and inner vibrational energy (Aura) for true equilibrium.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Consultation Works (3-Step Pathway) */}
      <section className="svc-process-section">
        <div className="svc-process-container">
          <div className="svc-section-header">
            <span className="svc-section-tag">THREE STEPS TO CLARITY</span>
            <h2 className="svc-section-title">Your Path to Guidance</h2>
            <p className="svc-section-subtitle">
              Transparent, seamless, and personalized consultation booking.
            </p>
          </div>

          <div className="svc-process-grid">
            <div className="svc-process-card">
              <div className="svc-process-card__step">01</div>
              <h3 className="svc-process-card__title">Select Your Discipline</h3>
              <p className="svc-process-card__desc">
                Choose the service aligned with your current life crossroads — whether Kundli, Vaastu, Tarot, or Energy Healing.
              </p>
            </div>

            <div className="svc-process-card">
              <div className="svc-process-card__step">02</div>
              <h3 className="svc-process-card__title">Choose Consultation Tier</h3>
              <p className="svc-process-card__desc">
                Select your preferred session mode — Chat, Voice Call, or Video Consultation — transparently on our packages screen.
              </p>
            </div>

            <div className="svc-process-card">
              <div className="svc-process-card__step">03</div>
              <h3 className="svc-process-card__title">Connect 1-on-1 with Masters</h3>
              <p className="svc-process-card__desc">
                Receive personalized birth chart analysis, practical remedies, and lifelong guidance directly from certified masters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="svc-faq-section">
        <div className="svc-faq-container">
          <div className="svc-section-header">
            <span className="svc-section-tag">COMMON QUERIES</span>
            <h2 className="svc-section-title">Frequently Asked Questions</h2>
            <p className="svc-section-subtitle">
              Everything you need to know about preparing for and experiencing your spiritual consultation.
            </p>
          </div>

          <div className="svc-faq-list">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`svc-faq-item ${isOpen ? "svc-faq-item--open" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="svc-faq-question"
                    aria-expanded={isOpen}
                  >
                    <span className="svc-faq-question__text">{faq.q}</span>
                    <ChevronDown
                      className={`svc-faq-question__icon ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="svc-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Direct Help / Free Kundli Banner */}
      <section className="svc-help-banner">
        <div className="svc-help-banner__inner">
          <div className="svc-help-banner__content">
            <div className="svc-help-banner__tag">
              <HelpCircle className="w-4 h-4 text-[#C9A227]" />
              <span>UNSURE WHICH SERVICE YOU NEED?</span>
            </div>
            <h2 className="svc-help-banner__title">
              Let Our Vedic Counselors Guide You to the Right Discipline
            </h2>
            <p className="svc-help-banner__desc">
              Every life journey is unique. You can try our free instant AI Kundli report or explore our consultation package tiers to connect with a certified expert today.
            </p>
          </div>
          <div className="svc-help-banner__actions">
            <Link to="/calculator" className="svc-btn-banner-secondary">
              Free AI Kundli Report
            </Link>
            <Link to="/pricing?flow=consult" className="svc-btn-banner-primary">
              View Consultation Packages &rarr;
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

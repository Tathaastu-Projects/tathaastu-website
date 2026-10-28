"use client";

import React, { useState } from "react";
import { Link } from "@/lib/router";
import {
  Sparkles,
  ArrowRight,
  User,
  Users,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Heart,
  Compass,
  FileText,
  Star,
  ShieldCheck,
  PhoneCall,
  MessageCircle,
} from "lucide-react";
import "./astro-vedic-suite.css";

export default function VedicReportsSection({
  numerologyForm,
  setNumerologyForm,
  submitNumerology,
  numerologyLoading,
  numerologyError,
  numerologyResult,
  matchMakingForm,
  setMatchMakingForm,
  submitMatchMaking,
  matchMakingLoading,
  matchMakingError,
  matchMakingResult,
  kundliForm,
  setKundliForm,
  submitKundli,
  kundliLoading,
  kundliError,
  kundliResult,
  numerologyReportImg,
  matchmakingReportImg,
  kundliConsultationImg,
  navigate,
  openModal,
}) {
  const [activeTab, setActiveTab] = useState("numerology"); // "numerology" | "matchmaking" | "kundli"

  return (
    <section className="astro-vedic-suite" id="sacred-vedic-reports">
      <div className="astro-vedic-suite__nebula" aria-hidden="true" />

      <div className="astro-vedic-suite__wrap">
        {/* Section Header */}
        <div className="astro-vedic-suite__head">
          <div className="astro-vedic-badge">
            <Sparkles size={14} />
            <span>Sacred Vedic Reports & Consultation</span>
          </div>
          <h2 className="astro-vedic-title">
            Understand What The <span>Cosmos Says About You</span>
          </h2>
          <p className="astro-vedic-sub">
            Instant Vedic calculations backed by ancient scriptures, plus personalized 1-on-1 consultations with verified astrologers.
          </p>
        </div>

        {/* 3-Pillar Luxury Tab Switcher */}
        <div className="astro-vedic-tabs" role="tablist">
          {/* Tab 1: Numerology */}
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "numerology"}
            className={`astro-vedic-tab-btn ${activeTab === "numerology" ? "is-active" : ""}`}
            onClick={() => setActiveTab("numerology")}
          >
            <div className="astro-vedic-tab-btn__top">
              <div className="astro-vedic-tab-icon">
                <Compass size={18} />
              </div>
              <span className="astro-vedic-tab-pill">100% Free</span>
            </div>
            <strong className="astro-vedic-tab-btn__name">Free Numerology Report</strong>
            <span className="astro-vedic-tab-btn__desc">Life Path & Core Strengths</span>
          </button>

          {/* Tab 2: Matchmaking */}
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "matchmaking"}
            className={`astro-vedic-tab-btn ${activeTab === "matchmaking" ? "is-active" : ""}`}
            onClick={() => setActiveTab("matchmaking")}
          >
            <div className="astro-vedic-tab-btn__top">
              <div className="astro-vedic-tab-icon">
                <Heart size={18} />
              </div>
              <span className="astro-vedic-tab-pill">100% Free</span>
            </div>
            <strong className="astro-vedic-tab-btn__name">Free Matchmaking</strong>
            <span className="astro-vedic-tab-btn__desc">Vedic Kundli Milan & Compatibility</span>
          </button>

          {/* Tab 3: Kundli Consultation */}
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "kundli"}
            className={`astro-vedic-tab-btn ${activeTab === "kundli" ? "is-active" : ""}`}
            onClick={() => setActiveTab("kundli")}
          >
            <div className="astro-vedic-tab-btn__top">
              <div className="astro-vedic-tab-icon">
                <FileText size={18} />
              </div>
              <span className="astro-vedic-tab-pill astro-vedic-tab-pill--special">Special ₹499</span>
            </div>
            <strong className="astro-vedic-tab-btn__name">Full Kundli Consultation</strong>
            <span className="astro-vedic-tab-btn__desc">40+ Pg PDF + 30-Min Live Call</span>
          </button>
        </div>

        {/* ===================================================================
            TAB 1: FREE NUMEROLOGY REPORT
            =================================================================== */}
        {activeTab === "numerology" && (
          <div className="astro-vedic-stage">
            {/* Left Media Box */}
            <div className="astro-vedic-media-card">
              <div className="astro-vedic-media-wrap">
                <img
                  src={numerologyReportImg?.src || numerologyReportImg}
                  alt="Free Numerology Report"
                  className="astro-vedic-media-img"
                  loading="lazy"
                />
                <div className="astro-vedic-media-overlay-pill">
                  <Sparkles size={14} className="text-[#d4a853]" />
                  <span>Instant 5-Second Analysis · 100% Free</span>
                </div>
              </div>

              <div className="astro-vedic-highlights">
                <div className="astro-vedic-feature-row">
                  <CheckCircle2 size={16} className="astro-vedic-feature-icon" />
                  <span><strong>Life Path Number:</strong> Discover your divine soul mission & character.</span>
                </div>
                <div className="astro-vedic-feature-row">
                  <CheckCircle2 size={16} className="astro-vedic-feature-icon" />
                  <span><strong>Career & Wealth:</strong> Uncover hidden talents and financial potential.</span>
                </div>
                <div className="astro-vedic-feature-row">
                  <CheckCircle2 size={16} className="astro-vedic-feature-icon" />
                  <span><strong>Daily Lucky Tips:</strong> Personalized remedies and cosmic guidance.</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Console */}
            <div className="astro-vedic-form-card">
              <div className="astro-vedic-form-card__head">
                <p className="astro-vedic-form-eyebrow">✦ Free Numerology Report ✦</p>
                <h3 className="astro-vedic-form-title">
                  Understand What Your Numbers Say About You
                </h3>
                <p className="astro-vedic-form-sub">
                  Get a personalised look at your personality, strengths and life path with a free numerology report.
                </p>
              </div>

              <form onSubmit={submitNumerology}>
                <div className="astro-vedic-fields-grid">
                  <label className="astro-vedic-field">
                    <User size={16} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Full Name"
                      value={numerologyForm.name}
                      onChange={(e) =>
                        setNumerologyForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                      required
                    />
                  </label>

                  <label className="astro-vedic-field">
                    <Calendar size={16} />
                    <input
                      type="date"
                      name="dob"
                      placeholder="Date of Birth"
                      value={numerologyForm.dob}
                      onChange={(e) =>
                        setNumerologyForm((prev) => ({ ...prev, dob: e.target.value }))
                      }
                      required
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="astro-vedic-btn-primary"
                  disabled={numerologyLoading}
                >
                  <span>{numerologyLoading ? "Calculating Your Numbers..." : "Get Your Free Report"}</span>
                  <ArrowRight size={17} />
                </button>
              </form>

              {numerologyError && (
                <div className="astro-vedic-error">{numerologyError}</div>
              )}

              {/* Instant Numerology Result Card */}
              {numerologyResult && (
                <div className="astro-vedic-result-box">
                  <div className="astro-vedic-result-chips">
                    <span className="astro-vedic-chip astro-vedic-chip--highlight">
                      Life Path {numerologyResult.lifePathNumber}
                    </span>
                    {numerologyResult.sunSign && (
                      <span className="astro-vedic-chip">
                        Sun Sign: {numerologyResult.sunSign}
                      </span>
                    )}
                    {numerologyResult.nameNumber && (
                      <span className="astro-vedic-chip">
                        Name No: {numerologyResult.nameNumber}
                      </span>
                    )}
                  </div>

                  {numerologyResult.summary && (
                    <div className="astro-vedic-result-summary">
                      {numerologyResult.summary}
                    </div>
                  )}

                  {numerologyResult.personality && (
                    <div className="astro-vedic-result-section">
                      <h4>Personality Core</h4>
                      <p>{numerologyResult.personality}</p>
                    </div>
                  )}

                  {numerologyResult.careerMoney && (
                    <div className="astro-vedic-result-section">
                      <h4>Career &amp; Wealth</h4>
                      <p>{numerologyResult.careerMoney}</p>
                    </div>
                  )}

                  {Array.isArray(numerologyResult.strengths) && numerologyResult.strengths.length > 0 && (
                    <div className="astro-vedic-result-section">
                      <h4>Your Greatest Strengths</h4>
                      <ul>
                        {numerologyResult.strengths.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {numerologyResult.luckyTips && (
                    <div className="astro-vedic-result-section">
                      <h4>Lucky Tips &amp; Guidance</h4>
                      <p>{numerologyResult.luckyTips}</p>
                    </div>
                  )}

                  <div className="astro-vedic-result-cta">
                    <span>Want an in-depth reading with a live numerologist?</span>
                    <button
                      type="button"
                      className="astro-vedic-result-cta-btn"
                      onClick={() => navigate("/pricing?service=numerology&flow=consult")}
                    >
                      <PhoneCall size={14} />
                      <span>Consult Expert (1-on-1)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 2: FREE MATCHMAKING (KUNDLI MILAN)
            =================================================================== */}
        {activeTab === "matchmaking" && (
          <div className="astro-vedic-stage">
            {/* Left Media Box */}
            <div className="astro-vedic-media-card">
              <div className="astro-vedic-media-wrap">
                <img
                  src={matchmakingReportImg?.src || matchmakingReportImg}
                  alt="Free Matchmaking"
                  className="astro-vedic-media-img"
                  loading="lazy"
                />
                <div className="astro-vedic-media-overlay-pill">
                  <Heart size={14} className="text-[#d4a853]" />
                  <span>Authentic Vedic Ashta-Koota · 36 Guna Milan</span>
                </div>
              </div>

              <div className="astro-vedic-highlights">
                <div className="astro-vedic-feature-row">
                  <CheckCircle2 size={16} className="astro-vedic-feature-icon" />
                  <span><strong>Emotional &amp; Mental Harmony:</strong> Check mind and heart compatibility.</span>
                </div>
                <div className="astro-vedic-feature-row">
                  <CheckCircle2 size={16} className="astro-vedic-feature-icon" />
                  <span><strong>Relationship Strengths:</strong> Discover what keeps your bond strong and joyful.</span>
                </div>
                <div className="astro-vedic-feature-row">
                  <CheckCircle2 size={16} className="astro-vedic-feature-icon" />
                  <span><strong>Remedies &amp; Growth:</strong> Overcome friction with simple Vedic remedies.</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Console */}
            <div className="astro-vedic-form-card">
              <div className="astro-vedic-form-card__head">
                <p className="astro-vedic-form-eyebrow">✦ Free Matchmaking ✦</p>
                <h3 className="astro-vedic-form-title">
                  Find Your Life Partner
                </h3>
                <p className="astro-vedic-form-sub">
                  Understand your compatibility through Vedic Astrology and explore the strengths of your relationship — completely free.
                </p>
              </div>

              <form onSubmit={submitMatchMaking}>
                <div className="astro-vedic-fields-grid">
                  <label className="astro-vedic-field">
                    <User size={16} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Full Name"
                      value={matchMakingForm.name}
                      onChange={(e) =>
                        setMatchMakingForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                      required
                    />
                  </label>

                  <label className="astro-vedic-field">
                    <Users size={16} />
                    <input
                      type="text"
                      name="partnerName"
                      placeholder="Partner's Full Name"
                      value={matchMakingForm.partnerName}
                      onChange={(e) =>
                        setMatchMakingForm((prev) => ({ ...prev, partnerName: e.target.value }))
                      }
                      required
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="astro-vedic-btn-primary"
                  disabled={matchMakingLoading}
                >
                  <span>{matchMakingLoading ? "Checking Cosmic Compatibility..." : "Check Your Compatibility"}</span>
                  <ArrowRight size={17} />
                </button>
              </form>

              {matchMakingError && (
                <div className="astro-vedic-error">{matchMakingError}</div>
              )}

              {/* Instant Matchmaking Result Card */}
              {matchMakingResult && (
                <div className="astro-vedic-result-box">
                  <div className="astro-vedic-result-chips">
                    <span className="astro-vedic-chip astro-vedic-chip--highlight">
                      ★ {matchMakingResult.score}% Compatibility
                    </span>
                    <span className="astro-vedic-chip">
                      {matchMakingResult.name} &amp; {matchMakingResult.partnerName}
                    </span>
                  </div>

                  {matchMakingResult.summary && (
                    <div className="astro-vedic-result-summary">
                      {matchMakingResult.summary}
                    </div>
                  )}

                  {matchMakingResult.emotionalBond && (
                    <div className="astro-vedic-result-section">
                      <h4>Emotional Bond</h4>
                      <p>{matchMakingResult.emotionalBond}</p>
                    </div>
                  )}

                  {matchMakingResult.communication && (
                    <div className="astro-vedic-result-section">
                      <h4>Communication &amp; Understanding</h4>
                      <p>{matchMakingResult.communication}</p>
                    </div>
                  )}

                  {Array.isArray(matchMakingResult.strengths) && matchMakingResult.strengths.length > 0 && (
                    <div className="astro-vedic-result-section">
                      <h4>Relationship Strengths</h4>
                      <ul>
                        {matchMakingResult.strengths.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {matchMakingResult.advice && (
                    <div className="astro-vedic-result-section">
                      <h4>Vedic Counsel &amp; Advice</h4>
                      <p>{matchMakingResult.advice}</p>
                    </div>
                  )}

                  <div className="astro-vedic-result-cta">
                    <span>Discuss marriage, doshas, and timing with an astrologer:</span>
                    <button
                      type="button"
                      className="astro-vedic-result-cta-btn"
                      onClick={() => navigate("/pricing?service=matchmaking&flow=consult")}
                    >
                      <PhoneCall size={14} />
                      <span>Consult Love Expert</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: FULL KUNDLI CONSULTATION (₹499)
            =================================================================== */}
        {activeTab === "kundli" && (
          <div className="astro-vedic-stage">
            {/* Left Media Box */}
            <div className="astro-vedic-media-card">
              <div className="astro-vedic-media-wrap">
                <img
                  src={kundliConsultationImg?.src || kundliConsultationImg}
                  alt="Full Kundli Consultation"
                  className="astro-vedic-media-img"
                  loading="lazy"
                />
                <div className="astro-vedic-media-overlay-pill">
                  <Star size={14} className="text-[#d4a853]" />
                  <span>Complete 40+ Pg PDF + 30-Min Live Session</span>
                </div>
              </div>

              <div className="astro-vedic-highlights">
                <div className="astro-vedic-feature-row">
                  <CheckCircle2 size={16} className="astro-vedic-feature-icon" />
                  <span><strong>40+ Page Detailed PDF:</strong> Complete birth chart, planetary houses &amp; dashas.</span>
                </div>
                <div className="astro-vedic-feature-row">
                  <CheckCircle2 size={16} className="astro-vedic-feature-icon" />
                  <span><strong>30-Min Live 1-on-1 Q&amp;A:</strong> Direct audio/video call with verified Vedic master.</span>
                </div>
                <div className="astro-vedic-feature-row">
                  <CheckCircle2 size={16} className="astro-vedic-feature-icon" />
                  <span><strong>Personalized Remedies:</strong> Custom gemstones, rudraksha, and mantra solutions.</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Console */}
            <div className="astro-vedic-form-card">
              <div className="astro-vedic-form-card__head">
                <p className="astro-vedic-form-eyebrow">✦ Full Kundli Consultation ✦</p>
                <h3 className="astro-vedic-form-title">
                  Full Kundli Consultation at Just ₹499
                </h3>
                <div className="astro-vedic-price-tag">
                  <span className="astro-vedic-price-main">₹499</span>
                  <span className="astro-vedic-price-original">₹1,999</span>
                  <span className="astro-vedic-price-discount">Save 75%</span>
                </div>
                <p className="astro-vedic-form-sub">
                  Get your detailed Kundli PDF along with a 30-minute live Q&amp;A session with an expert for personalised guidance and answers to your questions.
                </p>
              </div>

              <form onSubmit={submitKundli}>
                <div className="astro-vedic-fields-grid">
                  <label className="astro-vedic-field">
                    <User size={16} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={kundliForm.name}
                      onChange={(e) =>
                        setKundliForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                      required
                    />
                  </label>

                  <label className="astro-vedic-field">
                    <Calendar size={16} />
                    <input
                      type="date"
                      name="dob"
                      placeholder="Date of Birth"
                      value={kundliForm.dob}
                      onChange={(e) =>
                        setKundliForm((prev) => ({ ...prev, dob: e.target.value }))
                      }
                      required
                    />
                  </label>

                  <label className="astro-vedic-field">
                    <Clock size={16} />
                    <input
                      type="time"
                      name="tob"
                      placeholder="Time of Birth"
                      value={kundliForm.tob}
                      onChange={(e) =>
                        setKundliForm((prev) => ({ ...prev, tob: e.target.value }))
                      }
                      required
                    />
                  </label>

                  <label className="astro-vedic-field">
                    <MapPin size={16} />
                    <input
                      type="text"
                      name="place"
                      placeholder="Place of Birth"
                      value={kundliForm.place}
                      onChange={(e) =>
                        setKundliForm((prev) => ({ ...prev, place: e.target.value }))
                      }
                      required
                    />
                  </label>
                </div>

                <div className="astro-vedic-actions-row">
                  <Link
                    to="/pricing?service=kundli&flow=consult"
                    className="astro-vedic-btn-primary"
                  >
                    <span>Book Your Consultation Now</span>
                    <ArrowRight size={17} />
                  </Link>

                  <button
                    type="submit"
                    className="astro-vedic-btn-secondary"
                    disabled={kundliLoading}
                  >
                    <span>{kundliLoading ? "Calculating..." : "Preview Birth Chart (Free)"}</span>
                  </button>
                </div>
              </form>

              {kundliError && (
                <div className="astro-vedic-error">{kundliError}</div>
              )}

              {/* Instant Kundli Preview Result Card */}
              {kundliResult && (
                <div className="astro-vedic-result-box">
                  <div className="astro-vedic-result-chips">
                    <span className="astro-vedic-chip astro-vedic-chip--highlight">
                      Sun Sign: {kundliResult.sunSign}
                    </span>
                    {kundliResult.lifePathNumber && (
                      <span className="astro-vedic-chip">
                        Life Path {kundliResult.lifePathNumber}
                      </span>
                    )}
                  </div>

                  {kundliResult.preview && (
                    <div className="astro-vedic-result-summary">
                      {kundliResult.preview}
                    </div>
                  )}

                  {kundliResult.sunSignInsight && (
                    <div className="astro-vedic-result-section">
                      <h4>Birth Chart Insight</h4>
                      <p>{kundliResult.sunSignInsight}</p>
                    </div>
                  )}

                  {Array.isArray(kundliResult.whatYouGet) && kundliResult.whatYouGet.length > 0 && (
                    <div className="astro-vedic-result-section">
                      <h4>Included in Your ₹499 Consultation</h4>
                      <ul>
                        {kundliResult.whatYouGet.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="astro-vedic-result-cta">
                    <span>Ready for your 30-min live session with an expert?</span>
                    <Link
                      to="/pricing?service=kundli&flow=consult"
                      className="astro-vedic-result-cta-btn"
                    >
                      <PhoneCall size={14} />
                      <span>Book ₹499 Session Now</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom Cross-Navigation Bar */}
        <div className="astro-vedic-footer-nav">
          <span className="astro-vedic-footer-nav__label">
            Looking for something else? Explore other sacred Vedic tools:
          </span>
          <div className="astro-vedic-footer-nav__links">
            {activeTab !== "numerology" && (
              <button
                type="button"
                className="astro-vedic-nav-chip"
                onClick={() => setActiveTab("numerology")}
              >
                <Compass size={13} />
                <span>Free Numerology Report</span>
              </button>
            )}
            {activeTab !== "matchmaking" && (
              <button
                type="button"
                className="astro-vedic-nav-chip"
                onClick={() => setActiveTab("matchmaking")}
              >
                <Heart size={13} />
                <span>Free Matchmaking (Milan)</span>
              </button>
            )}
            {activeTab !== "kundli" && (
              <button
                type="button"
                className="astro-vedic-nav-chip"
                onClick={() => setActiveTab("kundli")}
              >
                <FileText size={13} />
                <span>Full Kundli Consultation (₹499)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

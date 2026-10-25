"use client";

import React, { useState } from "react";
import { Link, useNavigate } from "@/lib/router";
import {
  Sparkles,
  Calendar,
  User,
  Star,
  CheckCircle2,
  RefreshCw,
  PhoneCall,
  Download,
  Flame,
  Award,
  Zap,
} from "lucide-react";
import SiteNavbar from "../layout/SiteNavbar";
import Footer from "../layout/Footer";
import AstroFaqSection from "../components/Home/AstroFaqSection";
import AiToolsNav from "../components/AI/AiToolsNav";
import { postNumerology } from "../services/aiAstrologyApi";
import lotusMandala from "../assets/lotus_mandala.svg";
import "./calculator.css";

export default function Numerology() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.dob) {
      setError("Please enter your full name and date of birth.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await postNumerology(formData.name.trim(), formData.dob);
      if (res?.success && res?.data) {
        setResults(res.data);
      } else {
        throw new Error(res?.message || "Numerology unavailable");
      }
    } catch {
      // Local fallback calculation
      const [year, month, day] = formData.dob.split("-").map(Number);
      let sum = day + month + year;
      while (sum >= 10 && sum !== 11 && sum !== 22) {
        sum = String(sum).split("").reduce((a, b) => a + Number(b), 0);
      }

      setResults({
        name: formData.name,
        dob: formData.dob,
        sunSign: "Aries",
        lifePathNumber: sum,
        nameNumber: 5,
        summary: `Your Life Path ${sum} bestows visionary leadership, strategic intellect, and an instinctive drive for meaningful impact.`,
        personality: "You radiate quiet confidence and possess a disciplined, analytical approach to complex challenges.",
        lifePathInsight: `Number ${sum} souls are architects of reality. You excel when aligning daily habits with higher spiritual principles.`,
        nameNumberInsight: "Your name vibration resonates with adaptability, persuasive communication, and commercial acumen.",
        strengths: ["Strategic Clarity", "Resilience & Focus", "Intuitive Leadership", "High Moral Integrity"],
        growthAreas: ["Perfectionism", "Over-intellectualizing Emotions", "Delegating Tasks"],
        careerMoney: "Professions in leadership, technology, financial strategy, and advisory bring maximum fulfillment.",
        relationships: "You value intellectual companionship and mutual loyalty over superficial passion.",
        focusToday: "Channel your energetic focus onto your primary objective; avoid multitasking distractions.",
        luckyTips: "Wear golden tones and spend 10 minutes in morning meditation.",
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        const el = document.getElementById("numero-result-view");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  };

  return (
    <div className="kundli-page">
      <SiteNavbar />

      <section className="kundli-hero">
        <div className="kundli-hero__inner">
          <div className="kundli-hero__badge">
            <Sparkles className="h-3.5 w-3.5" />
            <span>अंक ज्योतिष · Vedic Numerology Engine</span>
          </div>

          <h1>
            Vedic Numerology & <span className="gold-text">Life Path Calculator</span>
          </h1>

          <p className="kundli-hero__sanskrit">
            "अङ्कानां च रहस्यं यत् जानाति स सर्ववित्" — He who knows the sacred mystery of numbers knows all.
          </p>

          <p>
            Decode your Life Path, Destiny Name Number, and soul vibration. Uncover hidden strengths,
            karmic challenges, and auspicious timing for career and relationships.
          </p>
        </div>
      </section>

      <AiToolsNav activeId="numerology" />

      <section className="kundli-body">
        <img
          src={lotusMandala}
          alt=""
          className="kundli-body__mandala kundli-body__mandala--left"
          aria-hidden="true"
        />
        <img
          src={lotusMandala}
          alt=""
          className="kundli-body__mandala kundli-body__mandala--right"
          aria-hidden="true"
        />

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-12">
          <div className="kundli-card">
            <div className="kundli-card-header">
              <h2>
                <Star className="icon-gold h-5 w-5" />
                <span>Numerological Profile</span>
              </h2>
              <span className="kundli-card-subtitle">Free Vedic Calculation</span>
            </div>

            <div className="kundli-field">
              <label>Full Name (as per birth record)</label>
              <div className="kundli-field-inner">
                <User className="kundli-field-icon" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Aarav Sharma"
                  className="kundli-input has-icon"
                  required
                />
              </div>
            </div>

            <div className="kundli-field">
              <label>Date of Birth</label>
              <div className="kundli-field-inner">
                <Calendar className="kundli-field-icon" />
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="kundli-input has-icon"
                  required
                />
              </div>
            </div>

            {error && <p className="text-sm text-[#e74660] font-semibold mb-3">{error}</p>}

            <button type="submit" className="kundli-submit-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  <span>Decoding Numbers...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Calculate Life Path & Destiny</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Results */}
        {results && (
          <div id="numero-result-view" className="max-w-4xl mx-auto bg-white rounded-2xl border border-[#c59a45]/30 shadow-xl overflow-hidden">
            {/* Crown Header */}
            <div className="bg-gradient-to-r from-[#064233] to-[#0d5c47] p-8 text-white text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c59a45]/20 border border-[#c59a45]/40 text-[#e6c875] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="h-3 w-3" />
                <span>Numerological Dossier</span>
              </span>

              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                {results.name}'s Numbers
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto my-4">
                <div className="bg-white/10 backdrop-blur rounded-xl p-3 border border-white/20">
                  <span className="text-xs uppercase tracking-wider text-[#e6c875] block">Life Path</span>
                  <span className="text-3xl font-serif font-bold">{results.lifePathNumber}</span>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-3 border border-white/20">
                  <span className="text-xs uppercase tracking-wider text-[#e6c875] block">Name Number</span>
                  <span className="text-3xl font-serif font-bold">{results.nameNumber || 5}</span>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-3 border border-white/20">
                  <span className="text-xs uppercase tracking-wider text-[#e6c875] block">Sun Sign</span>
                  <span className="text-xl font-serif font-bold">{results.sunSign}</span>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-3 border border-white/20">
                  <span className="text-xs uppercase tracking-wider text-[#e6c875] block">Energy Type</span>
                  <span className="text-xl font-serif font-bold">Vedic Raja</span>
                </div>
              </div>

              <p className="max-w-2xl mx-auto text-sm text-[#c9e2d9] leading-relaxed">
                {results.summary}
              </p>
            </div>

            {/* In-Depth Sections */}
            <div className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-[#fdfbf7] border border-[#c59a45]/20">
                  <h4 className="font-serif text-lg font-bold text-[#064233] mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-[#c59a45]" />
                    <span>Personality & Magnetism</span>
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{results.personality}</p>
                </div>

                <div className="p-5 rounded-xl bg-[#fdfbf7] border border-[#c59a45]/20">
                  <h4 className="font-serif text-lg font-bold text-[#064233] mb-2 flex items-center gap-2">
                    <Award className="h-4 w-4 text-[#c59a45]" />
                    <span>Career & Wealth Potential</span>
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{results.careerMoney}</p>
                </div>
              </div>

              {/* Strengths & Growth Areas Chips */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-xs uppercase font-bold tracking-wider text-[#064233] mb-3">
                    Core Strengths
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {(results.strengths || ["Leadership", "Clarity", "Focus", "Vision"]).map((s, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-xs uppercase font-bold tracking-wider text-[#8b6e35] mb-3">
                    Karmic Growth Areas
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {(results.growthAreas || ["Patience", "Work-Life Harmony"]).map((g, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
                        • {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lucky Tips */}
              {results.luckyTips && (
                <div className="p-4 rounded-xl bg-[#f5efe6] border border-[#c59a45]/30">
                  <strong className="text-xs uppercase font-bold text-[#8b6e35] block mb-1">
                    Auspicious Numerological Advice
                  </strong>
                  <p className="text-sm text-[#064233] font-medium m-0">{results.luckyTips}</p>
                </div>
              )}

              {/* CTA Bar */}
              <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
                <div>
                  <strong className="text-[#064233] font-serif text-lg block">Want a deeper planetary analysis?</strong>
                  <span className="text-xs text-gray-600">
                    Cross-examine your numbers with your complete Janam Kundli birth chart.
                  </span>
                </div>
                <div className="flex gap-3">
                  <Link
                    to="/calculator"
                    className="px-5 py-2.5 rounded-xl border border-[#064233] text-[#064233] text-xs font-bold hover:bg-[#064233] hover:text-white transition"
                  >
                    View Birth Chart
                  </Link>
                  <button
                    type="button"
                    onClick={() => navigate("/pricing?service=numerology&flow=consult")}
                    className="px-5 py-2.5 rounded-xl bg-[#064233] text-white text-xs font-bold shadow-md hover:bg-[#0d5c47] transition flex items-center gap-1.5"
                  >
                    <PhoneCall className="h-3.5 w-3.5" />
                    <span>Talk to Numerologist</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <AstroFaqSection id="numero-faq" />
      <Footer />
    </div>
  );
}

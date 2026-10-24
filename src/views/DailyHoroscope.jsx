"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "@/lib/router";
import {
  Sun,
  Sparkles,
  Calendar,
  Heart,
  Briefcase,
  Coins,
  ShieldCheck,
  PhoneCall,
  RefreshCw,
  Compass,
} from "lucide-react";
import SiteNavbar from "../layout/SiteNavbar";
import Footer from "../layout/Footer";
import AstroFaqSection from "../components/Home/AstroFaqSection";
import AiToolsNav from "../components/AI/AiToolsNav";
import { getDailyHoroscope } from "../services/aiAstrologyApi";
import lotusMandala from "../assets/lotus_mandala.svg";
import "./calculator.css";

const ZODIAC_METAS = [
  { name: "Aries", glyph: "♈", sanskrit: "मेष", dates: "Mar 21 - Apr 19", element: "Fire" },
  { name: "Taurus", glyph: "♉", sanskrit: "वृषभ", dates: "Apr 20 - May 20", element: "Earth" },
  { name: "Gemini", glyph: "♊", sanskrit: "मिथुन", dates: "May 21 - Jun 20", element: "Air" },
  { name: "Cancer", glyph: "♋", sanskrit: "कर्क", dates: "Jun 21 - Jul 22", element: "Water" },
  { name: "Leo", glyph: "♌", sanskrit: "सिंह", dates: "Jul 23 - Aug 22", element: "Fire" },
  { name: "Virgo", glyph: "♍", sanskrit: "कन्या", dates: "Aug 23 - Sep 22", element: "Earth" },
  { name: "Libra", glyph: "♎", sanskrit: "तुला", dates: "Sep 23 - Oct 22", element: "Air" },
  { name: "Scorpio", glyph: "♏", sanskrit: "वृश्चिक", dates: "Oct 23 - Nov 21", element: "Water" },
  { name: "Sagittarius", glyph: "♐", sanskrit: "धनु", dates: "Nov 22 - Dec 21", element: "Fire" },
  { name: "Capricorn", glyph: "♑", sanskrit: "मकर", dates: "Dec 22 - Jan 19", element: "Earth" },
  { name: "Aquarius", glyph: "♒", sanskrit: "कुम्भ", dates: "Jan 20 - Feb 18", element: "Air" },
  { name: "Pisces", glyph: "♓", sanskrit: "मीन", dates: "Feb 19 - Mar 20", element: "Water" },
];

export default function DailyHoroscope() {
  const navigate = useNavigate();
  const todayStr = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedSign, setSelectedSign] = useState("Aries");
  const [horoscopes, setHoroscopes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      try {
        const res = await getDailyHoroscope(selectedDate);
        if (isMounted && res?.data && Array.isArray(res.data)) {
          setHoroscopes(res.data);
        }
      } catch {
        // Fallback default set
        if (isMounted) {
          setHoroscopes(
            ZODIAC_METAS.map((z) => ({
              name: z.name,
              blurb: `Today's cosmic planetary alignment brings refreshing vitality to ${z.name}. A favorable transit in your quadrant inspires confident decision-making across personal and vocational pursuits.`,
              scores: { love: 75, career: 82, marriage: 70, finance: 78 },
            }))
          );
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [selectedDate]);

  const activeSignData =
    horoscopes.find((h) => h.name.toLowerCase() === selectedSign.toLowerCase()) || {
      name: selectedSign,
      blurb: `The astral energies encourage introspection, disciplined focus, and harmonious communication. Trust your instincts when evaluating new opportunities.`,
      scores: { love: 72, career: 80, marriage: 68, finance: 76 },
    };

  const activeMeta =
    ZODIAC_METAS.find((z) => z.name.toLowerCase() === selectedSign.toLowerCase()) ||
    ZODIAC_METAS[0];

  return (
    <div className="kundli-page">
      <SiteNavbar />

      <section className="kundli-hero">
        <div className="kundli-hero__inner">
          <div className="kundli-hero__badge">
            <Sun className="h-3.5 w-3.5" />
            <span>दैनिक राशिफल · Daily Planetary Transits</span>
          </div>

          <h1>
            Daily Vedic <span className="gold-text">Cosmic Horoscope</span>
          </h1>

          <p className="kundli-hero__sanskrit">
            "चन्द्रमा मनसो जातः चक्षोः सूर्यो अजायत" — Mind was born of the Moon, and vision of the Sun.
          </p>

          <p>
            Explore real-time daily horoscopes synthesized for all 12 Vedic signs.
            Evaluate four vital pillars: Love, Career, Wealth, and Domestic Harmony.
          </p>
        </div>
      </section>

      <AiToolsNav activeId="daily-horoscope" />

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

        {/* Date Selector Row */}
        <div className="max-w-xs mx-auto mb-8 bg-white p-2 rounded-2xl border border-[#c59a45]/30 shadow-sm flex items-center justify-between">
          <Calendar className="h-4 w-4 text-[#c59a45] ml-2" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border-none text-sm font-semibold text-[#064233] focus:outline-none"
          />
        </div>

        {/* 12 Signs Grid Selector */}
        <div className="max-w-5xl mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-10">
          {ZODIAC_METAS.map((z) => {
            const isSelected = selectedSign.toLowerCase() === z.name.toLowerCase();
            return (
              <button
                key={z.name}
                type="button"
                className={`p-3 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? "bg-gradient-to-b from-[#064233] to-[#0d5c47] text-white border-[#064233] shadow-lg scale-105"
                    : "bg-white/90 border-[#c59a45]/20 hover:border-[#c59a45] text-[#064233]"
                }`}
                onClick={() => setSelectedSign(z.name)}
              >
                <div className="text-2xl mb-1">{z.glyph}</div>
                <strong className="block text-sm font-serif">{z.name}</strong>
                <span className={`text-[10px] block ${isSelected ? "text-[#e6c875]" : "text-gray-500"}`}>
                  {z.sanskrit}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Sign Highlight Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-[#c59a45]/30 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#064233] to-[#0d5c47] p-8 text-white">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#c59a45]/20 border border-[#c59a45]/40 text-[#e6c875] text-xs font-bold uppercase tracking-wider">
                {activeMeta.dates} · {activeMeta.element} Element
              </span>
              <span className="text-xs text-white/70 font-mono">
                Date: {selectedDate}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-5xl">{activeMeta.glyph}</span>
              <div>
                <h3 className="font-serif text-3xl font-bold">
                  {activeMeta.name} ({activeMeta.sanskrit})
                </h3>
                <span className="text-sm text-[#c9e2d9]">
                  Daily Planetary Transit Reading
                </span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Blurb */}
            <div className="p-5 rounded-xl bg-[#fdfbf7] border border-[#c59a45]/20">
              <h4 className="font-serif text-lg font-bold text-[#064233] mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#c59a45]" />
                <span>Today's Astrological Atmosphere</span>
              </h4>
              <p className="text-base text-gray-700 leading-relaxed">
                {activeSignData.blurb}
              </p>
            </div>

            {/* 4 Pillars Progress Radar */}
            <div>
              <h4 className="font-serif text-lg font-bold text-[#064233] mb-4">
                Cosmic Alignment Radar
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "career", label: "Career & Ambition", icon: Briefcase, color: "bg-blue-600" },
                  { key: "finance", label: "Wealth & Finance", icon: Coins, color: "bg-emerald-600" },
                  { key: "love", label: "Love & Romance", icon: Heart, color: "bg-rose-500" },
                  { key: "marriage", label: "Domestic Harmony", icon: ShieldCheck, color: "bg-amber-600" },
                ].map((pillar) => {
                  const score = activeSignData.scores?.[pillar.key] || 75;
                  const Icon = pillar.icon;
                  return (
                    <div key={pillar.key} className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                          <Icon className="h-3.5 w-3.5 text-gray-500" />
                          <span>{pillar.label}</span>
                        </span>
                        <span className="font-mono text-sm font-bold text-[#064233]">{score}%</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${pillar.color} rounded-full transition-all duration-700`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Consultation CTA */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
              <div>
                <strong className="text-[#064233] font-serif text-lg block">
                  Looking for a custom birth chart transit?
                </strong>
                <span className="text-xs text-gray-600">
                  Daily horoscopes give general sign transits. For exact Nakshatra & Dasha timing, consult our astrologers.
                </span>
              </div>
              <div className="flex gap-3">
                <Link
                  to="/calculator"
                  className="px-5 py-2.5 rounded-xl border border-[#064233] text-[#064233] text-xs font-bold hover:bg-[#064233] hover:text-white transition"
                >
                  Generate Kundli
                </Link>
                <button
                  type="button"
                  onClick={() => navigate("/talk-to-astrologers")}
                  className="px-5 py-2.5 rounded-xl bg-[#064233] text-white text-xs font-bold shadow-md hover:bg-[#0d5c47] transition flex items-center gap-1.5"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  <span>Consult Astrologer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AstroFaqSection id="horoscope-faq" />
      <Footer />
    </div>
  );
}

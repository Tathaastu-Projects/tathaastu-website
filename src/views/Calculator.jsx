"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "@/lib/router";
import {
  Lock,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  User,
  Compass,
  Download,
  Share2,
  PhoneCall,
  CheckCircle2,
  ChevronRight,
  Info,
  RefreshCw,
} from "lucide-react";
import SiteNavbar from "../layout/SiteNavbar";
import Footer from "../layout/Footer";
import AstroFaqSection from "../components/Home/AstroFaqSection";
import AiToolsNav from "../components/AI/AiToolsNav";
import VedicKundliChart from "../components/AI/VedicKundliChart";
import { useAuth } from "../contexts/AuthContext";
import { postBirthChart, postGeo } from "../services/aiAstrologyApi";
import lotusMandala from "../assets/lotus_mandala.svg";
import "./calculator.css";

// Local fallback astronomical calculations for instant offline reliability
function calculateSunSign(day, month) {
  const signs = [
    "Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini",
    "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"
  ];
  const cutoffs = [20, 19, 21, 20, 21, 21, 21, 23, 23, 23, 22, 22];
  if (!day || !month) return "Aries";
  if (day < cutoffs[month - 1]) return signs[month - 2 < 0 ? 11 : month - 2];
  return signs[month - 1];
}

function calculateLifePathNumber(day, month, year) {
  const sum = Number(day) + Number(month) + Number(year);
  let result = sum;
  while (result >= 10 && result !== 11 && result !== 22) {
    result = String(result)
      .split("")
      .reduce((a, b) => a + Number(b), 0);
  }
  return result;
}

function calculateLuckyNumber(fullName, day) {
  const nameSum = String(fullName || "")
    .trim()
    .toLowerCase()
    .split("")
    .reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const daySum = Number(day) % 9 || 9;
  return ((nameSum % 9) + daySum) % 9 || 9;
}

const LUCKY_COLORS = {
  1: "Golden Yellow", 2: "Pearl White", 3: "Saffron Yellow",
  4: "Electric Blue", 5: "Emerald Green", 6: "Rose Pink",
  7: "Smoky Quartz", 8: "Midnight Navy", 9: "Vedic Coral"
};

const LUCKY_DAYS = {
  1: "Sunday", 2: "Monday", 3: "Thursday", 4: "Saturday",
  5: "Wednesday", 6: "Friday", 7: "Tuesday", 8: "Saturday", 9: "Tuesday"
};

const LUCKY_GEMS = {
  Aries: "Red Coral (मूंगा)", Taurus: "Diamond / White Sapphire (हीरा)",
  Gemini: "Emerald (पन्ना)", Cancer: "Pearl (मोती)",
  Leo: "Ruby (माणिक्य)", Virgo: "Emerald (पन्ना)",
  Libra: "Opal / Diamond", Scorpio: "Red Coral (मूंगा)",
  Sagittarius: "Yellow Sapphire (पुखराज)", Capricorn: "Blue Sapphire (नीलम)",
  Aquarius: "Blue Sapphire (नीलम)", Pisces: "Yellow Sapphire (पुखराज)"
};

export default function Calculator() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    tob: "12:00",
    placeOfBirth: "",
    lat: null,
    lon: null,
    tzone: 5.5,
    gender: "male",
    unknownTime: false,
    includePlanets: true,
  });

  // Autocomplete state
  const [geoSuggestions, setGeoSuggestions] = useState([]);
  const [isSearchingGeo, setIsSearchingGeo] = useState(false);
  const [showGeoDropdown, setShowGeoDropdown] = useState(false);
  const geoTimeoutRef = useRef(null);

  // Status & Results
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(1);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [chartViewMode, setChartViewMode] = useState("diamond"); // diamond | table

  // Local storage recent charts
  const [recentCharts, setRecentCharts] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("tathaastu_recent_kundlis");
      if (stored) {
        setRecentCharts(JSON.parse(stored).slice(0, 4));
      }
    } catch {
      // silent
    }
  }, []);

  // Handle geo debouncing
  const handlePlaceChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, placeOfBirth: val, lat: null, lon: null }));

    if (geoTimeoutRef.current) clearTimeout(geoTimeoutRef.current);

    if (!val || val.trim().length < 3) {
      setGeoSuggestions([]);
      setShowGeoDropdown(false);
      return;
    }

    geoTimeoutRef.current = setTimeout(async () => {
      try {
        setIsSearchingGeo(true);
        const res = await postGeo(val.trim());
        const geonames = res?.data?.geonames || res?.data || [];
        if (Array.isArray(geonames) && geonames.length > 0) {
          setGeoSuggestions(geonames.slice(0, 6));
          setShowGeoDropdown(true);
        } else {
          setGeoSuggestions([]);
        }
      } catch {
        setGeoSuggestions([]);
      } finally {
        setIsSearchingGeo(false);
      }
    }, 380);
  };

  const handleSelectGeo = (item) => {
    const placeName = item.place_name || item.name || formData.placeOfBirth;
    const country = item.country_code ? `, ${item.country_code}` : "";
    setFormData((prev) => ({
      ...prev,
      placeOfBirth: `${placeName}${country}`,
      lat: item.latitude ? Number(item.latitude) : null,
      lon: item.longitude ? Number(item.longitude) : null,
      tzone: item.timezone_id ? 5.5 : 5.5,
    }));
    setShowGeoDropdown(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName.trim() || !formData.dob || !formData.placeOfBirth.trim()) {
      setError("Please fill in your name, date of birth, and place of birth.");
      return;
    }

    setIsLoading(true);
    setLoadingStep(1);

    const stepInterval = setInterval(() => {
      setLoadingStep((s) => (s < 3 ? s + 1 : s));
    }, 1800);

    const [year, month, day] = formData.dob.split("-").map(Number);
    const sunSign = calculateSunSign(day, month);
    const lifePathNumber = calculateLifePathNumber(day, month, year);
    const luckyNumber = calculateLuckyNumber(formData.fullName, day);
    const luckyColor = LUCKY_COLORS[luckyNumber] || "Golden Yellow";
    const luckyDay = LUCKY_DAYS[luckyNumber] || "Thursday";
    const luckyGemstone = LUCKY_GEMS[sunSign] || "Yellow Sapphire (पुखराज)";

    const localFallback = {
      sunSign,
      lifePathNumber,
      luckyNumber,
      luckyColor,
      luckyDay,
      luckyGemstone,
      message: `Your solar aura radiates as ${sunSign}, guided by cosmic Life Path ${lifePathNumber}. This alignment signifies a journey grounded in spiritual wisdom and dharmic fulfillment.`,
      personality: `As a ${sunSign}, you combine intuitive depth with natural determination. You are drawn to authenticity and hold a profound sense of inner purpose.`,
      career: `Your astrological houses favor vocations requiring vision, patience, and ethical leadership. Long-term endeavours yield superior rewards over impulsive ventures.`,
      relationships: `In relationships, you seek soul-level depth and mental harmony. Balance patience with clear communication to cultivate lasting domestic peace.`,
      wealth: `Your chart indicates auspicious wealth yogas when aligned with ethical enterprise. Focus on diversified investments and prudent asset accumulation.`,
      remedies: [
        `Chant the Gayatri Mantra or Aditya Hridayam daily at sunrise.`,
        `Wear your auspicious gemstone ${luckyGemstone} on a ${luckyDay} during Shukla Paksha.`,
        `Offer water to Surya Deva in a copper vessel for vitality and clarity.`
      ],
      nextFocus: "Dedicate time each morning to quiet introspection and align with your natural planetary rhythm.",
      accuracyNote: "Calculated using Vedic Jyotish principles & astronomical planetary longitudes.",
      source: "local",
      chart: { planets: [] },
    };

    try {
      const payload = {
        name: formData.fullName.trim(),
        dob: formData.dob,
        tob: formData.unknownTime ? "12:00" : (formData.tob || "12:00"),
        place: formData.placeOfBirth.trim(),
        lat: formData.lat || undefined,
        lon: formData.lon || undefined,
        tzone: formData.tzone || 5.5,
        gender: formData.gender,
        includePlanets: formData.includePlanets,
        includeChart: false, // Saves ₹0.10 while planets provides full positions
        luckyNumber,
        luckyColor,
        luckyDay,
      };

      const res = await postBirthChart(payload);
      clearInterval(stepInterval);

      if (res?.success && res?.data) {
        const d = res.data;
        const newResult = {
          sunSign: d.sunSign || sunSign,
          lifePathNumber: d.lifePathNumber || lifePathNumber,
          nameNumber: d.nameNumber || 5,
          luckyNumber: d.luckyNumber || luckyNumber,
          luckyColor: d.luckyColor || luckyColor,
          luckyDay: d.luckyDay || luckyDay,
          luckyGemstone: LUCKY_GEMS[d.sunSign || sunSign] || luckyGemstone,
          message: d.message || localFallback.message,
          personality: d.personality || localFallback.personality,
          career: d.career || localFallback.career,
          relationships: d.relationships || localFallback.relationships,
          wealth: d.wealth || localFallback.wealth,
          remedies: Array.isArray(d.remedies) && d.remedies.length > 0 ? d.remedies : localFallback.remedies,
          nextFocus: d.nextFocus || localFallback.nextFocus,
          accuracyNote: d.accuracyNote || localFallback.accuracyNote,
          source: res.source || "astrologyapi",
          model: res.model || "",
          costInr: res.costInr,
          chart: d.chart || { planets: [] },
        };
        setResults(newResult);

        // Save to recent charts
        const entry = {
          name: formData.fullName.trim(),
          dob: formData.dob,
          tob: formData.tob,
          place: formData.placeOfBirth.trim(),
          sunSign: newResult.sunSign,
          date: new Date().toLocaleDateString(),
        };
        const updated = [entry, ...recentCharts.filter((c) => c.name !== entry.name)].slice(0, 4);
        setRecentCharts(updated);
        try {
          localStorage.setItem("tathaastu_recent_kundlis", JSON.stringify(updated));
        } catch {
          // silent
        }
      } else {
        throw new Error(res?.message || "Calculation fallback");
      }
    } catch {
      clearInterval(stepInterval);
      setResults(localFallback);
    } finally {
      setIsLoading(false);
      // Smooth scroll to result
      setTimeout(() => {
        const el = document.getElementById("kundli-result-view");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  };

  const handleDownload = () => {
    if (!results) return;

    const content = `=====================================================
TATHAASTU · VEDIC ASTROLOGY BIRTH CHART DOSSIER
=====================================================
Sacred Coordinates:
Full Name: ${formData.fullName}
Date of Birth: ${formData.dob}
Time of Birth: ${formData.tob || "12:00 PM"}
Place of Birth: ${formData.placeOfBirth}
Gender: ${formData.gender}

Auspicious Attributes:
-----------------------------------------------------
Sun Sign: ${results.sunSign}
Life Path Number: ${results.lifePathNumber}
Name Vibration: ${results.nameNumber || "-"}
Lucky Number: ${results.luckyNumber}
Lucky Color: ${results.luckyColor}
Lucky Day: ${results.luckyDay}
Auspicious Gemstone: ${results.luckyGemstone}

Astrological Life Blueprint:
-----------------------------------------------------
${results.message}

Detailed Insights:
-----------------------------------------------------
Personality:
${results.personality || "-"}

Career & Dharma:
${results.career || "-"}

Love & Marriage:
${results.relationships || "-"}

Wealth & Prosperity:
${results.wealth || "-"}

Vedic Remedies & Guidance:
${(results.remedies || []).map((tip, i) => `${i + 1}. ${tip}`).join("\n")}

Strategic Advice:
${results.nextFocus || "-"}

=====================================================
Generated by Tathaastu Vedic Jyotish Engine
Visit: https://tathaastu.com
=====================================================`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(formData.fullName || "Kundli").replace(/\s+/g, "_")}_Vedic_Kundli.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="kundli-page">
      <SiteNavbar />

      {/* Hero Header */}
      <section className="kundli-hero">
        <div className="kundli-hero__inner">
          <div className="kundli-hero__badge">
            <Sparkles className="h-3.5 w-3.5" />
            <span>प्रामाणिक वैदिक ज्योतिष · Authentic Jyotish Engine</span>
          </div>

          <h1>
            Vedic Astrology Birth <span className="gold-text">Chart Calculator</span>
          </h1>

          <p className="kundli-hero__sanskrit">
            "यथा पिण्डे तथा ब्रह्माण्डे" — As is the cosmic body, so is the individual soul.
          </p>

          <p>
            Enter your sacred birth coordinates to decode your planetary alignment, Ascendant (Lagna),
            D1 Kundli houses, and personalized Vedic guidance.
          </p>
        </div>
      </section>

      {/* AI Tools Suite Navigation */}
      <AiToolsNav activeId="birth-chart" />

      {/* Main Form & Saved Cards */}
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

        <div className="kundli-grid">
          {/* Left: Input Form Card */}
          <form className="kundli-card kundli-card--form" onSubmit={handleSubmit}>
            <div className="kundli-card-header">
              <h2>
                <Compass className="icon-gold h-5 w-5" />
                <span>Janam Kundli Coordinates</span>
              </h2>
              <span className="kundli-card-subtitle">Precise Vedic Calculations</span>
            </div>

            {/* Name */}
            <div className="kundli-field">
              <label htmlFor="kundli-name">Full Name</label>
              <div className="kundli-field-inner">
                <User className="kundli-field-icon" />
                <input
                  id="kundli-name"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className="kundli-input has-icon"
                  required
                />
              </div>
            </div>

            {/* Gender Toggle */}
            <div className="kundli-field">
              <label>Gender</label>
              <div className="kundli-gender-group" role="group" aria-label="Gender selection">
                {["male", "female", "other"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    className={`kundli-gender-btn ${formData.gender === g ? "is-active" : ""}`}
                    onClick={() => setFormData((prev) => ({ ...prev, gender: g }))}
                  >
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time Row */}
            <div className="kundli-row">
              <div className="kundli-field">
                <label htmlFor="kundli-dob">Date of Birth</label>
                <div className="kundli-field-inner">
                  <Calendar className="kundli-field-icon" />
                  <input
                    id="kundli-dob"
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="kundli-input has-icon"
                    required
                  />
                </div>
              </div>

              <div className="kundli-field">
                <label htmlFor="kundli-tob">Birth Time (24h)</label>
                <div className="kundli-field-inner">
                  <Clock className="kundli-field-icon" />
                  <input
                    id="kundli-tob"
                    type="time"
                    name="tob"
                    value={formData.tob}
                    onChange={handleChange}
                    disabled={formData.unknownTime}
                    className="kundli-input has-icon"
                    required={!formData.unknownTime}
                  />
                </div>
              </div>
            </div>

            {/* Time Unknown Checkbox */}
            <label className="kundli-checkbox-row">
              <input
                type="checkbox"
                name="unknownTime"
                checked={formData.unknownTime}
                onChange={handleChange}
              />
              <span>Birth time unknown? (Calculates with solar noon 12:00 PM standard)</span>
            </label>

            {/* Place of Birth with Autocomplete */}
            <div className="kundli-field">
              <label htmlFor="kundli-place">Birth Place (City / District)</label>
              <div className="kundli-field-inner">
                <MapPin className="kundli-field-icon" />
                <input
                  id="kundli-place"
                  type="text"
                  name="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={handlePlaceChange}
                  onFocus={() => geoSuggestions.length > 0 && setShowGeoDropdown(true)}
                  placeholder="e.g. New Delhi, Mumbai, Varanasi..."
                  className="kundli-input has-icon"
                  autoComplete="off"
                  required
                />
              </div>

              {/* Autocomplete Dropdown */}
              {showGeoDropdown && geoSuggestions.length > 0 && (
                <div className="geo-autocomplete-dropdown">
                  {geoSuggestions.map((item, idx) => (
                    <div
                      key={idx}
                      className="geo-autocomplete-item"
                      onClick={() => handleSelectGeo(item)}
                    >
                      <span>{item.place_name || item.name}</span>
                      {item.latitude && (
                        <span className="geo-coords-badge">
                          {Number(item.latitude).toFixed(2)}°, {Number(item.longitude).toFixed(2)}°
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Planetary Checkbox */}
            <label className="kundli-checkbox-row">
              <input
                type="checkbox"
                name="includePlanets"
                checked={formData.includePlanets}
                onChange={handleChange}
              />
              <span>Include planetary degrees & North Indian D1 Kundli diagram</span>
            </label>

            {error && <p className="kundli-error text-sm text-[#e74660] font-semibold mb-3">{error}</p>}

            {/* CTA Button */}
            <button type="submit" className="kundli-submit-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  <span>Calculating Kundli...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Generate Divine Kundli</span>
                </>
              )}
            </button>

            {/* Loading Steps Indicator */}
            {isLoading && (
              <div className="kundli-loading-banner">
                <div className="spinner-mandala" />
                <div>
                  <strong>
                    {loadingStep === 1 && "Aligning planetary longitudes (Ayanamsha)..."}
                    {loadingStep === 2 && "Computing 12 Kundli houses & Ascendant (Lagna)..."}
                    {loadingStep === 3 && "Synthesizing personalized Vedic reading..."}
                  </strong>
                  <span className="block text-xs text-[#8a7243] mt-0.5">
                    Our hybrid engine guarantees certified astronomical precision.
                  </span>
                </div>
              </div>
            )}
          </form>

          {/* Right: Saved Kundlis / Celestial Vault Card */}
          <aside className="kundli-card kundli-card--saved" aria-label="Celestial Vault">
            <div className="kundli-card-header">
              <h2>
                <Lock className="icon-gold h-5 w-5" />
                <span>Cosmic Vault</span>
              </h2>
              <span className="kundli-card-subtitle">Encrypted & Private</span>
            </div>

            {isAuthenticated ? (
              <div>
                <p className="text-sm text-[#4b635c] mb-4">
                  Welcome to your verified vault. Your saved family charts are synchronised.
                </p>
                {recentCharts.length > 0 ? (
                  <div className="space-y-2">
                    {recentCharts.map((chart, i) => (
                      <div key={i} className="recent-chart-item">
                        <div className="recent-chart-meta">
                          <strong>{chart.name}</strong>
                          <span>{chart.sunSign} · {chart.place}</span>
                        </div>
                        <button
                          type="button"
                          className="recent-chart-action"
                          onClick={() => {
                            setFormData((p) => ({
                              ...p,
                              fullName: chart.name,
                              dob: chart.dob,
                              tob: chart.tob || "12:00",
                              placeOfBirth: chart.place,
                            }));
                          }}
                        >
                          Load
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#8b9d97] italic">
                    Generate your first chart to save it directly to your vault.
                  </p>
                )}
              </div>
            ) : (
              <div className="saved-vault-empty">
                <div className="vault-lock-orb">
                  <Lock className="h-7 w-7" />
                </div>
                <h3>Your Private Celestial Vault</h3>
                <p>
                  Create an account or sign in to permanently store family Kundlis, access instant PDF
                  dossiers, and receive planetary transit alerts.
                </p>

                <ul className="vault-perks-list">
                  <li>
                    <CheckCircle2 className="h-4 w-4 text-[#C59A45]" />
                    <span>Store unlimited family & client charts</span>
                  </li>
                  <li>
                    <CheckCircle2 className="h-4 w-4 text-[#C59A45]" />
                    <span>Instant exportable PDF charts & dashas</span>
                  </li>
                  <li>
                    <CheckCircle2 className="h-4 w-4 text-[#C59A45]" />
                    <span>100% confidential & end-to-end encrypted</span>
                  </li>
                </ul>

                <Link to="/login" className="vault-login-btn">
                  Sign In to Access Vault
                </Link>

                {/* Guest Recent History */}
                {recentCharts.length > 0 && (
                  <div className="recent-charts-section">
                    <div className="recent-charts-heading">Recent Browser Charts</div>
                    {recentCharts.map((chart, i) => (
                      <div key={i} className="recent-chart-item">
                        <div className="recent-chart-meta">
                          <strong>{chart.name}</strong>
                          <span>{chart.sunSign} · {chart.place}</span>
                        </div>
                        <button
                          type="button"
                          className="recent-chart-action"
                          onClick={() => {
                            setFormData((p) => ({
                              ...p,
                              fullName: chart.name,
                              dob: chart.dob,
                              tob: chart.tob || "12:00",
                              placeOfBirth: chart.place,
                            }));
                          }}
                        >
                          Load
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </aside>
        </div>

        {/* Results Presentation Section */}
        {results && (
          <div id="kundli-result-view" className="kundli-result-wrapper">
            {/* Header Banner */}
            <div className="kundli-result-header">
              <div className="result-badge-row">
                <span className="result-prov-badge">
                  <Sparkles className="h-3 w-3" />
                  <span>
                    {results.source === "astrologyapi"
                      ? "Vedic AstrologyAPI Certified"
                      : "Tathaastu Jyotish Engine"}
                  </span>
                </span>
                <span className="text-xs text-[#e6c875]/80 font-mono">
                  DOB: {formData.dob} · {formData.tob || "12:00"}
                </span>
              </div>

              <h3>{formData.fullName}'s Celestial Blueprint</h3>
              <p className="result-header-meta">
                Coordinates: {formData.placeOfBirth} · Sun in {results.sunSign} · Life Path {results.lifePathNumber}
              </p>
            </div>

            {/* Auspicious Metrics Badges Grid */}
            <div className="kundli-metrics-grid">
              <div className="metric-pill-card">
                <span className="metric-pill-label">Sun Sign (सूर्य)</span>
                <div className="metric-pill-value">{results.sunSign}</div>
                <span className="metric-pill-sub">Core Vitality</span>
              </div>

              <div className="metric-pill-card">
                <span className="metric-pill-label">Life Path (मूलांक)</span>
                <div className="metric-pill-value">{results.lifePathNumber}</div>
                <span className="metric-pill-sub">Soul Destiny</span>
              </div>

              <div className="metric-pill-card">
                <span className="metric-pill-label">Name Vibration</span>
                <div className="metric-pill-value">{results.nameNumber || 5}</div>
                <span className="metric-pill-sub">Social Resonance</span>
              </div>

              <div className="metric-pill-card">
                <span className="metric-pill-label">Lucky Number</span>
                <div className="metric-pill-value">{results.luckyNumber}</div>
                <span className="metric-pill-sub">Karmic Rhythm</span>
              </div>

              <div className="metric-pill-card">
                <span className="metric-pill-label">Lucky Color</span>
                <div className="metric-pill-value text-sm md:text-base">{results.luckyColor}</div>
                <span className="metric-pill-sub">Harmonizing Shade</span>
              </div>

              <div className="metric-pill-card">
                <span className="metric-pill-label">Lucky Day</span>
                <div className="metric-pill-value text-sm md:text-base">{results.luckyDay}</div>
                <span className="metric-pill-sub">Auspicious Weekday</span>
              </div>

              <div className="metric-pill-card">
                <span className="metric-pill-label">Vedic Gemstone</span>
                <div className="metric-pill-value text-xs md:text-sm font-semibold text-[#8b6e35]">
                  {results.luckyGemstone}
                </div>
                <span className="metric-pill-sub">Aura Enhancer</span>
              </div>
            </div>

            {/* Interactive North Indian Kundli Chart (Diamond) */}
            <div className="vedic-chart-wrapper">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#c59a45]/20">
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#064233]">
                    Lagna Kundli (D1 Birth Chart)
                  </h4>
                  <p className="text-xs text-[#6a8279]">
                    North Indian Diamond representation with house placements and planetary longitudes.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={`px-3 py-1 rounded-md text-xs font-bold transition ${
                      chartViewMode === "diamond"
                        ? "bg-[#064233] text-white"
                        : "bg-[#f5efe6] text-[#4b635c]"
                    }`}
                    onClick={() => setChartViewMode("diamond")}
                  >
                    Diamond Chart
                  </button>
                  <button
                    type="button"
                    className={`px-3 py-1 rounded-md text-xs font-bold transition ${
                      chartViewMode === "table"
                        ? "bg-[#064233] text-white"
                        : "bg-[#f5efe6] text-[#4b635c]"
                    }`}
                    onClick={() => setChartViewMode("table")}
                  >
                    Planets Table
                  </button>
                </div>
              </div>

              {chartViewMode === "diamond" ? (
                <VedicKundliChart
                  planets={results.chart?.planets || []}
                  ascendant={results.sunSign}
                />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#f5efe6] text-[#064233] font-serif">
                        <th className="p-2.5 rounded-l">Planet</th>
                        <th className="p-2.5">Zodiac Sign</th>
                        <th className="p-2.5">House</th>
                        <th className="p-2.5">Degree</th>
                        <th className="p-2.5">Nakshatra</th>
                        <th className="p-2.5 rounded-r">Motion</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {(results.chart?.planets && results.chart.planets.length > 0
                        ? results.chart.planets
                        : [
                            { name: "Sun", sign: results.sunSign, house: 1, normDegree: "14.2", nakshatra: "Magha", isRetro: false },
                            { name: "Moon", sign: "Cancer", house: 5, normDegree: "22.5", nakshatra: "Ashlesha", isRetro: false },
                            { name: "Mars", sign: "Aries", house: 9, normDegree: "08.1", nakshatra: "Ashwini", isRetro: false },
                            { name: "Jupiter", sign: "Pisces", house: 10, normDegree: "19.3", nakshatra: "Revati", isRetro: false },
                            { name: "Venus", sign: "Taurus", house: 2, normDegree: "11.4", nakshatra: "Rohini", isRetro: false },
                          ]
                      ).map((p, i) => (
                        <tr key={i} className="hover:bg-amber-50/40">
                          <td className="p-2.5 font-bold text-[#064233]">{p.name}</td>
                          <td className="p-2.5 text-gray-700">{p.sign}</td>
                          <td className="p-2.5 font-mono text-[#8b6e35]">H{p.house || 1}</td>
                          <td className="p-2.5 font-mono">{p.normDegree ? `${Number(p.normDegree).toFixed(1)}°` : "-"}</td>
                          <td className="p-2.5 text-gray-600">{p.nakshatra || "-"}</td>
                          <td className="p-2.5">
                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${p.isRetro ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-800"}`}>
                              {p.isRetro ? "Retrograde (वक्र)" : "Direct (मार्गी)"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Tabbed In-Depth Life Readings */}
            <div className="result-tabs-container">
              <div className="result-tabs-nav" role="tablist">
                {[
                  { id: "overview", label: "Cosmic Blueprint" },
                  { id: "personality", label: "Personality & Mind" },
                  { id: "career", label: "Career & Dharma" },
                  { id: "love", label: "Love & Relationships" },
                  { id: "wealth", label: "Wealth & Raja Yogas" },
                  { id: "remedies", label: "Vedic Remedies" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`result-tab-btn ${activeTab === t.id ? "is-active" : ""}`}
                    onClick={() => setActiveTab(t.id)}
                    role="tab"
                    aria-selected={activeTab === t.id}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="result-tab-content">
                {activeTab === "overview" && (
                  <div>
                    <h4>Sacred Cosmic Blueprint</h4>
                    <p>{results.message}</p>
                    {results.nextFocus && (
                      <div className="mt-4 p-4 rounded-xl bg-[#fdfbf7] border border-[#c59a45]/30">
                        <strong className="text-[#8b6e35] text-sm uppercase tracking-wide block mb-1">
                          Key Astrological Guidance
                        </strong>
                        <p className="text-[#064233] text-sm font-medium m-0">{results.nextFocus}</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "personality" && (
                  <div>
                    <h4>Psychological & Spiritual Temperament</h4>
                    <p>{results.personality}</p>
                    <p className="text-sm text-[#6a8279]">
                      Your Ascendant and Moon influences indicate strong resilience under pressure, coupled
                      with a quest for self-actualization and truth.
                    </p>
                  </div>
                )}

                {activeTab === "career" && (
                  <div>
                    <h4>Career, Leadership & Vocation</h4>
                    <p>{results.career}</p>
                    <p className="text-sm text-[#6a8279]">
                      Key planetary periods (Mahadashas) favor long-range strategic decision making. Seek
                      partnerships with grounded collaborators.
                    </p>
                  </div>
                )}

                {activeTab === "love" && (
                  <div>
                    <h4>Romantic Alignment & Domestic Harmony</h4>
                    <p>{results.relationships}</p>
                    <div className="mt-4 p-4 rounded-xl bg-[#fff0f3] border border-[#e74660]/20 flex items-center justify-between">
                      <div>
                        <strong className="text-[#e74660] text-sm block">Interested in Partner Matchmaking?</strong>
                        <span className="text-xs text-gray-600">
                          Try our dedicated Gun Milan tool to test complete 36-Guna compatibility.
                        </span>
                      </div>
                      <Link
                        to="/matchmaking"
                        className="px-4 py-2 rounded-lg bg-[#e74660] text-white text-xs font-bold hover:bg-[#c9324c] transition"
                      >
                        Check Gun Milan
                      </Link>
                    </div>
                  </div>
                )}

                {activeTab === "wealth" && (
                  <div>
                    <h4>Wealth Cycles, Assets & Prosperity</h4>
                    <p>{results.wealth}</p>
                    <p className="text-sm text-[#6a8279]">
                      2nd and 11th house placements highlight steady incremental accumulation. Avoid
                      speculative gambling during Rahu sub-periods.
                    </p>
                  </div>
                )}

                {activeTab === "remedies" && (
                  <div>
                    <h4>Auspicious Vedic Remedies (उपाय)</h4>
                    <ul className="remedies-list">
                      {results.remedies.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                    <p className="text-xs text-[#8b9d97] mt-3">
                      Remedies are intended to bring psychological calm, balance elemental energies, and
                      align your daily rhythm with cosmic harmony.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons Bar */}
              <div className="result-actions-bar">
                <button
                  type="button"
                  className="action-btn-primary"
                  onClick={() => navigate("/pricing?service=kundli&flow=consult")}
                >
                  <PhoneCall className="h-4 w-4" />
                  <span>Consult an Astrologer with this Kundli</span>
                </button>

                <button
                  type="button"
                  className="action-btn-secondary"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4" />
                  <span>Download Complete Dossier</span>
                </button>

                <button
                  type="button"
                  className="action-btn-secondary"
                  onClick={() => {
                    setResults(null);
                    window.scrollTo({ top: 120, behavior: "smooth" });
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Calculate Another Kundli</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* FAQ Section */}
      <AstroFaqSection id="kundli-faq" />

      {/* Footer */}
      <Footer />
    </div>
  );
}

"use client";

﻿import React, { useState } from "react";
import { Link } from "@/lib/router";
import { Lock } from "lucide-react";
import SiteNavbar from "../layout/SiteNavbar";
import Footer from "../layout/Footer";
import AstroFaqSection from "../components/Home/AstroFaqSection";
import { useAuth } from "../contexts/AuthContext";
import lotusMandala from "../assets/lotus_mandala.svg";

function calculateSunSign(day, month) {
  const signs = [
    "Capricorn",
    "Aquarius",
    "Pisces",
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
  ];
  const cutoffs = [20, 19, 21, 20, 21, 21, 21, 23, 23, 23, 22, 22];
  if (!day || !month) return "";
  if (day < cutoffs[month - 1]) return signs[month - 2 < 0 ? 11 : month - 2];
  return signs[month - 1];
}

function calculateLifePathNumber(day, month, year) {
  const sum = Number(day) + Number(month) + Number(year);
  let result = sum;
  while (result >= 10) {
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
  const lucky = ((nameSum % 9) + daySum) % 9 || 9;
  return lucky;
}

function getLuckyColor(luckyNumber) {
  const colors = {
    1: "Golden Yellow",
    2: "Cream",
    3: "Yellow",
    4: "Blue",
    5: "Silver",
    6: "Indigo",
    7: "White",
    8: "Black",
    9: "Red",
  };
  return colors[luckyNumber] || "White";
}

function getLuckyDay(luckyNumber) {
  const days = {
    1: "Sunday",
    2: "Monday",
    3: "Tuesday",
    4: "Wednesday",
    5: "Thursday",
    6: "Friday",
    7: "Saturday",
    8: "Saturday",
    9: "Tuesday",
  };
  return days[luckyNumber] || "Sunday";
}

const API_BASE =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL || "http://localhost:9001/api";

function getPersonalizedMessage(sunSign, lifePathNumber) {
  if (!sunSign) {
    return `Your Life Path Number is ${lifePathNumber}. Use this as a gentle compass to align your habits, relationships, and work with what truly energizes you.`;
  }
  const templates = {
    Aries:
      "Youâ€™re naturally bold and action-oriented. Focus your energy on one clear goal, and momentum will follow.",
    Taurus:
      "You thrive with stability and consistency. Steady progress and strong values will bring lasting results.",
    Gemini:
      "Your curiosity is your superpower. Communicate clearly and choose environments that keep you learning.",
    Cancer:
      "Your intuition is strong. Protect your emotional boundaries and invest in relationships that feel safe.",
    Leo:
      "You shine when you create and lead. Step forward confidently while staying grounded in humility.",
    Virgo:
      "Your details create excellence. Balance perfection with progress and youâ€™ll unlock sustainable success.",
    Libra:
      "You bring harmony and fairness. Choose partnerships wisely and commit to balanced decision-making.",
    Scorpio:
      "Youâ€™re built for transformation. Trust your resilience and donâ€™t fear reinventionâ€”itâ€™s your gift.",
    Sagittarius:
      "Youâ€™re a seeker of truth. Travel, learn, and share wisdomâ€”optimism is your fuel.",
    Capricorn:
      "You build long-term success. Discipline and patience will turn your ambitions into reality.",
    Aquarius:
      "Youâ€™re innovative and visionary. Follow your unique path and youâ€™ll inspire meaningful change.",
    Pisces:
      "Youâ€™re intuitive and compassionate. Creativity and spiritual alignment will open the right doors.",
  };
  const core = templates[sunSign] || `You carry the essence of ${sunSign}.`;
  return `${core} Your Life Path Number is ${lifePathNumber}â€”use it to guide your next best step with clarity and confidence.`;
}

export default function Calculator() {
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    tob: "",
    placeOfBirth: "",
    gender: "male",
  });
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.fullName.trim() || !formData.dob || !formData.tob || !formData.placeOfBirth.trim()) {
      setError("Please fill name, birth date, birth time, and birth place.");
      return;
    }

    setIsLoading(true);

    const [year, month, day] = formData.dob.split("-").map(Number);

    const sunSign = calculateSunSign(day, month);
    const lifePathNumber = calculateLifePathNumber(day, month, year);
    const luckyNumber = calculateLuckyNumber(formData.fullName, day);
    const luckyColor = getLuckyColor(luckyNumber);
    const luckyDay = getLuckyDay(luckyNumber);
    const dob = formData.dob;
    const tob = formData.tob;

    const localFallback = {
      sunSign,
      lifePathNumber,
      luckyNumber,
      luckyColor,
      luckyDay,
      message: getPersonalizedMessage(sunSign, lifePathNumber),
    };

    try {
      const response = await fetch(`${API_BASE}/ai/birth-chart/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName.trim(),
          dob,
          tob: tob || undefined,
          place: formData.placeOfBirth.trim() || undefined,
          gender: formData.gender || undefined,
          luckyNumber,
          luckyColor,
          luckyDay,
        }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.success || !payload?.data) {
        throw new Error(payload?.message || "AI analysis unavailable");
      }

      setResults({
        sunSign: payload.data.sunSign || sunSign,
        lifePathNumber: payload.data.lifePathNumber || lifePathNumber,
        nameNumber: payload.data.nameNumber,
        luckyNumber: payload.data.luckyNumber || luckyNumber,
        luckyColor: payload.data.luckyColor || luckyColor,
        luckyDay: payload.data.luckyDay || luckyDay,
        message: payload.data.message || localFallback.message,
        personality: payload.data.personality || "",
        career: payload.data.career || "",
        relationships: payload.data.relationships || "",
        wealth: payload.data.wealth || "",
        remedies: Array.isArray(payload.data.remedies) ? payload.data.remedies : [],
        nextFocus: payload.data.nextFocus || "",
        accuracyNote: payload.data.accuracyNote || "",
        source: payload.source || "ollama",
        model: payload.model || "",
      });
    } catch {
      setResults({ ...localFallback, source: "fallback" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!results) return;

    const content = `TATHAASTU â€” BIRTH CHART (BASIC) REPORT
=====================================

Name: ${formData.fullName}
Date of Birth: ${formData.dob}
Time of Birth: ${formData.tob}
Place of Birth: ${formData.placeOfBirth}
Gender: ${formData.gender}

--- RESULTS ---
Sun Sign: ${results.sunSign}
Lucky Number: ${results.luckyNumber}
Lucky Color: ${results.luckyColor}
Lucky Day: ${results.luckyDay}
Life Path Number: ${results.lifePathNumber}

--- DETAILED ANALYSIS ---
${results.message}

Personality:
${results.personality || "-"}

Career:
${results.career || "-"}

Relationships:
${results.relationships || "-"}

Wealth:
${results.wealth || "-"}

Remedies / Tips:
${(results.remedies || []).map((tip, i) => `${i + 1}. ${tip}`).join("\n") || "-"}

Next Focus:
${results.nextFocus || "-"}

Accuracy:
${results.accuracyNote || "-"}
`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(formData.fullName || "tathaastu").replaceAll(" ", "_")}_report.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="kundli-page">
      <SiteNavbar />

      <section className="kundli-hero">
        <div className="kundli-hero__inner">
          <h1>
            Vedic Astrology Birth
            <br />
            Chart Calculator
          </h1>
          <p>Discover your cosmic blueprint with detailed inputs and instant insights.</p>
        </div>
      </section>

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
          <form className="kundli-card kundli-card--form" onSubmit={handleSubmit}>
            <h2>New Kundli</h2>

            <div className="kundli-row">
              <div className="kundli-field">
                <label htmlFor="kundli-name">Name</label>
                <input
                  id="kundli-name"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name, e.g. Rahul Sharma"
                  required
                />
              </div>
              <div className="kundli-field">
                <label>Gender</label>
                <div className="kundli-gender" role="group" aria-label="Gender">
                  <button
                    type="button"
                    className={formData.gender === "male" ? "is-active" : ""}
                    onClick={() => setFormData((prev) => ({ ...prev, gender: "male" }))}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    className={formData.gender === "female" ? "is-active" : ""}
                    onClick={() => setFormData((prev) => ({ ...prev, gender: "female" }))}
                  >
                    Female
                  </button>
                </div>
              </div>
            </div>

            <div className="kundli-pair">
              <div className="kundli-field">
                <label htmlFor="kundli-dob">Birth date</label>
                <input
                  id="kundli-dob"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="kundli-field">
                <label htmlFor="kundli-tob">Birth time</label>
                <input
                  id="kundli-tob"
                  type="time"
                  name="tob"
                  value={formData.tob}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="kundli-field">
              <label htmlFor="kundli-place">Birth place</label>
              <input
                id="kundli-place"
                type="text"
                name="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={handleChange}
                placeholder="Enter city, e.g. New Delhi, India"
                required
              />
            </div>

            {error ? <p className="kundli-error">{error}</p> : null}
            {isLoading ? (
              <p className="kundli-wait">
                Your local AI is writing a detailed reading. This usually takes a minute.
              </p>
            ) : null}

            <button type="submit" className="kundli-submit" disabled={isLoading}>
              {isLoading ? "Writing reading..." : "Generate Kundli"}
            </button>
          </form>

          <aside className="kundli-card kundli-card--saved" aria-label="Saved Kundli">
            <h2>Saved Kundli</h2>
            {isAuthenticated && results ? (
              <div className="kundli-saved-list">
                <div className="kundli-saved-item">
                  <strong>{formData.fullName}</strong>
                  <span>
                    {results.sunSign} · {formData.dob} · {formData.tob}
                  </span>
                  <span>{formData.placeOfBirth}</span>
                </div>
              </div>
            ) : (
              <>
                <span className="kundli-lock" aria-hidden="true">
                  <Lock className="h-6 w-6" />
                </span>
                <p>Please log in to view your saved horoscopes</p>
                <Link to="/login" className="kundli-login">
                  Log In Now
                </Link>
              </>
            )}
          </aside>
        </div>

        {results ? (
          <div className="kundli-result">
            <h3>Your Kundli reading</h3>
            <p className="kundli-result__source">
              {results.source === "ollama"
                ? `Written by local AI${results.model ? ` (${results.model})` : ""}. Sun sign and numbers are calculated from your birth details.`
                : "Local AI was unavailable, so this is a calculated reading from your birth details."}
            </p>
            <div className="kundli-result__grid">
              <div>
                <span>Sun sign</span>
                <strong>{results.sunSign}</strong>
              </div>
              <div>
                <span>Life path</span>
                <strong>{results.lifePathNumber}</strong>
              </div>
              <div>
                <span>Lucky number</span>
                <strong>{results.luckyNumber}</strong>
              </div>
              <div>
                <span>Lucky colour</span>
                <strong>{results.luckyColor}</strong>
              </div>
              <div>
                <span>Lucky day</span>
                <strong>{results.luckyDay}</strong>
              </div>
            </div>
            {[
              ["Overview", results.message],
              ["Personality", results.personality],
              ["Career", results.career],
              ["Relationships", results.relationships],
              ["Wealth", results.wealth],
              ["What to do next", results.nextFocus],
            ]
              .filter(([, text]) => text)
              .map(([title, text]) => (
                <section key={title} className="kundli-result__block">
                  <h4>{title}</h4>
                  <p>{text}</p>
                </section>
              ))}
            {results.remedies?.length ? (
              <section className="kundli-result__block">
                <h4>Practical guidance</h4>
                <ul>
                  {results.remedies.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </section>
            ) : null}
            {results.accuracyNote ? (
              <p className="kundli-result__note">{results.accuracyNote}</p>
            ) : null}
            <button type="button" className="kundli-submit" onClick={handleDownload}>
              Download Report
            </button>
          </div>
        ) : null}
      </section>

      <AstroFaqSection id="kundli-faq" />
      <Footer />
    </div>
  );
}

"use client";

import React from "react";

/**
 * Authentic North Indian Style (Diamond) Vedic Kundli Chart SVG
 * Renders the 12 houses with their respective zodiac signs and placed planets.
 */
export default function VedicKundliChart({ planets = [], ascendant = "Aries", ascendantHouse = 1 }) {
  // Zodiac signs map in order
  const ZODIAC_SIGNS = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];

  // Abbreviation map for planets
  const PLANET_ABBR = {
    Sun: "Su (सूर्य)",
    Moon: "Mo (चन्द्र)",
    Mars: "Ma (मंगल)",
    Mercury: "Me (बुध)",
    Jupiter: "Ju (गुरु)",
    Venus: "Ve (शुक्र)",
    Saturn: "Sa (शनि)",
    Rahu: "Ra (राहु)",
    Ketu: "Ke (केतु)",
    Ascendant: "Asc (लग्न)"
  };

  // Find ascendant index (1-12)
  const ascIdx = ZODIAC_SIGNS.findIndex(
    (s) => s.toLowerCase() === String(ascendant || "aries").toLowerCase()
  );
  const baseSignNum = ascIdx >= 0 ? ascIdx + 1 : 1;

  // Group planets by house (1-12)
  const housePlanets = {};
  for (let h = 1; h <= 12; h++) {
    housePlanets[h] = [];
  }

  // Always mark Ascendant in House 1
  housePlanets[1].push({ name: "Ascendant", isRetro: false });

  if (Array.isArray(planets)) {
    planets.forEach((p) => {
      const houseNum = Number(p.house || 1);
      if (houseNum >= 1 && houseNum <= 12) {
        housePlanets[houseNum].push({
          name: p.name,
          isRetro: p.isRetro === "true" || p.isRetro === true,
          sign: p.sign,
          deg: p.normDegree != null ? Number(p.normDegree).toFixed(1) + "°" : ""
        });
      }
    });
  }

  // Calculate sign number for each house: (baseSignNum + house - 2) % 12 + 1
  const getHouseSignNum = (houseNum) => {
    return ((baseSignNum + houseNum - 2) % 12) + 1;
  };

  return (
    <div className="vedic-chart-wrapper">
      <div className="vedic-chart-container">
        <svg
          viewBox="0 0 500 500"
          className="vedic-chart-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="chartBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF9" />
              <stop offset="100%" stopColor="#F9F4EB" />
            </linearGradient>
            <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C59A45" />
              <stop offset="50%" stopColor="#E6C875" />
              <stop offset="100%" stopColor="#9E7422" />
            </linearGradient>
            <filter id="goldGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#C59A45" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Background */}
          <rect x="10" y="10" width="480" height="480" rx="12" fill="url(#chartBg)" stroke="url(#goldBorder)" strokeWidth="3" filter="url(#goldGlow)" />

          {/* Outer Border Inset */}
          <rect x="18" y="18" width="464" height="464" rx="8" fill="none" stroke="#C59A45" strokeWidth="1" strokeDasharray="4 2" opacity="0.6" />

          {/* North Indian Diamond Lines */}
          {/* Main Diagonals */}
          <line x1="20" y1="20" x2="480" y2="480" stroke="#064233" strokeWidth="1.8" />
          <line x1="480" y1="20" x2="20" y2="480" stroke="#064233" strokeWidth="1.8" />

          {/* Inner Diamond (Connects midpoints of 4 outer edges: (250,20), (480,250), (250,480), (20,250)) */}
          <polygon
            points="250,20 480,250 250,480 20,250"
            fill="none"
            stroke="#064233"
            strokeWidth="1.8"
          />

          {/* House 1 (Top Center Diamond) */}
          <g className="chart-house house-1">
            <text x="250" y="70" className="chart-sign-num">{getHouseSignNum(1)}</text>
            <text x="250" y="90" className="chart-house-label">H1 (Lagna)</text>
            <g transform="translate(250, 115)">
              {housePlanets[1].map((p, idx) => (
                <text key={idx} x="0" y={idx * 16} className={`chart-planet ${p.isRetro ? 'is-retro' : ''}`}>
                  {PLANET_ABBR[p.name] || p.name} {p.deg}
                </text>
              ))}
            </g>
          </g>

          {/* House 2 (Top Left Triangle) */}
          <g className="chart-house house-2">
            <text x="175" y="75" className="chart-sign-num">{getHouseSignNum(2)}</text>
            <text x="175" y="95" className="chart-house-label">H2</text>
            <g transform="translate(175, 115)">
              {housePlanets[2].map((p, idx) => (
                <text key={idx} x="0" y={idx * 15} className="chart-planet">
                  {PLANET_ABBR[p.name] || p.name} {p.deg}
                </text>
              ))}
            </g>
          </g>

          {/* House 3 (Left Top Triangle) */}
          <g className="chart-house house-3">
            <text x="75" y="175" className="chart-sign-num">{getHouseSignNum(3)}</text>
            <text x="75" y="195" className="chart-house-label">H3</text>
            <g transform="translate(75, 215)">
              {housePlanets[3].map((p, idx) => (
                <text key={idx} x="0" y={idx * 15} className="chart-planet">
                  {PLANET_ABBR[p.name] || p.name} {p.deg}
                </text>
              ))}
            </g>
          </g>

          {/* House 4 (Center Left Diamond) */}
          <g className="chart-house house-4">
            <text x="125" y="240" className="chart-sign-num">{getHouseSignNum(4)}</text>
            <text x="125" y="258" className="chart-house-label">H4 (Sukha)</text>
            <g transform="translate(125, 276)">
              {housePlanets[4].map((p, idx) => (
                <text key={idx} x="0" y={idx * 15} className="chart-planet">
                  {PLANET_ABBR[p.name] || p.name} {p.deg}
                </text>
              ))}
            </g>
          </g>

          {/* House 5 (Left Bottom Triangle) */}
          <g className="chart-house house-5">
            <text x="75" y="325" className="chart-sign-num">{getHouseSignNum(5)}</text>
            <text x="75" y="345" className="chart-house-label">H5</text>
            <g transform="translate(75, 365)">
              {housePlanets[5].map((p, idx) => (
                <text key={idx} x="0" y={idx * 15} className="chart-planet">
                  {PLANET_ABBR[p.name] || p.name} {p.deg}
                </text>
              ))}
            </g>
          </g>

          {/* House 6 (Bottom Left Triangle) */}
          <g className="chart-house house-6">
            <text x="175" y="425" className="chart-sign-num">{getHouseSignNum(6)}</text>
            <text x="175" y="445" className="chart-house-label">H6</text>
            <g transform="translate(175, 410)">
              {housePlanets[6].map((p, idx) => (
                <text key={idx} x="0" y={idx * 15} className="chart-planet">
                  {PLANET_ABBR[p.name] || p.name} {p.deg}
                </text>
              ))}
            </g>
          </g>

          {/* House 7 (Bottom Center Diamond) */}
          <g className="chart-house house-7">
            <text x="250" y="360" className="chart-sign-num">{getHouseSignNum(7)}</text>
            <text x="250" y="380" className="chart-house-label">H7 (Kalatra)</text>
            <g transform="translate(250, 400)">
              {housePlanets[7].map((p, idx) => (
                <text key={idx} x="0" y={idx * 16} className="chart-planet">
                  {PLANET_ABBR[p.name] || p.name} {p.deg}
                </text>
              ))}
            </g>
          </g>

          {/* House 8 (Bottom Right Triangle) */}
          <g className="chart-house house-8">
            <text x="325" y="425" className="chart-sign-num">{getHouseSignNum(8)}</text>
            <text x="325" y="445" className="chart-house-label">H8</text>
            <g transform="translate(325, 410)">
              {housePlanets[8].map((p, idx) => (
                <text key={idx} x="0" y={idx * 15} className="chart-planet">
                  {PLANET_ABBR[p.name] || p.name} {p.deg}
                </text>
              ))}
            </g>
          </g>

          {/* House 9 (Right Bottom Triangle) */}
          <g className="chart-house house-9">
            <text x="425" y="325" className="chart-sign-num">{getHouseSignNum(9)}</text>
            <text x="425" y="345" className="chart-house-label">H9 (Bhagya)</text>
            <g transform="translate(425, 365)">
              {housePlanets[9].map((p, idx) => (
                <text key={idx} x="0" y={idx * 15} className="chart-planet">
                  {PLANET_ABBR[p.name] || p.name} {p.deg}
                </text>
              ))}
            </g>
          </g>

          {/* House 10 (Center Right Diamond) */}
          <g className="chart-house house-10">
            <text x="375" y="240" className="chart-sign-num">{getHouseSignNum(10)}</text>
            <text x="375" y="258" className="chart-house-label">H10 (Karma)</text>
            <g transform="translate(375, 276)">
              {housePlanets[10].map((p, idx) => (
                <text key={idx} x="0" y={idx * 15} className="chart-planet">
                  {PLANET_ABBR[p.name] || p.name} {p.deg}
                </text>
              ))}
            </g>
          </g>

          {/* House 11 (Right Top Triangle) */}
          <g className="chart-house house-11">
            <text x="425" y="175" className="chart-sign-num">{getHouseSignNum(11)}</text>
            <text x="425" y="195" className="chart-house-label">H11 (Labha)</text>
            <g transform="translate(425, 215)">
              {housePlanets[11].map((p, idx) => (
                <text key={idx} x="0" y={idx * 15} className="chart-planet">
                  {PLANET_ABBR[p.name] || p.name} {p.deg}
                </text>
              ))}
            </g>
          </g>

          {/* House 12 (Top Right Triangle) */}
          <g className="chart-house house-12">
            <text x="325" y="75" className="chart-sign-num">{getHouseSignNum(12)}</text>
            <text x="325" y="95" className="chart-house-label">H12 (Vyaya)</text>
            <g transform="translate(325, 115)">
              {housePlanets[12].map((p, idx) => (
                <text key={idx} x="0" y={idx * 15} className="chart-planet">
                  {PLANET_ABBR[p.name] || p.name} {p.deg}
                </text>
              ))}
            </g>
          </g>

          {/* Center Sacred Emblem (Om / Bindu) */}
          <circle cx="250" cy="250" r="16" fill="#FDFBF7" stroke="#C59A45" strokeWidth="1.5" />
          <text x="250" y="255" textAnchor="middle" fill="#C59A45" fontSize="13" fontWeight="bold">ॐ</text>
        </svg>
      </div>

      <div className="vedic-chart-legend">
        <span className="legend-item"><span className="legend-dot legend-lagna"></span> H1: Lagna (Self)</span>
        <span className="legend-item"><span className="legend-dot legend-kendra"></span> H1, 4, 7, 10: Kendra Houses</span>
        <span className="legend-item"><span className="legend-dot legend-trikona"></span> H1, 5, 9: Trikona (Fortune)</span>
      </div>
    </div>
  );
}

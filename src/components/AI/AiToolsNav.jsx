"use client";

import React from "react";
import { Link, useLocation } from "@/lib/router";
import { Sparkles, Heart, Compass, Sun, ShieldCheck } from "lucide-react";

const AI_TOOLS = [
  {
    id: "birth-chart",
    label: "Vedic Kundli (Birth Chart)",
    shortLabel: "Kundli",
    icon: Compass,
    path: "/calculator",
    badge: "Most Accurate",
    desc: "Planetary positions, dashas & life blueprint"
  },
  {
    id: "matchmaking",
    label: "Kundli Matching (Gun Milan)",
    shortLabel: "Gun Milan",
    icon: Heart,
    path: "/matchmaking",
    badge: "Ashtakoot 36 Guna",
    desc: "Relationship vibration & compatibility score"
  },
  {
    id: "numerology",
    label: "Vedic Numerology",
    shortLabel: "Numerology",
    icon: Sparkles,
    path: "/numerology",
    badge: "Life Path",
    desc: "Destiny number, soul urge & cosmic timing"
  },
  {
    id: "daily-horoscope",
    label: "Daily Horoscope",
    shortLabel: "Horoscope",
    icon: Sun,
    path: "/daily-horoscope",
    badge: "12 Signs Free",
    desc: "Love, career, finance & marriage radar"
  }
];

export default function AiToolsNav({ activeId }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="ai-tools-nav-wrapper">
      <div className="ai-tools-nav-inner">
        <div className="ai-tools-nav-label">
          <ShieldCheck className="h-4 w-4 text-[#C59A45]" />
          <span>Vedic AI Suite</span>
        </div>
        <div className="ai-tools-nav-tabs" role="tablist">
          {AI_TOOLS.map((tool) => {
            const Icon = tool.icon;
            const isActive =
              activeId === tool.id ||
              currentPath === tool.path ||
              (tool.id === "birth-chart" && currentPath === "/calculator");

            return (
              <Link
                key={tool.id}
                to={tool.path}
                className={`ai-tools-nav-tab ${isActive ? "is-active" : ""}`}
                role="tab"
                aria-selected={isActive}
              >
                <div className="tab-icon-wrap">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="tab-text-wrap">
                  <span className="tab-title">{tool.shortLabel}</span>
                  {tool.badge && (
                    <span className="tab-badge">{tool.badge}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

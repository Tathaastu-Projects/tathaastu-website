"use client";

import React from "react";

export default function PricingPlans() {
  const plans = [
    {
      name: "REGULAR",
      price: "₹ 1,100",
      period: "PER MONTH",
      bgColor: "bg-[#EAA83E] text-white",
      textColor: "text-white",
      border: "border-none",
      features: [
        "1 ASTROLOGY OR VAASTU",
        "CONSULTATION (30 MINS)",
        "BASIC KUNDLI ANALYSIS OR QUESTION-BASED READING",
        "REMEDY SUGGESTION",
        "WHATSAPP SUPPORT (24HRS)",
      ],
      button: "bg-[#D44459] text-white hover:bg-[#b83a4a]",
    },
    {
      name: "WEEKLY",
      price: "₹ 2,100",
      period: "PER MONTH",
      bgColor: "bg-white",
      textColor: "text-[#000]",
      border: "border border-[#EAA83E]",
      features: [
        "2 CONSULTATIONS (ASTROLOGY OR VAASTU OR AURA SCAN)",
        "1 TAROT OR CRYSTAL GUIDANCE SESSION",
        "WHATSAPP CHAT SUPPORT FOR 7 DAYS",
        "1 PERSONALISED DAILY RITUAL (BASED ON YOUR CHART)",
        "BASIC REMEDY GUIDANCE",
      ],
      button: "border border-[#D44459] text-[#D44459] hover:bg-[#fbe6ea]",
    },
    {
      name: "MONTHLY",
      price: "₹ 3,100",
      period: "PER MONTH",
      bgColor: "bg-white",
      textColor: "text-[#000]",
      border: "border border-[#EAA83E]",
      features: [
        "4 CONSULTATIONS (1/WEEK) — CHOICE OF ASTROLOGY, VAASTU, AURA OR TAROT",
        "IN-DEPTH KUNDLI ANALYSIS OR VAASTU LAYOUT REVIEW",
        "AURA & CRYSTAL SCANNING (1 SESSION)",
        "CUSTOMIZED REMEDIES (YANTRA/ GEMSTONE/ MANTRA PDF)",
        "PRIORITY APPOINTMENT SLOTS",
        "WHATSAPP + PHONE SUPPORT (LIMITED HOURS)",
        "10% DISCOUNT ON PRODUCTS/CRYSTALS",
      ],
      button: "border border-[#D44459] text-[#D44459] hover:bg-[#fbe6ea]",
    },
    {
      name: "YEARLY",
      price: "₹ 5,100",
      period: "PER MONTH",
      bgColor: "bg-white",
      textColor: "text-[#000]",
      border: "border border-[#EAA83E]",
      features: [
        "12 MAJOR CONSULTATIONS (1/MONTH + 4 BONUS SEASONAL CONSULTS)",
        "FULL KUNDLI READING + YEARLY HOROSCOPE",
        "COMPLETE VAASTU ANALYSIS (1 RESIDENTIAL + 1 COMMERCIAL SPACE)",
        "AURA & CRYSTAL SCANNING (QUARTERLY)",
        "1 PERSONALISED RITUAL KIT",
        "20% DISCOUNT ON WORKSHOPS, CRYSTALS, AND PRODUCTS",
        "WHATSAPP & CALL SUPPORT (DEDICATED HOURS)",
        "EARLY ACCESS TO EVENTS + FREE ENTRY TO 1 WORKSHOP",
      ],
      button: "border border-[#D44459] text-[#D44459] hover:bg-[#fbe6ea]",
    },
  ];

  return (
    <section className="bg-white py-16 px-4 md:px-16 lg:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#073349]">
            ELEVATE YOUR{" "}
            <span className="text-[#D44459]">SPIRITUAL JOURNEY</span>
          </h2>
          <p className="mt-2 text-gray-600 tracking-wide">
            PLANS DESIGNED FOR EVERY SEEKER FROM THE CURIOUS TO THE COMMITTED.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col justify-between rounded-t-3xl rounded-b-xl shadow-md p-6 ${plan.bgColor} ${plan.border} transition-transform hover:scale-105`}
            >
              {/* Plan Title */}
              <div>
                <h3
                  className={`text-lg font-semibold text-center mb-3 ${plan.textColor}`}
                >
                  {plan.name}
                </h3>
                {/* Price */}
                <div className="text-center mb-4">
                  <span className={`text-3xl font-bold ${plan.textColor}`}>
                    {plan.price}
                  </span>
                  <p className={`text-xs mt-1 ${plan.textColor}`}>
                    {plan.period}
                  </p>
                </div>
                {/* Features */}
                <ul className="space-y-3 text-sm leading-relaxed">
                  {plan.features.map((feature, i) => (
                    <li key={i} className={`${plan.textColor}`}>
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <button
                className={`mt-6 rounded-full py-2 px-4 text-sm font-semibold transition ${plan.button}`}
              >
                GET STARTED NOW
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

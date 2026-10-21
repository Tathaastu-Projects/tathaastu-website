"use client";

import React from 'react';

export default function PricingSection() {
  const pricingPlans = [
    {
      name: "REGULAR",
      price: "$10",
      period: "PER MONTH",
      features: [
        "1 Astrology or Vaastu consultation (30 mins)",
        "Basic Kundli analysis or question-based reading",
        "Remedy suggestion",
        "24-hour WhatsApp support"
      ],
      isPopular: true,
      buttonText: "GET STARTED NOW"
    },
    {
      name: "WEEKLY",
      price: "$25",
      period: "PER MONTH",
      features: [
        "2 consultations (Astrology, Vaastu, or Aura Scan)",
        "1 Tarot or Crystal Guidance Session",
        "7-day WhatsApp chat support",
        "Personalized daily ritual",
        "Basic remedy guidance"
      ],
      isPopular: false,
      buttonText: "GET STARTED NOW"
    },
    {
      name: "MONTHLY",
      price: "$45",
      period: "PER MONTH",
      features: [
        "4 consultations (1/week)",
        "Choice of Astrology, Vaastu, Aura, or Tarot",
        "In-depth Kundli analysis or Vaastu layout review",
        "1 Aura & Crystal Scanning session",
        "Customized remedies (Yantra/Gemstone/Mantra PDF)",
        "Priority appointment slots",
        "Limited WhatsApp + Phone support",
        "10% discount on products/crystals"
      ],
      isPopular: false,
      buttonText: "GET STARTED NOW"
    },
    {
      name: "YEARLY",
      price: "$45",
      period: "PER MONTH",
      features: [
        "12 major consultations (1/month + 4 bonus seasonal consults)",
        "Full Kundli reading + yearly horoscope",
        "Complete Vaastu analysis (1 residential + 1 commercial space)",
        "Quarterly Aura & Crystal Scanning",
        "1 personalized ritual kit",
        "20% discount on workshops, crystals, and products",
        "Dedicated WhatsApp & Call support",
        "Early access to events + free entry to 1 workshop"
      ],
      isPopular: false,
      buttonText: "GET STARTED NOW"
    }
  ];

  return (
    <section id="pricing-section" className="bg-white py-16 px-4 md:px-16 lg:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#073349] mb-6">
            ELEVATE YOUR SPIRITUAL JOURNEY
          </h2>
          
          {/* Decorative Swirl */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-1 bg-[#D44459] rounded-full"></div>
          </div>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            PLANS DESIGNED FOR EVERY SEEKER FROM THE CURIOUS TO THE COMMITTED.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 lg:p-8 shadow-lg transition-transform duration-300 hover:scale-105 ${
                plan.isPopular 
                  ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white' 
                  : 'bg-white border border-gray-200 text-[#073349]'
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#D44459] text-white px-4 py-1 rounded-full text-sm font-semibold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className={`text-xl font-bold mb-4 ${plan.isPopular ? 'text-white' : 'text-[#073349]'}`}>
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <span className={`text-4xl lg:text-5xl font-bold ${plan.isPopular ? 'text-white' : 'text-[#073349]'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.isPopular ? 'text-orange-100' : 'text-gray-500'}`}>
                  {plan.period}
                </span>
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className={`mr-2 mt-1 ${plan.isPopular ? 'text-orange-200' : 'text-[#D44459]'}`}>
                      ✓
                    </span>
                    <span className={`text-sm leading-relaxed ${plan.isPopular ? 'text-orange-50' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.isPopular
                    ? 'bg-white text-orange-500 hover:bg-orange-50'
                    : 'bg-[#D44459] text-white hover:bg-[#B83A4A] border border-[#D44459]'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

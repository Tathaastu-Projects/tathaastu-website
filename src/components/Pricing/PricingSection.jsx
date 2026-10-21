"use client";

import React from 'react';

const PricingSection2 = () => {
  const plans = [
    {
      name: "REGULAR",
      price: "$10",
      period: "PER MONTH",
      features: [
        "1 ASTROLOGY OR VAASTU CONSULTATION (30 MINS)",
        "BASIC KUNDLI ANALYSIS OR QUESTION-BASED READING",
        "REMEDY SUGGESTION",
        "WHATSAPP SUPPORT (24HRS)"
      ],
      buttonText: "GET STARTED NOW",
      popular: false
    },
    {
      name: "WEEKLY",
      price: "$25",
      period: "PER MONTH",
      features: [
        "2 CONSULTATIONS (ASTROLOGY OR VAASTU OR AURA SCAN)",
        "1 TAROT OR CRYSTAL GUIDANCE SESSION",
        "WHATSAPP CHAT SUPPORT FOR 7 DAYS",
        "1 PERSONALISED DAILY RITUAL (BASED ON YOUR CHART)",
        "BASIC REMEDY GUIDANCE"
      ],
      buttonText: "GET STARTED NOW",
      popular: false
    },
    {
      name: "MONTHLY",
      price: "$45",
      period: "PER MONTH",
      features: [
        "4 CONSULTATIONS (J/WEEK) – CHOICE OF ASTROLOGY, VAASTU, AURA OR TAROT",
        "IN-DEPTH KUNDLI ANALYSIS OR VAASTU LAYOUT REVIEW",
        "AURA & CRYSTAL SCANNING (1 SESSION)",
        "CUSTOMIZED REMEDIES (YANTRA/ GEMSTONE / MANTRA PDF)",
        "PRIORITY APPOINTMENT SLOTS",
        "WHATSAPP + PHONE SUPPORT (LIMITED HOURS)",
        "10% DISCOUNT ON PRODUCTS/CRYSTALS"
      ],
      buttonText: "GET STARTED NOW",
      popular: true
    },
    {
      name: "YEARLY",
      price: "$45",
      period: "PER MONTH",
      features: [
        "12 MAJOR CONSULTATIONS (J/MONTH + 4 BONUS SEASONAL CONSULTS)",
        "FULL KUNDLI READING + YEARLY HOROSCOPE",
        "COMPLETE VAASTU ANALYSIS (1 RESIDENTIAL + 1 COMMERCIAL SPACE)",
        "AURA & CRYSTAL SCANNING (QUARTERLY)",
        "1 PERSONALIZED RITUAL KIT",
        "20% DISCOUNT ON WORKSHOPS, CRYSTALS, AND PRODUCTS",
        "WHATSAPP & CALL SUPPORT (DEDICATED HOURS)",
        "EARLY ACCESS TO EVENTS + FREE ENTRY TO 1 WORKSHOP"
      ],
      buttonText: "GET STARTED NOW",
      popular: false
    }
  ];

  return (
    <div className="bg-gradient-to-b from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">ELEVATE YOUR SPIRITUAL JOURNEY</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full 
                ${plan.popular ? 'ring-2 ring-purple-500 ring-opacity-50 transform scale-105' : ''}`}
            >
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-2xl font-bold text-center text-purple-800 mb-4">{plan.name}</h3>
                
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-purple-900">{plan.price}</span>
                  <span className="text-gray-600 block mt-1">{plan.period}</span>
                </div>
                
                <ul className="mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start mb-3">
                      <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" 
                           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200">
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection2;
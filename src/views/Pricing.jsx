"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from "@/lib/router";
import Footer from '../layout/Footer';
import SiteNavbar from '../layout/SiteNavbar';
import Seperator from '../components/Home/SeperatorComponent';

export default function Pricing() {
  const navigate = useNavigate();
  const [consult, setConsult] = useState({ active: false, service: "" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setConsult({
      active: params.get("flow") === "consult",
      service: params.get("service") || "consult",
    });
  }, []);

  const handleGetStarted = (plan) => {
    if (consult.active) {
      const params = new URLSearchParams({
        flow: "consult",
        service: consult.service,
        package: plan.name,
      });
      navigate(`/talk-to-astrologers?${params.toString()}`);
      return;
    }
    navigate('/consultation-booking', { state: { plan } });
  };
  const pricingPlans = [
    {
      name: "REGULAR",
      price: "₹ 1,100",
      period: "PER MONTH",
      features: [
        "1 Astrology or Vaastu Consultation (30 mins)",
        "Basic Kundli Analysis or Question-Based Reading",
        "Remedy Suggestion",
        "Whatsapp Support (24HRS)"
      ],
      buttonText: "GET STARTED NOW"
    },
    {
      name: "WEEKLY",
      price: "₹ 2,100",
      period: "PER MONTH",
      features: [
        "2 Consultations (Astrology or Vaastu or Aura Scan)",
        "1 Tarot or Crystal Guidance Session",
        "Whatsapp Chat Support for 7 Days",
        "Personalised Daily Ritual (based on your chart)",
        "Basic Remedy Guidance"
      ],
      buttonText: "GET STARTED NOW"
    },
    {
      name: "MONTHLY",
      price: "₹ 3,100",
      period: "PER MONTH",
      features: [
        "4 Consultations (1/week) - Choice of Astrology, Vaastu, Aura or Tarot",
        "In-depth Kundli Analysis or Vaastu Layout Review",
        "Aura & Crystal Scanning (1 session)",
        "Customized Remedies (Yantra/Gemstone/Mantra PDF)",
        "Priority Appointment Slots",
        "Whatsapp + Phone Support (Limited Hours)",
        "10% Discount on Products/Crystals"
      ],
      buttonText: "GET STARTED NOW"
    },
    {
      name: "YEARLY",
      price: "₹ 5,100",
      period: "PER MONTH",
      features: [
        "12 Major Consultations (1/month + 4 Bonus Seasonal Consults)",
        "Full Kundli Reading + Yearly Horoscope",
        "Complete Vaastu Analysis (1 Residential + 1 Commercial Space)",
        "Aura & Crystal Scanning (Quarterly)",
        "1 Personalized Ritual Kit",
        "20% Discount on Workshops, Crystals and Products",
        "Whatsapp & Call Support (Dedicated Hours)",
        "Early Access to Events + Free Entry to 1 Workshop"
      ],
      buttonText: "GET STARTED NOW"
    }
  ];

  return (
    <div className="bg-white text-[#073349]">
      
      {/* TOP BAR */}
      <div className="bg-[#D44459] text-white text-center py-2 px-4">
        <p className="text-sm font-medium">AI-POWERED PLATFORM REVOLUTIONIZING ASTROLOGY</p>
      </div>
      
      <SiteNavbar />

      {/* HERO SECTION WITH BANNER IMAGE */}
      <section className="bg-[#F8FFF6] px-4 py-14 text-center text-[#073349]">
        <h1 className="text-4xl font-bold">{consult.active ? "Packages" : "Pricing"}</h1>
        <p className="mx-auto mt-3 max-w-xl text-[#325d72]">
          {consult.active
            ? "Choose a package. Next you will pick an expert and share your birth details."
            : "Choose a consultation and see the price before you book."}
        </p>
      </section>
      <Seperator />

      {/* PRICING SECTION */}
      <section className="bg-white py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="text-[#073349]">ELEVATE YOUR</span>
                <br />
                <span className="text-[#D44459]">SPIRITUAL JOURNEY</span>
              </h2>
            </div>
            <div className="lg:w-1/2 lg:pl-8">
              <p className="text-lg md:text-xl text-gray-600">
                PLANS DESIGNED FOR EVERY SEEKER FROM THE CURIOUS TO THE COMMITTED.
              </p>
            </div>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105 w-full h-[600px] flex flex-col"
              >
                {/* Golden-orange border and background */}
                <div className="bg-gradient-to-b from-[#EAA83E] to-[#D4942A] p-1 h-full flex flex-col">
                  <div className="bg-white rounded-xl p-6 flex flex-col h-full">
                    {/* Plan Name */}
                    <h3 className="text-xl font-bold mb-4 text-[#073349] text-center">
                      {plan.name}
                    </h3>

                    {/* Price Section with golden background */}
                    <div className="bg-gradient-to-b from-[#EAA83E] to-[#D4942A] rounded-lg p-4 mb-6 text-center">
                      <span className="text-4xl font-bold text-white">
                        {plan.price}
                      </span>
                      <div className="text-sm text-white opacity-90 mt-1">
                        {plan.period}
                      </div>
                    </div>

                    {/* Features List - Scrollable */}
                    <ul className="space-y-3 mb-8 flex-1 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#D44459 #f3f4f6' }}>
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <span className="mr-3 mt-1 text-[#D44459] text-lg">•</span>
                          <span className="text-sm leading-relaxed text-[#073349]">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button 
                      onClick={() => handleGetStarted(plan)}
                      className="w-full bg-[#D44459] text-white py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-[#B83A4A] shadow-lg mt-auto"
                    >
                      {plan.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

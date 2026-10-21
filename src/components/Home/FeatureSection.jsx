"use client";

import React from "react";
import "../../styles/global.css"; // Import your global styles

import aiIcon from "../../assets/AI_POWERED_INSIGHTS.png";
import expertIcon from "../../assets/EXPERT_BASED_CONSULTATIONS1.png";
import remedyIcon from "../../assets/AUTHENTIC_REMEDIES.png";
import growthIcon from "../../assets/PERSONALIZED_SPIRITUAL_GROWTH.png";

export default function FeatureSection() {
  return (
    <section className="px-4 py-12 md:px-16 lg:px-32 xl:px-52 2xl:px-72 bg-white text-center space-y-12">

      {/* Icons and Titles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <img src={aiIcon} alt="AI Insights"  className="mx-auto h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 mb-3" />
          <p className="subheading text-green-900 text-sm md:text-base">AI-POWERED <br /> INSIGHTS</p>
        </div>
        <div>
          <img src={expertIcon} alt="Expert Consultations"  className="mx-auto h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 mb-3" />
          <p className="subheading text-[#D9716C] text-sm md:text-base">EXPERT-BACKED <br /> CONSULTATIONS</p>
        </div>
        <div>
          <img src={remedyIcon} alt="Remedies"  className="mx-auto h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 mb-3" />
          <p className="subheading text-yellow-600 text-sm md:text-base">AUTHENTIC <br /> REMEDIES</p>
        </div>
        <div>
          <img src={growthIcon} alt="Growth"  className="mx-auto h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 mb-3" />
          <p className="subheading text-green-800 text-sm md:text-base">PERSONALIZED <br /> SPIRITUAL GROWTH</p>
        </div>
      </div>

      {/* Learn More Button */}
      <div>
        <button className="bg-[#D9716C] text-white px-10 py-3 rounded-xl shadow font-semibold font-playfair text-lg">
          LEARN MORE
        </button>
      </div>

      {/* Bottom Info Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#FAF1DE] p-4 rounded-xl shadow-sm text-[#073349] font-inter text-sm md:text-base">
          CHAT WITH ASTROLOGERS – AI CHATBOT
        </div>
        <div className="bg-[#FAF1DE] p-4 rounded-xl shadow-sm text-[#073349] font-inter text-sm md:text-base">
          TALK TO ASTROLOGERS – CUSTOMER SERVICE MOBILE NO.
        </div>
        <div className="bg-[#FAF1DE] p-4 rounded-xl shadow-sm text-[#073349] font-inter text-sm md:text-base">
          WHO WILL ASSIGN THE ASTROLOGER TO THE CLIENT.
        </div>
      </div>
    </section>
  );
}

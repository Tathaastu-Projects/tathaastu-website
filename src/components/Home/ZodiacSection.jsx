"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import HOMESEPERATOR from '../../assets/HOME_Seperator_1.png';
import ariesIcon from "../../assets/ARIES.png";
import taurusIcon from "../../assets/TAURUS.png";
import geminiIcon from "../../assets/GEMINI.png";
import cancerIcon from "../../assets/CANCER.png";
// ... import all 12 signs

const zodiacData = [
  { name: "ARIES", icon: ariesIcon },
  { name: "TAURUS", icon: taurusIcon },
  { name: "GEMINI", icon: geminiIcon },
  { name: "CANCER", icon: cancerIcon },
  // ... more signs
];

export default function ZodiacSection() {
  return (
    <section className="px-4 py-12 md:px-16 lg:px-32 xl:px-52 2xl:px-72 bg-white text-center">
      <h2 className="heading">ZODIAC SIGNS</h2>

      <div className="flex justify-center my-4">
        <img src={HOMESEPERATOR} alt="Separator" className="h-10" />
      </div>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={30}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="zodiac-swiper"
      >
        {zodiacData.map((sign, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white rounded-full border-1 border-pink-100 p-10 shadow-md">
                <img
                  src={sign.icon}
                  alt={sign.name}
                  className="h-20 w-20 md:h-28 md:w-28 lg:h-28 lg:w-28"
                />
              </div>
              <p className="subheading text-green-900 text-sm md:text-base">
                {sign.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

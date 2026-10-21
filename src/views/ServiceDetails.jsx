"use client";

import React, { useMemo } from "react";
import { useNavigate, useParams } from "@/lib/router";
import servicesData from "../data/servicesData";
import Footer from "../layout/Footer";
import SiteNavbar from "../layout/SiteNavbar";
import { motion } from "framer-motion";
import { fadeInVariant, fadeUpVariant, staggerContainer } from "../utils/motionVariants";

export default function ServiceDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const service = useMemo(
    () => servicesData.find((item) => item.slug === slug || item.id === slug),
    [slug]
  );

  if (!service) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <SiteNavbar
          endSlot={
            <button
              type="button"
              onClick={() => navigate("/services")}
              className="rounded-lg border border-[#073349] px-3 py-2 text-xs font-medium text-[#073349] transition-colors hover:bg-[#073349]/10 hover:text-[#D44459] hover:border-[#D44459] sm:px-4 sm:text-sm"
            >
              Back to Services
            </button>
          }
        />
        <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="max-w-lg space-y-4"
          >
            <h1 className="text-3xl font-bold text-[#073349]">Service not found</h1>
            <p className="text-gray-600">
              The service you are looking for is not available right now. Please explore our offerings or
              reach out for personalised guidance.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/services")}
                className="px-5 py-2 rounded-full bg-[#D44459] text-white font-semibold hover:bg-[#b83a4a] transition"
              >
                Explore Services
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="px-5 py-2 rounded-full border border-[#D44459] text-[#D44459] font-semibold hover:bg-[#fbe6ea] transition"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedStartingPrice = service.startingPrice
    ? `₹ ${service.startingPrice.toLocaleString("en-IN")}`
    : "₹ 3,100";

  return (
    <div className="bg-white text-[#073349] min-h-screen">
      {/* Top bar */}
      <div className="bg-[#D44459] text-white text-center py-2 px-4">
        <p className="text-sm font-medium">Experience holistic healing with Tathaastu experts</p>
      </div>

      <SiteNavbar />

      {/* Hero Banner */}
      <section className="relative w-full">
        <div className="relative h-[360px] md:h-[420px] lg:h-[460px] overflow-hidden">
          <img
            src={service.banner}
            alt={`${service.title} banner`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
              {service.bannerText || service.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <main className="px-4 md:px-8 lg:px-16 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-6xl mx-auto space-y-16"
        >
          <motion.section variants={fadeInVariant} className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#073349]">
              {service.h1Title || service.title}
            </h1>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              {service.longDescription}
            </p>
          </motion.section>

          {service.whyChooseUs && service.whyChooseUs.length > 0 && (
            <motion.section variants={fadeUpVariant} className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#073349]">
                Why Choose Us?
              </h2>
              <div className="bg-[#FFF6EF] rounded-3xl p-8 shadow-lg">
                <ul className="space-y-4 text-sm md:text-base text-[#073349] leading-relaxed">
                  {service.whyChooseUs.map((item, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-[#D44459] pt-1">✔</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>
          )}

          <motion.section variants={fadeUpVariant} className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-xl md:text-2xl font-semibold text-[#073349] mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              {service.contactUsText || "Have questions? Reach out to us and book your session today."}
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="px-6 py-3 rounded-full bg-[#D44459] text-white font-semibold hover:bg-[#B83A4A] transition"
            >
              {service.contactButtonText || "Contact Now"}
            </button>
          </motion.section>

          {service.otherServices && service.otherServices.length > 0 && (
            <motion.section variants={fadeUpVariant} className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#073349]">
                Explore Our Other Services
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {service.otherServices.map((otherService, index) => {
                  // Map service names to slugs
                  const serviceSlugMap = {
                    "Astrology Consultation": "astrology-kundli",
                    "Vaastu Consultation": "vastu-shastra",
                    "Vedic Astrology": "vedic-astrology",
                    "Numerologists": "numerologists",
                    "Numerology Consultation": "numerologists",
                    "Pooja Services": "pooja-services",
                    "Horoscope Matching": "horoscope-matching",
                    "Tarot Reading": "tarot-reading",
                    "Crystal Healing": "crystal-healing",
                    "Pet Healing": "pet-healing",
                    "Dowsing": "dowsing",
                    "Aura Healing & Scanning": "aura-healing-scanning",
                  };
                  const slug = serviceSlugMap[otherService] || otherService.toLowerCase().replace(/\s+/g, "-");
                  
                  return (
                    <button
                      key={index}
                      onClick={() => navigate(`/services/${slug}`)}
                      className="px-4 py-3 rounded-lg bg-[#FFF6EF] text-[#073349] font-medium hover:bg-[#F5D6B4] transition text-sm text-center"
                    >
                      {otherService}
                    </button>
                  );
                })}
              </div>
            </motion.section>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}


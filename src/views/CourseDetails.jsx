"use client";

import React, { useMemo } from "react";
import { useNavigate, useParams } from "@/lib/router";
import coursesData from "../data/coursesData";
import Footer from "../layout/Footer";
import SiteNavbar from "../layout/SiteNavbar";
import { motion } from "framer-motion";
import { fadeInVariant, fadeUpVariant, staggerContainer } from "../utils/motionVariants";

export default function CourseDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const course = useMemo(
    () => coursesData.find((item) => item.slug === slug || item.id === slug),
    [slug]
  );

  if (!course) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <SiteNavbar
          endSlot={
            <button
              type="button"
              onClick={() => navigate("/courses")}
              className="rounded-lg border border-[#073349] px-3 py-2 text-xs font-medium text-[#073349] transition-colors hover:bg-[#073349]/10 hover:text-[#D44459] hover:border-[#D44459] sm:px-4 sm:text-sm"
            >
              Back to Courses
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
            <h1 className="text-3xl font-bold text-[#073349]">Course not found</h1>
            <p className="text-gray-600">
              The course you are looking for is not available right now. Please explore our courses or
              reach out for more information.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/courses")}
                className="px-5 py-2 rounded-full bg-[#D44459] text-white font-semibold hover:bg-[#b83a4a] transition"
              >
                Explore Courses
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

  return (
    <div className="bg-white text-[#073349] min-h-screen">
      {/* Top bar */}
      <div className="bg-[#D44459] text-white text-center py-2 px-4">
        <p className="text-sm font-medium">Experience holistic learning with Tathaastu experts</p>
      </div>

      <SiteNavbar />

      {/* Hero Banner */}
      <section className="relative w-full">
        <div className="relative h-[360px] md:h-[420px] lg:h-[460px] overflow-hidden">
          <img
            src={course.banner}
            alt={`${course.title} banner`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          >
            <p className="text-sm md:text-base uppercase tracking-widest text-[#F4D9C6] mb-4">
              Tathaastu Certification Course
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
              {course.bannerText}
            </h1>
            <p className="max-w-3xl text-base md:text-lg text-white/85 leading-relaxed mb-6">
              {course.bannerSubtext}
            </p>
            <button
              onClick={() => navigate("/consultation-booking", {
                state: {
                  plan: {
                    name: course.title,
                    type: "course",
                  },
                },
              })}
              className="px-8 py-3 rounded-full bg-[#D44459] text-white font-semibold hover:bg-[#B83A4A] transition text-lg shadow-lg"
            >
              {course.enrollButtonText}
            </button>
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
          {/* H1 Section */}
          <motion.section variants={fadeInVariant} className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#073349]">
              {course.h1Title}
            </h1>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              {course.h1Description}
            </p>
          </motion.section>

          {/* What You Will Learn */}
          <motion.section variants={fadeUpVariant} className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#073349]">
              What You Will Learn
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              {course.whatYouWillLearn.description}
            </p>
            <div className="bg-[#FFF6EF] rounded-3xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-[#073349] mb-4">Core Learnings Include:</h3>
              <ul className="space-y-3 text-sm md:text-base text-[#073349] leading-relaxed">
                {course.whatYouWillLearn.coreLearnings.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-[#D44459] pt-1">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* Why Learn With Tathasstu */}
          <motion.section variants={fadeUpVariant} className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#073349]">
              Why Learn With Tathasstu?
            </h2>
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-[#073349]">
                {course.whyLearnWithTathasstu.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-[#D44459] pt-1">✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* Course Curriculum Overview */}
          <motion.section variants={fadeUpVariant} className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#073349]">
              Course Curriculum Overview
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              {course.curriculumOverview.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {course.curriculumOverview.modules.map((module, index) => (
                <motion.div
                  key={index}
                  variants={fadeUpVariant}
                  className="bg-[#FFF6EF] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#D44459] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#073349] mb-2">
                        {module.title}
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {module.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Start Your Learning Today */}
          <motion.section variants={fadeUpVariant} className="bg-white rounded-3xl p-8 shadow-lg text-center">
            <h2 className="text-xl md:text-2xl font-semibold text-[#073349] mb-4">
              Start Your Learning Today
            </h2>
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              Join our comprehensive course and begin your journey towards mastery. Our expert instructors
              are ready to guide you every step of the way.
            </p>
            <button
              onClick={() => navigate("/consultation-booking", {
                state: {
                  plan: {
                    name: course.title,
                    type: "course",
                  },
                },
              })}
              className="px-8 py-4 rounded-full bg-[#D44459] text-white font-semibold hover:bg-[#B83A4A] transition text-lg shadow-lg"
            >
              {course.startLearningButtonText}
            </button>
          </motion.section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}


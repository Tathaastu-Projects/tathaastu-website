"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from "@/lib/router";
import Footer from '../layout/Footer';
import SiteNavbar from '../layout/SiteNavbar';

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
      name: "Kundli Clarity Session",
      price: "₹499",
      duration: "30 Minutes",
      description:
        "Start with a personalised Kundli consultation to discuss your questions, address your concerns, and understand your birth chart better.",
      features: [
        "30-Minute Personalised Video Consultation",
        "Kundli Insights to Help You Understand Your Life Better",
        "One-on-One Discussion to Get Your Questions Answered",
      ],
      buttonText: "Book Now",
    },
    {
      name: "Kundli Guidance Session",
      price: "₹1,099",
      duration: "45 Minutes",
      description:
        "Explore your Kundli in greater detail, discuss what matters most to you, and receive a personalised Kundli PDF for future reference.",
      features: [
        "45-Minute Personalised Video Consultation",
        "Detailed Kundli Analysis for Greater Clarity and Direction",
        "One-on-One Discussion to Address Your Questions",
        "Personal Kundli PDF for Future Reference",
      ],
      buttonText: "Book Now",
    },
    {
      name: "Detailed Kundli Consultation",
      price: "₹2,499",
      duration: "60 Minutes",
      description:
        "Explore your Kundli in depth, gain clarity on life’s important questions, and discover personalised astrological remedies.",
      features: [
        "60-Minute Personalised Video Consultation",
        "In-Depth Kundli Analysis for Greater Clarity in Life",
        "One-on-One Discussion to Address Your Personal Questions",
        "Detailed Kundli PDF for Future Reference",
        "Personalised Astrological Remedies Based on Your Kundli",
      ],
      buttonText: "Book Now",
    },
    {
      name: "In-Depth Life Analysis",
      price: "₹5,100",
      duration: "90 Minutes",
      description:
        "An in-depth Kundli consultation offering personalised birth chart insights, clarity across key areas of life, and astrological remedies tailored to your chart.",
      features: [
        "90-Minute Personalised Video Consultation",
        "Comprehensive Kundli and Birth Chart Analysis",
        "Detailed Kundli PDF for Future Reference",
        "Personalised Guidance on Career, Relationships, Life Decisions, and Personal Growth",
        "Astrological Remedies Tailored to Your Kundli",
        "Exclusive Discount on the Abhimantrit Store",
      ],
      buttonText: "Book Now",
    },
  ];

  const exclusivePlan = {
    name: "Exclusive Consultation with Co-Founder Priyanka Singh",
    price: "₹21,000",
    priceNote: "Starting from",
    duration: "1 hour",
    format: "Face-to-face meeting or video call",
    description:
      "For those looking for a more exclusive consultation, connect with Tathaastu co-founder Priyanka Singh for a personalised session focused on your questions and concerns.",
    features: [
      "Personalised Kundli reading to help you understand your birth chart",
      "One-on-one guidance on your personal and spiritual concerns",
      "Astrological remedies tailored to your Kundli and needs",
      "A chance to discuss the questions and concerns on your mind",
      "Deeper insights to help you find clarity and direction in life",
    ],
    buttonText: "Consult Now",
  };

  return (
    <div className="bg-white text-[#073349]">
      
      {/* TOP BAR */}
      <div className="bg-[#D44459] text-white text-center py-2 px-4">
        <p className="text-sm font-medium">AI-POWERED PLATFORM REVOLUTIONIZING ASTROLOGY</p>
      </div>
      
      <SiteNavbar />

      <div className="bg-[#f7f3ec] text-[#073349]">
        <section className="px-4 pb-4 pt-16 text-center md:pt-20">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#9a7340]">
            PERSONALISED ASTROLOGY CONSULTATIONS
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-playfair text-4xl leading-tight text-[#064233] md:text-5xl">
            Choose Your Consultation Package
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#4d5c56] md:text-lg">
            Find the right level of guidance for your questions, your Kundli, and the clarity you seek.
          </p>
          {consult.active ? (
            <p className="mx-auto mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm text-[#325d72] shadow-[0_8px_20px_rgba(6,66,51,0.06)]">
              Choose a package. Next you will pick an expert and share your birth details.
            </p>
          ) : null}
        </section>

        <section className="px-4 pb-20 pt-8 md:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {pricingPlans.map((plan, index) => (
                <article
                  key={plan.name}
                  className="flex h-full flex-col rounded-[1.35rem] border border-[rgba(6,66,51,0.08)] bg-white p-6 shadow-[0_18px_40px_rgba(6,66,51,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(6,66,51,0.1)] md:p-7"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold tracking-[0.18em] text-[#c4a035]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full bg-[#f7f3ec] px-3 py-1 text-xs font-semibold tracking-wide text-[#8a6840]">
                      {plan.duration}
                    </span>
                  </div>
                  <p className="mt-5 font-playfair text-4xl leading-none text-[#064233]">{plan.price}</p>
                  <h2 className="mt-4 font-playfair text-[1.7rem] leading-tight text-[#073349]">{plan.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#4d5c56]">{plan.description}</p>
                  <div className="my-5 h-px bg-[rgba(6,66,51,0.08)]" />
                  <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-[#9a7340]">
                    WHAT&apos;S INCLUDED
                  </p>
                  <ul className="mt-3 flex-1 space-y-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#24312c]">
                        <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#c4a035]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => handleGetStarted(plan)}
                    className="mt-6 w-full rounded-[0.9rem] bg-[#e74660] px-6 py-3 text-base font-semibold text-white shadow-[0_10px_24px_rgba(231,70,96,0.22)] transition duration-200 hover:-translate-y-px hover:bg-[#d63d56]"
                  >
                    {plan.buttonText}
                  </button>
                </article>
              ))}
            </div>

            <article className="mt-6 overflow-hidden rounded-[1.5rem] bg-[#064233] text-white shadow-[0_24px_50px_rgba(6,66,51,0.18)]">
              <div className="grid gap-8 p-6 md:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.7fr)] md:p-10">
                <div>
                  <p className="text-xs font-semibold tracking-[0.22em] text-[#e6c98a]">EXCLUSIVE</p>
                  <h2 className="mt-3 font-playfair text-3xl leading-tight md:text-4xl">{exclusivePlan.name}</h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#d7e4df] md:text-base">
                    {exclusivePlan.description}
                  </p>
                  <p className="mb-3 mt-8 text-[0.68rem] font-semibold tracking-[0.16em] text-[#e6c98a]">
                    WHAT&apos;S INCLUDED
                  </p>
                  <ul className="space-y-2.5">
                    {exclusivePlan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#f4f7f5]">
                        <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#e6c98a]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex h-fit flex-col rounded-[1.25rem] bg-[#f7f3ec] p-6 text-[#073349]">
                  <p className="text-xs font-semibold tracking-[0.16em] text-[#9a7340]">
                    {exclusivePlan.priceNote}
                  </p>
                  <p className="mt-2 font-playfair text-5xl leading-none text-[#064233]">{exclusivePlan.price}</p>
                  <dl className="mt-6 space-y-4 text-sm">
                    <div>
                      <dt className="text-[0.68rem] font-semibold tracking-[0.14em] text-[#9a7340]">DURATION</dt>
                      <dd className="mt-1 text-[#24312c]">{exclusivePlan.duration}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.68rem] font-semibold tracking-[0.14em] text-[#9a7340]">FORMAT</dt>
                      <dd className="mt-1 leading-relaxed text-[#24312c]">{exclusivePlan.format}</dd>
                    </div>
                  </dl>
                  <button
                    type="button"
                    onClick={() => handleGetStarted(exclusivePlan)}
                    className="mt-6 w-full rounded-[0.9rem] bg-[#064233] px-6 py-3 text-base font-semibold text-white transition duration-200 hover:bg-[#0b5346]"
                  >
                    {exclusivePlan.buttonText}
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

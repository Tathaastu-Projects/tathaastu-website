"use client";

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "@/lib/router";
import Footer from "../layout/Footer";
import SiteNavbar from "../layout/SiteNavbar";
import drPriyankaImg from "../assets/home/Priyanka Mam.svg";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  FileText,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Video,
} from "lucide-react";
import "./pricing.css";
import { fetchPlans } from "../services/plansApi";

export default function Pricing() {
  const navigate = useNavigate();
  const [consult, setConsult] = useState({
    active: false,
    service: "consult",
    astrologerId: "",
    expertName: "",
    expertSlug: "",
    expertImg: "",
  });
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [apiPlans, setApiPlans] = useState([]);

  useEffect(() => {
    fetchPlans()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setApiPlans(data);
        }
      })
      .catch((err) => {
        console.warn("Could not load plans from API:", err);
      });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const astro = params.get("astrologer") || params.get("astrologerId") || "";
    setConsult({
      active: params.get("flow") === "consult" || Boolean(astro),
      service: params.get("service") || "consult",
      astrologerId: astro,
      expertName: params.get("expertName") || params.get("astrologerName") || "",
      expertSlug: params.get("expertSlug") || "",
      expertImg: params.get("expertImg") || "",
    });
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    // Defensive fallback: ensure cards are always revealed after 1.2s regardless of scroll state
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const handleGetStarted = (plan) => {
    const planName = plan.name;
    const planPrice = plan.priceLabel || plan.price;
    const planDuration = plan.durationLabel || plan.duration;
    const planMode = plan.mode || "video";
    const planId = plan.id || plan._id || "";

    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(
          "tathaastu_selected_package",
          JSON.stringify({
            planId,
            planCode: plan.code || "",
            package: planName,
            price: planPrice,
            priceInr: plan.priceInr,
            duration: planDuration,
            mode: planMode,
            service: consult.service || "consult",
          })
        );
      } catch (e) {}
    }

    const params = new URLSearchParams({
      flow: "consult",
      service: consult.service || "consult",
      planId,
      package: planName,
      price: planPrice,
      duration: planDuration,
      mode: planMode,
    });
    if (plan.code) params.set("planCode", plan.code);
    if (consult.astrologerId) params.set("astrologer", consult.astrologerId);
    if (consult.expertName) params.set("expertName", consult.expertName);
    if (consult.expertSlug) params.set("expertSlug", consult.expertSlug);
    if (consult.expertImg) params.set("expertImg", consult.expertImg);

    navigate(`/talk-to-astrologers?${params.toString()}`);
  };

  const defaultPricingPlans = [
    {
      id: "01",
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
      isPopular: false,
    },
    {
      id: "02",
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
      isPopular: false,
    },
    {
      id: "03",
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
      isPopular: true,
    },
    {
      id: "04",
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
      isPopular: false,
    },
  ];

  const defaultExclusivePlan = {
    name: "Exclusive Consultation with Co-Founder Priyanka Singh",
    subtitle: "Lead Spiritual Mentor & Vedic Astrologer",
    price: "₹21,000",
    priceNote: "Starting from",
    duration: "1 Hour",
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

  const pricingPlans = apiPlans.length > 0
    ? apiPlans.filter((p) => !p.isExclusive).map((p, idx) => ({
        id: p.id || String(idx + 1).padStart(2, "0"),
        code: p.code,
        name: p.name,
        price: p.priceLabel || `₹${p.priceInr}`,
        priceInr: p.priceInr,
        duration: p.durationLabel || `${p.durationMinutes} Minutes`,
        mode: p.mode,
        description: p.description,
        features: p.features || [],
        buttonText: "Book Now",
        isPopular: Boolean(p.isPopular),
      }))
    : defaultPricingPlans;

  const exclusivePlan = apiPlans.length > 0 && apiPlans.find((p) => p.isExclusive)
    ? {
        id: apiPlans.find((p) => p.isExclusive).id,
        code: apiPlans.find((p) => p.isExclusive).code,
        name: apiPlans.find((p) => p.isExclusive).name,
        subtitle: "Lead Spiritual Mentor & Vedic Astrologer",
        price: apiPlans.find((p) => p.isExclusive).priceLabel || `₹${apiPlans.find((p) => p.isExclusive).priceInr}`,
        priceInr: apiPlans.find((p) => p.isExclusive).priceInr,
        priceNote: "Starting from",
        duration: apiPlans.find((p) => p.isExclusive).durationLabel || `${apiPlans.find((p) => p.isExclusive).durationMinutes} Minutes`,
        mode: apiPlans.find((p) => p.isExclusive).mode,
        format: "Face-to-face meeting or video call",
        description: apiPlans.find((p) => p.isExclusive).description,
        features: apiPlans.find((p) => p.isExclusive).features || [],
        buttonText: "Consult Now",
      }
    : defaultExclusivePlan;

  return (
    <div className="bg-white text-[#073349]">
      <SiteNavbar />

      <div className="pricing-page-wrapper">
        {/* HERO HEADER */}
        <section className="pricing-hero-section">
          <div className="pricing-eyebrow-badge">
            <Sparkles className="h-3 w-3 text-[#c4842a]" />
            <span>Personalised Astrology Consultations</span>
            <Sparkles className="h-3 w-3 text-[#c4842a]" />
          </div>

          <h1 className="pricing-hero-title">
            Choose Your Consultation <span>Package</span>
          </h1>

          <p className="pricing-hero-sub">
            Find the right level of guidance for your questions, your Kundli, and the clarity you seek.
          </p>

          {consult.expertName ? (
            <div className="pricing-stepper-pill">
              <span className="pricing-stepper-dot" />
              <span>Step 1: Choose a package for your session with <strong>{consult.expertName}</strong></span>
            </div>
          ) : consult.active ? (
            <div className="pricing-stepper-pill">
              <span className="pricing-stepper-dot" />
              <span>Step 1: Choose a package · Next: Select your verified expert & proceed to payment</span>
            </div>
          ) : null}
        </section>

        {/* CONSULTATION PACKAGES GRID */}
        <section
          ref={sectionRef}
          className={`pricing-cards-section ${isVisible ? "is-visible" : ""}`}
        >
          <div className="pricing-cards-container">
            <div className="pricing-cards-grid">
              {pricingPlans.map((plan, index) => (
                <article
                  key={plan.name}
                  className={`pricing-card ${plan.isPopular ? "is-popular" : ""}`}
                  style={{ "--plan-index": index }}
                >
                  {plan.isPopular && (
                    <div className="pricing-popular-ribbon">
                      <Star className="fill-white" />
                      <span>Most Popular</span>
                    </div>
                  )}

                  <div className="pricing-card__meta-bar">
                    <span className="pricing-card__num-token">
                      {plan.id}
                    </span>
                    <span className="pricing-card__duration-badge">
                      <Clock />
                      <span>{plan.duration}</span>
                    </span>
                  </div>

                  <div className="pricing-card__price-wrap">
                    <p className="pricing-card__price">{plan.price}</p>
                    <span className="pricing-card__price-sub">/ One-time session</span>
                  </div>

                  <h2 className="pricing-card__title">{plan.name}</h2>
                  <p className="pricing-card__desc">{plan.description}</p>

                  <div className="pricing-card__divider" />

                  <div className="pricing-card__features-head">
                    <Sparkles className="h-3 w-3 text-[#c4842a]" />
                    <span>What&apos;s Included</span>
                  </div>

                  <ul className="pricing-card__features-list">
                    {plan.features.map((feature) => (
                      <li key={feature} className="pricing-card__feature-item">
                        <span className="pricing-card__check-disc">
                          <Check />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => handleGetStarted(plan)}
                    className="pricing-card__btn"
                  >
                    <span>{plan.buttonText}</span>
                    <ArrowRight />
                  </button>
                </article>
              ))}
            </div>

            {/* EXCLUSIVE CO-FOUNDER CONSULTATION CARD */}
            <article className="pricing-exclusive-card">
              <div className="pricing-exclusive-inner">
                <div>
                  <div className="pricing-exclusive-badge">
                    <Star className="h-3 w-3 fill-[#ffd88a]" />
                    <span>Exclusive VIP Concierge</span>
                  </div>

                  <div className="pricing-exclusive-header-row">
                    <div className="pricing-exclusive-portrait-wrap">
                      <img
                        src={drPriyankaImg?.src || drPriyankaImg}
                        alt="Priyanka Singh"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h2 className="pricing-exclusive-title">{exclusivePlan.name}</h2>
                      <p className="text-xs font-semibold tracking-wider text-[#ffd88a] uppercase mt-1">
                        {exclusivePlan.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="pricing-exclusive-desc">
                    {exclusivePlan.description}
                  </p>

                  <div className="pricing-exclusive-features-head">
                    <Sparkles className="h-3 w-3 text-[#ffd88a]" />
                    <span>What&apos;s Included</span>
                  </div>

                  <ul className="pricing-exclusive-features-list">
                    {exclusivePlan.features.map((feature) => (
                      <li key={feature} className="pricing-exclusive-feature-item">
                        <Star className="h-3 w-3 fill-[#ffd88a]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pricing-exclusive-price-box">
                  <span className="pricing-exclusive-price-note">
                    {exclusivePlan.priceNote}
                  </span>
                  <p className="pricing-exclusive-price-val">{exclusivePlan.price}</p>

                  <dl className="pricing-exclusive-specs">
                    <div className="pricing-exclusive-spec-row">
                      <Clock />
                      <div>
                        <dt>Duration</dt>
                        <dd>{exclusivePlan.duration}</dd>
                      </div>
                    </div>
                    <div className="pricing-exclusive-spec-row">
                      <Video />
                      <div>
                        <dt>Format</dt>
                        <dd>{exclusivePlan.format}</dd>
                      </div>
                    </div>
                  </dl>

                  <button
                    type="button"
                    onClick={() => handleGetStarted(exclusivePlan)}
                    className="pricing-exclusive-cta-btn"
                  >
                    <span>{exclusivePlan.buttonText}</span>
                    <ArrowRight className="h-4 w-4" />
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

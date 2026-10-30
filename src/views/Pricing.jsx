"use client";

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "@/lib/router";
import Footer from "../layout/Footer";
import SiteNavbar from "../layout/SiteNavbar";
import {
  ArrowRight,
  Check,
  Clock,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import dynamic from "next/dynamic";
import "./pricing.css";
import { fetchPlans } from "../services/plansApi";

const PriyankaConsultationScreen = dynamic(
  () => import("../components/Pricing/PriyankaConsultationScreen"),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        style={{ minHeight: "42vh", display: "grid", placeItems: "center", color: "#b88628" }}
      >
        Loading packages…
      </div>
    ),
  }
);

export default function Pricing() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const expertQuery = (searchParams?.get("expertName") || searchParams?.get("astrologer") || "").toLowerCase();
  const isPriyankaInit = expertQuery.includes("priyanka");

  const [activeTab, setActiveTab] = useState(isPriyankaInit ? "priyanka" : "all");

  useEffect(() => {
    if (isPriyankaInit) {
      setActiveTab("priyanka");
    }
  }, [isPriyankaInit]);
  const [consult, setConsult] = useState({
    active: false,
    service: "consult",
    astrologerId: "",
    expertName: "",
    expertSlug: "",
    expertImg: "",
  });
  const sectionRef = useRef(null);
  // Show cards immediately — delayed reveal made pricing feel slow after CTA clicks.
  const [isVisible] = useState(true);
  const [apiPlans, setApiPlans] = useState([]);

  useEffect(() => {
    let cancelled = false;
    fetchPlans()
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setApiPlans(data);
        }
      })
      .catch((err) => {
        console.warn("Could not load plans from API:", err);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const astro = params.get("astrologer") || params.get("astrologerId") || "";
    const exp = (params.get("expertName") || params.get("astrologerName") || "").toLowerCase();
    if (exp.includes("priyanka") || astro.toLowerCase().includes("priyanka")) {
      setActiveTab("priyanka");
    }
    setConsult({
      active: params.get("flow") === "consult" || Boolean(astro),
      service: params.get("service") || "consult",
      astrologerId: astro,
      expertName: params.get("expertName") || params.get("astrologerName") || "",
      expertSlug: params.get("expertSlug") || "",
      expertImg: params.get("expertImg") || "",
    });
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

  const handleBookPriyanka = (pkg) => {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(
          "tathaastu_selected_package",
          JSON.stringify({
            planId: pkg.id,
            planCode: pkg.serviceKey,
            package: pkg.name,
            price: pkg.price,
            priceInr: pkg.priceInr,
            duration: pkg.duration,
            mode: "video",
            service: pkg.serviceKey,
            astrologer: "Dr. Priyanka Singh . Head Astrologer",
            astrologerId: "priyanka-singh",
          })
        );
      } catch (e) {}
    }

    const params = new URLSearchParams({
      package: pkg.name,
      price: pkg.price,
      duration: pkg.duration,
      service: pkg.serviceKey,
      planId: pkg.id,
      mode: "video",
      astrologer: "Dr. Priyanka Singh . Head Astrologer",
      astrologerId: "priyanka-singh",
      astrologerSlug: "priyanka-singh",
      expertRating: "5.0",
      expertExp: "15+",
      expertExpertise: "Vedic, Vastu, Tarot, Numerology, Aura & Energy",
      expertLanguages: "Hindi - English",
    });

    navigate(`/payment?${params.toString()}`);
  };

  const defaultPricingPlans = [
    {
      id: "01",
      displayNumber: "01",
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
      displayNumber: "02",
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
      displayNumber: "03",
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
      displayNumber: "04",
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

  // Astrologer packages only (exclude Founder / Priyanka exclusive + audio add-ons)
  const pricingPlans = apiPlans.length > 0
    ? apiPlans
        .filter((p) => !p.isExclusive && String(p.mode || "video").toLowerCase() !== "audio")
        .slice()
        .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0))
        .map((p, idx) => ({
          id: p.id || p._id || String(idx + 1).padStart(2, "0"),
          displayNumber: String(idx + 1).padStart(2, "0"),
          code: p.code,
          name: p.name,
          price: p.priceLabel || `₹${Number(p.priceInr).toLocaleString("en-IN")}`,
          priceInr: p.priceInr,
          duration: p.durationLabel || `${p.durationMinutes} Minutes`,
          mode: p.mode,
          description: p.description,
          features: p.features || [],
          buttonText: "Book Now",
          isPopular: Boolean(p.isPopular),
        }))
    : defaultPricingPlans;

  return (
    <div className="bg-white text-[#073349]">
      <SiteNavbar />

      <div className="pricing-page-wrapper">
        {/* MASTER TABS: PRIYANKA VS ALL EXPERTS */}
        <div className="pricing-master-tabs-wrap">
          <div className="pricing-master-tabs">
            <button
              type="button"
              className={`pricing-master-tab ${activeTab === "priyanka" ? "is-active" : ""}`}
              onClick={() => setActiveTab("priyanka")}
            >
              <Sparkles className="h-4 w-4" />
              <span>Dr. Priyanka Singh . Head Astrologer</span>
              <span className="pricing-master-pill">5 Exclusive Packages</span>
            </button>
            <button
              type="button"
              className={`pricing-master-tab ${activeTab === "all" ? "is-active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              <Users className="h-4 w-4" />
              <span>Verified Tathaastu Astrologers</span>
              <span className="pricing-master-pill">Sessions from ₹499</span>
            </button>
          </div>
        </div>

        {activeTab === "priyanka" ? (
          <PriyankaConsultationScreen
            onSelectPackage={handleBookPriyanka}
            onBackToAll={() => setActiveTab("all")}
          />
        ) : (
          <>
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

                      <div>
                        <div className="pricing-card__meta-bar">
                          <span className="pricing-card__num-token">
                            {plan.displayNumber || String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="pricing-card__duration-badge">
                            <Clock />
                            <span>{plan.duration}</span>
                          </span>
                        </div>

                        <div className="pricing-card__price-wrap">
                          <p className="pricing-card__price">{plan.price}</p>
                          <span className="pricing-card__price-sub">| {plan.duration}</span>
                        </div>

                        <h2 className="pricing-card__title">{plan.name}</h2>
                        <p className="pricing-card__desc">{plan.description}</p>

                        <div className="pricing-card__divider" />

                        <div className="pricing-card__features-head">
                          <Sparkles className="h-3.5 w-3.5 text-[#d4a853]" />
                          <span>What&apos;s Included</span>
                        </div>

                        <ul className="pricing-card__features-list">
                          {plan.features.map((feature) => (
                            <li key={feature} className="pricing-card__feature-item">
                              <Check className="pricing-card__check-icon" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

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
              </div>
            </section>
          </>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

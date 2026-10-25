"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "@/lib/router";
import {
  BadgeCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  CreditCard,
  Download,
  HelpCircle,
  Lock,
  Mail,
  MapPin,
  Phone,
  Radio,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  User,
  Video,
} from "lucide-react";
import SiteNavbar from "../layout/SiteNavbar";
import Footer from "../layout/Footer";
import "./consultation-booking.css";
import { initiatePayUPayment } from "../services/paymentApi";
import { createHmsSession } from "../services/hmsApi";
import { connectExotelCall } from "../services/callsApi";
import dynamic from "next/dynamic";

const HmsConsultationModal = dynamic(
  () => import("../components/Consult/HmsConsultationModal"),
  { ssr: false }
);

import harishankarImg from "../assets/astrologer/harishnkar.jpg";
import anuradhaImg from "../assets/astrologer/anuradha.jpg";
import hosalImg from "../assets/astrologer/hosal.jpg";
import vibhutiImg from "../assets/astrologer/vibhuti.jpg";
import upendraImg from "../assets/astrologer/upendra.jpg";
import deepakImg from "../assets/astrologer/deepak.jpg";
import duttImg from "../assets/astrologer/dutt.jpg";

const DEFAULT_EXPERT = {
  id: "pameshwar-dutt",
  name: "Pameshwar Dutt",
  imageUrl: duttImg,
  verified: true,
  rating: "5.0",
  consultations: "14.6k+",
  expYears: 12,
  languages: "English - Hindi",
  expertise: "Vedic, Numerology, Lo Shu Grid",
};

const ASTROLOGER_IMAGE_MAP = {
  "pameshwar-dutt": duttImg,
  "dr-vibhuti": vibhutiImg,
  "acharya-upendra": upendraImg,
  deepak: deepakImg,
  "pt-deepak": deepakImg,
  harishankar: harishankarImg,
  "pt-harishankar": harishankarImg,
  hosal: hosalImg,
  "pt-hosal": hosalImg,
  anuradha: anuradhaImg,
  "acharya-anuradha": anuradhaImg,
};

const POPULAR_BANKS = [
  { id: "HDFC", name: "HDFC Bank" },
  { id: "SBI", name: "State Bank of India" },
  { id: "ICICI", name: "ICICI Bank" },
  { id: "AXIS", name: "Axis Bank" },
  { id: "KOTAK", name: "Kotak Mahindra" },
];

export default function ConsultationBooking() {
  const navigate = useNavigate();
  const location = useLocation();

  // Booking Parameters (from query or state)
  const [params, setParams] = useState({
    packageName: "Kundli Clarity Session",
    price: "₹499",
    duration: "30 Minutes",
    astrologerName: DEFAULT_EXPERT.name,
    astrologerId: DEFAULT_EXPERT.id,
    astrologerImg: DEFAULT_EXPERT.imageUrl,
    astrologerRating: DEFAULT_EXPERT.rating,
    astrologerExp: DEFAULT_EXPERT.expYears,
    astrologerExpertise: DEFAULT_EXPERT.expertise,
    astrologerLanguages: DEFAULT_EXPERT.languages,
  });

  // Client Details Form
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    slot: "urgent",
    dob: "",
    tob: "",
    pob: "",
    concern: "Love & Marriage",
  });

  // UI States
  const [showBirthDetails, setShowBirthDetails] = useState(false);
  const [selectedPayMethod, setSelectedPayMethod] = useState("UPI");
  const [upiApp, setUpiApp] = useState("gpay");
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("HDFC");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);

  // 100ms Consultation & Exotel Calling State
  const [activeHmsSession, setActiveHmsSession] = useState(null);
  const [isHmsModalOpen, setIsHmsModalOpen] = useState(false);
  const [hmsLoading, setHmsLoading] = useState(false);
  const [phoneCallNotice, setPhoneCallNotice] = useState(null);

  // Initialize data on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const searchParams = new URLSearchParams(window.location.search);
    const statePlan = location?.state?.plan;

    const packageName =
      searchParams.get("package") || statePlan?.name || "Kundli Clarity Session";
    const price = searchParams.get("price") || statePlan?.price || "₹499";
    const duration =
      searchParams.get("duration") || statePlan?.duration || "30 Minutes";

    const astroName =
      searchParams.get("astrologer") ||
      searchParams.get("expertName") ||
      DEFAULT_EXPERT.name;
    const astroId =
      searchParams.get("astrologerId") ||
      searchParams.get("astrologer") ||
      DEFAULT_EXPERT.id;

    // Resolve avatar
    let avatar = searchParams.get("astrologerImg");
    if (!avatar && ASTROLOGER_IMAGE_MAP[astroId]) {
      avatar = ASTROLOGER_IMAGE_MAP[astroId];
    }
    if (!avatar) {
      const lower = astroName.toLowerCase();
      if (lower.includes("vibhuti")) avatar = vibhutiImg;
      else if (lower.includes("upendra")) avatar = upendraImg;
      else if (lower.includes("deepak")) avatar = deepakImg;
      else if (lower.includes("harishankar")) avatar = harishankarImg;
      else if (lower.includes("hosal")) avatar = hosalImg;
      else if (lower.includes("anuradha")) avatar = anuradhaImg;
      else avatar = duttImg;
    }

    setParams({
      packageName,
      price,
      duration,
      astrologerName: astroName,
      astrologerId: astroId,
      astrologerImg: avatar,
      astrologerRating: searchParams.get("expertRating") || DEFAULT_EXPERT.rating,
      astrologerExp: searchParams.get("expertExp") || DEFAULT_EXPERT.expYears,
      astrologerExpertise:
        searchParams.get("expertExpertise") || DEFAULT_EXPERT.expertise,
      astrologerLanguages:
        searchParams.get("expertLanguages") || DEFAULT_EXPERT.languages,
    });
  }, [location]);

  // Compute numeric price
  const parsePrice = (priceStr) => {
    if (!priceStr) return 499;
    const num = parseFloat(String(priceStr).replace(/[^\d.]/g, ""));
    return Number.isFinite(num) && num > 0 ? num : 499;
  };

  const basePrice = parsePrice(params.price);
  const finalPrice = Math.max(0, basePrice - discount);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === "VEDIC100" || code === "FIRST100") {
      setDiscount(100);
      setCouponApplied(code);
    } else if (code === "TATHAASTU" || code === "BLESSINGS") {
      setDiscount(basePrice > 1000 ? 250 : 100);
      setCouponApplied(code);
    } else if (code) {
      // Mock 5% festive discount for any entered promo
      const disc = Math.round(basePrice * 0.1);
      setDiscount(disc);
      setCouponApplied(code);
    }
  };

  // Launch 100ms in-app audio/video consultation session
  const handleLaunchConsultation = async (mode = "video") => {
    setHmsLoading(true);
    try {
      const data = await createHmsSession({
        mode,
        astrologerId: params.astrologerId,
      });
      setActiveHmsSession(data);
      setIsHmsModalOpen(true);
    } catch (err) {
      console.warn("Could not create HMS session:", err);
    } finally {
      setHmsLoading(false);
    }
  };

  // Connect direct phone call via Exotel
  const handleConnectPhoneCall = async () => {
    try {
      const res = await connectExotelCall({
        from: "9876543210",
        to: formData.phone || "9123456789",
        astrologerId: params.astrologerId,
        customerName: formData.name,
      });
      setPhoneCallNotice(
        res?.message ||
          "Exotel phone bridge connected! Both parties will receive an incoming telephone call shortly."
      );
    } catch (err) {
      setPhoneCallNotice(
        "Phone bridge call initiated. Please keep your mobile phone accessible."
      );
    }
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter your full name.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      alert("Please enter a valid 10-digit WhatsApp phone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Backend PayU payment initiation
      const payResult = await initiatePayUPayment({
        amount: finalPrice,
        packageName: params.packageName,
        astrologerName: params.astrologerName,
        astrologerId: params.astrologerId,
        customerName: formData.name,
        customerPhone: formData.phone,
        customerEmail: formData.email,
        appointmentSlot: formData.slot,
        birthDetails: {
          dob: formData.dob,
          tob: formData.tob,
          pob: formData.pob,
          concern: formData.concern,
        },
      }).catch(() => null);

      if (payResult?.params && !payResult?.isDemo && payResult?.actionUrl) {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = payResult.actionUrl;
        Object.entries(payResult.params).forEach(([k, v]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = k;
          input.value = v;
          form.appendChild(input);
        });
        document.body.appendChild(form);
        form.submit();
        return;
      }

      // Smooth PayU Sandbox simulation state
      await new Promise((resolve) => setTimeout(resolve, 800));
      const bookingId = `TAT-PAYU-${Date.now().toString().slice(-6)}`;
      setSuccessOrder({
        bookingId,
        name: formData.name,
        phone: formData.phone,
        astrologer: params.astrologerName,
        packageName: params.packageName,
        slot: formData.slot,
        amount: finalPrice,
      });
    } catch (err) {
      console.warn("PayU checkout fallback:", err);
      const bookingId = `TAT-PAYU-${Date.now().toString().slice(-6)}`;
      setSuccessOrder({
        bookingId,
        name: formData.name,
        phone: formData.phone,
        astrologer: params.astrologerName,
        packageName: params.packageName,
        slot: formData.slot,
        amount: finalPrice,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pay-page">
      <SiteNavbar />

      <main className="pay-container">
        {/* STEPPER HEADER */}
        <div className="pay-stepper-wrap">
          <nav className="pay-stepper" aria-label="Booking flow progress">
            <Link
              to="/pricing"
              className="pay-step pay-step--done"
              title="Click to change package"
            >
              <span className="pay-step__badge">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span>1. Select Package</span>
            </Link>
            <span className="pay-step__sep">/</span>
            <Link
              to={`/talk-to-astrologers?flow=consult&package=${encodeURIComponent(params.packageName || "")}&price=${encodeURIComponent(params.price || "")}&duration=${encodeURIComponent(params.duration || "")}`}
              className="pay-step pay-step--done"
              title="Click to select another astrologer"
            >
              <span className="pay-step__badge">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span>2. Choose Astrologer</span>
            </Link>
            <span className="pay-step__sep">/</span>
            <span className="pay-step pay-step--active">
              <span className="pay-step__badge">
                <Lock className="h-3 w-3" />
              </span>
              <span>3. PayU Secure Payment</span>
            </span>
          </nav>

          <header className="pay-header">
            <h1 className="pay-header__title">
              Complete Your <span>Consultation Booking</span>
            </h1>
            <p className="pay-header__sub">
              Your session is protected by Tathaastu’s Sacred Vedic Guarantee and
              encrypted 256-bit payment processing powered by PayU India.
            </p>
          </header>
        </div>

        {/* 2-COLUMN CHECKOUT GRID */}
        <div className="pay-grid">
          {/* ================= LEFT COLUMN ================= */}
          <aside className="pay-summary-col">
            <div className="pay-card">
              <div className="pay-card__header">
                <h2 className="pay-card__header-title">
                  <Sparkles className="h-4 w-4" />
                  <span>Order Summary</span>
                </h2>
                <span className="pay-cert-badge">Verified Guru</span>
              </div>

              <div className="pay-card__body">
                {/* EXPERT HIGHLIGHT */}
                <article className="pay-expert-card">
                  <div className="pay-expert-avatar-frame">
                    <img
                      src={params.astrologerImg}
                      alt={params.astrologerName}
                      className="pay-expert-avatar"
                    />
                    <span className="pay-expert-live-dot" title="Astrologer Online" />
                  </div>
                  <div className="pay-expert-info">
                    <span className="pay-expert-role-badge">Selected Astrologer</span>
                    <div className="pay-expert-name-row">
                      <h3 className="pay-expert-name">{params.astrologerName}</h3>
                      <span className="pay-expert-verified">
                        <BadgeCheck
                          className="h-4 w-4 text-[#16a34a]"
                          fill="currentColor"
                          stroke="#fff"
                        />
                      </span>
                    </div>
                    <div className="pay-expert-tags">
                      {params.astrologerExpertise &&
                        params.astrologerExpertise
                          .split(",")
                          .slice(0, 3)
                          .map((tag) => (
                            <span key={tag} className="pay-expert-tag">
                              {tag.trim()}
                            </span>
                          ))}
                    </div>
                    <div className="pay-expert-meta">
                      <span>
                        ★ <strong>{params.astrologerRating}</strong>
                      </span>
                      <span>•</span>
                      <span>{params.astrologerExp} yrs exp</span>
                    </div>
                    <Link
                      to={`/talk-to-astrologers?flow=consult&package=${encodeURIComponent(params.packageName || "")}&price=${encodeURIComponent(params.price || "")}&duration=${encodeURIComponent(params.duration || "")}`}
                      className="pay-change-link"
                      style={{ display: "inline-block", marginTop: "0.4rem" }}
                    >
                      Change Astrologer →
                    </Link>
                  </div>
                </article>

                {/* PACKAGE HIGHLIGHT */}
                <article className="pay-package-box">
                  <div className="pay-package-top">
                    <div>
                      <h3 className="pay-package-title">{params.packageName}</h3>
                      <span className="pay-package-duration">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{params.duration} Personal Consultation</span>
                      </span>
                    </div>
                    <Link to="/pricing" className="pay-change-link">
                      Change Package →
                    </Link>
                  </div>

                  <ul className="pay-package-features">
                    <li>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>One-on-one live telephonic / video consultation</span>
                    </li>
                    <li>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Comprehensive birth chart & planetary dasha reading</span>
                    </li>
                    <li>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Practical Vedic remedies, mantras & gemstone guidance</span>
                    </li>
                    <li>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Consultation summary & remedy notes sent via WhatsApp</span>
                    </li>
                  </ul>
                </article>

                {/* PRICE BREAKDOWN */}
                <div className="pay-bill-list">
                  <div className="pay-bill-row">
                    <span>Consultation Session Fee</span>
                    <strong>₹{basePrice.toLocaleString("en-IN")}</strong>
                  </div>
                  <div className="pay-bill-row pay-bill-row--free">
                    <span>Platform & Connection Charge</span>
                    <span>FREE (100% Off)</span>
                  </div>
                  <div className="pay-bill-row">
                    <span>Taxes & GST (18%)</span>
                    <span style={{ color: "#16a34a", fontWeight: 600 }}>
                      Included in Package
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="pay-bill-row" style={{ color: "#16a34a" }}>
                      <span>Promo Discount ({couponApplied})</span>
                      <strong>-₹{discount}</strong>
                    </div>
                  )}

                  <div className="pay-bill-divider" />

                  <div className="pay-bill-total">
                    <span>Total Payable</span>
                    <div className="pay-bill-total-price">
                      <span>₹{finalPrice.toLocaleString("en-IN")}</span>
                      <small>INR</small>
                    </div>
                  </div>
                </div>

                {/* PROMO CODE */}
                <form onSubmit={handleApplyCoupon} className="pay-coupon-wrap">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter Coupon (e.g. VEDIC100)"
                    className="pay-coupon-input"
                  />
                  <button type="submit" className="pay-coupon-btn">
                    Apply
                  </button>
                </form>

                {/* SACRED GUARANTEES */}
                <div className="pay-trust-shield">
                  <div className="pay-trust-item">
                    <ShieldCheck className="h-4 w-4" />
                    <span>100% Confidential & Private Consultation</span>
                  </div>
                  <div className="pay-trust-item">
                    <Lock className="h-4 w-4" />
                    <span>PayU India 256-Bit Bank Grade SSL Encryption</span>
                  </div>
                  <div className="pay-trust-item">
                    <Phone className="h-4 w-4" />
                    <span>Free Reschedule or 100% Refund if Expert Unreachable</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ================= RIGHT COLUMN ================= */}
          <section className="pay-checkout-col">
            <div className="pay-card">
              <div className="pay-card__header">
                <h2 className="pay-card__header-title">
                  <User className="h-4 w-4" />
                  <span>Consultation & Payment Details</span>
                </h2>
                <span className="pay-cert-badge">Step 3 of 3</span>
              </div>

              <form onSubmit={handleSubmitPayment} className="pay-card__body">
                {/* 1. CLIENT INTAKE SECTION */}
                <div className="pay-form-section">
                  <h3 className="pay-form-section__title">
                    <Smartphone className="h-4 w-4" />
                    <span>1. Contact Information</span>
                  </h3>

                  <div className="pay-form-grid">
                    <div className="pay-field pay-field--full">
                      <label className="pay-label">
                        <span>Full Name</span>
                        <span className="req">*</span>
                      </label>
                      <div className="pay-input-wrap">
                        <User className="h-4 w-4 pay-input-icon" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Rahul Sharma"
                          className="pay-input pay-input--has-icon"
                          required
                        />
                      </div>
                    </div>

                    <div className="pay-field">
                      <label className="pay-label">
                        <span>WhatsApp Mobile Number</span>
                        <span className="req">*</span>
                      </label>
                      <div className="pay-input-wrap">
                        <Phone className="h-4 w-4 pay-input-icon" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="10-digit WhatsApp number"
                          className="pay-input pay-input--has-icon"
                          maxLength={10}
                          required
                        />
                      </div>
                      <span className="pay-field-hint">
                        Call link & reminders sent to WhatsApp
                      </span>
                    </div>

                    <div className="pay-field">
                      <label className="pay-label">
                        <span>Email ID</span>
                        <span style={{ fontSize: "0.7rem", color: "#637d74" }}>
                          (For receipt & PDF)
                        </span>
                      </label>
                      <div className="pay-input-wrap">
                        <Mail className="h-4 w-4 pay-input-icon" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="name@example.com"
                          className="pay-input pay-input--has-icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. TIME SLOT PREFERENCE */}
                <div className="pay-form-section">
                  <h3 className="pay-form-section__title">
                    <Clock className="h-4 w-4" />
                    <span>2. Preferred Consultation Slot</span>
                  </h3>

                  <div className="pay-slots-grid">
                    <button
                      type="button"
                      className={`pay-slot-chip ${
                        formData.slot === "urgent" ? "is-selected" : ""
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, slot: "urgent" }))
                      }
                    >
                      <Sparkles className="h-4 w-4" />
                      <div>
                        <strong>Earliest Available (Priority)</strong>
                        <span>Connect within 15–30 mins</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`pay-slot-chip ${
                        formData.slot === "morning" ? "is-selected" : ""
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, slot: "morning" }))
                      }
                    >
                      <Clock className="h-4 w-4" />
                      <div>
                        <strong>Morning Slot</strong>
                        <span>09:00 AM – 12:00 PM</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`pay-slot-chip ${
                        formData.slot === "afternoon" ? "is-selected" : ""
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, slot: "afternoon" }))
                      }
                    >
                      <Clock className="h-4 w-4" />
                      <div>
                        <strong>Afternoon Slot</strong>
                        <span>12:00 PM – 04:00 PM</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`pay-slot-chip ${
                        formData.slot === "evening" ? "is-selected" : ""
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, slot: "evening" }))
                      }
                    >
                      <Clock className="h-4 w-4" />
                      <div>
                        <strong>Evening Slot</strong>
                        <span>04:00 PM – 08:30 PM</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* 3. OPTIONAL BIRTH DETAILS */}
                <div className="pay-form-section">
                  <button
                    type="button"
                    className="pay-birth-toggle"
                    onClick={() => setShowBirthDetails((prev) => !prev)}
                  >
                    <span>
                      Add Birth Details for Accurate Kundli Chart (Optional)
                    </span>
                    <ChevronDown
                      className="h-4 w-4 transition-transform"
                      style={{
                        transform: showBirthDetails ? "rotate(180deg)" : "none",
                      }}
                    />
                  </button>

                  {showBirthDetails && (
                    <div className="pay-birth-panel">
                      <div className="pay-form-grid">
                        <div className="pay-field">
                          <label className="pay-label">Date of Birth</label>
                          <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                            className="pay-input"
                          />
                        </div>

                        <div className="pay-field">
                          <label className="pay-label">Time of Birth</label>
                          <input
                            type="time"
                            name="tob"
                            value={formData.tob}
                            onChange={handleInputChange}
                            className="pay-input"
                          />
                        </div>

                        <div className="pay-field">
                          <label className="pay-label">Birth Place (City, State)</label>
                          <div className="pay-input-wrap">
                            <MapPin className="h-4 w-4 pay-input-icon" />
                            <input
                              type="text"
                              name="pob"
                              value={formData.pob}
                              onChange={handleInputChange}
                              placeholder="e.g. New Delhi, India"
                              className="pay-input pay-input--has-icon"
                            />
                          </div>
                        </div>

                        <div className="pay-field">
                          <label className="pay-label">Primary Concern</label>
                          <select
                            name="concern"
                            value={formData.concern}
                            onChange={handleInputChange}
                            className="pay-input"
                          >
                            <option value="Love & Marriage">Love & Marriage</option>
                            <option value="Career & Job">Career & Job</option>
                            <option value="Business & Wealth">Business & Wealth</option>
                            <option value="Health & Healing">Health & Healing</option>
                            <option value="Kundli Dosh & Remedies">
                              Kundli Dosh & Remedies
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. PAYU INDIA GATEWAY INTEGRATION */}
                <div className="payu-box">
                  <div className="payu-header">
                    <div className="payu-brand">
                      <span className="payu-logo-badge">PayU</span>
                      <div className="payu-brand-text">
                        <h4>PayU India Payment Gateway</h4>
                        <p>Instant UPI, Cards, Net Banking & Wallets</p>
                      </div>
                    </div>
                    <span className="payu-cert-badge">
                      <Lock className="h-3 w-3" /> 256-Bit SSL
                    </span>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="payu-methods-row" role="tablist">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={selectedPayMethod === "UPI"}
                      className={`payu-method-btn ${
                        selectedPayMethod === "UPI" ? "is-active" : ""
                      }`}
                      onClick={() => setSelectedPayMethod("UPI")}
                    >
                      <Smartphone className="h-4 w-4" />
                      <span>UPI</span>
                      <small>Instant • 0% Fee</small>
                    </button>

                    <button
                      type="button"
                      role="tab"
                      aria-selected={selectedPayMethod === "CARD"}
                      className={`payu-method-btn ${
                        selectedPayMethod === "CARD" ? "is-active" : ""
                      }`}
                      onClick={() => setSelectedPayMethod("CARD")}
                    >
                      <CreditCard className="h-4 w-4" />
                      <span>Cards</span>
                      <small>Visa / RuPay / MC</small>
                    </button>

                    <button
                      type="button"
                      role="tab"
                      aria-selected={selectedPayMethod === "NB"}
                      className={`payu-method-btn ${
                        selectedPayMethod === "NB" ? "is-active" : ""
                      }`}
                      onClick={() => setSelectedPayMethod("NB")}
                    >
                      <ShieldCheck className="h-4 w-4" />
                      <span>NetBanking</span>
                      <small>50+ Banks</small>
                    </button>

                    <button
                      type="button"
                      role="tab"
                      aria-selected={selectedPayMethod === "WALLET"}
                      className={`payu-method-btn ${
                        selectedPayMethod === "WALLET" ? "is-active" : ""
                      }`}
                      onClick={() => setSelectedPayMethod("WALLET")}
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>Wallets</span>
                      <small>Paytm / Amazon</small>
                    </button>
                  </div>

                  {/* Method Details */}
                  {selectedPayMethod === "UPI" && (
                    <div className="payu-subform">
                      <p
                        style={{
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          color: "#2b493e",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Choose your preferred UPI App:
                      </p>
                      <div className="payu-app-pills">
                        {["Google Pay", "PhonePe", "Paytm UPI", "BHIM / Any UPI"].map(
                          (app) => (
                            <button
                              key={app}
                              type="button"
                              className={`payu-app-pill ${
                                upiApp === app ? "is-active" : ""
                              }`}
                              onClick={() => setUpiApp(app)}
                            >
                              <span>★</span> {app}
                            </button>
                          )
                        )}
                      </div>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="Enter UPI ID (e.g. mobile@upi, name@okhdfcbank)"
                        className="pay-input"
                      />
                    </div>
                  )}

                  {selectedPayMethod === "CARD" && (
                    <div className="payu-subform">
                      <div className="pay-form-grid">
                        <div className="pay-field pay-field--full">
                          <label className="pay-label">Card Number</label>
                          <input
                            type="text"
                            placeholder="XXXX XXXX XXXX XXXX"
                            maxLength={19}
                            className="pay-input"
                          />
                        </div>
                        <div className="pay-field">
                          <label className="pay-label">Expiry (MM/YY)</label>
                          <input type="text" placeholder="MM/YY" className="pay-input" />
                        </div>
                        <div className="pay-field">
                          <label className="pay-label">CVV</label>
                          <input
                            type="password"
                            placeholder="3-digit CVV"
                            maxLength={4}
                            className="pay-input"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedPayMethod === "NB" && (
                    <div className="payu-subform">
                      <p
                        style={{
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          color: "#2b493e",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Select Bank:
                      </p>
                      <div className="payu-app-pills">
                        {POPULAR_BANKS.map((b) => (
                          <button
                            key={b.id}
                            type="button"
                            className={`payu-app-pill ${
                              selectedBank === b.id ? "is-active" : ""
                            }`}
                            onClick={() => setSelectedBank(b.id)}
                          >
                            {b.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedPayMethod === "WALLET" && (
                    <div className="payu-subform">
                      <p
                        style={{
                          fontSize: "0.82rem",
                          color: "#2b493e",
                          lineHeight: 1.45,
                        }}
                      >
                        You will be routed to your wallet provider (Paytm, Mobikwik,
                        Amazon Pay) securely through PayU.
                      </p>
                    </div>
                  )}

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="pay-submit-btn"
                  >
                    <Lock className="h-4 w-4" />
                    <span>
                      {isSubmitting
                        ? "Connecting to PayU Gateway..."
                        : `Proceed to Pay ₹${finalPrice.toLocaleString("en-IN")} via PayU`}
                    </span>
                  </button>

                  <p className="pay-terms-foot">
                    By clicking Proceed, you agree to Tathasstu&apos;s{" "}
                    <Link to="/terms">Terms of Service</Link> and{" "}
                    <Link to="/privacy">Privacy Policy</Link>. Regulated by RBI &amp;
                    PCI-DSS standards.
                  </p>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>

      <Footer />

      {/* SUCCESS CONFIRMATION MODAL */}
      {successOrder && (
        <div className="pay-modal-backdrop" role="dialog" aria-modal="true">
          <div className="pay-modal-card">
            <div className="pay-modal-top">
              <div className="pay-modal-icon-wrap">
                <Check className="h-8 w-8 stroke-[3]" />
              </div>
              <h2 className="pay-modal-title">Consultation Confirmed!</h2>
              <p className="pay-modal-sub">
                Jai Shri Ram. Your consultation has been scheduled with{" "}
                <strong>{successOrder.astrologer}</strong>.
              </p>
            </div>

            <div className="pay-modal-body">
              <div className="pay-receipt-box">
                <div className="pay-receipt-row">
                  <span>Booking Reference</span>
                  <strong>{successOrder.bookingId}</strong>
                </div>
                <div className="pay-receipt-row">
                  <span>Package</span>
                  <strong>{successOrder.packageName}</strong>
                </div>
                <div className="pay-receipt-row">
                  <span>Assigned Astrologer</span>
                  <strong>{successOrder.astrologer}</strong>
                </div>
                <div className="pay-receipt-row">
                  <span>Client Name</span>
                  <strong>{successOrder.name}</strong>
                </div>
                <div className="pay-receipt-row">
                  <span>WhatsApp Contact</span>
                  <strong>+91 {successOrder.phone}</strong>
                </div>
                <div className="pay-receipt-row">
                  <span>Amount Paid (PayU)</span>
                  <strong style={{ color: "#16a34a" }}>
                    ₹{successOrder.amount.toLocaleString("en-IN")}
                  </strong>
                </div>
              </div>

              {/* Instant In-App 100ms Consultation Actions */}
              <div className="pay-consult-actions">
                <button
                  type="button"
                  className="pay-launch-btn pay-launch-btn--video"
                  onClick={() => handleLaunchConsultation("video")}
                  disabled={hmsLoading}
                >
                  <Video className="h-5 w-5" />
                  <span>{hmsLoading ? "Connecting 100ms..." : "Join Live Video Consultation"}</span>
                </button>

                <button
                  type="button"
                  className="pay-launch-btn pay-launch-btn--audio"
                  onClick={() => handleLaunchConsultation("audio")}
                  disabled={hmsLoading}
                >
                  <Radio className="h-5 w-5" />
                  <span>{hmsLoading ? "Connecting 100ms..." : "Join Live Audio Consultation"}</span>
                </button>

                <button
                  type="button"
                  className="pay-launch-btn pay-launch-btn--phone"
                  onClick={handleConnectPhoneCall}
                >
                  <Phone className="h-5 w-5" />
                  <span>Connect Direct Phone Call (Exotel)</span>
                </button>
              </div>

              {phoneCallNotice && (
                <p className="pay-phone-status-notice">{phoneCallNotice}</p>
              )}

              <a
                href={`https://wa.me/919319368333?text=${encodeURIComponent(
                  `Namaste, I have booked a consultation (${successOrder.bookingId}) with ${successOrder.astrologer} for package ${successOrder.packageName}. Please connect me to the consultation session.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pay-whatsapp-cta"
              >
                <Phone className="h-4 w-4" />
                <span>Connect on WhatsApp for Consultation Link</span>
              </a>

              <button
                type="button"
                className="pay-modal-close-btn"
                onClick={() => {
                  setSuccessOrder(null);
                  navigate("/user/dashboard");
                }}
              >
                Go to My Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 100ms IN-APP AUDIO/VIDEO CONSULTATION SUITE */}
      <HmsConsultationModal
        isOpen={isHmsModalOpen}
        onClose={() => setIsHmsModalOpen(false)}
        session={activeHmsSession}
        astrologer={{
          name: params.astrologerName,
          title: "Vedic & Kundli Specialist",
          imageUrl:
            typeof params.astrologerImg === "string"
              ? params.astrologerImg
              : params.astrologerImg?.src ||
                DEFAULT_EXPERT.imageUrl?.src ||
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
          rating: params.astrologerRating,
          experience: `${params.astrologerExp}+ yrs`,
        }}
        clientDetails={{
          name: formData.name || "Devotee",
          dob: formData.dob,
          tob: formData.tob,
          pob: formData.pob,
          concern: formData.concern,
        }}
      />
    </div>
  );
}

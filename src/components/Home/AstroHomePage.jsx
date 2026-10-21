"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@/lib/router";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Gem,
  Globe,
  Heart,
  Lock,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  User,
  Users,
  Wallet,
  ChevronDown,
} from "lucide-react";
import { useConnectModal } from "../../contexts/ConnectModalContext";
import AstroFaqSection from "./AstroFaqSection";
import blogsData from "../../data/blogsData";
import AnkitImg from "../../assets/AnkitImg.svg";
import MeeraImg from "../../assets/MeeraImg.svg";
import NeerajImg from "../../assets/NeerajImg.svg";
import RishikaImg from "../../assets/Srinita_testimonial.jpg";
import heroVideo from "../../assets/videos/short_video.mp4";
import numerologyVideo from "../../assets/videos/video4.mp4";
import matchVideo from "../../assets/videos/video9.mp4";
import kundliVideo from "../../assets/videos/video2.mp4";
import tarotVideo from "../../assets/videos/video10.mp4";
import AppDownloadBanner from "../../assets/background_banner/app_download_banner.svg";
import LeftMandala from "../../assets/background_banner/Left mandala.png";
import RightMandala from "../../assets/background_banner/Right mandala.png";
import FreeKundliLogo from "../../assets/home_services/Free-kundli.png";
import AppleLogoPng from "../../assets/logo/apple_logo.png";
import PlayStoreLogoPng from "../../assets/logo/playstore_logo.png";
import DailyHoroscopeLogo from "../../assets/home_services/Daily-Horoscope.png";
import TarotReadingLogo from "../../assets/home_services/tarot-reading.png";
import NumerologyLogo from "../../assets/home_services/Numerology.png";
import VastuLogo from "../../assets/home_services/Vastu.png";
import CrystalHealingLogo from "../../assets/home_services/crystal-healing.png";
import LoveCategoryIcon from "../../assets/home/Love 2.svg";
import MarriageCategoryIcon from "../../assets/home/Marriage 2.svg";
import CareerCategoryIcon from "../../assets/home/career 2.svg";
import MoneyCategoryIcon from "../../assets/home/Money 2.svg";
import EducationCategoryIcon from "../../assets/home/education 2.svg";
import FamilyCategoryIcon from "../../assets/home/family 2.svg";
import AriesLogo from "../../assets/logo/aries_logo.svg";
import TaurusLogo from "../../assets/logo/taurus_logo.svg";
import GeminiLogo from "../../assets/logo/gemini_logo.svg";
import CancerLogo from "../../assets/logo/cancer_logo.svg";
import LeoLogo from "../../assets/logo/leo_logo.svg";
import VirgoLogo from "../../assets/logo/virgo_logo.svg";
import LibraLogo from "../../assets/logo/libra_logo.svg";
import ScorpioLogo from "../../assets/logo/scorpio_logo.svg";
import SagittariusLogo from "../../assets/logo/sagittarius_logo.svg";
import CapricornLogo from "../../assets/logo/capricorn_logo.svg";
import AquariusLogo from "../../assets/logo/aquarius_logo.svg";
import PiscesLogo from "../../assets/logo/pisces_logo.svg";
import CustomerVideosSection from "./CustomerVideosSection";
import ServiceDeckSection from "./ServiceDeckSection";
import ProductCard from "../Store/ProductCard";
import { getProductBySlug } from "../../data/storeData";
import capricornHover from "../../assets/products/capricorn-hover.jpg";
import mukhiHover from "../../assets/products/mukhi-hover.jpg";
import amethystHover from "../../assets/products/amethyst-hover.jpg";
import pyramidHover from "../../assets/products/pyramid-hover.jpg";

const API_BASE =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL || "http://localhost:9001/api";

const BEST_SELLER_HOVER = {
  "capricorn-zodiac-bracelet": capricornHover,
  "7-mukhi-rudraksha": mukhiHover,
  "amethyst-crystal": amethystHover,
  "money-wealth-pyramid": pyramidHover,
};

const BEST_SELLERS = [
  "capricorn-zodiac-bracelet",
  "7-mukhi-rudraksha",
  "amethyst-crystal",
  "money-wealth-pyramid",
]
  .map((slug) => {
    const product = getProductBySlug(slug);
    return product ? { ...product, hoverImage: BEST_SELLER_HOVER[slug] } : null;
  })
  .filter(Boolean);

const ASTROLOGERS = [
  {
    name: "Acharya Prem",
    expertise: ["Vedic", "Numerology"],
    languages: "English · Hindi",
    exp: "18 yrs",
    rating: "5.0",
    reviews: "12k+",
    price: "₹499",
    session: "30 min",
    about: "A birth-chart and numerology reading, talked through in plain language.",
    badge: "Celebrity",
    img: AnkitImg,
  },
  {
    name: "Meera Sharma",
    expertise: ["Tarot", "Psychic"],
    languages: "English · Hindi",
    exp: "14 yrs",
    rating: "4.9",
    reviews: "9k+",
    price: "₹399",
    session: "30 min",
    about: "A tarot session when you want another way to look at a decision.",
    badge: "Top Choice",
    img: MeeraImg,
  },
  {
    name: "Pt. Raghav",
    expertise: ["Vedic", "Vastu"],
    languages: "Hindi · English",
    exp: "22 yrs",
    rating: "5.0",
    reviews: "20k+",
    price: "₹599",
    session: "30 min",
    about: "Vedic chart reading and vastu for the home you already live in.",
    badge: "Celebrity",
    img: NeerajImg,
  },
  {
    name: "Rishika Sen",
    expertise: ["Tarot", "Life Coach"],
    languages: "English · Hindi",
    exp: "11 yrs",
    rating: "4.9",
    reviews: "7k+",
    price: "₹349",
    session: "30 min",
    about: "Tarot and a conversation about the next step you are considering.",
    badge: "Rising Star",
    img: RishikaImg,
  },
];

const CATEGORIES = [
  { title: "Love & Relationships", count: "120+ experts", img: LoveCategoryIcon },
  { title: "Marriage & Compatibility", count: "95+ experts", img: MarriageCategoryIcon },
  { title: "Career Decisions", count: "80+ experts", img: CareerCategoryIcon },
  { title: "Money & Wellbeing", count: "70+ experts", img: MoneyCategoryIcon },
  { title: "Education & Growth", count: "45+ experts", img: EducationCategoryIcon },
  { title: "Family & Personal Life", count: "60+ experts", img: FamilyCategoryIcon },
];

const TRUST_BADGES = [
  { title: "Authentic & Pure", desc: "Chosen With Care", icon: ShieldCheck },
  { title: "Secure Payments", desc: "100% Safe Checkout", icon: Lock },
  { title: "Fast & Reliable Delivery", desc: "Delivered Across India", icon: Truck },
  { title: "Trusted By Thousands", desc: "4.8+ Average Rating", icon: Users },
];

const SERVICE_TILES = [
  {
    title: "Free Kundli",
    desc: "Understand Your Birth Chart And Get A Personalised View Of Your Life.",
    img: FreeKundliLogo,
    path: "/calculator",
  },
  {
    title: "Daily Horoscope",
    desc: "Start Your Day With Simple Guidance For What May Lie Ahead.",
    img: DailyHoroscopeLogo,
    path: "/pricing?flow=consult&service=daily-horoscope",
  },
  {
    title: "Tarot Reading",
    desc: "Get A Fresh Perspective When You’re Looking For Clarity.",
    img: TarotReadingLogo,
    path: "/pricing?flow=consult&service=tarot",
  },
  {
    title: "Numerology",
    desc: "Discover What Your Numbers Can Tell You About Your Journey.",
    img: NumerologyLogo,
    path: "/pricing?flow=consult&service=numerology",
  },
  {
    title: "Vastu",
    desc: "Create A Home That Feels Balanced, Comfortable, And Positive.",
    img: VastuLogo,
    path: "/pricing?flow=consult&service=vastu",
  },
  {
    title: "Crystal Healing",
    desc: "Bring A Little More Calm And Balance Into Your Everyday Life.",
    img: CrystalHealingLogo,
    path: "/pricing?flow=consult&service=crystal-healing",
  },
];

const ZODIAC = [
  {
    name: "Aries",
    logo: AriesLogo,
    blurb: "Bold, energetic, and driven. Today brings fresh momentum and opportunities to take the lead.",
    scores: { love: 50, career: 85, marriage: 62, finance: 78 },
  },
  {
    name: "Taurus",
    logo: TaurusLogo,
    blurb: "Steady and grounded. Focus on comfort, patience, and one meaningful goal that builds lasting value.",
    scores: { love: 72, career: 60, marriage: 80, finance: 70 },
  },
  {
    name: "Gemini",
    logo: GeminiLogo,
    blurb: "Curious energy opens doors. Conversations spark clarity—share ideas and stay flexible with plans.",
    scores: { love: 65, career: 88, marriage: 55, finance: 58 },
  },
  {
    name: "Cancer",
    logo: CancerLogo,
    blurb: "Emotional intuition is strong. Nurture close bonds and protect your peace with gentle boundaries.",
    scores: { love: 82, career: 54, marriage: 76, finance: 63 },
  },
  {
    name: "Leo",
    logo: LeoLogo,
    blurb: "Confidence shines today. Lead with warmth, celebrate progress, and let your creativity take center stage.",
    scores: { love: 78, career: 90, marriage: 68, finance: 74 },
  },
  {
    name: "Virgo",
    logo: VirgoLogo,
    blurb: "Detail brings results. Organize priorities, refine routines, and trust careful steps over rush.",
    scores: { love: 58, career: 86, marriage: 70, finance: 81 },
  },
  {
    name: "Libra",
    logo: LibraLogo,
    blurb: "Balance and beauty guide you. Seek harmony in relationships and choose fairness in every decision.",
    scores: { love: 84, career: 66, marriage: 88, finance: 60 },
  },
  {
    name: "Scorpio",
    logo: ScorpioLogo,
    blurb: "Depth and focus intensify. Transform one lingering issue and trust your instinct on hidden truths.",
    scores: { love: 70, career: 75, marriage: 64, finance: 82 },
  },
  {
    name: "Sagittarius",
    logo: SagittariusLogo,
    blurb: "Adventure calls. Expand your view, say yes to learning, and keep optimism as your compass.",
    scores: { love: 67, career: 79, marriage: 58, finance: 69 },
  },
  {
    name: "Capricorn",
    logo: CapricornLogo,
    blurb: "Discipline pays off. Climb steadily, honor commitments, and build toward a long-term win.",
    scores: { love: 55, career: 92, marriage: 72, finance: 88 },
  },
  {
    name: "Aquarius",
    logo: AquariusLogo,
    blurb: "Fresh ideas flow freely. Innovate with community in mind and welcome unexpected allies.",
    scores: { love: 61, career: 84, marriage: 57, finance: 73 },
  },
  {
    name: "Pisces",
    logo: PiscesLogo,
    blurb: "Dreams feel vivid. Soften into intuition, create space for rest, and let compassion lead.",
    scores: { love: 86, career: 52, marriage: 79, finance: 56 },
  },
];

const SCORE_META = [
  { key: "love", label: "Love", icon: Heart },
  { key: "career", label: "Career", icon: Briefcase },
  { key: "marriage", label: "Marriage", icon: Gem },
  { key: "finance", label: "Finance", icon: Wallet },
];

const ACTIVITY = [
  "Priya from Mumbai just started a chat with Acharya Prem",
  "Rahul from Delhi booked a Vastu consultation",
  "Neha from Hyderabad got her Kundli read",
  "Amit from Pune consulted about career",
  "Sneha from Bangalore received a tarot reading",
];

function SectionHeading({ eyebrow, title, subtitle, action }) {
  return (
    <div className="astro-section-head">
      <div>
        {eyebrow ? <p className="astro-eyebrow">{eyebrow}</p> : null}
        <h2 className="astro-title">{title}</h2>
        {subtitle ? <p className="astro-subtitle">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export default function AstroHomePage() {
  const { openModal } = useConnectModal();
  const heroVideoRef = useRef(null);
  const [activeZodiac, setActiveZodiac] = useState(0);
  const [zodiacCards, setZodiacCards] = useState(ZODIAC);
  const [activityIdx, setActivityIdx] = useState(0);
  const [numerologyForm, setNumerologyForm] = useState({ name: "", dob: "" });
  const [matchMakingForm, setMatchMakingForm] = useState({ name: "", partnerName: "" });
  const [kundliForm, setKundliForm] = useState({
    name: "",
    dob: "",
    tob: "",
    place: "",
  });
  const [tarotForm, setTarotForm] = useState({ name: "", question: "" });
  const [numerologyLoading, setNumerologyLoading] = useState(false);
  const [matchMakingLoading, setMatchMakingLoading] = useState(false);
  const [kundliLoading, setKundliLoading] = useState(false);
  const [tarotLoading, setTarotLoading] = useState(false);
  const [numerologyResult, setNumerologyResult] = useState(null);
  const [matchMakingResult, setMatchMakingResult] = useState(null);
  const [kundliResult, setKundliResult] = useState(null);
  const [tarotResult, setTarotResult] = useState(null);
  const [numerologyError, setNumerologyError] = useState(null);
  const [matchMakingError, setMatchMakingError] = useState(null);
  const [kundliError, setKundliError] = useState(null);
  const [tarotError, setTarotError] = useState(null);
  const blogs = useMemo(() => blogsData.slice(0, 4), []);

  const goPrevZodiac = () => {
    setActiveZodiac((i) => (i - 1 + zodiacCards.length) % zodiacCards.length);
  };

  const goNextZodiac = () => {
    setActiveZodiac((i) => (i + 1) % zodiacCards.length);
  };

  const visibleZodiac = useMemo(() => {
    const total = zodiacCards.length;
    return [-2, -1, 0, 1, 2].map((offset) => {
      const index = (activeZodiac + offset + total) % total;
      return { ...zodiacCards[index], index, offset };
    });
  }, [activeZodiac, zodiacCards]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches && heroVideoRef.current) heroVideoRef.current.pause();
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setActivityIdx((i) => (i + 1) % ACTIVITY.length);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadHoroscopes = async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 20000);
      try {
        const response = await fetch(`${API_BASE}/ai/horoscope/daily`, {
          signal: controller.signal,
        });
        if (!response.ok) return;
        const payload = await response.json();
        if (cancelled || !payload?.success || !Array.isArray(payload.data)) return;

        setZodiacCards((prev) =>
          prev.map((card) => {
            const hit = payload.data.find((item) => item.name === card.name);
            if (!hit) return card;
            return {
              ...card,
              blurb: hit.blurb || card.blurb,
              scores: hit.scores || card.scores,
            };
          })
        );
      } catch {
        /* keep static ZODIAC fallback */
      } finally {
        clearTimeout(timer);
      }
    };

    loadHoroscopes();
    return () => {
      cancelled = true;
    };
  }, []);

  const submitNumerology = async (e) => {
    e.preventDefault();
    setNumerologyError(null);
    setNumerologyResult(null);
    setNumerologyLoading(true);
    try {
      const response = await fetch(`${API_BASE}/ai/numerology/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(numerologyForm),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(payload?.message || "Could not generate numerology report.");
      }
      setNumerologyResult(payload.data);
    } catch (err) {
      setNumerologyError(err.message || "Something went wrong. Please try again.");
    } finally {
      setNumerologyLoading(false);
    }
  };

  const submitMatchMaking = async (e) => {
    e.preventDefault();
    setMatchMakingError(null);
    setMatchMakingResult(null);
    setMatchMakingLoading(true);
    try {
      const response = await fetch(`${API_BASE}/ai/matchmaking/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(matchMakingForm),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(payload?.message || "Could not generate compatibility report.");
      }
      setMatchMakingResult(payload.data);
    } catch (err) {
      setMatchMakingError(err.message || "Something went wrong. Please try again.");
    } finally {
      setMatchMakingLoading(false);
    }
  };

  const submitTarot = async (e) => {
    e.preventDefault();
    setTarotError(null);
    setTarotResult(null);
    setTarotLoading(true);
    try {
      const response = await fetch(`${API_BASE}/ai/tarot/reading`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tarotForm),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(payload?.message || "Could not generate tarot reading.");
      }
      setTarotResult(payload.data);
    } catch (err) {
      setTarotError(err.message || "Something went wrong. Please try again.");
    } finally {
      setTarotLoading(false);
    }
  };

  const submitKundli = async (e) => {
    e.preventDefault();
    setKundliError(null);
    setKundliResult(null);
    setKundliLoading(true);
    try {
      const response = await fetch(`${API_BASE}/ai/kundli/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(kundliForm),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(payload?.message || "Could not submit Kundli consultation.");
      }
      setKundliResult(payload.data);
    } catch (err) {
      setKundliError(err.message || "Something went wrong. Please try again.");
    } finally {
      setKundliLoading(false);
    }
  };

  return (
    <div className="astro-home">
      {/* HERO — Figma-style banner */}
      <section className="astro-hero">
        <div className="astro-hero-banner">
          <video
            ref={heroVideoRef}
            className="astro-hero-banner__video"
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
          <div className="astro-hero-banner__scrim" />
          <div className="astro-hero-banner__overlay">
            <div className="astro-hero__copy">
              <p className="astro-live-pill">
                <span className="astro-live-dot" />
                Live now · Experts online
              </p>
              <h1>
                India’s Most Trusted
                <br />
                <span>
                  Astrology &amp; Healin
                  <span className="astro-hero__g">g</span>
                </span>{" "}
                Platform
              </h1>
              <ul className="astro-hero__bullets">
                <li>Personalised Kundli &amp; Life Guidance</li>
                <li>Trusted Guidance From Verified Astrologers</li>
                <li>Astrology, Vastu, Tarot &amp; Healing</li>
                <li>Connect With An Expert Via Chat, Call, Or Video</li>
              </ul>
              <div className="astro-hero__actions">
                <Link to="/pricing?flow=consult&service=consult" className="astro-btn-primary" style={{ textDecoration: "none" }}>
                  Consult with an Expert
                </Link>
                <Link to="/calculator" className="astro-btn-ghost astro-btn-ghost--on-banner">
                  Get Your Free Kundli
                </Link>
              </div>
              <div className="astro-activity" key={activityIdx}>
                <Sparkles className="h-4 w-4 text-[#E74660]" />
                <span>{ACTIVITY[activityIdx]}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP — premium floating card */}
      <div className="astro-stats" aria-label="Platform highlights">
        <div className="astro-stat">
          <span className="astro-stat__icon"><BadgeCheck className="h-5 w-5" /></span>
          <strong className="astro-stat__number">1,000+</strong>
          <span className="astro-stat__label">Verified Astrologers</span>
        </div>
        <div className="astro-stat__divider" aria-hidden="true" />
        <div className="astro-stat">
          <span className="astro-stat__icon"><Globe className="h-5 w-5" /></span>
          <strong className="astro-stat__number">10+</strong>
          <span className="astro-stat__label">Countries</span>
        </div>
        <div className="astro-stat__divider" aria-hidden="true" />
        <div className="astro-stat">
          <span className="astro-stat__icon"><Users className="h-5 w-5" /></span>
          <strong className="astro-stat__number">10,000+</strong>
          <span className="astro-stat__label">Users Guided</span>
        </div>
        <div className="astro-stat__divider" aria-hidden="true" />
        <div className="astro-stat">
          <span className="astro-stat__icon"><Star className="h-5 w-5" /></span>
          <strong className="astro-stat__number">4.8 ★</strong>
          <span className="astro-stat__label">Average Rating</span>
        </div>
      </div>

      {/* TRUST BAR + OUR SERVICES — Figma rounded cards */}
      <section className="astro-services-section">
        <div className="astro-section astro-services-section__inner">
          <div className="astro-trust-bar">
            {TRUST_BADGES.map(({ title, desc, icon: Icon }) => (
              <div key={title} className="astro-trust-item">
                <span className="astro-trust-item__icon" aria-hidden="true">
                  <Icon strokeWidth={1.75} />
                </span>
                <div className="astro-trust-item__text">
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="astro-guidance-block">
            <SectionHeading
              eyebrow="Guidance"
              title="Consult The Right Astrologer For You"
              subtitle="Browse by the life area you want clarity on."
            />
            <div className="astro-category-grid">
              {CATEGORIES.map(({ title, count, img }) => (
                <button key={title} type="button" className="astro-category" onClick={openModal}>
                  <span className="astro-category__icon">
                    <img src={img} alt="" />
                  </span>
                  <span className="astro-category__text">
                    <strong>{title}</strong>
                    <em>{count}</em>
                  </span>
                  <ChevronRight className="astro-category__chevron" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <div className="astro-experts">
            <SectionHeading
              eyebrow="Consult"
              title="Connect with India’s Trusted Astrologers"
              subtitle="Get personalised guidance from verified Astrologers who bring experience, clarity, and a caring approach to every consultation."
              action={
                <Link to="/talk-to-astrologers" className="astro-link">
                  View all <ArrowRight className="h-4 w-4" />
                </Link>
              }
            />
            <div className="astro-astro-grid">
              {ASTROLOGERS.map((a) => (
                <div key={a.name} className="astro-flip" tabIndex={0} aria-label={`${a.name}, ${a.expertise.join(", ")}`}>
                  <div className="astro-flip__inner">
                    <div className="astro-flip__face astro-flip__front">
                      <img src={a.img} alt="" />
                      <div className="astro-flip__marks">
                        {a.expertise.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="astro-flip__face astro-flip__back">
                      <div className="astro-flip__head">
                        <img src={a.img} alt="" />
                        <div>
                          <div className="astro-card__name">
                            {a.name}
                            <BadgeCheck className="h-4 w-4 text-[#2D7351]" />
                          </div>
                          <span className="astro-badge">{a.badge}</span>
                        </div>
                      </div>
                      <p className="astro-flip__about">{a.about}</p>
                      <div className="astro-flip__stats">
                        <div>
                          <strong>{a.exp}</strong>
                          <span>Experience</span>
                        </div>
                        <div>
                          <strong>★ {a.rating}</strong>
                          <span>Rating</span>
                        </div>
                        <div>
                          <strong>{a.reviews}</strong>
                          <span>Reviews</span>
                        </div>
                      </div>
                      <p className="astro-flip__line">
                        <span>Languages</span>
                        {a.languages}
                      </p>
                      <div className="astro-tags">
                        {a.expertise.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      <div className="astro-card__footer">
                        <div className="astro-flip__price">
                          <strong>{a.price}</strong>
                          <span>/ {a.session}</span>
                        </div>
                        <div className="astro-card__btns">
                          <button type="button" onClick={openModal}>
                            <MessageCircle className="h-4 w-4" /> Chat
                          </button>
                          <button type="button" className="is-call" onClick={openModal}>
                            <Phone className="h-4 w-4" /> Call
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="astro-services-head">
            <p className="astro-services-eyebrow">Our Services</p>
            <h2>Guidance For Every Part Of Your Journey</h2>
            <p className="astro-services-sub">
              Personalised Guidance For Your Journey, From Kundli And Astrology To Tarot, Vastu,
              And Healing.
            </p>
          </div>

          <div className="astro-service-row">
            {SERVICE_TILES.map((s) => (
              <Link key={s.title} to={s.path} className="astro-service-card">
                <span className="astro-service-card__icon">
                  <img src={s.img} alt="" />
                </span>
                <strong className="astro-service-card__title">{s.title}</strong>
                <em className="astro-service-card__desc">{s.desc}</em>
                <span className="astro-service-card__arrow" aria-hidden="true">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>

          <div className="astro-services-cta">
            <Link to="/services" className="astro-services-cta__btn">
              View All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <ServiceDeckSection />

      {/* DAILY HOROSCOPE — Figma carousel */}
      <section id="daily-horoscope" className="astro-horoscope-section">
        <img
          className="astro-horoscope-mandala astro-horoscope-mandala--left"
          src={LeftMandala}
          alt=""
          aria-hidden="true"
        />
        <img
          className="astro-horoscope-mandala astro-horoscope-mandala--right"
          src={RightMandala}
          alt=""
          aria-hidden="true"
        />
        <div className="astro-section">
          <div className="astro-horoscope-head">
            <p>Daily Horoscope</p>
            <h2>Your Cosmic Guidance For Today</h2>
          </div>

          <div className="astro-horoscope-carousel">
            <button
              type="button"
              className="astro-horoscope-nav"
              onClick={goPrevZodiac}
              aria-label="Previous zodiac"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="astro-horoscope-track">
              {visibleZodiac.map((z) => (
                <article
                  key={`${z.name}-${z.offset}`}
                  className={`astro-horoscope-card is-offset-${Math.abs(z.offset)} ${
                    z.offset === 0 ? "is-active" : ""
                  } ${z.offset < 0 ? "is-left" : ""} ${z.offset > 0 ? "is-right" : ""}`}
                  onClick={() => setActiveZodiac(z.index)}
                >
                  <div className="astro-horoscope-card__logo">
                    <img src={z.logo} alt="" />
                  </div>
                  <h3>{z.name}</h3>
                  <p>{z.blurb}</p>
                  <div className="astro-horoscope-scores">
                    {SCORE_META.map(({ key, label, icon: Icon }) => (
                      <div key={key} className="astro-horoscope-score">
                        <span className="astro-horoscope-score__label">
                          <Icon className="h-3.5 w-3.5" />
                          {label}
                        </span>
                        <span className="astro-horoscope-score__bar">
                          <i style={{ width: `${z.scores[key]}%` }} />
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              className="astro-horoscope-nav"
              onClick={goNextZodiac}
              aria-label="Next zodiac"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="astro-horoscope-dots" role="tablist" aria-label="Zodiac signs">
            {zodiacCards.map((z, idx) => (
              <button
                key={z.name}
                type="button"
                className={idx === activeZodiac ? "is-active" : ""}
                aria-label={z.name}
                aria-selected={idx === activeZodiac}
                onClick={() => setActiveZodiac(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FREE NUMEROLOGY REPORT — Figma banner */}
      <section className="astro-promo-banner astro-promo-banner--video">
        <video
          className="astro-promo-banner__video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src={numerologyVideo} type="video/mp4" />
        </video>
        <div className="astro-promo-banner__scrim" aria-hidden="true" />
        <div className="astro-section astro-promo-banner__inner">
          <div className="astro-promo-banner__copy">
            <p className="astro-promo-banner__eyebrow">Free Numerology Report</p>
            <h2>
              Understand What Your
              <br />
              Numbers Say About You
            </h2>
            <p className="astro-promo-banner__sub">
              Get a personalised look at your personality, strengths and life path with a free
              numerology report.
            </p>

            <form className="astro-promo-banner__form" onSubmit={submitNumerology}>
              <label className="astro-promo-field">
                <User className="h-4 w-4" aria-hidden="true" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={numerologyForm.name}
                  onChange={(e) =>
                    setNumerologyForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </label>
              <label className="astro-promo-field">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <input
                  type="date"
                  name="dob"
                  placeholder="Date of Birth"
                  value={numerologyForm.dob}
                  onChange={(e) =>
                    setNumerologyForm((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  required
                />
              </label>
              <button
                type="submit"
                className="astro-promo-banner__btn"
                disabled={numerologyLoading}
              >
                {numerologyLoading ? "Generating..." : "Get Your Free Report"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            {numerologyError ? (
              <p className="astro-promo-banner__status is-error">{numerologyError}</p>
            ) : null}
            {numerologyResult ? (
              <div className="astro-promo-banner__status is-success astro-ai-brief">
                <p className="astro-ai-brief__eyebrow">
                  <strong>Life Path {numerologyResult.lifePathNumber}</strong>
                  {numerologyResult.sunSign ? ` · ${numerologyResult.sunSign}` : ""}
                  {numerologyResult.nameNumber
                    ? ` · Name No. ${numerologyResult.nameNumber}`
                    : ""}
                </p>
                {numerologyResult.summary ? <p>{numerologyResult.summary}</p> : null}
                {numerologyResult.personality ? (
                  <div className="astro-ai-brief__block">
                    <h4>Personality</h4>
                    <p>{numerologyResult.personality}</p>
                  </div>
                ) : null}
                {numerologyResult.lifePathInsight ? (
                  <div className="astro-ai-brief__block">
                    <h4>Life Path insight</h4>
                    <p>{numerologyResult.lifePathInsight}</p>
                  </div>
                ) : null}
                {numerologyResult.nameNumberInsight ? (
                  <div className="astro-ai-brief__block">
                    <h4>Name number</h4>
                    <p>{numerologyResult.nameNumberInsight}</p>
                  </div>
                ) : null}
                {Array.isArray(numerologyResult.strengths) &&
                numerologyResult.strengths.length ? (
                  <div className="astro-ai-brief__block">
                    <h4>Strengths</h4>
                    <ul>
                      {numerologyResult.strengths.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {Array.isArray(numerologyResult.growthAreas) &&
                numerologyResult.growthAreas.length ? (
                  <div className="astro-ai-brief__block">
                    <h4>Growth areas</h4>
                    <ul>
                      {numerologyResult.growthAreas.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {numerologyResult.careerMoney ? (
                  <div className="astro-ai-brief__block">
                    <h4>Career &amp; money</h4>
                    <p>{numerologyResult.careerMoney}</p>
                  </div>
                ) : null}
                {numerologyResult.relationships ? (
                  <div className="astro-ai-brief__block">
                    <h4>Relationships</h4>
                    <p>{numerologyResult.relationships}</p>
                  </div>
                ) : null}
                {numerologyResult.focusToday ? (
                  <div className="astro-ai-brief__block">
                    <h4>Focus today</h4>
                    <p>{numerologyResult.focusToday}</p>
                  </div>
                ) : null}
                {numerologyResult.luckyTips ? (
                  <div className="astro-ai-brief__block">
                    <h4>Lucky tips</h4>
                    <p>{numerologyResult.luckyTips}</p>
                  </div>
                ) : null}
                <button type="button" className="astro-promo-banner__link" onClick={openModal}>
                  Talk to an expert
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* FREE MATCH MAKING — Figma banner */}
      <section className="astro-promo-banner astro-promo-banner--video">
        <video
          className="astro-promo-banner__video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src={matchVideo} type="video/mp4" />
        </video>
        <div className="astro-promo-banner__scrim astro-promo-banner__scrim--right" aria-hidden="true" />
        <div className="astro-section astro-promo-banner__inner astro-promo-banner__inner--right">
          <div className="astro-promo-banner__copy">
            <p className="astro-promo-banner__eyebrow">Free Matchmaking</p>
            <h2>
              Find Your Life
              <br />
              Partner
            </h2>
            <p className="astro-promo-banner__sub">
              Understand your compatibility through Vedic Astrology and explore the strengths of
              your relationship — completely free.
            </p>

            <form className="astro-promo-banner__form" onSubmit={submitMatchMaking}>
              <label className="astro-promo-field">
                <User className="h-4 w-4" aria-hidden="true" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={matchMakingForm.name}
                  onChange={(e) =>
                    setMatchMakingForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </label>
              <label className="astro-promo-field">
                <Users className="h-4 w-4" aria-hidden="true" />
                <input
                  type="text"
                  name="partnerName"
                  placeholder="Partner Name"
                  value={matchMakingForm.partnerName}
                  onChange={(e) =>
                    setMatchMakingForm((prev) => ({
                      ...prev,
                      partnerName: e.target.value,
                    }))
                  }
                  required
                />
              </label>
              <button
                type="submit"
                className="astro-promo-banner__btn"
                disabled={matchMakingLoading}
              >
                {matchMakingLoading ? "Checking..." : "Check Your Compatibility"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            {matchMakingError ? (
              <p className="astro-promo-banner__status is-error">{matchMakingError}</p>
            ) : null}
            {matchMakingResult ? (
              <div className="astro-promo-banner__status is-success astro-ai-brief">
                <p className="astro-ai-brief__eyebrow">
                  <strong>{matchMakingResult.score}% compatibility</strong> for{" "}
                  {matchMakingResult.name} &amp; {matchMakingResult.partnerName}
                </p>
                {matchMakingResult.summary ? <p>{matchMakingResult.summary}</p> : null}
                {matchMakingResult.emotionalBond ? (
                  <div className="astro-ai-brief__block">
                    <h4>Emotional bond</h4>
                    <p>{matchMakingResult.emotionalBond}</p>
                  </div>
                ) : null}
                {matchMakingResult.communication ? (
                  <div className="astro-ai-brief__block">
                    <h4>Communication</h4>
                    <p>{matchMakingResult.communication}</p>
                  </div>
                ) : null}
                {matchMakingResult.challenges ? (
                  <div className="astro-ai-brief__block">
                    <h4>Growth areas</h4>
                    <p>{matchMakingResult.challenges}</p>
                  </div>
                ) : null}
                {Array.isArray(matchMakingResult.strengths) &&
                matchMakingResult.strengths.length ? (
                  <div className="astro-ai-brief__block">
                    <h4>Relationship strengths</h4>
                    <ul>
                      {matchMakingResult.strengths.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {matchMakingResult.advice ? (
                  <div className="astro-ai-brief__block">
                    <h4>Advice</h4>
                    <p>{matchMakingResult.advice}</p>
                  </div>
                ) : null}
                {matchMakingResult.nextStep ? (
                  <div className="astro-ai-brief__block">
                    <h4>Next step</h4>
                    <p>{matchMakingResult.nextStep}</p>
                  </div>
                ) : null}
                <button type="button" className="astro-promo-banner__link" onClick={openModal}>
                  Talk to an expert
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* FULL KUNDLI CONSULTATION — Figma banner */}
      <section className="astro-promo-banner astro-promo-banner--video">
        <video
          className="astro-promo-banner__video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src={kundliVideo} type="video/mp4" />
        </video>
        <div className="astro-promo-banner__scrim" aria-hidden="true" />
        <div className="astro-section astro-promo-banner__inner">
          <div className="astro-promo-banner__copy astro-promo-banner__copy--wide">
            <p className="astro-promo-banner__eyebrow">Full Kundli Consultation</p>
            <h2>
              Full Kundli Consultation
              <br />
              at Just ₹499
            </h2>
            <p className="astro-promo-banner__sub">
              Get your detailed Kundli PDF along with a 30-minute live Q&amp;A session with an expert
              for personalised guidance and answers to your questions.
            </p>

            <form
              className="astro-promo-banner__form astro-promo-banner__form--kundli"
              onSubmit={(event) => event.preventDefault()}
            >
              <label className="astro-promo-field">
                <User className="h-4 w-4" aria-hidden="true" />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={kundliForm.name}
                  onChange={(e) =>
                    setKundliForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </label>
              <label className="astro-promo-field">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <input
                  type="date"
                  name="dob"
                  placeholder="Date of Birth"
                  value={kundliForm.dob}
                  onChange={(e) =>
                    setKundliForm((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  required
                />
              </label>
              <label className="astro-promo-field">
                <Clock className="h-4 w-4" aria-hidden="true" />
                <input
                  type="time"
                  name="tob"
                  placeholder="Time of Birth"
                  value={kundliForm.tob}
                  onChange={(e) =>
                    setKundliForm((prev) => ({ ...prev, tob: e.target.value }))
                  }
                  required
                />
              </label>
              <label className="astro-promo-field">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <input
                  type="text"
                  name="place"
                  placeholder="Place of Birth"
                  value={kundliForm.place}
                  onChange={(e) =>
                    setKundliForm((prev) => ({ ...prev, place: e.target.value }))
                  }
                  required
                />
              </label>
              <Link to="/pricing" className="astro-promo-banner__btn" style={{ textDecoration: "none" }}>
                Book Your Consultation Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </form>
            {kundliError ? (
              <p className="astro-promo-banner__status is-error">{kundliError}</p>
            ) : null}
            {kundliResult ? (
              <div className="astro-promo-banner__status is-success astro-ai-brief">
                <p className="astro-ai-brief__eyebrow">
                  <strong>{kundliResult.sunSign}</strong>
                  {kundliResult.lifePathNumber
                    ? ` · Life Path ${kundliResult.lifePathNumber}`
                    : ""}
                </p>
                {kundliResult.preview ? <p>{kundliResult.preview}</p> : null}
                {kundliResult.sunSignInsight ? (
                  <div className="astro-ai-brief__block">
                    <h4>Sun sign insight</h4>
                    <p>{kundliResult.sunSignInsight}</p>
                  </div>
                ) : null}
                {Array.isArray(kundliResult.whatYouGet) && kundliResult.whatYouGet.length ? (
                  <div className="astro-ai-brief__block">
                    <h4>What you get</h4>
                    <ul>
                      {kundliResult.whatYouGet.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {kundliResult.whyConsult ? (
                  <div className="astro-ai-brief__block">
                    <h4>Why this consult</h4>
                    <p>{kundliResult.whyConsult}</p>
                  </div>
                ) : null}
                <button type="button" className="astro-promo-banner__link" onClick={openModal}>
                  Share contact details
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* CHECK WHAT TAROT SAYS — right-aligned banner */}
      <section className="astro-promo-banner astro-promo-banner--video">
        <video
          className="astro-promo-banner__video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src={tarotVideo} type="video/mp4" />
        </video>
        <div className="astro-promo-banner__scrim astro-promo-banner__scrim--right" aria-hidden="true" />
        <div className="astro-section astro-promo-banner__inner astro-promo-banner__inner--right">
          <div className="astro-promo-banner__copy">
            <p className="astro-promo-banner__eyebrow">Free Tarot Reading</p>
            <h2>
              Check What Tarot
              <br />
              Says About You
            </h2>
            <p className="astro-promo-banner__sub">
              Ask the cards a question and receive a free personalised tarot
              reading — guidance from the universe, just for you.
            </p>

            <form className="astro-promo-banner__form" onSubmit={submitTarot}>
              <label className="astro-promo-field">
                <User className="h-4 w-4" aria-hidden="true" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={tarotForm.name}
                  onChange={(e) =>
                    setTarotForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </label>
              <label className="astro-promo-field astro-promo-field--wide">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <input
                  type="text"
                  name="question"
                  placeholder="What is your question for the cards?"
                  value={tarotForm.question}
                  onChange={(e) =>
                    setTarotForm((prev) => ({ ...prev, question: e.target.value }))
                  }
                  required
                />
              </label>
              <button
                type="submit"
                className="astro-promo-banner__btn"
                disabled={tarotLoading}
              >
                {tarotLoading ? "Reading the Cards..." : "Reveal My Tarot Reading"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            {tarotError ? (
              <p className="astro-promo-banner__status is-error">{tarotError}</p>
            ) : null}
            {tarotResult ? (
              <div className="astro-promo-banner__status is-success astro-ai-brief">
                {tarotResult.card ? (
                  <p className="astro-ai-brief__eyebrow">
                    <strong>{tarotResult.card}</strong>
                    {tarotResult.archetype ? ` · ${tarotResult.archetype}` : ""}
                  </p>
                ) : null}
                {tarotResult.message ? <p>{tarotResult.message}</p> : null}
                {tarotResult.guidance ? (
                  <div className="astro-ai-brief__block">
                    <h4>Guidance</h4>
                    <p>{tarotResult.guidance}</p>
                  </div>
                ) : null}
                {tarotResult.energy ? (
                  <div className="astro-ai-brief__block">
                    <h4>Energy around you</h4>
                    <p>{tarotResult.energy}</p>
                  </div>
                ) : null}
                {tarotResult.action ? (
                  <div className="astro-ai-brief__block">
                    <h4>Suggested action</h4>
                    <p>{tarotResult.action}</p>
                  </div>
                ) : null}
                {tarotResult.affirmation ? (
                  <div className="astro-ai-brief__block">
                    <h4>Affirmation</h4>
                    <p>{tarotResult.affirmation}</p>
                  </div>
                ) : null}
                <button type="button" className="astro-promo-banner__link" onClick={openModal}>
                  Talk to a Tarot Expert
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* DOWNLOAD TATHAASTU APP — Figma promo banner */}
      <section className="astro-app-download-banner">
        <img
          className="astro-app-download-banner__bg"
          src={AppDownloadBanner}
          alt=""
          aria-hidden="true"
        />
        <div className="astro-section astro-app-download-banner__inner">
          <div className="astro-app-download-banner__copy">
            <p className="astro-promo-banner__eyebrow">Tathaastu, Wherever You Go</p>
            <h2>
              Guidance for Every Moment,
              <br />
              Right at Your Fingertips
            </h2>
            <p>
              Check your Kundli, explore your daily horoscope, connect with astrologers, and get the
              guidance you need whenever you need it.
            </p>

            <div className="astro-app-download-banner__actions">
              <button type="button" className="astro-app-download-banner__cta" onClick={openModal}>
                Download The App Now
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="astro-app-download-banner__stores">
                <button type="button" className="astro-app-store-btn" onClick={openModal}>
                  <img src={AppleLogoPng} alt="Apple logo" className="astro-app-store-btn__icon" />
                  <span>
                    <small>Download on the</small>
                    <strong>App Store</strong>
                  </span>
                </button>
                <button type="button" className="astro-app-store-btn" onClick={openModal}>
                  <img src={PlayStoreLogoPng} alt="Google Play logo" className="astro-app-store-btn__icon" />
                  <span>
                    <small>Get it on</small>
                    <strong>Play Store</strong>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="astro-section astro-bestsellers">
        <SectionHeading
          eyebrow="Store"
          title="Our Best Seller Products"
          subtitle="Four pieces from the Abhimantrit store, ready to look at more closely."
          action={
            <Link to="/store" className="astro-link">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="store-grid">
          {BEST_SELLERS.map((product) => (
            <ProductCard key={product.id} product={product} imageSwap />
          ))}
        </div>
      </section>

      <section className="astro-section astro-founder" aria-labelledby="founder-heading">
        <div className="astro-founder__panel">
          <div className="astro-founder__copy">
            <p className="astro-eyebrow">About Co-founder</p>
            <p className="astro-founder__kicker">Meet Our Co-Founder</p>
            <h2 id="founder-heading">Dr. Priyanka Singh</h2>
            <p>
              With over 15 years of experience in astrology, Dr. Priyanka Singh has guided people
              through important questions about life, relationships, career, and personal growth. Her
              approach combines astrological knowledge with personalised guidance to help people
              understand their Kundli and explore a clearer path forward.
            </p>
            <p>
              At Tathaastu, we aim to make astrology and spiritual guidance more accessible, personal,
              and meaningful for everyone.
            </p>
            <div className="astro-founder__stats">
              <div>
                <strong>15+ Years</strong>
                <span>Of Astrology Practice</span>
              </div>
              <div>
                <strong>10,00,000+</strong>
                <span>People Guided</span>
              </div>
            </div>
          </div>
          <div className="astro-founder__photo" role="img" aria-label="Placeholder for Dr. Priyanka Singh’s photo">
            <User strokeWidth={1.25} />
            <span>Photo</span>
          </div>
        </div>
      </section>

      {/* CUSTOMER VIDEOS — horizontal strip above blogs */}
      <CustomerVideosSection />

      <section className="astro-clients-banner">
        <div className="astro-section astro-clients-banner__inner">
          <div className="astro-clients-banner__header">
            <p className="astro-promo-banner__eyebrow">Real Stories</p>
            <h2>What Our Clients Say</h2>
            <p>
              Hear from people who found the guidance, clarity, and support they were looking for
              with Tathaastu.
            </p>
          </div>

          <div className="astro-clients-grid">
            <article className="astro-client-card">
              <span className="astro-client-card__mark" aria-hidden="true">
                “
              </span>
              <p>
                The AI birth chart was scary-accurate. It explained things about my personality I
                hadn’t put into words.
              </p>
              <div className="astro-client-card__meta">
                <span className="astro-client-card__avatar">A</span>
                <div>
                  <strong>Ankit, 34</strong>
                  <small>Product Designer, Mumbai</small>
                </div>
              </div>
            </article>

            <article className="astro-client-card">
              <span className="astro-client-card__mark" aria-hidden="true">
                “
              </span>
              <p>
                We consulted Tathaastu for Vastu when we were renovating our home. The expert’s
                recommendations were simple yet powerful.
              </p>
              <div className="astro-client-card__meta">
                <span className="astro-client-card__avatar astro-client-card__avatar--green">M</span>
                <div>
                  <strong>Meera, 41</strong>
                  <small>Homemaker, Jaipur</small>
                </div>
              </div>
            </article>

            <article className="astro-client-card">
              <span className="astro-client-card__mark" aria-hidden="true">
                “
              </span>
              <p>
                The expert’s guidance felt so personal and practical. Every suggestion had a clear
                sense of timing and purpose.
              </p>
              <div className="astro-client-card__meta">
                <span className="astro-client-card__avatar astro-client-card__avatar--gold">N</span>
                <div>
                  <strong>Neeraj, 55</strong>
                  <small>Businessman, Udaipur</small>
                </div>
              </div>
            </article>

            <article className="astro-client-card">
              <span className="astro-client-card__mark" aria-hidden="true">
                “
              </span>
              <p>
                I tried Tathaastu’s astrology consultation out of curiosity, and it turned into one of
                the most grounded conversations I’ve had.
              </p>
              <div className="astro-client-card__meta">
                <span className="astro-client-card__avatar astro-client-card__avatar--rose">R</span>
                <div>
                  <strong>Rishika, 29</strong>
                  <small>Engineer, Bengaluru</small>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="astro-section astro-section--soft">
        <SectionHeading
          eyebrow="Learn"
          title="Explore Our Latest Blogs"
          action={
            <Link to="/blog" className="astro-link">
              View all blogs <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="astro-blog-grid">
          {blogs.map((b) => (
            <Link key={b.id} to={`/blog/${b.slug}`} className="astro-blog-card">
              <span className="astro-blog-card__media">
                <img src={b.image} alt="" />
                <span>{b.category}</span>
              </span>
              <span className="astro-blog-card__body">
                <h3>{b.title}</h3>
                <p>{b.excerpt}</p>
                <span className="astro-blog-card__foot">
                  <span>{b.date}</span>
                  <span>{b.readTime}</span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <AstroFaqSection />
    </div>
  );
}

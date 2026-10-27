"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@/lib/router";
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
  Compass,
  Sun,
  Award,
  CheckCircle2,
} from "lucide-react";
import dynamic from "next/dynamic";
import blogsData from "../../data/blogsData";
import harishankarImg from "../../assets/astrologer/harishnkar.jpg";
import anuradhaImg from "../../assets/astrologer/anuradha.jpg";
import hosalImg from "../../assets/astrologer/hosal.jpg";
import vibhutiImg from "../../assets/astrologer/vibhuti.jpg";
import upendraImg from "../../assets/astrologer/upendra.jpg";
import deepakImg from "../../assets/astrologer/deepak.jpg";
import duttImg from "../../assets/astrologer/dutt.jpg";
import drPriyankaImg from "../../assets/home/Priyanka Mam.svg";
import "./astro-home.css";
import "./astro-experts.css";
import "./astro-guidance.css";
import "../Store/store.css";
import numerologyReportImg from "../../assets/home/reports/Numerlogy Report.svg";
import kundliConsultationImg from "../../assets/home/reports/Kundli Consultation.svg";
import AppDownloadBanner from "../../assets/background_banner/app_download_banner.svg";
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
import ClientTestimonialCard from "./ClientTestimonialCard";
import ankitCustomer from "../../assets/customers/ankit.jpg";
import meeraCustomer from "../../assets/customers/meera.jpg";
import neerajCustomer from "../../assets/customers/neeraj.jpg";
import rishikaCustomer from "../../assets/customers/rishika.jpg";
import { getProductBySlug } from "../../data/storeData";
import capricornHover from "../../assets/products/capricorn-hover.jpg";
import mukhiHover from "../../assets/products/mukhi-hover.jpg";
import amethystHover from "../../assets/products/amethyst-hover.jpg";
import pyramidHover from "../../assets/products/pyramid-hover.jpg";
import LazyVideo from "../media/LazyVideo";

const heroVideo = "/videos/tathaastu_hero_banner_web_720p.mp4";
const matchVideo = "/videos/life-partner.mp4";

const sectionFallback = () => <div className="astro-section min-h-[12rem]" aria-hidden="true" />;

const AstroServicesSection = dynamic(() => import("./AstroServicesSection"), {
  loading: sectionFallback,
});
const ServiceDeckSection = dynamic(() => import("./ServiceDeckSection"), {
  loading: sectionFallback,
});
const DailyHoroscopeSection = dynamic(() => import("./DailyHoroscopeSection"), {
  loading: sectionFallback,
});
const VedicReportsSection = dynamic(() => import("./VedicReportsSection"), {
  loading: sectionFallback,
});
const FreeTarotSection = dynamic(() => import("./FreeTarotSection"), {
  loading: sectionFallback,
});
const CustomerVideosSection = dynamic(() => import("./CustomerVideosSection"), {
  loading: sectionFallback,
});
const AstroBlogSection = dynamic(() => import("./AstroBlogSection"), {
  loading: sectionFallback,
});
const AstroFaqSection = dynamic(() => import("./AstroFaqSection"), {
  loading: sectionFallback,
});
const ProductCard = dynamic(() => import("../Store/ProductCard"), {
  loading: () => null,
});

const CLIENT_TESTIMONIALS = [
  {
    id: "ankit",
    name: "Ankit",
    age: 34,
    role: "Product Designer",
    city: "Mumbai",
    service: "AI Birth Chart",
    rating: 5,
    photo: ankitCustomer,
    tagIcon: Sparkles,
    quote:
      "The AI birth chart was scary-accurate. It explained things about my personality and life patterns I hadn’t put into words.",
  },
  {
    id: "meera",
    name: "Meera",
    age: 41,
    role: "Homemaker",
    city: "Jaipur",
    service: "Vastu Consultation",
    rating: 5,
    photo: meeraCustomer,
    tagIcon: Compass,
    quote:
      "We consulted Tathaastu for Vastu when we were renovating our home. The expert’s recommendations were simple yet powerful.",
  },
  {
    id: "neeraj",
    name: "Neeraj",
    age: 55,
    role: "Businessman",
    city: "Udaipur",
    service: "Expert Consultation",
    rating: 5,
    photo: neerajCustomer,
    tagIcon: Sun,
    quote:
      "The expert’s guidance felt so personal and practical. Every suggestion had a clear sense of timing and purpose for my business.",
  },
  {
    id: "rishika",
    name: "Rishika",
    age: 29,
    role: "Software Engineer",
    city: "Bengaluru",
    service: "Kundli Astrology",
    rating: 5,
    photo: rishikaCustomer,
    tagIcon: ShieldCheck,
    quote:
      "I tried Tathaastu’s astrology consultation out of curiosity, and it turned into one of the most grounded conversations I’ve had.",
  },
];

const API_BASE =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL || "http://localhost:3032/api";

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
  "libra-zodiac-bracelet",
  "scorpio-zodiac-bracelet",
  "tigers-eye-stone",
  "green-aventurine",
  "lapis-lazuli",
  "clear-quartz-rudraksha-bracelet",
]
  .map((slug) => {
    const product = getProductBySlug(slug);
    return product ? { ...product, hoverImage: BEST_SELLER_HOVER[slug] } : null;
  })
  .filter(Boolean);

const ASTROLOGERS = [
  {
    id: "pameshwar-dutt",
    name: "Pameshwar Dutt",
    phone: "9120329906",
    expertise: ["Vedic", "Numerology", "Face Reading"],
    languages: "Hindi · English",
    exp: "11+ yrs",
    rating: "5.0",
    reviews: "10.2k+",
    about: "Harmonizing Vedic birth chart alignment with occult numerology to provide breakthrough solutions for wealth, health & relationships.",
    badge: "Vedic Numerologist",
    badgeType: "gold",
    online: true,
    repeatRate: "98%",
    img: duttImg,
  },
  {
    id: "vibhuti",
    name: "Dr. Vibhuti",
    phone: "7078473994",
    expertise: ["Vedic", "Face Reading", "Tarot"],
    languages: "English · Hindi",
    exp: "10+ yrs",
    rating: "4.9",
    reviews: "11.5k+",
    about: "Uniting Vedic astrology, intuitive Tarot & Face Reading to deliver 360-degree holistic life clarity and emotional healing.",
    badge: "Tarot & Face Reading",
    badgeType: "star",
    online: true,
    repeatRate: "96%",
    img: vibhutiImg,
  },
  {
    id: "upendra",
    name: "Acharya Upendra",
    phone: "8173807057",
    expertise: ["Vedic Astrology", "Kundli Analysis"],
    languages: "Hindi · English",
    exp: "8+ yrs",
    rating: "4.9",
    reviews: "8.5k+",
    about: "Decoding your cosmic blueprint with accurate Kundli analysis, transit impacts, and practical Vedic remedies for career & marriage.",
    badge: "Vedic Specialist",
    badgeType: "scholar",
    online: true,
    repeatRate: "97%",
    img: upendraImg,
  },
  {
    id: "deepak",
    name: "Pt. Deepak",
    phone: "9120329906",
    expertise: ["Vedic Astrology", "Kundli Milan"],
    languages: "Hindi · English",
    exp: "7+ yrs",
    rating: "4.9",
    reviews: "7.8k+",
    about: "Guiding you through turning points with precise Janam Kundli reading, match-making & effective planetary dosha remedies.",
    badge: "Kundli Expert",
    badgeType: "specialist",
    online: true,
    repeatRate: "95%",
    img: deepakImg,
  },
  {
    id: "harishankar",
    name: "Pt. Harishankar",
    phone: "8707748378",
    expertise: ["Vedic Astrology", "Face Reading"],
    languages: "Hindi · English",
    exp: "18+ yrs",
    rating: "5.0",
    reviews: "19.4k+",
    about: "Combining nearly two decades of Vedic mastery with the rare art of Face Reading for pinpoint life predictions and wealth remedies.",
    badge: "Face Reading Master",
    badgeType: "celebrity",
    online: true,
    repeatRate: "99%",
    img: harishankarImg,
  },
  {
    id: "hosal",
    name: "Pt. Hosal",
    phone: "9950421929",
    expertise: ["Vedic Astrology", "Dasha Predictions"],
    languages: "Hindi · English",
    exp: "10+ yrs",
    rating: "5.0",
    reviews: "12.2k+",
    about: "Illuminating your path with deep Kundli analysis, Dasha timing & authentic remedies for obstacles in career and business.",
    badge: "Gold Verified",
    badgeType: "top",
    online: true,
    repeatRate: "97%",
    img: hosalImg,
  },
  {
    id: "anuradha",
    name: "Acharya Anuradha",
    phone: "9044257411",
    expertise: ["Vedic", "Numerology", "Lo Shu Grid"],
    languages: "English · Hindi",
    exp: "12+ yrs",
    rating: "5.0",
    reviews: "14.6k+",
    about: "Blending Vedic wisdom, lucky number vibrations & Lo Shu Grid to align your destiny with success, career and marriage.",
    badge: "Celebrity Numerologist",
    badgeType: "gold",
    online: true,
    repeatRate: "98%",
    img: anuradhaImg,
  },
];

const CATEGORIES = [
  {
    title: "Love & Relationships",
    count: "280+ experts",
    img: LoveCategoryIcon,
    focus: "Breakups · Soulmates · Rekindling",
  },
  {
    title: "Marriage & Compatibility",
    count: "240+ experts",
    img: MarriageCategoryIcon,
    focus: "Kundli Milan · Delay · Manglik Dosha",
  },
  {
    title: "Career Decisions",
    count: "190+ experts",
    img: CareerCategoryIcon,
    focus: "Job Switch · Promotion · Business Timing",
  },
  {
    title: "Money & Wellbeing",
    count: "150+ experts",
    img: MoneyCategoryIcon,
    focus: "Wealth Flow · Debt Remedies · Growth",
  },
  {
    title: "Education & Growth",
    count: "90+ experts",
    img: EducationCategoryIcon,
    focus: "Exams · Higher Studies · Focus & Memory",
  },
  {
    title: "Family & Personal Life",
    count: "120+ experts",
    img: FamilyCategoryIcon,
    focus: "Home Peace · Children · Harmony",
  },
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
    blurb: "Bold, energetic, and driven. Today brings fresh momentum and opportunities to take the lead.",
    scores: { love: 50, career: 85, marriage: 62, finance: 78 },
  },
  {
    name: "Taurus",
    blurb: "Steady and grounded. Focus on comfort, patience, and one meaningful goal that builds lasting value.",
    scores: { love: 72, career: 60, marriage: 80, finance: 70 },
  },
  {
    name: "Gemini",
    blurb: "Curious energy opens doors. Conversations spark clarity—share ideas and stay flexible with plans.",
    scores: { love: 65, career: 88, marriage: 55, finance: 58 },
  },
  {
    name: "Cancer",
    blurb: "Emotional intuition is strong. Nurture close bonds and protect your peace with gentle boundaries.",
    scores: { love: 82, career: 54, marriage: 76, finance: 63 },
  },
  {
    name: "Leo",
    blurb: "Confidence shines today. Lead with warmth, celebrate progress, and let your creativity take center stage.",
    scores: { love: 78, career: 90, marriage: 68, finance: 74 },
  },
  {
    name: "Virgo",
    blurb: "Detail brings results. Organize priorities, refine routines, and trust careful steps over rush.",
    scores: { love: 58, career: 86, marriage: 70, finance: 81 },
  },
  {
    name: "Libra",
    blurb: "Balance and beauty guide you. Seek harmony in relationships and choose fairness in every decision.",
    scores: { love: 84, career: 66, marriage: 88, finance: 60 },
  },
  {
    name: "Scorpio",
    blurb: "Depth and focus intensify. Transform one lingering issue and trust your instinct on hidden truths.",
    scores: { love: 70, career: 75, marriage: 64, finance: 82 },
  },
  {
    name: "Sagittarius",
    blurb: "Adventure calls. Expand your view, say yes to learning, and keep optimism as your compass.",
    scores: { love: 67, career: 79, marriage: 58, finance: 69 },
  },
  {
    name: "Capricorn",
    blurb: "Discipline pays off. Climb steadily, honor commitments, and build toward a long-term win.",
    scores: { love: 55, career: 92, marriage: 72, finance: 88 },
  },
  {
    name: "Aquarius",
    blurb: "Fresh ideas flow freely. Innovate with community in mind and welcome unexpected allies.",
    scores: { love: 61, career: 84, marriage: 57, finance: 73 },
  },
  {
    name: "Pisces",
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

function RunningCounter({
  end,
  decimals = 0,
  suffix = "",
  duration = 2000,
  delay = 150,
  formatNumber = true,
}) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = nodeRef.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(end);
      return;
    }

    let frameId;
    let timeoutId;

    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      timeoutId = setTimeout(() => {
        const startTime = performance.now();

        const tick = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out expo for dramatic, energetic running numbers that decelerate smoothly to destination
          const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const current = ease * end;
          setCount(current);

          if (progress < 1) {
            frameId = requestAnimationFrame(tick);
          } else {
            setCount(end);
          }
        };

        frameId = requestAnimationFrame(tick);
      }, delay);
    };

    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            run();
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
      return () => {
        observer.disconnect();
        clearTimeout(timeoutId);
        cancelAnimationFrame(frameId);
      };
    } else {
      run();
      return () => {
        clearTimeout(timeoutId);
        cancelAnimationFrame(frameId);
      };
    }
  }, [end, duration, delay]);

  const formatted = useMemo(() => {
    if (decimals > 0) {
      return count.toFixed(decimals) + suffix;
    }
    const val = Math.round(count);
    return (formatNumber ? val.toLocaleString() : val) + suffix;
  }, [count, decimals, suffix, formatNumber]);

  return <span ref={nodeRef}>{formatted}</span>;
}

export default function AstroHomePage() {
  const navigate = useNavigate();
  const astrologersTrackRef = useRef(null);

  const scrollAstrologers = (direction) => {
    if (!astrologersTrackRef.current) return;
    const container = astrologersTrackRef.current;
    const card = container.querySelector(".astro-expert-card");
    const scrollAmount = card ? (card.offsetWidth + 18) * 2 : 480;
    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };
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
          <LazyVideo
            className="astro-hero-banner__video"
            src={heroVideo}
            preload="metadata"
          />
          <div className="astro-hero-banner__scrim" />
          <div className="astro-hero-banner__overlay">
            <div className="astro-hero__copy">
              <p className="astro-live-pill">
                <span className="astro-live-dot" />
                Live now · Experts online
              </p>
              <h1>
                <span className="astro-hero__brand-green">India’s Most Trusted</span>
                <br />
                <span className="astro-hero__coral">Astrology &amp; Healing</span>
                <br />
                <span className="astro-hero__brand-green">Platform</span>
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

      {/* STATS STRIP — premium floating card with animated running numbers */}
      <div className="astro-stats" aria-label="Platform highlights">
        <div className="astro-stat">
          <span className="astro-stat__icon"><BadgeCheck className="h-5 w-5" /></span>
          <strong className="astro-stat__number">
            <RunningCounter end={1000} suffix="+" duration={2000} delay={100} />
          </strong>
          <span className="astro-stat__label">Verified Astrologers</span>
        </div>
        <div className="astro-stat__divider" aria-hidden="true" />
        <div className="astro-stat">
          <span className="astro-stat__icon"><Globe className="h-5 w-5" /></span>
          <strong className="astro-stat__number">
            <RunningCounter end={10} suffix="+" duration={1500} delay={250} />
          </strong>
          <span className="astro-stat__label">Countries</span>
        </div>
        <div className="astro-stat__divider" aria-hidden="true" />
        <div className="astro-stat">
          <span className="astro-stat__icon"><Users className="h-5 w-5" /></span>
          <strong className="astro-stat__number">
            <RunningCounter end={10000} suffix="+" duration={2200} delay={180} />
          </strong>
          <span className="astro-stat__label">Users Guided</span>
        </div>
        <div className="astro-stat__divider" aria-hidden="true" />
        <div className="astro-stat">
          <span className="astro-stat__icon"><Star className="h-5 w-5" /></span>
          <strong className="astro-stat__number">
            <RunningCounter end={4.8} decimals={1} suffix=" ★" duration={1700} delay={320} />
          </strong>
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
            {/* Top Gold Trim Bar */}
            <div className="astro-guidance-block__trim" aria-hidden="true" />

            {/* Corner Star Accents */}
            <span className="astro-guidance-block__star astro-guidance-block__star--tl" aria-hidden="true">✦</span>
            <span className="astro-guidance-block__star astro-guidance-block__star--tr" aria-hidden="true">✦</span>

            {/* Section Header */}
            <div className="astro-guidance-header">
              <div className="astro-guidance-header__left">
                <div className="astro-guidance-eyebrow">
                  <span className="astro-guidance-eyebrow__star">✦</span>
                  <span>VEDIC LIFE DOMAINS</span>
                  <span className="astro-guidance-eyebrow__star">✦</span>
                </div>
                <h2 className="astro-guidance-title">Consult The Right Astrologer For You</h2>
                <p className="astro-guidance-subtitle">
                  Browse by the life realm you want clarity on. Connect instantly with verified Vedic masters, numerologists & tarot intuitives.
                </p>
              </div>

              <div className="astro-guidance-header__right">
                <div className="astro-guidance-badge">
                  <span className="astro-guidance-badge__pulse" aria-hidden="true" />
                  <div>
                    <strong>1,000+ Verified Masters</strong>
                    <span>Live & Available 24×7</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Cards Grid */}
            <div className="astro-category-grid">
              {CATEGORIES.map(({ title, count, img, focus }) => (
                <button
                  key={title}
                  type="button"
                  className="astro-category"
                  onClick={() => navigate(`/pricing?flow=consult&category=${encodeURIComponent(title)}`)}
                  aria-label={`${title} - ${count}`}
                >
                  <div className="astro-category__medallion">
                    <img src={img} alt="" className="astro-category__icon" />
                  </div>
                  <div className="astro-category__text">
                    <div className="astro-category__top">
                      <strong className="astro-category__title">{title}</strong>
                      <span className="astro-category__experts">
                        <span className="astro-category__dot" aria-hidden="true" />
                        {count}
                      </span>
                    </div>
                    {focus && <span className="astro-category__focus">{focus}</span>}
                  </div>
                  <div className="astro-category__arrow" aria-hidden="true">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </button>
              ))}
            </div>

            {/* Bottom Reassurance Strip */}
            <div className="astro-guidance-footer">
              <div className="astro-guidance-footer__item">
                <ShieldCheck className="h-4 w-4 text-[#064233]" aria-hidden="true" />
                <span>100% Confidential & Private</span>
              </div>
              <div className="astro-guidance-footer__divider" aria-hidden="true" />
              <div className="astro-guidance-footer__item">
                <Lock className="h-4 w-4 text-[#064233]" aria-hidden="true" />
                <span>End-to-End Encrypted Sessions</span>
              </div>
              <div className="astro-guidance-footer__divider" aria-hidden="true" />
              <div className="astro-guidance-footer__item">
                <Sparkles className="h-4 w-4 text-[#c4842a]" aria-hidden="true" />
                <span>First 5 Mins Satisfaction Guarantee</span>
              </div>
            </div>
          </div>

      {/* ============================================================== */}
      {/* CONSULT SHOWCASE: MARQUEE HEADER & FEATURED CO-FOUNDER GURU   */}
      {/* ============================================================== */}
      <div className="astro-section astro-consult-header-section">
        <div className="astro-consult-header">
          <div className="astro-consult-header__intro">
            <div className="astro-consult-header__badge">
              <span className="astro-consult-header__badge-star">✦</span>
              <span>Sacred 1-on-1 Guidance</span>
              <span className="astro-consult-header__badge-dot" aria-hidden="true" />
            </div>

            <h2 className="astro-consult-header__title">
              Private Consultations with <em>Master Astrologers</em>
            </h2>

            <p className="astro-consult-header__subtitle">
              Speak directly with Tathaastu’s Co-Founder and India’s most revered Vedic gurus. 
              Receive authentic, compassionate clarity across life decisions, Kundli charts, and spiritual healing.
            </p>
          </div>

          <div className="astro-consult-header__trust">
            <div className="astro-consult-header__pill">
              <ShieldCheck className="h-4 w-4 text-[#064233]" />
              <span>100% Private Audio &amp; Video</span>
            </div>
            <div className="astro-consult-header__pill">
              <Sparkles className="h-4 w-4 text-[#c4782a]" />
              <span>First 5 Mins Guarantee</span>
            </div>
            <Link to="/talk-to-astrologers" className="astro-consult-header__link">
              <span>Explore All Experts</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <section className="astro-section astro-founder" aria-labelledby="founder-heading">
        <div className="astro-founder__panel">
          <div className="astro-founder__watermark" aria-hidden="true" />

          <div className="astro-founder__copy">
            <div className="astro-founder__badge">
              <Award className="h-3.5 w-3.5" />
              <span>Co-Founder & Occult Healer</span>
            </div>

            <p className="astro-founder__kicker">Vedic Wisdom · Modern Clarity</p>
            <h2 id="founder-heading">Priyanka Singh</h2>
            <p className="astro-founder__credentials">
              Vedic Astrology · Gold Medalist · 15+ Years Consulting
            </p>

            <blockquote className="astro-founder__quote">
              “Astrology is not about predicting a fixed destiny — it is about illuminating your
              innate strengths and navigating time with conscious awareness.”
            </blockquote>

            <p className="astro-founder__desc">
              With over 15 years of experience in classical Vedic astrology, Priyanka Singh has
              guided seekers through crucial life transitions, relationships, and career paths. Her
              personalized consultations combine sacred astrological shastras with grounded,
              compassionate modern clarity.
            </p>

            <div className="astro-founder__pillars">
              <span className="astro-founder__pillar">Vedic Kundli</span>
              <span className="astro-founder__pillar">Vastu Shastra</span>
              <span className="astro-founder__pillar">Numerology</span>
              <span className="astro-founder__pillar">Chakra Healing</span>
            </div>

            <div className="astro-founder__stats">
              <div className="astro-founder__stat-card">
                <div className="astro-founder__stat-icon">
                  <Award size={22} />
                </div>
                <div>
                  <strong>15+ Years</strong>
                  <span>Of Vedic Mastery</span>
                  <small>Guiding seekers worldwide</small>
                </div>
              </div>

              <div className="astro-founder__stat-card">
                <div className="astro-founder__stat-icon">
                  <Users size={22} />
                </div>
                <div>
                  <strong>10 Lakh+</strong>
                  <span>People Guided</span>
                  <small>Across 45+ countries</small>
                </div>
              </div>
            </div>

            <div className="astro-founder__action">
              <Link to="/pricing?flow=consult&expertName=Priyanka+Singh" className="astro-founder__btn">
                <span>Book Consultation with Priyanka</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="astro-founder__photo-card">
            <div className="astro-founder__photo-frame">
              <img
                src={drPriyankaImg?.src || drPriyankaImg}
                alt="Priyanka Singh - Co-Founder of Tathaastu"
                className="astro-founder__photo-img"
                loading="lazy"
              />
              <div className="astro-founder__photo-sheen" aria-hidden="true" />

              <div className="astro-founder__floating-badge">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span>Top Rated · 5.0 (12k+ Sessions)</span>
              </div>

              <div className="astro-founder__floating-card">
                <div className="astro-founder__floating-name">
                  <strong>Priyanka Singh</strong>
                  <CheckCircle2 size={16} className="astro-founder__check-icon" />
                </div>
                <span>Co-Founder · Occult Healer, Tathaastu</span>
              </div>
            </div>
          </div>
        </div>
      </section>

          <div className="astro-experts">
            <SectionHeading
              title="Connect with India’s Trusted Astrologers"
              subtitle="Get personalised guidance from verified Astrologers who bring experience, clarity, and a caring approach to every consultation."
              action={
                <div className="astro-experts-nav-wrap">
                  <div className="astro-experts-arrows" aria-label="Scroll astrologers">
                    <button
                      type="button"
                      className="astro-nav-arrow astro-nav-arrow--prev"
                      onClick={() => scrollAstrologers("prev")}
                      aria-label="Previous Astrologers"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="astro-nav-arrow astro-nav-arrow--next"
                      onClick={() => scrollAstrologers("next")}
                      aria-label="Next Astrologers"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  <Link to="/pricing?flow=consult" className="astro-link">
                    View all <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              }
            />
            <div className="astro-astro-grid" ref={astrologersTrackRef}>
              {ASTROLOGERS.map((a) => {
                const imgSrc = a.img?.src || a.img;
                return (
                  <article
                    key={a.id || a.name}
                    className="astro-expert-card"
                    aria-label={`${a.name}, ${a.expertise.join(", ")}`}
                  >
                    {/* Top Gold Trim Accent */}
                    <div className="astro-expert-card__trim" aria-hidden="true" />

                    {/* Corner Star Accents */}
                    <span className="astro-expert-card__star astro-expert-card__star--tl" aria-hidden="true">✦</span>
                    <span className="astro-expert-card__star astro-expert-card__star--tr" aria-hidden="true">✦</span>

                    {/* Portrait Frame */}
                    <div className="astro-expert-card__media">
                      <img
                        src={imgSrc}
                        alt={`${a.name} - Astrologer`}
                        className="astro-expert-card__photo"
                        loading="lazy"
                      />

                      {/* Photo Overlays: Status Pill (Left) & Prestige Badge (Right) */}
                      <div className="astro-expert-card__badges">
                        <span className="astro-expert-pill astro-expert-pill--online">
                          <span className="astro-expert-pill__pulse" aria-hidden="true" />
                          Online
                        </span>
                        <span className={`astro-expert-pill astro-expert-pill--${a.badgeType || "gold"}`}>
                          ★ {a.rating} · {a.badge}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="astro-expert-card__body">
                      {/* Name & Experience Row */}
                      <div className="astro-expert-card__header">
                        <div className="astro-expert-card__identity">
                          <h3 className="astro-expert-card__name">
                            {a.name}
                            <BadgeCheck className="h-4 w-4 text-[#064233] fill-[#d4a853]" aria-label="Verified Expert" />
                          </h3>
                          <div className="astro-expert-card__lang">
                            <Globe className="h-3 w-3 text-[#c4842a]" aria-hidden="true" />
                            <span>{a.languages}</span>
                          </div>
                        </div>
                        <span className="astro-expert-card__exp-badge">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          {a.exp}
                        </span>
                      </div>

                      {/* Expertise Badges */}
                      <div className="astro-expert-card__tags">
                        {a.expertise.map((tag) => (
                          <span key={tag} className="astro-expert-tag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Short Bio Promise */}
                      <p className="astro-expert-card__about">"{a.about}"</p>

                      {/* Stats Micro-Bar */}
                      <div className="astro-expert-card__stats">
                        <div className="astro-expert-stat">
                          <strong className="astro-expert-stat__val">{a.reviews}</strong>
                          <span className="astro-expert-stat__lbl">Consults</span>
                        </div>
                        <div className="astro-expert-stat-divider" aria-hidden="true" />
                        <div className="astro-expert-stat">
                          <strong className="astro-expert-stat__val">★ {a.rating}</strong>
                          <span className="astro-expert-stat__lbl">Rating</span>
                        </div>
                        <div className="astro-expert-stat-divider" aria-hidden="true" />
                        <div className="astro-expert-stat">
                          <strong className="astro-expert-stat__val">{a.repeatRate || "98%"}</strong>
                          <span className="astro-expert-stat__lbl">Satisfied</span>
                        </div>
                      </div>

                      {/* Footer: Dual Prominent Action Buttons (Pricing Removed) */}
                      <div className="astro-expert-card__footer">
                        <div className="astro-expert-card__actions">
                          <button
                            type="button"
                            className="astro-expert-btn astro-expert-btn--chat"
                            onClick={() =>
                              navigate(
                                `/pricing?flow=consult&astrologer=${encodeURIComponent(
                                  a.id || a.name
                                )}&expertName=${encodeURIComponent(a.name)}`
                              )
                            }
                            aria-label={`Chat with ${a.name}`}
                          >
                            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Chat</span>
                          </button>
                          <button
                            type="button"
                            className="astro-expert-btn astro-expert-btn--call"
                            onClick={() =>
                              navigate(
                                `/pricing?flow=consult&astrologer=${encodeURIComponent(
                                  a.id || a.name
                                )}&expertName=${encodeURIComponent(a.name)}`
                              )
                            }
                            aria-label={`Call ${a.name}`}
                          >
                            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Call</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <AstroServicesSection />
        </div>
      </section>

      <ServiceDeckSection />

      {/* DAILY HOROSCOPE */}
      <DailyHoroscopeSection
        zodiacCards={zodiacCards}
        activeZodiac={activeZodiac}
        setActiveZodiac={setActiveZodiac}
        goPrevZodiac={goPrevZodiac}
        goNextZodiac={goNextZodiac}
        visibleZodiac={visibleZodiac}
        scoreMeta={SCORE_META}
      />

      {/* SACRED VEDIC REPORTS & CONSULTATION SUITE: NUMEROLOGY · MATCHMAKING · FULL KUNDLI */}
      <VedicReportsSection
        numerologyForm={numerologyForm}
        setNumerologyForm={setNumerologyForm}
        submitNumerology={submitNumerology}
        numerologyLoading={numerologyLoading}
        numerologyError={numerologyError}
        numerologyResult={numerologyResult}
        matchMakingForm={matchMakingForm}
        setMatchMakingForm={setMatchMakingForm}
        submitMatchMaking={submitMatchMaking}
        matchMakingLoading={matchMakingLoading}
        matchMakingError={matchMakingError}
        matchMakingResult={matchMakingResult}
        kundliForm={kundliForm}
        setKundliForm={setKundliForm}
        submitKundli={submitKundli}
        kundliLoading={kundliLoading}
        kundliError={kundliError}
        kundliResult={kundliResult}
        numerologyReportImg={numerologyReportImg}
        kundliConsultationImg={kundliConsultationImg}
        matchVideo={matchVideo}
        navigate={navigate}
      />

      {/* 6-CARD FREE SACRED TAROT READING EXPERIENCE */}
      <FreeTarotSection onConsult={() => navigate("/pricing?service=tarot&flow=consult")} />

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
              <button type="button" className="astro-app-download-banner__cta" onClick={() => navigate("/pricing?flow=consult")}>
                Download The App Now
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="astro-app-download-banner__stores">
                <button type="button" className="astro-app-store-btn" onClick={() => navigate("/pricing?flow=consult")}>
                  <img src={AppleLogoPng} alt="Apple logo" className="astro-app-store-btn__icon" />
                  <span>
                    <small>Download on the</small>
                    <strong>App Store</strong>
                  </span>
                </button>
                <button type="button" className="astro-app-store-btn" onClick={() => navigate("/pricing?flow=consult")}>
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

      {/* Best sellers store strip — temporarily hidden
      <section className="astro-section astro-bestsellers">
        <SectionHeading
          eyebrow="Store"
          title="Our Best Seller Products"
          subtitle="Sacred pieces from the Tathaastu store — hover to explore."
          action={
            <a href="https://www.abhimantritstore.com/" target="_blank" rel="noopener noreferrer" className="astro-link">
              View all <ArrowRight className="h-4 w-4" />
            </a>
          }
        />
        <div className="astro-bs-scroll">
          {BEST_SELLERS.map((product) => (
            <ProductCard key={product.id} product={product} imageSwap hoverStrip />
          ))}
        </div>
      </section>
      */}

      {/* CUSTOMER VIDEOS — horizontal strip above blogs */}
      <CustomerVideosSection />

      <section className="astro-clients-banner" aria-labelledby="clients-heading">
        <div className="astro-section astro-clients-banner__inner">
          <div className="astro-clients-banner__header">
            <div className="astro-clients-banner__badge">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Real Stories · 10 Lakh+ People Guided</span>
            </div>
            <h2 id="clients-heading">What Our Clients Say</h2>
            <p>
              Hear authentic experiences from seekers who found clarity, alignment, and peace of mind
              with Tathaastu’s personalised guidance.
            </p>
          </div>

          <div className="astro-clients-grid">
            {CLIENT_TESTIMONIALS.map((testimonial) => (
              <ClientTestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <AstroBlogSection blogs={blogs} />

      <AstroFaqSection />
    </div>
  );
}

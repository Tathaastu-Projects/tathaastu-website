"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@/lib/router";
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
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
// Store products temporarily disabled
// import "../Store/store.css";
import AppDownloadBanner from "../../assets/background_banner/app_download_banner.svg";
import AppleLogoPng from "../../assets/logo/apple_logo.png";
import PlayStoreLogoPng from "../../assets/logo/playstore_logo.png";
const LoveCategoryIcon = "/home/Love%20%26%20Relationship.png";
const MarriageCategoryIcon = "/home/Marriage.png";
const CareerCategoryIcon = "/home/Career.png";
const MoneyCategoryIcon = "/home/Money%20%26%20Well%20being.png";
const EducationCategoryIcon = "/home/Education.png";
const FamilyCategoryIcon = "/home/Family.png";
import ClientTestimonialCard from "./ClientTestimonialCard";
import ankitCustomer from "../../assets/customers/ankit.jpg";
import meeraCustomer from "../../assets/customers/meera.jpg";
import neerajCustomer from "../../assets/customers/neeraj.jpg";
import rishikaCustomer from "../../assets/customers/rishika.jpg";
// Store products temporarily disabled
// import { getProductBySlug } from "../../data/storeData";
// import capricornHover from "../../assets/products/capricorn-hover.jpg";
// import mukhiHover from "../../assets/products/mukhi-hover.jpg";
// import amethystHover from "../../assets/products/amethyst-hover.jpg";
// import pyramidHover from "../../assets/products/pyramid-hover.jpg";
const heroBannerImg = "/Main-Banner3.png";

const sectionFallback = () => <div className="astro-section min-h-[12rem]" aria-hidden="true" />;

const LazyWhenVisible = dynamic(() => import("./LazyWhenVisible"), {
  ssr: false,
  loading: sectionFallback,
});
const AstroServicesSection = dynamic(() => import("./AstroServicesSection"), {
  loading: sectionFallback,
});
const DailyHoroscopeSection = dynamic(() => import("./DailyHoroscopeSection"), {
  loading: sectionFallback,
});
// Explore reels temporarily replaced by YouTube spotlight
// const CustomerVideosSection = dynamic(() => import("./CustomerVideosSection"), {
//   loading: sectionFallback,
// });
const SpotlightSection = dynamic(() => import("./SpotlightSection"), {
  loading: sectionFallback,
});
const AstroBlogSection = dynamic(() => import("./AstroBlogSection"), {
  loading: sectionFallback,
});
const AstroFaqSection = dynamic(() => import("./AstroFaqSection"), {
  loading: sectionFallback,
});
// Store products temporarily disabled
// const ProductCard = dynamic(() => import("../Store/ProductCard"), {
//   loading: () => null,
// });

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

/* Store products temporarily disabled
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
*/

const ASTROLOGERS = [
  {
    id: "pameshwar-dutt",
    name: "Pameshwar Dutt",
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
  {
    title: "Talk to Astrologer",
    desc: "Chat, call or video with experts",
    icon: Phone,
    path: "/talk-to-astrologers",
  },
  {
    title: "Get Free Numerology Report",
    desc: "Discover what your numbers reveal",
    img: "/home/home-four/Numerology%202.png",
    path: "/numerology",
  },
  {
    title: "Get Free Tarot Reading",
    desc: "Find clarity with a free spread",
    img: "/home/home-four/TAROT.png",
    path: "/#free-tarot-section",
  },
  {
    title: "Get Free AI Kundli Reading",
    desc: "Preview your birth chart instantly",
    img: "/home/home-four/Kundli%201.png",
    path: "/calculator",
  },
];

function SectionHeading({ eyebrow, title, subtitle, action }) {
  return (
    <div className="astro-section-head">
      {(eyebrow || title || subtitle) ? (
        <div>
          {eyebrow ? <p className="astro-eyebrow">{eyebrow}</p> : null}
          {title ? <h2 className="astro-title">{title}</h2> : null}
          {subtitle ? <p className="astro-subtitle">{subtitle}</p> : null}
        </div>
      ) : null}
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

        let frames = 0;
        const tick = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out expo — update React state every other frame to cut main-thread work
          const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          frames += 1;
          if (progress === 1 || frames % 2 === 0) {
            setCount(ease * end);
          }

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
  const blogs = useMemo(() => blogsData.slice(0, 4), []);

  return (
    <div className="astro-home">
      {/* HERO — Figma-style banner */}
      <section className="astro-hero">
        <div className="astro-hero-banner">
          <img
            className="astro-hero-banner__img astro-hero-banner__video"
            src={heroBannerImg}
            alt="Dr. Priyanka Singh . Head Astrologer - Tathaastu, Astrology & Healing"
            width={1920}
            height={600}
            decoding="async"
            fetchPriority="high"
          />
          <div className="astro-hero-banner__overlay">
            <div className="astro-hero__copy">
              <p className="astro-hero__eyebrow">Dr. Priyanka Singh . Head Astrologer</p>
              <h1>
                <span className="astro-hero__line">Unlock Your Destiny &amp;</span>
                <span className="astro-hero__line astro-hero__line--accent">
                  Align Your Energy
                </span>
                <span className="astro-hero__line">With The Cosmos</span>
              </h1>
              <p className="astro-hero__lead">
                With over 15 years of expertise in Vedic astrology, Dr. Priyanka Singh . Head Astrologer
                deciphers cosmic energies and celestial alignments to guide
                individuals towards spiritual harmony, karmic clarity, and
                alignment with their higher purpose.
              </p>
              <div className="astro-hero__actions">
                <Link
                  to="/pricing?flow=consult&service=consult&expertName=Dr.+Priyanka+Singh"
                  className="astro-founder__btn astro-hero__cta"
                >
                  Book Appointment
                </Link>
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
            <RunningCounter end={1000} suffix="+" duration={2200} delay={180} />
          </strong>
          <span className="astro-stat__label">People Guided</span>
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
            {TRUST_BADGES.map(({ title, desc, icon: Icon, img, path }) => (
              <Link
                key={title}
                to={path}
                className="astro-trust-item"
                style={{ textDecoration: "none" }}
              >
                <span className="astro-trust-item__icon" aria-hidden="true">
                  {img ? (
                    <img src={img} alt="" className="astro-trust-item__icon-img" />
                  ) : Icon ? (
                    <Icon strokeWidth={1.75} />
                  ) : null}
                </span>
                <div className="astro-trust-item__text">
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </div>
              </Link>
            ))}
          </div>

          <LazyWhenVisible minHeight="18rem">
            <AstroServicesSection />
          </LazyWhenVisible>

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
                <Link
                  key={title}
                  to={`/pricing?flow=consult&category=${encodeURIComponent(title)}`}
                  className="astro-category"
                  aria-label={`${title} - ${count}`}
                >
                  <div className="astro-category__medallion">
                    <img src={img} alt="" className="astro-category__icon" loading="lazy" decoding="async" />
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
                </Link>
              ))}
            </div>
          </div>

      {/* ============================================================== */}
      {/* CONSULT SHOWCASE: MARQUEE HEADER & FEATURED FOUNDER GURU   */}
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
              Receive authentic, compassionate clarity across life decisions, Kundli charts, and spiritual healing by connecting with our verified experts.
            </p>
          </div>

          <div className="astro-consult-header__trust">
            <Link to="/talk-to-astrologers" className="astro-consult-header__link">
              <span>Explore All Experts</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Priyanka founder showcase — temporarily hidden
      <section className="astro-section astro-founder" aria-labelledby="founder-heading">
        <div className="astro-founder__panel">
          <div className="astro-founder__watermark" aria-hidden="true" />

          <div className="astro-founder__copy">
            <div className="astro-founder__badge">
              <Award className="h-3.5 w-3.5" />
              <span>Head Astrologer</span>
            </div>

            <p className="astro-founder__kicker">Vedic Wisdom · Modern Clarity</p>
            <h2 id="founder-heading">Dr. Priyanka Singh . Head Astrologer</h2>
            <p className="astro-founder__credentials">
              Vedic Astrology · Gold Medalist · 15+ Years Consulting
            </p>

            <blockquote className="astro-founder__quote">
              “Astrology is not about predicting a fixed destiny — it is about illuminating your
              innate strengths and navigating time with conscious awareness.”
            </blockquote>

            <p className="astro-founder__desc">
              With over 15 years of experience in classical Vedic astrology, Dr. Priyanka Singh . Head Astrologer has
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
                  <strong>1,000+</strong>
                  <span>People Guided</span>
                  <small>Across 45+ countries</small>
                </div>
              </div>
            </div>

            <div className="astro-founder__action">
              <Link to="/pricing?flow=consult&expertName=Dr.+Priyanka+Singh" className="astro-founder__btn">
                <span>Book Consultation with Dr. Priyanka Singh . Head Astrologer</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="astro-founder__photo-card">
            <div className="astro-founder__photo-frame">
              <img
                src={drPriyankaImg?.src || drPriyankaImg}
                alt="Dr. Priyanka Singh . Head Astrologer - Tathaastu"
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
                  <strong>Dr. Priyanka Singh . Head Astrologer</strong>
                  <CheckCircle2 size={16} className="astro-founder__check-icon" />
                </div>
                <span>Tathaastu</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      */}

          <div className="astro-experts">
            <div className="astro-astro-grid">
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
                          <Link
                            to={`/pricing?flow=consult&astrologer=${encodeURIComponent(
                              a.id || a.name
                            )}&expertName=${encodeURIComponent(a.name)}`}
                            className="astro-expert-btn astro-expert-btn--chat"
                            aria-label={`Chat with ${a.name}`}
                          >
                            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Chat</span>
                          </Link>
                          <Link
                            to={`/pricing?flow=consult&astrologer=${encodeURIComponent(
                              a.id || a.name
                            )}&expertName=${encodeURIComponent(a.name)}`}
                            className="astro-expert-btn astro-expert-btn--call"
                            aria-label={`Call ${a.name}`}
                          >
                            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Call</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* DAILY HOROSCOPE — free daily APIs (Spiritclick / CosmyDay / horoscope-app-api) */}
      <LazyWhenVisible minHeight="28rem">
        <DailyHoroscopeSection />
      </LazyWhenVisible>

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
              <Link to="/pricing?flow=consult" className="astro-app-download-banner__cta">
                Download The App Now
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="astro-app-download-banner__stores">
                <Link to="/pricing?flow=consult" className="astro-app-store-btn">
                  <img src={AppleLogoPng} alt="Apple logo" className="astro-app-store-btn__icon" loading="lazy" decoding="async" />
                  <span>
                    <small>Download on the</small>
                    <strong>App Store</strong>
                  </span>
                </Link>
                <Link to="/pricing?flow=consult" className="astro-app-store-btn">
                  <img src={PlayStoreLogoPng} alt="Google Play logo" className="astro-app-store-btn__icon" loading="lazy" decoding="async" />
                  <span>
                    <small>Get it on</small>
                    <strong>Play Store</strong>
                  </span>
                </Link>
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

      {/* Explore reels temporarily commented out — replaced by YouTube spotlight
      <LazyWhenVisible minHeight="26rem">
        <CustomerVideosSection />
      </LazyWhenVisible>
      */}

      <LazyWhenVisible minHeight="28rem">
        <SpotlightSection />
      </LazyWhenVisible>

      <LazyWhenVisible minHeight="22rem">
        <section className="astro-clients-banner" aria-labelledby="clients-heading">
          <div className="astro-section astro-clients-banner__inner">
            <div className="astro-clients-banner__header">
              <div className="astro-clients-banner__badge">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Real Stories · 1,000+ People Guided</span>
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
      </LazyWhenVisible>

      {/* BLOG */}
      <LazyWhenVisible minHeight="24rem">
        <AstroBlogSection blogs={blogs} />
      </LazyWhenVisible>

      <LazyWhenVisible minHeight="20rem">
        <AstroFaqSection />
      </LazyWhenVisible>
    </div>
  );
}

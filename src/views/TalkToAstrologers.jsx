"use client";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "@/lib/router";
import {
  BadgeCheck,
  ChevronDown,
  Lock,
  Phone,
  Search,
  ShieldCheck,
  Star,
  Truck,
  Users,
} from "lucide-react";
import SiteNavbar from "../layout/SiteNavbar";
import Footer from "../layout/Footer";
import { useConnectModal } from "../contexts/ConnectModalContext";
import {
  fetchAstrologerCategories,
  fetchAstrologers,
  fetchTrendingAstrologers,
  formatLanguages,
} from "../services/astrologersApi";
import AstroFaqSection from "../components/Home/AstroFaqSection";
import ConsultationRequestDialog from "../components/Consult/ConsultationRequestDialog";
import lotusMandala from "../assets/lotus_mandala.svg";
import harishankarImg from "../assets/astrologer/harishnkar.jpg";
import anuradhaImg from "../assets/astrologer/anuradha.jpg";
import hosalImg from "../assets/astrologer/hosal.jpg";
import vibhutiImg from "../assets/astrologer/vibhuti.jpg";
import upendraImg from "../assets/astrologer/upendra.jpg";
import deepakImg from "../assets/astrologer/deepak.jpg";
import duttImg from "../assets/astrologer/dutt.jpg";

const ACTIVITY = [
  "Priya from Mumbai just started a session with Priyanka Arora",
  "Rahul from Delhi connected with Acharya Prem",
  "Neha from Hyderabad booked Tarot Raka",
];

const WHY_CHOOSE = [
  { title: "Authentic & Pure", desc: "Sourced with care", icon: ShieldCheck },
  { title: "Secure Payments", desc: "100% safe checkout", icon: Lock },
  { title: "Fast & Reliable Delivery", desc: "Pan India shipping", icon: Truck },
  { title: "Trusted by Thousands", desc: "4.8+ average rating", icon: Users },
];

const VERIFY_STEPS = [
  {
    num: "01",
    title: "Identity & document check",
    desc: "Government ID, address and credentials are verified before onboarding.",
  },
  {
    num: "02",
    title: "Qualification proof",
    desc: "Proof of astrological training, lineage or certification is reviewed.",
  },
  {
    num: "03",
    title: "Panel interview",
    desc: "A live interview with senior astrologers tests real consultation skill.",
  },
  {
    num: "04",
    title: "30-day probation & live audits",
    desc: "New astrologers are monitored on live sessions before going fully public.",
  },
];

const SERVICE_LABELS = {
  consult: "Consultation",
  kundli: "Kundli",
  "daily-horoscope": "Daily Horoscope",
  tarot: "Tarot Reading",
  numerology: "Numerology",
  vastu: "Vastu",
  "crystal-healing": "Crystal Healing",
};

const USE_DUMMY_ASTROLOGERS = process.env.NEXT_PUBLIC_USE_DUMMY_ASTROLOGERS === "true";

const FALLBACK_EXPERTS = [
  {
    id: "pameshwar-dutt",
    slug: "pameshwar-dutt",
    name: "Pameshwar Dutt",
    phone: "9120329906",
    imageUrl: duttImg,
    online: true,
    verified: true,
    expertise: ["Vedic", "Numerology", "Face Reading"],
    languages: ["Hindi", "English"],
    expYears: 11,
    rating: "5.0",
    consultations: "10.2k+",
    price: 499,
    priceDuration: 30,
  },
  {
    id: "vibhuti",
    slug: "vibhuti",
    name: "Dr. Vibhuti",
    phone: "7078473994",
    imageUrl: vibhutiImg,
    online: true,
    verified: true,
    expertise: ["Vedic", "Face Reading", "Tarot"],
    languages: ["English", "Hindi"],
    expYears: 10,
    rating: "4.9",
    consultations: "11.5k+",
    price: 449,
    priceDuration: 30,
  },
  {
    id: "upendra",
    slug: "upendra",
    name: "Acharya Upendra",
    phone: "8173807057",
    imageUrl: upendraImg,
    online: true,
    verified: true,
    expertise: ["Vedic", "Kundli Analysis"],
    languages: ["Hindi", "English"],
    expYears: 8,
    rating: "4.9",
    consultations: "8.5k+",
    price: 399,
    priceDuration: 30,
  },
  {
    id: "deepak",
    slug: "deepak",
    name: "Pt. Deepak",
    phone: "9120329906",
    imageUrl: deepakImg,
    online: true,
    verified: true,
    expertise: ["Vedic", "Kundli Milan"],
    languages: ["Hindi", "English"],
    expYears: 7,
    rating: "4.9",
    consultations: "7.8k+",
    price: 349,
    priceDuration: 30,
  },
  {
    id: "harishankar",
    slug: "harishankar",
    name: "Pt. Harishankar",
    phone: "8707748378",
    imageUrl: harishankarImg,
    online: true,
    verified: true,
    expertise: ["Vedic", "Face Reading"],
    languages: ["Hindi", "English"],
    expYears: 18,
    rating: "5.0",
    consultations: "19.4k+",
    price: 549,
    priceDuration: 30,
  },
  {
    id: "hosal",
    slug: "hosal",
    name: "Pt. Hosal",
    phone: "9950421929",
    imageUrl: hosalImg,
    online: true,
    verified: true,
    expertise: ["Vedic", "Dasha Predictions"],
    languages: ["Hindi", "English"],
    expYears: 10,
    rating: "5.0",
    consultations: "12.2k+",
    price: 449,
    priceDuration: 30,
  },
  {
    id: "anuradha",
    slug: "anuradha",
    name: "Acharya Anuradha",
    phone: "9044257411",
    imageUrl: anuradhaImg,
    online: true,
    verified: true,
    expertise: ["Vedic", "Numerology", "Lo Shu Grid"],
    languages: ["English", "Hindi"],
    expYears: 12,
    rating: "5.0",
    consultations: "14.6k+",
    price: 499,
    priceDuration: 30,
  },
];

function AstrologerCard({ expert, isChosen, onCall, onSelect }) {
  const profile = (
    <>
      <div className="talk-card__top-trim" aria-hidden="true" />
      <div className={`talk-card__avatar-wrap${expert.online ? " is-online" : ""}`}>
        <div className="talk-card__avatar-frame">
          <img
            src={expert.imageUrl}
            alt={expert.name}
            className="talk-card__avatar"
          />
          {expert.online && (
            <span className="talk-card__live-badge">
              <span className="talk-card__live-dot" /> Online
            </span>
          )}
        </div>
      </div>

      <div className="talk-card__name-row">
        <h3 className="talk-card__name">{expert.name}</h3>
        {expert.verified ? (
          <span className="talk-card__verified" title="Verified Astrologer" aria-label="Verified">
            <BadgeCheck className="h-4 w-4" fill="currentColor" stroke="#fff" />
          </span>
        ) : null}
      </div>

      {isChosen && (
        <div style={{ textAlign: "center", marginTop: "0.2rem" }}>
          <span
            style={{
              fontSize: "0.68rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: "#8c5d12",
              background: "rgba(197, 151, 62, 0.15)",
              border: "1px solid rgba(197, 151, 62, 0.35)",
              padding: "0.15rem 0.55rem",
              borderRadius: "999px",
            }}
          >
            ★ Selected Guru
          </span>
        </div>
      )}

      <div className="talk-card__tags">
        {(expert.expertise || []).map((tag) => (
          <span key={tag} className="talk-card__tag">{tag}</span>
        ))}
      </div>

      <p className="talk-card__meta">{formatLanguages(expert.languages)}</p>
      <p className="talk-card__meta">{expert.expYears} yrs exp</p>

      <div className="talk-card__footer-row">
        <div className="talk-card__rating">
          <Star className="h-3.5 w-3.5 fill-[#d4a853] text-[#d4a853]" />
          <span>
            {expert.rating} <span className="talk-card__sep">•</span>{" "}
            {expert.consultations}
          </span>
        </div>
      </div>
    </>
  );

  return (
    <article className={`talk-card ${isChosen ? "is-chosen" : ""}`}>
      <button
        type="button"
        className="talk-card__body talk-card__pick"
        onClick={() => onSelect(expert)}
      >
        {profile}
      </button>

      <button
        type="button"
        className="talk-card__btn"
        onClick={() => onCall(expert)}
      >
        <Phone className="h-4 w-4" />
        <span>Call now</span>
      </button>
    </article>
  );
}

export default function TalkToAstrologers() {
  const navigate = useNavigate();
  const { openModal } = useConnectModal();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [activityIdx] = useState(0);
  const [categories, setCategories] = useState([
    "All",
    "Love",
    "Education",
    "Career",
    "Marriage",
    "Health",
    "Wealth",
  ]);
  const [experts, setExperts] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [consult, setConsult] = useState({
    active: false,
    service: "",
    packageName: "",
    price: "",
    duration: "",
    astrologerId: "",
    expertName: "",
  });
  const [selectedExpert, setSelectedExpert] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pkg = params.get("package") || "";
    setConsult({
      active: params.get("flow") === "consult" || Boolean(pkg),
      service: params.get("service") || "",
      packageName: pkg,
      price: params.get("price") || "₹499",
      duration: params.get("duration") || "30 Minutes",
      astrologerId: params.get("astrologer") || params.get("astrologerId") || "",
      expertName: params.get("expertName") || "",
    });
  }, []);

  const handleCallExpert = (expert) => {
    if (consult.packageName) {
      // Step 3: Package already selected -> Redirect to Payment Screen!
      const params = new URLSearchParams({
        package: consult.packageName,
        price: consult.price || "₹499",
        duration: consult.duration || "30 Minutes",
        astrologer: expert.name,
        astrologerId: expert.id || "",
        astrologerSlug: expert.slug || "",
        astrologerImg: expert.imageUrl || "",
        expertRating: expert.rating || "5.0",
        expertExp: expert.expYears || "10",
        expertExpertise: (expert.expertise || []).join(", "),
        expertLanguages: formatLanguages(expert.languages) || "",
      });
      navigate(`/consultation-booking?${params.toString()}`);
      return;
    }

    // Step 1: No package selected yet -> Redirect to Packages Screen!
    const params = new URLSearchParams({
      flow: "consult",
      astrologer: expert.id || "",
      expertName: expert.name || "",
      expertSlug: expert.slug || "",
      expertImg: expert.imageUrl || "",
    });
    navigate(`/pricing?${params.toString()}`);
  };

  const handleCardClick = (expert) => {
    handleCallExpert(expert);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const cats = await fetchAstrologerCategories();
        if (!cancelled && Array.isArray(cats) && cats.length) {
          setCategories(cats);
        }
      } catch {
        /* keep defaults */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");

      const applyFiltersAndSort = (baseList) => {
        let filtered = (baseList || []).filter((expert) => {
          const haystack = `${expert.name} ${(expert.expertise || []).join(" ")}`.toLowerCase();
          const matchesQuery = !query.trim() || haystack.includes(query.trim().toLowerCase());
          const matchesCategory =
            category === "All" ||
            (expert.expertise || []).some((tag) => tag.toLowerCase() === category.toLowerCase());
          return matchesQuery && matchesCategory;
        });

        if (sort === "rating") {
          filtered = [...filtered].sort((a, b) => Number(b.rating) - Number(a.rating));
        } else if (sort === "experience") {
          filtered = [...filtered].sort((a, b) => Number(b.expYears || 0) - Number(a.expYears || 0));
        }
        return filtered;
      };

      try {
        if (USE_DUMMY_ASTROLOGERS) {
          const filtered = applyFiltersAndSort(FALLBACK_EXPERTS);
          setExperts(filtered);
          setTrending(FALLBACK_EXPERTS.slice(0, 4));
          return;
        }

        const [list, trend] = await Promise.all([
          fetchAstrologers({ q: query, category, sort }),
          fetchTrendingAstrologers(5),
        ]);
        if (cancelled) return;
        setExperts(Array.isArray(list) ? list : []);
        setTrending(Array.isArray(trend) ? trend : []);
      } catch (err) {
        if (cancelled) return;
        const filtered = applyFiltersAndSort(FALLBACK_EXPERTS);
        setExperts(filtered);
        setTrending(FALLBACK_EXPERTS.slice(0, 4));
        setError(filtered.length ? "" : err.message || "Failed to load astrologers");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, query ? 250 : 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query, category, sort]);

  const scrollToGrid = () => {
    document
      .getElementById("talk-experts")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="talk-page">
      <SiteNavbar />

      <section className="talk-hero">
        <div className="talk-wrap talk-hero__inner">
          <span className="talk-hero__badge">
            <span className="talk-hero__badge-dot" />
            Experts Online
          </span>
          <h1 className="talk-hero__title">Talk to Astrologers Online</h1>
          <p className="talk-hero__sub">
            Connect with 1,000+ verified experts for love, career, marriage, health,
            and wealth guidance — via chat, call, or video, whenever you need
            clarity.
          </p>
          <div className="talk-hero__actions">
            <button type="button" className="talk-hero__cta" onClick={scrollToGrid}>
              Talk to Astrologer Now
            </button>
            <div className="talk-hero__toast">
              <span className="talk-hero__toast-icon">
                <Phone className="h-3.5 w-3.5" />
              </span>
              <span>{ACTIVITY[activityIdx]}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="talk-wrap talk-filters" id="talk-experts">
        <div className="talk-filters__row">
          <label className="talk-search">
            <Search className="h-4 w-4" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, skill, language..."
              aria-label="Search astrologers"
            />
          </label>

          <label className="talk-sort">
            <span className="talk-sort__label">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort astrologers"
            >
              <option value="popular">Popular</option>
              <option value="rating">Top rated</option>
              <option value="experience">Most Experienced</option>
            </select>
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </label>

          <div className="talk-chips" role="tablist" aria-label="Categories">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={category === cat}
                className={`talk-chip ${category === cat ? "is-active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="talk-wrap talk-main">
        <div className="talk-flow-banner" role="status">
          <div className="talk-flow-banner__icon-wrap">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <p className="talk-flow-banner__text">
            {consult.packageName ? (
              <>
                <strong>Step 2 of 3: Selected Package: {consult.packageName} ({consult.price} • {consult.duration}). </strong>
                Click <strong>&quot;Call now&quot;</strong> on {consult.expertName ? <strong>{consult.expertName}</strong> : "your preferred verified expert"} to proceed to secure PayU payment.
              </>
            ) : (
              <>
                <strong>Step 1: Choose Your Expert. </strong>
                Select any verified Vedic master or click <strong>&quot;Call now&quot;</strong> to choose your consultation package.
              </>
            )}
          </p>
        </div>
        <div className="talk-layout">
          <div className="talk-grid">
            {loading ? (
              <div className="talk-empty">Loading experts from database...</div>
            ) : error ? (
              <div className="talk-empty">{error}</div>
            ) : experts.length ? (
              experts.map((expert) => {
                const isChosen =
                  consult.astrologerId &&
                  (expert.id === consult.astrologerId ||
                    expert.slug === consult.astrologerId ||
                    expert.name
                      .toLowerCase()
                      .includes(consult.astrologerId.toLowerCase()));
                return (
                  <AstrologerCard
                    key={expert.id}
                    expert={expert}
                    isChosen={Boolean(isChosen)}
                    onCall={handleCallExpert}
                    onSelect={handleCardClick}
                  />
                );
              })
            ) : (
              <div className="talk-empty">
                No experts match your search. Try another skill or category.
              </div>
            )}
          </div>

          <aside className="talk-side" aria-label="Most consulted this week">
            <p className="talk-side__eyebrow">Trending now</p>
            <h2 className="talk-side__title">Most consulted this week</h2>
            <p className="talk-side__sub">
              The astrologers everyone is calling right now
            </p>
            <div className="talk-side__list">
              {trending.map((expert) => (
                <div key={expert.id} className="talk-side__item">
                  <div
                    className="talk-side__link"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCardClick(expert)}
                  >
                    <img src={expert.imageUrl} alt="" />
                    <span className="talk-side__meta">
                      <strong>
                        {expert.name}
                        {expert.verified ? (
                          <BadgeCheck
                            className="inline h-3.5 w-3.5 text-[#1f8f4e] ml-1 align-text-bottom"
                            fill="currentColor"
                            stroke="#fff"
                          />
                        ) : null}
                      </strong>
                      <p>{(expert.expertise || []).slice(0, 2).join(" - ")}</p>
                      <p className="talk-side__rating">
                        ★ {expert.rating}
                        <span className="talk-card__sep">•</span>
                        {expert.consultations}
                      </p>
                    </span>
                  </div>
                  <button
                    type="button"
                    className="talk-side__call"
                    onClick={() => handleCallExpert(expert)}
                  >
                    Call
                  </button>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="talk-info" aria-label="Why choose and verify">
        <img
          src={lotusMandala}
          alt=""
          className="talk-info__mandala talk-info__mandala--left"
          aria-hidden="true"
        />
        <img
          src={lotusMandala}
          alt=""
          className="talk-info__mandala talk-info__mandala--right"
          aria-hidden="true"
        />

        <div className="talk-wrap">
          <h2 className="talk-info__heading">
            Why Choose <span>Tathaastu</span>
          </h2>
          <div className="talk-why">
            {WHY_CHOOSE.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="talk-why__item">
                  <span className="talk-why__icon" aria-hidden="true">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <h2 className="talk-info__heading talk-info__heading--spaced">
            How We <span>Verify Astrologers</span>
          </h2>
          <div className="talk-verify">
            {VERIFY_STEPS.map((step) => (
              <article key={step.num} className="talk-verify__card">
                <span className="talk-verify__num">{step.num}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      <AstroFaqSection id="talk-faq" />

      <Footer />
      {selectedExpert ? (
        <ConsultationRequestDialog
          expert={selectedExpert}
          packageName={consult.packageName}
          serviceLabel={SERVICE_LABELS[consult.service] || ""}
          onClose={() => setSelectedExpert(null)}
        />
      ) : null}
    </div>
  );
}

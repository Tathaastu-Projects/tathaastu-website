"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useConnectModal } from "../../contexts/ConnectModalContext";
import ChakraImg from "../../assets/chakra.jpg";
import HOMESEPERATOR from '../../assets/HOME_Seperator_1.png';
import ExpertIcon from "../../assets/expert.svg";
import AuthenticIcon from "../../assets/authentic.svg";
import PERSONALISEDIcon from "../../assets/PERSONALISED.svg";
import AIPowerIcon from "../../assets/ai_power.svg";
import HomeBanner1 from "../../assets/home_banner_1.png";
import HomeBanner2 from "../../assets/home_banner_2.jpeg";
import HomeBanner3 from "../../assets/home_banner_3.jpeg";
import HomeBanner4 from "../../assets/home_banner_4.jpeg";
import SolarHero from "./SolarHero";

// const AstrologyBanner = () => {
//   return (
//     <div
//       className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
//       style={{ backgroundImage: `url(${Banner})` }}
//     >
//       <div className="absolute inset-0 bg-black/50"></div>

//       <div className="relative z-10 max-w-4xl text-center px-4">
//         <h1 className="text-3xl md:text-5xl font-bold mb-4">
//           UNLOCK YOUR DESTINY WITH <br />
//           <span className="text-pink-300">AI-POWERED ASTROLOGY</span>
//         </h1>

//         <p className="text-sm md:text-base text-gray-200 mb-6">
//           PERSONALIZED GUIDANCE. MODERN MYSTICISM. ALWAYS CONNECTED.
//         </p>

//         <button className="bg-pink-400 hover:bg-pink-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300">
//           GET STARTED
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AstrologyBanner;




// import React from "react";

const AstrologyHome = () => {
  const { openModal } = useConnectModal();
  const slides = useMemo(() => [HomeBanner1, HomeBanner2, HomeBanner3, HomeBanner4], []);
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const ROTATING_PROBLEM_WORDS = useMemo(
    () => ["Struggles", "Challenges", "Issues", "Troubles", "Obstacles", "Setbacks", "Complications", "Crises"],
    []
  );
  const [problemWordIdx, setProblemWordIdx] = useState(0);
  const [isProblemWordFading, setIsProblemWordFading] = useState(false);
  const problemWordWidthCh = useMemo(
    () => Math.max(...ROTATING_PROBLEM_WORDS.map((w) => String(w || "").length)),
    [ROTATING_PROBLEM_WORDS]
  );
  const [isNumerologyOpen, setIsNumerologyOpen] = useState(false);
  const [numForm, setNumForm] = useState({ name: "", phone: "", dob: "" });
  const [numResult, setNumResult] = useState(null);
  const [isTarotOpen, setIsTarotOpen] = useState(false);
  const [tarotStep, setTarotStep] = useState("intro"); // intro | pick | analyzing | results
  const [tarotDeck, setTarotDeck] = useState([]);
  const [tarotSelectedIds, setTarotSelectedIds] = useState([]);

  useEffect(() => {
    if (isHovered) return;
    const t = setInterval(() => {
      setActive((v) => (v + 1) % slides.length);
    }, 2500);
    return () => clearInterval(t);
  }, [isHovered, slides.length]);

  useEffect(() => {
    const t = window.setInterval(() => {
      setIsProblemWordFading(true);
      window.setTimeout(() => {
        setProblemWordIdx((v) => (v + 1) % ROTATING_PROBLEM_WORDS.length);
        setIsProblemWordFading(false);
      }, 220);
    }, 1600);
    return () => window.clearInterval(t);
  }, [ROTATING_PROBLEM_WORDS.length]);

  const TAROT_CARDS = useMemo(
    () => [
      { id: "the-fool", name: "The Fool", meaning: "New beginnings, spontaneity, faith in the journey." },
      { id: "the-magician", name: "The Magician", meaning: "Manifestation, skill, focused intention." },
      { id: "the-high-priestess", name: "The High Priestess", meaning: "Intuition, inner wisdom, mystery." },
      { id: "the-empress", name: "The Empress", meaning: "Nurturing, abundance, creativity." },
      { id: "the-emperor", name: "The Emperor", meaning: "Structure, stability, leadership." },
      { id: "the-hierophant", name: "The Hierophant", meaning: "Tradition, learning, spiritual guidance." },
      { id: "the-lovers", name: "The Lovers", meaning: "Choices, relationships, alignment of values." },
      { id: "the-chariot", name: "The Chariot", meaning: "Willpower, direction, victory through discipline." },
      { id: "strength", name: "Strength", meaning: "Courage, compassion, quiet inner power." },
      { id: "the-hermit", name: "The Hermit", meaning: "Reflection, solitude, inner guidance." },
      { id: "wheel-of-fortune", name: "Wheel of Fortune", meaning: "Change, cycles, turning points." },
      { id: "justice", name: "Justice", meaning: "Truth, fairness, clarity, consequences." },
      { id: "the-hanged-man", name: "The Hanged Man", meaning: "Pause, surrender, new perspective." },
      { id: "death", name: "Death", meaning: "Transformation, endings, powerful renewal." },
      { id: "temperance", name: "Temperance", meaning: "Balance, healing, patience." },
      { id: "the-devil", name: "The Devil", meaning: "Attachments, shadows, reclaiming control." },
      { id: "the-tower", name: "The Tower", meaning: "Sudden change, truth revealed, reset." },
      { id: "the-star", name: "The Star", meaning: "Hope, inspiration, gentle guidance." },
      { id: "the-moon", name: "The Moon", meaning: "Uncertainty, dreams, intuition through the fog." },
      { id: "the-sun", name: "The Sun", meaning: "Joy, clarity, vitality, success." },
      { id: "judgement", name: "Judgement", meaning: "Awakening, release, higher calling." },
      { id: "the-world", name: "The World", meaning: "Completion, integration, fulfillment." },
    ],
    []
  );

  const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const hashToInt = (s) => {
    const str = String(s || "");
    let h = 0;
    for (let i = 0; i < str.length; i += 1) {
      h = (h * 31 + str.charCodeAt(i)) >>> 0;
    }
    return h;
  };

  const pickFrom = (arr, key) => arr[hashToInt(key) % arr.length];

  const interpretTarot = (card, positionIndex) => {
    const positions = [
      "How you feel about yourself now",
      "What you most want right now",
      "Your fears",
      "What is going for you",
      "What is going against you",
      "The outcome",
    ];

    const prompts = [
      [
        "Right now, your inner state is being shaped by this energy.",
        "This card shows your current self-image and emotions.",
        "This is the vibe you’re carrying within.",
      ],
      [
        "Your deepest desire is pulling you toward this theme.",
        "What you’re reaching for is linked to this energy.",
        "Your heart wants movement in this direction.",
      ],
      [
        "A hidden worry or doubt is connected to this card.",
        "This points to what you’re avoiding or overthinking.",
        "This fear is asking to be acknowledged, not obeyed.",
      ],
      [
        "Support, luck, or momentum is working in your favor here.",
        "Something positive is quietly building for you.",
        "This is the advantage you can lean on.",
      ],
      [
        "A challenge, delay, or block shows up through this energy.",
        "This is what may drain your focus or confidence.",
        "This is the resistance you’ll need to handle wisely.",
      ],
      [
        "If you stay on this path, this is the direction it tends to move.",
        "The likely result points to this theme.",
        "This is the outcome energy forming around you.",
      ],
    ];

    const actions = [
      "Take one small step today.",
      "Be honest with yourself.",
      "Don’t rush the timing.",
      "Choose clarity over comfort.",
      "Set one clean boundary.",
      "Trust your intuition once—then act.",
      "Focus on consistency, not perfection.",
      "Let go of what you can’t control.",
    ];

    const pos = positions[positionIndex] || `Card ${positionIndex + 1}`;
    const prefix = pickFrom(prompts[positionIndex] || prompts[0], `${card?.id}-${positionIndex}-p`);
    const action = pickFrom(actions, `${card?.id}-${positionIndex}-a`);

    return {
      position: pos,
      text: `${prefix} ${card?.meaning || ""} ${action}`,
    };
  };

  const openTarot = () => {
    setIsTarotOpen(true);
    setTarotStep("intro");
    setTarotSelectedIds([]);
    setTarotDeck(shuffleArray(TAROT_CARDS)); // 22 major arcana (like screenshot)
  };

  const closeTarot = () => {
    setIsTarotOpen(false);
    setTarotStep("intro");
    setTarotSelectedIds([]);
    setTarotDeck([]);
  };

  const toggleTarotPick = (id) => {
    setTarotSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 6) return prev;
      return [...prev, id];
    });
  };

  const reduceToSingle = (n) => {
    let v = Math.abs(Number(n) || 0);
    while (v > 9) {
      v = String(v)
        .split("")
        .reduce((s, d) => s + Number(d), 0);
    }
    return v || 0;
  };

  const calcDriver = (dob) => {
    if (!dob) return 0;
    const day = Number(String(dob).slice(8, 10));
    return reduceToSingle(day);
  };

  const calcConductor = (dob) => {
    if (!dob) return 0;
    const digits = String(dob).replaceAll("-", "").split("");
    const sum = digits.reduce((s, d) => s + Number(d), 0);
    return reduceToSingle(sum);
  };

  const onNumerologySubmit = (e) => {
    e.preventDefault();
    const driver = calcDriver(numForm.dob);
    const conductor = calcConductor(numForm.dob);
    setNumResult({ driver, conductor });
  };

  const closeNumerology = () => {
    setIsNumerologyOpen(false);
    setNumResult(null);
    setNumForm({ name: "", phone: "", dob: "" });
  };

  const goPrev = () => setActive((v) => (v - 1 + slides.length) % slides.length);
  const goNext = () => setActive((v) => (v + 1) % slides.length);

  return (
    <div className="w-full">

      {/* SECTION 0: Top banners carousel (replacing solar hero for now) */}
      <section
        className="home_top_banner"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Text/content overlay only for first banner */}
        {active === 0 && (
          <div className="home_top_banner_overlay">
            <div className="home_top_banner_overlay_inner">
              <h1 className="home_top_banner_h1">
                Unlock the <span className="home_top_banner_h1_accent1">Secrets</span>
                <br />
                of your <span className="home_top_banner_h1_accent2">destiny</span>
              </h1>
              <p className="home_top_banner_p">
                Your birth chart reveals powerful insights about your career, relationships, wealth,
                and life path.
              </p>

              <div className="home_top_banner_cards" aria-label="Quick questions">
                <div className="home_top_banner_card">
                  <div className="home_top_banner_card_icon" aria-hidden="true">🪙</div>
                  <div className="home_top_banner_card_title">Career growth stuck?</div>
                </div>
                <div className="home_top_banner_card">
                  <div className="home_top_banner_card_icon" aria-hidden="true">💍</div>
                  <div className="home_top_banner_card_title">Marriage getting delayed?</div>
                </div>
                <div className="home_top_banner_card">
                  <div className="home_top_banner_card_icon" aria-hidden="true">💔</div>
                  <div className="home_top_banner_card_title">Relationship conflicts?</div>
                </div>
              </div>

              <div className="home_top_banner_ctas">
                <button
                  type="button"
                  className="home_top_banner_btn home_top_banner_btn_gold"
                  onClick={openModal}
                >
                  Generate Free Kundli <span aria-hidden="true">›</span>
                </button>
                <button
                  type="button"
                  className="home_top_banner_btn home_top_banner_btn_pink"
                  onClick={openModal}
                >
                  Talk to an Astrologer
                </button>
              </div>

              <div className="home_top_banner_stats" aria-label="Trust stats">
                <div className="home_top_banner_stat">
                  <span className="home_top_banner_stat_dot" aria-hidden="true" />
                  <span>Verified Astrologers</span>
                </div>
                <div className="home_top_banner_stat">
                  <span className="home_top_banner_stat_dot" aria-hidden="true" />
                  <span>10,000+ Happy Users</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Text/content overlay for second banner */}
        {active === 1 && (
          <div className="home_top_banner_overlay">
            <div className="home_top_banner_overlay_inner home_top_banner_overlay_inner_wide">
              <h1 className="home_top_banner_h1">
                Is Your Home
                <br />
                <span className="home_top_banner_h1_accent1">Blocking Positive</span>
                <br />
                Energy?
              </h1>
              <p className="home_top_banner_p">
                Your home's direction and layout can influence wealth, peace, and success.
                Discover how Vaastu can restore balance and harmony.
              </p>

              <div className="home_top_banner_cards home_top_banner_cards_2col" aria-label="Common concerns">
                <div className="home_top_banner_card">
                  <div className="home_top_banner_card_icon" aria-hidden="true">🏠</div>
                  <div className="home_top_banner_card_title">Lack of peace at home?</div>
                </div>
                <div className="home_top_banner_card">
                  <div className="home_top_banner_card_icon" aria-hidden="true">💰</div>
                  <div className="home_top_banner_card_title">Financial instability?</div>
                </div>
                <div className="home_top_banner_card">
                  <div className="home_top_banner_card_icon" aria-hidden="true">📉</div>
                  <div className="home_top_banner_card_title">Negative energy in your house?</div>
                </div>
                <div className="home_top_banner_card">
                  <div className="home_top_banner_card_icon" aria-hidden="true">👨‍👩‍👧‍👦</div>
                  <div className="home_top_banner_card_title">Frequent family conflicts?</div>
                </div>
              </div>

              <div className="home_top_banner_ctas">
                <button
                  type="button"
                  className="home_top_banner_btn home_top_banner_btn_pink"
                  onClick={openModal}
                >
                  Talk to Vaastu Expert
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Text/content overlay for third banner */}
        {active === 2 && (
          <div className="home_top_banner_overlay">
            <div className="home_top_banner_overlay_inner home_top_banner_overlay_inner_wide">
              <h1 className="home_top_banner_h1">
                Your Numbers Reveal Your <span className="home_top_banner_h1_accent1">True</span>{" "}
                <span className="home_top_banner_h1_accent2">Potential</span>
              </h1>
              <p className="home_top_banner_p">
                Discover how your birth number and destiny number influence your career, success,
                and relationships.
              </p>

              <div className="home_top_banner_cards home_top_banner_cards_2col" aria-label="Questions">
                <div className="home_top_banner_card">
                  <div className="home_top_banner_card_icon" aria-hidden="true">🔢</div>
                  <div className="home_top_banner_card_title">Why success feels delayed?</div>
                </div>
                <div className="home_top_banner_card">
                  <div className="home_top_banner_card_icon" aria-hidden="true">💼</div>
                  <div className="home_top_banner_card_title">Career confusion?</div>
                </div>
                <div className="home_top_banner_card">
                  <div className="home_top_banner_card_icon" aria-hidden="true">💔</div>
                  <div className="home_top_banner_card_title">Relationship struggles?</div>
                </div>
                <div className="home_top_banner_card">
                  <div className="home_top_banner_card_icon" aria-hidden="true">✨</div>
                  <div className="home_top_banner_card_title">Want to know your lucky number?</div>
                </div>
              </div>

              <div className="home_top_banner_ctas">
                <button
                  type="button"
                  className="home_top_banner_btn home_top_banner_btn_gold"
                  onClick={() => setIsNumerologyOpen(true)}
                >
                  🔢 Calculate My Life Number
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Text/content overlay for fourth banner */}
        {active === 3 && (
          <div className="home_top_banner_overlay">
            <div className="home_top_banner_overlay_inner home_top_banner_overlay_inner_wide">
              <h1 className="home_top_banner_h1">
                Seek Guidance From The <span className="home_top_banner_h1_accent2">Tarot</span>
              </h1>
              <p className="home_top_banner_p">
                Reveal hidden insights about your love, career, and life path through mystical tarot
                cards.
              </p>

              <div className="home_top_banner_cards home_top_banner_cards_2col" aria-label="Highlights">
                <div className="home_top_banner_card">
                  <div className="home_top_banner_card_icon" aria-hidden="true">❤️</div>
                  <div className="home_top_banner_card_title">Relationship confusion?</div>
                </div>
                <div className="home_top_banner_card">
                  <div className="home_top_banner_card_icon" aria-hidden="true">💼</div>
                  <div className="home_top_banner_card_title">Unsure about career decisions?</div>
                </div>
                <div className="home_top_banner_card">
                  <div className="home_top_banner_card_icon" aria-hidden="true">🔮</div>
                  <div className="home_top_banner_card_title">Looking for guidance in life?</div>
                </div>
                <div className="home_top_banner_card">
                  <div className="home_top_banner_card_icon" aria-hidden="true">✨</div>
                  <div className="home_top_banner_card_title">Curious about your future?</div>
                </div>
              </div>

              <div className="home_top_banner_ctas">
                <button
                  type="button"
                  className="home_top_banner_btn home_top_banner_btn_pink"
                  onClick={openTarot}
                >
                  Check your Tarrot sign
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="home_top_banner_track" style={{ transform: `translateX(-${active * 100}%)` }}>
          {slides.map((src, idx) => (
            <div key={idx} className="home_top_banner_slide">
              {/* Two-layer image: background cover (blur) + foreground contain (no crop) */}
              <img
                src={src}
                alt=""
                aria-hidden="true"
                decoding="async"
                className="home_top_banner_img_bg"
              />
              <img
                src={src}
                alt={`Home banner ${idx + 1}`}
                fetchPriority={idx === 0 ? "high" : "auto"}
                decoding="async"
                className="home_top_banner_img_fg"
              />
            </div>
          ))}
        </div>
        <button type="button" className="home_top_banner_arrow home_top_banner_arrow_left" onClick={goPrev} aria-label="Previous banner">
          &#8249;
        </button>
        <button type="button" className="home_top_banner_arrow home_top_banner_arrow_right" onClick={goNext} aria-label="Next banner">
          &#8250;
        </button>
      </section>

      {/* SECTION 0.5: "Are you facing these problems?" */}
      <section className="bg-[#F6F1E6] px-4 py-12 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold tracking-wide text-[#1F5A49] sm:text-3xl">
              ARE YOU FACING THESE{" "}
              <span className="font-extrabold text-pink-600">PROBLEMS</span>{" "}
              {/* Keep layout stable (fixed min width), but keep "?" right after the word */}
              <span
                className="inline-flex align-baseline"
                style={{ minWidth: `${problemWordWidthCh + 2}ch` }}
              >
                <span
                  className={[
                    "font-extrabold text-pink-600 transition-opacity duration-200 uppercase",
                    isProblemWordFading ? "opacity-0" : "opacity-100",
                  ].join(" ")}
                  aria-live="polite"
                >
                  {ROTATING_PROBLEM_WORDS[problemWordIdx]}
                </span>
                <span className="font-extrabold text-pink-600">?</span>
                {/* Spacer to reserve remaining width after the question mark */}
                <span className="flex-1" aria-hidden="true" />
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-[#1F5A49]/80 sm:text-base">
              Many people experience life blocks due to planetary influences. Astrology can help uncover the hidden reasons behind these challenges.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "💼",
                title: "Career Growth Stuck",
                desc: "Working hard but still not getting promotions or growth?",
              },
              {
                icon: "💰",
                title: "Money Blocks",
                desc: "Money comes but doesn’t stay, or savings feel difficult?",
              },
              {
                icon: "💍",
                title: "Marriage Delay",
                desc: "Facing delays in marriage or relationship compatibility issues?",
              },
              {
                icon: "📊",
                title: "Business Problems",
                desc: "Struggling with stability, clients, or consistent growth?",
              },
              {
                icon: "🧿",
                title: "Negative Energy",
                desc: "Feeling heavy vibes, obstacles, or bad luck repeatedly?",
              },
              {
                icon: "❤️",
                title: "Relationship Issues",
                desc: "Misunderstandings, distance, or frequent conflicts?",
              },
              {
                icon: "🩺",
                title: "Health Concerns",
                desc: "Unexplained health worries or low energy?",
              },
              {
                icon: "🧠",
                title: "Life Confusion",
                desc: "Feeling confused about life decisions and future direction?",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl bg-white p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.10)]"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F6F1E6] text-2xl shadow-sm ring-1 ring-black/5">
                  {c.icon}
                </div>
                <div className="mt-4 text-base font-extrabold text-[#1F5A49]">{c.title}</div>
                <div className="mx-auto mt-2 max-w-[22ch] text-sm leading-relaxed text-[#1F5A49]/75">
                  {c.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numerology modal (banner 3 CTA) */}
      {isNumerologyOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close"
            onClick={closeNumerology}
          />
          <div className="relative w-full max-w-xl rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-bold text-[#073349]">Driver & Conductor Number</div>
                <div className="mt-1 text-sm text-gray-600">
                  Enter details to calculate your Numerology numbers.
                </div>
              </div>
              <button
                type="button"
                onClick={closeNumerology}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-[#073349] hover:bg-gray-50"
              >
                Close
              </button>
            </div>

            <form onSubmit={onNumerologySubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-[#073349]">Name</label>
                  <input
                    value={numForm.name}
                    onChange={(e) => setNumForm((p) => ({ ...p, name: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-[#D44459]"
                    placeholder="Enter name"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#073349]">Phone</label>
                  <input
                    value={numForm.phone}
                    onChange={(e) => setNumForm((p) => ({ ...p, phone: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-[#D44459]"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#073349]">Date of birth</label>
                <input
                  type="date"
                  value={numForm.dob}
                  onChange={(e) => setNumForm((p) => ({ ...p, dob: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-[#D44459]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#D44459] px-4 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#B83A4A]"
              >
                Calculate
              </button>
            </form>

            {numResult && (
              <div className="mt-5 rounded-xl bg-[#fff5e5] p-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-white p-3 shadow-sm">
                    <div className="text-xs font-semibold text-gray-600">Driver Number (Psychic/Moolank)</div>
                    <div className="mt-1 text-2xl font-extrabold text-[#073349]">{numResult.driver}</div>
                    <div className="mt-1 text-xs text-gray-600">From your birth day only.</div>
                  </div>
                  <div className="rounded-lg bg-white p-3 shadow-sm">
                    <div className="text-xs font-semibold text-gray-600">Conductor Number (Destiny/Bhagyank)</div>
                    <div className="mt-1 text-2xl font-extrabold text-[#073349]">{numResult.conductor}</div>
                    <div className="mt-1 text-xs text-gray-600">From full date of birth (DDMMYYYY).</div>
                  </div>
                </div>

                <div className="mt-4 text-sm text-[#073349]">
                  <div className="font-semibold">How it works</div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                    <li>
                      <span className="font-semibold">Driver</span>: reduce your birth day to one digit (e.g. 30 → 3+0 = 3).
                    </li>
                    <li>
                      <span className="font-semibold">Conductor</span>: add all digits of DD/MM/YYYY and reduce (e.g. 15/08/1990 → 1+5+0+8+1+9+9+0 = 33 → 3+3 = 6).
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tarot modal (banner 4 CTA) */}
      {isTarotOpen && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close tarot"
            onClick={closeTarot}
          />
          <div className="relative w-full max-w-5xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-4">
              <div className="min-w-0">
                <div className="text-base font-extrabold text-[#073349] sm:text-lg">
                  Your Free Online Tarot Card Reading
                </div>
                <div className="mt-0.5 text-xs text-gray-600 sm:text-sm">
                  Tap the deck, then select <span className="font-semibold">6 cards</span>.
                </div>
              </div>
              <button
                type="button"
                onClick={closeTarot}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-[#073349] hover:bg-gray-50"
              >
                Close
              </button>
            </div>

            <div className="px-5 py-5">
              {tarotStep === "intro" && (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr] lg:items-start">
                  <button
                    type="button"
                    onClick={() => setTarotStep("pick")}
                    className="group relative mx-auto h-[170px] w-[120px] rounded-xl bg-[#0B111B] shadow-lg outline-none ring-offset-2 ring-offset-white focus-visible:ring-2 focus-visible:ring-[#D44459]"
                    aria-label="Open deck"
                  >
                    <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_55%)]" />
                    <div className="absolute inset-0 rounded-xl border border-white/15" />
                    <div className="absolute inset-0 flex items-center justify-center text-white/80">
                      <div className="text-center">
                        <div className="text-xs tracking-widest">TAROT</div>
                        <div className="mt-1 text-lg font-bold">DECK</div>
                      </div>
                    </div>
                    <div className="absolute -bottom-3 left-1/2 w-max -translate-x-1/2 rounded-full bg-[#D44459] px-3 py-1 text-xs font-semibold text-white shadow-md opacity-95 transition group-hover:scale-[1.03]">
                      Tap to start
                    </div>
                  </button>

                  <div className="rounded-2xl bg-[#fff5e5] p-4 sm:p-5">
                    <div className="text-sm font-bold text-[#073349]">
                      LT&apos;s World Famous Universal 6 Card Spread
                    </div>
                    <div className="mt-1 text-xs text-gray-700 sm:text-sm">
                      Select 6 cards to get a snapshot of how things are with you right now.
                    </div>
                    <ol className="mt-3 list-decimal space-y-1 pl-5 text-xs text-gray-700 sm:text-sm">
                      <li>How you feel about yourself now</li>
                      <li>What you most want right now</li>
                      <li>Your fears</li>
                      <li>What is going for you</li>
                      <li>What is going against you</li>
                      <li>The outcome</li>
                    </ol>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setTarotDeck(shuffleArray(TAROT_CARDS));
                          setTarotSelectedIds([]);
                        }}
                        className="rounded-lg border border-[#073349]/20 bg-white px-3 py-2 text-xs font-semibold text-[#073349] hover:bg-gray-50"
                      >
                        Shuffle again
                      </button>
                      <button
                        type="button"
                        onClick={() => setTarotStep("pick")}
                        className="rounded-lg bg-[#D44459] px-3 py-2 text-xs font-semibold text-white hover:bg-[#B83A4A]"
                      >
                        Select 6 cards
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {tarotStep === "pick" && (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-[#073349]">
                      Selected: <span className="font-extrabold">{tarotSelectedIds.length}</span>/6
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setTarotDeck(shuffleArray(TAROT_CARDS));
                          setTarotSelectedIds([]);
                        }}
                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-[#073349] hover:bg-gray-50"
                      >
                        Shuffle
                      </button>
                      <button
                        type="button"
                        disabled={tarotSelectedIds.length !== 6}
                        onClick={() => {
                          setTarotStep("analyzing");
                          window.setTimeout(() => setTarotStep("results"), 1200);
                        }}
                        className="rounded-lg bg-[#D44459] px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#B83A4A] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Get My Reading
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 overflow-hidden pb-2">
                    {/* Overlapped deck row (fit all cards in one view) */}
                    <div className="flex w-full items-center justify-center px-1">
                      {tarotDeck.map((card, cardIdx) => {
                        const picked = tarotSelectedIds.includes(card.id);
                        return (
                          <button
                            key={card.id}
                            type="button"
                            onClick={() => toggleTarotPick(card.id)}
                            className={[
                              "relative h-[132px] w-[92px] rounded-xl shadow-md transition sm:h-[140px] sm:w-[98px]",
                              picked
                                ? "bg-[#0B111B] ring-2 ring-[#D44459] -translate-y-1 z-[2]"
                                : "bg-[#0B111B] hover:-translate-y-1 hover:shadow-lg z-[1]",
                            ].join(" ")}
                            aria-pressed={picked}
                            style={{ marginLeft: cardIdx === 0 ? 0 : "-70px" }}
                          >
                            {/* always show card back; reveal only in results */}
                            <div className="absolute inset-0 rounded-xl border border-white/15" />
                            <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_55%)]" />
                            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold tracking-widest text-white/70">
                              TAROT
                            </div>
                            {picked && (
                              <div className="absolute right-2 top-2 rounded-full bg-[#D44459] px-2 py-1 text-[10px] font-extrabold text-white">
                                ✓
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {tarotSelectedIds.length > 0 && (
                    <div className="mt-5 rounded-2xl bg-[#fff5e5] p-4">
                      <div className="text-sm font-bold text-[#073349]">Selected cards</div>
                      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                        {tarotSelectedIds.map((id) => {
                          return (
                            <div key={id} className="rounded-xl bg-white p-3 shadow-sm">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-8 rounded-lg bg-[#0B111B] shadow-sm">
                                  <div className="h-full w-full rounded-lg bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.16),transparent_55%)]" />
                                </div>
                                <div className="text-xs font-semibold text-[#073349]">Selected</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {tarotStep === "analyzing" && (
                <div className="rounded-2xl bg-[#fff5e5] p-6 text-center">
                  <div className="text-lg font-extrabold text-[#073349]">Analyzing your cards…</div>
                  <div className="mt-2 text-sm text-gray-700">
                    We’re preparing your 6-card spread. Please wait a moment.
                  </div>
                  <div className="mx-auto mt-5 h-2 w-full max-w-sm overflow-hidden rounded-full bg-white">
                    <div className="h-full w-1/2 animate-[tathaastu_tarotbar_1.2s_ease-in-out_infinite] rounded-full bg-[#D44459]" />
                  </div>
                  <style>{`
                    @keyframes tathaastu_tarotbar { 
                      0%{ transform: translateX(-60%);} 
                      50%{ transform: translateX(60%);} 
                      100%{ transform: translateX(-60%);} 
                    }
                    .animate-\\[tathaastu_tarotbar_1\\.2s_ease-in-out_infinite\\] { 
                      animation-name: tathaastu_tarotbar; 
                    }
                  `}</style>
                </div>
              )}

              {tarotStep === "results" && (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-sm font-bold text-[#073349]">Your Tarot Reading</div>
                    <button
                      type="button"
                      onClick={() => {
                        setTarotStep("pick");
                        setTarotSelectedIds([]);
                        setTarotDeck(shuffleArray(TAROT_CARDS));
                      }}
                      className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-[#073349] hover:bg-gray-50"
                    >
                      Start again
                    </button>
                  </div>

                  {/* Selected cards row (revealed) */}
                  <div className="mt-4 overflow-x-auto pb-2">
                    <div className="flex min-w-max gap-3">
                      {tarotSelectedIds.map((id) => {
                        const card = TAROT_CARDS.find((c) => c.id === id);
                        return (
                          <div key={id} className="w-[210px] rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                            <div className="text-xs font-semibold text-gray-500">Card</div>
                            <div className="mt-1 text-base font-extrabold text-[#073349]">{card?.name}</div>
                            <div className="mt-2 text-sm text-gray-700">{card?.meaning}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {tarotSelectedIds.map((id, idx) => {
                      const card = TAROT_CARDS.find((c) => c.id === id);
                      const interpretation = interpretTarot(card, idx);
                      return (
                        <div key={id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                          <div className="text-xs font-semibold text-gray-500">{interpretation.position}</div>
                          <div className="mt-1 text-lg font-extrabold text-[#073349]">{card?.name}</div>
                          <div className="mt-2 text-sm text-gray-700">{interpretation.text}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 1: Solar hero — ready to re-enable later */}
      {/* <SolarHero /> */}

       <div className="flex justify-center my-4">
                <img src={HOMESEPERATOR} alt="Separator" className="h-12" />
              </div>

      {/* SECTION 2: Chakra Section */}
      {/* <div className="flex flex-col md:flex-row items-start justify-between px-10 md:px-20 py-8 gap-10 bg-white">

      
        <div className="flex-shrink-0 pr-24 flex-col">
             <h2 className="text-2xl md:text-3xl font-semibold">
            <span className="text-green-900">FROM </span>
            <span className="text-pink-600 font-bold">CHARTS TO CHAKRAS - </span>
            <div className="text-green-900"> EVERYTHING YOU NEED</div>
          </h2>
          <img
            src={ChakraWithLotus}
            alt="Chakra"
            className="w-[900px] h-auto rounded-full block"
          />

        </div>

       
        <div className="max-w-2xl space-y-6 "  >
          <p className="text-gray-700 text-xl">
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry. Lorem ipsum has been the industry’s standard dummy text ever
            since the 1500s.
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry. Lorem ipsum has been the industry’s standard dummy text ever
            since the 1500s.
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry. Lorem ipsum has been the industry’s standard dummy text ever
            since the 1500s.
           
          </p>

          
          <div className="grid grid-cols-2 gap-8 bg-[#fff5e5] py-8 px-4 rounded-3xl shadow-md text-sm">
            <div className="flex items-center gap-2">
              <span><img
            src={AIPowerIcon}
            alt="Chakra"
            className="w-[50px] rounded-full "
          /></span>
              <span className="font-semibold text-green-800">AI-POWERED INSIGHTS</span>
            </div>
            <div className="flex items-center gap-2">
              <span><img
            src={AuthenticIcon}
            alt="Chakra"
            className="w-[50px] rounded-full "
          /></span>
              <span className="font-semibold text-pink-700">AUTHENTIC REMEDIES</span>
            </div>
            <div className="flex items-center gap-2">
              <span><img
            src={ExpertIcon}
            alt="Chakra"
            className="w-[50px] rounded-full "
          /></span>
              <span className="font-semibold text-red-600">EXPERT-BACKED CONSULTATIONS</span>
            </div>
            <div className="flex items-center gap-2">
              <span><img
            src={PERSONALISEDIcon}
            alt="Chakra"
            className="w-[50px] rounded-full "
          /></span>
              <span className="font-semibold text-green-600">PERSONALIZED SPIRITUAL GROWTH</span>
            </div>
          </div>

          <button className="mt-4 text-2xl bg-[#d05a69] hover:bg-rose-600 text-white font-semibold py-2 px-12 rounded-full transition duration-300">
            LEARN MORE
          </button>
        </div>
      </div> */}

      {/* <div className="flex flex-col md:flex-row items-start justify-between px-10 md:px-20 py-8 gap-10 bg-white overflow-hidden">

 
  <div className="flex-shrink-0 flex-col relative">
    <h2 className="text-2xl md:text-3xl font-semibold mb-4">
      <span className="text-green-900">FROM </span>
      <span className="text-pink-600 font-bold">CHARTS TO CHAKRAS - </span>
      <div className="text-green-900"> EVERYTHING YOU NEED</div>
    </h2>

   
    <div className="relative w-[800px] h-auto -ml-80">
      <img
        src={ChakraWithLotus}
        alt="Chakra with Lotus"
        className="w-full h-auto rounded-full"
      />
    </div>
  </div>

 
  <div className="max-w-2xl space-y-6">
    <p className="text-gray-700 text-xl">
      Lorem ipsum is simply dummy text of the printing and typesetting
      industry. Lorem ipsum has been the industry’s standard dummy text ever
      since the 1500s. Lorem ipsum is simply dummy text of the printing and
      typesetting industry. Lorem ipsum has been the industry’s standard dummy
      text ever since the 1500s.
    </p>

    
    <div className="grid grid-cols-2 gap-8 bg-[#fff5e5] py-8 px-4 rounded-3xl shadow-md text-sm">
      <div className="flex items-center gap-2">
        <img src={AIPowerIcon} alt="AI Power" className="w-[50px] rounded-full" />
        <span className="font-semibold text-green-800">AI-POWERED INSIGHTS</span>
      </div>
      <div className="flex items-center gap-2">
        <img src={AuthenticIcon} alt="Authentic Remedies" className="w-[50px] rounded-full" />
        <span className="font-semibold text-pink-700">AUTHENTIC REMEDIES</span>
      </div>
      <div className="flex items-center gap-2">
        <img src={ExpertIcon} alt="Expert" className="w-[50px] rounded-full" />
        <span className="font-semibold text-red-600">EXPERT-BACKED CONSULTATIONS</span>
      </div>
      <div className="flex items-center gap-2">
        <img src={PERSONALISEDIcon} alt="Personalized" className="w-[50px] rounded-full" />
        <span className="font-semibold text-green-600">PERSONALIZED SPIRITUAL GROWTH</span>
      </div>
    </div>

    
    <button className="mt-4 text-2xl bg-[#d05a69] hover:bg-rose-600 text-white font-semibold py-2 px-12 rounded-full transition duration-300">
      LEARN MORE
    </button>
  </div>
</div> */}

<div className="flex flex-col gap-10 overflow-x-visible bg-white px-4 py-10 sm:px-8 md:flex-row md:items-start md:justify-between md:px-12 lg:px-16 xl:px-20">
  {/* Square frame + object-contain: shows full video frame (circle) without clipping */}
  <div className="flex w-full min-w-0 flex-col md:max-w-[min(100%,640px)]">
    <h2 className="mb-4 text-2xl font-semibold leading-snug md:text-3xl">
      <span className="text-green-900">FROM </span>
      <span className="font-bold text-pink-600">CHARTS TO CHAKRAS - </span>
      <div className="text-green-900"> EVERYTHING YOU NEED</div>
    </h2>

    <div className="flex w-full justify-center md:justify-start">
      <div className="w-full max-w-full rounded-2xl bg-slate-50 p-3 shadow-sm ring-1 ring-slate-100 sm:p-4">
        <div className="relative mx-auto aspect-square w-full max-w-[min(100%,min(85vw,640px))]">
          <img
            src={ChakraImg}
            alt="Charts to Chakras"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain object-center"
          />
        </div>
      </div>
    </div>
  </div>

  {/* Content Section */}
  <div className="min-w-0 max-w-2xl flex-1 space-y-6">
    <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
     The cosmos are with you. And, it's your time to seek wisdom from ancient Indian sciences and Unlock Your Destiny.
    </p>
    <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
     At Tathasstu, we are here with timeless practices that heal, empower, and guide you. From online astrology services to Vaastu and crystal healing to aura scanning, our team of experts helps you awaken your purpose and connect you with your higher self.
    </p>

    {/* Features Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#fff5e5] py-8 px-6 rounded-3xl shadow-md text-sm">
      <div className="flex items-center gap-3">
        <img src={AIPowerIcon} alt="AI Power" loading="lazy" decoding="async" className="w-10 h-10 rounded-full" />
       <div className="flex flex-col gap-2">
         <span className="font-semibold text-green-800">Real Guidance by Verified Astrologers</span>
        <span className="font-semibold text-green-800">We have a community of — + best astrologers who provide you with real-time predictions.</span>
       </div>
      </div>
      <div className="flex items-center gap-3">
        <img src={AuthenticIcon} alt="Authentic Remedies" loading="lazy" decoding="async" className="w-10 h-10 rounded-full" />
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-pink-700">100% Safe & Secure</span>
        <span className="font-semibold text-pink-700">Your personal information & privacy are 100% protected with us.</span>
       </div>
       
      </div>
      <div className="flex items-center gap-3">
        <img src={ExpertIcon} alt="Expert" loading="lazy" decoding="async" className="w-10 h-10 rounded-full" />
         <div className="flex flex-col gap-2">
          <span className="font-semibold text-red-600">Accurate and Personalised Predictions</span>
          <span className="font-semibold text-red-600">Every report and consultation is based on your unique birth details and current planetary alignments from — + years of experienced astrologers.</span>
       </div>
        
      </div>
      <div className="flex items-center gap-3">
        <img src={PERSONALISEDIcon} alt="Personalized" loading="lazy" decoding="async" className="w-10 h-10 rounded-full" />
        <div className="flex flex-col gap-2">
           <span className="font-semibold text-green-600">24/7 Available</span>
            <span className="font-semibold text-green-600">We are 24/7 available. You can connect with experts anytime via call or chat.</span>
       </div>
      
      </div>
    </div>

    {/* Button */}
    <button 
      onClick={openModal}
      className="mt-4 text-xl md:text-2xl bg-[#d05a69] hover:bg-rose-600 text-white font-semibold py-2 px-10 md:px-12 rounded-full transition duration-300"
    >
      Get a prediction
    </button>
  </div>
</div>

    </div>
  );
};

export default AstrologyHome;


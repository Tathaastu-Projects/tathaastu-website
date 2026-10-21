import astrologyKundli from "../assets/services/Astrology- Kundli.png";
import vastuForHome from "../assets/services/Vastu shastra.png";
import vedicAstrology from "../assets/Asstrology.jpeg";
import numerologist from "../assets/services/Numerologist.png";
import poojaServices from "../assets/services/Pooja Service.png";
import horoscopeMatching from "../assets/services/Horoscope matching.png";
import tarotReading from "../assets/services/Tarot Reading.png";
import crystalHealing from "../assets/services/Crystal Healing.png";
import petHealing from "../assets/services/Pet Healing.png";
import dowsing from "../assets/services/Dowsing.png";
import auraHealing from "../assets/services/Aura Healing.png";

// Use new provided images for Service Details hero banners as well.
import astrologyKundliBanner from "../assets/AStrology kundli.jpg";
import vastuForHomeBanner from "../assets/Vastu Astrology.jpg";
import vedicAstrologyBanner from "../assets/Asstrology.jpeg";
import numerologistBanner from "../assets/Numerology.jpg";
import poojaServicesBanner from "../assets/Number.jpeg";
import horoscopeMatchingBanner from "../assets/Horoscope Guidance.jpg";
import tarotReadingBanner from "../assets/Tarot Reading.jpg";
import crystalHealingBanner from "../assets/Crystal Healing.jpg";
import petHealingBanner from "../assets/Pet healing.jpeg";
import dowsingBanner from "../assets/dowsing.jpg";
import auraHealingBanner from "../assets/Aura Healing & Scanning.jpg";

const servicesDataUnsorted = [
  {
    id: "astrology-kundli",
    slug: "astrology-kundli",
    title: "Astrology - Kundli",
    description:
      "Discover your life's true path with personalized Kundli readings that decode your destiny through planetary positions and cosmic alignment.",
    image: astrologyKundli,
    banner: astrologyKundliBanner,
    startingPrice: 3100,
    bannerText: "Find Clarity, Direction, And Answers Through Personalized Astrology",
    h1Title: "Personalized Astrology Consultation",
    longDescription:
      "At Tathaastu, our Astrology Consultation helps you understand the deeper patterns shaping your life. Using your birth chart, planetary positions, and cosmic energies, we decode insights about career, relationships, finance, health, and personal growth. Whether you're seeking direction or clarity during a transition, our astrologers provide practical, actionable guidance, not just predictions. Every session is tailored to your unique journey, helping you make confident decisions aligned with your purpose. Discover the wisdom the stars hold for you.",
    whyChooseUs: [
      "Experienced Astrologers with deep knowledge of Vedic principles",
      "Accurate, personalized readings based on your individual birth chart",
      "Practical guidance you can apply to everyday life",
      "Holistic approach combining intuition, expertise & spiritual insights",
      "Confidential and comforting consultation experience",
    ],
    contactUsText: "Have questions about your life? Reach out to us and book your astrology session today.",
    contactButtonText: "Contact Now",
    otherServices: [
      "Vaastu Consultation",
      "Vedic Astrology",
      "Numerologists",
      "Pooja Services",
      "Horoscope Matching",
      "Tarot Reading",
      "Crystal Healing",
      "Pet Healing",
      "Dowsing",
      "Aura Healing & Scanning",
    ],
  },
  {
    id: "vastu-shastra",
    slug: "vastu-shastra",
    title: "Vastu Shastra",
    description:
      "Bring balance and prosperity to every space with expert Vaastu guidance designed to harmonize energy, direction, and purpose—for homes, factories, offices, and plots.",
    image: vastuForHome,
    banner: vastuForHomeBanner,
    startingPrice: 5100,
    bannerText: "Create Harmony, Balance, And Positive Energy In Every Space You Live Or Work In",
    h1Title: "Vaastu Consultation",
    longDescription:
      "At Tathaastu, our Vastu Shastra consultation helps you bring peace, prosperity, and balance into your surroundings. Whether you're planning a new home, setting up an office, buying a plot, or improving the energy of your existing space, we guide you with practical and easy-to-apply Vastu solutions. We study the layout, directions, and energy flow of your space to recommend changes that support success, health, and overall well-being. No major renovations, just simple, effective corrections that make a big difference in how you feel and live.",
    whyChooseUs: [
      "Expert Vastu Specialists - Experienced in homes, offices, factories, and plots.",
      "Simple Remedies - Easy corrections without demolition.",
      "Accurate Assessment - On-site or online Vastu evaluation.",
      "Personalized Guidance - Suggestions based on your space and goals.",
      "Positive Energy Flow - Improving harmony, comfort, and prosperity.",
    ],
    contactUsText: "Want a balanced and positive space? Get in touch with us for a personalized Vastu consultation today.",
    contactButtonText: "Contact Now",
    otherServices: [
      "Astrology Consultation",
      "Vedic Astrology",
      "Numerologists",
      "Pooja Services",
      "Horoscope Matching",
      "Tarot Reading",
      "Crystal Healing",
      "Pet Healing",
      "Dowsing",
      "Aura Healing & Scanning",
    ],
  },
  {
    id: "vedic-astrology",
    slug: "vedic-astrology",
    title: "Vedic Astrology",
    description:
      "Explore the timeless wisdom of the stars through Vedic Astrology — uncovering karmic patterns, strengths, and life lessons written in your chart.",
    image: vedicAstrology,
    banner: vedicAstrologyBanner,
    startingPrice: 4100,
    bannerText: "Understand Your Life's Path With The Timeless Wisdom Of Vedic Astrology",
    h1Title: "Vedic Astrology Consultation",
    longDescription:
      "At Tathaastu, our Vedic Astrology sessions help you understand what's shaping your life and how you can move forward with confidence. By studying your birth chart, planetary positions, and the ancient principles of Jyotish Shastra, we offer insights into career, relationships, health, finances, and personal growth. The goal is not just prediction, it's clarity, understanding, and practical guidance. Every reading is warm, honest, and completely personalized to your situation. If you're searching for answers or direction, Vedic Astrology can bring meaningful clarity to your journey.",
    whyChooseUs: [
      "Experienced Vedic Astrologers - Guidance based on authentic Jyotish principles.",
      "Clear & Practical Insights - Easy-to-understand explanations you can use in daily life.",
      "Personalized Birth Chart Reading - Every session is tailored to your unique chart and life path.",
      "Supportive & Honest Guidance - We help you navigate challenges with clarity and confidence.",
      "Confidential Sessions - Your concerns and details stay completely private.",
    ],
    contactUsText: "Looking for direction or clarity? Reach out today and book your Vedic Astrology session.",
    contactButtonText: "Contact Now",
    otherServices: [
      "Astrology Consultation",
      "Vaastu Consultation",
      "Numerologists",
      "Pooja Services",
      "Horoscope Matching",
      "Tarot Reading",
      "Crystal Healing",
      "Pet Healing",
      "Dowsing",
      "Aura Healing & Scanning",
    ],
  },
  {
    id: "numerologists",
    slug: "numerologists",
    title: "Numerologists",
    description:
      "Decode the hidden power of numbers that shape your destiny, guiding you toward better decisions in relationships, career, and life purpose.",
    image: numerologist,
    banner: numerologistBanner,
    startingPrice: 2600,
    bannerText: "Decode The Numbers That Shape Your Personality, Choices, And Life Path",
    h1Title: "Numerology Consultation",
    longDescription:
      "At Tathaastu, our Numerology consultation helps you understand how the numbers in your life influence your personality, decisions, opportunities, and challenges. By studying your date of birth and name, we uncover patterns that offer clarity about career, relationships, strengths, and life purpose. Numerology isn't about prediction; it's about self-awareness and direction. Every session is friendly, easy to follow, and tailored to your current situation. If you're looking for guidance that feels personal and meaningful, Numerology can help you see your journey from a fresh perspective.",
    whyChooseUs: [
      "Experienced Numerologists - Skilled experts who decode your numbers with accuracy and clarity.",
      "Simple, Clear Explanations - Easy to understand, no complex terminology.",
      "Personalized Reports - Insights based on your name, date of birth, and life patterns.",
      "Guidance for Real-Life Decisions - Support for career, relationships, and personal growth.",
      "Comforting & Confidential Sessions - A safe space to share, explore, and understand your path.",
    ],
    contactUsText: "Curious about what your numbers say about you? Reach out to us and book your Numerology session today.",
    contactButtonText: "Contact Now",
    otherServices: [
      "Astrology Consultation",
      "Vaastu Consultation",
      "Vedic Astrology",
      "Pooja Services",
      "Horoscope Matching",
      "Tarot Reading",
      "Crystal Healing",
      "Pet Healing",
      "Dowsing",
      "Aura Healing & Scanning",
    ],
  },
  {
    id: "pooja-services",
    slug: "pooja-services",
    title: "Pooja Services",
    description:
      "Invoke divine blessings and positive vibrations with authentic, personalized puja rituals performed by learned and trusted priests.",
    image: poojaServices,
    banner: poojaServicesBanner,
    startingPrice: 3500,
    bannerText: "Bring Peace, Blessings, And Divine Energy Into Your Home With Personalised Pooja Services",
    h1Title: "Pooja Services",
    longDescription:
      "At Tathaastu, our Pooja Services are designed to help you invite harmony, positivity, and divine blessings into your life. Whether it's a home Pooja, office Pooja, Griha Pravesh, havan, or any special ritual, we guide you with authentic procedures rooted in tradition. Each ceremony is performed with devotion, clarity, and the right Vedic practices. We make sure your Pooja experience is smooth, meaningful, and aligned with your purpose, whether you seek prosperity, protection, peace, or spiritual growth. Let us help you create a sacred atmosphere filled with divine grace.",
    whyChooseUs: [
      "Experienced Priests & Pandits - Trained in authentic Vedic rituals and ceremonies.",
      "Customised Pooja Services - For homes, offices, new beginnings, and special occasions.",
      "Hassle-Free Arrangements - We guide you with the required items and preparations.",
      "Meaningful & Peaceful Rituals - Performed with devotion and proper chanting.",
      "Positive Energy & Blessings - Creating an environment of peace, purity, and spiritual harmony.",
    ],
    contactUsText: "Planning a Pooja ceremony? Reach out today to book your personalized Pooja service.",
    contactButtonText: "Contact Now",
    otherServices: [
      "Astrology Consultation",
      "Vaastu Consultation",
      "Vedic Astrology",
      "Numerology Consultation",
      "Horoscope Matching",
      "Tarot Reading",
      "Crystal Healing",
      "Pet Healing",
      "Dowsing",
      "Aura Healing & Scanning",
    ],
  },
  {
    id: "horoscope-matching",
    slug: "horoscope-matching",
    title: "Horoscope Matching",
    description:
      "Find your perfect life partner with precise horoscope matching based on planetary compatibility and karmic harmony.",
    image: horoscopeMatching,
    banner: horoscopeMatchingBanner,
    startingPrice: 2800,
    bannerText: "Find Harmony, Compatibility, And Confidence For Your Future Together",
    h1Title: "Horoscope Matching",
    longDescription:
      "At Tathaastu, our Horoscope Matching service helps couples understand their compatibility before taking the next big step. Using traditional Kundli matching methods, we evaluate emotional, mental, and spiritual alignment between partners. This process offers clarity about harmony, strengths, challenges, and long-term stability in the relationship. Our aim is not to create fear but to provide honest, balanced guidance that supports a happy and peaceful married life. Whether you're planning to get engaged or simply want to understand your compatibility better, we're here to offer gentle and meaningful insights.",
    whyChooseUs: [
      "Accurate Kundli Matching - Based on authentic Vedic principles and detailed compatibility factors.",
      "Clear & Practical Guidance - Simple explanations without complicated terminology.",
      "Personalized Insights - Understanding strengths, challenges, and relationship dynamics.",
      "Non-Judgmental & Supportive Approach - We guide you with warmth, clarity, and neutrality.",
      "Confidential & Trustworthy - All information remains private and handled with care.",
    ],
    contactUsText: "Planning your future together? Get in touch to book your Horoscope Matching session today.",
    contactButtonText: "Contact Now",
    otherServices: [
      "Astrology Consultation",
      "Vaastu Consultation",
      "Vedic Astrology",
      "Numerology Consultation",
      "Pooja Services",
      "Tarot Reading",
      "Crystal Healing",
      "Pet Healing",
      "Dowsing",
      "Aura Healing & Scanning",
    ],
  },
  {
    id: "tarot-reading",
    slug: "tarot-reading",
    title: "Tarot Reading",
    description:
      "Gain clarity and insight into life's questions through intuitive tarot readings that connect you with your inner wisdom.",
    image: tarotReading,
    banner: tarotReadingBanner,
    startingPrice: 2300,
    bannerText: "Get Clarity, Guidance, And Answers Through Intuitive Tarot Insights",
    h1Title: "Tarot Reading",
    longDescription:
      "At Tathaastu, our Tarot Reading sessions help you understand your current situation with clarity and confidence. Whether you're facing confusion in relationships, work, decisions, or life direction, the cards reveal the energies surrounding you and what they're guiding you toward. Tarot doesn't tell you what will happen; it helps you see what's possible, what needs attention, and how you can move forward wisely. Every reading is warm, intuitive, and tailored to your questions. If you're seeking honest guidance without judgment, Tarot can offer the clarity your mind is looking for.",
    whyChooseUs: [
      "Intuitive & Experienced Readers - Guidance based on deep intuition and clarity.",
      "Clear, Straightforward Messages - No confusing interpretations—just simple insights.",
      "Personalized Readings - Every session is shaped around your questions and energy.",
      "Supportive & Non-Judgmental - A safe space to explore your concerns openly.",
      "Actionable Guidance - Helps you make clear and confident decisions.",
    ],
    contactUsText: "Have questions on your mind? Book your Tarot Reading session with us today.",
    contactButtonText: "Contact Now",
    otherServices: [
      "Astrology Consultation",
      "Vaastu Consultation",
      "Vedic Astrology",
      "Numerology Consultation",
      "Pooja Services",
      "Horoscope Matching",
      "Crystal Healing",
      "Pet Healing",
      "Dowsing",
      "Aura Healing & Scanning",
    ],
  },
  {
    id: "crystal-healing",
    slug: "crystal-healing",
    title: "Crystal Healing",
    description:
      "Experience energetic balance and emotional healing with crystals that channel positivity, calmness, and transformation.",
    image: crystalHealing,
    banner: crystalHealingBanner,
    startingPrice: 2700,
    bannerText: "Heal, Balance, And Restore Your Energy With The Power Of Natural Crystals",
    h1Title: "Crystal Healing",
    longDescription:
      "At Tathaastu, our Crystal Healing sessions help you release emotional blockages, calm your mind, and restore energetic balance using the natural vibrations of healing crystals. Each crystal carries its own unique energy; some bring peace, some boost confidence, while others help with grounding, clarity, or emotional healing. In your session, we choose crystals based on what you're currently experiencing and gently guide your energy toward harmony. Crystal Healing is non-invasive, soothing, and deeply relaxing. If you're seeking emotional relief, inner peace, or a fresh, energetic start, this experience can bring meaningful comfort.",
    whyChooseUs: [
      "Certified Crystal Healers - Experienced practitioners who understand crystal energy deeply",
      "Personalized Healing Sessions - Crystals chosen based on your emotions, needs, and intentions",
      "Gentle & Relaxing Experience - A calming session that helps release stress and negativity",
      "Holistic Approach - Supports emotional balance, mental clarity, and spiritual alignment",
      "Safe & Natural Method - A peaceful way to heal without any side effects",
    ],
    contactUsText: "Need emotional balance or energetic healing? Book your Crystal Healing session today.",
    contactButtonText: "Contact Now",
    otherServices: [
      "Astrology Consultation",
      "Vaastu Consultation",
      "Vedic Astrology",
      "Numerology Consultation",
      "Pooja Services",
      "Horoscope Matching",
      "Tarot Reading",
      "Pet Healing",
      "Dowsing",
      "Aura Healing & Scanning",
    ],
  },
  {
    id: "pet-healing",
    slug: "pet-healing",
    title: "Pet Healing",
    description:
      "Heal your furry companions with gentle energy therapy that restores their emotional and physical well-being.",
    image: petHealing,
    banner: petHealingBanner,
    startingPrice: 2500,
    bannerText: "Comfort, Calm, And Healing Energy For Your Beloved Pets",
    h1Title: "Pet Healing",
    longDescription:
      "At Tathaastu, our Pet Healing sessions focus on bringing comfort, balance, and emotional relief to animals using gentle energy-healing techniques. Pets, just like humans, can experience stress, anxiety, fear, or physical discomfort. Through calming energy work, we help them feel safe, relaxed, and supported. Each session is carried out with love, patience, and deep sensitivity to the pet's energy and behavior. Whether your pet is recovering, feeling anxious, or simply needs emotional support, Pet Healing offers a peaceful way to improve their overall well-being.",
    whyChooseUs: [
      "Loving & Experienced Healers - Trained in gentle, animal-friendly energy practices.",
      "Calm & Safe Environment - Sessions are designed to make your pet feel completely at ease.",
      "Tailored Healing Approach - Based on your pet's needs, emotions, and behavior.",
      "Helps with Stress & Anxiety - Supports emotional balance and relaxation.",
      "Holistic & Non-Invasive - A soothing method with no discomfort or side effects.",
    ],
    contactUsText: "Want your pet to feel calm and supported? Reach out to book a Pet Healing session today.",
    contactButtonText: "Contact Now",
    otherServices: [
      "Astrology Consultation",
      "Vaastu Consultation",
      "Vedic Astrology",
      "Numerology Consultation",
      "Pooja Services",
      "Horoscope Matching",
      "Tarot Reading",
      "Crystal Healing",
      "Dowsing",
      "Aura Healing & Scanning",
    ],
  },
  {
    id: "dowsing",
    slug: "dowsing",
    title: "Dowsing",
    description:
      "Access intuitive guidance and detect subtle energies using pendulum dowsing — a sacred art for clarity and balance.",
    image: dowsing,
    banner: dowsingBanner,
    startingPrice: 2200,
    bannerText: "Find Clarity, Answers, And Energetic Guidance Through Intuitive Dowsing",
    h1Title: "Dowsing",
    longDescription:
      "At Tathaastu, our Dowsing sessions help you receive clear answers and guidance when you're unsure or stuck. Using a pendulum, we tap into subtle energy responses to understand what's right for you, whether it's related to health, emotions, decisions, relationships, or energy blockages. Dowsing is simple, safe, and surprisingly insightful. It doesn't force outcomes; instead, it gently reveals what your energy is aligned with. If you're seeking quick clarity, direction, or deeper understanding in any area of life, dowsing can offer accurate and supportive guidance.",
    whyChooseUs: [
      "Skilled Dowsing Practitioners - Experienced in reading energetic responses with clarity.",
      "Quick & Clear Answers - Get straightforward guidance when you're feeling unsure.",
      "Personalized Sessions - Focused on your current questions and concerns.",
      "Helps Identify Energy Blocks - Reveals what may be holding you back.",
      "Safe & Non-Invasive - A gentle method that supports emotional and energetic clarity.",
    ],
    contactUsText: "Need clarity or quick guidance? Book your Dowsing session with us today.",
    contactButtonText: "Contact Now",
    otherServices: [
      "Astrology Consultation",
      "Vaastu Consultation",
      "Vedic Astrology",
      "Numerology Consultation",
      "Pooja Services",
      "Horoscope Matching",
      "Tarot Reading",
      "Crystal Healing",
      "Pet Healing",
      "Aura Healing & Scanning",
    ],
  },
  {
    id: "aura-healing-scanning",
    slug: "aura-healing-scanning",
    title: "Aura Healing & Scanning",
    description:
      "Understand and cleanse your energy field with aura scanning sessions that reveal, heal, and strengthen your spiritual vibration.",
    image: auraHealing,
    banner: auraHealingBanner,
    startingPrice: 2900,
    bannerText: "Understand Your Energy Field And Restore Balance With Gentle Aura Healing",
    h1Title: "Aura Healing & Scanning",
    longDescription:
      "At Tathaastu, our Aura Healing & Scanning sessions help you understand the energy surrounding your body and how it affects your emotions, thoughts, and overall well-being. By scanning your aura, we identify blockages, stress points, and areas where your energy feels heavy or imbalanced. Once these areas are understood, we gently cleanse and heal your energy field, helping you feel lighter, calmer, and more aligned. If you've been feeling emotionally drained, stuck, or disconnected, aura healing can bring clarity, relief, and a renewed sense of inner balance.",
    whyChooseUs: [
      "Experienced Energy Healers - Skilled in identifying and clearing aura imbalances.",
      "Accurate Aura Scanning - Reveals emotional blocks and areas needing attention.",
      "Gentle & Effective Healing - Calms your mind and restores energetic harmony.",
      "Personalized Approach - Healing tailored to your emotional and spiritual state.",
      "Promotes Inner Peace - Helps you feel lighter, clearer, and more centered.",
    ],
    contactUsText: "Feeling energetically drained or stressed? Book your Aura Healing & Scanning session today.",
    contactButtonText: "Contact Now",
    otherServices: [
      "Astrology Consultation",
      "Vaastu Consultation",
      "Vedic Astrology",
      "Numerology Consultation",
      "Pooja Services",
      "Horoscope Matching",
      "Tarot Reading",
      "Crystal Healing",
      "Pet Healing",
      "Dowsing",
    ],
  },
];

// Card order for Home/Services listings (user-requested priority first).
const SERVICE_ORDER = [
  "dowsing",
  "aura-healing-scanning",
  "astrology-kundli",
  "vastu-shastra",
  "numerologists",
  "pooja-services",
  "tarot-reading",
  "horoscope-matching",
  "crystal-healing",
  // everything else follows (e.g. vedic-astrology, pet-healing)
];

const serviceOrderIndex = new Map(SERVICE_ORDER.map((id, idx) => [id, idx]));

const servicesData = [...servicesDataUnsorted].sort((a, b) => {
  const ai = serviceOrderIndex.has(a.id) ? serviceOrderIndex.get(a.id) : Number.MAX_SAFE_INTEGER;
  const bi = serviceOrderIndex.has(b.id) ? serviceOrderIndex.get(b.id) : Number.MAX_SAFE_INTEGER;
  if (ai !== bi) return ai - bi;
  return 0;
});

export default servicesData;


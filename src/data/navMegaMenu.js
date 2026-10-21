/**
 * Top nav for Tathaastu.
 * Column order matches the Nav Bar sheet: Home, Services, Free Reports,
 * Consultation, About Us, Abhimantrit Store.
 * Empty items means a direct link with no dropdown.
 */
export const NAV_MEGA_MENUS = [
  {
    id: "home",
    label: "Home",
    accent: "#073349",
    tint: "#F4F7F8",
    path: "/",
    items: [],
  },
  {
    id: "services",
    label: "Services",
    accent: "#C9A227",
    tint: "#FBF6E8",
    path: "/services",
    items: [
      { name: "Kundli", path: "/services/astrology-kundli" },
      { name: "Vaastu", path: "/services/vastu-shastra" },
      { name: "Numerology", path: "/services/numerologists" },
      { name: "Pooja Services", path: "/services/pooja-services" },
      { name: "Tarot Reading", path: "/services/tarot-reading" },
      { name: "Crystal Healing", path: "/services/crystal-healing" },
      { name: "Horoscope", path: "/#daily-horoscope" },
      { name: "Vedic Astrology", path: "/services/vedic-astrology" },
    ],
  },
  {
    id: "free-reports",
    label: "Free Reports",
    accent: "#2D7351",
    tint: "#EEF6F1",
    path: "/calculator",
    items: [
      { name: "FREE Numerology Report", path: "/services/numerologists" },
      { name: "FREE Matchmaking Test", path: "/services/horoscope-matching" },
      { name: "FREE AI Kundli Report", path: "/calculator" },
      { name: "FREE Tarot Reading", path: "/services/tarot-reading" },
    ],
  },
  {
    id: "consultation",
    label: "Consultation",
    accent: "#6B5B95",
    tint: "#F3EFFA",
    path: "/talk-to-astrologers",
    items: [
      { name: "Chat with Expert", path: "/talk-to-astrologers" },
      { name: "Call with Expert", path: "/talk-to-astrologers" },
      { name: "Video Call an Expert", path: "/talk-to-astrologers" },
    ],
  },
  {
    id: "about",
    label: "About Us",
    accent: "#4A5568",
    tint: "#F4F5F7",
    path: "/about",
    items: [
      { name: "Explore Tathaastu", path: "/about" },
      { name: "Blogs", path: "/blog" },
    ],
  },
  {
    id: "store",
    label: "Abhimantrit Store",
    accent: "#C45C7A",
    tint: "#FBEFF2",
    path: "/store",
    items: [],
  },
];

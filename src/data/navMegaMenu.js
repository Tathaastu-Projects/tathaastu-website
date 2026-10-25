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
      { name: "Kundli Reading", path: "/services#astrology-kundli" },
      { name: "Vaastu Shastra", path: "/services#vastu-shastra" },
      { name: "Vedic Astrology", path: "/services#vedic-astrology" },
      { name: "Numerology", path: "/services#numerologists" },
      { name: "Pooja Services", path: "/services#pooja-services" },
      { name: "Horoscope Matching", path: "/services#horoscope-matching" },
      { name: "Tarot Reading", path: "/services#tarot-reading" },
      { name: "Crystal Healing", path: "/services#crystal-healing" },
      { name: "Pet Healing", path: "/services#pet-healing" },
      { name: "Dowsing", path: "/services#dowsing" },
      { name: "Aura Healing", path: "/services#aura-healing-scanning" },
    ],
  },
  {
    id: "free-reports",
    label: "Free Reports",
    accent: "#2D7351",
    path: "/calculator",
    items: [
      { name: "FREE AI Kundli Report", path: "/calculator" },
      { name: "FREE Matchmaking Test", path: "/matchmaking" },
      { name: "FREE Numerology Report", path: "/numerology" },
      { name: "Daily Vedic Horoscope", path: "/daily-horoscope" },
      { name: "Tarot Guidance", path: "/services#tarot-reading" },
    ],
  },
  {
    id: "consultation",
    label: "Consultation",
    accent: "#6B5B95",
    tint: "#F3EFFA",
    path: "/pricing",
    items: [
      { name: "Chat with Expert", path: "/pricing?flow=consult&type=chat" },
      { name: "Call with Expert", path: "/pricing?flow=consult&type=call" },
      { name: "Video Call an Expert", path: "/pricing?flow=consult&type=video" },
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
    path: "https://www.abhimantritstore.com/",
    external: true,
    items: [],
  },
];

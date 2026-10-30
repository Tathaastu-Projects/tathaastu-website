/**
 * Top nav for Tathaastu.
 * Desktop: left (Services, Free Report, Sacred Remedies) · center logo ·
 * right (Consultation, About Us). Home removed from the bar.
 */
export const NAV_MEGA_MENUS = [
  {
    id: "services",
    label: "Services",
    side: "left",
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
    id: "free-report",
    label: "Free Calculator",
    dropdownTitle: "Free Report",
    side: "left",
    accent: "#2D7351",
    tint: "#EEF6F1",
    path: "/calculator",
    items: [
      { name: "Free AI Kundli Report", path: "/calculator" },
      { name: "Free Matchmaking Report", path: "/matchmaking" },
      { name: "Free Numerology Report", path: "/numerology" },
      { name: "Free Tarot Reading", path: "/services#tarot-reading" },
      { name: "Daily Vedic Horoscope", path: "/daily-horoscope" },
    ],
  },
  {
    id: "sacred-remedies",
    label: "Sacred Remedies",
    side: "left",
    accent: "#8B5E3C",
    tint: "#F8F1EA",
    path: "/services#crystal-healing",
    items: [
      { name: "Crystal Healing", path: "/services#crystal-healing" },
      { name: "Vaastu Remedies", path: "/services#vastu-shastra" },
      { name: "Pooja Services", path: "/services#pooja-services" },
      { name: "Aura Healing", path: "/services#aura-healing-scanning" },
      { name: "Pet Healing", path: "/services#pet-healing" },
    ],
  },
  {
    id: "consultation",
    label: "Consultation",
    side: "right",
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
    side: "right",
    accent: "#4A5568",
    tint: "#F4F5F7",
    path: "/about",
    items: [
      { name: "Explore Tathaastu", path: "/about" },
      { name: "Blogs", path: "/blog" },
    ],
  },
  /* Temporarily commented out for 2 days per user request:
  {
    id: "store",
    label: "Abhimantrit Store",
    side: "right",
    accent: "#C45C7A",
    tint: "#FBEFF2",
    path: "https://www.abhimantritstore.com/",
    external: true,
    items: [],
  },
  */
];

export const NAV_LEFT_MENUS = NAV_MEGA_MENUS.filter((m) => m.side !== "right");
export const NAV_RIGHT_MENUS = NAV_MEGA_MENUS.filter((m) => m.side === "right");

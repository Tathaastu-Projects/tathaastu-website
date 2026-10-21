import poojaImg from "../assets/POOJA_SERVICES.png";
import vastuImg from "../assets/Vastu Astrology.jpg";
import numerologyImg from "../assets/Numerology.jpg";
import kundliImg from "../assets/AStrology kundli.jpg";
import tarotImg from "../assets/Tarot Reading.jpg";
import auraImg from "../assets/Aura Healing & Scanning.jpg";
import chakraImg from "../assets/chakra.jpg";
import dowsingImg from "../assets/dowsing.jpg";
import petImg from "../assets/Pet healing.jpeg";
import horoscopeImg from "../assets/Horoscope Guidance.jpg";
import lotusMandala from "../assets/lotus_mandala.svg";
import { CATALOG_PRODUCTS, CATALOG_THUMBS } from "./catalogProducts";

export const STORE_CATEGORIES = [
  { id: "puja", name: "Puja", slug: "puja", image: poojaImg, banner: poojaImg },
  { id: "remedies", name: "Remedies", slug: "remedies", image: kundliImg, banner: kundliImg },
  { id: "gemstones", name: "Gemstones", slug: "gemstones", image: CATALOG_THUMBS.gemstones, banner: CATALOG_THUMBS.gemstones },
  { id: "rudraksha", name: "Rudraksha", slug: "rudraksha", image: CATALOG_THUMBS.rudraksha, banner: CATALOG_THUMBS.rudraksha },
  { id: "crystals", name: "Crystals", slug: "crystals", image: CATALOG_THUMBS.crystals, banner: CATALOG_THUMBS.crystals },
  { id: "vastu", name: "Vastu", slug: "vastu", image: CATALOG_THUMBS.vastu, banner: CATALOG_THUMBS.vastu },
  { id: "incense", name: "Incense", slug: "incense", image: auraImg, banner: auraImg },
  { id: "yantras", name: "Yantras", slug: "yantras", image: chakraImg, banner: chakraImg },
];

export const STORE_INTENTIONS = [
  { id: "peace", name: "Peace & Calm", image: auraImg },
  { id: "prosperity", name: "Prosperity", image: vastuImg },
  { id: "love", name: "Love & Harmony", image: tarotImg },
  { id: "protection", name: "Protection", image: kundliImg },
  { id: "focus", name: "Focus & Clarity", image: horoscopeImg },
  { id: "healing", name: "Healing", image: petImg },
];

export const STORE_FILTERS = [
  "All Products",
  "Puja Essentials",
  "Gemstones",
  "Rudraksha",
  "Crystals",
  "Vastu Items",
  "Incense & Dhoop",
  "Yantras",
  "Best Sellers",
  "New Arrivals",
];

const products = CATALOG_PRODUCTS;

export const STORE_HERO = {
  title: "Is Your Home Blocking Positive Energy?",
  subtitle: "Discover expert-recommended Vastu remedies, puja essentials, and sacred products for a harmonious space.",
  cta: "Shop Vastu Remedies",
  ctaPath: "/store/vastu",
  image: lotusMandala,
  bgImage: vastuImg,
};

export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) || null;
}

export function getProductsByCategory(categorySlug) {
  if (!categorySlug || categorySlug === "all") return products;
  return products.filter((p) => p.category === categorySlug);
}

export function getProductsByIntention(intentionId) {
  return products.filter((p) => p.intention === intentionId);
}

export function getRecommendedProducts(limit = 8) {
  return products.slice(0, limit);
}

export function getRelatedProducts(product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.intention === product.intention))
    .slice(0, limit);
}

export function getCategoryBySlug(slug) {
  return STORE_CATEGORIES.find((c) => c.slug === slug) || null;
}

export function formatInr(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

const API_BASE =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL || "http://localhost:3032/api";

async function request(path) {
  const res = await fetch(`${API_BASE}${path}`);
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.success === false) {
    throw new Error(json.message || `Request failed (${res.status})`);
  }
  return json.data;
}

export async function fetchAstrologerCategories() {
  return request("/astrologers/meta/categories");
}

export async function fetchAstrologers({
  q = "",
  category = "All",
  sort = "popular",
} = {}) {
  const params = new URLSearchParams();
  if (q.trim()) params.set("q", q.trim());
  if (category) params.set("category", category);
  if (sort) params.set("sort", sort);
  const qs = params.toString();
  return request(`/astrologers${qs ? `?${qs}` : ""}`);
}

export async function fetchTrendingAstrologers(limit = 5) {
  return request(`/astrologers/trending?limit=${limit}`);
}

export async function fetchAstrologerBySlug(slug) {
  return request(`/astrologers/${encodeURIComponent(slug)}`);
}

export function formatLanguages(languages) {
  if (Array.isArray(languages)) return languages.join(" - ");
  return String(languages || "")
    .replace(/,/g, " - ")
    .replace(/\s*·\s*/g, " - ");
}

/** Figma card price: ₹499/30 min */
export function formatSessionPrice(expert) {
  if (!expert) return "";
  const duration = expert.priceDuration || 30;
  const unit = expert.priceUnit || "min";
  return {
    amount: `₹${expert.price}`,
    suffix: `/${duration} ${unit}`,
  };
}

/** Sidebar style: ₹34/min */
export function formatPerMinPrice(expert) {
  if (!expert) return "";
  if (expert.pricePerMin != null) return `₹${expert.pricePerMin}/min`;
  const duration = expert.priceDuration || 30;
  const perMin = Math.max(1, Math.round(Number(expert.price) / duration));
  return `₹${perMin}/min`;
}

/**
 * AI & Vedic Astrology API Service
 * Interacts with Tathaastu backend (/api/ai/*) which connects to
 * AstrologyAPI.com (Vedic math/JSON) and local Ollama LLM (narratives).
 */

const API_BASE =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL || "http://localhost:9001/api";

export async function aiFetch(path, body) {
  const isPost = Boolean(body);
  const res = await fetch(`${API_BASE}${path}`, {
    method: isPost ? "POST" : "GET",
    headers: isPost ? { "Content-Type": "application/json" } : undefined,
    body: isPost ? JSON.stringify(body) : undefined,
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok || json.success === false) {
    const err = new Error(json.message || `Astrology API error (${res.status})`);
    err.status = res.status;
    err.payload = json;
    throw err;
  }

  return json; // { success, data, source, costInr, model, cached, ... }
}

// 1. Health & status check (₹0)
export const getAiHealth = () => aiFetch("/ai/health");
export const fetchAiHealth = getAiHealth;

// 2. Budget and usage check (₹0)
export const getAiUsage = () => aiFetch("/ai/usage");
export const fetchAiUsage = getAiUsage;

// 3. Daily horoscope for all 12 signs (₹0)
export const getDailyHoroscope = (date, force = false) => {
  const params = new URLSearchParams();
  if (date) params.set("date", date);
  if (force) params.set("force", "1");
  const qs = params.toString() ? `?${params.toString()}` : "";
  return aiFetch(`/ai/horoscope/daily${qs}`);
};
export const fetchDailyHoroscope = (signOrDate) => {
  // Backwards compatibility
  return getDailyHoroscope(typeof signOrDate === "string" && signOrDate.includes("-") ? signOrDate : undefined);
};

// 4. Numerology report (₹0)
export const postNumerology = (name, dob) =>
  aiFetch("/ai/numerology/report", { name, dob });
export const fetchNumerologyReport = ({ name, dob }) =>
  postNumerology(name, dob);

// 5. Matchmaking / Gun Milan (₹0 names, ~₹0.10 kundli)
export const postMatchmaking = (payload) =>
  aiFetch("/ai/matchmaking/report", payload);
export const fetchMatchmakingReport = postMatchmaking;

// 6. Kundli consultation lead & preview (₹0 - ₹0.26)
export const postKundliLead = (payload) =>
  aiFetch("/ai/kundli/lead", payload);
export const submitKundliLead = postKundliLead;

// 7. Birth chart / Calculator report (₹0 - ₹0.26)
export const postBirthChart = (payload) =>
  aiFetch("/ai/birth-chart/report", payload);
export const fetchBirthChartReport = postBirthChart;

// 8. Geo lookup / City autocomplete (₹0.06 cached)
export const postGeo = (place) =>
  aiFetch("/ai/geo", { place });
export const lookupGeoPlace = (place) =>
  postGeo(place);

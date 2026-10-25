/**
 * Plans Catalog API Service
 * Fetches consultation packages and plans from backend DB
 */

const API_BASE =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3032/api"
    : "/api");

/**
 * 1. Fetch all active consultation plans
 * GET /api/plans
 * @param {{ mode?: 'audio' | 'video' | 'chat', exclusive?: boolean | number }} params
 */
export async function fetchPlans(params = {}) {
  const query = new URLSearchParams();
  if (params.mode) query.set("mode", params.mode);
  if (params.exclusive !== undefined) query.set("exclusive", params.exclusive ? "1" : "0");

  const qs = query.toString();
  const res = await fetch(`${API_BASE}/plans${qs ? `?${qs}` : ""}`);
  const json = await res.json().catch(() => ({}));

  if (!res.ok || json.success === false) {
    throw new Error(json.message || "Failed to load consultation plans");
  }

  return json.data || [];
}

/**
 * 2. Fetch single plan by ObjectId or code slug
 * GET /api/plans/:idOrCode
 * @param {string} idOrCode
 */
export async function fetchPlanByIdOrCode(idOrCode) {
  const res = await fetch(`${API_BASE}/plans/${encodeURIComponent(idOrCode)}`);
  const json = await res.json().catch(() => ({}));

  if (!res.ok || json.success === false) {
    throw new Error(json.message || "Plan not found");
  }

  return json.data;
}

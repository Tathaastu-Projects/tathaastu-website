/**
 * Expert / Astrologer API Service
 * For verified practitioners to manage bookings, status, and join sessions as host.
 */

import { getToken } from "./authApi";

const API_BASE =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3032/api"
    : "/api");

async function expertRequest(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok || json.success === false) {
    const error = new Error(json.message || `Expert request failed (${res.status})`);
    error.status = res.status;
    error.code = json.code;
    error.data = json.data;
    throw error;
  }

  return json.data;
}

/**
 * 1. Fetch current expert profile + linked astrologer record
 * GET /api/expert/me
 */
export async function fetchExpertMe() {
  return await expertRequest("/expert/me");
}

/**
 * 2. Update online status, price, languages, bio
 * PATCH /api/expert/me
 * @param {Record<string, any>} payload
 */
export async function updateExpertProfile(payload) {
  return await expertRequest("/expert/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

/**
 * 3. Fetch incoming / assigned bookings for this expert
 * GET /api/expert/bookings
 */
export async function fetchExpertBookings() {
  return await expertRequest("/expert/bookings");
}

/**
 * 4. Join booking consultation as Host (creates 100ms host token)
 * POST /api/expert/bookings/:id/join
 * @param {string} bookingId
 */
export async function joinExpertBooking(bookingId) {
  return await expertRequest(`/expert/bookings/${encodeURIComponent(bookingId)}/join`, {
    method: "POST",
  });
}

/**
 * 5. End active session as Host
 * POST /api/expert/bookings/:id/end
 * @param {string} bookingId
 */
export async function endExpertBooking(bookingId) {
  return await expertRequest(`/expert/bookings/${encodeURIComponent(bookingId)}/end`, {
    method: "POST",
  });
}

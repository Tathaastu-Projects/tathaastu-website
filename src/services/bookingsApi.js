/**
 * Bookings API Service
 * Handles booking creation, gated 100ms joins, lifecycle, and customer history.
 */

import { getToken } from "./authApi";

const API_BASE =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3032/api"
    : "/api");

async function bookingRequest(path, options = {}) {
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
    const error = new Error(json.message || `Booking request failed (${res.status})`);
    error.status = res.status;
    error.code = json.code;
    error.data = json.data;
    throw error;
  }

  return json.data;
}

/**
 * 1. Create a new consultation booking (pending_payment)
 * POST /api/bookings
 * @param {{
 *   planId?: string,
 *   astrologerId?: string,
 *   service?: string,
 *   customerName: string,
 *   customerPhone: string,
 *   customerEmail?: string,
 *   appointmentSlot?: string,
 *   birthDetails?: { dob?: string, tob?: string, pob?: string, concern?: string }
 * }} payload
 */
export async function createBooking(payload) {
  return await bookingRequest("/bookings", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * 2. Fetch list of current user's bookings
 * GET /api/bookings/mine
 */
export async function fetchMyBookings() {
  return await bookingRequest("/bookings/mine");
}

/**
 * 3. Fetch specific booking by ID
 * GET /api/bookings/:id
 * @param {string} bookingId
 */
export async function fetchBookingById(bookingId) {
  return await bookingRequest(`/bookings/${encodeURIComponent(bookingId)}`);
}

/**
 * 4. Confirm demo payment when gateway is in demo mode (no live keys)
 * POST /api/bookings/:id/confirm-demo-payment
 * @param {string} bookingId
 */
export async function confirmDemoPayment(bookingId) {
  return await bookingRequest(`/bookings/${encodeURIComponent(bookingId)}/confirm-demo-payment`, {
    method: "POST",
  });
}

/**
 * 5. Gated session join — returns 100ms authToken, mode (audio/video), and remaining seconds
 * POST /api/bookings/:id/join
 * @param {string} bookingId
 */
export async function joinBookingSession(bookingId) {
  return await bookingRequest(`/bookings/${encodeURIComponent(bookingId)}/join`, {
    method: "POST",
  });
}

/**
 * 6. End active consultation session
 * POST /api/bookings/:id/end
 * @param {string} bookingId
 */
export async function endBookingSession(bookingId) {
  return await bookingRequest(`/bookings/${encodeURIComponent(bookingId)}/end`, {
    method: "POST",
  });
}

/**
 * Admin API Service
 * Comprehensive platform management for users, astrologers, plans, bookings, payments, and refunds.
 */

import { getToken } from "./authApi";

const API_BASE =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3032/api"
    : "/api");

async function adminRequest(path, options = {}) {
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
    const error = new Error(json.message || `Admin request failed (${res.status})`);
    error.status = res.status;
    error.code = json.code;
    error.data = json.data;
    throw error;
  }

  return json.data;
}

/** 1. Platform Statistics Dashboard */
export const fetchAdminDashboard = () => adminRequest("/admin/dashboard");

/** 2. Users Management */
export const fetchAdminUsers = (params = {}) => {
  const qs = new URLSearchParams();
  if (params.role) qs.set("role", params.role);
  if (params.q) qs.set("q", params.q);
  const qStr = qs.toString();
  return adminRequest(`/admin/users${qStr ? `?${qStr}` : ""}`);
};

export const updateAdminUser = (id, payload) =>
  adminRequest(`/admin/users/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

/** 3. Astrologers Management */
export const fetchAdminAstrologers = () => adminRequest("/admin/astrologers");

export const createAdminAstrologer = (payload) =>
  adminRequest("/admin/astrologers", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateAdminAstrologer = (id, payload) =>
  adminRequest(`/admin/astrologers/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

/** 4. Consultation Plans Management */
export const fetchAdminPlans = () => adminRequest("/admin/plans");

export const createAdminPlan = (payload) =>
  adminRequest("/admin/plans", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateAdminPlan = (id, payload) =>
  adminRequest(`/admin/plans/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

/** 5. Bookings Management */
export const fetchAdminBookings = (status = "") => {
  return adminRequest(`/admin/bookings${status ? `?status=${encodeURIComponent(status)}` : ""}`);
};

export const updateAdminBooking = (id, payload) =>
  adminRequest(`/admin/bookings/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

/** 6. Payments History */
export const fetchAdminPayments = () => adminRequest("/admin/payments");

/** 7. Refund API v2 */
export const refundAdminPayment = (payload) =>
  adminRequest("/admin/payments/refund", {
    method: "POST",
    body: JSON.stringify(payload),
  });

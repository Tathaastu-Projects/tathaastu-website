/**
 * Easebuzz Payment Gateway API Service (Active)
 * PayU is temporarily disabled — preserved in comments below for future use.
 */

import { getToken } from "./authApi";

const API_BASE =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3032/api"
    : "/api");

async function paymentRequest(path, options = {}) {
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
    const error = new Error(json.message || `Payment request failed (${res.status})`);
    error.status = res.status;
    error.code = json.code;
    error.data = json.data;
    throw error;
  }

  return json.data;
}

/**
 * 1. Fetch Payment Gateway Configuration
 * GET /api/payment/config
 */
export async function fetchPaymentConfig() {
  try {
    return await paymentRequest("/payment/config");
  } catch (err) {
    return {
      gateway: "easebuzz",
      isConfigured: false,
      isDemo: true,
      environment: "test",
    };
  }
}

/**
 * 2. Initiate Easebuzz Hosted Checkout
 * POST /api/payment/easebuzz/initiate (or /api/payment/initiate)
 * @param {{ bookingId: string, customerName?: string, customerPhone?: string, customerEmail?: string, amount?: number }} payload
 */
export async function initiateEasebuzzPayment(payload) {
  return await paymentRequest("/payment/easebuzz/initiate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * 3. Verify Easebuzz Payment Return
 * POST /api/payment/easebuzz/verify (or /api/payment/verify)
 * @param {Record<string, any>} callbackPayload
 */
export async function verifyEasebuzzPayment(callbackPayload) {
  return await paymentRequest("/payment/easebuzz/verify", {
    method: "POST",
    body: JSON.stringify(callbackPayload),
  });
}

/**
 * 4. Easebuzz Refund API v2 (Admin)
 * POST /api/payment/easebuzz/refund
 * @param {{ paymentId?: string, bookingId?: string, txnId?: string, easepayId?: string, amount?: number, merchantRefundId?: string, cancelBooking?: boolean }} payload
 */
export async function refundEasebuzzPayment(payload) {
  return await paymentRequest("/payment/easebuzz/refund", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// Convenient aliases for general gateway usage
export const initiatePayment = initiateEasebuzzPayment;
export const verifyPayment = verifyEasebuzzPayment;
export const refundPayment = refundEasebuzzPayment;

/* ==========================================================================
   LEGACY PAYU PAYMENT API (Preserved for future re-enabling)
   Uncomment and switch active gateway when PayU is re-activated on backend.
   ==========================================================================

export async function initiatePayUPayment(payload) {
  return await paymentRequest("/payment/payu/initiate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function verifyPayUPayment(payload) {
  return await paymentRequest("/payment/payu/verify", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
========================================================================== */

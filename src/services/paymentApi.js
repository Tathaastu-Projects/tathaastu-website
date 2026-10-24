/**
 * PayU India Payment API Service
 */

const API_BASE =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL || "http://localhost:9001/api";

function getAuthToken() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("tathaastu_auth");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.token || null;
  } catch {
    return null;
  }
}

async function paymentRequest(path, options = {}) {
  const token = getAuthToken();
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

  if (!res.ok) {
    const error = new Error(json.message || `Payment request failed (${res.status})`);
    error.status = res.status;
    error.data = json.data;
    throw error;
  }

  return json.data;
}

export async function fetchPaymentConfig() {
  try {
    return await paymentRequest("/payment/config");
  } catch (err) {
    return { isConfigured: false, isDemo: true, gateway: "payu" };
  }
}

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

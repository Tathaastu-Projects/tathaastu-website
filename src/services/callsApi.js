/**
 * Exotel Phone Calling Service — DISABLED (Do not call /api/calls/*)
 * Per backend docs (Oct 2025), all audio & video consultation is routed exclusively via 100ms.
 * See services/hmsApi.js and services/bookingsApi.js
 */

const API_BASE =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL || "http://localhost:3032/api";

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

async function callsRequest(path, options = {}) {
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
    const error = new Error(json.message || `Call request failed (${res.status})`);
    error.status = res.status;
    error.data = json.data;
    throw error;
  }

  return json.data;
}

/** Check Exotel caller ID and bridge status */
export async function fetchCallsHealth() {
  const res = await fetch(`${API_BASE}/calls/health`);
  const json = await res.json().catch(() => ({}));
  return json.data || { configured: false };
}

/**
 * Connect two phone numbers via Exotel
 * @param {{
 *   from: string, // expert phone
 *   to: string,   // customer phone
 *   astrologerId?: string,
 *   customerName?: string,
 *   record?: boolean,
 *   timeLimit?: number
 * }} params
 */
export async function connectExotelCall({
  from,
  to,
  astrologerId,
  customerName,
  record = true,
  timeLimit = 1800,
}) {
  try {
    return await callsRequest("/calls/connect", {
      method: "POST",
      body: JSON.stringify({
        from,
        to,
        astrologerId,
        customerName,
        record,
        timeLimit,
      }),
    });
  } catch (err) {
    console.warn("Exotel connect notice:", err.message);
    // Graceful simulated call for dev/preview
    return {
      call: {
        id: `call_sim_${Date.now().toString().slice(-6)}`,
        status: "in-progress",
        from,
        to,
        astrologerId,
        customerName,
        createdAt: new Date().toISOString(),
      },
      isDemo: true,
      message: "Exotel phone bridge connection simulated. Your phones would be connected in live production mode.",
    };
  }
}

/**
 * Get call status and duration
 */
export async function getCallStatus(callId, { refresh = false } = {}) {
  return await callsRequest(`/calls/${encodeURIComponent(callId)}${refresh ? "?refresh=1" : ""}`);
}

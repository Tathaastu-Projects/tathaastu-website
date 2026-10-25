/**
 * Authentication API Service for Tathaastu
 * Matches backend/docs/AUTH_FRONTEND_API.md specifications
 */

const API_BASE =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:9001/api"
    : "/api");

export const TOKEN_KEY = "tathaastu_token";
export const USER_KEY = "tathaastu_user";
export const LEGACY_AUTH_KEY = "tathaastu_auth";

/**
 * Retrieve current JWT token from localStorage
 */
export function getToken() {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) return token;
  try {
    const legacy = localStorage.getItem(LEGACY_AUTH_KEY);
    if (legacy) {
      const parsed = JSON.parse(legacy);
      return parsed?.token || null;
    }
  } catch {
    /* ignore */
  }
  return null;
}

/**
 * Retrieve stored user object from localStorage
 */
export function getStoredUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      /* ignore */
    }
  }
  try {
    const legacy = localStorage.getItem(LEGACY_AUTH_KEY);
    if (legacy) {
      const parsed = JSON.parse(legacy);
      return parsed?.user || null;
    }
  } catch {
    /* ignore */
  }
  return null;
}

/**
 * Persist authentication session (JWT token and user info)
 */
export function setSession({ token, user }) {
  if (typeof window === "undefined") return;
  if (!token || !user) {
    clearSession();
    return;
  }
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  // Backward compatibility with hmsApi and other components
  localStorage.setItem(LEGACY_AUTH_KEY, JSON.stringify({ token, user }));
}

/**
 * Remove all authentication session items
 */
export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(LEGACY_AUTH_KEY);
}

/**
 * Core HTTP fetch wrapper with error handling and Bearer token attachment
 */
async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (!token) {
      const err = new Error("Session expired or not logged in");
      err.status = 401;
      throw err;
    }
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok || json.success === false) {
    const err = new Error(json.message || `Request failed with status ${res.status}`);
    err.status = res.status;
    err.code = json.code;
    err.payload = json;
    if (res.status === 401) {
      clearSession();
    }
    throw err;
  }

  return json;
}

/**
 * 0. Check Auth System Readiness (Graph mail, SMS status, token expiry)
 * GET /auth/health
 */
export const authHealth = () => request("/auth/health");

/**
 * 1. Password Signup
 * POST /auth/signup
 * @param {{ role: string, name: string, email: string, phone?: string, password: string }} payload
 */
export const signup = (payload) =>
  request("/auth/signup", { method: "POST", body: payload });

/**
 * 2. Password Login
 * POST /auth/login
 * @param {{ role: string, email: string, password: string }} payload
 */
export const login = (payload) =>
  request("/auth/login", { method: "POST", body: payload });

/**
 * 3. Send OTP (Email)
 * POST /auth/otp/send
 * @param {{ role?: string, channel: 'email', purpose: 'login' | 'register' | 'reset_password', email: string, name?: string }} payload
 */
export const sendOtp = (payload) =>
  request("/auth/otp/send", { method: "POST", body: payload });

/**
 * 4. Verify OTP (Email)
 * POST /auth/otp/verify
 * @param {{ role?: string, channel: 'email', purpose: 'login' | 'register', email: string, otp: string, name?: string, password?: string }} payload
 */
export const verifyOtp = (payload) =>
  request("/auth/otp/verify", { method: "POST", body: payload });

/**
 * 5. Forgot Password (Trigger reset OTP email)
 * POST /auth/forgot-password
 * @param {{ role?: string, email: string }} payload
 */
export const forgotPassword = (payload) =>
  request("/auth/forgot-password", { method: "POST", body: payload });

/**
 * 6. Reset Password (Verify OTP + Set new password)
 * POST /auth/reset-password
 * @param {{ role?: string, email: string, otp: string, newPassword: string }} payload
 */
export const resetPassword = (payload) =>
  request("/auth/reset-password", { method: "POST", body: payload });

/**
 * 7. Fetch current logged-in profile
 * GET /auth/me
 */
export const me = () => request("/auth/me", { auth: true });

/**
 * 8. Logout
 * POST /auth/logout
 */
export const logout = async () => {
  try {
    await request("/auth/logout", { method: "POST", auth: true });
  } finally {
    clearSession();
  }
};

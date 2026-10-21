"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL || "http://localhost:9001/api";

const STORAGE_KEY = "tathaastu_auth";

const AuthContext = createContext(null);

function readStoredAuth() {
  if (typeof window === "undefined") return { token: null, user: null };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { token: null, user: null };
    const parsed = JSON.parse(raw);
    return {
      token: parsed?.token || null,
      user: parsed?.user || null,
    };
  } catch {
    return { token: null, user: null };
  }
}

export function AuthProvider({ children }) {
  const [{ token, user }, setAuth] = useState({ token: null, user: null });
  const [booting, setBooting] = useState(true);

  const persist = useCallback((nextToken, nextUser) => {
    if (!nextToken || !nextUser) {
      localStorage.removeItem(STORAGE_KEY);
      setAuth({ token: null, user: null });
      return;
    }
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ token: nextToken, user: nextUser })
    );
    setAuth({ token: nextToken, user: nextUser });
  }, []);

  const logout = useCallback(async () => {
    const currentToken = token;
    persist(null, null);
    if (!currentToken) return;
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${currentToken}` },
      });
    } catch {
      /* ignore */
    }
  }, [persist, token]);

  const refreshMe = useCallback(async () => {
    if (!token) {
      setBooting(false);
      return null;
    }
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok || !payload?.data?.user) {
        persist(null, null);
        return null;
      }
      persist(token, payload.data.user);
      return payload.data.user;
    } catch {
      return user;
    } finally {
      setBooting(false);
    }
  }, [persist, token, user]);

  useEffect(() => {
    const stored = readStoredAuth();
    if (stored.token) setAuth(stored);
    else setBooting(false);
  }, []);

  useEffect(() => {
    if (!token) return undefined;
    refreshMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const applyAuthPayload = useCallback(
    (payload) => {
      const nextToken = payload?.data?.token;
      const nextUser = payload?.data?.user;
      if (!nextToken || !nextUser) {
        throw new Error(payload?.message || "Login failed");
      }
      persist(nextToken, nextUser);
      return nextUser;
    },
    [persist]
  );

  const loginWithPassword = useCallback(
    async ({ role, email, password }) => {
      const res = await fetch(`${API_BASE}/auth/login/password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, email, password }),
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(payload?.message || "Invalid credentials");
      }
      return applyAuthPayload(payload);
    },
    [applyAuthPayload]
  );

  const sendOtp = useCallback(async ({ role, channel, email, phone }) => {
    const res = await fetch(`${API_BASE}/auth/otp/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, channel, email, phone, purpose: "login" }),
    });
    const payload = await res.json().catch(() => null);
    if (!res.ok) {
      throw new Error(payload?.message || "Could not send OTP");
    }
    return payload.data;
  }, []);

  const verifyOtp = useCallback(
    async ({ role, channel, email, phone, otp, name }) => {
      const res = await fetch(`${API_BASE}/auth/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, channel, email, phone, otp, name }),
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(payload?.message || "OTP verification failed");
      }
      return applyAuthPayload(payload);
    },
    [applyAuthPayload]
  );

  const register = useCallback(
    async ({ role, name, email, phone, password }) => {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, name, email, phone, password }),
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(payload?.message || "Registration failed");
      }
      return applyAuthPayload(payload);
    },
    [applyAuthPayload]
  );

  const value = useMemo(
    () => ({
      apiBase: API_BASE,
      token,
      user,
      booting,
      isAuthenticated: !!token && !!user,
      loginWithPassword,
      sendOtp,
      verifyOtp,
      register,
      logout,
      refreshMe,
    }),
    [
      token,
      user,
      booting,
      loginWithPassword,
      sendOtp,
      verifyOtp,
      register,
      logout,
      refreshMe,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

export function dashboardPathForRole(role) {
  if (role === "admin") return "/admin/dashboard";
  if (role === "expert") return "/expert/dashboard";
  return "/user/dashboard";
}

"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getToken,
  getStoredUser,
  setSession,
  clearSession,
  login,
  signup,
  sendOtp,
  verifyOtp,
  forgotPassword,
  resetPassword,
  me,
  logout as apiLogout,
  authHealth,
} from "../services/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(null);
  const [user, setUserState] = useState(null);
  const [booting, setBooting] = useState(true);
  const [health, setHealth] = useState(null);

  const persist = useCallback((nextToken, nextUser) => {
    if (!nextToken || !nextUser) {
      clearSession();
      setTokenState(null);
      setUserState(null);
      return;
    }
    setSession({ token: nextToken, user: nextUser });
    setTokenState(nextToken);
    setUserState(nextUser);
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch {
      /* ignore */
    } finally {
      persist(null, null);
    }
  }, [persist]);

  const refreshMe = useCallback(async () => {
    const currentToken = getToken();
    if (!currentToken) {
      setBooting(false);
      return null;
    }
    try {
      const res = await me();
      if (res?.data?.user) {
        persist(currentToken, res.data.user);
        return res.data.user;
      }
      persist(null, null);
      return null;
    } catch {
      persist(null, null);
      return null;
    } finally {
      setBooting(false);
    }
  }, [persist]);

  // Initial bootstrap: check token and health
  useEffect(() => {
    const initialToken = getToken();
    const initialUser = getStoredUser();

    if (initialToken && initialUser) {
      setTokenState(initialToken);
      setUserState(initialUser);
      refreshMe();
    } else {
      setBooting(false);
    }

    authHealth()
      .then((res) => {
        if (res?.data) setHealth(res.data);
      })
      .catch(() => {
        /* ignore network errors on health */
      });
  }, [refreshMe]);

  const applyAuthSuccess = useCallback(
    (res) => {
      const nextToken = res?.data?.token;
      const nextUser = res?.data?.user;
      if (!nextToken || !nextUser) {
        throw new Error(res?.message || "Authentication succeeded but no session received.");
      }
      persist(nextToken, nextUser);
      return { token: nextToken, user: nextUser, raw: res };
    },
    [persist]
  );

  /**
   * 1. Password Login
   */
  const loginWithPassword = useCallback(
    async ({ email, password, role = "user" }) => {
      const res = await login({ email, password, role });
      return applyAuthSuccess(res);
    },
    [applyAuthSuccess]
  );

  /**
   * 2. Send OTP for Login
   */
  const loginWithEmailOtpSend = useCallback(
    async ({ email, role = "user" }) => {
      const res = await sendOtp({
        channel: "email",
        purpose: "login",
        email,
        role,
      });
      return res;
    },
    []
  );

  /**
   * 3. Verify OTP for Login
   */
  const loginWithEmailOtpVerify = useCallback(
    async ({ email, otp, role = "user" }) => {
      const res = await verifyOtp({
        channel: "email",
        purpose: "login",
        email,
        otp,
        role,
      });
      return applyAuthSuccess(res);
    },
    [applyAuthSuccess]
  );

  /**
   * 4. Password Signup
   */
  const signupWithPassword = useCallback(
    async ({ name, email, phone, password, role = "user" }) => {
      const res = await signup({
        name,
        email,
        phone: phone || undefined,
        password,
        role,
      });
      return applyAuthSuccess(res);
    },
    [applyAuthSuccess]
  );

  /**
   * 5. Send OTP for Signup/Register
   */
  const signupWithEmailOtpSend = useCallback(
    async ({ name, email, role = "user" }) => {
      const res = await sendOtp({
        channel: "email",
        purpose: "register",
        email,
        name,
        role,
      });
      return res;
    },
    []
  );

  /**
   * 6. Verify OTP for Signup/Register
   */
  const signupWithEmailOtpVerify = useCallback(
    async ({ name, email, otp, password, role = "user" }) => {
      const res = await verifyOtp({
        channel: "email",
        purpose: "register",
        email,
        otp,
        name,
        password: password || undefined,
        role,
      });
      return applyAuthSuccess(res);
    },
    [applyAuthSuccess]
  );

  /**
   * 7. Trigger Forgot Password Email OTP
   */
  const forgotPasswordSend = useCallback(
    async ({ email, role = "user" }) => {
      const res = await forgotPassword({ email, role });
      return res;
    },
    []
  );

  /**
   * 8. Submit Password Reset (OTP + newPassword)
   */
  const resetPasswordSubmit = useCallback(
    async ({ email, otp, newPassword, role = "user" }) => {
      const res = await resetPassword({ email, otp, newPassword, role });
      return applyAuthSuccess(res);
    },
    [applyAuthSuccess]
  );

  // Backward compatibility aliases
  const register = signupWithPassword;
  const sendOtpLegacy = loginWithEmailOtpSend;
  const verifyOtpLegacy = loginWithEmailOtpVerify;

  const value = useMemo(
    () => ({
      token,
      user,
      booting,
      health,
      isAuthenticated: !!token && !!user,
      loginWithPassword,
      loginWithEmailOtpSend,
      loginWithEmailOtpVerify,
      signupWithPassword,
      signupWithEmailOtpSend,
      signupWithEmailOtpVerify,
      forgotPasswordSend,
      resetPasswordSubmit,
      logout,
      refreshMe,
      // legacy support
      register,
      sendOtp: sendOtpLegacy,
      verifyOtp: verifyOtpLegacy,
    }),
    [
      token,
      user,
      booting,
      health,
      loginWithPassword,
      loginWithEmailOtpSend,
      loginWithEmailOtpVerify,
      signupWithPassword,
      signupWithEmailOtpSend,
      signupWithEmailOtpVerify,
      forgotPasswordSend,
      resetPasswordSubmit,
      logout,
      refreshMe,
      register,
      sendOtpLegacy,
      verifyOtpLegacy,
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

"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "@/lib/router";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  UserRound,
  Sparkles,
  ShieldCheck,
  RotateCw,
  KeyRound,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useAuth, dashboardPathForRole } from "../contexts/AuthContext";
import AuthShell from "../components/auth/AuthShell";
import OtpInput from "../components/auth/OtpInput";

const ROLES = [
  { id: "user", label: "Seeker", icon: UserRound, desc: "Clients & Seekers" },
  { id: "expert", label: "Expert", icon: Sparkles, desc: "Astrologers" },
  { id: "admin", label: "Admin", icon: ShieldCheck, desc: "Managers" },
];

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isAuthenticated,
    user,
    loginWithPassword,
    loginWithEmailOtpSend,
    loginWithEmailOtpVerify,
    health,
  } = useAuth();

  // Mode: password | otp
  const [tab, setTab] = useState("password");
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // OTP flow state
  const [otpStep, setOtpStep] = useState("input"); // 'input' | 'verify'
  const [otpCode, setOtpCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [devOtp, setDevOtp] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user?.role) {
      const returnTo = location?.state?.from || dashboardPathForRole(user.role);
      navigate(returnTo, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  // Resend countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  // Reset errors when changing tabs or roles
  useEffect(() => {
    setError("");
    setSuccessMsg("");
    setOtpStep("input");
    setOtpCode("");
    setDevOtp("");
  }, [tab, role]);

  /**
   * Handle Password Login
   */
  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!email.trim() || !password) {
      setError("Please enter both email address and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await loginWithPassword({
        email: email.trim(),
        password,
        role,
      });
      setSuccessMsg("Welcome back! Redirecting...");
      const dest = location?.state?.from || dashboardPathForRole(res.user?.role || role);
      setTimeout(() => navigate(dest, { replace: true }), 400);
    } catch (err) {
      setError(err.message || "Invalid credentials. Please verify your email and password.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle OTP Send
   */
  const handleSendOtp = async (e) => {
    e?.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const res = await loginWithEmailOtpSend({
        email: email.trim(),
        role,
      });
      setMaskedEmail(res.data?.targetMasked || email.trim());
      setCountdown(res.data?.expiresInSeconds || 60);
      if (res.data?.devOtp) {
        setDevOtp(res.data.devOtp);
      }
      setOtpStep("verify");
      setSuccessMsg("Verification code sent to your email.");
    } catch (err) {
      if (err.status === 404) {
        setError("No account found with this email for the selected role. Please sign up first.");
      } else {
        setError(err.message || "Could not send OTP. Please try again or use password login.");
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle OTP Verification
   */
  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!otpCode || otpCode.length < 4) {
      setError("Please enter the complete verification code.");
      return;
    }

    try {
      setLoading(true);
      const res = await loginWithEmailOtpVerify({
        email: email.trim(),
        otp: otpCode.trim(),
        role,
      });
      setSuccessMsg("Code verified! Logging you in...");
      const dest = location?.state?.from || dashboardPathForRole(res.user?.role || role);
      setTimeout(() => navigate(dest, { replace: true }), 400);
    } catch (err) {
      setError(err.message || "Invalid or expired verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Welcome to Tathaastu"
      subtitle="Sign in to consult Vedic experts and manage your personal readings."
      badge="SECURE VEDIC PORTAL"
    >
      {/* Role Switcher */}
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#0B4B41] mb-2">
          Select Your Portal
        </label>
        <div className="grid grid-cols-3 gap-2 p-1 bg-[#F4EFE6] rounded-2xl border border-[#073349]/8">
          {ROLES.map((r) => {
            const Icon = r.icon;
            const isSelected = role === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-bold transition-all duration-200 ${
                  isSelected
                    ? "bg-white text-[#0B4B41] shadow-sm ring-1 ring-[#0B4B41]/20"
                    : "text-gray-600 hover:text-[#0B4B41] hover:bg-white/40"
                }`}
              >
                <Icon className={`w-4 h-4 mb-1 ${isSelected ? "text-[#C9A227]" : "text-gray-400"}`} />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Authentication Method Tabs */}
      <div className="flex border-b border-[#073349]/10 mb-6">
        <button
          type="button"
          onClick={() => setTab("password")}
          className={`flex-1 pb-3 text-sm font-bold transition-colors relative ${
            tab === "password" ? "text-[#0B4B41]" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <span>Password Sign In</span>
          {tab === "password" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0B4B41] rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setTab("otp")}
          className={`flex-1 pb-3 text-sm font-bold transition-colors relative ${
            tab === "otp" ? "text-[#0B4B41]" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <span>Email OTP Code</span>
          {tab === "otp" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0B4B41] rounded-full" />
          )}
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span>{error}</span>
            {error.includes("sign up first") && (
              <div className="mt-1">
                <Link to="/signup" className="font-bold underline text-red-800">
                  Create a new account now &rarr;
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {successMsg && (
        <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Dev OTP Helper Pill (when available in local non-prod) */}
      {devOtp && otpStep === "verify" && (
        <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
          <div>
            <span className="font-semibold text-amber-800">Dev Helper: </span>
            <span>OTP is </span>
            <code className="font-bold bg-amber-200 px-1.5 py-0.5 rounded text-amber-900">{devOtp}</code>
          </div>
          <button
            type="button"
            onClick={() => setOtpCode(devOtp)}
            className="text-[11px] font-bold text-amber-900 underline hover:text-amber-700"
          >
            Fill Code
          </button>
        </div>
      )}

      {/* Password Tab Form */}
      {tab === "password" && (
        <form onSubmit={handlePasswordLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. yourname@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#073349]/15 bg-white text-sm text-[#073349] outline-none focus:border-[#0B4B41] focus:ring-2 focus:ring-[#0B4B41]/20 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-700">
                Password
              </label>
              <Link
                to={`/forgot-password${email ? `?email=${encodeURIComponent(email)}` : ""}`}
                className="text-xs font-semibold text-[#0B4B41] hover:text-[#C45C26] transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#073349]/15 bg-white text-sm text-[#073349] outline-none focus:border-[#0B4B41] focus:ring-2 focus:ring-[#0B4B41]/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0B4B41] to-[#073831] text-white text-sm font-bold tracking-wide shadow-md hover:from-[#0F5C50] hover:to-[#0B4B41] hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In to Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}

      {/* OTP Tab Flow */}
      {tab === "otp" && (
        <div>
          {otpStep === "input" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. yourname@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#073349]/15 bg-white text-sm text-[#073349] outline-none focus:border-[#0B4B41] focus:ring-2 focus:ring-[#0B4B41]/20 transition-all"
                  />
                </div>
                <p className="mt-1.5 text-xs text-gray-500">
                  We will send a 6-digit one-time code to this email via Microsoft Graph.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0B4B41] to-[#073831] text-white text-sm font-bold tracking-wide shadow-md hover:from-[#0F5C50] hover:to-[#0B4B41] hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Sending Code...</span>
                  </>
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center mb-2">
                <p className="text-xs text-gray-600">
                  Enter the 6-digit code sent to <strong className="text-[#0B4B41]">{maskedEmail}</strong>
                </p>
                <button
                  type="button"
                  onClick={() => setOtpStep("input")}
                  className="text-xs text-[#0B4B41] hover:underline mt-1 font-semibold"
                >
                  Change email address
                </button>
              </div>

              <OtpInput
                value={otpCode}
                onChange={setOtpCode}
                disabled={loading}
              />

              <button
                type="submit"
                disabled={loading || otpCode.length < 6}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0B4B41] to-[#073831] text-white text-sm font-bold tracking-wide shadow-md hover:from-[#0F5C50] hover:to-[#0B4B41] hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Verify & Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs pt-2">
                <span className="text-gray-500">Didn&apos;t receive code?</span>
                {countdown > 0 ? (
                  <span className="text-gray-400 font-medium">Resend in {countdown}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="font-bold text-[#0B4B41] hover:text-[#C45C26] transition-colors"
                  >
                    Resend Code Now
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      )}

      {/* Link to Signup */}
      {role !== "admin" && (
        <div className="mt-8 pt-6 border-t border-[#073349]/10 text-center">
          <p className="text-xs text-gray-600">
            Don&apos;t have a Tathaastu account yet?{" "}
            <Link
              to={`/signup${role === "expert" ? "?role=expert" : ""}`}
              className="font-bold text-[#0B4B41] hover:text-[#C45C26] transition-colors"
            >
              Create Account Free &rarr;
            </Link>
          </p>
        </div>
      )}
    </AuthShell>
  );
}

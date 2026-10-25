"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "@/lib/router";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  UserRound,
  Sparkles,
  RotateCw,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useAuth, dashboardPathForRole } from "../contexts/AuthContext";
import AuthShell from "../components/auth/AuthShell";
import OtpInput from "../components/auth/OtpInput";

const SIGNUP_ROLES = [
  { id: "user", label: "Seeker Account", icon: UserRound, desc: "Personal consultations & readings" },
  { id: "expert", label: "Astrology Expert", icon: Sparkles, desc: "Verified practitioner listing" },
];

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isAuthenticated,
    user,
    signupWithPassword,
    signupWithEmailOtpSend,
    signupWithEmailOtpVerify,
  } = useAuth();

  // Mode: password | otp
  const [tab, setTab] = useState("password");
  const [role, setRole] = useState("user");

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  // Check URL query for default role
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlRole = params.get("role");
      if (urlRole === "expert") setRole("expert");
    }
  }, []);

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
   * Handle Standard Password Signup
   */
  const handlePasswordSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!name.trim()) {
      setError("Please provide your full name.");
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please verify.");
      return;
    }

    try {
      setLoading(true);
      const res = await signupWithPassword({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        password,
        role,
      });

      setSuccessMsg("Account created successfully! Welcome to Tathaastu.");
      const dest = location?.state?.from || dashboardPathForRole(res.user?.role || role);
      setTimeout(() => navigate(dest, { replace: true }), 500);
    } catch (err) {
      if (err.status === 409) {
        setError("An account with this email already exists. Please log in instead.");
      } else {
        setError(err.message || "Signup failed. Please check your information and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle OTP Signup Send
   */
  const handleSendOtp = async (e) => {
    e?.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const res = await signupWithEmailOtpSend({
        name: name.trim(),
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
      if (err.status === 409) {
        setError("This email is already registered. Please sign in instead.");
      } else {
        setError(err.message || "Could not send verification code. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle OTP Signup Verification
   */
  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!otpCode || otpCode.length < 4) {
      setError("Please enter the complete verification code.");
      return;
    }
    if (password && password.length < 6) {
      setError("Optional password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      const res = await signupWithEmailOtpVerify({
        name: name.trim(),
        email: email.trim(),
        otp: otpCode.trim(),
        password: password || undefined,
        role,
      });
      setSuccessMsg("Account verified! Logging you in...");
      const dest = location?.state?.from || dashboardPathForRole(res.user?.role || role);
      setTimeout(() => navigate(dest, { replace: true }), 500);
    } catch (err) {
      setError(err.message || "Invalid or expired verification code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create Your Account"
      subtitle="Begin your personal astrological journey with Tathaastu."
      badge="DIVINE DESTINY REGISTRATION"
    >
      {/* Account Type Selector */}
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#0B4B41] mb-2">
          Select Account Type
        </label>
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#F4EFE6] rounded-2xl border border-[#073349]/8">
          {SIGNUP_ROLES.map((r) => {
            const Icon = r.icon;
            const isSelected = role === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 text-left ${
                  isSelected
                    ? "bg-white text-[#0B4B41] shadow-sm ring-1 ring-[#0B4B41]/20"
                    : "text-gray-600 hover:text-[#0B4B41] hover:bg-white/40"
                }`}
              >
                <div className={`p-1.5 rounded-lg ${isSelected ? "bg-[#0B4B41]/10 text-[#0B4B41]" : "bg-gray-100 text-gray-500"}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div>{r.label}</div>
                  <div className="text-[10px] font-normal text-gray-500">{r.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex border-b border-[#073349]/10 mb-6">
        <button
          type="button"
          onClick={() => setTab("password")}
          className={`flex-1 pb-3 text-sm font-bold transition-colors relative ${
            tab === "password" ? "text-[#0B4B41]" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <span>Standard Signup</span>
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
          <span>Fast Email OTP</span>
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
            {error.includes("log in instead") && (
              <div className="mt-1">
                <Link to="/login" className="font-bold underline text-red-800">
                  Click here to Sign In &rarr;
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

      {/* Dev OTP Helper Pill */}
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

      {/* Standard Password Signup Form */}
      {tab === "password" && (
        <form onSubmit={handlePasswordSignup} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#073349]/15 bg-white text-sm text-[#073349] outline-none focus:border-[#0B4B41] focus:ring-2 focus:ring-[#0B4B41]/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. aarav@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#073349]/15 bg-white text-sm text-[#073349] outline-none focus:border-[#0B4B41] focus:ring-2 focus:ring-[#0B4B41]/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#073349]/15 bg-white text-sm text-[#073349] outline-none focus:border-[#0B4B41] focus:ring-2 focus:ring-[#0B4B41]/20 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 chars"
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

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#073349]/15 bg-white text-sm text-[#073349] outline-none focus:border-[#0B4B41] focus:ring-2 focus:ring-[#0B4B41]/20 transition-all"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0B4B41] to-[#073831] text-white text-sm font-bold tracking-wide shadow-md hover:from-[#0F5C50] hover:to-[#0B4B41] hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-3"
          >
            {loading ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}

      {/* Fast Email OTP Signup Flow */}
      {tab === "otp" && (
        <div>
          {otpStep === "input" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Diya Sengupta"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#073349]/15 bg-white text-sm text-[#073349] outline-none focus:border-[#0B4B41] focus:ring-2 focus:ring-[#0B4B41]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. diya@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#073349]/15 bg-white text-sm text-[#073349] outline-none focus:border-[#0B4B41] focus:ring-2 focus:ring-[#0B4B41]/20 transition-all"
                  />
                </div>
                <p className="mt-1.5 text-xs text-gray-500">
                  We will send a 6-digit registration code to this address.
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
                  Enter code sent to <strong className="text-[#0B4B41]">{maskedEmail}</strong>
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

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Set a Password <span className="text-gray-400 font-normal">(Optional for later sign in)</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 characters (optional)"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#073349]/15 bg-white text-sm text-[#073349] outline-none focus:border-[#0B4B41] focus:ring-2 focus:ring-[#0B4B41]/20 transition-all"
                  />
                </div>
              </div>

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
                    <span>Verify & Create Account</span>
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

      {/* Link to Login */}
      <div className="mt-8 pt-6 border-t border-[#073349]/10 text-center">
        <p className="text-xs text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-[#0B4B41] hover:text-[#C45C26] transition-colors"
          >
            Sign In Here &rarr;
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}

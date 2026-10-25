"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "@/lib/router";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  RotateCw,
  AlertCircle,
  CheckCircle2,
  KeyRound,
} from "lucide-react";
import { useAuth, dashboardPathForRole } from "../contexts/AuthContext";
import AuthShell from "../components/auth/AuthShell";
import OtpInput from "../components/auth/OtpInput";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { resetPasswordSubmit, forgotPasswordSend } = useAuth();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [devOtp, setDevOtp] = useState("");
  const [countdown, setCountdown] = useState(60);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Read URL query parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlEmail = params.get("email");
      const urlRole = params.get("role");
      const urlDevOtp = params.get("devOtp");
      if (urlEmail) setEmail(urlEmail);
      if (urlRole) setRole(urlRole);
      if (urlDevOtp) setDevOtp(urlDevOtp);
    }
  }, []);

  // Resend countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  const handleResend = async () => {
    if (!email.trim()) {
      setError("Please enter your email to resend code.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const res = await forgotPasswordSend({ email: email.trim(), role });
      setCountdown(res.data?.expiresInSeconds || 60);
      if (res.data?.devOtp) setDevOtp(res.data.devOtp);
      setSuccessMsg("A new verification code has been dispatched to your email.");
    } catch (err) {
      setError(err.message || "Failed to resend code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!email.trim()) {
      setError("Please specify your email address.");
      return;
    }
    if (!otpCode || otpCode.length < 4) {
      setError("Please enter the complete 6-digit code received via email.");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please verify.");
      return;
    }

    try {
      setLoading(true);
      const res = await resetPasswordSubmit({
        email: email.trim(),
        otp: otpCode.trim(),
        newPassword,
        role,
      });

      setSuccessMsg("Password successfully reset! You are now logged in. Redirecting...");
      const dest = dashboardPathForRole(res.user?.role || role);
      setTimeout(() => navigate(dest, { replace: true }), 700);
    } catch (err) {
      setError(err.message || "Invalid or expired verification code. Please check or request a new code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create New Password"
      subtitle="Enter the verification code and choose a new secure password."
      badge="PASSWORD RESTORATION"
    >
      {error && (
        <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Dev OTP Helper */}
      {devOtp && (
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

      <form onSubmit={handleReset} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Account Email
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
          <label className="block text-xs font-semibold text-gray-700 mb-1 text-center">
            6-Digit Verification Code
          </label>
          <OtpInput
            value={otpCode}
            onChange={setOtpCode}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            New Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min 6 characters"
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
            Confirm New Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-type new password"
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
              <span>Resetting Password...</span>
            </>
          ) : (
            <>
              <KeyRound className="w-4 h-4" />
              <span>Update Password & Log In</span>
            </>
          )}
        </button>

        <div className="flex items-center justify-between text-xs pt-2">
          <span className="text-gray-500">Didn&apos;t get code?</span>
          {countdown > 0 ? (
            <span className="text-gray-400 font-medium">Resend in {countdown}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="font-bold text-[#0B4B41] hover:text-[#C45C26] transition-colors"
            >
              Resend Code Now
            </button>
          )}
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-[#073349]/10 text-center">
        <p className="text-xs text-gray-600">
          Already know your password?{" "}
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

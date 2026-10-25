"use client";

import React, { useState } from "react";
import { Link, useNavigate } from "@/lib/router";
import { Mail, ArrowRight, RotateCw, AlertCircle, CheckCircle2, KeyRound } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import AuthShell from "../components/auth/AuthShell";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { forgotPasswordSend } = useAuth();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleForgot = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email.trim())) {
      setError("Please enter a valid registered email address.");
      return;
    }

    try {
      setLoading(true);
      const res = await forgotPasswordSend({
        email: email.trim(),
        role,
      });

      setSuccessMsg("Password reset code sent to your email!");
      
      const devParam = res.data?.devOtp ? `&devOtp=${encodeURIComponent(res.data.devOtp)}` : "";
      setTimeout(() => {
        navigate(`/reset-password?email=${encodeURIComponent(email.trim())}&role=${role}${devParam}`);
      }, 700);
    } catch (err) {
      if (err.status === 404) {
        setError("No account found with this email. Please check the spelling or create an account.");
      } else {
        setError(err.message || "Could not send reset code. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Reset Your Password"
      subtitle="Enter your account email to receive a secure verification code."
      badge="CREDENTIAL RECOVERY"
    >
      <div className="mb-6 p-4 rounded-2xl bg-[#FBF7EE] border border-[#C9A227]/25 flex items-start gap-3">
        <KeyRound className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
        <p className="text-xs text-[#073349]/80 leading-relaxed">
          We will send a 6-digit verification code to your verified email address. After entering the code, you will be able to set a new password immediately.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span>{error}</span>
            {error.includes("create an account") && (
              <div className="mt-1">
                <Link to="/signup" className="font-bold underline text-red-800">
                  Register a new account &rarr;
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

      <form onSubmit={handleForgot} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Registered Email Address
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

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0B4B41] to-[#073831] text-white text-sm font-bold tracking-wide shadow-md hover:from-[#0F5C50] hover:to-[#0B4B41] hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
        >
          {loading ? (
            <>
              <RotateCw className="w-4 h-4 animate-spin" />
              <span>Sending Reset Code...</span>
            </>
          ) : (
            <>
              <span>Send Verification Code</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-[#073349]/10 text-center">
        <p className="text-xs text-gray-600">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-bold text-[#0B4B41] hover:text-[#C45C26] transition-colors"
          >
            Back to Sign In &rarr;
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}

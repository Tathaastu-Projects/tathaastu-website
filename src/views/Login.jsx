"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "@/lib/router";
import {
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import CapricornLogin from "../assets/CAPRICORN_login.svg";
import AquariusLogin from "../assets/AQUARIUS_login.svg";
import ScorpioLogin from "../assets/SCORPIO_login.svg";
import MandalaCorner from "../assets/mandala_corner_login.svg";
import {
  dashboardPathForRole,
  useAuth,
} from "../contexts/AuthContext";

const ROLES = [
  {
    id: "user",
    label: "User",
    hint: "Seekers & clients",
    icon: UserRound,
  },
  {
    id: "expert",
    label: "Expert",
    hint: "Astrologers & guides",
    icon: Sparkles,
  },
  {
    id: "admin",
    label: "Admin",
    hint: "Platform managers",
    icon: ShieldCheck,
  },
];

const METHODS = [
  { id: "mobile-otp", label: "Mobile OTP", icon: Phone },
  { id: "email-password", label: "Email & Password", icon: KeyRound },
  { id: "email-otp", label: "Email OTP", icon: Mail },
];

const INITIAL = {
  name: "",
  email: "",
  phone: "",
  password: "",
  otp: "",
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isAuthenticated,
    user,
    loginWithPassword,
    sendOtp,
    verifyOtp,
    register,
  } = useAuth();

  const [mode, setMode] = useState("login"); // login | register
  const [role, setRole] = useState("user");
  const [method, setMethod] = useState("mobile-otp");
  const [step, setStep] = useState("form"); // form | otp
  const [form, setForm] = useState(INITIAL);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const [otpMeta, setOtpMeta] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user?.role) {
      navigate(dashboardPathForRole(user.role), { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    setStep("form");
    setError("");
    setInfo("");
    setDevOtp("");
    setForm((prev) => ({ ...prev, otp: "", password: "" }));
  }, [method, role, mode]);

  const methodOptions = useMemo(() => {
    if (mode === "register") {
      return METHODS.filter((m) => m.id === "email-password");
    }
    return METHODS;
  }, [mode]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const finishLogin = (loggedInUser) => {
    const dest =
      location.state?.from || dashboardPathForRole(loggedInUser.role);
    navigate(dest, { replace: true });
  };

  const handleSendOtp = async () => {
    const channel = method === "mobile-otp" ? "phone" : "email";
    const data = await sendOtp({
      role,
      channel,
      email: form.email,
      phone: form.phone,
    });
    setOtpMeta(data);
    setDevOtp(data?.devOtp || "");
    setInfo(`OTP sent to ${data?.targetMasked || "your contact"}`);
    setStep("otp");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      if (mode === "register") {
        if (role === "admin") {
          throw new Error("Admin accounts are created by the platform team.");
        }
        const loggedInUser = await register({
          role,
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          password: form.password,
        });
        finishLogin(loggedInUser);
        return;
      }

      if (method === "email-password") {
        const loggedInUser = await loginWithPassword({
          role,
          email: form.email,
          password: form.password,
        });
        finishLogin(loggedInUser);
        return;
      }

      if (step === "form") {
        await handleSendOtp();
        return;
      }

      const channel = method === "mobile-otp" ? "phone" : "email";
      const loggedInUser = await verifyOtp({
        role,
        channel,
        email: form.email,
        phone: form.phone,
        otp: form.otp,
        name: form.name,
      });
      finishLogin(loggedInUser);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setError("");
    setLoading(true);
    try {
      await handleSendOtp();
    } catch (err) {
      setError(err.message || "Could not resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#fff7f8,transparent_42%),radial-gradient(circle_at_bottom_right,#eefaf4,transparent_40%),linear-gradient(180deg,#F8FFF6_0%,#ffffff_55%,#F5F5F0_100%)]">
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-5 sm:px-8">
        <Link to="/" className="text-lg font-extrabold tracking-tight text-[#E74660]">
          Tathaastu
        </Link>
        <div className="flex items-center gap-4 text-sm font-semibold text-[#064233]">
          <Link to="/" className="hover:text-[#E74660]">
            Home
          </Link>
          <Link to="/blog" className="hidden hover:text-[#E74660] sm:inline">
            Blog
          </Link>
          <Link
            to="/contact"
            className="rounded-full bg-[#064233] px-4 py-2 text-white hover:bg-[#0a5a45]"
          >
            Contact
          </Link>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-24 lg:flex-row lg:items-stretch lg:gap-10 lg:px-8">
        <div className="w-full max-w-md lg:max-w-lg">
          <div className="rounded-[1.75rem] border border-[#064233]/08 bg-white/95 p-6 shadow-[0_24px_60px_rgba(6,66,51,0.12)] backdrop-blur sm:p-8">
            <div className="mb-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E74660]">
                Secure access
              </p>
              <h1 className="mt-2 text-3xl font-extrabold text-[#064233]">
                {mode === "login" ? "Welcome back" : "Create your account"}
              </h1>
              <p className="mt-2 text-sm text-[#325d72]">
                Login as User, Expert, or Admin — with OTP or password.
              </p>
            </div>

            <div className="mb-5 grid grid-cols-3 gap-2">
              {ROLES.map((item) => {
                const Icon = item.icon;
                const active = role === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRole(item.id)}
                    className={`rounded-2xl border px-2 py-3 text-center transition ${
                      active
                        ? "border-[#E74660] bg-[#FFF5F7] shadow-sm"
                        : "border-[#064233]/10 bg-white hover:border-[#064233]/25"
                    }`}
                  >
                    <Icon
                      className={`mx-auto h-5 w-5 ${
                        active ? "text-[#E74660]" : "text-[#064233]"
                      }`}
                    />
                    <div
                      className={`mt-1 text-xs font-bold ${
                        active ? "text-[#E74660]" : "text-[#064233]"
                      }`}
                    >
                      {item.label}
                    </div>
                    <div className="mt-0.5 hidden text-[10px] text-[#8a9aa3] sm:block">
                      {item.hint}
                    </div>
                  </button>
                );
              })}
            </div>

            {mode === "login" ? (
              <div className="mb-5 flex gap-1 rounded-2xl bg-[#F3F7F5] p-1">
                {methodOptions.map((item) => {
                  const Icon = item.icon;
                  const active = method === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setMethod(item.id)}
                      className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-[11px] font-bold transition sm:text-xs ${
                        active
                          ? "bg-white text-[#064233] shadow-sm"
                          : "text-[#5d7580] hover:text-[#064233]"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{item.label}</span>
                      <span className="sm:hidden">
                        {item.id === "mobile-otp"
                          ? "Mobile"
                          : item.id === "email-otp"
                            ? "Email OTP"
                            : "Password"}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-4">
              {(mode === "register" ||
                (step === "otp" && method === "mobile-otp" && role === "user")) && (
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#064233]">
                    Full name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-[#064233]/15 bg-white px-4 py-3 text-[#064233] outline-none ring-[#E74660]/25 placeholder:text-[#8a9aa3] focus:border-[#E74660] focus:ring-2"
                    required={mode === "register"}
                  />
                </div>
              )}

              {(method === "email-password" ||
                method === "email-otp" ||
                mode === "register") &&
              step === "form" ? (
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#064233]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@email.com"
                    className="w-full rounded-xl border border-[#064233]/15 bg-white px-4 py-3 text-[#064233] outline-none ring-[#E74660]/25 placeholder:text-[#8a9aa3] focus:border-[#E74660] focus:ring-2"
                    required
                  />
                </div>
              ) : null}

              {(method === "mobile-otp" || mode === "register") && step === "form" ? (
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#064233]">
                    Mobile number
                    {mode === "register" ? (
                      <span className="font-normal text-[#8a9aa3]"> (optional)</span>
                    ) : null}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="10-digit mobile"
                    className="w-full rounded-xl border border-[#064233]/15 bg-white px-4 py-3 text-[#064233] outline-none ring-[#E74660]/25 placeholder:text-[#8a9aa3] focus:border-[#E74660] focus:ring-2"
                    required={method === "mobile-otp" && mode === "login"}
                    inputMode="numeric"
                    maxLength={10}
                  />
                </div>
              ) : null}

              {(method === "email-password" || mode === "register") && step === "form" ? (
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#064233]">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={onChange}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-[#064233]/15 bg-white px-4 py-3 pr-12 text-[#064233] outline-none ring-[#E74660]/25 placeholder:text-[#8a9aa3] focus:border-[#E74660] focus:ring-2"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a9aa3] hover:text-[#064233]"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              ) : null}

              {step === "otp" ? (
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#064233]">
                    Enter OTP
                  </label>
                  <input
                    name="otp"
                    value={form.otp}
                    onChange={onChange}
                    placeholder="6-digit code"
                    className="w-full rounded-xl border border-[#064233]/15 bg-white px-4 py-3 text-center text-lg tracking-[0.35em] text-[#064233] outline-none ring-[#E74660]/25 placeholder:tracking-normal placeholder:text-[#8a9aa3] focus:border-[#E74660] focus:ring-2"
                    required
                    inputMode="numeric"
                    maxLength={6}
                  />
                  <div className="mt-2 flex items-center justify-between text-xs text-[#325d72]">
                    <span>
                      Sent to {otpMeta?.targetMasked || "your contact"}
                    </span>
                    <button
                      type="button"
                      onClick={resendOtp}
                      className="font-bold text-[#E74660] hover:underline"
                      disabled={loading}
                    >
                      Resend OTP
                    </button>
                  </div>
                  {devOtp ? (
                    <p className="mt-2 rounded-lg bg-[#F8FFF6] px-3 py-2 text-xs text-[#064233]">
                      Dev OTP: <strong>{devOtp}</strong> (shown only in local/dev)
                    </p>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => {
                      setStep("form");
                      setForm((prev) => ({ ...prev, otp: "" }));
                    }}
                    className="mt-2 text-xs font-semibold text-[#064233] hover:text-[#E74660]"
                  >
                    ← Change {method === "mobile-otp" ? "mobile number" : "email"}
                  </button>
                </div>
              ) : null}

              {error ? (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                  {error}
                </div>
              ) : null}
              {info && !error ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                  {info}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#E74660] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E74660]/25 transition hover:bg-[#d13a52] disabled:cursor-wait disabled:opacity-70"
              >
                {loading
                  ? "Please wait…"
                  : mode === "register"
                    ? "Create account"
                    : step === "otp"
                      ? "Verify & continue"
                      : method === "email-password"
                        ? "Sign in"
                        : "Send OTP"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-5 text-center text-sm text-[#325d72]">
              {mode === "login" ? (
                <>
                  New here?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("register");
                      setMethod("email-password");
                      if (role === "admin") setRole("user");
                    }}
                    className="font-bold text-[#E74660] hover:underline"
                  >
                    Register free
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="font-bold text-[#E74660] hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>

            {role === "admin" && mode === "login" ? (
              <p className="mt-4 rounded-xl bg-[#F3F7F5] px-3 py-2 text-center text-[11px] text-[#325d72]">
                Seed admin (local): <strong>admin@tathaastu.com</strong> /{" "}
                <strong>Admin@12345</strong>
              </p>
            ) : null}
          </div>
        </div>

        <div className="relative mt-10 hidden flex-1 overflow-hidden rounded-[1.75rem] border border-[#064233]/08 bg-gradient-to-br from-[#064233] via-[#0a5a45] to-[#12352c] p-10 text-white lg:mt-0 lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              Tathaastu
            </p>
            <h2 className="mt-3 max-w-md text-4xl font-extrabold leading-tight">
              Guidance that feels personal — for seekers, experts &amp; admins.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
              One secure doorway. Choose your role, verify with OTP or password, and
              continue to your dashboard.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6">
            <div className="text-center">
              <img src={CapricornLogin} alt="" className="mx-auto h-20 w-20" />
              <p className="mt-2 text-xs font-semibold tracking-wide text-white/80">
                CAPRICORN
              </p>
            </div>
            <div className="text-center">
              <img src={AquariusLogin} alt="" className="mx-auto h-20 w-20" />
              <p className="mt-2 text-xs font-semibold tracking-wide text-white/80">
                AQUARIUS
              </p>
            </div>
            <div className="text-center">
              <img src={ScorpioLogin} alt="" className="mx-auto h-20 w-20" />
              <p className="mt-2 text-xs font-semibold tracking-wide text-white/80">
                SCORPIO
              </p>
            </div>
            <div className="text-center">
              <img src={MandalaCorner} alt="" className="mx-auto h-20 w-20 opacity-90" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

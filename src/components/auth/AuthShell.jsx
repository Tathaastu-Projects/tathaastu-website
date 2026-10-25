"use client";

import React from "react";
import { Link } from "@/lib/router";
import { Sparkles, ShieldCheck, Award, HeartHandshake, ArrowLeft } from "lucide-react";
import tathaastuLogo from "../../assets/tathaastu_logo.png";
import CapricornLogin from "../../assets/CAPRICORN_login.svg";
import AquariusLogin from "../../assets/AQUARIUS_login.svg";
import ScorpioLogin from "../../assets/SCORPIO_login.svg";
import MandalaCorner from "../../assets/mandala_corner_login.svg";

export default function AuthShell({
  title,
  subtitle,
  children,
  badge = "SACRED VEDIC ACCESS",
}) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-between text-[#073349]">
      {/* Top Header bar with Logo & Return Home */}
      <header className="w-full px-4 sm:px-8 py-4 flex items-center justify-between border-b border-[#073349]/8 bg-white/80 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2" aria-label="Tathaastu Home">
          <img
            src={tathaastuLogo}
            alt="Tathaastu"
            className="h-10 sm:h-12 w-auto"
          />
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0B4B41] hover:text-[#C45C26] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Auth Split Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-5xl rounded-3xl bg-white shadow-[0_20px_50px_rgba(7,51,73,0.1)] border border-[#073349]/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Celestial Vedic Showcase (Desktop) */}
          <div className="relative hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#04271E] via-[#064233] to-[#073349] p-10 flex-col justify-between text-white overflow-hidden">
            {/* Background Ornaments */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-15 pointer-events-none">
              <img src={MandalaCorner} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 opacity-10 pointer-events-none">
              <img src={AquariusLogin} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="absolute top-1/2 right-4 w-32 h-32 opacity-10 pointer-events-none">
              <img src={CapricornLogin} alt="" className="w-full h-full object-contain" />
            </div>

            {/* Top Badge */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#C9A227]/40 text-[#F7DF8F] text-xs font-bold tracking-wider uppercase mb-6 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>{badge}</span>
              </div>
              <h2 className="font-playfair text-3xl font-bold leading-tight mb-3 text-white">
                Ancient Guidance, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7DF8F] to-[#D4AF37]">
                  Modern Clarity.
                </span>
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed max-w-xs">
                Connect with revered Vedic astrologers, decode your Kundli, and discover divine alignment for career, marriage, and health.
              </p>
            </div>

            {/* Trust Markers */}
            <div className="relative z-10 space-y-4 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-[#C9A227]/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#F7DF8F]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">100% Confidential</h3>
                  <p className="text-[11px] text-gray-300">Your discussions and charts remain strictly private.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-[#C9A227]/30 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-[#F7DF8F]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Verified Vedic Masters</h3>
                  <p className="text-[11px] text-gray-300">Strictly credentialed Jyotish and Vaastu practitioners.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-[#C9A227]/30 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-4 h-4 text-[#F7DF8F]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Actionable Satvik Remedies</h3>
                  <p className="text-[11px] text-gray-300">Empowering, non-fear guidance for your true path.</p>
                </div>
              </div>
            </div>

            {/* Bottom Quote */}
            <div className="relative z-10 pt-4">
              <p className="text-[11px] text-white/60 italic">
                “Yatha Pinde Tatha Brahmande” — As is the human body, so is the cosmic universe.
              </p>
            </div>
          </div>

          {/* Right Column: Form Area */}
          <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
              <div className="mb-6">
                <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-[#0B4B41] tracking-tight">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-1 text-sm text-gray-600">
                    {subtitle}
                  </p>
                )}
              </div>

              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-gray-500 border-t border-[#073349]/8 bg-white/50">
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/terms-and-conditions" className="hover:text-[#0B4B41] transition-colors">
            Terms & Conditions
          </Link>
          <span>•</span>
          <Link to="/privacy-policy" className="hover:text-[#0B4B41] transition-colors">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link to="/contact" className="hover:text-[#0B4B41] transition-colors">
            Support Desk
          </Link>
        </div>
        <p className="mt-1.5 text-gray-400">© {new Date().getFullYear()} Tathaastu. All rights reserved.</p>
      </footer>
    </div>
  );
}

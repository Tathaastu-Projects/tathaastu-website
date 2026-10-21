"use client";

import React from 'react';
import { Link } from "@/lib/router";
import { ArrowUp } from 'lucide-react';
import tathaastuWhiteLogo from '../assets/logo/tathasstu_white_logo.png';

function SocialIcon({ children }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      {children}
    </svg>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full">
      {/* CTA band */}
      <section className="bg-[#064233] py-6 sm:py-7">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-6 md:px-8 lg:px-10 text-center text-white">
          <div className="text-lg sm:text-xl md:text-2xl font-extrabold leading-snug">
            Ready to Know Your Future?
          </div>
          <div className="mt-1.5 text-xs sm:text-sm text-white/85 max-w-xl mx-auto">
            Talk to an expert and get guidance that feels personal and accurate.
          </div>
          <div className="mt-3.5 flex justify-center">
            <button
              type="button"
              onClick={scrollToTop}
              className="rounded-full bg-[#E74660] px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-extrabold text-white shadow-md hover:bg-[#d13a52] w-full sm:w-auto max-w-xs"
            >
              Book Your Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer links */}
      <section className="bg-[#064233] text-white border-t border-white/10">
        <div className="mx-auto max-w-[1680px] px-4 py-5 sm:py-6 md:py-7 sm:px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2.5">
              <div className="flex items-center">
                <img
                  src={tathaastuWhiteLogo}
                  alt="Tathaastu"
                  className="h-10 w-auto max-w-full object-contain sm:h-12 md:h-14"
                />
              </div>
              <p className="text-xs leading-relaxed text-white/80">
                At Tathasstu, we help you align your life with the rhythm of the universe. From astrology and healing to spiritual courses and remedies, we're your trusted guide on the journey to self-awareness and divine balance.
              </p>

              <div className="flex items-center gap-2 pt-1">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10 transition hover:bg-white/15"
                >
                  <SocialIcon>
                    <path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.2l.8-3H13V9c0-.6.4-1 1-1z" fill="currentColor" stroke="none" />
                  </SocialIcon>
                </a>
                <a
                  href="https://www.youtube.com/@Tathasstu_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10 transition hover:bg-white/15"
                >
                  <SocialIcon>
                    <rect x="3.5" y="7" width="17" height="10.5" rx="2.5" />
                    <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5z" fill="currentColor" stroke="none" />
                  </SocialIcon>
                </a>
                <a
                  href="https://www.instagram.com/tathasstu_official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10 transition hover:bg-white/15"
                >
                  <SocialIcon>
                    <rect x="4" y="4" width="16" height="16" rx="4" />
                    <circle cx="12" cy="12" r="3.5" />
                    <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
                  </SocialIcon>
                </a>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="text-xs font-extrabold tracking-wide text-white/95 uppercase">Quick Links</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-white/80">
                <a href="#" className="hover:text-white">Home</a>
                <a href="#" className="hover:text-white">Services</a>
                <a href="#" className="hover:text-white">Courses</a>
                <a href="#" className="hover:text-white">Pricing</a>
                <a href="#" className="hover:text-white">Blog</a>
                <a href="#" className="hover:text-white">Contact</a>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="text-xs font-extrabold tracking-wide text-white/95 uppercase">Services</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-white/80">
                <a href="#" className="hover:text-white">Vaastu for Home</a>
                <a href="#" className="hover:text-white">Vaastu for Offices</a>
                <a href="#" className="hover:text-white">Vaastu for Factories</a>
                <a href="#" className="hover:text-white">Astrology - Kundli Reading</a>
                <a href="#" className="hover:text-white">Vedic Astrology</a>
                <a href="#" className="hover:text-white">Numerology</a>
                <a href="#" className="hover:text-white">Pooja Services</a>
                <a href="#" className="hover:text-white">Horoscope Matching</a>
                <a href="#" className="hover:text-white">Tarot Reading</a>
                <a href="#" className="hover:text-white">Crystal Healing</a>
                <a href="#" className="hover:text-white">Pet Healing</a>
                <a href="#" className="hover:text-white">Dowsing</a>
                <a href="#" className="hover:text-white">Aura Healing &amp; Scanning</a>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="text-xs font-extrabold tracking-wide text-white/95 uppercase">Contact</div>
              <div className="grid gap-1.5 text-xs text-white/80">
                <Link to="/about" className="hover:text-white">About Us</Link>
                <a href="#" className="hover:text-white">Contact Us</a>
                <a href="#" className="hover:text-white">Classes</a>
                <a href="#" className="hover:text-white">FAQs</a>
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms &amp; Conditions</a>
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-white/15 pt-3.5 flex flex-col items-center justify-between gap-3 md:flex-row">
            <div className="text-[11px] text-white/65">© {new Date().getFullYear()} Tathaastu. All rights reserved.</div>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-[11px] font-extrabold text-[#4E1B6E] shadow-sm hover:bg-white/90"
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
              Back to Top
            </button>
          </div>
        </div>
      </section>
    </footer>
  );
}

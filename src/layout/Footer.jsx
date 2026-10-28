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
      {/* Footer links */}
      <section className="bg-[#064233] text-white">
        <div className="mx-auto max-w-[1680px] px-4 py-5 sm:py-6 md:py-7 sm:px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2.5">
              <Link to="/" className="inline-flex items-center">
                <img
                  src={tathaastuWhiteLogo}
                  alt="Tathaastu"
                  className="h-10 w-auto max-w-full object-contain sm:h-12 md:h-14"
                />
              </Link>
              <p className="text-xs leading-relaxed text-white/80">
                At Tathasstu, we help you align your life with the rhythm of the universe. From astrology and healing to spiritual courses and remedies, we're your trusted guide on the journey to self-awareness and divine balance.
              </p>

              <div className="flex items-center gap-2 pt-1">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
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
                <Link to="/" className="hover:text-white">Home</Link>
                <Link to="/services" className="hover:text-white">Services</Link>
                <Link to="/courses" className="hover:text-white">Courses</Link>
                <Link to="/pricing" className="hover:text-white">Pricing</Link>
                <Link to="/blog" className="hover:text-white">Blog</Link>
                <Link to="/contact" className="hover:text-white">Contact</Link>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="text-xs font-extrabold tracking-wide text-white/95 uppercase">Services</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-white/80">
                <Link to="/services/vastu-shastra" className="hover:text-white">Vaastu for Home</Link>
                <Link to="/services/vastu-shastra" className="hover:text-white">Vaastu for Offices</Link>
                <Link to="/services/vastu-shastra" className="hover:text-white">Vaastu for Factories</Link>
                <Link to="/services/astrology-kundli" className="hover:text-white">Astrology - Kundli Reading</Link>
                <Link to="/services/vedic-astrology" className="hover:text-white">Vedic Astrology</Link>
                <Link to="/services/numerologists" className="hover:text-white">Numerology</Link>
                <Link to="/services/pooja-services" className="hover:text-white">Pooja Services</Link>
                <Link to="/services/horoscope-matching" className="hover:text-white">Horoscope Matching</Link>
                <Link to="/services/tarot-reading" className="hover:text-white">Tarot Reading</Link>
                <Link to="/services/crystal-healing" className="hover:text-white">Crystal Healing</Link>
                <Link to="/services/pet-healing" className="hover:text-white">Pet Healing</Link>
                <Link to="/services/dowsing" className="hover:text-white">Dowsing</Link>
                <Link to="/services/aura-healing-scanning" className="hover:text-white">Aura Healing &amp; Scanning</Link>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="text-xs font-extrabold tracking-wide text-white/95 uppercase">Support & Legal</div>
              <div className="grid gap-1.5 text-xs text-white/80">
                <Link to="/about" className="hover:text-white">About Us</Link>
                <Link to="/contact" className="hover:text-white">Contact Us</Link>
                <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
                <Link to="/terms-and-conditions" className="hover:text-white">Terms &amp; Conditions</Link>
                <Link to="/cancellation-refund-policy" className="hover:text-white">Cancellation &amp; Refund</Link>
              </div>
              <div className="pt-2 text-xs text-white/75 space-y-1.5">
                <div>
                  <span className="text-white/50">Email:</span>{" "}
                  <a href="mailto:care@tathasstu.com" className="text-[#ecd599] hover:underline font-medium">
                    care@tathasstu.com
                  </a>
                </div>
                <div>
                  <span className="text-white/50">Mobile:</span>{" "}
                  <a href="tel:+919756303737" className="text-[#ecd599] hover:underline font-medium">
                    +91-9756303737
                  </a>
                </div>
                <div className="pt-2 text-xs text-white/80 leading-relaxed border-t border-white/10 mt-2">
                  <div className="text-white/50 text-[11px] font-semibold uppercase tracking-wider mb-1">Office Address</div>
                  <div className="text-white/75">Office no -201, Plot no 3, Stellar 1423</div>
                  <div className="text-white/75">Sector 142, Noida, Gautambuddha Nagar</div>
                  <div className="text-white/75">Uttar Pradesh, 201305</div>
                </div>
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

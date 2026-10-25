"use client";

import React from "react";
import { Link } from "@/lib/router";

export default function SolarHero() {
  return (
    <section className="home7 hs_slider_main_wrapper">
      <div className="hs_slider_bg_track" aria-hidden="true">
        <div className="hs_slider_bg_layer" />
        <div className="hs_slider_bg_layer" />
      </div>
      <div className="hs_slider_img_overlay" />

      <div className="hs_slider_heading_wrapper">
        <div className="hs_slider_logo_cont_wraper">
          <h2 className="hs_slider_title_1">
            Unlock the secret of your{" "}
            <span className="hs_slider_title_accent">Destiny</span>
          </h2>
          <p className="hs_slider_subtext hs_slider_subtext_body">
            Ancient astrology wisdom combined with modern guidance to solve career, money,
            relationship and life challenges.​
          </p>

          <div className="hs_slider_cta_row">
            <Link to="/pricing" className="hs_slider_cta hs_slider_cta_primary">
              <svg className="hs_slider_cta_icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="hs_slider_cta_sep" aria-hidden="true" />
              <span className="hs_slider_cta_lbl">
                <span className="hs_slider_cta_lbl_sub">Talk to an astrologer</span>
                <span className="hs_slider_cta_lbl_main">Book Consultation</span>
              </span>
            </Link>

            <Link to="/calculator" className="hs_slider_cta hs_slider_cta_secondary">
              <svg className="hs_slider_cta_icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="hs_slider_cta_sep hs_slider_cta_sep_dark" aria-hidden="true" />
              <span className="hs_slider_cta_lbl">
                <span className="hs_slider_cta_lbl_sub">No signup needed</span>
                <span className="hs_slider_cta_lbl_main">Get Free Insight</span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="hs_slider_cont_wrapper" aria-hidden="true">
        <div className="orbit-ring orbit-ring-1" />
        <div className="orbit-ring orbit-ring-2" />
        <div className="orbit-ring orbit-ring-3" />
        <div className="orbit-ring orbit-ring-4" />

        <div className="hs_sun">
          <div className="star" />
          <div className="sun-shadow" />
          <div className="hs_waves2">
            <div className="hs_wave" />
            <div className="hs_wave" />
            <div className="hs_wave" />
            <div className="hs_wave" />
          </div>
        </div>

        <div className="mercury">
          <div className="planet">
            <div className="shadow" />
          </div>
        </div>
        <div className="venus">
          <div className="planet">
            <div className="shadow" />
          </div>
        </div>
        <div className="earth">
          <div className="planet">
            <div className="shadow" />
          </div>
        </div>
        <div className="mars">
          <div className="planet">
            <div className="shadow" />
          </div>
        </div>
        <div className="jupiter">
          <div className="planet">
            <div className="shadow" />
          </div>
        </div>
      </div>
    </section>
  );
}

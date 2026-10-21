"use client";

import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "@/lib/router";
import {
  ArrowLeft,
  BadgeCheck,
  MessageCircle,
  Phone,
  Star,
  Video,
} from "lucide-react";
import SiteNavbar from "../layout/SiteNavbar";
import Footer from "../layout/Footer";
import AstroFaqSection from "../components/Home/AstroFaqSection";
import { useConnectModal } from "../contexts/ConnectModalContext";
import {
  fetchAstrologerBySlug,
  formatSessionPrice,
} from "../services/astrologersApi";

function formatList(value, sep = ", ") {
  if (Array.isArray(value)) return value.join(sep);
  return String(value || "");
}

function reviewInitial(name = "") {
  return String(name).trim().charAt(0).toUpperCase() || "A";
}

export default function AstrologerProfile() {
  const { slug } = useParams();
  const { openModal } = useConnectModal();
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const data = await fetchAstrologerBySlug(slug);
        if (cancelled) return;
        setExpert(data);
      } catch {
        if (cancelled) return;
        setExpert(null);
        setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!loading && notFound) {
    return <Navigate to="/talk-to-astrologers" replace />;
  }

  const price = expert ? formatSessionPrice(expert) : null;
  const firstName = expert?.name?.split(" ")[0] || "Expert";
  const specialties = formatList(expert?.expertise);
  const languages = formatList(expert?.languages);

  return (
    <div className="talk-page">
      <SiteNavbar />

      <main className="talk-wrap talk-profile">
        <Link to="/talk-to-astrologers" className="talk-profile__back">
          <ArrowLeft className="h-4 w-4" />
          Back to experts
        </Link>

        {loading || !expert ? (
          <div className="talk-empty">Loading expert profile...</div>
        ) : (
          <>
            {/* Hero summary card */}
            <section className="ap-hero">
              <div className="ap-hero__top">
                <div
                  className={`ap-hero__avatar-wrap${expert.online ? " is-online" : ""}`}
                >
                  <img
                    src={expert.imageUrl}
                    alt={expert.name}
                    className="ap-hero__avatar"
                  />
                </div>

                <div className="ap-hero__info">
                  <div className="ap-hero__title-row">
                    <div>
                      <h1 className="ap-hero__name">
                        {expert.name}
                        {expert.verified ? (
                          <span className="ap-hero__pro" title="Verified">
                            Pro
                          </span>
                        ) : null}
                      </h1>
                      {specialties ? (
                        <p className="ap-hero__skills">{specialties}</p>
                      ) : null}
                      {languages ? (
                        <p className="ap-hero__langs">{languages}</p>
                      ) : null}
                    </div>
                    <div className="ap-hero__price">
                      <strong>{price.amount}</strong>
                      <span>
                        {" "}
                        / {expert.priceDuration || 30} {expert.priceUnit || "min"}
                      </span>
                    </div>
                  </div>

                  <div className="ap-hero__tabs">
                    <button
                      type="button"
                      className={`ap-pill${tab === "overview" ? " is-active" : ""}`}
                      onClick={() => {
                        setTab("overview");
                        document
                          .getElementById("ap-about")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Overview
                    </button>
                    <button
                      type="button"
                      className="ap-pill"
                      onClick={openModal}
                    >
                      <Phone className="h-4 w-4" />
                      Call now
                    </button>
                    <button
                      type="button"
                      className="ap-pill"
                      onClick={openModal}
                    >
                      <Video className="h-4 w-4" />
                      Video Call now
                    </button>
                  </div>

                  <div className="ap-hero__stats">
                    <div>
                      <strong>{expert.expYears} yrs</strong>
                      <span>Experience</span>
                    </div>
                    <div>
                      <strong>{expert.consultations}</strong>
                      <span>Consultations</span>
                    </div>
                    <div>
                      <strong className="ap-hero__rating">
                        <Star className="h-4 w-4 fill-[#F5B301] text-[#F5B301]" />
                        {expert.rating}
                      </strong>
                      <span>Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* About + Consult */}
            <section className="ap-body">
              <div className="ap-main" id="ap-about">
                <h2>About {firstName}</h2>
                {(expert.about || "")
                  .split(/\n+/)
                  .filter(Boolean)
                  .map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
                {!expert.about ? (
                  <p>
                    {firstName} is a verified Tathaastu expert offering guidance
                    through live consultations.
                  </p>
                ) : null}

                <h2 className="ap-main__spaced">Areas of expertise</h2>
                <ul className="ap-expertise">
                  {(expert.expertise || []).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <aside className="ap-consult" aria-label="Consult">
                <h3>Consult</h3>
                <p className="ap-consult__price">
                  <strong>{price.amount}</strong>
                  <span>
                    {" "}
                    / {expert.priceDuration || 30} {expert.priceUnit || "min"}
                  </span>
                </p>
                <button
                  type="button"
                  className="ap-consult__btn"
                  onClick={openModal}
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat now
                </button>
                <button
                  type="button"
                  className="ap-consult__btn"
                  onClick={openModal}
                >
                  <Phone className="h-4 w-4" />
                  Call now
                </button>
                <button
                  type="button"
                  className="ap-consult__btn"
                  onClick={openModal}
                >
                  <Video className="h-4 w-4" />
                  Video Call
                </button>
                {expert.verified ? (
                  <p className="ap-consult__verified">
                    <BadgeCheck
                      className="h-4 w-4"
                      fill="currentColor"
                      stroke="#fff"
                    />
                    Verified Astrologer
                  </p>
                ) : null}
              </aside>
            </section>

            {/* Reviews */}
            <section className="ap-reviews">
              <h2>Reviews and Ratings</h2>
              <div className="ap-reviews__grid">
                {(expert.reviews || []).length ? (
                  (expert.reviews || []).map((review) => (
                    <article
                      key={`${review.name}-${review.text}`}
                      className="ap-review"
                    >
                      <div className="ap-review__head">
                        <span className="ap-review__avatar" aria-hidden="true">
                          {reviewInitial(review.name)}
                        </span>
                        <div>
                          <strong>{review.name}</strong>
                          <div className="ap-review__stars">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3.5 w-3.5 ${
                                  i < (review.rating || 0)
                                    ? "fill-[#F5B301] text-[#F5B301]"
                                    : "text-[#d5dde1]"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p>{review.text}</p>
                    </article>
                  ))
                ) : (
                  <p className="ap-reviews__empty">No reviews yet.</p>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      <AstroFaqSection id="profile-faq" />
      <Footer />
    </div>
  );
}

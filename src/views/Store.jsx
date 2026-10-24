"use client";

import React, { useEffect } from "react";

const ABHIMANTRIT_STORE_URL = "https://www.abhimantritstore.com/";

export default function Store() {
  useEffect(() => {
    window.location.replace(ABHIMANTRIT_STORE_URL);
  }, []);

  return (
    <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif", gap: "1rem" }}>
      <p style={{ fontSize: "1.1rem", color: "#064233" }}>
        Redirecting you to <strong>Abhimantrit Store</strong>...
      </p>
      <a
        href={ABHIMANTRIT_STORE_URL}
        style={{
          padding: "0.6rem 1.4rem",
          background: "#064233",
          color: "#fff",
          borderRadius: "999px",
          textDecoration: "none",
          fontWeight: "bold"
        }}
      >
        Click here if not redirected
      </a>
    </div>
  );
}

/*
=============================================================================
  PREVIOUS STORE CODE COMMENTED OUT AS PER REQUIREMENT
=============================================================================
"use client";

import React from "react";
import { Link } from "@/lib/router";
import SiteNavbar from "../layout/SiteNavbar";
import Footer from "../layout/Footer";
import ProductCard from "../components/Store/ProductCard";
import StoreFaq from "../components/Store/StoreFaq";
import {
  STORE_CATEGORIES,
  STORE_HERO,
  STORE_INTENTIONS,
  getRecommendedProducts,
} from "../data/storeData";

export default function Store() {
  const recommended = getRecommendedProducts(8);

  return (
    <div className="store-page">
      <SiteNavbar />

      <div className="store-wrap">
        <section className="store-hero">
          <div className="store-hero__panel">
            <div className="store-hero__copy">
              <h1>{STORE_HERO.title}</h1>
              <p>{STORE_HERO.subtitle}</p>
              <div className="store-hero__actions">
                <Link to={STORE_HERO.ctaPath} className="store-btn store-btn--primary">
                  {STORE_HERO.cta}
                </Link>
                <Link to="/consultation-booking" className="store-btn store-btn--ghost">
                  Talk to an Expert
                </Link>
              </div>
            </div>
            <div className="store-hero__visual" aria-hidden="true">
              <div className="store-hero__orb" />
              <img className="store-hero__mandala" src={STORE_HERO.image} alt="" />
            </div>
          </div>
        </section>

        <section className="store-section">
          <div className="store-section__head">
            <div>
              <h2>Shop by Category</h2>
              <p>Puja, remedies, gemstones, and more — curated for daily spiritual life.</p>
            </div>
            <Link to="/store/puja" className="store-link">
              View all →
            </Link>
          </div>
          <div className="store-cats">
            {STORE_CATEGORIES.map((cat) => (
              <Link key={cat.id} to={`/store/${cat.slug}`} className="store-cat">
                <img src={cat.image} alt={cat.name} />
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="store-section">
          <div className="store-section__head">
            <div>
              <h2>Our Recommendations</h2>
              <p>Expert-picked essentials loved by our community.</p>
            </div>
          </div>
          <div className="store-grid">
            {recommended.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="store-section">
          <div className="store-section__head">
            <div>
              <h2>Shop by Intention</h2>
              <p>Choose products aligned with the energy you want to invite.</p>
            </div>
          </div>
          <div className="store-grid store-grid--intent">
            {STORE_INTENTIONS.map((item) => (
              <Link key={item.id} to={`/store/puja?intention=${item.id}`} className="store-intent">
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </section>

        <StoreFaq />
      </div>

      <Footer />
    </div>
  );
}

*/

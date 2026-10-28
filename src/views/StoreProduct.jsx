"use client";

import React, { useEffect } from "react";

const ABHIMANTRIT_STORE_URL = "https://www.abhimantritstore.com/";

export default function StoreProduct() {
  /* Temporarily commented out for 2 days per user request:
  useEffect(() => {
    window.location.replace(ABHIMANTRIT_STORE_URL);
  }, []);
  */

  return (
    <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif", gap: "1rem" }}>
      <p style={{ fontSize: "1.25rem", color: "#4E1B6E", fontWeight: "600" }}>
        Abhimantrit Store
      </p>
      <p style={{ fontSize: "1rem", color: "#666" }}>
        Coming Soon
      </p>
      {/*
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
      */}
    </div>
  );
}

/*
=============================================================================
  PREVIOUS STOREPRODUCT CODE COMMENTED OUT AS PER REQUIREMENT
=============================================================================
"use client";

import React, { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "@/lib/router";
import { Star } from "lucide-react";
import SiteNavbar from "../layout/SiteNavbar";
import Footer from "../layout/Footer";
import ProductCard from "../components/Store/ProductCard";
import ProductStage from "../components/store/ProductStage";
import {
  formatInr,
  getCategoryBySlug,
  getProductBySlug,
  getRelatedProducts,
} from "../data/storeData";

const TABS = [
  { id: "about", label: "About this product" },
  { id: "how", label: "How to use" },
  { id: "benefits", label: "Benefits" },
];

export default function StoreProduct() {
  const { productSlug } = useParams();
  const product = getProductBySlug(productSlug);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("about");
  const related = useMemo(() => (product ? getRelatedProducts(product, 4) : []), [product]);
  const category = product ? getCategoryBySlug(product.category) : null;

  if (!product) {
    return <Navigate to="/store" replace />;
  }

  return (
    <div className="store-page">
      <SiteNavbar />

      <div className="store-wrap">
        <nav className="store-crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/store">Store</Link>
          <span>/</span>
          {category ? (
            <>
              <Link to={`/store/${category.slug}`}>{category.name}</Link>
              <span>/</span>
            </>
          ) : null}
          <span>{product.name}</span>
        </nav>

        <section className="store-pdp">
          <div className="store-pdp__gallery">
            {product.view ? <ProductStage product={product} /> : <img src={product.image} alt={product.name} />}
          </div>

          <div className="store-pdp__info">
            {product.badge ? (
              <span className="store-card__badge" style={{ position: "static", display: "inline-block" }}>
                {product.badge}
              </span>
            ) : null}
            <h1>{product.name}</h1>
            <div className="store-pdp__meta">
              <span className="store-card__rating">
                <Star className="h-4 w-4 fill-current" />
                {product.rating}
                <em>({product.reviews} reviews)</em>
              </span>
            </div>
            <div className="store-pdp__price">
              <strong>{formatInr(product.price)}</strong>
              {product.mrp ? <s>{formatInr(product.mrp)}</s> : null}
            </div>
            <p className="store-pdp__desc">{product.shortDesc}</p>

            <div className="store-pdp__actions">
              <div className="store-qty" aria-label="Quantity">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  −
                </button>
                <span>{qty}</span>
                <button type="button" onClick={() => setQty((q) => q + 1)}>
                  +
                </button>
              </div>
              <button type="button" className="store-btn store-btn--primary">
                Add to Cart
              </button>
              <button type="button" className="store-btn store-btn--outline">
                Buy Now
              </button>
            </div>
          </div>
        </section>

        <section className="store-tabs">
          <div className="store-tabs__nav">
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={tab === item.id ? "is-active" : ""}
                onClick={() => setTab(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="store-tabs__panel">
            {tab === "about" ? <p>{product.description}</p> : null}
            {tab === "how" ? <p>{product.howToUse}</p> : null}
            {tab === "benefits" ? (
              <ul>
                {product.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>

        {related.length ? (
          <section className="store-section">
            <div className="store-section__head">
              <div>
                <h2>You may also like</h2>
                <p>Complementary picks for your spiritual practice.</p>
              </div>
            </div>
            <div className="store-grid">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <Footer />
    </div>
  );
}

*/

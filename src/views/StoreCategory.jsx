"use client";

import React, { useEffect } from "react";

const ABHIMANTRIT_STORE_URL = "https://www.abhimantritstore.com/";

export default function StoreCategory() {
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
  PREVIOUS STORECATEGORY CODE COMMENTED OUT AS PER REQUIREMENT
=============================================================================
"use client";

import React, { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "@/lib/router";
import SiteNavbar from "../layout/SiteNavbar";
import Footer from "../layout/Footer";
import ProductCard from "../components/Store/ProductCard";
import StoreFaq from "../components/Store/StoreFaq";
import {
  STORE_FILTERS,
  getAllProducts,
  getCategoryBySlug,
  getProductsByCategory,
  getProductsByIntention,
} from "../data/storeData";

export default function StoreCategory() {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const intention = searchParams.get("intention");
  const category = getCategoryBySlug(categorySlug) || {
    name: "All Products",
    slug: "all",
    banner: getAllProducts()[0]?.image,
  };

  const [activeFilter, setActiveFilter] = useState("All Products");

  const products = useMemo(() => {
    let list = categorySlug ? getProductsByCategory(categorySlug) : getAllProducts();
    if (intention) {
      const byIntent = getProductsByIntention(intention);
      list = list.length ? list.filter((p) => byIntent.some((b) => b.id === p.id)) : byIntent;
      if (!list.length) list = byIntent;
    }
    if (activeFilter === "Best Sellers") {
      return [...list].sort((a, b) => b.reviews - a.reviews);
    }
    if (activeFilter === "New Arrivals") {
      return [...list].reverse();
    }
    const filterMap = {
      "Puja Essentials": "puja",
      Gemstones: "gemstones",
      Rudraksha: "rudraksha",
      Crystals: "crystals",
      "Vastu Items": "vastu",
      "Incense & Dhoop": "incense",
      Yantras: "yantras",
    };
    const mapped = filterMap[activeFilter];
    if (mapped) return list.filter((p) => p.category === mapped);
    return list;
  }, [categorySlug, intention, activeFilter]);

  return (
    <div className="store-page">
      <SiteNavbar />

      <div className="store-wrap">
        <nav className="store-crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/store">Store</Link>
          <span>/</span>
          <span>{category.name}</span>
        </nav>

        <div className="store-banner">
          <img src={category.banner || category.image} alt="" />
          <div className="store-banner__content">
            <h1>{category.name}</h1>
            <p>Curated spiritual products for ritual, remedy, and everyday harmony.</p>
          </div>
        </div>

        <div className="store-layout store-section" style={{ paddingTop: "1.75rem" }}>
          <aside className="store-sidebar">
            <h3>Filters</h3>
            <ul>
              {STORE_FILTERS.map((filter) => (
                <li key={filter}>
                  <button
                    type="button"
                    className={activeFilter === filter ? "is-active" : ""}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div>
            <div className="store-toolbar">
              <p>
                Showing <strong>{products.length}</strong> products
                {intention ? ` for ${intention}` : ""}
              </p>
            </div>
            {products.length ? (
              <div className="store-grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-[#4a6670]">No products found in this filter. Try another category.</p>
            )}
          </div>
        </div>

        <StoreFaq />
      </div>

      <Footer />
    </div>
  );
}

*/

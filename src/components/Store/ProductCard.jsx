"use client";

import React from "react";
import { Link } from "@/lib/router";
import { Star } from "lucide-react";
import { formatInr } from "../../data/storeData";

export default function ProductCard({ product, imageSwap = false }) {
  return (
    <article className="store-card">
      <Link to={`/store/product/${product.slug}`} className="store-card__media">
        <img
          className={imageSwap ? "store-card__shot" : undefined}
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
        {imageSwap && product.hoverImage ? (
          <img className="store-card__swap" src={product.hoverImage} alt="" aria-hidden="true" />
        ) : null}
        {product.badge ? <span className="store-card__badge">{product.badge}</span> : null}
        {product.rating != null ? (
          <span className="store-card__score">
            <Star className="store-card__score-star" aria-hidden="true" />
            <span>{Number(product.rating).toFixed(1)}</span>
          </span>
        ) : null}
        {imageSwap ? <span className="store-card__bag">Add to Bag</span> : null}
      </Link>
      <div className="store-card__body">
        <Link to={`/store/product/${product.slug}`} className="store-card__title">
          {product.name}
        </Link>
        <div className="store-card__price">
          <strong>{formatInr(product.price)}</strong>
          {product.mrp ? <s>{formatInr(product.mrp)}</s> : null}
        </div>
        {imageSwap ? null : (
          <Link to={`/store/product/${product.slug}`} className="store-btn store-btn--primary store-btn--block">
            Add to Cart
          </Link>
        )}
      </div>
    </article>
  );
}

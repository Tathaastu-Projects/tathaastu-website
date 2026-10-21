"use client";

import { useEffect, useState } from "react";
import ProductScene from "./ProductScene";

export default function ProductStage({ product }) {
  const [ready, setReady] = useState(false);
  const [spinning, setSpinning] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSpinning(!media.matches);
    setReady(true);
  }, []);

  return (
    <div className="product-stage">
      {ready ? <ProductScene product={product} spinning={spinning} /> : null}
      {product.beads?.length ? (
        <ul className="product-stage__rail" aria-label="Bead types">
          {product.beads.map((bead) => (
            <li key={bead.id}>
              <span style={{ background: bead.color }} />
              {bead.name}
            </li>
          ))}
        </ul>
      ) : null}
      <p className="product-stage__hint">Drag to turn</p>
    </div>
  );
}

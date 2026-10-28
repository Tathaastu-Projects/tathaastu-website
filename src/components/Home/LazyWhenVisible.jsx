"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mount children only when near the viewport — keeps below-fold JS/media off the critical path.
 */
export default function LazyWhenVisible({
  children,
  rootMargin = "280px 0px",
  minHeight = "14rem",
  className = "",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, visible]);

  return (
    <div
      ref={ref}
      className={className}
      style={visible ? undefined : { minHeight }}
    >
      {visible ? children : null}
    </div>
  );
}

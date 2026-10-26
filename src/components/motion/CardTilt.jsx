"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = [
  ".astro-service-card",
  ".astro-category",
  ".astro-trust-item",
  ".store-card",
].join(", ");

export default function CardTilt() {
  const pathname = usePathname();

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    if (media.matches || coarse.matches) return undefined;

    const handlers = new Map();
    const timer = window.setTimeout(() => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        const onMove = (event) => {
          const rect = el.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          el.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-6px)`;
        };
        const onLeave = () => {
          el.style.transform = "";
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        handlers.set(el, { onMove, onLeave });
      });
    }, 1200);

    return () => {
      window.clearTimeout(timer);
      handlers.forEach(({ onMove, onLeave }, el) => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
        el.style.transform = "";
      });
    };
  }, [pathname]);

  return null;
}

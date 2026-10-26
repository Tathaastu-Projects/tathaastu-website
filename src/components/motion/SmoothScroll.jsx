"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Lenis smooth scroll — deferred and desktop-only.
 * Touch devices keep native scroll (feels more responsive).
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const narrow = window.matchMedia("(max-width: 900px)");

    if (reduceMotion.matches || coarsePointer.matches || narrow.matches) {
      return undefined;
    }

    let cancelled = false;
    let lenis = null;
    let frame = 0;
    let idleId = 0;
    let timer = 0;

    const start = async () => {
      if (cancelled) return;
      const [{ default: Lenis }] = await Promise.all([
        import("lenis"),
        import("lenis/dist/lenis.css"),
      ]);
      if (cancelled) return;

      lenis = new Lenis({
        lerp: 0.12,
        smoothWheel: true,
        syncTouch: false,
      });

      const loop = (time) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    };

    const arm = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(() => start(), { timeout: 2000 });
      } else {
        timer = window.setTimeout(start, 900);
      }
    };

    arm();

    return () => {
      cancelled = true;
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timer) window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, [pathname]);

  return null;
}

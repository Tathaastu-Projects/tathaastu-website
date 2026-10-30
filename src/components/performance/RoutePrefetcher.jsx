"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** High-traffic routes — warm the JS/RSC cache while the user is idle. */
const HOT_ROUTES = [
  "/pricing",
  "/talk-to-astrologers",
  "/services",
  "/daily-horoscope",
  "/calculator",
  "/kundli-matching",
  "/about",
  "/contact",
  "/login",
];

/**
 * Prefetch primary destination pages after first paint so CTA clicks feel instant.
 */
export default function RoutePrefetcher() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    let idleId = 0;
    let timer = 0;
    let idx = 0;

    const prefetchNext = () => {
      if (cancelled || idx >= HOT_ROUTES.length) return;
      try {
        router.prefetch(HOT_ROUTES[idx]);
      } catch {
        /* ignore */
      }
      idx += 1;
      if (idx < HOT_ROUTES.length) {
        timer = window.setTimeout(prefetchNext, 120);
      }
    };

    const start = () => {
      if (cancelled) return;
      prefetchNext();
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(start, { timeout: 2200 });
    } else {
      timer = window.setTimeout(start, 600);
    }

    return () => {
      cancelled = true;
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timer) window.clearTimeout(timer);
    };
  }, [router]);

  return null;
}

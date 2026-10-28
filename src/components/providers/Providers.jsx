"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AuthProvider } from "@/contexts/AuthContext";
import { ConnectModalProvider } from "@/contexts/ConnectModalContext";
import useScrollToTop from "@/hooks/useScrollToTop";

// Lenis + card tilt disabled — they steal main-thread time and make scroll feel laggy.
// const SmoothScroll = dynamic(() => import("@/components/motion/SmoothScroll"), { ssr: false });
// const CardTilt = dynamic(() => import("@/components/motion/CardTilt"), { ssr: false });
// Watch Now floating promo — temporarily disabled
// const FloatingPromoVideo = dynamic(
//   () => import("@/components/FloatingPromoVideo"),
//   { ssr: false }
// );
const WhatsAppFloatingButton = dynamic(
  () => import("@/components/WhatsAppFloatingButton"),
  { ssr: false }
);
const CookieConsent = dynamic(
  () => import("@/components/analytics/CookieConsent"),
  { ssr: false }
);
const RouteTracker = dynamic(
  () =>
    import("@/components/analytics/CookieConsent").then((m) => ({
      default: m.RouteTracker,
    })),
  { ssr: false }
);

function ScrollManager() {
  useScrollToTop();
  return null;
}

function DeferredChrome({ children }) {
  const [extrasReady, setExtrasReady] = useState(false);

  useEffect(() => {
    let idleId = 0;
    let timer = 0;
    const enable = () => setExtrasReady(true);

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(enable, { timeout: 1800 });
    } else {
      timer = window.setTimeout(enable, 700);
    }

    return () => {
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <ScrollManager />
      {extrasReady ? <RouteTracker /> : null}
      {children}
      <WhatsAppFloatingButton />
      {extrasReady ? (
        <>
          {/* <SmoothScroll /> */}
          {/* <CardTilt /> */}
          {/* <FloatingPromoVideo /> */}
          <CookieConsent />
        </>
      ) : null}
    </>
  );
}

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ConnectModalProvider>
        <DeferredChrome>{children}</DeferredChrome>
      </ConnectModalProvider>
    </AuthProvider>
  );
}

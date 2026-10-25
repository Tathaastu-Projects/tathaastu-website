"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { AuthProvider } from "@/contexts/AuthContext";
import { ConnectModalProvider } from "@/contexts/ConnectModalContext";
import useScrollToTop from "@/hooks/useScrollToTop";

// Dynamically load non-critical floating elements and animation utilities
// to keep app/layout.js bundle light and prevent ChunkLoadError timeouts
const SmoothScroll = dynamic(() => import("@/components/motion/SmoothScroll"), {
  ssr: false,
});
const CardTilt = dynamic(() => import("@/components/motion/CardTilt"), {
  ssr: false,
});
const FloatingPromoVideo = dynamic(
  () => import("@/components/FloatingPromoVideo"),
  { ssr: false }
);
const WhatsAppFloatingButton = dynamic(
  () => import("@/components/WhatsAppFloatingButton"),
  { ssr: false }
);
const ConnectModalButton = dynamic(
  () => import("@/components/ConnectModalButton"),
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

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ConnectModalProvider>
        <SmoothScroll />
        <CardTilt />
        <Suspense fallback={<div className="min-h-screen bg-[#F8FFF6]" />}>
          <ScrollManager />
          <RouteTracker />
          {children}
        </Suspense>
        <FloatingPromoVideo />
        <WhatsAppFloatingButton />
        {/* Consultation modal commented out everywhere as per requirement */}
        {/* <ConnectModalButton /> */}
        <CookieConsent />
      </ConnectModalProvider>
    </AuthProvider>
  );
}

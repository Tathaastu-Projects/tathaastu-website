"use client";

import { Suspense } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { ConnectModalProvider } from "@/contexts/ConnectModalContext";
import FloatingPromoVideo from "@/components/FloatingPromoVideo";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import ConnectModalButton from "@/components/ConnectModalButton";
import SmoothScroll from "@/components/motion/SmoothScroll";
import CardTilt from "@/components/motion/CardTilt";
import CookieConsent, { RouteTracker } from "@/components/analytics/CookieConsent";
import useScrollToTop from "@/hooks/useScrollToTop";

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
        <ConnectModalButton />
        <CookieConsent />
      </ConnectModalProvider>
    </AuthProvider>
  );
}

"use client";

import React from "react";
import SiteNavbar from "../layout/SiteNavbar";
import Footer from "../layout/Footer";
import AstroHomePage from "../components/Home/AstroHomePage";

export default function Home() {
  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-white text-[#073349]">
      <SiteNavbar />
      <AstroHomePage />
      <Footer />
    </div>
  );
}

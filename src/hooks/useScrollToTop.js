"use client";

import { useEffect } from "react";
import { useLocation } from "@/lib/router";

const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname]);
};

export default useScrollToTop;



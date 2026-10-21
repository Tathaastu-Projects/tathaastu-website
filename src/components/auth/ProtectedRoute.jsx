"use client";

import React from "react";
import { Navigate, useLocation } from "@/lib/router";
import { useAuth } from "../../contexts/AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, user, booting } = useAuth();
  const location = useLocation();

  if (booting) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-[#F8FFF6] text-[#064233]">
        Checking your session…
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (roles?.length && !roles.includes(user?.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

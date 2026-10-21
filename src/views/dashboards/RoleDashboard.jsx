"use client";

import React from "react";
import { Link } from "@/lib/router";
import { useAuth } from "../../contexts/AuthContext";
import SiteNavbar from "../../layout/SiteNavbar";
import Footer from "../../layout/Footer";

const COPY = {
  user: {
    title: "User Dashboard",
    subtitle: "Track consultations, reports, and your spiritual journey.",
    accent: "#E74660",
  },
  expert: {
    title: "Expert Dashboard",
    subtitle: "Manage consultations, availability, and client requests.",
    accent: "#064233",
  },
  admin: {
    title: "Admin Dashboard",
    subtitle: "Oversee users, experts, enquiries, and platform settings.",
    accent: "#073349",
  },
};

export default function RoleDashboard({ role }) {
  const { user, logout } = useAuth();
  const meta = COPY[role] || COPY.user;

  return (
    <div className="min-h-screen bg-[#F8FFF6]">
      <SiteNavbar />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-[#064233]/10 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#E74660]">
            {role} portal
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-[#064233] sm:text-4xl">
            {meta.title}
          </h1>
          <p className="mt-2 max-w-2xl text-[#325d72]">{meta.subtitle}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#064233]/10 bg-[#F8FFF6] p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8a9aa3]">
                Signed in as
              </p>
              <p className="mt-1 text-lg font-bold text-[#064233]">
                {user?.name || "Member"}
              </p>
              <p className="mt-1 text-sm text-[#325d72]">
                {user?.email || user?.phone || "—"}
              </p>
            </div>
            <div className="rounded-2xl border border-[#064233]/10 bg-[#FFF8F9] p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8a9aa3]">
                Role
              </p>
              <p className="mt-1 text-lg font-bold capitalize text-[#E74660]">
                {user?.role}
              </p>
              <p className="mt-1 text-sm text-[#325d72]">
                Full modules for this role can be added next.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/"
              className="rounded-xl bg-[#E74660] px-5 py-3 text-sm font-bold text-white hover:bg-[#d13a52]"
            >
              Back to Home
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-xl border border-[#064233]/20 px-5 py-3 text-sm font-bold text-[#064233] hover:bg-[#F8FFF6]"
            >
              Logout
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

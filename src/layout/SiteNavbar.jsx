"use client";

import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@/lib/router";
import { ChevronDown } from "lucide-react";
import {
  dashboardPathForRole,
  useAuth,
} from "../contexts/AuthContext";
import SliderOpener from "../components/Home/SliderOpener";
import tathaastuLogo from "../assets/tathaastu_logo.png";
import { NAV_MEGA_MENUS } from "../data/navMegaMenu";

/**
 * Sticky cream navbar with simple top labels + mega-menus for depth.
 */
export default function SiteNavbar({ endSlot = null }) {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [openMenuId, setOpenMenuId] = useState(null);
  const closeTimer = useRef(null);
  const navRef = useRef(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenMenuId(null), 160);
  };

  const openMenu = (id) => {
    clearCloseTimer();
    setOpenMenuId(id);
  };

  useEffect(() => {
    setOpenMenuId(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpenMenuId(null);
    };
    const onClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
      clearCloseTimer();
    };
  }, []);

  return (
    <header className="sticky top-0 z-[100] border-b border-[#073349]/10 bg-white/95 shadow-sm backdrop-blur-md">
      <div
        ref={navRef}
        className="relative mx-auto flex max-w-[1920px] items-center px-4 py-3 md:px-6 lg:px-10"
      >
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          <div className="shrink-0 lg:hidden">
            <SliderOpener />
          </div>
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2 rounded-sm outline-none ring-offset-2 ring-offset-white focus-visible:ring-2 focus-visible:ring-[#073349]"
          >
            <img
              src={tathaastuLogo}
              alt="Tathaastu"
              className="h-9 w-auto sm:h-11 md:h-14 lg:h-16"
              width={160}
              height={64}
            />
          </Link>
        </div>

        <nav
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex lg:items-center lg:gap-1"
          aria-label="Main navigation"
        >
          {NAV_MEGA_MENUS.map((menu) => {
            const hasDropdown = menu.items.length > 0;
            const isOpen = hasDropdown && openMenuId === menu.id;
            const itemClass = [
              "inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-[13px] font-semibold tracking-wide transition-colors xl:px-3 xl:text-sm",
              isOpen
                ? "bg-white/70 text-[#D44459]"
                : "text-[#073349] hover:bg-white/50 hover:text-[#D44459]",
            ].join(" ");
            return (
              <div
                key={menu.id}
                className="relative"
                onMouseEnter={() => hasDropdown && openMenu(menu.id)}
                onMouseLeave={scheduleClose}
              >
                {hasDropdown ? (
                  <button
                    type="button"
                    className={itemClass}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setOpenMenuId(isOpen ? null : menu.id)}
                  >
                    {menu.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : menu.external || (typeof menu.path === "string" && menu.path.startsWith("http")) ? (
                  <a
                    href={menu.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={itemClass}
                  >
                    {menu.label}
                  </a>
                ) : (
                  <Link to={menu.path} className={itemClass}>
                    {menu.label}
                  </Link>
                )}

                {isOpen && (
                  <div
                    className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3"
                    onMouseEnter={() => openMenu(menu.id)}
                    onMouseLeave={scheduleClose}
                  >
                    <div
                      className="overflow-hidden rounded-2xl border border-[#073349]/8 bg-white shadow-[0_18px_40px_rgba(7,51,73,0.12)]"
                      style={{ borderLeft: `4px solid ${menu.accent}` }}
                    >
                      <div
                        className="px-4 py-3 text-xs font-bold uppercase tracking-[0.14em]"
                        style={{ background: menu.tint, color: menu.accent }}
                      >
                        {menu.label}
                      </div>
                      <ul className="py-2">
                        {menu.items.map((item) => (
                          <li key={item.name}>
                            <Link
                              to={item.path}
                              className="block px-4 py-2.5 text-sm font-medium text-[#073349] transition-colors hover:bg-white hover:text-[#D44459]"
                              onClick={() => {
                                setOpenMenuId(null);
                                if (typeof window !== "undefined" && item.path && item.path.includes("#")) {
                                  const hash = item.path.split("#")[1];
                                  if (window.location.pathname === "/services") {
                                    const el = document.getElementById(hash);
                                    if (el) {
                                      const yOffset = -90;
                                      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                      window.scrollTo({ top: y, behavior: "smooth" });
                                      el.classList.add("svc-row--highlighted");
                                      setTimeout(() => el.classList.remove("svc-row--highlighted"), 2200);
                                    }
                                  }
                                }
                              }}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          {endSlot ?? (
            <>
              {isAuthenticated ? (
                <>
                  <Link
                    to={dashboardPathForRole(user?.role)}
                    className="hidden rounded-lg px-3 py-2 text-sm font-semibold capitalize text-[#073349] transition-colors hover:text-[#D44459] sm:inline-flex"
                  >
                    {user?.role || "Account"}
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-[#073349] transition-colors hover:text-[#D44459] sm:inline-flex"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-[#073349] transition-colors hover:text-[#D44459] sm:inline-flex"
                >
                  Login
                </Link>
              )}
              <Link
                to="/pricing?flow=consult"
                className="rounded-xl bg-[#E74660] px-2.5 py-2 text-[11px] font-bold text-white shadow-sm transition hover:bg-[#d13a52] sm:px-4 sm:text-sm whitespace-nowrap inline-flex items-center justify-center"
              >
                <span className="sm:hidden">Chat</span>
                <span className="hidden sm:inline">Chat with Expert</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

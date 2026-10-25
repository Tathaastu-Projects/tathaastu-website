"use client";

import React, { useState } from "react";
import { useNavigate } from "@/lib/router";
import { ChevronDown } from "lucide-react";
import { NAV_MEGA_MENUS } from "../../data/navMegaMenu";

/**
 * Mobile drawer with the same IA depth as desktop mega-menus.
 */
export default function SliderOpener({ variant = "light" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedId, setExpandedId] = useState("services");
  const navigate = useNavigate();

  const closeSlider = () => setIsOpen(false);

  const handleNavigation = (path, external = false) => {
    closeSlider();
    if (external || (typeof path === "string" && path.startsWith("http"))) {
      window.open(path, "_blank", "noopener,noreferrer");
    } else {
      navigate(path);
      if (typeof window !== "undefined" && typeof path === "string" && path.includes("#")) {
        const hash = path.split("#")[1];
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            const yOffset = -90;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
            el.classList.add("svc-row--highlighted");
            setTimeout(() => el.classList.remove("svc-row--highlighted"), 2200);
          }
        }, 120);
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={
          variant === "dark"
            ? "text-2xl text-white/90 transition-colors duration-300 hover:text-white"
            : "text-3xl text-[#073349] transition-colors duration-300 hover:text-[#D44459]"
        }
        aria-label="Open navigation menu"
      >
        ☰
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={closeSlider}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed left-0 top-0 z-50 h-full w-[min(22rem,92vw)] transform bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#073349]/15 p-5">
          <h2 className="text-lg font-bold text-[#073349]">Tathaastu Menu</h2>
          <button
            onClick={closeSlider}
            className="text-2xl text-[#073349] transition-colors hover:text-[#D44459]"
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>

        <nav className="h-[calc(100%-4.5rem)] overflow-y-auto p-4">
          <ul className="space-y-2">
            {NAV_MEGA_MENUS.map((menu) => {
              const hasDropdown = menu.items.length > 0;
              const expanded = hasDropdown && expandedId === menu.id;
              if (!hasDropdown) {
                return (
                  <li key={menu.id}>
                    <button
                      type="button"
                      onClick={() => handleNavigation(menu.path, menu.external)}
                      className="w-full rounded-xl px-4 py-3 text-left text-sm font-bold uppercase tracking-wide"
                      style={{ background: menu.tint, color: menu.accent }}
                    >
                      {menu.label}
                    </button>
                  </li>
                );
              }
              return (
                <li
                  key={menu.id}
                  className="overflow-hidden rounded-xl border border-[#073349]/10 bg-white"
                  style={{ borderLeft: `4px solid ${menu.accent}` }}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-bold uppercase tracking-wide"
                    style={{ background: menu.tint, color: menu.accent }}
                    onClick={() => setExpandedId(expanded ? null : menu.id)}
                    aria-expanded={expanded}
                  >
                    {menu.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expanded && (
                    <ul className="border-t border-[#073349]/8 py-1">
                      {menu.items.map((item) => (
                        <li key={item.name}>
                          <button
                            type="button"
                            onClick={() => handleNavigation(item.path)}
                            className="w-full px-4 py-2.5 text-left text-sm font-medium text-[#073349] hover:bg-white hover:text-[#D44459]"
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}

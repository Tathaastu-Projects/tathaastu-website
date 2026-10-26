"use client";

import React from "react";

const WhatsAppFloatingButton = ({
  phoneNumber = "+919756303737",
  message = "Hello! I'd like to know more about Tathaastu astrology consultations.",
}) => {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50 h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-[#25D366] shadow-[0_12px_30px_rgba(37,211,102,0.45)] flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#a8f0c7]/70"
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="h-7 w-7 sm:h-8 sm:w-8 text-white"
      >
        <path
          fill="currentColor"
          d="M16.02 3C9.38 3 4 8.38 4 15.02c0 2.66.77 5.12 2.14 7.21L4 29l6.94-2.07C12.94 27.62 14.45 28 16 28 22.63 28 28 22.62 28 15.98S22.66 3 16.02 3zm6.3 18.21c-.26.73-1.52 1.4-2.1 1.49c-.56.09-1.27.13-2.05-.13c-.47-.15-1.07-.35-1.84-.69c-3.24-1.4-5.34-4.82-5.51-5.04c-.16-.23-1.32-1.76-1.32-3.36c0-1.6.81-2.37 1.1-2.69c.29-.32.63-.41.84-.41c.2 0 .42 0 .6.01c.19.01.45-.07.7.54c.26.63.88 2.17.96 2.33c.08.16.13.35.02.58c-.11.23-.17.37-.33.57c-.17.2-.35.45-.5.6c-.17.17-.35.36-.15.69c.2.32.89 1.47 1.91 2.39c1.32 1.17 2.43 1.53 2.78 1.7c.35.17.56.15.77-.09c.2-.23.87-1.02 1.11-1.37c.23-.35.47-.29.77-.17c.3.13 1.92.91 2.25 1.08c.33.17.55.25.63.39c.08.14.08.81-.18 1.54z"
        />
      </svg>
    </a>
  );
};

export default WhatsAppFloatingButton;

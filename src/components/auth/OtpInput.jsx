"use client";

import React, { useRef, useEffect } from "react";

/**
 * Premium 6-digit OTP Box Input
 * Supports auto-focus advance, backspace, arrow navigation, and clipboard paste.
 */
export default function OtpInput({ value = "", onChange, length = 6, disabled = false, autoFocus = true }) {
  const inputRefs = useRef([]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const digits = Array.from({ length }, (_, i) => value[i] || "");

  const handleChange = (e, index) => {
    const char = e.target.value.replace(/[^0-9]/g, "").slice(-1);
    const newDigits = [...digits];
    newDigits[index] = char;
    const newValue = newDigits.join("");
    onChange(newValue);

    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = "";
        onChange(newDigits.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
    if (pasted) {
      onChange(pasted);
      const nextIdx = Math.min(pasted.length, length - 1);
      inputRefs.current[nextIdx]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 sm:gap-3 my-2" onPaste={handlePaste}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          disabled={disabled}
          className={`h-12 w-10 sm:h-14 sm:w-12 text-center text-xl font-bold rounded-xl border transition-all duration-200 outline-none
            ${
              digits[index]
                ? "border-[#0B4B41] bg-[#F4F9F7] text-[#073349] ring-2 ring-[#0B4B41]/15"
                : "border-[#073349]/15 bg-white text-[#073349] focus:border-[#0B4B41] focus:ring-2 focus:ring-[#0B4B41]/20"
            }
            ${disabled ? "opacity-50 cursor-not-allowed bg-gray-100" : ""}
          `}
          aria-label={`Digit ${index + 1} of verification code`}
        />
      ))}
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import { useConnectModal } from "../contexts/ConnectModalContext";
import { Phone, Radio, Sparkles, Video } from "lucide-react";
import { createHmsSession } from "../services/hmsApi";
import dynamic from "next/dynamic";

const HmsConsultationModal = dynamic(
  () => import("./Consult/HmsConsultationModal"),
  { ssr: false }
);

const DEFAULT_ENQUIRY_OPTIONS = [
  "Career & Business",
  "Relationship",
  "Education",
  "Finance & Legal Case",
  "Foreign Travel",
  "Health",
  "Compatibility",
  "Kundli Reading",
  "Child's Future",
  "Spiritual Healing",
  "Vastu Reading",
  "Tarot Reading",
  "Horoscope Report",
  "Numerology Report",
  "Gemstone Suggestion",
  "Other",
];

const API_BASE_URL =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL || "http://localhost:9001/api";

// Debug: Log the API URL being used (check browser console)

const INITIAL_FORM_VALUES = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  enquiryType: "",
  interests: [],
  message: "",
};

export default function ConnectModalButton() {
  const { isOpen, openModal, closeModal } = useConnectModal();
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const [enquiryOptions, setEnquiryOptions] = useState(DEFAULT_ENQUIRY_OPTIONS);
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [optionsError, setOptionsError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const optionsFetchedRef = useRef(false);
  const [activeHmsSession, setActiveHmsSession] = useState(null);
  const [isHmsModalOpen, setIsHmsModalOpen] = useState(false);
  const [hmsStarting, setHmsStarting] = useState(false);

  const handleStartInstantHms = async (mode = "video") => {
    setHmsStarting(true);
    try {
      const data = await createHmsSession({ mode });
      setActiveHmsSession(data);
      setIsHmsModalOpen(true);
      closeModal();
    } catch (err) {
      console.warn("Could not start HMS session:", err);
    } finally {
      setHmsStarting(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const fetchEnquiryOptions = async () => {
      setOptionsLoading(true);
      setOptionsError(null);
      try {
        const response = await fetch(
          `${API_BASE_URL}/queries/meta/enquiry-options`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch enquiry options");
        }

        const result = await response.json();
        if (result?.success && Array.isArray(result?.data)) {
          setEnquiryOptions(result.data);
        } else {
          setEnquiryOptions(DEFAULT_ENQUIRY_OPTIONS);
        }
        optionsFetchedRef.current = true;
      } catch (error) {
        setOptionsError(
          "We couldn't load the latest enquiry topics. Showing default options."
        );
        setEnquiryOptions(DEFAULT_ENQUIRY_OPTIONS);
        optionsFetchedRef.current = false;
      } finally {
        setOptionsLoading(false);
      }
    };

    if (isOpen && !optionsFetchedRef.current) {
      fetchEnquiryOptions();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (value) => {
    setFormValues((prev) => {
      const alreadySelected = prev.interests.includes(value);
      return {
        ...prev,
        interests: alreadySelected
          ? prev.interests.filter((item) => item !== value)
          : [...prev.interests, value],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(null);
    setIsSubmitting(true);

    const payload = {
      firstName: formValues.firstName.trim(),
      lastName: formValues.lastName.trim() || undefined,
      email: formValues.email.trim(),
      phone: formValues.phone.trim() || undefined,
      enquiryType: formValues.enquiryType,
      enquiryTopics: formValues.interests,
      message: formValues.message.trim() || undefined,
      priority: "normal",
      source: "website",
    };

    try {
      const response = await fetch(`${API_BASE_URL}/queries/public`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = "We could not submit your enquiry. Please try again.";
        
        if (response.status === 404) {
          errorMessage = "The enquiry endpoint is not available. Please contact support or try again later.";
          console.error("API Endpoint not found:", `${API_BASE_URL}/queries/public`);
          console.error("Status:", response.status, response.statusText);
        } else {
          try {
            const errorPayload = await response.json();
            errorMessage = errorPayload?.message || errorMessage;
          } catch (e) {
            // If response is not JSON, use default message
            errorMessage = `Server error (${response.status}). Please try again later.`;
          }
        }
        
        throw new Error(errorMessage);
      }

      setFormStatus({
        type: "success",
        message:
          "Thank you! Your enquiry was received. Our team will get in touch shortly.",
      });
      setFormValues(INITIAL_FORM_VALUES);

      setTimeout(() => {
        closeModal();
        setFormStatus(null);
      }, 2000);
    } catch (error) {
      setFormStatus({
        type: "error",
        message:
          error?.message ||
          "Something went wrong while submitting the enquiry. Please retry.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="fixed left-4 bottom-4 sm:bottom-6 z-40 flex items-center gap-2 px-4 py-3 bg-[#073349] text-white rounded-full shadow-lg font-semibold hover:bg-[#0a4a6b] transition-transform hover:scale-105"
      >
        Let's Connect
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeModal}
          ></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-[#073349]">
                Get Your First Free Consultation
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="text-[#073349] hover:text-[#D44459] text-2xl leading-none"
                aria-label="Close connect modal"
              >
                &times;
              </button>
            </div>

            <div className="px-6 py-6 overflow-y-auto max-h-[75vh]">
              {/* Quick Instant Consultation Options */}
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#faf3e2] to-[#f4ede0] border border-[#c5973e]/40 shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-[#0a3428] font-bold text-sm">
                  <Sparkles className="h-4 w-4 text-[#d97706]" />
                  <span>Instant 100ms Live Consultation</span>
                </div>
                <p className="text-xs text-[#4b5563] mb-3">
                  Connect immediately with an available Vedic guru over HD Video or Audio:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleStartInstantHms("video")}
                    disabled={hmsStarting}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#0a3428] hover:bg-[#124d3d] text-white font-semibold text-xs transition-transform active:scale-95 shadow-sm"
                  >
                    <Video className="h-4 w-4 text-amber-400" />
                    <span>{hmsStarting ? "Starting..." : "Instant Video Call"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStartInstantHms("audio")}
                    disabled={hmsStarting}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#f5b301] hover:bg-[#d97706] text-[#0f0d17] font-bold text-xs transition-transform active:scale-95 shadow-sm"
                  >
                    <Radio className="h-4 w-4" />
                    <span>{hmsStarting ? "Starting..." : "Instant Audio Call"}</span>
                  </button>
                </div>
              </div>

              <div className="relative flex py-2 items-center mb-4">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Or submit an enquiry</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {formStatus && (
                  <div
                    className={`rounded-xl border px-4 py-3 text-sm ${
                      formStatus.type === "success"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    }`}
                  >
                    {formStatus.message}
                  </div>
                )}

                {optionsError && (
                  <p className="rounded-lg bg-[#FFF1E5] px-4 py-2 text-sm text-[#B83A4A]">
                    {optionsError}
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#073349]">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formValues.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D44459]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#073349]">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formValues.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D44459]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#073349]">
                      Phone No.
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formValues.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D44459]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#073349]">
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D44459]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#073349]">
                    Enquiry For
                  </label>
                  <select
                    name="enquiryType"
                    value={formValues.enquiryType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D44459]"
                  >
                    <option value="">Select your enquiry type</option>
                    {enquiryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#073349] mb-2">
                    Areas of Interest
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {enquiryOptions.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 text-sm text-[#073349] bg-[#FFF1E5] rounded-lg px-3 py-2 border border-transparent hover:border-[#D44459] transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formValues.interests.includes(option)}
                          onChange={() => handleCheckboxChange(option)}
                          className="rounded text-[#D44459] focus:ring-[#D44459]"
                          disabled={isSubmitting}
                        />
                        {option}
                      </label>
                    ))}
                    {optionsLoading && (
                      <div className="col-span-full text-sm text-[#073349]">
                        Loading topics...
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#073349]">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formValues.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D44459]"
                    placeholder="Let us know how we can help you..."
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-[#D44459] text-white rounded-full font-semibold hover:bg-[#B83A4A] transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Submitting..." : "Submit enquiry"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 100ms Instant Consultation Modal */}
      <HmsConsultationModal
        isOpen={isHmsModalOpen}
        onClose={() => setIsHmsModalOpen(false)}
        session={activeHmsSession}
      />
    </>
  );
}


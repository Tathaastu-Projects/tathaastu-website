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

  // Modal commented out everywhere as per requirement.
  // Consultations strictly follow the flow: Packages (/pricing) -> Astrologers (/talk-to-astrologers) -> Payment (/payment)
  return null;
}


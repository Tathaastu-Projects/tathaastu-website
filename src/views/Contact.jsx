"use client";

import React, { useState } from 'react';
import Footer from '../layout/Footer';
import SiteNavbar from '../layout/SiteNavbar';
import Seperator from '../components/Home/SeperatorComponent';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL || "http://localhost:9001/api";

// Debug: Log the API URL being used (check browser console)

// Map category keys to API enquiry topic strings
const CATEGORY_TO_ENQUIRY_TOPIC = {
  career: 'Career & Business',
  relationship: 'Relationship',
  education: 'Education',
  finance: 'Finance & Legal Case',
  travel: 'Foreign Travel',
  health: 'Health',
  compatibility: 'Compatibility',
  kundli: 'Kundli Reading',
  childFuture: "Child's Future",
  spiritual: 'Spiritual Healing',
  vaastu: 'Vastu Reading',
  tarot: 'Tarot Reading',
  horoscope: 'Horoscope Report',
  numerology: 'Numerology Report',
  gemstone: 'Gemstone Suggestion',
  other: 'Other',
};

export default function Contact() {
  const [activeFAQ, setActiveFAQ] = useState(2); // FAQ 3 is open by default
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    enquiryFor: '',
    message: '',
    categories: {
      career: false,
      relationship: false,
      education: false,
      finance: false,
      travel: false,
      health: false,
      compatibility: false,
      kundli: false,
      childFuture: false,
      spiritual: false,
      vaastu: false,
      tarot: false,
      horoscope: false,
      numerology: false,
      gemstone: false,
      other: false
    }
  });

  const faqItems = [
    {
      id: 0,
      question: "WHAT MAKE YOU THE BEST ASTROLOGERS?",
      answer: "Our team consists of highly qualified and experienced astrologers with deep knowledge of Vedic astrology, modern techniques, and AI-powered insights."
    },
    {
      id: 1,
      question: "HOW ACCURATE ARE YOUR PREDICTIONS?",
      answer: "We combine traditional Vedic astrology with modern AI technology to provide highly accurate predictions and personalized guidance."
    },
    {
      id: 2,
      question: "WHEN CAN I EXPECT MY PROBLEMS TO BE RESOLVED?",
      answer: "The timeline for problem resolution varies based on the nature of your issues. Our experts will provide specific guidance during your consultation."
    },
    {
      id: 3,
      question: "DO I NEED EXACT BIRTH TIME FOR A READING?",
      answer: "While exact birth time provides the most accurate reading, we can work with approximate time and still provide valuable insights."
    },
    {
      id: 4,
      question: "HOW DO YOU OFFER ASTROLOGY REMEDIES?",
      answer: "We offer personalized remedies including gemstones, mantras, yantras, and lifestyle recommendations based on your birth chart analysis."
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (category) => {
    setFormData(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: !prev.categories[category]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(null);
    setIsSubmitting(true);

    // Convert categories object to array of enquiry topics
    const enquiryTopics = Object.keys(formData.categories)
      .filter(key => formData.categories[key])
      .map(key => CATEGORY_TO_ENQUIRY_TOPIC[key]);

    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim() || undefined,
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      enquiryType: formData.enquiryFor || undefined,
      enquiryTopics: enquiryTopics,
      message: formData.message.trim() || undefined,
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
        const errorPayload = await response.json().catch(() => null);
        throw new Error(
          errorPayload?.message ||
            "We could not submit your enquiry. Please try again."
        );
      }

      setFormStatus({
        type: "success",
        message:
          "Thank you! Your enquiry was received. Our team will get in touch shortly.",
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        enquiryFor: '',
        message: '',
        categories: {
          career: false,
          relationship: false,
          education: false,
          finance: false,
          travel: false,
          health: false,
          compatibility: false,
          kundli: false,
          childFuture: false,
          spiritual: false,
          vaastu: false,
          tarot: false,
          horoscope: false,
          numerology: false,
          gemstone: false,
          other: false
        }
      });

      // Clear status message after 5 seconds
      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
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

  const toggleFAQ = (id) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

  return (
    <div className="bg-white text-[#073349]">
      
      {/* TOP BAR */}
      <div className="bg-[#D44459] text-white text-center py-2 px-4">
        <p className="text-sm font-medium">AI-POWERED PLATFORM REVOLUTIONIZING ASTROLOGY</p>
      </div>
      
      <SiteNavbar />

      {/* HERO SECTION WITH BANNER IMAGE */}
      <section className="bg-[#F8FFF6] px-4 py-14 text-center text-[#073349]">
        <h1 className="text-4xl font-bold">Contact</h1>
        <p className="mx-auto mt-3 max-w-xl text-[#325d72]">Write to us about a consultation, a course, or an order.</p>
      </section>
      <Seperator />

      {/* MAIN CONTENT SECTION */}
      <section className="bg-white py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            {/* LEFT COLUMN - CONTACT FORM */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  <span className="text-[#073349]">GET YOUR FIRST </span>
                  <span className="text-[#D44459]">FREE</span>
                  <span className="text-[#073349]"> CONSULTATION NOW</span>
                </h2>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
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
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#073349] mb-2 uppercase tracking-wide">FIRST NAME</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-[#F5D6B4] border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#D44459] text-sm"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#073349] mb-2 uppercase tracking-wide">LAST NAME</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-[#F5D6B4] border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#D44459] text-sm"
                      placeholder=""
                    />
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#073349] mb-2 uppercase tracking-wide">PHONE NO.</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-[#F5D6B4] border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#D44459] text-sm"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#073349] mb-2 uppercase tracking-wide">E-MAIL</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-[#F5D6B4] border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#D44459] text-sm"
                      placeholder=""
                    />
                  </div>
                </div>

                {/* Enquiry For Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-[#073349] mb-2 uppercase tracking-wide">ENQUIRY FOR</label>
                  <div className="relative">
                    <select
                      name="enquiryFor"
                      value={formData.enquiryFor}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-[#F5D6B4] border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#D44459] appearance-none text-sm"
                    >
                      <option value="">Select your enquiry type</option>
                      <option value="career">Career & Business</option>
                      <option value="relationship">Relationship</option>
                      <option value="education">Education</option>
                      <option value="finance">Finance & Legal Case</option>
                      <option value="travel">Foreign Travel</option>
                      <option value="health">Health</option>
                      <option value="compatibility">Compatibility</option>
                      <option value="kundli">Kundli Reading</option>
                      <option value="child">Child's Future</option>
                      <option value="spiritual">Spiritual Healing</option>
                      <option value="vaastu">Vaastu Reading</option>
                      <option value="tarot">Tarot Reading</option>
                      <option value="horoscope">Horoscope Report</option>
                      <option value="numerology">Numerology Report</option>
                      <option value="gemstone">Gemstone Suggestion</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-4 h-4 text-[#073349]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    {[
                      { key: 'career', label: 'CAREER & BUSINESS' },
                      { key: 'relationship', label: 'RELATIONSHIP' },
                      { key: 'education', label: 'EDUCATION' },
                      { key: 'finance', label: 'FINANCE & LEGAL CASE' },
                      { key: 'travel', label: 'FOREIGN TRAVEL' },
                      { key: 'health', label: 'HEALTH' },
                      { key: 'compatibility', label: 'COMPATIBILITY' },
                      { key: 'kundli', label: 'KUNDLI READING' }
                    ].map((item) => (
                      <label 
                        key={item.key} 
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => handleCategoryChange(item.key)}
                      >
                        <div className="w-3 h-3 border border-[#073349] rounded-sm flex items-center justify-center">
                          {formData.categories[item.key] && (
                            <div className="w-1.5 h-1.5 bg-[#073349] rounded-sm"></div>
                          )}
                        </div>
                        <span className="text-xs text-[#073349] font-medium">{item.label}</span>
                      </label>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {[
                      { key: 'childFuture', label: "CHILD'S FUTURE" },
                      { key: 'spiritual', label: 'SPIRITUAL HEALING' },
                      { key: 'vaastu', label: 'VAASTU READING' },
                      { key: 'tarot', label: 'TAROT READING' },
                      { key: 'horoscope', label: 'HOROSCOPE REPORT' },
                      { key: 'numerology', label: 'NUMEROLOGY REPORT' },
                      { key: 'gemstone', label: 'GEMSTONE SUGGESTION' },
                      { key: 'other', label: 'OTHER' }
                    ].map((item) => (
                      <label 
                        key={item.key} 
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => handleCategoryChange(item.key)}
                      >
                        <div className="w-3 h-3 border border-[#073349] rounded-sm flex items-center justify-center">
                          {formData.categories[item.key] && (
                            <div className="w-1.5 h-1.5 bg-[#073349] rounded-sm"></div>
                          )}
                        </div>
                        <span className="text-xs text-[#073349] font-medium">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-xs font-bold text-[#073349] mb-2 uppercase tracking-wide">MESSAGE</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-3 py-2.5 bg-[#F5D6B4] border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#D44459] resize-none text-sm"
                    placeholder=""
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#D44459] text-white px-6 py-3 rounded font-semibold text-sm hover:bg-[#B83A4A] transition-colors shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Submitting..." : "LET'S CONNECT"}
                  </button>
                </div>
              </form>
            </div>

            {/* RIGHT COLUMN - FAQ SECTION */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-700 mb-6 leading-relaxed">
                  READY TO DISCOVER WHAT THE STARS REVEAL? BOOK YOUR PERSONALIZED TAROT OR ASTROLOGY READING NOW.
                </h3>
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-3">
                {faqItems.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className={`w-full px-4 py-3 text-left flex justify-between items-center transition-colors ${
                        activeFAQ === faq.id 
                          ? 'bg-[#EAA83E] text-white' 
                          : 'bg-[#F5D6B4] text-[#073349] hover:bg-[#E8C8A0]'
                      }`}
                    >
                      <span className="font-semibold text-xs">{faq.question}</span>
                      <span className="text-lg font-bold">
                        {activeFAQ === faq.id ? '×' : '+'}
                      </span>
                    </button>
                    {activeFAQ === faq.id && (
                      <div className="px-4 py-3 bg-white border-t border-gray-200">
                        <p className="text-[#073349] text-xs leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Decorative Mandala Pattern */}
              <div className="relative mt-8">
                <div className="absolute inset-0 opacity-5">
                  <div className="w-full h-48 bg-gradient-to-b from-[#F5D6B4] to-transparent rounded-full transform scale-150"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

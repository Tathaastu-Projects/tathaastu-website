"use client";

import React, { useState } from 'react';
import { useLocation, useNavigate } from "@/lib/router";
import SiteNavbar from '../layout/SiteNavbar';

export default function ConsultationBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan || {
    name: "REGULAR",
    price: "₹ 1,100",
    period: "PER MONTH",
    features: [
      "1 Astrology or Vaastu Consultation (30 mins)",
      "Basic Kundli Analysis or Question-Based Reading",
      "Remedy Suggestion",
      "Whatsapp Support (24HRS)"
    ]
  };

  const [formData, setFormData] = useState({
    name: '',
    contactNo: '',
    emailId: '',
    appointment: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission here
    console.log('Form submitted:', formData);
  };

  const parsePriceToNumber = (priceString) => {
    if (!priceString) return 0;
    const cleaned = priceString.replace(/[^\d.]/g, "");
    const value = parseFloat(cleaned);
    return Number.isFinite(value) ? value : 0;
  };

  const amountValue = parsePriceToNumber(plan.price);
  const formattedPrice =
    amountValue > 0
      ? `₹ ${amountValue.toLocaleString("en-IN")}.00`
      : "₹ 0.00";

  return (
    <div className="bg-gray-50 min-h-screen">
      <SiteNavbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Section - Consultation Information */}
          <div className="space-y-6">
            {/* Main Heading */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#073349] mb-2">
                {plan.name} Plan - Consultation Booking
              </h2>
              <div className="w-20 h-1 bg-[#073349] mb-4"></div>
              <h3 className="text-xl md:text-2xl text-[#073349] font-normal">
                Urgent Telephonic Consultation with Tathasstu
              </h3>
            </div>

            {/* Consultation Process */}
            <div className="space-y-3 text-base text-[#073349] leading-relaxed">
              <p>
                Experience instant clarity with a personal telephonic consultation from our expert Acharya.
              </p>
              <p>
                Our team will connect with you shortly after booking.
              </p>
              <p>
                Your session will be scheduled for 25-30 minutes of focused, personalized guidance.
              </p>
            </div>

            {/* Deliverables - Dynamic based on plan features */}
            <div>
              <h4 className="text-lg font-semibold text-[#073349] mb-4">
                Along with the consultation, you'll receive:
              </h4>
              <ul className="space-y-3 text-[#073349]">
                {plan.features && plan.features.length > 0 ? (
                  plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 mt-1 text-[#D44459] text-lg">•</span>
                      <span className="text-base leading-relaxed">{feature}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No features available for this plan.</li>
                )}
              </ul>
            </div>

            {/* Post-Payment Instructions */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-base font-semibold text-[#073349]">
                Thank you for your payment! After successful transaction .You'll be redirected to our WhatsApp group shortly—please wait and make sure to join group.
              </p>
            </div>

            {/* Contact Us */}
            <div>
              <h4 className="text-lg font-semibold text-[#073349] mb-3">Contact Us:</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-[#073349]">📧</span>
                  <a href="mailto:info@tathaastu.com" className="text-[#073349] hover:text-[#D44459]">
                    info@tathaastu.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#073349]">📞</span>
                  <a href="tel:+919319368333" className="text-[#073349] hover:text-[#D44459]">
                    9319368333
                  </a>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div>
              <h4 className="text-lg font-semibold text-[#073349] mb-2">Terms & Conditions:</h4>
              <p className="text-sm text-gray-600">
                By proceeding with the payment, you agree to our terms and conditions.
              </p>
            </div>
          </div>

          {/* Right Section - Payment Details Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Form Heading */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#073349] mb-2">Payment Details</h2>
                <div className="w-20 h-1 bg-[#073349]"></div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-[#073349] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D44459]"
                    required
                  />
                </div>

                {/* Contact No Field */}
                <div>
                  <label className="block text-sm font-semibold text-[#073349] mb-2">
                    Contact No
                  </label>
                  <input
                    type="tel"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D44459]"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Please Enter Your WhatsApp Number</p>
                </div>

                {/* Email ID Field */}
                <div>
                  <label className="block text-sm font-semibold text-[#073349] mb-2">
                    Email ID
                  </label>
                  <input
                    type="email"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D44459]"
                    required
                  />
                </div>

                {/* Amount Field */}
                <div>
                  <label className="block text-sm font-semibold text-[#073349] mb-2">
                    Amount
                  </label>
                  <input
                    type="text"
                    value={formattedPrice}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                  />
                </div>

                {/* Appointment Field */}
                <div>
                  <label className="block text-sm font-semibold text-[#073349] mb-2">
                    Appointment
                  </label>
                  <select
                    name="appointment"
                    value={formData.appointment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D44459]"
                    required
                  >
                    <option value="">--Select--</option>
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                    <option value="evening">Evening (4 PM - 8 PM)</option>
                  </select>
                </div>

                {/* Payment Method Icons */}
                <div className="flex items-center gap-4 py-4">
                  <span className="text-sm font-semibold text-[#073349]">Payment Methods:</span>
                  <div className="flex gap-3">
                    <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">UPI</div>
                    <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
                    <div className="w-12 h-8 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">RuPay</div>
                    <div className="w-12 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">MC</div>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  type="submit"
                  className="w-full bg-[#073349] text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-[#0a4a6b] transition-colors"
                >
                  Pay {formattedPrice}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


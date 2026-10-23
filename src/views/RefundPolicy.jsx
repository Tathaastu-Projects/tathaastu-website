"use client";

import React from "react";
import { Link } from "@/lib/router";
import { Shield, Clock, Mail, Phone, Globe, FileText, RefreshCw, CheckCircle2 } from "lucide-react";
import SiteNavbar from "../layout/SiteNavbar";
import Footer from "../layout/Footer";
import "../styles/legal-policy.css";

export default function RefundPolicy() {
  return (
    <div className="legal-page">
      <SiteNavbar />

      {/* Hero Section */}
      <header className="legal-hero">
        <div className="legal-hero__inner">
          <div className="legal-hero__badge">
            <span>✦ Legal & Trust ✦</span>
          </div>
          <h1 className="legal-hero__title">Cancellation, Rescheduling &amp; Refund Policy</h1>
          <div className="legal-hero__meta">
            <span>
              <Clock className="h-4 w-4 text-[#d4a853]" />
              <strong>Last Updated:</strong> 13 October 2026
            </span>
            <span>
              <Shield className="h-4 w-4 text-[#d4a853]" />
              <strong>Tathasstu Sacred Trust</strong>
            </span>
          </div>

          {/* Quick Policy Switcher Tabs */}
          <nav className="legal-nav-tabs" aria-label="Legal Documents">
            <Link to="/privacy-policy" className="legal-nav-tab">
              <Shield className="h-4 w-4" />
              <span>Privacy Policy</span>
            </Link>
            <Link to="/terms-and-conditions" className="legal-nav-tab">
              <FileText className="h-4 w-4" />
              <span>Terms &amp; Conditions</span>
            </Link>
            <Link to="/cancellation-refund-policy" className="legal-nav-tab is-active">
              <RefreshCw className="h-4 w-4" />
              <span>Cancellation &amp; Refund</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="legal-content-wrap">
        <article className="legal-card">
          <p className="legal-lead">
            At Tathasstu, we understand that plans can change. This Cancellation, Rescheduling &amp; Refund Policy explains the process for cancelling or rescheduling consultations, requesting refunds and resolving situations where a scheduled service cannot be delivered as planned.
          </p>
          <div className="legal-callout">
            <p>
              This policy applies to consultations and other services booked through the Tathasstu website (
              <a href="https://tathasstu.com" className="text-[#064233] font-semibold underline">www.tathasstu.com</a>
              ) or through our officially authorised booking channels.
            </p>
          </div>

          {/* 1. Cancellation of Consultations by Customers */}
          <section className="legal-section">
            <h2 className="legal-section__heading">1. Cancellation of Consultations by Customers</h2>
            <p>
              Customers who wish to cancel a confirmed consultation may contact Tathasstu through our official support channels. Cancellation requests should be submitted as early as possible and before the scheduled consultation begins.
            </p>
            <p>The following conditions apply:</p>
            <ul className="legal-list">
              <li>
                <strong>Cancellation before the permitted cancellation window:</strong> Eligible cancellations will be handled according to the cancellation terms communicated at the time of booking.
              </li>
              <li>
                <strong>Cancellation close to the appointment:</strong> Refund or rescheduling eligibility will depend on the applicable booking conditions and the circumstances of the request.
              </li>
              <li>
                <strong>Cancellation after the consultation has started or been completed:</strong> Refunds will generally not be available for services already delivered, except where required by applicable law or where an exception is approved under this policy.
              </li>
              <li>
                <strong>Special circumstances:</strong> Requests arising from emergencies or other exceptional situations may be reviewed individually.
              </li>
            </ul>
            <p>
              The applicable cancellation window and any associated charges will be communicated before the booking is finalised.
            </p>
          </section>

          {/* 2. Rescheduling a Consultation */}
          <section className="legal-section">
            <h2 className="legal-section__heading">2. Rescheduling a Consultation</h2>
            <p>
              If you are unable to attend your scheduled consultation, you may request to reschedule it by contacting our support team.
            </p>
            <p>Rescheduling requests are subject to:</p>
            <ul className="legal-list">
              <li>The availability of the assigned practitioner.</li>
              <li>The notice provided before the scheduled appointment.</li>
              <li>The rescheduling conditions communicated at the time of booking.</li>
              <li>Any applicable restrictions associated with the selected service.</li>
            </ul>
            <p>
              Where possible, Tathasstu will try to accommodate reasonable rescheduling requests. A rescheduled appointment will be considered confirmed once the revised date and time have been communicated to you. If a suitable alternative appointment is unavailable, we will communicate the available options in accordance with the applicable booking terms and legal requirements.
            </p>
          </section>

          {/* 3. Missed Appointments and Late Arrivals */}
          <section className="legal-section">
            <h2 className="legal-section__heading">3. Missed Appointments and Late Arrivals</h2>
            <p>
              Customers are expected to be available at the confirmed date and time of their consultation.
            </p>
            <p>
              If you miss your appointment without providing prior notice, your booking may be treated as a missed appointment under the applicable booking conditions.
            </p>
            <p>
              Similarly, arriving late may reduce the time available for your consultation if the practitioner has other scheduled appointments.
            </p>
            <p>
              Any restrictions on refunds or rescheduling for missed appointments will be disclosed as part of the applicable booking terms and will remain subject to consumer rights under applicable law. If you experience technical difficulties or another unexpected issue that prevents you from attending, please contact us as soon as possible so that we can review the circumstances.
            </p>
          </section>

          {/* 4. Cancellation by Tathasstu or the Practitioner */}
          <section className="legal-section">
            <h2 className="legal-section__heading">4. Cancellation by Tathasstu or the Practitioner</h2>
            <p>
              In certain situations, Tathasstu or the assigned practitioner may be unable to conduct a confirmed consultation due to unforeseen circumstances, scheduling conflicts, illness or other operational reasons.
            </p>
            <p>
              If this happens, we will make reasonable efforts to notify you and offer an appropriate resolution. Depending on the circumstances, the available options may include:
            </p>
            <ul className="legal-list">
              <li>Rescheduling the consultation to a mutually suitable date and time.</li>
              <li>Offering an alternative practitioner, where appropriate and subject to your agreement where required.</li>
              <li>Providing a refund where the service cannot be delivered and a refund is due under the applicable terms or law.</li>
            </ul>
            <p>
              If you do not wish to proceed with an alternative arrangement, we will explain the available options for your booking. Tathasstu will not retain payment for a service that it has cancelled and cannot deliver where a refund is required under applicable law or the agreed booking terms.
            </p>
          </section>

          {/* 5. Refund Eligibility */}
          <section className="legal-section">
            <h2 className="legal-section__heading">5. Refund Eligibility</h2>
            <p>
              Refund requests will be assessed based on the nature of the service, the status of the booking, the reason for cancellation and the applicable booking conditions. Refunds may be considered in circumstances including:
            </p>
            <ul className="legal-list">
              <li>A confirmed consultation is cancelled by Tathasstu and cannot reasonably be rescheduled.</li>
              <li>A payment is deducted but the booking is not successfully confirmed.</li>
              <li>A duplicate payment has been made for the same booking.</li>
              <li>A refund is otherwise due under the applicable booking terms or consumer protection law.</li>
            </ul>
            <p>
              Where a consultation has already been completed, a refund will generally not be available solely because the customer did not receive the expected spiritual interpretation, guidance or personal outcome.
            </p>
            <p>
              However, this does not affect any remedies that may be available where a service was not delivered as agreed, was materially misrepresented or otherwise gives rise to rights under applicable law.
            </p>
          </section>

          {/* 6. Refunds for Completed Consultations */}
          <section className="legal-section">
            <h2 className="legal-section__heading">6. Refunds for Completed Consultations</h2>
            <p>
              Tathasstu provides consultations involving spiritual practices such as astrology, Jyotish, Vastu, Tarot, numerology, dowsing, healing and related services. The nature of these services means that interpretations and individual experiences may vary.
            </p>
            <p>Accordingly, refunds are not ordinarily provided solely because:</p>
            <ul className="legal-list">
              <li>A customer disagrees with a practitioner&apos;s interpretation.</li>
              <li>A customer is dissatisfied with a spiritual prediction or reading despite the service being delivered as agreed.</li>
              <li>A predicted event does not occur or an anticipated outcome is not achieved.</li>
              <li>A customer changes their mind after receiving the consultation.</li>
            </ul>
            <p>
              This provision does not exclude refunds or other remedies where required by applicable law or where the service was not provided in accordance with the agreed description or booking terms.
            </p>
          </section>

          {/* 7. Failed Payments and Duplicate Transactions */}
          <section className="legal-section">
            <h2 className="legal-section__heading">7. Failed Payments and Duplicate Transactions</h2>
            <p>
              If your payment is deducted but you do not receive a booking confirmation, please contact our support team with the transaction reference and any available payment confirmation. We will investigate the transaction and determine whether the booking was successfully created.
            </p>
            <p>
              If the booking was not confirmed or a duplicate payment is identified, any refund due will be processed through the appropriate payment channel, subject to verification and applicable payment-provider procedures. The time taken for the refunded amount to appear in your account may depend on your bank or payment service provider.
            </p>
          </section>

          {/* 8. Refund Processing Time */}
          <section className="legal-section">
            <h2 className="legal-section__heading">8. Refund Processing Time</h2>
            <p>
              Once a refund has been approved, it will be initiated within the applicable legal or communicated processing timeframe. Refunds will generally be returned through the original payment method wherever possible. If this is not feasible, we will communicate the available alternative arrangement.
            </p>
            <p>
              The time required for the amount to reflect in your account may vary depending on your bank, card issuer or payment service provider. If you have not received an approved refund within the communicated timeframe, please contact our support team with your booking or transaction reference.
            </p>
          </section>

          {/* 9. Promotional Offers and Discounted Consultations */}
          <section className="legal-section">
            <h2 className="legal-section__heading">9. Promotional Offers and Discounted Consultations</h2>
            <p>
              Consultations purchased through promotional offers, discount codes, packages or special booking arrangements may be subject to additional conditions disclosed at the time of purchase. Any cancellation, rescheduling or refund request relating to such bookings will be handled according to the applicable offer conditions and consumer protection requirements.
            </p>
            <p>
              Promotional conditions will not override any statutory rights or remedies that cannot legally be excluded.
            </p>
          </section>

          {/* 10. How to Request a Cancellation, Rescheduling or Refund */}
          <section className="legal-section">
            <h2 className="legal-section__heading">10. How to Request a Cancellation, Rescheduling or Refund</h2>
            <p>
              To submit a request, please contact Tathasstu using the official contact details listed below. Please include the following information wherever applicable:
            </p>
            <ul className="legal-list">
              <li>Your full name.</li>
              <li>Registered email address or contact number.</li>
              <li>Booking reference or transaction ID.</li>
              <li>Name of the consultation or service booked.</li>
              <li>Scheduled appointment date and time, if applicable.</li>
              <li>Reason for the cancellation, rescheduling or refund request.</li>
            </ul>
            <p>
              Providing complete information will help us identify your booking and process your request more efficiently. Please retain your booking confirmation and payment receipt until your request has been resolved.
            </p>
          </section>

          {/* 11. Changes to This Policy */}
          <section className="legal-section">
            <h2 className="legal-section__heading">11. Changes to This Policy</h2>
            <p>
              Tathasstu may update this policy from time to time to reflect changes in our services, booking procedures, payment processes or applicable laws. The revised policy will be published on this page with an updated “Last Updated” date. Any changes will apply prospectively where appropriate and will not remove rights or remedies that have already accrued.
            </p>
            <p>
              We encourage customers to review this policy before booking a consultation.
            </p>
          </section>

          {/* 12. Contact Us */}
          <section className="legal-section">
            <h2 className="legal-section__heading">12. Contact Us</h2>
            <p>
              If you have any questions regarding cancellations, rescheduling or refunds, please contact us:
            </p>

            <div className="legal-contact-card">
              <h4>Tathasstu Official Support</h4>
              <div className="legal-contact-grid">
                <div className="legal-contact-item">
                  <div className="legal-contact-icon">
                    <Globe size={18} />
                  </div>
                  <div>
                    <span className="legal-contact-label">Platform Website</span>
                    <a href="https://tathasstu.com" target="_blank" rel="noopener noreferrer" className="legal-contact-value">
                      https://tathasstu.com
                    </a>
                  </div>
                </div>

                <div className="legal-contact-item">
                  <div className="legal-contact-icon">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="legal-contact-label">Email Support</span>
                    <a href="mailto:care@tathasstu.com" className="legal-contact-value">
                      care@tathasstu.com
                    </a>
                  </div>
                </div>

                <div className="legal-contact-item">
                  <div className="legal-contact-icon">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="legal-contact-label">Mobile Number</span>
                    <a href="tel:+919756303737" className="legal-contact-value">
                      +91-9756303737
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer className="legal-footer-note">
            We will review your request and respond in accordance with our policies and applicable law.
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}

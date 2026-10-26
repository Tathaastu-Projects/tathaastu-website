"use client";

import React from "react";
import { Link } from "@/lib/router";
import { Shield, Clock, Mail, Phone, Globe, FileText, RefreshCw, AlertCircle } from "lucide-react";
import SiteNavbar from "../layout/SiteNavbar";
import Footer from "../layout/Footer";
import "../styles/legal-policy.css";

export default function TermsConditions() {
  return (
    <div className="legal-page">
      <SiteNavbar />

      {/* Hero Section */}
      <header className="legal-hero">
        <div className="legal-hero__inner">
          <div className="legal-hero__badge">
            <span>✦ Legal & Trust ✦</span>
          </div>
          <h1 className="legal-hero__title">Terms & Conditions</h1>
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
            <Link to="/terms-and-conditions" className="legal-nav-tab is-active">
              <FileText className="h-4 w-4" />
              <span>Terms & Conditions</span>
            </Link>
            <Link to="/cancellation-refund-policy" className="legal-nav-tab">
              <RefreshCw className="h-4 w-4" />
              <span>Cancellation & Refund</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="legal-content-wrap">
        <article className="legal-card">
          <p className="legal-lead">
            Welcome to Tathasstu. These Terms &amp; Conditions (“Terms”) govern your access to and use of our website,{" "}
            <a href="https://tathasstu.com" className="text-[#064233] font-semibold underline">www.tathasstu.com</a>, and the services offered through it.
          </p>
          <p className="legal-lead" style={{ marginTop: "-1rem", fontSize: "0.98rem" }}>
            Tathasstu provides access to spiritual guidance and consultation services, including astrology, Jyotish, Vastu, Tarot, numerology, dowsing, healing and other related practices. Throughout these Terms, “Tathasstu”, “we”, “our” and “us” refer to Tathasstu and its relevant operating entity. “You” and “your” refer to any individual accessing our website or using our services.
          </p>
          <div className="legal-callout">
            <p>
              By accessing our website, submitting an enquiry or booking a consultation, you agree to these Terms. If you do not agree with these Terms, please refrain from using our website and services.
            </p>
          </div>

          {/* Corporate Information & Platform Ownership */}
          <section className="legal-section">
            <h2 className="legal-section__heading">Corporate Information &amp; Platform Ownership</h2>
            <div className="legal-callout">
              <p>
                Tathasstu is a subsidiary of Thrive Tech Land Private Limited and operates within its group of companies, offering astrology, spiritual guidance, and holistic healing services through its platform.
              </p>
            </div>
          </section>

          {/* 1. Use of Our Website */}
          <section className="legal-section">
            <h2 className="legal-section__heading">1. Use of Our Website</h2>
            <p>You agree to use the Tathasstu website only for lawful purposes and in accordance with these Terms.</p>
            <p>When using our website, you agree:</p>
            <ul className="legal-list">
              <li>To provide accurate and complete information when submitting forms or booking consultations.</li>
              <li>To use the website for personal, lawful purposes.</li>
              <li>Not to misuse, disrupt or attempt to interfere with the website&apos;s functionality or security.</li>
              <li>Not to submit false, misleading, fraudulent or unlawful information.</li>
              <li>Not to copy, reproduce, distribute or commercially exploit website content without prior written permission.</li>
              <li>Not to use our website to harass, threaten or harm our team, practitioners or other users.</li>
            </ul>
            <p>
              We reserve the right to restrict or suspend access where we reasonably believe a user has violated these Terms or engaged in fraudulent, unlawful or harmful conduct.
            </p>
          </section>

          {/* 2. Our Services */}
          <section className="legal-section">
            <h2 className="legal-section__heading">2. Our Services</h2>
            <p>
              Tathasstu offers spiritual consultation services designed to provide guidance, insights and perspectives through various traditional and spiritual practices. Depending on availability, services may include:
            </p>
            <ul className="legal-list">
              <li>Astrology and Jyotish consultations</li>
              <li>Vastu consultations</li>
              <li>Tarot readings</li>
              <li>Numerology consultations</li>
              <li>Dowsing and related practices</li>
              <li>Spiritual healing services</li>
              <li>Other spiritual guidance and consultation services listed on our website</li>
            </ul>
            <p>
              The scope, format, duration, pricing and availability of each service may vary. The details displayed on the website or communicated to you at the time of booking will apply to your selected service.
            </p>
            <p>
              We reserve the right to introduce, modify, discontinue or update our services, service descriptions and offerings, subject to applicable law and any commitments already made to customers.
            </p>
          </section>

          {/* 3. Nature of Spiritual Consultations */}
          <section className="legal-section">
            <h2 className="legal-section__heading">3. Nature of Spiritual Consultations</h2>
            <p>
              Tathasstu&apos;s services are based on spiritual practices, traditional belief systems and the individual interpretations of the relevant practitioner.
            </p>
            <p>By using our services, you acknowledge and understand that:</p>
            <ul className="legal-list">
              <li>Spiritual consultations provide guidance and perspectives and are not guarantees of particular outcomes.</li>
              <li>Interpretations and recommendations may vary depending on the practitioner, the information provided and the nature of the consultation.</li>
              <li>Any guidance provided should be considered thoughtfully and used at your own discretion.</li>
              <li>Personal circumstances and outcomes are influenced by various factors beyond our control.</li>
              <li>We do not guarantee that a consultation will resolve a particular concern, change an outcome or produce a specific result.</li>
            </ul>
            <div className="legal-callout">
              <p>
                <strong>Important Advisory:</strong> Tathasstu does not promise guaranteed results relating to relationships, marriage, career, business, finances, health, family matters or any other aspect of life. Our services are not a substitute for qualified medical, mental health, legal, financial or other professional advice. You should consult an appropriately qualified professional when dealing with matters requiring specialised expertise.
              </p>
            </div>
            <p>
              Spiritual healing services are not a substitute for medical diagnosis, treatment or emergency care. Do not discontinue prescribed treatment or delay seeking professional assistance based on a spiritual consultation.
            </p>
          </section>

          {/* 4. Consultation Bookings */}
          <section className="legal-section">
            <h2 className="legal-section__heading">4. Consultation Bookings</h2>
            <p>
              Consultations may be booked through the booking facilities available on our website or through other booking methods officially communicated by Tathasstu.
            </p>
            <p>When placing a booking, you are responsible for:</p>
            <ul className="legal-list">
              <li>Selecting the appropriate consultation or service.</li>
              <li>Providing accurate contact information and any details required for the selected consultation.</li>
              <li>Reviewing the service description, price, duration and other applicable booking conditions.</li>
              <li>Completing any required payment.</li>
              <li>Being available at the confirmed date and time, where the consultation is scheduled.</li>
            </ul>
            <p>
              A booking will be considered confirmed once the applicable confirmation requirements have been fulfilled and confirmation has been communicated to you.
            </p>
            <p>
              Consultation availability may change depending on practitioner schedules and operational requirements. We will make reasonable efforts to communicate any changes affecting a confirmed booking.
            </p>
          </section>

          {/* 5. Information Provided for Consultations */}
          <section className="legal-section">
            <h2 className="legal-section__heading">5. Information Provided for Consultations</h2>
            <p>
              Certain consultations may require information such as your date of birth, time of birth, place of birth or details about the matter for which you are seeking guidance.
            </p>
            <p>You are responsible for providing information that is accurate to the best of your knowledge.</p>
            <p>
              The quality, relevance and interpretation of a consultation may depend on the information provided. Tathasstu will not be responsible for inaccuracies in guidance resulting from incorrect, incomplete or misleading information supplied by a customer.
            </p>
            <p>
              Please share only the personal information reasonably necessary for the consultation. The collection and handling of your personal information are governed by our Privacy Policy.
            </p>
          </section>

          {/* 6. Fees and Payments */}
          <section className="legal-section">
            <h2 className="legal-section__heading">6. Fees and Payments</h2>
            <p>
              The fees applicable to consultations will be displayed on the website or communicated to you before your booking is finalised. Unless expressly stated otherwise:
            </p>
            <ul className="legal-list">
              <li>Payments must be completed using the payment methods made available by Tathasstu.</li>
              <li>A booking may not be confirmed until the required payment has been successfully received or verified.</li>
              <li>Prices, service packages and promotional offers may change from time to time.</li>
              <li>Any applicable taxes or additional charges will be communicated as required.</li>
              <li>Payment confirmation does not guarantee a particular consultation outcome.</li>
            </ul>
            <p>
              Payments may be processed through third-party payment gateways. Transactions may therefore be subject to the relevant provider&apos;s terms and conditions.
            </p>
            <p>
              If a payment is deducted but your booking is not confirmed, please contact our support team with the relevant transaction details so that the matter can be investigated. Any refunds for failed, duplicate or otherwise eligible transactions will be handled in accordance with the applicable refund policy and legal requirements.
            </p>
          </section>

          {/* 7. Rescheduling, Cancellation and Refunds */}
          <section className="legal-section">
            <h2 className="legal-section__heading">7. Rescheduling, Cancellation and Refunds</h2>
            <p>
              We understand that circumstances may change. Requests to reschedule or cancel a consultation must be submitted through the official communication channels specified by Tathasstu.
            </p>
            <p>
              The eligibility for rescheduling, cancellation and refunds will depend on the applicable booking conditions and the nature of the service purchased. Unless otherwise communicated at the time of booking:
            </p>
            <ul className="legal-list">
              <li>Customers should notify Tathasstu as early as reasonably possible if they cannot attend a scheduled consultation.</li>
              <li>Rescheduling requests will be subject to practitioner availability.</li>
              <li>A missed appointment or late arrival may affect the time available for the consultation.</li>
              <li>Refunds, where applicable, will be processed in accordance with the published refund policy and applicable law.</li>
            </ul>
            <p>
              If Tathasstu or the assigned practitioner cancels a confirmed consultation and an alternative arrangement cannot reasonably be made, an appropriate rescheduling or refund option will be communicated to the customer, subject to applicable law.
            </p>
            <p>
              Please refer to the applicable <Link to="/cancellation-refund-policy" className="text-[#064233] font-semibold underline">Cancellation &amp; Refund Policy</Link> for the detailed rules governing your booking.
            </p>
          </section>

          {/* 8. Practitioner Availability and Service Delivery */}
          <section className="legal-section">
            <h2 className="legal-section__heading">8. Practitioner Availability and Service Delivery</h2>
            <p>
              Tathasstu may facilitate consultations through practitioners offering different areas of spiritual expertise. The availability of a particular practitioner, consultation format or service may vary.
            </p>
            <p>
              Where necessary, Tathasstu may reschedule a consultation or propose an alternative practitioner or appointment. Any material change to a confirmed booking will be communicated to the customer, and any available options will be explained.
            </p>
            <p>
              We will make reasonable efforts to facilitate the services described on our website. However, we cannot guarantee uninterrupted availability of every practitioner or service at all times.
            </p>
          </section>

          {/* 9. Customer Conduct */}
          <section className="legal-section">
            <h2 className="legal-section__heading">9. Customer Conduct</h2>
            <p>We aim to maintain a respectful and safe environment for customers, practitioners and our team. When interacting with Tathasstu, you agree not to:</p>
            <ul className="legal-list">
              <li>Engage in abusive, threatening, discriminatory or harassing behaviour.</li>
              <li>Impersonate another person or misrepresent your identity.</li>
              <li>Deliberately provide false information to obtain services or benefits.</li>
              <li>Record, reproduce, publish or distribute a consultation without the necessary permission and subject to applicable law.</li>
              <li>Use consultations to facilitate unlawful activity or harm another person.</li>
              <li>Attempt to obtain unauthorised access to our website, systems or confidential information.</li>
            </ul>
            <p>
              We reserve the right to take reasonable and proportionate action in response to violations of these Terms, including ending an interaction, restricting access or declining future bookings where appropriate and legally permissible.
            </p>
          </section>

          {/* 10. Intellectual Property */}
          <section className="legal-section">
            <h2 className="legal-section__heading">10. Intellectual Property</h2>
            <p>
              All content made available through the Tathasstu website, including text, graphics, logos, illustrations, photographs, videos, website design, original written materials and other proprietary content, is owned by or licensed to Tathasstu, unless otherwise indicated.
            </p>
            <p>
              The name “Tathasstu”, its branding, logos and associated creative assets may not be used without prior written authorisation from the relevant rights holder.
            </p>
            <p>
              You may access and use website content for personal, non-commercial purposes. You may not reproduce, republish, modify, distribute, sell or commercially exploit any protected content without prior written permission, except where permitted by applicable law.
            </p>
          </section>

          {/* 11. Third-Party Websites and Services */}
          <section className="legal-section">
            <h2 className="legal-section__heading">11. Third-Party Websites and Services</h2>
            <p>
              Our website may contain links to third-party websites, payment gateways, communication platforms or other external services. These services may be operated independently of Tathasstu and may be governed by their own terms, conditions and privacy policies.
            </p>
            <p>
              We do not control independent third-party websites or guarantee their availability, content or practices. Your use of such services is subject to their applicable terms.
            </p>
          </section>

          {/* 12. Website Availability and Accuracy */}
          <section className="legal-section">
            <h2 className="legal-section__heading">12. Website Availability and Accuracy</h2>
            <p>
              We aim to keep the Tathasstu website accurate, accessible and up to date. However, information on the website may occasionally contain errors, omissions, outdated descriptions or technical issues. Service details, availability and other information may be updated from time to time.
            </p>
            <p>
              We reserve the right to correct errors and make reasonable changes to website content, provided that any applicable legal obligations and commitments to customers are respected.
            </p>
          </section>

          {/* 13. Limitation of Liability */}
          <section className="legal-section">
            <h2 className="legal-section__heading">13. Limitation of Liability</h2>
            <p>
              To the extent permitted by applicable law, Tathasstu will not be responsible for indirect or consequential losses arising from the use of our website or spiritual consultation services, including losses resulting from decisions made solely on the basis of spiritual guidance.
            </p>
            <p>
              We do not guarantee any particular personal, professional, financial, relationship-related, health-related or other outcome from a consultation. You remain responsible for evaluating the guidance received and making your own decisions. Where appropriate, you should seek advice from qualified professionals before making significant decisions.
            </p>
            <p>
              Nothing in these Terms excludes or limits liability where such exclusion or limitation is prohibited by law, including any liability that cannot legally be waived. These Terms do not affect your statutory rights as a consumer.
            </p>
          </section>

          {/* 14. Indemnification */}
          <section className="legal-section">
            <h2 className="legal-section__heading">14. Indemnification</h2>
            <p>
              To the extent permitted by applicable law, you agree to be responsible for losses, claims or reasonable expenses arising directly from your unlawful use of the website, your material breach of these Terms or your infringement of another person&apos;s rights.
            </p>
          </section>

          {/* 15. Privacy and Personal Information */}
          <section className="legal-section">
            <h2 className="legal-section__heading">15. Privacy and Personal Information</h2>
            <p>
              Your use of our website and services is also governed by our <Link to="/privacy-policy" className="text-[#064233] font-semibold underline">Privacy Policy</Link>, which explains how we collect, use, store and protect your personal information.
            </p>
          </section>

          {/* 16. Suspension and Termination */}
          <section className="legal-section">
            <h2 className="legal-section__heading">16. Suspension and Termination</h2>
            <p>
              We may suspend or restrict access to our website or services where reasonably necessary for security, maintenance, suspected fraud, unlawful activity or a material violation of these Terms. Where appropriate and legally required, we will communicate the reason for a restriction and any available next steps.
            </p>
          </section>

          {/* 17. Changes to These Terms */}
          <section className="legal-section">
            <h2 className="legal-section__heading">17. Changes to These Terms</h2>
            <p>
              Tathasstu may update these Terms from time to time to reflect changes in our services, website functionality, business practices or applicable laws. Revised Terms will be published on this page with an updated “Last Updated” date.
            </p>
          </section>

          {/* 18. Governing Law and Jurisdiction */}
          <section className="legal-section">
            <h2 className="legal-section__heading">18. Governing Law and Jurisdiction</h2>
            <p>
              These Terms will be governed by the laws of India, subject to applicable consumer protection and other mandatory legal requirements. Any dispute arising from the use of our website or services will be handled by the competent courts or forums having jurisdiction under applicable law.
            </p>
          </section>

          {/* 19. Contact Us */}
          <section className="legal-section">
            <h2 className="legal-section__heading">19. Contact Us</h2>
            <p>
              If you have any questions, concerns or requests relating to these Terms or our services, please contact us using the details below:
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
            By accessing the Tathasstu website or booking a consultation, you acknowledge that you have read and understood these Terms &amp; Conditions, subject to your applicable statutory rights and any consent requirements imposed by law.
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}

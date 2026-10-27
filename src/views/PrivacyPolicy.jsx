"use client";

import React from "react";
import { Link } from "@/lib/router";
import { Shield, Clock, Mail, Phone, Globe, CheckCircle2, FileText, RefreshCw, MapPin } from "lucide-react";
import SiteNavbar from "../layout/SiteNavbar";
import Footer from "../layout/Footer";
import "../styles/legal-policy.css";

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <SiteNavbar />

      {/* Hero Section */}
      <header className="legal-hero">
        <div className="legal-hero__inner">
          <div className="legal-hero__badge">
            <span>✦ Legal & Trust ✦</span>
          </div>
          <h1 className="legal-hero__title">Privacy Policy</h1>
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
            <Link to="/privacy-policy" className="legal-nav-tab is-active">
              <Shield className="h-4 w-4" />
              <span>Privacy Policy</span>
            </Link>
            <Link to="/terms-and-conditions" className="legal-nav-tab">
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
            At Tathasstu, we value your trust and respect your privacy. This Privacy Policy explains how Tathasstu (“we”, “our” or “us”) collects, uses, stores and protects your personal information when you visit our website,{" "}
            <a href="https://tathasstu.com" className="text-[#064233] font-semibold underline">www.tathasstu.com</a>, book a consultation, contact us or use any of our services.
          </p>
          <p className="legal-lead" style={{ marginTop: "-1rem", fontSize: "0.98rem" }}>
            By accessing our website or using our services, you acknowledge that you have read this Privacy Policy. Where consent is required for the collection or processing of personal information, we will seek it in accordance with applicable law.
          </p>

          {/* Corporate Information & Platform Ownership */}
          <section className="legal-section">
            <h2 className="legal-section__heading">Corporate Information &amp; Platform Ownership</h2>
            <div className="legal-callout">
              <p>
                Tathasstu is a subsidiary of THRIVELABS TECH PRIVATE LIMITED and operates within its group of companies, offering astrology, spiritual guidance, and holistic healing services through its platform.
              </p>
              <p style={{ marginTop: "0.5rem" }}>
                <strong>Operating Office Address:</strong> Office no -201, Plot no 3, Stellar 1423, Sector 142, Noida, Gautambuddha Nagar, Uttar Pradesh, 201305
              </p>
            </div>
          </section>

          {/* Section 1 */}
          <section className="legal-section">
            <h2 className="legal-section__heading">1. Information We Collect</h2>
            <p>We may collect the following categories of information depending on how you interact with our website and services.</p>

            <h3 className="legal-section__subheading">a. Personal Information</h3>
            <p>When you contact us, book a consultation or submit a form, we may collect:</p>
            <ul className="legal-list">
              <li>Full name</li>
              <li>Email address</li>
              <li>Mobile number</li>
              <li>City, state or country of residence</li>
              <li>Date of birth, time of birth and place of birth, where required for a consultation</li>
              <li>Any other information you voluntarily provide while communicating with us</li>
            </ul>

            <h3 className="legal-section__subheading">b. Consultation-Related Information</h3>
            <p>
              To facilitate consultations in astrology, Jyotish, Vastu, Tarot, numerology, dowsing, healing and other spiritual practices, we may collect information relevant to your chosen service.
            </p>
            <p>
              This may include your questions, concerns, preferences, details about your circumstances and any other information you choose to share with the practitioner. Please share only the information necessary for your consultation.
            </p>

            <h3 className="legal-section__subheading">c. Transaction and Booking Information</h3>
            <p>
              Where applicable, we may collect information relating to your consultation bookings, selected services, payment status, booking confirmations, cancellations and refunds.
            </p>
            <p>
              Payments may be processed by third-party payment service providers. We do not intend to collect or store complete payment card details or banking passwords on our own systems.
            </p>

            <h3 className="legal-section__subheading">d. Technical and Usage Information</h3>
            <p>When you visit our website, certain information may be collected automatically, including:</p>
            <ul className="legal-list">
              <li>IP address and general location information derived from it</li>
              <li>Browser type and device information</li>
              <li>Operating system</li>
              <li>Pages visited, time spent on pages and referring websites</li>
              <li>Website interaction data, cookies and similar tracking technologies, where applicable</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="legal-section">
            <h2 className="legal-section__heading">2. How We Use Your Information</h2>
            <p>We use the information we collect for legitimate business purposes, including:</p>
            <ul className="legal-list">
              <li>To facilitate and manage consultation bookings.</li>
              <li>To connect you with the relevant practitioner or service provider.</li>
              <li>To communicate booking details, confirmations, reminders, changes and service-related updates.</li>
              <li>To understand your requirements and facilitate the consultation you have requested.</li>
              <li>To respond to enquiries, feedback and customer support requests.</li>
              <li>To process payments, cancellations and refunds, where applicable.</li>
              <li>To maintain business, accounting and transaction records.</li>
              <li>To improve our website, services, user experience and customer support.</li>
              <li>To protect our website against fraud, misuse, unauthorised access and security threats.</li>
              <li>To comply with applicable laws and respond to lawful requests from competent authorities.</li>
              <li>To send promotional communications, newsletters, offers or updates where permitted by law and subject to any consent requirements that apply.</li>
            </ul>
            <p>
              We will not use your personal information for purposes unrelated to those described in this policy unless we have an appropriate legal basis to do so.
            </p>
          </section>

          {/* Section 3 */}
          <section className="legal-section">
            <h2 className="legal-section__heading">3. Confidentiality of Consultation Information</h2>
            <p>We understand that spiritual consultations can involve personal matters and private concerns.</p>
            <p>
              Information shared with Tathasstu or its practitioners in connection with a consultation will be handled with reasonable care and used for facilitating the requested service, providing customer support and meeting applicable legal obligations.
            </p>
            <div className="legal-callout">
              <p>
                <strong>Confidentiality Commitment:</strong> Your consultation information will not be intentionally disclosed to unrelated third parties for their independent marketing purposes.
              </p>
            </div>
            <p>
              However, relevant information may be shared with the practitioner conducting your consultation and with service providers who help us operate our services, where necessary. We may also disclose information where required by law or to address security, fraud or legal concerns.
            </p>
            <p>
              Please note that information shared directly with an independent practitioner may also be subject to that practitioner&apos;s own privacy practices, where applicable.
            </p>
          </section>

          {/* Section 4 */}
          <section className="legal-section">
            <h2 className="legal-section__heading">4. Cookies and Similar Technologies</h2>
            <p>
              Our website may use cookies and similar technologies to improve website functionality, understand visitor behaviour, remember preferences and support analytics or marketing activities.
            </p>
            <p>These technologies may help us:</p>
            <ul className="legal-list">
              <li>Ensure that essential website features function correctly.</li>
              <li>Understand how visitors navigate our website.</li>
              <li>Improve website performance and usability.</li>
              <li>Measure the effectiveness of marketing campaigns, where applicable.</li>
            </ul>
            <p>
              You may be able to manage or disable cookies through your browser settings. Disabling certain cookies may affect the availability or functionality of some website features. Where required, we will seek consent before using non-essential cookies or similar tracking technologies.
            </p>
          </section>

          {/* Section 5 */}
          <section className="legal-section">
            <h2 className="legal-section__heading">5. Sharing of Personal Information</h2>
            <p><strong>We do not sell your personal information to third parties.</strong></p>
            <p>We may share relevant information with the following categories of recipients when necessary:</p>
            <ul className="legal-list">
              <li><strong>Practitioners and consultants:</strong> To facilitate the consultation or service you have requested.</li>
              <li><strong>Payment service providers:</strong> To process transactions, refunds and payment verification.</li>
              <li><strong>Website hosting and technology providers:</strong> To maintain the website, booking systems and related infrastructure.</li>
              <li><strong>Communication providers:</strong> To send emails, SMS messages, booking confirmations and service-related notifications.</li>
              <li><strong>Analytics and marketing providers:</strong> To understand website performance and manage promotional activities, where applicable and subject to relevant consent requirements.</li>
              <li><strong>Professional advisers:</strong> Such as legal, accounting or compliance professionals, where necessary.</li>
              <li><strong>Government authorities and law enforcement:</strong> Where disclosure is required by applicable law or a valid legal process.</li>
            </ul>
            <p>
              Third-party providers may process information in accordance with their own privacy policies and contractual obligations. Where personal information is shared, we aim to limit the information disclosed to what is reasonably necessary for the relevant purpose.
            </p>
          </section>

          {/* Section 6 */}
          <section className="legal-section">
            <h2 className="legal-section__heading">6. Third-Party Websites and Services</h2>
            <p>
              Our website may contain links to third-party websites, booking platforms, payment gateways or communication services.
            </p>
            <p>
              Tathasstu does not control the privacy practices, security measures or content of independent third-party websites. Any information you provide directly to those services will be governed by their applicable terms and privacy policies. We encourage you to review those policies before sharing personal information with third parties.
            </p>
          </section>

          {/* Section 7 */}
          <section className="legal-section">
            <h2 className="legal-section__heading">7. Data Storage and Security</h2>
            <p>
              We take reasonable measures to protect personal information against unauthorised access, disclosure, alteration, loss or misuse. These measures may include access restrictions, appropriate technical safeguards and the use of reputable service providers.
            </p>
            <p>
              However, no method of transmitting or storing information electronically can be guaranteed to be completely secure. While we take reasonable steps to safeguard your information, we cannot guarantee absolute security.
            </p>
            <p>
              Access to personal information is intended to be limited to individuals and service providers who require it for authorised business purposes.
            </p>
          </section>

          {/* Section 8 */}
          <section className="legal-section">
            <h2 className="legal-section__heading">8. Data Retention</h2>
            <p>
              We retain personal information only for as long as reasonably necessary to fulfil the purposes for which it was collected, including providing services, maintaining records, resolving disputes and complying with applicable legal requirements.
            </p>
            <p>
              When personal information is no longer required, we will take reasonable steps to delete it, anonymise it or otherwise dispose of it securely, subject to any applicable retention obligations. The retention period may vary depending on the type of information and the purpose for which it is used.
            </p>
          </section>

          {/* Section 9 */}
          <section className="legal-section">
            <h2 className="legal-section__heading">9. Your Privacy Rights and Choices</h2>
            <p>Subject to applicable law, you may have the right to:</p>
            <ul className="legal-list">
              <li>Request information about the personal data we hold about you.</li>
              <li>Request correction or updating of inaccurate or incomplete information.</li>
              <li>Withdraw consent for processing where consent is the applicable legal basis.</li>
              <li>Request deletion of personal information where legally permissible and where retention is no longer required.</li>
              <li>Opt out of promotional emails or other marketing communications.</li>
              <li>Raise a concern or grievance regarding the handling of your personal information.</li>
            </ul>
            <p>
              Withdrawing consent may affect our ability to provide certain services that depend on the information concerned. We may continue to retain or process information where permitted or required by law.
            </p>
            <p>
              To exercise your rights or submit a privacy-related request, please contact us using the details provided below. We may need to verify your identity before acting on your request.
            </p>
          </section>

          {/* Section 10 */}
          <section className="legal-section">
            <h2 className="legal-section__heading">10. Children&apos;s Privacy</h2>
            <p>
              Our website and consultation services are not intended to be used independently by children without appropriate parental or guardian involvement where required by law.
            </p>
            <p>
              We do not knowingly collect children&apos;s personal information in circumstances where such collection is prohibited. If we become aware that personal information has been collected in violation of applicable requirements, we will take appropriate steps to address the matter. Where services involve a child or information relating to a child, applicable consent and legal requirements must be followed.
            </p>
          </section>

          {/* Section 11 */}
          <section className="legal-section">
            <h2 className="legal-section__heading">11. International Data Processing</h2>
            <p>
              Depending on the service providers and technology used to operate our website, personal information may be processed or stored in locations outside your state or country of residence. Where applicable, such processing will be subject to the requirements of relevant data protection laws and any restrictions on international transfers of personal information.
            </p>
          </section>

          {/* Section 12 */}
          <section className="legal-section">
            <h2 className="legal-section__heading">12. Updates to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our services, website functionality, business practices or applicable laws.
            </p>
            <p>
              Any revised policy will be published on this page along with an updated “Last Updated” date. We encourage you to review this page periodically to stay informed about how we handle personal information.
            </p>
          </section>

          {/* Section 13: Contact Us Card */}
          <section className="legal-section">
            <h2 className="legal-section__heading">13. Contact Us</h2>
            <p>
              If you have any questions, concerns or requests regarding this Privacy Policy or the handling of your personal information, please contact us:
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

                <div className="legal-contact-item">
                  <div className="legal-contact-icon">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="legal-contact-label">Office Address</span>
                    <span className="legal-contact-value">
                      Office no -201, Plot no 3, Stellar 1423, Sector 142, Noida, Gautambuddha Nagar, Uttar Pradesh, 201305
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer className="legal-footer-note">
            By using Tathasstu&apos;s website and services, you acknowledge this Privacy Policy and understand how your personal information may be handled as described above, subject to applicable consent requirements and legal rights.
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}

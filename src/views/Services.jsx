"use client";

import React from "react";
import { Link } from "@/lib/router";
import { ArrowRight } from "lucide-react";
import Footer from "../layout/Footer";
import SiteNavbar from "../layout/SiteNavbar";
import servicesData from "../data/servicesData";
import serviceBanner from "../assets/services/Service banner.png";
import "./services-page.css";

function formatInr(amount) {
  if (!amount) return "";
  return `From ₹${Number(amount).toLocaleString("en-IN")}`;
}

export default function Services() {
  return (
    <div className="svc-page">
      <SiteNavbar />

      <section className="svc-banner">
        <h1 className="sr-only">Our Services</h1>
        <img
          src={serviceBanner}
          alt="Our Services. Comprehensive astrological and spiritual services to guide your life journey"
        />
      </section>

      <nav className="svc-jump" aria-label="Services on this page">
        <div className="svc-jump__row">
          {servicesData.map((service) => (
            <a key={service.id} className="svc-jump__link" href={`#${service.slug || service.id}`}>
              {service.title}
            </a>
          ))}
        </div>
      </nav>

      <div className="svc-list">
        {servicesData.map((service, index) => {
          const benefits = Array.isArray(service.whyChooseUs) ? service.whyChooseUs.slice(0, 3) : [];
          const href = `/services/${service.slug || service.id}`;
          const price = formatInr(service.startingPrice);

          return (
            <div key={service.id} id={service.slug || service.id} className="svc-row">
              <Link to={href} className="svc-row__link" aria-label={`Open ${service.title}`}>
                <div className="svc-row__copy">
                  <p className="svc-row__index">{String(index + 1).padStart(2, "0")}</p>
                  <h2>{service.title}</h2>
                  <p className="svc-row__lead">{service.description}</p>
                  {benefits.length > 0 ? (
                    <ul className="svc-row__benefits">
                      {benefits.map((benefit) => (
                        <li key={benefit}>{benefit}</li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="svc-row__foot">
                    {price ? <span className="svc-row__price">{price}</span> : null}
                    <span className="svc-row__cta">
                      Explore this service
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
                <div className="svc-row__media">
                  <img src={service.image} alt="" loading="lazy" decoding="async" />
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}

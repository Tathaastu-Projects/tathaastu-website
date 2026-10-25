"use client";

import React from "react";
import { Link } from "@/lib/router";
import { Clock, Phone, ShieldCheck, Star, Users } from "lucide-react";
import SiteNavbar from "../layout/SiteNavbar";
import Footer from "../layout/Footer";
import AstroFaqSection from "../components/Home/AstroFaqSection";
import lotusMandala from "../assets/lotus_mandala.svg";
import whoImage from "../assets/about/whoweare.svg";
import whatImage from "../assets/numerologist.png";
import vedicIcon from "../assets/about/vedic.svg";
import numerologyIcon from "../assets/about/numerology.svg";
import homeIcon from "../assets/about/home.svg";
import tarotIcon from "../assets/about/tarot.svg";
import poojaIcon from "../assets/about/pooja.svg";
import healingIcon from "../assets/about/healing.svg";
import missionBg from "../assets/about/our_mission_bg.svg";
import visionBg from "../assets/about/our_vission_bg.svg";

const SERVICES = [
  {
    icon: vedicIcon,
    title: "Vedic Astrology & Kundli",
    text: "Detailed insights into your life, career, relationships and beyond.",
    to: "/services/vedic-astrology",
  },
  {
    icon: numerologyIcon,
    title: "Numerology & Horoscope Matching",
    text: "Discover the power of numbers and find compatibility in relationships.",
    to: "/services/numerologists",
  },
  {
    icon: homeIcon,
    title: "Home & Office Vastu",
    text: "Create positive energy and harmony in your spaces.",
    to: "/services/vastu-shastra",
  },
  {
    icon: tarotIcon,
    title: "Tarot & Spiritual Guidance",
    text: "Get clarity with tarot readings and spiritual solutions.",
    to: "/services/tarot-reading",
  },
  {
    icon: poojaIcon,
    title: "Pooja Services",
    text: "Personalised poojas and rituals for peace, prosperity and wellbeing.",
    to: "/services/pooja-services",
  },
  {
    icon: healingIcon,
    title: "Healing & Aura Scanning",
    text: "Healing and aura scanning to restore balance and positivity.",
    to: "/services/aura-healing-scanning",
  },
];

const STATS = [
  {
    icon: Users,
    title: "1,000+ astrologers",
    text: "Verified experts",
  },
  {
    icon: Clock,
    title: "24/7",
    text: "Here when you need us",
  },
  {
    icon: Star,
    title: "Trusted by thousands",
    text: "4.8+ rating",
  },
  {
    icon: ShieldCheck,
    title: "100% genuine",
    text: "Guided with care",
  },
];

export default function About() {
  return (
    <div className="about-page">
      <SiteNavbar />

      <section className="about-hero">
        <div className="about-wrap about-hero__inner">
          <span className="about-hero__badge">
            <span className="about-hero__badge-dot" />
            Experts Online
          </span>
          <h1>
            Talk to
            <br />
            Astrologers Online
          </h1>
          <p>
            Connect with 1,000+ verified experts on Tathaastu for personalised
            guidance on love, marriage, career, finance, and other important
            areas of life. Explore your questions, understand your kundli, and
            get insights through online consultations from the comfort of your
            home. With 24/7 platform access, finding guidance is easy whenever
            you need it.
          </p>
          <Link to="/pricing?flow=consult" className="about-hero__cta">
            Talk to Astrologers Now
          </Link>
          <div className="about-hero__toast">
            <span className="about-hero__toast-icon" aria-hidden="true">
              <Phone className="h-3.5 w-3.5" />
            </span>
            <span>Priya from Mumbai just started a session with Priyanka Arora</span>
          </div>
        </div>
      </section>

      <section className="about-wrap about-stats" aria-label="Why people trust Tathaastu">
        {STATS.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="about-stats__item">
              <span className="about-stats__icon" aria-hidden="true">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="about-story">
        <div className="about-wrap about-split">
          <div className="about-copy">
            <p className="about-kicker">
              Tathaastu AI <span>Who We Are</span>
            </p>
            <h2>WHO WE ARE</h2>
            <p>
              Tathaastu brings astrology, Vastu, spiritual services, and healing
              together on one platform. From kundli reading, Vedic astrology,
              numerology, and horoscope matching to home and office Vastu, Pooja
              services, tarot reading, and different healing practices, we offer
              a range of services to support your personal and spiritual journey.
            </p>
            <p>
              Whether you are looking for answers to life&apos;s questions,
              guidance for important decisions, or support in creating a more
              balanced home, Tathaastu connects you with experts across different
              fields. Through personalised consultations and a range of online
              services, we make it easier to explore the guidance that feels
              right for you.
            </p>
          </div>
          <div className="about-photo about-photo--who">
            <img src={whoImage} alt="Who we are at Tathaastu" />
          </div>
        </div>
      </section>

      <section className="about-story about-story--do">
        <div className="about-wrap about-split about-split--flip">
          <div className="about-photo">
            <img src={whatImage} alt="Vedic birth chart and kundli reading" />
          </div>
          <div className="about-copy">
            <p className="about-kicker">
              Tathaastu AI <span>What We Do</span>
            </p>
            <h2>What We Do</h2>
            <p>
              At Tathaastu, we bring together experienced experts and a wide
              range of astrology, Vastu, spiritual, and healing services on one
              platform. Whether you want to understand your kundli, explore
              numerology, check horoscope compatibility, or seek Vastu advice
              for your home, office, or factory, you can find a service that
              suits your needs.
            </p>
            <p>
              We also offer tarot readings, Pooja services, crystal healing, pet
              healing, dowsing, and aura healing and scanning. Through online
              consultations and specialised services, we make it easier to
              explore different approaches to guidance and find the support you
              are looking for.
            </p>
          </div>
        </div>
      </section>

      <section className="about-wisdom">
        <img
          src={lotusMandala}
          alt=""
          className="about-wisdom__mandala about-wisdom__mandala--left"
          aria-hidden="true"
        />
        <img
          src={lotusMandala}
          alt=""
          className="about-wisdom__mandala about-wisdom__mandala--right"
          aria-hidden="true"
        />
        <div className="about-wrap">
          <div className="about-wisdom__head">
            <p>What We Do</p>
            <h2>A World of Wisdom. One Platform.</h2>
            <span>
              From understanding your kundli to improving the energy around you,
              Tathaastu offers astrology and spiritual services in one place.
            </span>
          </div>

          <div className="about-services">
            {SERVICES.map((item) => (
              <Link key={item.title} to={item.to} className="about-service">
                <span className="about-service__icon">
                  <img src={item.icon} alt="" />
                </span>
                <span className="about-service__copy">
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </span>
              </Link>
            ))}
          </div>

          <div className="about-purpose">
            <article
              className="about-purpose__card"
              style={{ backgroundImage: `url(${missionBg})` }}
            >
              <p>Our Mission</p>
              <span>
                To make astrology, Vastu, spiritual services and healing more
                accessible, connecting people with trusted experts and
                personalised guidance.
              </span>
            </article>
            <article
              className="about-purpose__card"
              style={{ backgroundImage: `url(${visionBg})` }}
            >
              <p>Our Vision</p>
              <span>
                To become a trusted destination for astrology, spiritual
                guidance and holistic wellbeing, bringing traditional wisdom
                and modern convenience together.
              </span>
            </article>
          </div>
        </div>
      </section>

      <AstroFaqSection id="about-faq" />

      <Footer />
    </div>
  );
}

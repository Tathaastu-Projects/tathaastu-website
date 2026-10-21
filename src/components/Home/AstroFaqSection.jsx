"use client";

import React, { useState } from "react";
import { Link } from "@/lib/router";
import { ArrowRight, Minus, Plus } from "lucide-react";

export const HOME_FAQS = [
  {
    q: "What can I use Tathaastu for?",
    a: "Tathaastu helps you find guidance for different areas of life. You can create your Kundli, check your horoscope, talk to an expert, or explore tarot, numerology, Vastu, and healing.",
  },
  {
    q: "How can I talk to an expert?",
    a: "Choose a service and browse the available experts. You can connect with an expert through chat, call, or video, depending on the consultation you choose.",
  },
  {
    q: "What details do I need to create my Kundli?",
    a: "You’ll need your date of birth, exact birth time, and place of birth. These details help create your Vedic birth chart.",
  },
  {
    q: "How do I choose the right expert?",
    a: "Start by choosing what you need help with, such as love, marriage, career, finance or family. You can then explore expert profiles and choose someone who feels right for you.",
  },
  {
    q: "Can I ask questions during a consultation?",
    a: "Yes. You can ask the questions that are on your mind and discuss them directly with your expert during your consultation.",
  },
  {
    q: "Is Tathaastu available anytime?",
    a: "You can access Tathaastu online whenever you need it. Expert availability may vary, so check the available consultation slots before booking.",
  },
];

export default function AstroFaqSection({ id = "faq" }) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section id={id} className="astro-faq-section">
      <div className="astro-faq-head">
        <Link to="/blog" className="astro-faq-blogs-btn">
          View All Blogs
          <ArrowRight className="h-4 w-4" />
        </Link>
        <h2 className="astro-faq-title">
          Frequently Asked <span>Questions</span>
        </h2>
        <p className="astro-faq-sub">
          Everything you need to know about Tathaastu, in one place.
        </p>
      </div>

      <div className="astro-faq">
        {HOME_FAQS.map((item, idx) => {
          const open = openFaq === idx;
          const num = String(idx + 1).padStart(2, "0");
          return (
            <div
              key={item.q}
              className={`astro-faq__item ${open ? "is-open" : ""}`}
            >
              <button
                type="button"
                onClick={() => setOpenFaq(open ? -1 : idx)}
              >
                <span className="astro-faq__num" aria-hidden="true">
                  {num}
                </span>
                <span className="astro-faq__q">{item.q}</span>
                <span
                  className={`astro-faq__toggle ${open ? "is-open" : ""}`}
                  aria-hidden="true"
                >
                  {open ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </span>
              </button>
              {open ? <p className="astro-faq__a">{item.a}</p> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Are these products authentic and energised?",
    a: "Yes. Our store items are curated for quality and spiritual use. Where relevant, products are prepared with traditional practices and clear usage guidance.",
  },
  {
    q: "Can I get expert advice before buying a remedy?",
    a: "Absolutely. You can consult a verified Tathaastu expert for personalised recommendations on Vastu, gemstones, rudraksha, and puja essentials.",
  },
  {
    q: "How long does delivery take?",
    a: "Most orders are dispatched within 24–48 hours. Delivery timelines vary by city and typically range from 3–7 working days.",
  },
  {
    q: "What is your return policy?",
    a: "Unused items in original packaging can be returned within 7 days of delivery, subject to product type and hygiene guidelines for sacred items.",
  },
];

export default function StoreFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="store-section">
      <div className="store-section__head">
        <div>
          <h2>Frequently Asked Questions</h2>
          <p>First time shopping spiritual essentials? Start here.</p>
        </div>
      </div>
      <div className="store-faq">
        {FAQS.map((item, idx) => {
          const isOpen = open === idx;
          return (
            <div key={item.q} className="store-faq__item">
              <button type="button" onClick={() => setOpen(isOpen ? -1 : idx)}>
                <span>{item.q}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen ? <p>{item.a}</p> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

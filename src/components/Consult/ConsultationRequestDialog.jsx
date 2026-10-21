"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const EMPTY = {
  name: "",
  dob: "",
  tob: "",
  place: "",
  goals: "",
  date: "",
  time: "10:00",
  phone: "",
  email: "",
};

export default function ConsultationRequestDialog({
  expert,
  packageName,
  serviceLabel,
  onClose,
}) {
  const [step, setStep] = useState("details");
  const [form, setForm] = useState(EMPTY);
  const [mounted, setMounted] = useState(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    setMounted(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const setField = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  if (!mounted) return null;

  const title =
    step === "done"
      ? "Our Experts Will Reach Out To You"
      : step === "schedule"
        ? "Select Time & Fill Form"
        : "Share Birth Details & Consultation Goals";

  return createPortal(
    <div className="consult-dialog" role="presentation" onClick={onClose}>
      <div
        className="consult-dialog__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="consult-dialog__eyebrow">
          {expert?.name}
          {packageName ? ` · ${packageName}` : ""}
          {serviceLabel ? ` · ${serviceLabel}` : ""}
        </p>
        <h2 id="consult-dialog-title">{title}</h2>

        {step === "details" ? (
          <form
            className="consult-dialog__form"
            onSubmit={(event) => {
              event.preventDefault();
              setStep("schedule");
            }}
          >
            <p>Tell us who the reading is for, and what you want to talk about.</p>
            <label>
              Full name
              <input value={form.name} onChange={setField("name")} required />
            </label>
            <div className="consult-dialog__row">
              <label>
                Date of birth
                <input type="date" value={form.dob} onChange={setField("dob")} required />
              </label>
              <label>
                Time of birth
                <input type="time" value={form.tob} onChange={setField("tob")} required />
              </label>
            </div>
            <label>
              Place of birth
              <input value={form.place} onChange={setField("place")} required />
            </label>
            <label>
              Consultation goals
              <textarea
                value={form.goals}
                onChange={setField("goals")}
                rows={3}
                required
                placeholder="What would you like clarity on?"
              />
            </label>
            <div className="consult-dialog__actions">
              <button type="button" className="consult-dialog__ghost" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="consult-dialog__primary">
                Continue
              </button>
            </div>
          </form>
        ) : null}

        {step === "schedule" ? (
          <form
            className="consult-dialog__form"
            onSubmit={(event) => {
              event.preventDefault();
              setStep("done");
            }}
          >
            <p>Choose a time that suits you. We will confirm it with the expert.</p>
            <div className="consult-dialog__row">
              <label>
                Preferred date
                <input type="date" value={form.date} onChange={setField("date")} required />
              </label>
              <label>
                Preferred time
                <select value={form.time} onChange={setField("time")} required>
                  <option value="10:00">10:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="20:00">8:00 PM</option>
                </select>
              </label>
            </div>
            <label>
              Phone
              <input type="tel" value={form.phone} onChange={setField("phone")} required />
            </label>
            <label>
              Email
              <input type="email" value={form.email} onChange={setField("email")} required />
            </label>
            <div className="consult-dialog__actions">
              <button type="button" className="consult-dialog__ghost" onClick={() => setStep("details")}>
                Back
              </button>
              <button type="submit" className="consult-dialog__primary">
                Submit
              </button>
            </div>
          </form>
        ) : null}

        {step === "done" ? (
          <div className="consult-dialog__done">
            <p>
              Thank you{form.name ? `, ${form.name}` : ""}. {expert?.name || "Our expert"} will
              reach out to you about your {packageName || "consultation"}
              {serviceLabel ? ` for ${serviceLabel}` : ""}.
            </p>
            <button type="button" className="consult-dialog__primary" onClick={onClose}>
              Close
            </button>
          </div>
        ) : null}
      </div>
    </div>,
    document.body
  );
}

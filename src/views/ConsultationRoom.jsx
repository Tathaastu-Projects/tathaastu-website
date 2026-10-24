"use client";

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "@/lib/router";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  Clock,
  Compass,
  Lock,
  Phone,
  Radio,
  ShieldCheck,
  Sparkles,
  Video,
} from "lucide-react";
import SiteNavbar from "../layout/SiteNavbar";
import Footer from "../layout/Footer";
import dynamic from "next/dynamic";

const HmsConsultationModal = dynamic(
  () => import("../components/Consult/HmsConsultationModal"),
  { ssr: false }
);
import { createHmsSession, getHmsSession, joinHmsSession } from "../services/hmsApi";
import "../components/Consult/hms-consultation.css";

export default function ConsultationRoom() {
  const location = useLocation();
  const [sessionIdInput, setSessionIdInput] = useState("");
  const [activeSession, setActiveSession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const sid = params.get("session") || params.get("id");
    const mode = params.get("mode") || "video";

    if (sid) {
      setSessionIdInput(sid);
      // Auto-join existing session
      (async () => {
        setLoading(true);
        try {
          const joinData = await joinHmsSession(sid);
          setActiveSession({
            id: sid,
            mode,
            join: joinData,
          });
          setIsModalOpen(true);
        } catch (err) {
          setErrorNotice("Could not auto-join session. Please try joining below.");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [location]);

  const handleStartInstant = async (mode = "video") => {
    setLoading(true);
    setErrorNotice(null);
    try {
      const data = await createHmsSession({ mode });
      setActiveSession(data);
      setIsModalOpen(true);
    } catch (err) {
      setErrorNotice(err.message || "Failed to start 100ms session.");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinById = async (e) => {
    e.preventDefault();
    if (!sessionIdInput.trim()) return;
    setLoading(true);
    setErrorNotice(null);
    try {
      const joinData = await joinHmsSession(sessionIdInput.trim());
      setActiveSession({
        id: sessionIdInput.trim(),
        mode: "video",
        join: joinData,
      });
      setIsModalOpen(true);
    } catch (err) {
      setErrorNotice(err.message || "Unable to join session ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#08060e", color: "#f8fafc" }}>
      <SiteNavbar />

      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link
            to="/talk-to-astrologers"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#f5b301",
              fontSize: "0.85rem",
              textDecoration: "none",
              marginBottom: "1.25rem",
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Astrologers
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem" }}>
            <span
              style={{
                background: "rgba(245, 179, 1, 0.15)",
                color: "#f5b301",
                border: "1px solid rgba(245, 179, 1, 0.3)",
                padding: "4px 12px",
                borderRadius: "100px",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              100ms Live Consultation Suite
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Vedic Confidential Channel</span>
            </div>
          </div>

          <h1 style={{ fontSize: "2.25rem", fontWeight: 800, color: "#fff", margin: "0 0 10px" }}>
            Vedic Audio &amp; Video Consultation Room
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", lineHeight: 1.6 }}>
            Connect face-to-face or via high-fidelity sacred audio with verified Vedic Gurus. Powered by end-to-end encrypted 100ms WebRTC streams.
          </p>
        </div>

        {errorNotice && (
          <div
            style={{
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              color: "#fca5a5",
              padding: "12px 16px",
              borderRadius: "12px",
              fontSize: "0.88rem",
              marginBottom: "1.5rem",
            }}
          >
            {errorNotice}
          </div>
        )}

        {/* INSTANT LAUNCH CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "3rem" }}>
          <div
            style={{
              background: "radial-gradient(circle at top left, #1a1429 0%, #0c0914 100%)",
              border: "1px solid rgba(245, 179, 1, 0.3)",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(245, 179, 1, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f5b301",
                marginBottom: "16px",
              }}
            >
              <Video className="h-6 w-6" />
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0 0 6px" }}>HD Video Consultation</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: "20px" }}>
              Full audio/video with picture-in-picture devotee view, Kundli notes drawer, and face-to-face blessings.
            </p>
            <button
              type="button"
              onClick={() => handleStartInstant("video")}
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                background: "linear-gradient(135deg, #0a3428 0%, #155e46 100%)",
                border: "1px solid rgba(245, 179, 1, 0.4)",
                borderRadius: "12px",
                color: "#f7eedb",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(10,52,40,0.4)",
              }}
            >
              {loading ? "Starting 100ms..." : "Start Video Room"}
            </button>
          </div>

          <div
            style={{
              background: "radial-gradient(circle at top left, #1a1429 0%, #0c0914 100%)",
              border: "1px solid rgba(245, 179, 1, 0.3)",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(245, 179, 1, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f5b301",
                marginBottom: "16px",
              }}
            >
              <Radio className="h-6 w-6" />
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0 0 6px" }}>Vedic Audio Consultation</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: "20px" }}>
              Audio-only sacred mandala stage with pulsing voice visualizer. Optimized for pure focus and privacy.
            </p>
            <button
              type="button"
              onClick={() => handleStartInstant("audio")}
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                background: "linear-gradient(135deg, #f5b301 0%, #d97706 100%)",
                border: "none",
                borderRadius: "12px",
                color: "#0c0914",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(245,179,1,0.3)",
              }}
            >
              {loading ? "Starting 100ms..." : "Start Audio Room"}
            </button>
          </div>
        </div>

        {/* ENTER EXISTING SESSION ID */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <h4 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 8px" }}>Join With Consultation Session ID</h4>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", margin: "0 0 16px" }}>
            If you received a session ID or invitation from your Astrologer, enter it below to join.
          </p>

          <form onSubmit={handleJoinById} style={{ display: "flex", gap: "12px", maxWidth: "500px" }}>
            <input
              type="text"
              placeholder="e.g. tat_hms_9281734"
              value={sessionIdInput}
              onChange={(e) => setSessionIdInput(e.target.value)}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: "10px",
                padding: "10px 14px",
                color: "#fff",
                outline: "none",
                fontSize: "0.85rem",
              }}
            />
            <button
              type="submit"
              disabled={loading || !sessionIdInput.trim()}
              style={{
                padding: "10px 20px",
                background: "#f5b301",
                border: "none",
                borderRadius: "10px",
                color: "#0c0914",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              Join Call
            </button>
          </form>
        </div>
      </main>

      <Footer />

      {/* 100ms Live Modal */}
      <HmsConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        session={activeSession}
        astrologer={{
          name: "Acharya Pt. Harishankar Sharma",
          title: "Senior Vedic Astrologer & Vastu Guru",
          imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
          rating: 4.95,
          experience: "18+ yrs",
        }}
        clientDetails={{
          name: "Devotee",
          dob: "1994-04-12",
          tob: "10:15 AM",
          pob: "Delhi, India",
          concern: "General Life Guidance & Dasha Analysis",
        }}
      />
    </div>
  );
}

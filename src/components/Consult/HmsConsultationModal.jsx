"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Compass,
  FileText,
  Lock,
  Maximize2,
  Mic,
  MicOff,
  Minimize2,
  PhoneOff,
  Radio,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  User,
  Video,
  VideoOff,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { endHmsSession } from "../../services/hmsApi";
import "./hms-consultation.css";

export default function HmsConsultationModal({
  isOpen,
  onClose,
  session,
  astrologer = {
    name: "Acharya Pt. Harishankar Sharma",
    title: "Vedic & Kundli Specialist",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    experience: "18+ yrs",
  },
  clientDetails = {
    name: "Devotee",
    dob: "1992-08-15",
    tob: "08:30 AM",
    pob: "New Delhi, India",
    concern: "Kundli Dosha & Career Prosperity",
  },
}) {
  const mode = session?.mode || "video";
  const sessionId = session?.session?.id || session?.id || "tat_session";

  // Controls state
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(mode === "audio");
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState("kundli"); // "kundli" | "chat"
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "astrologer",
      text: "Namaste. I am analyzing your planetary positions and dasha.",
      time: "Just now",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Elapsed timer
  const [elapsedSecs, setElapsedSecs] = useState(0);

  // Call termination state
  const [isEnded, setIsEnded] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewNote, setReviewNote] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Video feed ref
  const localVideoRef = useRef(null);
  const streamRef = useRef(null);

  // Timer loop
  useEffect(() => {
    if (!isOpen || isEnded) return;
    const interval = setInterval(() => {
      setElapsedSecs((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isEnded]);

  // WebRTC Local Camera Stream handling
  useEffect(() => {
    if (!isOpen || isEnded) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      return;
    }

    if (mode === "video" && !isVideoMuted) {
      navigator.mediaDevices
        ?.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          streamRef.current = stream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.warn("Camera preview fallback:", err.message);
        });
    } else {
      if (streamRef.current) {
        streamRef.current.getVideoTracks().forEach((track) => {
          track.enabled = false;
        });
      }
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [isOpen, isVideoMuted, mode, isEnded]);

  // Handle Mute Mic toggle
  const toggleMic = () => {
    setIsMicMuted((prev) => {
      const next = !prev;
      if (streamRef.current) {
        streamRef.current.getAudioTracks().forEach((track) => {
          track.enabled = !next;
        });
      }
      return next;
    });
  };

  // Handle Video toggle
  const toggleVideo = () => {
    if (mode === "audio") return;
    setIsVideoMuted((prev) => {
      const next = !prev;
      if (streamRef.current) {
        streamRef.current.getVideoTracks().forEach((track) => {
          track.enabled = !next;
        });
      }
      return next;
    });
  };

  // Handle End Call
  const handleEndCall = async () => {
    try {
      await endHmsSession(sessionId, { reason: "Customer ended consultation", lock: true });
    } catch (e) {
      /* ignore */
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsEnded(true);
  };

  // Submit Feedback
  const handleSubmitFeedback = () => {
    setFeedbackSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsEnded(false);
      setElapsedSecs(0);
      setFeedbackSubmitted(false);
    }, 1500);
  };

  // Send in-call chat message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: newMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setNewMessage("");
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${String(mins).padStart(2, "0")}:${String(remSecs).padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  return (
    <div className="hms-overlay" role="dialog" aria-modal="true">
      {isEnded ? (
        <div className="hms-feedback-modal">
          <div className="pay-modal-icon-wrap" style={{ margin: "0 auto 16px" }}>
            <Check className="h-8 w-8 text-emerald-400 stroke-[3]" />
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 6px" }}>
            Consultation Completed
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.88rem", margin: "0 0 16px" }}>
            Session with <strong>{astrologer.name}</strong> lasted {formatTime(elapsedSecs)}.
          </p>

          <p style={{ fontSize: "0.85rem", color: "#f5b301", fontWeight: 600 }}>
            How was your spiritual guidance?
          </p>

          <div className="hms-feedback-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`hms-star-btn ${star <= rating ? "is-active" : ""}`}
                onClick={() => setRating(star)}
              >
                <Star
                  className={`h-7 w-7 ${
                    star <= rating ? "fill-[#F5B301] text-[#F5B301]" : "text-white/30"
                  }`}
                />
              </button>
            ))}
          </div>

          <textarea
            className="hms-feedback-input"
            placeholder="Share your experience or blessings received from the Guru..."
            value={reviewNote}
            onChange={(e) => setReviewNote(e.target.value)}
          />

          <button
            type="button"
            className="hms-feedback-submit"
            onClick={handleSubmitFeedback}
          >
            {feedbackSubmitted ? "Thank you! Jai Shri Ram..." : "Submit Review & Close"}
          </button>
        </div>
      ) : (
        <div className="hms-window">
          {/* HEADER */}
          <header className="hms-header">
            <div className="hms-header__left">
              <div className="hms-expert-chip">
                <img
                  src={astrologer.imageUrl}
                  alt={astrologer.name}
                  className="hms-expert-chip__avatar"
                />
                <div className="hms-expert-chip__meta">
                  <h4>
                    {astrologer.name}
                    <BadgeCheck className="h-4 w-4 text-[#F5B301] inline fill-[#F5B301]" />
                  </h4>
                  <p>{astrologer.title}</p>
                </div>
              </div>
            </div>

            <div className="hms-header__center">
              <div className="hms-live-pill">
                <span className="hms-live-pill__dot" />
                Live
              </div>
              <div className="hms-timer-pill">
                <Clock className="h-3.5 w-3.5" />
                <span>{formatTime(elapsedSecs)}</span>
              </div>
              <div className="hms-mode-pill">
                {mode === "video" ? (
                  <>
                    <Video className="h-3.5 w-3.5 text-amber-400" />
                    <span>100ms HD Video</span>
                  </>
                ) : (
                  <>
                    <Radio className="h-3.5 w-3.5 text-amber-400" />
                    <span>100ms Vedic Audio</span>
                  </>
                )}
              </div>
            </div>

            <div className="hms-header__right">
              <button
                type="button"
                className="hms-head-btn"
                title="Toggle Vedic Notes Drawer"
                onClick={() => setIsDrawerOpen((prev) => !prev)}
              >
                <FileText className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="hms-head-btn"
                title="End Consultation"
                onClick={handleEndCall}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          {/* MAIN STAGE */}
          <div className="hms-body">
            <main className="hms-stage">
              {mode === "video" ? (
                <div className="hms-video-grid">
                  {/* Remote Astrologer Video Frame */}
                  <div className="hms-remote-feed">
                    <img
                      src={astrologer.imageUrl}
                      alt={astrologer.name}
                      className="hms-remote-feed__img"
                    />
                    <div className="hms-remote-badge">
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      <span>{astrologer.name} (Live Video)</span>
                    </div>
                  </div>

                  {/* Local PIP Video Frame */}
                  <div className="hms-pip-feed">
                    {!isVideoMuted ? (
                      <video
                        ref={localVideoRef}
                        autoPlay
                        playsInline
                        muted
                      />
                    ) : (
                      <div className="hms-pip-feed__muted">
                        <VideoOff className="h-6 w-6" />
                        <span>Camera Off</span>
                      </div>
                    )}
                    <span className="hms-pip-badge">You</span>
                  </div>
                </div>
              ) : (
                /* Pure Vedic Audio Mandala Stage */
                <div className="hms-audio-mandala">
                  <div className="hms-mandala-ring">
                    <div className="hms-mandala-glow" />
                    <div className="hms-mandala-yantra" />
                    <img
                      src={astrologer.imageUrl}
                      alt={astrologer.name}
                      className="hms-mandala-avatar"
                    />
                  </div>

                  <h3 className="hms-audio-title">{astrologer.name}</h3>
                  <p className="hms-audio-sub">
                    Vedic Audio Consultation Active • High Fidelity Audio Stream
                  </p>

                  <div className="hms-audio-bars">
                    <span className="hms-wave-bar" />
                    <span className="hms-wave-bar" />
                    <span className="hms-wave-bar" />
                    <span className="hms-wave-bar" />
                    <span className="hms-wave-bar" />
                    <span className="hms-wave-bar" />
                  </div>
                </div>
              )}
            </main>

            {/* SIDE DRAWER */}
            {isDrawerOpen && (
              <aside className="hms-drawer">
                <div className="hms-drawer-tabs">
                  <button
                    type="button"
                    className={`hms-drawer-tab ${drawerTab === "kundli" ? "is-active" : ""}`}
                    onClick={() => setDrawerTab("kundli")}
                  >
                    Birth Chart &amp; Notes
                  </button>
                  <button
                    type="button"
                    className={`hms-drawer-tab ${drawerTab === "chat" ? "is-active" : ""}`}
                    onClick={() => setDrawerTab("chat")}
                  >
                    Live Chat &amp; Mantras
                  </button>
                </div>

                <div className="hms-drawer-content">
                  {drawerTab === "kundli" ? (
                    <div>
                      <div className="hms-info-card">
                        <h5>Devotee Details</h5>
                        <div className="hms-info-row">
                          <span>Name:</span>
                          <strong>{clientDetails.name}</strong>
                        </div>
                        <div className="hms-info-row">
                          <span>DOB:</span>
                          <strong>{clientDetails.dob || "Provided in Kundli"}</strong>
                        </div>
                        <div className="hms-info-row">
                          <span>Time:</span>
                          <strong>{clientDetails.tob || "09:15 AM"}</strong>
                        </div>
                        <div className="hms-info-row">
                          <span>Place:</span>
                          <strong>{clientDetails.pob || "Delhi, India"}</strong>
                        </div>
                      </div>

                      <div className="hms-info-card">
                        <h5>Primary Consultation Focus</h5>
                        <p style={{ margin: 0, fontSize: "0.82rem", color: "#f8fafc" }}>
                          {clientDetails.concern || "General life forecast, financial prosperity, and Graha Shanti remedies."}
                        </p>
                      </div>

                      <div className="hms-info-card">
                        <h5>Security &amp; Sanctity</h5>
                        <p style={{ margin: 0, fontSize: "0.78rem", color: "rgba(255,255,255,0.6)" }}>
                          🔒 All consultations on Tathaastu are protected under strict Vedic confidentiality. No recordings are retained without explicit consent.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
                        {chatMessages.map((msg, idx) => (
                          <div
                            key={idx}
                            style={{
                              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                              maxWidth: "80%",
                              background: msg.sender === "user" ? "#f5b301" : "rgba(255,255,255,0.08)",
                              color: msg.sender === "user" ? "#0f0d17" : "#fff",
                              padding: "8px 12px",
                              borderRadius: "12px",
                              fontSize: "0.82rem",
                            }}
                          >
                            <p style={{ margin: 0 }}>{msg.text}</p>
                            <span style={{ fontSize: "0.65rem", opacity: 0.7, display: "block", marginTop: "4px" }}>
                              {msg.time}
                            </span>
                          </div>
                        ))}
                      </div>

                      <form
                        onSubmit={handleSendMessage}
                        style={{ display: "flex", gap: "6px", marginTop: "12px" }}
                      >
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type mantra or date..."
                          style={{
                            flex: 1,
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            borderRadius: "8px",
                            padding: "8px 12px",
                            color: "#fff",
                            fontSize: "0.8rem",
                            outline: "none",
                          }}
                        />
                        <button
                          type="submit"
                          style={{
                            background: "#f5b301",
                            border: "none",
                            borderRadius: "8px",
                            padding: "0 12px",
                            color: "#0f0d17",
                            cursor: "pointer",
                          }}
                        >
                          <Send className="h-3.5 w-3.5" />
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </aside>
            )}
          </div>

          {/* FLOATING CONTROL BAR */}
          <footer className="hms-footer">
            <div className="hms-footer__left">
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Encrypted Vedic Channel</span>
              </div>
            </div>

            <div className="hms-footer__center">
              {/* Mic Toggle */}
              <button
                type="button"
                className={`hms-ctrl-btn ${isMicMuted ? "is-muted" : ""}`}
                title={isMicMuted ? "Unmute Microphone" : "Mute Microphone"}
                onClick={toggleMic}
              >
                {isMicMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>

              {/* Video Toggle */}
              <button
                type="button"
                className={`hms-ctrl-btn ${isVideoMuted ? "is-off" : ""}`}
                title={mode === "audio" ? "Video is off in Audio Mode" : isVideoMuted ? "Start Camera" : "Stop Camera"}
                onClick={toggleVideo}
                disabled={mode === "audio"}
                style={{ opacity: mode === "audio" ? 0.4 : 1 }}
              >
                {isVideoMuted ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
              </button>

              {/* Speaker Toggle */}
              <button
                type="button"
                className={`hms-ctrl-btn ${isSpeakerMuted ? "is-muted" : ""}`}
                title={isSpeakerMuted ? "Unmute Speaker" : "Mute Speaker"}
                onClick={() => setIsSpeakerMuted((prev) => !prev)}
              >
                {isSpeakerMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>

              {/* End Call Button */}
              <button
                type="button"
                className="hms-ctrl-btn is-end"
                title="End Consultation"
                onClick={handleEndCall}
              >
                <PhoneOff className="h-4 w-4" />
                <span>End Call</span>
              </button>
            </div>

            <div className="hms-footer__right" style={{ justifyContent: "flex-end" }}>
              <button
                type="button"
                className="hms-ctrl-btn"
                title="Kundli & Chat Notes"
                onClick={() => setIsDrawerOpen((prev) => !prev)}
              >
                <FileText className="h-5 w-5" />
              </button>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

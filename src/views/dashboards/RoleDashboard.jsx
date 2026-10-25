"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "@/lib/router";
import { useAuth } from "../../contexts/AuthContext";
import SiteNavbar from "../../layout/SiteNavbar";
import Footer from "../../layout/Footer";
import dynamic from "next/dynamic";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  ExternalLink,
  Layers,
  Lock,
  LogOut,
  Phone,
  Radio,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  User,
  Users,
  Video,
  X,
} from "lucide-react";

import {
  fetchMyBookings,
  joinBookingSession,
  endBookingSession,
} from "../../services/bookingsApi";
import {
  fetchExpertMe,
  updateExpertProfile,
  fetchExpertBookings,
  joinExpertBooking,
  endExpertBooking,
} from "../../services/expertApi";
import {
  fetchAdminDashboard,
  fetchAdminUsers,
  updateAdminUser,
  fetchAdminAstrologers,
  updateAdminAstrologer,
  fetchAdminPlans,
  fetchAdminBookings,
  updateAdminBooking,
  fetchAdminPayments,
  refundAdminPayment,
} from "../../services/adminApi";

const HmsConsultationModal = dynamic(
  () => import("../../components/Consult/HmsConsultationModal"),
  { ssr: false }
);

const STATUS_BADGES = {
  ready: {
    label: "Ready to Join",
    bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500 animate-pulse",
  },
  in_session: {
    label: "In Consultation",
    bg: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500 animate-pulse",
  },
  completed: {
    label: "Completed",
    bg: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  pending_payment: {
    label: "Pending Payment",
    bg: "bg-orange-50 text-orange-700 border-orange-200",
    dot: "bg-orange-500",
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-red-50 text-red-700 border-red-200",
    dot: "bg-red-500",
  },
  expired: {
    label: "Expired",
    bg: "bg-gray-50 text-gray-700 border-gray-200",
    dot: "bg-gray-400",
  },
};

export default function RoleDashboard({ role = "user" }) {
  const { user, token, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Consultation Session State (100ms)
  const [activeHmsSession, setActiveHmsSession] = useState(null);
  const [isHmsModalOpen, setIsHmsModalOpen] = useState(false);
  const [joiningBookingId, setJoiningBookingId] = useState(null);
  const [actionError, setActionError] = useState("");

  // Sub-portal Data States
  const [userBookings, setUserBookings] = useState([]);
  const [userLoading, setUserLoading] = useState(true);

  const [expertProfile, setExpertProfile] = useState(null);
  const [expertBookings, setExpertBookings] = useState([]);
  const [expertLoading, setExpertLoading] = useState(true);
  const [isOnlineToggling, setIsOnlineToggling] = useState(false);

  const [adminStats, setAdminStats] = useState(null);
  const [adminTab, setAdminTab] = useState("bookings"); // "bookings" | "payments" | "users" | "astrologers"
  const [adminBookings, setAdminBookings] = useState([]);
  const [adminPayments, setAdminPayments] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [adminAstrologers, setAdminAstrologers] = useState([]);
  const [adminLoading, setAdminLoading] = useState(true);

  // Refund Modal State (Easebuzz Refund API v2)
  const [refundModal, setRefundModal] = useState({
    isOpen: false,
    payment: null,
    amount: "",
    reason: "",
    isSubmitting: false,
    successMsg: "",
    errorMsg: "",
  });

  // Astrologer Link Modal State
  const [linkModal, setLinkModal] = useState({
    isOpen: false,
    astrologer: null,
    targetUserId: "",
    isSubmitting: false,
    errorMsg: "",
  });

  // ================= LOAD DATA BY ROLE =================
  const loadUserData = useCallback(async () => {
    if (!token) return;
    setUserLoading(true);
    try {
      const data = await fetchMyBookings();
      setUserBookings(data || []);
    } catch (err) {
      console.warn("Failed to load user bookings:", err);
    } finally {
      setUserLoading(false);
    }
  }, [token]);

  const loadExpertData = useCallback(async () => {
    if (!token) return;
    setExpertLoading(true);
    try {
      const [me, bookings] = await Promise.all([
        fetchExpertMe().catch(() => null),
        fetchExpertBookings().catch(() => []),
      ]);
      setExpertProfile(me);
      setExpertBookings(bookings || []);
    } catch (err) {
      console.warn("Failed to load expert data:", err);
    } finally {
      setExpertLoading(false);
    }
  }, [token]);

  const loadAdminData = useCallback(async () => {
    if (!token) return;
    setAdminLoading(true);
    try {
      const stats = await fetchAdminDashboard().catch(() => null);
      setAdminStats(stats);

      if (adminTab === "bookings") {
        const b = await fetchAdminBookings().catch(() => []);
        setAdminBookings(b || []);
      } else if (adminTab === "payments") {
        const p = await fetchAdminPayments().catch(() => []);
        setAdminPayments(p || []);
      } else if (adminTab === "users") {
        const u = await fetchAdminUsers().catch(() => []);
        setAdminUsers(u || []);
      } else if (adminTab === "astrologers") {
        const a = await fetchAdminAstrologers().catch(() => []);
        setAdminAstrologers(a || []);
      }
    } catch (err) {
      console.warn("Failed to load admin data:", err);
    } finally {
      setAdminLoading(false);
    }
  }, [token, adminTab]);

  useEffect(() => {
    if (role === "user") loadUserData();
    else if (role === "expert") loadExpertData();
    else if (role === "admin") loadAdminData();
  }, [role, loadUserData, loadExpertData, loadAdminData]);

  // ================= USER ACTIONS =================
  const handleJoinUserSession = async (booking) => {
    setActionError("");
    setJoiningBookingId(booking.id);
    try {
      const data = await joinBookingSession(booking.id);
      setActiveHmsSession({
        ...data.join,
        id: data.session?.id || booking.hmsSessionId,
        session: data.session,
        booking: data.booking || booking,
        mode: data.join?.mode || booking.mode || "video",
        remainingSeconds: data.join?.remainingSeconds,
        sessionEndsAt: data.join?.sessionEndsAt || data.booking?.sessionEndsAt,
      });
      setIsHmsModalOpen(true);
    } catch (err) {
      setActionError(
        err.message || "Unable to join session. Please check if consultation slot is active."
      );
    } finally {
      setJoiningBookingId(null);
    }
  };

  // ================= EXPERT ACTIONS =================
  const handleToggleOnline = async () => {
    if (!expertProfile?.astrologer) return;
    setIsOnlineToggling(true);
    try {
      const currentOnline = Boolean(expertProfile.astrologer.online);
      const updated = await updateExpertProfile({ online: !currentOnline });
      setExpertProfile((prev) => ({
        ...prev,
        astrologer: {
          ...prev.astrologer,
          online: updated.online,
        },
      }));
    } catch (err) {
      alert(err.message || "Could not update availability status.");
    } finally {
      setIsOnlineToggling(false);
    }
  };

  const handleJoinExpertSession = async (booking) => {
    setActionError("");
    setJoiningBookingId(booking.id);
    try {
      const data = await joinExpertBooking(booking.id);
      setActiveHmsSession({
        ...data.join,
        id: data.session?.id || booking.hmsSessionId,
        session: data.session,
        booking: data.booking || booking,
        mode: data.join?.mode || booking.mode || "video",
        remainingSeconds: data.join?.remainingSeconds,
        sessionEndsAt: data.join?.sessionEndsAt || data.booking?.sessionEndsAt,
      });
      setIsHmsModalOpen(true);
    } catch (err) {
      setActionError(err.message || "Failed to join host session.");
    } finally {
      setJoiningBookingId(null);
    }
  };

  const handleEndExpertSession = async (bookingId) => {
    if (!confirm("Are you sure you want to conclude this consultation?")) return;
    try {
      await endExpertBooking(bookingId);
      loadExpertData();
    } catch (err) {
      alert(err.message || "Failed to end session.");
    }
  };

  // ================= ADMIN ACTIONS =================
  const handleAdminMarkPaid = async (bookingId) => {
    try {
      await updateAdminBooking(bookingId, { markPaid: true });
      loadAdminData();
    } catch (err) {
      alert(err.message || "Failed to mark booking paid.");
    }
  };

  const handleAdminUpdateBookingStatus = async (bookingId, status) => {
    try {
      await updateAdminBooking(bookingId, { status });
      loadAdminData();
    } catch (err) {
      alert(err.message || "Failed to update booking status.");
    }
  };

  const handleAdminToggleUser = async (userId, currentActive) => {
    try {
      await updateAdminUser(userId, { isActive: !currentActive });
      loadAdminData();
    } catch (err) {
      alert(err.message || "Failed to update user status.");
    }
  };

  const handleAdminChangeUserRole = async (userId, newRole) => {
    try {
      await updateAdminUser(userId, { role: newRole });
      loadAdminData();
    } catch (err) {
      alert(err.message || "Failed to change user role.");
    }
  };

  const handleOpenRefundModal = (payment) => {
    setRefundModal({
      isOpen: true,
      payment,
      amount: String(payment.amountInr || payment.amount || ""),
      reason: "Client requested refund",
      isSubmitting: false,
      successMsg: "",
      errorMsg: "",
    });
  };

  const handleExecuteRefund = async (e) => {
    e.preventDefault();
    setRefundModal((prev) => ({ ...prev, isSubmitting: true, errorMsg: "", successMsg: "" }));
    try {
      const res = await refundAdminPayment({
        paymentId: refundModal.payment._id || refundModal.payment.id,
        bookingId: refundModal.payment.bookingId,
        amount: Number(refundModal.amount),
        cancelBooking: true,
      });
      setRefundModal((prev) => ({
        ...prev,
        isSubmitting: false,
        successMsg: res.message || "Easebuzz refund initiated successfully!",
      }));
      setTimeout(() => {
        setRefundModal((prev) => ({ ...prev, isOpen: false }));
        loadAdminData();
      }, 1500);
    } catch (err) {
      setRefundModal((prev) => ({
        ...prev,
        isSubmitting: false,
        errorMsg: err.message || "Failed to process Easebuzz refund.",
      }));
    }
  };

  const handleOpenLinkModal = (astrologer) => {
    setLinkModal({
      isOpen: true,
      astrologer,
      targetUserId: astrologer.userId || "",
      isSubmitting: false,
      errorMsg: "",
    });
  };

  const handleExecuteLinkAstrologer = async (e) => {
    e.preventDefault();
    setLinkModal((prev) => ({ ...prev, isSubmitting: true, errorMsg: "" }));
    try {
      await updateAdminAstrologer(linkModal.astrologer.id || linkModal.astrologer._id, {
        userId: linkModal.targetUserId.trim() || null,
      });
      setLinkModal((prev) => ({ ...prev, isOpen: false, isSubmitting: false }));
      loadAdminData();
    } catch (err) {
      setLinkModal((prev) => ({
        ...prev,
        isSubmitting: false,
        errorMsg: err.message || "Failed to link expert user.",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#f7faf8] text-[#1c2e28] flex flex-col font-sans">
      <SiteNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* TOP PROFILE / HEADER BAR */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e3ebe6] shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#064233] to-[#125845] flex items-center justify-center text-white text-2xl font-black shadow-md">
              {user?.name ? user.name[0].toUpperCase() : "T"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#ecf7f1] text-[#064233] border border-[#064233]/20">
                  {role} portal
                </span>
                {user?.role === "expert" && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                    <BadgeCheck className="h-3.5 w-3.5 text-amber-600" /> Verified Guru
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#064233] mt-1">
                Namaste, {user?.name || "Seeker"}
              </h1>
              <p className="text-xs sm:text-sm text-[#4d665e] mt-0.5">
                {user?.email || user?.phone || "Connected to Tathaastu Sacred Platform"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (role === "user") loadUserData();
                else if (role === "expert") loadExpertData();
                else if (role === "admin") loadAdminData();
              }}
              className="px-4 py-2.5 text-xs font-bold rounded-xl border border-[#d2ded8] text-[#064233] bg-[#f9fcfa] hover:bg-white transition flex items-center gap-2"
              title="Refresh Records"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Refresh</span>
            </button>

            <button
              onClick={logout}
              className="px-4 py-2.5 text-xs font-bold rounded-xl border border-red-200 text-red-700 bg-red-50/50 hover:bg-red-50 transition flex items-center gap-2"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {actionError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
            <span>{actionError}</span>
            <button
              onClick={() => setActionError("")}
              className="ml-auto text-xs font-bold text-red-600 hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 1: USER / SEEKER PORTAL                                   */}
        {/* ============================================================== */}
        {role === "user" && (
          <div className="space-y-8">
            {/* Quick Stat Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white p-6 rounded-2xl border border-[#e3ebe6] shadow-sm">
                <span className="text-xs font-bold text-[#627a71] uppercase tracking-wider">
                  Total Consultations
                </span>
                <p className="text-3xl font-extrabold text-[#064233] mt-2">
                  {userBookings.length}
                </p>
                <span className="text-xs text-[#064233]/70 mt-1 block">
                  Booked &amp; Entitled
                </span>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[#e3ebe6] shadow-sm">
                <span className="text-xs font-bold text-[#627a71] uppercase tracking-wider">
                  Ready to Join
                </span>
                <p className="text-3xl font-extrabold text-emerald-600 mt-2">
                  {userBookings.filter((b) => b.status === "ready" || b.status === "in_session").length}
                </p>
                <span className="text-xs text-emerald-700/80 mt-1 block">
                  100ms consultation rooms open
                </span>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[#e3ebe6] shadow-sm">
                <span className="text-xs font-bold text-[#627a71] uppercase tracking-wider">
                  Payment Protection
                </span>
                <p className="text-xl font-extrabold text-[#064233] mt-3 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" /> Easebuzz Verified
                </p>
                <span className="text-xs text-[#627a71] mt-1 block">
                  100% sacred guarantee &amp; refunds
                </span>
              </div>
            </div>

            {/* My Consultations List */}
            <div className="bg-white rounded-3xl border border-[#e3ebe6] shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8 border-b border-[#eef3f0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#064233] flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                    <span>My Consultation Bookings</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4d665e] mt-1">
                    Enter scheduled 100ms video or audio rooms directly when marked ready.
                  </p>
                </div>
                <Link
                  to="/pricing"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#064233] to-[#125845] text-white text-xs font-extrabold shadow-sm hover:opacity-95 transition flex items-center gap-2 self-start sm:self-auto"
                >
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>Book New Consultation</span>
                </Link>
              </div>

              {userLoading ? (
                <div className="p-12 text-center text-[#627a71]">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto text-emerald-600 mb-3" />
                  <p className="text-sm font-semibold">Loading your consultation schedule...</p>
                </div>
              ) : userBookings.length === 0 ? (
                <div className="p-12 text-center max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-full bg-[#ecf7f1] text-[#064233] flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 stroke-[1.8]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#064233]">
                    No Consultations Scheduled Yet
                  </h3>
                  <p className="text-xs sm:text-sm text-[#627a71] mt-2 mb-6 leading-relaxed">
                    Choose from our verified Vedic gurus, tarot masters, and Kundli specialists.
                    Your chosen plan grants you immediate, encrypted consultation access.
                  </p>
                  <Link
                    to="/pricing"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#064233] text-white text-xs font-bold hover:bg-[#08523f] transition"
                  >
                    <span>View Plans &amp; Packages</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-[#eef3f0]">
                  {userBookings.map((b) => {
                    const badge = STATUS_BADGES[b.status] || STATUS_BADGES.ready;
                    const canJoin = b.status === "ready" || b.status === "in_session";
                    const isAudio = b.mode === "audio" || b.planSnapshot?.mode === "audio";

                    return (
                      <div
                        key={b.id}
                        className="p-6 sm:p-8 hover:bg-[#fafdfb] transition flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                      >
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span
                              className={`text-[11px] font-extrabold px-3 py-1 rounded-full border flex items-center gap-1.5 ${badge.bg}`}
                            >
                              <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                              <span>{badge.label}</span>
                            </span>

                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                              Ref: {b.id.slice(-6).toUpperCase()}
                            </span>

                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                              {isAudio ? (
                                <>
                                  <Radio className="h-3 w-3" /> Audio Call
                                </>
                              ) : (
                                <>
                                  <Video className="h-3 w-3" /> Video Call
                                </>
                              )}
                            </span>
                          </div>

                          <div>
                            <h3 className="text-lg font-extrabold text-[#064233]">
                              {b.planSnapshot?.name || "Sacred Consultation Session"}
                            </h3>
                            <p className="text-xs text-[#627a71] mt-0.5">
                              Assigned Master:{" "}
                              <strong className="text-[#1c2e28]">
                                {b.astrologer?.name || "Vedic Specialist"}
                              </strong>{" "}
                              • Slot: {b.appointmentSlot || "Immediate"}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-[#4d665e]">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-emerald-600" />
                              <span>
                                {b.durationMinutes || b.planSnapshot?.durationMinutes || 30} mins
                              </span>
                            </span>
                            <span>•</span>
                            <span className="font-bold text-[#064233]">
                              ₹{b.amountInr?.toLocaleString("en-IN")} Paid (Easebuzz)
                            </span>
                            {b.birthDetails?.concern && (
                              <>
                                <span>•</span>
                                <span className="italic text-gray-600">
                                  Concern: {b.birthDetails.concern}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 shrink-0">
                          {canJoin ? (
                            <button
                              type="button"
                              onClick={() => handleJoinUserSession(b)}
                              disabled={joiningBookingId === b.id}
                              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black shadow-md hover:from-emerald-700 hover:to-teal-700 transition flex items-center gap-2"
                            >
                              {isAudio ? (
                                <Radio className="h-4 w-4" />
                              ) : (
                                <Video className="h-4 w-4" />
                              )}
                              <span>
                                {joiningBookingId === b.id
                                  ? "Connecting 100ms..."
                                  : `Join Live ${isAudio ? "Audio" : "Video"} Consultation`}
                              </span>
                            </button>
                          ) : b.status === "pending_payment" ? (
                            <Link
                              to={`/payment?bookingId=${b.id}&package=${encodeURIComponent(b.planSnapshot?.name || "")}&price=${b.amountInr}`}
                              className="px-5 py-2.5 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 transition flex items-center gap-2"
                            >
                              <CreditCard className="h-4 w-4" />
                              <span>Complete Easebuzz Payment</span>
                            </Link>
                          ) : (
                            <span className="text-xs font-semibold text-[#80998f] px-4 py-2 rounded-xl bg-gray-50 border border-gray-200">
                              Session {b.status}
                            </span>
                          )}

                          <a
                            href={`https://wa.me/919319368333?text=${encodeURIComponent(
                              `Namaste, I need assistance with my booking (${b.id}) with ${b.astrologer?.name || "Astrologer"}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl border border-[#d2ded8] text-[#064233] hover:bg-[#ecf7f1] transition"
                            title="WhatsApp Support"
                          >
                            <Phone className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: EXPERT / GURU PORTAL                                   */}
        {/* ============================================================== */}
        {role === "expert" && (
          <div className="space-y-8">
            {/* Expert Profile & Availability Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e3ebe6] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-emerald-100 border-2 border-emerald-500/20 shadow-sm shrink-0">
                  <img
                    src={expertProfile?.astrologer?.imageUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"}
                    alt={expertProfile?.astrologer?.name || "Expert"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#064233]">
                      {expertProfile?.astrologer?.name || user?.name || "Guru"}
                    </h2>
                    <BadgeCheck className="h-5 w-5 text-emerald-600" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#4d665e] mt-0.5">
                    {expertProfile?.astrologer?.expertise?.join?.(", ") || "Vedic & Kundli Specialist"} •{" "}
                    {expertProfile?.astrologer?.expYears || 10}+ Years Experience
                  </p>
                  <p className="text-xs text-[#80998f] mt-1">
                    Rate: ₹{expertProfile?.astrologer?.pricePerMin || 30}/min • Rating: ★{" "}
                    {expertProfile?.astrologer?.rating || "5.0"}
                  </p>
                </div>
              </div>

              {/* Online / Offline Toggle */}
              <div className="flex items-center gap-4 bg-[#f8fbf9] p-4 rounded-2xl border border-[#e3ebe6]">
                <div>
                  <p className="text-xs font-bold text-[#064233]">Consultation Availability</p>
                  <p className="text-[11px] text-[#627a71]">
                    {expertProfile?.astrologer?.online
                      ? "Online — Clients can request & join"
                      : "Offline — Paused from incoming calls"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleToggleOnline}
                  disabled={isOnlineToggling || !expertProfile?.astrologer}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 ${
                    expertProfile?.astrologer?.online
                      ? "bg-emerald-600 text-white shadow-md hover:bg-emerald-700"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      expertProfile?.astrologer?.online ? "bg-white animate-pulse" : "bg-gray-500"
                    }`}
                  />
                  <span>{expertProfile?.astrologer?.online ? "Online" : "Go Online"}</span>
                </button>
              </div>
            </div>

            {/* Incoming Consultations */}
            <div className="bg-white rounded-3xl border border-[#e3ebe6] shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8 border-b border-[#eef3f0] flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-[#064233] flex items-center gap-2">
                    <Activity className="h-5 w-5 text-emerald-600" />
                    <span>Client Consultations Queue</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4d665e] mt-1">
                    Join ongoing or upcoming sessions as the host Guru with full 100ms permissions.
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#ecf7f1] text-[#064233]">
                  {expertBookings.length} assigned
                </span>
              </div>

              {expertLoading ? (
                <div className="p-12 text-center text-[#627a71]">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto text-emerald-600 mb-3" />
                  <p className="text-sm font-semibold">Loading assigned consultations...</p>
                </div>
              ) : expertBookings.length === 0 ? (
                <div className="p-12 text-center text-[#627a71]">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto mb-2 opacity-60" />
                  <p className="text-sm font-bold text-[#064233]">All Clear</p>
                  <p className="text-xs text-[#627a71] mt-1">
                    No active consultations awaiting your host entry right now.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[#eef3f0]">
                  {expertBookings.map((b) => {
                    const badge = STATUS_BADGES[b.status] || STATUS_BADGES.ready;
                    const canJoin = b.status === "ready" || b.status === "in_session";
                    const isAudio = b.mode === "audio" || b.planSnapshot?.mode === "audio";

                    return (
                      <div
                        key={b.id}
                        className="p-6 sm:p-8 hover:bg-[#fafdfb] transition flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                      >
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`text-[11px] font-extrabold px-3 py-1 rounded-full border flex items-center gap-1.5 ${badge.bg}`}
                            >
                              <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                              <span>{badge.label}</span>
                            </span>
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                              {isAudio ? "Audio Consultation" : "Video Consultation"}
                            </span>
                          </div>

                          <h4 className="text-lg font-bold text-[#064233]">
                            Client: {b.customerName || "Devotee"}{" "}
                            {b.customerPhone && (
                              <span className="text-xs font-normal text-gray-500">
                                (+91 {b.customerPhone})
                              </span>
                            )}
                          </h4>

                          <p className="text-xs text-[#4d665e]">
                            <strong>Package:</strong> {b.planSnapshot?.name || "Vedic Plan"} •{" "}
                            <strong>Slot:</strong> {b.appointmentSlot || "Immediate"} •{" "}
                            <strong>Duration:</strong> {b.durationMinutes || 30} mins
                          </p>

                          {b.birthDetails && (
                            <div className="text-xs bg-[#f7faf8] p-3 rounded-xl border border-[#e3ebe6] max-w-xl text-[#365046]">
                              <p>
                                <strong>Concern:</strong> {b.birthDetails.concern || "Life Guidance"}
                              </p>
                              {b.birthDetails.dob && (
                                <p className="mt-0.5 text-gray-600">
                                  DOB: {b.birthDetails.dob} | TOB: {b.birthDetails.tob || "—"} | POB:{" "}
                                  {b.birthDetails.pob || "—"}
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          {canJoin && (
                            <button
                              type="button"
                              onClick={() => handleJoinExpertSession(b)}
                              disabled={joiningBookingId === b.id}
                              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#064233] to-[#125845] text-white text-xs font-black shadow-md hover:from-[#08523f] hover:to-[#176a54] transition flex items-center gap-2"
                            >
                              {isAudio ? (
                                <Radio className="h-4 w-4" />
                              ) : (
                                <Video className="h-4 w-4" />
                              )}
                              <span>
                                {joiningBookingId === b.id
                                  ? "Entering Room..."
                                  : "Join as Host Guru"}
                              </span>
                            </button>
                          )}

                          {b.status === "in_session" && (
                            <button
                              type="button"
                              onClick={() => handleEndExpertSession(b.id)}
                              className="px-4 py-2.5 rounded-xl border border-red-300 text-red-700 bg-red-50 text-xs font-bold hover:bg-red-100 transition"
                            >
                              End Session
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 3: ADMIN COMMAND CENTER                                   */}
        {/* ============================================================== */}
        {role === "admin" && (
          <div className="space-y-8">
            {/* Dashboard Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#e3ebe6] shadow-sm">
                <span className="text-[11px] font-bold text-[#627a71] uppercase tracking-wider">
                  Total Users
                </span>
                <p className="text-2xl font-black text-[#064233] mt-1">
                  {adminStats?.counts?.users ?? "—"}
                </p>
                <span className="text-[11px] text-[#80998f]">Registered Accounts</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#e3ebe6] shadow-sm">
                <span className="text-[11px] font-bold text-[#627a71] uppercase tracking-wider">
                  Astrologers
                </span>
                <p className="text-2xl font-black text-[#064233] mt-1">
                  {adminStats?.counts?.astrologers ?? "—"}
                </p>
                <span className="text-[11px] text-emerald-700 font-bold">
                  {adminStats?.counts?.astrologersOnline ?? 0} Online Now
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#e3ebe6] shadow-sm">
                <span className="text-[11px] font-bold text-[#627a71] uppercase tracking-wider">
                  Active Plans
                </span>
                <p className="text-2xl font-black text-[#064233] mt-1">
                  {adminStats?.counts?.plans ?? "—"}
                </p>
                <span className="text-[11px] text-[#80998f]">Audio &amp; Video Tiers</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#e3ebe6] shadow-sm">
                <span className="text-[11px] font-bold text-[#627a71] uppercase tracking-wider">
                  Bookings
                </span>
                <p className="text-2xl font-black text-[#064233] mt-1">
                  {adminStats?.counts?.bookings ?? "—"}
                </p>
                <span className="text-[11px] text-emerald-700 font-bold">
                  {adminStats?.counts?.bookingsPaid ?? 0} Paid &amp; Ready
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#e3ebe6] shadow-sm col-span-2 lg:col-span-1">
                <span className="text-[11px] font-bold text-[#627a71] uppercase tracking-wider">
                  Revenue (INR)
                </span>
                <p className="text-2xl font-black text-emerald-600 mt-1">
                  ₹{Number(adminStats?.revenueInr || 0).toLocaleString("en-IN")}
                </p>
                <span className="text-[11px] text-[#80998f]">Easebuzz Processed</span>
              </div>
            </div>

            {/* Admin Tabs */}
            <div className="bg-white rounded-3xl border border-[#e3ebe6] shadow-sm overflow-hidden">
              <div className="border-b border-[#eef3f0] px-6 pt-4 flex flex-wrap gap-2">
                {[
                  { id: "bookings", label: "Consultation Bookings", icon: Calendar },
                  { id: "payments", label: "Easebuzz Payments & Refunds", icon: CreditCard },
                  { id: "users", label: "User Management", icon: Users },
                  { id: "astrologers", label: "Astrologers & Expert Links", icon: BadgeCheck },
                ].map((t) => {
                  const Icon = t.icon;
                  const isActive = adminTab === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setAdminTab(t.id)}
                      className={`px-5 py-3 text-xs font-black rounded-t-xl transition flex items-center gap-2 border-b-2 ${
                        isActive
                          ? "border-[#064233] text-[#064233] bg-[#f7faf8]"
                          : "border-transparent text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab 1: Bookings */}
              {adminTab === "bookings" && (
                <div className="p-6">
                  {adminLoading ? (
                    <div className="py-12 text-center text-gray-500">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-[#064233]" />
                      Loading bookings...
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#f8fbf9] text-[#4d665e] uppercase tracking-wider border-b border-[#eef3f0]">
                          <tr>
                            <th className="py-3 px-4">Ref / Client</th>
                            <th className="py-3 px-4">Astrologer</th>
                            <th className="py-3 px-4">Plan &amp; Mode</th>
                            <th className="py-3 px-4">Amount</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#eef3f0]">
                          {adminBookings.map((b) => (
                            <tr key={b.id} className="hover:bg-gray-50/50">
                              <td className="py-3 px-4">
                                <span className="font-bold text-[#064233]">
                                  #{b.id.slice(-6).toUpperCase()}
                                </span>
                                <div className="text-gray-500">
                                  {b.customerName || "Devotee"} ({b.customerPhone || "—"})
                                </div>
                              </td>
                              <td className="py-3 px-4 font-semibold">
                                {b.astrologer?.name || "Vedic Expert"}
                              </td>
                              <td className="py-3 px-4">
                                <div>{b.planSnapshot?.name || "Plan"}</div>
                                <span className="text-[10px] text-gray-500 uppercase font-bold">
                                  {b.mode || "video"}
                                </span>
                              </td>
                              <td className="py-3 px-4 font-bold text-emerald-700">
                                ₹{b.amountInr}
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                    STATUS_BADGES[b.status]?.bg || "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {b.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right space-x-2">
                                {b.status === "pending_payment" && (
                                  <button
                                    onClick={() => handleAdminMarkPaid(b.id)}
                                    className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                  >
                                    Mark Paid
                                  </button>
                                )}
                                {b.status !== "completed" && (
                                  <button
                                    onClick={() =>
                                      handleAdminUpdateBookingStatus(b.id, "completed")
                                    }
                                    className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200"
                                  >
                                    Complete
                                  </button>
                                )}
                                {b.status !== "cancelled" && (
                                  <button
                                    onClick={() =>
                                      handleAdminUpdateBookingStatus(b.id, "cancelled")
                                    }
                                    className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-red-100 text-red-800 hover:bg-red-200"
                                  >
                                    Cancel
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Easebuzz Payments & Refunds */}
              {adminTab === "payments" && (
                <div className="p-6">
                  {adminLoading ? (
                    <div className="py-12 text-center text-gray-500">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-[#064233]" />
                      Loading payment transactions...
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#f8fbf9] text-[#4d665e] uppercase tracking-wider border-b border-[#eef3f0]">
                          <tr>
                            <th className="py-3 px-4">Txn ID</th>
                            <th className="py-3 px-4">Gateway</th>
                            <th className="py-3 px-4">Customer</th>
                            <th className="py-3 px-4">Amount</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Refund Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#eef3f0]">
                          {adminPayments.map((p) => (
                            <tr key={p._id || p.id} className="hover:bg-gray-50/50">
                              <td className="py-3 px-4 font-mono font-bold text-gray-800">
                                {p.txnId || p._id}
                              </td>
                              <td className="py-3 px-4">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-blue-800 border border-blue-200">
                                  {p.gateway || "easebuzz"}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="font-semibold text-gray-900">
                                  {p.customerName || "Customer"}
                                </div>
                                <div className="text-gray-500">{p.customerEmail || p.customerPhone}</div>
                              </td>
                              <td className="py-3 px-4 font-bold text-emerald-700">
                                ₹{p.amountInr || p.amount}
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                    p.status === "success"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : p.status === "refunded"
                                      ? "bg-purple-100 text-purple-800"
                                      : p.status === "partial_refunded"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {p.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                {p.status === "success" && (
                                  <button
                                    onClick={() => handleOpenRefundModal(p)}
                                    className="px-3 py-1 text-[11px] font-bold rounded-lg bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                                  >
                                    Easebuzz Refund
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: User Management */}
              {adminTab === "users" && (
                <div className="p-6">
                  {adminLoading ? (
                    <div className="py-12 text-center text-gray-500">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-[#064233]" />
                      Loading users...
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#f8fbf9] text-[#4d665e] uppercase tracking-wider border-b border-[#eef3f0]">
                          <tr>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Email / Phone</th>
                            <th className="py-3 px-4">Role</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Manage</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#eef3f0]">
                          {adminUsers.map((u) => (
                            <tr key={u.id} className="hover:bg-gray-50/50">
                              <td className="py-3 px-4 font-bold text-gray-900">{u.name}</td>
                              <td className="py-3 px-4 text-gray-600">
                                {u.email || u.phone || "—"}
                              </td>
                              <td className="py-3 px-4">
                                <select
                                  value={u.role}
                                  onChange={(e) =>
                                    handleAdminChangeUserRole(u.id, e.target.value)
                                  }
                                  className="text-[11px] font-bold rounded-lg border border-gray-300 px-2 py-1 bg-white text-gray-800"
                                >
                                  <option value="user">User</option>
                                  <option value="expert">Expert</option>
                                  <option value="admin">Admin</option>
                                </select>
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                    u.isActive
                                      ? "bg-emerald-100 text-emerald-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {u.isActive ? "Active" : "Disabled"}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <button
                                  onClick={() => handleAdminToggleUser(u.id, u.isActive)}
                                  className={`px-3 py-1 rounded-lg text-[11px] font-bold ${
                                    u.isActive
                                      ? "bg-red-50 text-red-700 hover:bg-red-100"
                                      : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                  }`}
                                >
                                  {u.isActive ? "Deactivate" : "Activate"}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 4: Astrologers & Expert Linking */}
              {adminTab === "astrologers" && (
                <div className="p-6">
                  {adminLoading ? (
                    <div className="py-12 text-center text-gray-500">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-[#064233]" />
                      Loading astrologers catalog...
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {adminAstrologers.map((a) => (
                        <div
                          key={a.id || a._id}
                          className="p-5 rounded-2xl border border-[#e3ebe6] bg-white shadow-sm flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center gap-3">
                              <img
                                src={a.imageUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"}
                                alt={a.name}
                                className="w-12 h-12 rounded-xl object-cover bg-gray-100 border"
                              />
                              <div>
                                <h4 className="font-extrabold text-[#064233]">{a.name}</h4>
                                <span className="text-[11px] text-gray-500">
                                  {a.expYears || 10} yrs exp • ₹{a.pricePerMin || 30}/min
                                </span>
                              </div>
                            </div>
                            <div className="mt-3 text-xs text-gray-600">
                              <span className="font-bold">Linked User ID:</span>{" "}
                              {a.userId ? (
                                <code className="bg-emerald-50 text-emerald-800 px-1 py-0.5 rounded text-[11px]">
                                  {a.userId}
                                </code>
                              ) : (
                                <span className="text-orange-600 font-semibold">Unlinked</span>
                              )}
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                a.online
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {a.online ? "Online" : "Offline"}
                            </span>
                            <button
                              onClick={() => handleOpenLinkModal(a)}
                              className="px-3 py-1 rounded-lg text-xs font-bold bg-[#064233] text-white hover:bg-[#08523f] transition"
                            >
                              Link Expert User
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* ================= REFUND MODAL (EASEBUZZ v2) ================= */}
      {refundModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-lg font-black text-[#064233] flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-red-600" />
                <span>Easebuzz Refund API v2</span>
              </h3>
              <button
                onClick={() => setRefundModal((prev) => ({ ...prev, isOpen: false }))}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteRefund} className="mt-4 space-y-4">
              <p className="text-xs text-gray-600 leading-relaxed">
                Execute an automated merchant refund through Easebuzz gateway. Full refund will
                automatically cancel the associated consultation booking.
              </p>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Refund Amount (INR)
                </label>
                <input
                  type="number"
                  required
                  value={refundModal.amount}
                  onChange={(e) =>
                    setRefundModal((prev) => ({ ...prev, amount: e.target.value }))
                  }
                  className="w-full text-sm font-bold border border-gray-300 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Reason for Refund
                </label>
                <input
                  type="text"
                  value={refundModal.reason}
                  onChange={(e) =>
                    setRefundModal((prev) => ({ ...prev, reason: e.target.value }))
                  }
                  placeholder="e.g. Astrologer unreachable, slot rescheduled"
                  className="w-full text-xs border border-gray-300 rounded-xl px-3 py-2"
                />
              </div>

              {refundModal.errorMsg && (
                <p className="text-xs text-red-600 font-bold bg-red-50 p-2.5 rounded-lg">
                  {refundModal.errorMsg}
                </p>
              )}
              {refundModal.successMsg && (
                <p className="text-xs text-emerald-700 font-bold bg-emerald-50 p-2.5 rounded-lg">
                  {refundModal.successMsg}
                </p>
              )}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setRefundModal((prev) => ({ ...prev, isOpen: false }))}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={refundModal.isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition"
                >
                  {refundModal.isSubmitting ? "Processing..." : "Confirm Easebuzz Refund"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= LINK ASTROLOGER MODAL ================= */}
      {linkModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-lg font-black text-[#064233]">
                Link Expert Account: {linkModal.astrologer?.name}
              </h3>
              <button
                onClick={() => setLinkModal((prev) => ({ ...prev, isOpen: false }))}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteLinkAstrologer} className="mt-4 space-y-4">
              <p className="text-xs text-gray-600">
                Enter the MongoDB User ID (role: expert) to link with this public Astrologer card.
                Once linked, the expert will see incoming consultation requests on their dashboard.
              </p>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Auth User ID (ObjectId)
                </label>
                <input
                  type="text"
                  value={linkModal.targetUserId}
                  onChange={(e) =>
                    setLinkModal((prev) => ({ ...prev, targetUserId: e.target.value }))
                  }
                  placeholder="e.g. 6acca80ed561352c825c2229"
                  className="w-full text-xs font-mono border border-gray-300 rounded-xl px-3 py-2"
                />
              </div>

              {linkModal.errorMsg && (
                <p className="text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg">
                  {linkModal.errorMsg}
                </p>
              )}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setLinkModal((prev) => ({ ...prev, isOpen: false }))}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={linkModal.isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-[#064233] text-white text-xs font-bold hover:bg-[#08523f] transition"
                >
                  {linkModal.isSubmitting ? "Linking..." : "Save Link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= 100ms IN-APP AUDIO/VIDEO CONSULTATION MODAL ================= */}
      <HmsConsultationModal
        isOpen={isHmsModalOpen}
        isExpert={role === "expert"}
        onClose={() => {
          setIsHmsModalOpen(false);
          setActiveHmsSession(null);
          if (role === "user") loadUserData();
          else if (role === "expert") loadExpertData();
        }}
        session={activeHmsSession}
        astrologer={{
          name:
            activeHmsSession?.booking?.astrologer?.name ||
            activeHmsSession?.booking?.astrologerSnapshot?.name ||
            "Vedic Specialist",
          title: "Vedic & Kundli Specialist",
          imageUrl:
            activeHmsSession?.booking?.astrologer?.imageUrl ||
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
          rating: 5.0,
          experience: "12+ yrs",
        }}
        clientDetails={{
          name:
            activeHmsSession?.booking?.customerName ||
            user?.name ||
            "Devotee",
          dob: activeHmsSession?.booking?.birthDetails?.dob || "—",
          tob: activeHmsSession?.booking?.birthDetails?.tob || "—",
          pob: activeHmsSession?.booking?.birthDetails?.pob || "—",
          concern:
            activeHmsSession?.booking?.birthDetails?.concern ||
            "Life & Spiritual Guidance",
        }}
      />
    </div>
  );
}

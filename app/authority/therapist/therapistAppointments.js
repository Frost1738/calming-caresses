"use client";
import { useContext, useEffect, useState } from "react";
import { updateAppointmentStatus } from "@/app/ApiServices/serverActions";
import toast, { Toaster } from "react-hot-toast";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  User,
  Mail,
  MapPin,
  Check,
  Edit2,
  XCircle as XIcon,
  AlertCircle,
  Menu,
  ChevronDown,
  ChevronUp,
  UserX,
  CalendarDays,
} from "lucide-react";

import { TherapistContext } from "./therapistContext";
import { useSearchParams } from "next/navigation";
import emailjs from "@emailjs/browser";

// EmailJS config
const EMAILJS_CONFIG = {
  serviceId: "service_slgp4rv",
  templateId: "template_oo66pul",
  publicKey: "SOcrJWBm3fDIpEFEp",
};

// Helper functions
const getDisplayStatus = (status, completed) => {
  const normalizedStatus = status?.toLowerCase().replace(/\s+/g, "_");

  if (normalizedStatus === "cancelled") return "cancelled";
  if (normalizedStatus === "no_show") return "no_show";
  if (normalizedStatus === "completed") return "completed";

  if (completed) return "completed";
  return "scheduled";
};

const getStatusColor = (status, completed) => {
  const displayStatus = getDisplayStatus(status, completed);
  switch (displayStatus) {
    case "scheduled":
      return "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30";
    case "completed":
      return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
    case "cancelled":
      return "bg-rose-500/20 text-rose-300 border border-rose-500/30";
    case "no_show":
      return "bg-amber-500/20 text-amber-300 border border-amber-500/30";
    default:
      return "bg-slate-500/20 text-slate-300 border border-slate-500/30";
  }
};

const getStatusIcon = (status, completed) => {
  const displayStatus = getDisplayStatus(status, completed);
  switch (displayStatus) {
    case "scheduled":
      return <Clock className="w-3 h-3 mr-1" />;
    case "completed":
      return <CheckCircle className="w-3 h-3 mr-1" />;
    case "cancelled":
      return <XIcon className="w-3 h-3 mr-1" />;
    case "no_show":
      return <UserX className="w-3 h-3 mr-1" />;
    default:
      return null;
  }
};

const getStatusText = (status, completed) => {
  const displayStatus = getDisplayStatus(status, completed);
  switch (displayStatus) {
    case "scheduled":
      return "Scheduled";
    case "completed":
      return "Completed";
    case "cancelled":
      return "Cancelled";
    case "no_show":
      return "No Show";
    default:
      return "Pending";
  }
};

// Check if appointment is TODAY
const isTodayAppointment = (appointmentDate) => {
  const today = new Date();
  const appointmentDateObj = new Date(appointmentDate);
  return today.toDateString() === appointmentDateObj.toDateString();
};

// Check if appointment is in the past (date only)
const isPastDate = (appointmentDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const appointmentDateObj = new Date(appointmentDate);
  appointmentDateObj.setHours(0, 0, 0, 0);
  return appointmentDateObj < today;
};

const timeSlots = [
  "09:00:00",
  "10:00:00",
  "11:00:00",
  "12:00:00",
  "13:00:00",
  "14:00:00",
  "15:00:00",
  "16:00:00",
  "17:00:00",
  "18:00:00",
];

export default function TherapistAppointments({ personalizedBookings }) {
  // State management
  const [bookings, setBookings] = useState(personalizedBookings || []);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [editTime, setEditTime] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Start as true
  const [originalAppointmentState, setOriginalAppointmentState] =
    useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedAppointment, setExpandedAppointment] = useState(null);
  const [showPastAppointments, setShowPastAppointments] = useState(true);
  const [hasFetched, setHasFetched] = useState(false); // Track if we've fetched

  // Context and URL params
  const searchParams = useSearchParams();
  const { therapistName, setTherapistName } = useContext(TherapistContext);
  const nameFromUrl = searchParams.get("name");

  // EmailJS initialization
  useEffect(() => {
    emailjs.init({
      publicKey: EMAILJS_CONFIG.publicKey,
    });
  }, []);

  // ========== FIXED: Single useEffect for therapist name and data fetching ==========
  useEffect(() => {
    let isMounted = true;
    let fetchedTherapistName = null;

    const initializeAndFetch = async () => {
      try {
        // Step 1: Determine therapist name
        if (nameFromUrl) {
          // URL param has highest priority
          fetchedTherapistName = nameFromUrl;
          if (isMounted) {
            setTherapistName(nameFromUrl);
            localStorage.setItem("therapistName", nameFromUrl);
          }
        } else {
          // Check localStorage
          const storedName = localStorage.getItem("therapistName");
          if (storedName && !therapistName) {
            fetchedTherapistName = storedName;
            if (isMounted) {
              setTherapistName(storedName);
            }
          } else if (therapistName) {
            // Use existing context value
            fetchedTherapistName = therapistName;
          }
        }

        // Step 2: Fetch data if we have a therapist name
        if (fetchedTherapistName && !hasFetched) {
          console.log(
            "📋 Fetching bookings for therapist:",
            fetchedTherapistName,
          );

          const SUPABASE_URL = "https://edgmylxnlegbdhhbpcvm.supabase.co";
          const SUPABASE_KEY =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkZ215bHhubGVnYmRoaGJwY3ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3NTg3MjEsImV4cCI6MjA4MDMzNDcyMX0.iO18CFStftQ-RJ3-AFnJ5BjKWu1bwd3QdOw-0VhcG_U";

          let url = `${SUPABASE_URL}/rest/v1/bookings?select=*`;
          url += `&therapistName=eq.${encodeURIComponent(fetchedTherapistName)}`;
          url += "&order=date.asc,time.asc";

          const response = await fetch(url, {
            headers: {
              apikey: SUPABASE_KEY,
              "Content-Type": "application/json",
            },
            cache: "no-store",
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const data = await response.json();

          if (isMounted) {
            setBookings(data);
            setHasFetched(true);

            // Transform bookings to appointments immediately
            const updatedAppointments = data.map((apt) => ({
              ...apt,
              completed: apt.completed === true,
              status: apt.status || "scheduled",
              price: apt.price || "$100",
              duration: apt.duration || "60 min",
            }));
            setAppointments(updatedAppointments);
          }
        } else if (!fetchedTherapistName && isMounted) {
          // No therapist name yet, check if we have personalizedBookings
          if (personalizedBookings && personalizedBookings.length > 0) {
            const updatedAppointments = personalizedBookings.map((apt) => ({
              ...apt,
              completed: apt.completed === true,
              status: apt.status || "scheduled",
              price: apt.price || "$100",
              duration: apt.duration || "60 min",
            }));
            setAppointments(updatedAppointments);
          }
        }
      } catch (error) {
        console.error("❌ Error initializing or fetching:", error);
        if (isMounted) {
          if (personalizedBookings && personalizedBookings.length > 0) {
            const updatedAppointments = personalizedBookings.map((apt) => ({
              ...apt,
              completed: apt.completed === true,
              status: apt.status || "scheduled",
              price: apt.price || "$100",
              duration: apt.duration || "60 min",
            }));
            setAppointments(updatedAppointments);
          }
          toast.error("Could not load appointments. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAndFetch();

    return () => {
      isMounted = false;
    };
  }, [nameFromUrl, setTherapistName, therapistName, personalizedBookings]); // Only run when these change

  // Send cancellation email
  const sendCancellationEmail = async (appointment) => {
    try {
      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          type: appointment.massageName,
          time: `${appointment.time
            .split(":")
            .slice(0, 2)
            .join(":")} on ${new Date(appointment.date).toLocaleDateString()}`,
          therapist: therapistName || "Therapist",
          action: "cancelled",
          name: appointment.clientName,
          email: appointment.clientEmail,
        },
      );
      return { success: true };
    } catch (error) {
      console.error("Failed to send cancellation email:", error);
      return { success: false, error };
    }
  };

  // Get all appointments
  const allAppointments = appointments;

  // Get today's appointments
  const todaysAppointments = allAppointments.filter((apt) =>
    isTodayAppointment(apt.date),
  );

  // Stats calculations
  const scheduledCount = allAppointments.filter(
    (a) => getDisplayStatus(a.status, a.completed) === "scheduled",
  ).length;
  const completedCount = allAppointments.filter(
    (a) => getDisplayStatus(a.status, a.completed) === "completed",
  ).length;
  const cancelledCount = allAppointments.filter(
    (a) => getDisplayStatus(a.status, a.completed) === "cancelled",
  ).length;
  const noShowCount = allAppointments.filter(
    (a) => getDisplayStatus(a.status, a.completed) === "no_show",
  ).length;
  const todaysCount = todaysAppointments.length;

  // Filter appointments for main table
  const filteredAppointments = allAppointments.filter((appointment) => {
    const displayStatus = getDisplayStatus(
      appointment.status,
      appointment.completed,
    );
    const matchesSearch =
      appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.massageName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || displayStatus === statusFilter;
    const matchesDate = dateFilter === "all" || appointment.date === dateFilter;
    const isPast = isPastDate(appointment.date);
    const showThisAppointment = showPastAppointments || !isPast;

    return matchesSearch && matchesStatus && matchesDate && showThisAppointment;
  });

  const uniqueDates = [...new Set(allAppointments.map((apt) => apt.date))];

  // Appointment actions
  const handleEditTime = (appointment) => {
    setSelectedAppointment(appointment);
    setEditTime(appointment.time);
    setModalAction("edit");
    setIsModalOpen(true);
  };

  const handleCancel = (appointment) => {
    setSelectedAppointment(appointment);
    setModalAction("cancel");
    setIsModalOpen(true);
  };

  const handleMarkComplete = (appointment) => {
    setSelectedAppointment(appointment);
    setModalAction("complete");
    setIsModalOpen(true);
  };

  const handleMarkNoShow = (appointment) => {
    setSelectedAppointment(appointment);
    setModalAction("no_show");
    setIsModalOpen(true);
  };

  const toggleAppointmentDetails = (appointmentId) => {
    setExpandedAppointment(
      expandedAppointment === appointmentId ? null : appointmentId,
    );
  };

  const optimisticUpdate = (appointmentId, updates) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, ...updates } : apt,
      ),
    );
  };

  // Confirm action
  const confirmAction = async () => {
    if (!selectedAppointment) return;

    setIsLoading(true);
    setOriginalAppointmentState(selectedAppointment);

    let toastId;
    let updates = {};
    let successMessage = "";
    let errorMessage = "";

    try {
      switch (modalAction) {
        case "cancel":
          updates = { status: "cancelled", completed: false };
          toastId = toast.loading("Cancelling appointment...");
          successMessage = "Appointment cancelled successfully!";
          errorMessage = "Failed to cancel appointment";

          const emailResult = await sendCancellationEmail(selectedAppointment);
          if (!emailResult.success) {
            console.warn("Email notification failed");
          }
          break;

        case "complete":
          updates = { status: "completed", completed: true };
          toastId = toast.loading("Marking as complete...");
          successMessage = "Appointment marked as complete!";
          errorMessage = "Failed to mark as complete";
          break;

        case "no_show":
          updates = { status: "no_show", completed: false };
          toastId = toast.loading("Marking as no show...");
          successMessage = "Appointment marked as no show!";
          errorMessage = "Failed to mark as no show";
          break;

        case "edit":
          if (!editTime) {
            toast.error("Please select a new time");
            setIsLoading(false);
            return;
          }
          updates = { time: editTime };
          toastId = toast.loading("Updating appointment time...");
          successMessage = "Appointment time updated successfully!";
          errorMessage = "Failed to update appointment time";
          break;
      }

      optimisticUpdate(selectedAppointment.id, updates);
      const result = await updateAppointmentStatus(
        selectedAppointment.id,
        updates,
      );

      if (result.success) {
        if (result.data) {
          optimisticUpdate(selectedAppointment.id, result.data);
        }

        toast.success(successMessage, {
          id: toastId,
          duration: 3000,
          style: {
            background: modalAction === "no_show" ? "#7c2d12" : "#064e3b",
            color: "#f0fdfa",
          },
        });

        setIsModalOpen(false);
        setSelectedAppointment(null);
        setEditTime("");
        setExpandedAppointment(null);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Action failed:", error);

      if (originalAppointmentState) {
        optimisticUpdate(selectedAppointment.id, originalAppointmentState);
      }

      toast.error(error.message || errorMessage, {
        id: toastId,
        duration: 4000,
        style: {
          background: "#7f1d1d",
          color: "#fef2f2",
        },
      });
    } finally {
      setIsLoading(false);
      setOriginalAppointmentState(null);
    }
  };

  // Render appointment status indicator
  const renderStatusIndicator = (appointment) => {
    const displayStatus = getDisplayStatus(
      appointment.status,
      appointment.completed,
    );

    return (
      <div
        className={`text-sm font-medium px-3 py-1.5 rounded-lg border backdrop-blur-sm text-center ${getStatusColor(appointment.status, appointment.completed)}`}
      >
        {displayStatus === "completed" && (
          <CheckCircle className="w-3 h-3 inline mr-2" />
        )}
        {displayStatus === "cancelled" && (
          <XIcon className="w-3 h-3 inline mr-2" />
        )}
        {displayStatus === "no_show" && (
          <UserX className="w-3 h-3 inline mr-2" />
        )}
        {getStatusText(appointment.status, appointment.completed)}
      </div>
    );
  };

  // Render action buttons - ONLY for scheduled appointments
  const renderActionButtons = (appointment) => {
    const displayStatus = getDisplayStatus(
      appointment.status,
      appointment.completed,
    );
    const isPast = isPastDate(appointment.date);

    // ONLY show action buttons for SCHEDULED appointments
    if (displayStatus === "scheduled") {
      if (isPast) {
        // Past scheduled appointments - suggest marking as no_show
        return (
          <div className="flex flex-col gap-2">
            <div className="text-sm text-amber-300 font-medium px-3 py-1.5 bg-amber-500/10 rounded-lg border border-amber-500/20 backdrop-blur-sm text-center">
              <UserX className="w-3 h-3 inline mr-2" />
              Past Date - Mark as No Show
            </div>
            <button
              onClick={() => handleMarkNoShow(appointment)}
              className="w-full px-3 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1 hover:from-amber-700 hover:to-amber-800 transition-all duration-300"
              disabled={isLoading}
            >
              <UserX className="w-4 h-4" />
              Mark as No Show
            </button>
          </div>
        );
      }

      // Future or today's scheduled appointments - show all actions
      return (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleMarkComplete(appointment)}
            className="flex-1 min-w-[100px] px-3 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1"
            disabled={isLoading}
          >
            <Check className="w-3 h-3" />
            Complete
          </button>
          <button
            onClick={() => handleMarkNoShow(appointment)}
            className="flex-1 min-w-[100px] px-3 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1"
            disabled={isLoading}
          >
            <UserX className="w-3 h-3" />
            No Show
          </button>
          <button
            onClick={() => handleEditTime(appointment)}
            className="p-2 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-lg"
            disabled={isLoading}
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleCancel(appointment)}
            className="p-2 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-lg"
            disabled={isLoading}
          >
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      );
    }

    // For completed, cancelled, and no_show statuses - just show the status
    return renderStatusIndicator(appointment);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 to-indigo-950 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-emerald-100/80">Loading appointments...</p>
          {therapistName && (
            <p className="text-emerald-100/60 text-sm mt-2">
              Fetching appointments for {therapistName}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Rest of your component remains exactly the same...
  // (Keep all the JSX return statement exactly as you had it)
  // I'm omitting the rest for brevity, but use your original JSX

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1e293b",
            color: "#f8fafc",
            border: "1px solid #475569",
            borderRadius: "0.75rem",
            padding: "16px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#1e293b",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#1e293b",
            },
          },
          loading: {
            iconTheme: {
              primary: "#0ea5e9",
              secondary: "#1e293b",
            },
          },
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-emerald-950 to-indigo-950 p-3 md:p-6">
        {/* Mobile Header */}
        <div className="md:hidden mb-4">
          <div className="flex items-center justify-between bg-gradient-to-r from-emerald-900/40 to-indigo-900/40 backdrop-blur-sm rounded-2xl p-4 border border-emerald-800/30">
            <div>
              <h1 className="text-xl font-semibold text-white">Appointments</h1>
              <p className="text-xs text-emerald-100/80 mt-1">
                Manage your schedule
              </p>
              <p className="text-xs text-emerald-200/60 mt-1">
                Therapist: {therapistName}
              </p>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="mt-3 bg-gradient-to-r from-slate-900/50 to-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30">
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search appointments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-900/60 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700 rounded-lg text-white text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="no_show">No Show</option>
                  </select>

                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700 rounded-lg text-white text-sm"
                  >
                    <option value="all">All Dates</option>
                    {uniqueDates.map((date) => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Past Appointments Toggle - Mobile */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">
                    Show Past Appointments
                  </span>
                  <button
                    onClick={() =>
                      setShowPastAppointments(!showPastAppointments)
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      showPastAppointments ? "bg-emerald-600" : "bg-slate-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        showPastAppointments ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative z-10">
          {/* Desktop Header */}
          <div className="hidden md:block mb-8">
            <div className="bg-gradient-to-r from-emerald-900/40 to-indigo-900/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-emerald-800/30 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">
                    Appointment Dashboard
                  </h1>
                  <p className="text-emerald-100/80">
                    Therapist: {therapistName}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="text-white font-medium">
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="text-emerald-200/80 text-sm mt-1">
                      Total: {allAppointments.length} appointments
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards - ONLY 5: Today, Scheduled, Completed, Cancelled, No Show */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8">
            {/* Today */}
            <div className="bg-gradient-to-br from-cyan-900/60 to-blue-900/60 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-cyan-700/30">
              <div className="flex items-center">
                <div className="p-2 md:p-3 bg-cyan-500/20 backdrop-blur-sm rounded-lg mr-3 md:mr-4">
                  <CalendarDays className="w-4 h-4 md:w-6 md:h-6 text-cyan-300" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-cyan-100/80 font-medium">
                    Today
                  </p>
                  <p className="text-xl md:text-2xl font-semibold text-white">
                    {todaysCount}
                  </p>
                </div>
              </div>
            </div>

            {/* Scheduled */}
            <div className="bg-gradient-to-br from-cyan-900/60 to-blue-900/60 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-cyan-700/30">
              <div className="flex items-center">
                <div className="p-2 md:p-3 bg-cyan-500/20 backdrop-blur-sm rounded-lg mr-3 md:mr-4">
                  <Clock className="w-4 h-4 md:w-6 md:h-6 text-cyan-300" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-cyan-100/80 font-medium">
                    Scheduled
                  </p>
                  <p className="text-xl md:text-2xl font-semibold text-white">
                    {scheduledCount}
                  </p>
                </div>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-gradient-to-br from-emerald-900/60 to-green-900/60 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-emerald-700/30">
              <div className="flex items-center">
                <div className="p-2 md:p-3 bg-emerald-500/20 backdrop-blur-sm rounded-lg mr-3 md:mr-4">
                  <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-emerald-300" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-emerald-100/80 font-medium">
                    Completed
                  </p>
                  <p className="text-xl md:text-2xl font-semibold text-white">
                    {completedCount}
                  </p>
                </div>
              </div>
            </div>

            {/* Cancelled */}
            <div className="bg-gradient-to-br from-rose-900/60 to-pink-900/60 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-rose-700/30">
              <div className="flex items-center">
                <div className="p-2 md:p-3 bg-rose-500/20 backdrop-blur-sm rounded-lg mr-3 md:mr-4">
                  <XCircle className="w-4 h-4 md:w-6 md-h-6 text-rose-300" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-rose-100/80 font-medium">
                    Cancelled
                  </p>
                  <p className="text-xl md:text-2xl font-semibold text-white">
                    {cancelledCount}
                  </p>
                </div>
              </div>
            </div>

            {/* No Show */}
            <div className="bg-gradient-to-br from-amber-900/60 to-orange-900/60 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-amber-700/30">
              <div className="flex items-center">
                <div className="p-2 md:p-3 bg-amber-500/20 backdrop-blur-sm rounded-lg mr-3 md:mr-4">
                  <UserX className="w-4 h-4 md:w-6 md:h-6 text-amber-300" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-amber-100/80 font-medium">
                    No Show
                  </p>
                  <p className="text-xl md:text-2xl font-semibold text-white">
                    {noShowCount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Search and Filters */}
          <div className="hidden md:block bg-gradient-to-r from-slate-900/50 to-slate-800/30 backdrop-blur-sm rounded-xl p-5 border border-slate-700/30 mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search appointments by client or massage type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-white placeholder:text-slate-400 transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-white transition-colors"
                >
                  <option value="all" className="bg-slate-900">
                    All Status
                  </option>
                  <option value="scheduled" className="bg-slate-900">
                    Scheduled
                  </option>
                  <option value="completed" className="bg-slate-900">
                    Completed
                  </option>
                  <option value="cancelled" className="bg-slate-900">
                    Cancelled
                  </option>
                  <option value="no_show" className="bg-slate-900">
                    No Show
                  </option>
                </select>

                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-white transition-colors"
                >
                  <option value="all" className="bg-slate-900">
                    All Dates
                  </option>
                  {uniqueDates.map((date) => (
                    <option key={date} value={date} className="bg-slate-900">
                      {new Date(date).toLocaleDateString()}
                    </option>
                  ))}
                </select>

                {/* Past Appointments Toggle - Desktop */}
                <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3">
                  <span className="text-sm text-slate-300 whitespace-nowrap">
                    Show Past
                  </span>
                  <button
                    onClick={() =>
                      setShowPastAppointments(!showPastAppointments)
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      showPastAppointments ? "bg-emerald-600" : "bg-slate-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        showPastAppointments ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && bookings.length === 0 && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto"></div>
              <p className="mt-4 text-slate-300">Loading appointments...</p>
              <p className="text-slate-500 text-sm mt-2">
                Fetching appointments for {therapistName}
              </p>
            </div>
          )}

          {/* Mobile Appointments List */}
          <div className="md:hidden space-y-4 mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                All Appointments
              </h2>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gradient-to-r from-emerald-600/80 to-cyan-600/80 text-white text-sm rounded-lg">
                  {filteredAppointments.length}
                </span>
                <button
                  onClick={() => setShowPastAppointments(!showPastAppointments)}
                  className={`px-3 py-1 text-sm rounded-lg border ${
                    showPastAppointments
                      ? "bg-emerald-600/20 text-emerald-300 border-emerald-600/30"
                      : "bg-slate-800/60 text-slate-300 border-slate-700/30"
                  }`}
                >
                  {showPastAppointments ? "Hide Past" : "Show Past"}
                </button>
              </div>
            </div>

            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => {
                const displayStatus = getDisplayStatus(
                  appointment.status,
                  appointment.completed,
                );
                const isPast = isPastDate(appointment.date);

                return (
                  <div
                    key={appointment.id}
                    className={`bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm rounded-xl border p-4 ${
                      isPast
                        ? "border-slate-600/30 opacity-80"
                        : "border-slate-700/30"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-600/30 to-blue-600/30 backdrop-blur-sm rounded-lg flex items-center justify-center mr-3 border border-cyan-500/20">
                          <User className="w-5 h-5 text-cyan-300" />
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {appointment.clientName}
                            {isPast && (
                              <span className="ml-2 text-xs text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded">
                                Past
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(
                                appointment.status,
                                appointment.completed,
                              )}`}
                            >
                              {getStatusIcon(
                                appointment.status,
                                appointment.completed,
                              )}
                              {getStatusText(
                                appointment.status,
                                appointment.completed,
                              )}
                            </span>
                            <span className="text-xs text-slate-500">
                              {new Date(appointment.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleAppointmentDetails(appointment.id)}
                        className="p-1"
                      >
                        {expandedAppointment === appointment.id ? (
                          <ChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </button>
                    </div>

                    {/* Quick Info */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="text-sm">
                        <div className="text-slate-400">Time</div>
                        <div className="text-white font-medium">
                          {appointment.time.split(":").slice(0, 2).join(":")}
                        </div>
                      </div>
                      <div className="text-sm">
                        <div className="text-slate-400">Service</div>
                        <div className="text-white font-medium">
                          {appointment.massageName}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedAppointment === appointment.id && (
                      <div className="mt-4 pt-4 border-t border-slate-700/30 space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-300">
                            {appointment.clientEmail || "No email"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-300">
                            Room: {appointment.room}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-300">
                            Duration: {appointment.duration}
                          </span>
                        </div>
                        <div className="text-sm">
                          <div className="text-slate-400">Price</div>
                          <div className="text-emerald-300 font-medium">
                            {appointment.price}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-4 pt-4 border-t border-slate-700/30">
                      {renderActionButtons(appointment)}
                    </div>
                  </div>
                );
              })
            ) : !isLoading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-300 mb-2">
                  No appointments found
                </h3>
                <p className="text-slate-500">Try adjusting your search</p>
              </div>
            ) : null}
          </div>

          {/* Desktop Appointments Table */}
          <div className="hidden md:block bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/30 shadow-xl overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-slate-700/50 bg-gradient-to-r from-slate-900/80 to-slate-800/60">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                  All Appointments ({filteredAppointments.length})
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-300">
                    Showing: {showPastAppointments ? "All" : "Upcoming Only"}
                  </span>
                  <button
                    onClick={() =>
                      setShowPastAppointments(!showPastAppointments)
                    }
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                      showPastAppointments
                        ? "bg-emerald-600/20 text-emerald-300 border-emerald-600/30 hover:bg-emerald-600/30"
                        : "bg-slate-800/60 text-slate-300 border-slate-700/30 hover:bg-slate-800"
                    }`}
                  >
                    {showPastAppointments ? "Hide Past" : "Show Past"}
                  </button>
                </div>
              </div>
            </div>

            {filteredAppointments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-900/40 to-slate-800/40 border-b border-slate-700/30">
                    <tr>
                      <th className="py-3 px-6 text-left text-sm font-semibold text-slate-300">
                        Client
                      </th>
                      <th className="py-3 px-6 text-left text-sm font-semibold text-slate-300">
                        Date & Time
                      </th>
                      <th className="py-3 px-6 text-left text-sm font-semibold text-slate-300">
                        Service
                      </th>
                      <th className="py-3 px-6 text-left text-sm font-semibold text-slate-300">
                        Status
                      </th>
                      <th className="py-3 px-6 text-left text-sm font-semibold text-slate-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/30">
                    {filteredAppointments.map((appointment) => {
                      const displayStatus = getDisplayStatus(
                        appointment.status,
                        appointment.completed,
                      );
                      const isPast = isPastDate(appointment.date);
                      const isToday = isTodayAppointment(appointment.date);

                      return (
                        <tr
                          key={appointment.id}
                          className={`hover:bg-slate-800/20 transition-colors ${
                            isPast ? "opacity-80" : ""
                          }`}
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-cyan-600/30 to-blue-600/30 backdrop-blur-sm rounded-lg flex items-center justify-center mr-4 border border-cyan-500/20">
                                <User className="w-5 h-5 text-cyan-300" />
                              </div>
                              <div>
                                <div className="font-medium text-white flex items-center gap-2">
                                  {appointment.clientName}
                                  {isToday && (
                                    <span className="text-xs text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                                      Today
                                    </span>
                                  )}
                                  {isPast && !isToday && (
                                    <span className="text-xs text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded">
                                      Past
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-slate-400 flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {appointment.clientEmail || "No email"}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex items-center gap-1 text-xs text-slate-400 bg-slate-800/40 px-2 py-1 rounded">
                                    <MapPin className="w-3 h-3" />
                                    {appointment.room}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-white font-medium">
                              {new Date(appointment.date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </div>
                            <div className="text-sm text-slate-400 flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3" />
                              {appointment.time
                                .split(":")
                                .slice(0, 2)
                                .join(":")}
                              <span className="text-slate-600">•</span>
                              {appointment.duration}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-white font-medium">
                              {appointment.massageName}
                            </div>
                            <div className="text-sm text-emerald-300 mt-1">
                              {appointment.price}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm ${getStatusColor(
                                appointment.status,
                                appointment.completed,
                              )}`}
                            >
                              {getStatusIcon(
                                appointment.status,
                                appointment.completed,
                              )}
                              {getStatusText(
                                appointment.status,
                                appointment.completed,
                              )}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              {renderActionButtons(appointment)}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : !isLoading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-sm rounded-xl flex items-center justify-center border border-slate-700/30">
                  <Calendar className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-300 mb-2">
                  No appointments found
                </h3>
                <p className="text-slate-500">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : null}
          </div>

          {/* TODAY'S APPOINTMENTS SECTION - AT THE BOTTOM */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-semibold text-white flex items-center gap-2">
                <CalendarDays className="w-6 h-6 text-cyan-400" />
                Today's Appointments ({todaysCount})
              </h2>
              <div className="text-sm text-slate-300">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>

            {todaysCount === 0 ? (
              <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/30 p-6 md:p-8 text-center">
                <Calendar className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-300 mb-2">
                  No appointments today
                </h3>
                <p className="text-slate-500">You're all clear for today!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {todaysAppointments.map((appointment) => {
                  const displayStatus = getDisplayStatus(
                    appointment.status,
                    appointment.completed,
                  );

                  return (
                    <div
                      key={appointment.id}
                      className="bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/30 p-4 hover:border-cyan-500/30 transition-colors"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-600/30 to-blue-600/30 backdrop-blur-sm rounded-lg flex items-center justify-center mr-3 border border-cyan-500/20">
                            <User className="w-5 h-5 text-cyan-300" />
                          </div>
                          <div>
                            <div className="font-medium text-white">
                              {appointment.clientName}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(
                                  appointment.status,
                                  appointment.completed,
                                )}`}
                              >
                                {getStatusIcon(
                                  appointment.status,
                                  appointment.completed,
                                )}
                                {getStatusText(
                                  appointment.status,
                                  appointment.completed,
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-slate-400 text-sm">Time</span>
                          <span className="text-white font-medium">
                            {appointment.time.split(":").slice(0, 2).join(":")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 text-sm">
                            Service
                          </span>
                          <span className="text-white">
                            {appointment.massageName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 text-sm">Room</span>
                          <span className="text-white">{appointment.room}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 text-sm">
                            Duration
                          </span>
                          <span className="text-white">
                            {appointment.duration}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 pt-4 border-t border-slate-700/30">
                        {renderActionButtons(appointment)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Responsive Modal */}
        {isModalOpen && selectedAppointment && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-4 z-50">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl max-w-md w-full p-4 md:p-6 border border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto">
              {modalAction === "edit" && (
                <>
                  <div className="mb-4 md:mb-6">
                    <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-600 mx-auto mb-3 md:mb-4">
                      <Edit2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>

                    <h3 className="text-base md:text-lg font-semibold text-center text-white mb-2">
                      Edit Appointment Time
                    </h3>

                    <p className="text-center text-slate-300 text-sm md:text-base mb-3 md:mb-4">
                      Change time for {selectedAppointment.clientName}'s
                      appointment
                    </p>

                    <div className="mb-3 md:mb-4">
                      <label className="block text-sm font-medium text-slate-300 mb-1 md:mb-2">
                        Select New Time
                      </label>
                      <select
                        value={editTime}
                        onChange={(e) => setEditTime(e.target.value)}
                        className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm md:text-base"
                        disabled={isLoading}
                      >
                        <option value="" className="bg-slate-900">
                          Select a time
                        </option>
                        {timeSlots.map((time) => (
                          <option
                            key={time}
                            value={time}
                            className="bg-slate-900"
                          >
                            {time.split(":").slice(0, 2).join(":")}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-700/30 rounded-lg p-2 md:p-3">
                      <div className="flex items-start">
                        <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-xs md:text-sm text-cyan-300">
                          Client will be notified of the time change.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 md:gap-3">
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        setSelectedAppointment(null);
                        setEditTime("");
                      }}
                      className="flex-1 px-3 py-2 md:px-4 md:py-2.5 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800/50 text-sm md:text-base"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmAction}
                      disabled={isLoading || !editTime}
                      className={`flex-1 px-3 py-2 md:px-4 md:py-2.5 text-white rounded-lg text-sm md:text-base ${
                        isLoading || !editTime
                          ? "bg-gradient-to-r from-cyan-700/50 to-blue-700/50 cursor-not-allowed"
                          : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                      }`}
                    >
                      {isLoading ? "Updating..." : "Update"}
                    </button>
                  </div>
                </>
              )}

              {modalAction === "cancel" && (
                <>
                  <div className="mb-4 md:mb-6">
                    <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-rose-600 to-pink-600 mx-auto mb-3 md:mb-4">
                      <XCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>

                    <h3 className="text-base md:text-lg font-semibold text-center text-white mb-2">
                      Cancel Appointment
                    </h3>

                    <p className="text-center text-slate-300 text-sm md:text-base mb-3 md:mb-4">
                      Cancel {selectedAppointment.clientName}'s appointment on{" "}
                      {new Date(selectedAppointment.date).toLocaleDateString()}?
                    </p>

                    <div className="bg-gradient-to-r from-rose-900/30 to-pink-900/30 border border-rose-700/30 rounded-lg p-2 md:p-3 mb-3 md:mb-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-rose-400 mr-2 flex-shrink-0 mt=0.5" />
                        <div>
                          <p className="text-xs md:text-sm text-rose-300 mb-1">
                            Important Information:
                          </p>
                          <p className="text-xs md:text-sm text-rose-400">
                            • Client will be notified via email
                            <br />• This action cannot be undone
                            <br />• Email sent to:{" "}
                            {selectedAppointment.clientEmail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 md:gap-3">
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        setSelectedAppointment(null);
                      }}
                      className="flex-1 px-3 py-2 md:px-4 md:py-2.5 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800/50 text-sm md:text-base"
                      disabled={isLoading}
                    >
                      Keep
                    </button>
                    <button
                      onClick={confirmAction}
                      disabled={isLoading}
                      className={`flex-1 px-3 py-2 md:px-4 md:py-2.5 text-white rounded-lg text-sm md:text-base ${
                        isLoading
                          ? "bg-gradient-to-r from-rose-700/50 to-pink-700/50 cursor-not-allowed"
                          : "bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700"
                      }`}
                    >
                      {isLoading ? "Cancelling..." : "Confirm"}
                    </button>
                  </div>
                </>
              )}

              {modalAction === "complete" && (
                <>
                  <div className="mb-4 md:mb-6">
                    <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-emerald-600 to-green-600 mx-auto mb-3 md:mb-4">
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>

                    <h3 className="text-base md:text-lg font-semibold text-center text-white mb-2">
                      Mark as Complete
                    </h3>

                    <p className="text-center text-slate-300 text-sm md:text-base mb-3 md:mb-4">
                      Mark {selectedAppointment.clientName}'s session as
                      completed?
                    </p>

                    <div className="bg-gradient-to-r from-emerald-900/30 to-green-900/30 border border-emerald-700/30 rounded-lg p-2 md:p-3 mb-3 md:mb-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-emerald-400 mr-2 flex-shrink-0 mt=0.5" />
                        <div>
                          <p className="text-xs md:text-sm text-emerald-300">
                            • Mark session as completed
                            <br />
                            • Update client records
                            <br />• Trigger follow-up reminders
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 md:gap-3">
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        setSelectedAppointment(null);
                      }}
                      className="flex-1 px-3 py-2 md:px-4 md:py-2.5 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800/50 text-sm md:text-base"
                      disabled={isLoading}
                    >
                      Not Yet
                    </button>
                    <button
                      onClick={confirmAction}
                      disabled={isLoading}
                      className={`flex-1 px-3 py-2 md:px-4 md:py-2.5 text-white rounded-lg text-sm md:text-base ${
                        isLoading
                          ? "bg-gradient-to-r from-emerald-700/50 to-green-700/50 cursor-not-allowed"
                          : "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
                      }`}
                    >
                      {isLoading ? "Processing..." : "Complete"}
                    </button>
                  </div>
                </>
              )}

              {modalAction === "no_show" && (
                <>
                  <div className="mb-4 md:mb-6">
                    <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 mx-auto mb-3 md:mb-4">
                      <UserX className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>

                    <h3 className="text-base md:text-lg font-semibold text-center text-white mb-2">
                      Mark as No Show
                    </h3>

                    <p className="text-center text-slate-300 text-sm md:text-base mb-3 md:mb-4">
                      Mark {selectedAppointment.clientName}'s appointment as no
                      show?
                    </p>

                    <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-700/30 rounded-lg p-2 md:p-3 mb-3 md:mb-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-amber-400 mr-2 flex-shrink-0 mt=0.5" />
                        <div>
                          <p className="text-xs md:text-sm text-amber-300 mb-1">
                            Important Information:
                          </p>
                          <p className="text-xs md:text-sm text-amber-400">
                            • This marks the client as not showing up
                            <br />• This action cannot be undone
                            <br />• May affect client's future booking
                            privileges
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 md:gap-3">
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        setSelectedAppointment(null);
                      }}
                      className="flex-1 px-3 py-2 md:px-4 md:py-2.5 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800/50 text-sm md:text-base"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmAction}
                      disabled={isLoading}
                      className={`flex-1 px-3 py-2 md:px-4 md:py-2.5 text-white rounded-lg text-sm md:text-base ${
                        isLoading
                          ? "bg-gradient-to-r from-amber-700/50 to-orange-700/50 cursor-not-allowed"
                          : "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                      }`}
                    >
                      {isLoading ? "Processing..." : "Mark as No Show"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

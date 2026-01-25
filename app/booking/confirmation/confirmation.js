"use client";

import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheck,
  FiCalendar,
  FiUser,
  FiClock,
  FiMapPin,
  FiMail,
  FiPhone,
  FiCreditCard,
  FiShoppingBag,
  FiHome,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { CartContext } from "../cartContext";
import { bookMassage } from "../../ApiServices/serverActions";
import toast from "react-hot-toast";

export default function BookingFinish({ userName, userEmail }) {
  const { massage, therapistName, date, time, roomName, price, duration } =
    useContext(CartContext);

  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [hasAnimatedSteps, setHasAnimatedSteps] = useState(false);

  const completedSteps = {
    massage: !!massage,
    therapist: !!therapistName,
    date: !!date,
    time: !!time,
    room: !!roomName,
  };

  const totalStepsCompleted =
    Object.values(completedSteps).filter(Boolean).length;

  useEffect(() => {
    if (hasAnimatedSteps) return;

    const stepsToAnimate = totalStepsCompleted + 1;

    let stepIndex = 1;
    const interval = setInterval(() => {
      if (stepIndex <= stepsToAnimate) {
        setCurrentStep(stepIndex);
        stepIndex++;
      } else {
        clearInterval(interval);
        setHasAnimatedSteps(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [totalStepsCompleted, hasAnimatedSteps]);

  const steps = [
    {
      id: 1,
      title: "Massage",
      icon: "💆",
      completed: completedSteps.massage,
    },
    {
      id: 2,
      title: "Therapist",
      icon: "👨‍⚕️",
      completed: completedSteps.therapist,
    },
    {
      id: 3,
      title: "Date",
      icon: "📅",
      completed: completedSteps.date,
    },
    {
      id: 4,
      title: "Time",
      icon: "⏰",
      completed: completedSteps.time,
    },
    {
      id: 5,
      title: "Room",
      icon: "🚪",
      completed: completedSteps.room,
    },
    {
      id: 6,
      title: "Confirm",
      icon: "✅",
      completed: bookingComplete,
    },
  ];

  const bookingDetails = {
    massage: massage || "Swedish Massage",
    therapist: therapistName || "Not selected",
    date: date || "Not selected",
    time: time || "Not selected",
    room: roomName || "Not selected",
    duration: duration || "forever",
    price: price || "on the house my nigga",
    location: "Wellness Center",
    bookingId: `BK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
  };

  const handleConfirmBooking = async () => {
    if (!massage || !therapistName || !date || !time || !roomName) {
      setBookingError("Please complete all booking steps before confirming.");
      return;
    }

    setIsBooking(true);
    setBookingError(null);

    try {
      const result = await bookMassage(
        massage,
        therapistName,
        date,
        time,
        roomName,
        userName,
        userEmail,
        duration,
        price
      );

      toast.success("Reservation finalized");

      if (result.status === "the massage was not booked") {
        throw new Error(result.message);
      }

      setBookingComplete(true);
    } catch (error) {
      setBookingError(
        error.message || "Failed to book massage. Please try again."
      );
    } finally {
      setIsBooking(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      switch (prevStep) {
        case 1:
          router.push("/");
          break;
        case 2:
          router.push("/booking/therapist");
          break;
        case 3:
          router.push("/booking/date");
          break;
        case 4:
          router.push("/booking/time");
          break;
        case 5:
          router.push("/booking/room");
          break;
        default:
          setCurrentStep(prevStep);
      }
    }
  };

  if (!massage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white p-6 max-w-md w-full"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl sm:text-4xl">😴</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            Select a Massage First
          </h1>
          <p className="text-gray-300 mb-6 text-sm sm:text-base">
            Begin your wellness journey by choosing a massage type
          </p>
          <button
            onClick={() => router.push("/booking")}
            className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-bold hover:shadow-lg transition-all text-sm sm:text-base w-full sm:w-auto"
          >
            Choose Massage
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-3 sm:p-4 md:p-6 lg:p-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-10 md:mb-12 px-2"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Complete Your Booking
          </h1>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg">
            Finish your wellness journey in a few simple steps
          </p>
        </motion.div>

        <div className="mb-8 sm:mb-10 md:mb-12 px-2 sm:px-4">
          <div className="relative w-full max-w-5xl mx-auto">
            <div className="hidden sm:block absolute top-5 md:top-6 left-4 md:left-8 lg:left-12 right-4 md:right-8 lg:right-12 h-1 bg-gray-600 z-0"></div>

            <div className="flex flex-wrap sm:flex-nowrap justify-center gap-2 sm:gap-0 sm:justify-between relative z-10">
              {steps.map((step) => (
                <motion.div
                  key={step.id}
                  initial={{ scale: 0.8 }}
                  animate={{
                    scale:
                      currentStep >= step.id
                        ? step.completed
                          ? 1.1
                          : 1.05
                        : 1,
                    backgroundColor:
                      currentStep >= step.id
                        ? step.completed
                          ? "#10b981"
                          : "#3b82f6"
                        : "#374151",
                  }}
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center mb-2 sm:mb-0 w-1/3 sm:w-auto"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center text-sm sm:text-base md:text-lg lg:text-xl mb-1 sm:mb-2 border-2 border-gray-600 relative z-10">
                    {currentStep >= step.id && step.completed ? (
                      <FiCheck className="text-xs sm:text-sm md:text-base" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span className="text-white font-medium text-[10px] xs:text-xs sm:text-xs md:text-sm text-center px-1">
                    {step.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-4 sm:space-y-6"
          >
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-700"
                >
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <FiShoppingBag className="text-purple-400 text-lg sm:text-xl" />
                    Massage Selection
                  </h2>

                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 sm:p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                        <span className="text-2xl sm:text-3xl">💆</span>
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">
                          {bookingDetails.massage}
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base">
                          60-minute session
                        </p>
                      </div>
                      <div className="text-center sm:text-right w-full sm:w-auto">
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                          ${bookingDetails.price}
                        </div>
                        <div className="text-green-400 flex items-center gap-1 justify-center sm:justify-end text-sm">
                          <FiCheck className="text-xs" /> Selected
                        </div>
                      </div>
                    </div>

                    <div className="p-3 sm:p-4 bg-purple-900/20 border border-purple-800 rounded-xl">
                      <p className="text-purple-300 text-sm sm:text-base">
                        Great choice! This massage focuses on relaxation and
                        stress relief.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-700"
                >
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <FiUser className="text-blue-400 text-lg sm:text-xl" />
                    Select Your Therapist
                  </h2>

                  <div className="space-y-4 sm:space-y-6">
                    {therapistName ? (
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shrink-0">
                          <span className="text-2xl sm:text-3xl md:text-4xl">
                            👨‍⚕️
                          </span>
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">
                            {therapistName}
                          </h3>
                          <p className="text-gray-300 text-sm sm:text-base">
                            Licensed Massage Therapist
                          </p>
                          <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 justify-center sm:justify-start">
                            <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded-full text-xs">
                              ⭐ 4.9/5
                            </span>
                            <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded-full text-xs">
                              🏆 Expert
                            </span>
                          </div>
                        </div>
                        <div className="text-green-400 text-xl sm:text-2xl">
                          <FiCheck />
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 sm:py-12">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                          <FiUser className="text-3xl sm:text-4xl md:text-5xl text-gray-500" />
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">
                          No Therapist Selected
                        </h3>
                        <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                          Choose a therapist to continue with your booking
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-700"
                >
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <FiCalendar className="text-green-400 text-lg sm:text-xl" />
                    Select Date
                  </h2>

                  <div className="space-y-4 sm:space-y-6">
                    {date ? (
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shrink-0">
                          <span className="text-2xl sm:text-3xl md:text-4xl">
                            📅
                          </span>
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                            {new Date(date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </h3>
                          <p className="text-gray-300 text-sm sm:text-base">
                            Perfect timing for your wellness session
                          </p>
                        </div>
                        <div className="text-green-400 text-xl sm:text-2xl">
                          <FiCheck />
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 sm:py-12">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                          <FiCalendar className="text-3xl sm:text-4xl md:text-5xl text-gray-500" />
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">
                          Date Not Selected
                        </h3>
                        <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                          Choose a date for your massage session
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-700"
                >
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <FiClock className="text-amber-400 text-lg sm:text-xl" />
                    Select Time
                  </h2>

                  <div className="space-y-4 sm:space-y-6">
                    {time ? (
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shrink-0">
                          <span className="text-2xl sm:text-3xl md:text-4xl">
                            ⏰
                          </span>
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                            {time}
                          </h3>
                          <p className="text-gray-300 text-sm sm:text-base">
                            {date
                              ? `on ${new Date(date).toLocaleDateString()}`
                              : ""}
                          </p>
                        </div>
                        <div className="text-green-400 text-xl sm:text-2xl">
                          <FiCheck />
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 sm:py-12">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                          <FiClock className="text-3xl sm:text-4xl md:text-5xl text-gray-500" />
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">
                          Time Not Selected
                        </h3>
                        <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                          Choose a time slot for your appointment
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-700"
                >
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <FiHome className="text-indigo-400 text-lg sm:text-xl" />
                    Select Room
                  </h2>

                  <div className="space-y-4 sm:space-y-6">
                    {roomName ? (
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shrink-0">
                          <span className="text-2xl sm:text-3xl md:text-4xl">
                            🚪
                          </span>
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                            {roomName}
                          </h3>
                          <p className="text-gray-300 text-sm sm:text-base">
                            Private room with essential oils and soft music
                          </p>
                          <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 justify-center sm:justify-start">
                            <span className="px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded-full text-xs">
                              🔇 Soundproof
                            </span>
                            <span className="px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded-full text-xs">
                              🌡️ Climate Controlled
                            </span>
                          </div>
                        </div>
                        <div className="text-green-400 text-xl sm:text-2xl">
                          <FiCheck />
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 sm:py-12">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                          <FiHome className="text-3xl sm:text-4xl md:text-5xl text-gray-500" />
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">
                          Room Not Selected
                        </h3>
                        <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                          Choose a room for your massage session
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {currentStep === 6 && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-700"
                >
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <FiCheck className="text-green-400 text-lg sm:text-xl" />
                    Final Confirmation
                  </h2>

                  {bookingComplete ? (
                    <div className="text-center py-8 sm:py-12">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 sm:mb-8"
                      >
                        <FiCheck className="text-white text-3xl sm:text-4xl md:text-5xl" />
                      </motion.div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                        Booking Confirmed!
                      </h3>
                      <p className="text-gray-300 mb-2 text-sm sm:text-base">
                        Your wellness journey is scheduled
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400">
                        Booking ID: {bookingDetails.bookingId}
                      </p>
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        onClick={() => {
                          router.push("/dashboard");
                        }}
                        className="mt-6 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg sm:rounded-xl hover:shadow-lg transition-all text-sm sm:text-base w-full sm:w-auto"
                      >
                        Back to Home
                      </motion.button>
                    </div>
                  ) : (
                    <div className="text-center py-6 sm:py-8 md:py-12">
                      <div className="mb-6 sm:mb-8">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">
                          Ready to Book?
                        </h3>
                        <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                          Review your booking details below and confirm when
                          ready.
                        </p>
                      </div>

                      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 max-w-md mx-auto">
                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">
                              Massage:
                            </span>
                            <span className="text-white font-medium text-sm sm:text-base">
                              {massage}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">
                              Therapist:
                            </span>
                            <span className="text-white font-medium text-sm sm:text-base">
                              {therapistName}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Date:</span>
                            <span className="text-white font-medium text-sm sm:text-base">
                              {new Date(date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Time:</span>
                            <span className="text-white font-medium text-sm sm:text-base">
                              {time}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Room:</span>
                            <span className="text-white font-medium text-sm sm:text-base">
                              {roomName}
                            </span>
                          </div>
                          <div className="h-px bg-gray-700 my-3 sm:my-4"></div>
                          <div className="flex justify-between text-lg sm:text-xl font-bold text-white">
                            <span>Total</span>
                            <span>${bookingDetails.price}</span>
                          </div>
                        </div>
                      </div>

                      {bookingError && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-900/20 border border-red-800 rounded-xl max-w-md mx-auto"
                        >
                          <p className="text-red-300 text-xs sm:text-sm">
                            {bookingError}
                          </p>
                        </motion.div>
                      )}

                      <button
                        onClick={handleConfirmBooking}
                        disabled={isBooking}
                        className={`px-8 sm:px-10 md:px-12 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-2 sm:gap-3 mx-auto w-full sm:w-auto ${
                          isBooking
                            ? "bg-gradient-to-r from-gray-600 to-gray-700 cursor-not-allowed"
                            : "bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg hover:scale-105"
                        }`}
                      >
                        {isBooking ? (
                          <>
                            <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <FiCheck className="text-lg sm:text-xl" />
                            Confirm Booking
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {!bookingComplete && currentStep < 6 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-4 sm:mt-6"
              >
                <button
                  onClick={handleBack}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-800 text-white rounded-lg sm:rounded-xl hover:bg-gray-700 transition-colors flex items-center gap-2 justify-center text-sm sm:text-base order-2 sm:order-1"
                  disabled={currentStep === 1}
                >
                  <FiArrowLeft /> Back
                </button>
                <button
                  onClick={() => {
                    if (currentStep < 6) {
                      setCurrentStep(currentStep + 1);
                    }
                  }}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg sm:rounded-xl hover:shadow-lg transition-all flex items-center gap-2 justify-center text-sm sm:text-base order-1 sm:order-2"
                >
                  Continue <FiArrowRight />
                </button>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-700 h-fit lg:mt-0 mt-4 sm:mt-6"
          >
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
              Booking Progress
            </h3>

            <div className="space-y-4 sm:space-y-6">
              {steps.map((step) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: step.id * 0.1 }}
                  className={`flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg sm:rounded-xl ${
                    step.completed
                      ? "bg-gradient-to-r from-green-900/20 to-emerald-900/10 border border-green-800/30"
                      : "bg-gray-800/30"
                  }`}
                >
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${
                      step.completed ? "bg-green-500" : "bg-gray-700"
                    }`}
                  >
                    {step.completed ? (
                      <FiCheck className="text-white text-sm sm:text-base" />
                    ) : (
                      <span className="text-sm sm:text-base">{step.icon}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-medium text-sm sm:text-base truncate ${
                        step.completed ? "text-green-300" : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                </motion.div>
              ))}

              <div className="pt-4 sm:pt-6 border-t border-gray-700">
                <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
                  Summary
                </h4>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Massage:</span>
                    <span className="text-white text-sm sm:text-base truncate ml-2 max-w-[50%] text-right">
                      {bookingDetails.massage}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Therapist:</span>
                    <span className="text-white text-sm sm:text-base truncate ml-2 max-w-[50%] text-right">
                      {bookingDetails.therapist}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Date:</span>
                    <span className="text-white text-sm sm:text-base truncate ml-2 max-w-[50%] text-right">
                      {date
                        ? new Date(date).toLocaleDateString()
                        : "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Time:</span>
                    <span className="text-white text-sm sm:text-base">
                      {bookingDetails.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Room:</span>
                    <span className="text-white text-sm sm:text-base truncate ml-2 max-w-[50%] text-right">
                      {roomName || "Not selected"}
                    </span>
                  </div>
                  <div className="h-px bg-gray-700 my-2 sm:my-3"></div>
                  <div className="flex justify-between text-lg sm:text-xl font-bold text-white">
                    <span>Total</span>
                    <span>${bookingDetails.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useContext } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  Zap,
  Moon,
  Sun,
} from "lucide-react";
import { CartContext } from "../cartContext";
import Link from "next/link";

// Helper function
function getDaysUntilWeekend() {
  const today = new Date().getDay();
  return today === 0 ? 0 : today === 6 ? 0 : 6 - today;
}

export default function MassageDatePicker({ id, name }) {
  //context in use
  const { setTherapistName, setTherapistId, setDate, setTime } =
    useContext(CartContext);

  //states
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState({});
  const [loading, setLoading] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState("morning");

  console.log(selectedTime);
  console.log(selectedDate);

  useEffect(() => {
    setTherapistName(name);
    setTherapistId(id);
  }, [name, id]);

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate, setDate]);

  useEffect(() => {
    setTime(selectedTime);
  }, [selectedTime, setTime]);

  // Generate therapist's availability (simulated)
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const slots = {};
      const today = new Date();

      // Generate next 14 days
      for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateStr = date.toISOString().split("T")[0];

        // Different availability patterns
        if (i === 0) {
          slots[dateStr] = ["09:00", "11:00", "14:00", "16:00"]; // Today
        } else if (date.getDay() === 0 || date.getDay() === 6) {
          slots[dateStr] = ["10:00", "12:00", "14:00", "16:00", "18:00"]; // Weekends
        } else {
          slots[dateStr] = [
            "08:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
          ]; // Weekdays
        }
      }

      setAvailableSlots(slots);
      setLoading(false);
    }, 300);
  }, []);

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(year, month, i);
      days.push(dayDate);
    }

    return days;
  };

  // Navigate months
  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  // Check if date is available
  const isDateAvailable = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return availableSlots[dateStr] && availableSlots[dateStr].length > 0;
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Check if date is selected
  const isSelected = (date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Get time of day vibe
  const getTimeVibe = (time) => {
    const hour = parseInt(time.split(":")[0]);
    if (hour < 12)
      return {
        icon: <Sun className="w-4 h-4" />,
        name: "Morning Glow",
        color: "text-amber-500",
      };
    if (hour < 15)
      return {
        icon: <Sparkles className="w-4 h-4" />,
        name: "Afternoon Zen",
        color: "text-emerald-400",
      };
    if (hour < 18)
      return {
        icon: <Moon className="w-4 h-4" />,
        name: "Evening Unwind",
        color: "text-indigo-400",
      };
    return {
      icon: <Moon className="w-4 h-4" />,
      name: "Night Serenity",
      color: "text-purple-500",
    };
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 overflow-hidden">
      {/* Header with therapist name */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 via-orange-500 to-pink-500 bg-clip-text text-transparent">
          Book Your Serenity Session with {name}
        </h2>
        <p className="text-gray-600 mt-2">
          Select when your body needs attention with your chosen therapist
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-white to-amber-50/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-amber-100 shadow-xl">
            {/* Calendar Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={prevMonth}
                className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors group"
              >
                <ChevronLeft className="w-5 h-5 text-amber-700 group-hover:scale-110 transition-transform" />
              </button>

              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {monthNames[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Tap a date to see available times with {name}
                </p>
              </div>

              <button
                onClick={nextMonth}
                className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors group"
              >
                <ChevronRight className="w-5 h-5 text-amber-700 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {dayNames.map((day) => (
                <div key={day} className="text-center py-2">
                  <span className="text-sm font-semibold text-gray-500">
                    {day}
                  </span>
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {daysInMonth.map((date) => {
                const dateStr = date.toISOString().split("T")[0];
                const available = isDateAvailable(date);
                const today = isToday(date);
                const selected = isSelected(date);

                return (
                  <button
                    key={dateStr}
                    onClick={() => available && setSelectedDate(date)}
                    disabled={!available}
                    className={`
                      relative aspect-square rounded-xl transition-all duration-300
                      ${
                        selected
                          ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white scale-105 shadow-lg"
                          : today
                            ? "bg-amber-100 border-2 border-amber-300 text-amber-800"
                            : available
                              ? "bg-white hover:bg-amber-50 border border-amber-100 hover:border-amber-300 text-gray-800 hover:scale-102"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }
                      ${available && !selected ? "hover:shadow-md" : ""}
                      flex flex-col items-center justify-center p-2
                    `}
                  >
                    <span
                      className={`text-lg font-semibold ${
                        selected ? "text-white" : today ? "text-amber-800" : ""
                      }`}
                    >
                      {date.getDate()}
                    </span>

                    {available && (
                      <div className="mt-1 flex space-x-1">
                        {[1, 2, 3]
                          .slice(
                            0,
                            Math.min(3, availableSlots[dateStr]?.length || 0),
                          )
                          .map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 h-1 rounded-full ${
                                selected ? "bg-white" : "bg-amber-400"
                              }`}
                            />
                          ))}
                      </div>
                    )}

                    {today && !selected && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-amber-200 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-amber-500 mr-2" />
                <span className="text-sm text-gray-700">Selected</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-amber-100 border border-amber-300 mr-2" />
                <span className="text-sm text-gray-700">Today</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-white border border-amber-100 mr-2" />
                <span className="text-sm text-gray-700">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-100 mr-2" />
                <span className="text-sm text-gray-700">Unavailable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Time Selection & Preview */}
        <div className="space-y-6">
          {/* Selected Date Display */}
          {selectedDate && (
            <div className="bg-gradient-to-br from-white to-emerald-50/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-emerald-100 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </h3>
                  <p className="text-sm text-emerald-600 mt-1 flex items-center">
                    <Sparkles className="w-4 h-4 mr-1" />
                    {availableSlots[selectedDate.toISOString().split("T")[0]]
                      ?.length || 0}{" "}
                    sessions available with {name}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-700">
                    {selectedDate.getDate()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {monthNames[selectedDate.getMonth()].slice(0, 3)}
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-3">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
                    <p className="text-gray-500 mt-2">
                      Loading available times with {name}...
                    </p>
                  </div>
                ) : (
                  availableSlots[selectedDate.toISOString().split("T")[0]]?.map(
                    (time) => {
                      const vibe = getTimeVibe(time);
                      const isSelectedTime = selectedTime === time;

                      return (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`
                          w-full p-3 rounded-xl transition-all duration-300 text-left
                          ${
                            isSelectedTime
                              ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg transform scale-102"
                              : "bg-white hover:bg-emerald-50 border border-emerald-100 hover:border-emerald-300"
                          }
                          flex items-center justify-between
                        `}
                        >
                          <div className="flex items-center">
                            <div
                              className={`p-2 rounded-lg mr-3 ${
                                isSelectedTime
                                  ? "bg-white/20"
                                  : "bg-emerald-100"
                              }`}
                            >
                              <Clock
                                className={`w-4 h-4 ${
                                  isSelectedTime
                                    ? "text-white"
                                    : "text-emerald-600"
                                }`}
                              />
                            </div>
                            <div>
                              <div className="font-semibold">{time}</div>
                              <div
                                className={`text-xs flex items-center ${
                                  isSelectedTime ? "text-white/90" : vibe.color
                                }`}
                              >
                                {vibe.icon}
                                <span className="ml-1">{vibe.name}</span>
                              </div>
                            </div>
                          </div>
                          {isSelectedTime && (
                            <div className="animate-pulse">
                              <Zap className="w-5 h-5 text-amber-300" />
                            </div>
                          )}
                        </button>
                      );
                    },
                  )
                )}
              </div>

              {/* CTA Button */}
              {selectedTime && (
                <Link
                  href={"/booking/massages"}
                  className="w-full mt-6 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  onClick={() => {
                    console.log(
                      "Booking with",
                      name,
                      ":",
                      selectedDate,
                      selectedTime,
                    );
                    //////hot toast here
                  }}
                >
                  Confirm {selectedTime} Session
                </Link>
              )}
            </div>
          )}

          {/* Quick Select */}
          <div className="bg-gradient-to-br from-white to-violet-50/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-violet-100 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Quick Book with {name}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "This Weekend", days: getDaysUntilWeekend() },
                { label: "Next Week", days: 7 },
                { label: "Morning Session", icon: <Sun className="w-4 h-4" /> },
                { label: "Evening Relax", icon: <Moon className="w-4 h-4" /> },
              ].map((item) => (
                <button
                  key={item.label}
                  className="p-3 rounded-xl bg-white hover:bg-violet-50 border border-violet-100 hover:border-violet-300 transition-all duration-300 text-center group"
                  onClick={() => {
                    const days = item.days || 0;
                    const date = new Date();
                    date.setDate(date.getDate() + days);
                    setSelectedDate(date);
                  }}
                >
                  {item.icon && (
                    <div className="text-violet-500 mb-1 flex justify-center">
                      {item.icon}
                    </div>
                  )}
                  <div className="font-medium text-gray-800 group-hover:text-violet-700">
                    {item.label}
                  </div>
                  {item.days !== undefined && (
                    <div className="text-xs text-gray-500 mt-1">
                      {item.days} days
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .scale-102 {
          transform: scale(1.02);
        }

        /* Smooth transitions */
        * {
          transition-property:
            color, background-color, border-color, transform, box-shadow;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
        }

        /* Better button feedback */
        button:active {
          transition-duration: 100ms;
        }
      `}</style>
    </div>
  );
}

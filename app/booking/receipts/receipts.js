"use client";

import React, { useState } from "react";
import {
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiCheckCircle,
  FiHome,
  FiClock,
} from "react-icons/fi";
import { GiStoneTablet } from "react-icons/gi";
import Link from "next/link";

export default function MassageReceipts({ receipts }) {
  const [filter, setFilter] = useState("all"); // all, month, week

  // Use the receipts prop directly (your data already has status: "completed")
  const completedBookings = receipts || [];

  // Format date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  // Format time
  const formatTime = (timeString) => {
    if (!timeString) return "";
    return timeString.substring(0, 5); // Converts "12:00:00" to "12:00"
  };

  // Calculate total price (handle null prices)
  const totalSpent = completedBookings.reduce((sum, booking) => {
    const price = booking.price || 0;
    return sum + (typeof price === "number" ? price : parseFloat(price) || 0);
  }, 0);

  // Calculate total duration
  const totalDuration = completedBookings.reduce((sum, booking) => {
    const duration = booking.duration || 0;
    return (
      sum + (typeof duration === "number" ? duration : parseInt(duration) || 0)
    );
  }, 0);

  // Get unique massage types
  const massageTypes = [
    ...new Set(completedBookings.map((b) => b.massageName)),
  ];

  // Get unique therapists
  const uniqueTherapists = [
    ...new Set(completedBookings.map((b) => b.therapistName)),
  ];

  // Get unique rooms
  const uniqueRooms = [...new Set(completedBookings.map((b) => b.room))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 p-4 md:p-8">
      {/* Home Button */}
      <Link
        href="/dashboard"
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2.5 bg-amber-800 text-white rounded-lg shadow-lg hover:bg-amber-900 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
      >
        <FiHome className="text-lg group-hover:scale-110 transition-transform" />
        <span className="font-medium">Home</span>
      </Link>

      {/* Header */}
      <div className="max-w-6xl mx-auto pt-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <GiStoneTablet className="text-3xl text-amber-800" />
            <h1 className="text-3xl md:text-4xl font-bold text-amber-900">
              Treatment Receipts
            </h1>
          </div>
          <p className="text-amber-700">
            Your complete massage therapy history
          </p>
        </div>

        {/* Stats Overview - Updated with your data */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-600 text-sm">Total Sessions</p>
                <p className="text-3xl font-bold text-amber-900">
                  {completedBookings.length}
                </p>
              </div>
              <FiCheckCircle className="text-3xl text-amber-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-600 text-sm">Total Duration</p>
                <p className="text-3xl font-bold text-amber-900">
                  {totalDuration} min
                </p>
              </div>
              <FiClock className="text-3xl text-amber-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-600 text-sm">Therapists</p>
                <p className="text-3xl font-bold text-amber-900">
                  {uniqueTherapists.length}
                </p>
              </div>
              <FiUser className="text-3xl text-amber-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-600 text-sm">Massage Types</p>
                <p className="text-3xl font-bold text-amber-900">
                  {massageTypes.length}
                </p>
              </div>
              <GiStoneTablet className="text-3xl text-amber-500" />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "all"
                ? "bg-amber-800 text-white"
                : "bg-amber-100 text-amber-800 hover:bg-amber-200"
            }`}
          >
            All Time
          </button>
          <button
            onClick={() => setFilter("month")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "month"
                ? "bg-amber-800 text-white"
                : "bg-amber-100 text-amber-800 hover:bg-amber-200"
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setFilter("week")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "week"
                ? "bg-amber-800 text-white"
                : "bg-amber-100 text-amber-800 hover:bg-amber-200"
            }`}
          >
            This Week
          </button>
        </div>

        {/* Receipts List */}
        <div className="space-y-6">
          {completedBookings.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-amber-200">
              <FiCalendar className="text-5xl text-amber-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-amber-800 mb-2">
                No Completed Sessions
              </h3>
              <p className="text-amber-600">
                Your completed massage receipts will appear here
              </p>
            </div>
          ) : (
            completedBookings.map((booking, index) => (
              <div
                key={booking.id || index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6 md:p-8">
                  {/* Receipt Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-2">
                        RECEIPT #
                        {String(booking.id || index + 1).padStart(4, "0")}
                      </div>
                      <h3 className="text-xl font-bold text-amber-900">
                        {booking.massageName || "Massage Therapy"}
                      </h3>
                      <p className="text-amber-600 text-sm mt-1">
                        {booking.duration} minutes • {booking.room}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-amber-800">
                        ${booking.price?.toFixed(2) || "N/A"}
                      </p>
                      <p className="text-sm text-amber-600">
                        {formatTime(booking.time)} • {booking.date}
                      </p>
                    </div>
                  </div>

                  {/* Receipt Body */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <FiCalendar className="text-amber-600" />
                      <div>
                        <p className="text-sm text-amber-600">Session Date</p>
                        <p className="font-medium text-amber-800">
                          {formatDate(booking.date)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiUser className="text-amber-600" />
                      <div>
                        <p className="text-sm text-amber-600">Therapist</p>
                        <p className="font-medium text-amber-800">
                          {booking.therapistName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiClock className="text-amber-600" />
                      <div>
                        <p className="text-sm text-amber-600">Duration</p>
                        <p className="font-medium text-amber-800">
                          {booking.duration} minutes
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <GiStoneTablet className="text-amber-600" />
                      <div>
                        <p className="text-sm text-amber-600">Room</p>
                        <p className="font-medium text-amber-800">
                          {booking.room}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Statement */}
                  <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
                    <p className="text-amber-800 leading-relaxed">
                      On{" "}
                      <span className="font-semibold">
                        {formatDate(booking.date)}
                      </span>
                      , you received a{" "}
                      <span className="font-semibold">
                        {booking.massageName?.toLowerCase() || "therapeutic"}
                      </span>{" "}
                      massage from{" "}
                      <span className="font-semibold">
                        {booking.therapistName}
                      </span>{" "}
                      in the{" "}
                      <span className="font-semibold">{booking.room}</span>.
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-6 border-t border-amber-100 flex flex-wrap gap-4 justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-sm text-amber-700">
                        Session Completed
                      </span>
                    </div>
                    <div className="text-sm text-amber-600">
                      Receipt generated on {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Footer */}
        {completedBookings.length > 0 && (
          <div className="mt-8 bg-amber-800 text-white rounded-2xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Wellness Journey Summary
                </h3>
                <p className="text-amber-200">
                  {completedBookings.length} sessions • {totalDuration} total
                  minutes •{uniqueTherapists.length} therapists •{" "}
                  {massageTypes.length} massage types
                </p>
              </div>
              <button className="mt-4 md:mt-0 px-6 py-3 bg-white text-amber-800 font-semibold rounded-lg hover:bg-amber-100 transition-colors">
                thanks, swing by again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

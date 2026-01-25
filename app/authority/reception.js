"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, HeartPulse, User, ChevronRight } from "lucide-react";
import { FaJediOrder } from "react-icons/fa";
import { FaFirstOrder } from "react-icons/fa6";

export default function Reception() {
  const router = useRouter();
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [isHovering, setIsHovering] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDesignation) return;

    if (selectedDesignation === "client") {
      router.push(`/dashboard`);
    } else {
      router.push(`/authority/signIn?rank=${selectedDesignation}`);
    }
  };

  const designations = [
    {
      id: "admin",
      title: "Administrator",
      icon: Shield,
      description: "Full system control & analytics",
      perks: ["User management", "Revenue analytics", "System configuration"],
      emoji: "👑",
    },
    {
      id: "therapist",
      title: "Therapist",
      icon: HeartPulse,
      description: "Client care & session management",
      perks: ["Session scheduling", "Treatment plans", "Client notes"],
      emoji: "🧘",
    },
    {
      id: "client",
      title: "Client",
      icon: User,
      description: "Basic access & bookings",
      perks: ["View appointments", "Book sessions", "Personal profile"],
      emoji: "👤",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12 pt-8 md:pt-12">
          <div className="inline-flex items-center justify-center mb-5 md:mb-6">
            <div className="relative">
              <div className="relative bg-slate-800 p-3 md:p-4 rounded-xl border border-slate-700 shadow-lg">
                <FaFirstOrder className="w-7 md:w-8 h-7 text-white" />
              </div>
            </div>
            <FaJediOrder className="w-5 md:w-6 lg:w-8 h-7 text-amber-300 ml-3" />
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-violet-200 to-emerald-200 bg-clip-text text-transparent mb-3 md:mb-4 px-2">
            Choose Your Designation
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-md md:max-w-lg mx-auto px-2 leading-relaxed">
            Select your role to access customized tools and features
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 mb-10 md:mb-12 px-2 md:px-0">
          {designations.map((role) => {
            const isSelected = selectedDesignation === role.id;
            const isHovered = isHovering === role.id;
            const Icon = role.icon;

            return (
              <div
                key={role.id}
                onClick={() => setSelectedDesignation(role.id)}
                onMouseEnter={() => setIsHovering(role.id)}
                onMouseLeave={() => setIsHovering(null)}
                className={`cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "scale-[1.02] -translate-y-1"
                    : isHovered
                      ? "scale-[1.01] -translate-y-0.5"
                      : ""
                }`}
              >
                {/* Card */}
                <div
                  className={`relative p-5 md:p-6 lg:p-8 rounded-xl border-2 transition-all duration-300 ${
                    isSelected
                      ? "border-violet-400 bg-white/5"
                      : "border-slate-700 bg-slate-800/50"
                  }`}
                >
                  {/* Card header */}
                  <div className="flex items-start justify-between mb-5 md:mb-6">
                    <div className="flex-1">
                      <div
                        className={`inline-flex items-center justify-center p-2.5 md:p-3 rounded-lg mb-3 md:mb-4 transition-all ${
                          isSelected ? "bg-white/10" : "bg-slate-700/40"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 ${
                            isSelected ? "text-white" : "text-slate-400"
                          }`}
                        />
                      </div>
                      <h3
                        className={`text-lg md:text-xl font-bold mb-1.5 md:mb-2 truncate ${
                          isSelected ? "text-white" : "text-slate-300"
                        }`}
                      >
                        {role.title}
                      </h3>
                      <p
                        className={`text-sm transition-colors ${
                          isSelected ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        {role.description}
                      </p>
                    </div>
                    <span className="text-2xl md:text-3xl ml-2">
                      {role.emoji}
                    </span>
                  </div>

                  {/* Perks list */}
                  <ul className="space-y-2 md:space-y-2.5 mb-6 lg:mb-8">
                    {role.perks.map((perk, index) => (
                      <li key={index} className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full mr-2.5 md:mr-3 flex-shrink-0 ${
                            isSelected
                              ? "bg-gradient-to-r from-violet-400 to-emerald-400"
                              : "bg-slate-600"
                          }`}
                        ></div>
                        <span
                          className={`text-sm transition-colors ${
                            isSelected ? "text-slate-300" : "text-slate-500"
                          }`}
                        >
                          {perk}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Selection indicator */}
                  <div
                    className={`absolute top-4 md:top-6 right-4 md:right-6 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-violet-400 bg-gradient-to-r from-violet-500 to-purple-600"
                        : "border-slate-600"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white"></div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue Button - REMOVED backdrop-blur-sm */}
        <div className="flex justify-center px-2 md:px-0">
          <button
            onClick={handleSubmit}
            disabled={!selectedDesignation}
            className={`group relative w-full max-w-md md:max-w-lg lg:max-w-xl px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-medium text-base md:text-lg transition-all duration-300 ${
              selectedDesignation
                ? "hover:scale-[1.02] active:scale-95"
                : "cursor-not-allowed"
            }`}
          >
            {/* Button glow - only when selected */}
            {selectedDesignation && (
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-purple-600 to-emerald-600 rounded-xl opacity-30"></div>
            )}

            {/* Button content - REMOVED backdrop-blur-sm */}
            <div
              className={`relative flex items-center justify-center gap-3 w-full px-6 md:px-8 py-3.5 md:py-4 rounded-xl border-2 ${
                selectedDesignation
                  ? "bg-slate-900 text-white border-slate-700"
                  : "bg-slate-800/80 text-slate-400 border-slate-700"
              }`}
            >
              {selectedDesignation ? (
                <>
                  <span className="font-medium text-base md:text-lg">
                    Continue as {selectedDesignation}
                  </span>
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
                </>
              ) : (
                <span className="font-medium text-base md:text-lg">
                  Select a role to continue
                </span>
              )}
            </div>
          </button>
        </div>

        {/* Footer note */}
        <div className="text-center mt-8 md:mt-10 lg:mt-12 pt-5 md:pt-6 border-t border-slate-800 px-2 md:px-0">
          <p className="text-sm text-slate-500 leading-relaxed">
            Your selection determines dashboard layout, features, and
            permissions.
          </p>
        </div>
      </div>
    </div>
  );
}

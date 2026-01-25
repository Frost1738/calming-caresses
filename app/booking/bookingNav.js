"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, Users, CircleDollarSign, FileText } from "lucide-react";
import { GiStoneTower } from "react-icons/gi";
import { GiStoneStack } from "react-icons/gi";

export default function BookingNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      href: "/dashboard",
      label: "home",
      icon: <GiStoneTower className="w-5 h-5" />,
    },
    {
      href: "/schedule",
      label: "date",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      href: "/booking/massages",
      label: "massage",
      icon: <GiStoneStack className="w-5 h-5" />,
    },
    {
      href: "/booking/receipts",
      label: "receipts",
      icon: <FileText className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 bg-gradient-to-r from-cyan-950 via-emerald-800 to-cyan-800 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start h-16">
            {/* Logo */}
            <div className="flex items-center gap-3 mr-8">
              <div className="flex flex-col">
                <span className="font-bold text-gray-400 text text-lg">
                  Booking
                </span>
                <span className="text-xs text-gray-400 -mt-1">
                  Therapeutic Care
                </span>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 flex justify-end">
              <div className="flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex group items-center gap-2 px-4 py-2.5 rounded-lg text-amber-900/80 hover:text-amber-900 font-medium hover:bg-gradient-to-r hover:from-amber-200 hover:via-orange-200 hover:to-yellow-200 transition-all duration-300 hover:scale-105"
                  >
                    <span className="text-amber-500 group-hover:text-black">
                      {item.icon}
                    </span>
                    <span className="capitalize group-hover:text-emerald-950 text-amber-50 ">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-cyan-950 via-emerald-800 to-cyan-800 z-50">
        <div className="px-4">
          <div className="flex items-center justify-between h-14">
            {/* Mobile logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-orange-700  flex items-center justify-center">
                <span className="text-black font-bold text-sm">🖤</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-400 text-sm">
                  Wellness Hub
                </span>
                <span className="text-[10px] text-gray-400 -mt-0.5">
                  Therapeutic Care
                </span>
              </div>
            </div>

            {/* Menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:bg-gradient-to-r hover:from-amber-200 hover:via-orange-200 hover:to-yellow-200 transition-colors"
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Mobile dropdown */}
          {isMenuOpen && (
            <div className="absolute top-14 left-0 right-0 bg-gradient-to-b from-orange-100 via-amber-100 to-yellow-100 py-2 px-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 group px-4 py-3 rounded-lg text-amber-900/80 hover:text-amber-900 hover:bg-gradient-to-r hover:from-amber-200 hover:via-orange-200 hover:to-yellow-200 transition-all duration-300"
                >
                  <span className="text-amber-900 group-hover:text-black w-6">
                    {item.icon}
                  </span>
                  <span className="font-medium capitalize group-hover:text-emerald-950 text-emerald-950">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-14 md:h-16"></div>
    </>
  );
}

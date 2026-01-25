"use client";

import Link from "next/link";
import React, { useState } from "react";
import { TiThMenuOutline } from "react-icons/ti";
import { RiHomeHeartFill } from "react-icons/ri";
import { BsCalendarHeartFill } from "react-icons/bs";
import { LuNotepadTextDashed } from "react-icons/lu";

export default function MiniSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const colors = {
    menuBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Purple gradient
    menuItemHover: "#ec4899", // Pink
    iconColor: "#ffffff", // White
    textColor: "#ffffff", // White
    shadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
  };

  const toggleMenu = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      if (!isOpen) {
        setIsOpen(true);
        setTimeout(() => {
          setIsAnimating(false);
        }, 10);
      } else {
        setTimeout(() => {
          setIsOpen(false);
          setIsAnimating(false);
        }, 300);
      }
    }
  };

  return (
    <>
      <div
        className="absolute top-[1rem] left-[1rem] z-50 cursor-pointer p-2   transition-all"
        onClick={toggleMenu}
      >
        <TiThMenuOutline size={24} className="text-white" />
      </div>

      {isOpen && (
        <div
          className={`absolute top-[1rem] xs:w-[40%] w-[50%] sm:w-[30%] md:w-[25%] lg:w-[20%] xl:w-[12%] h-[10rem] flex flex-col items-center z-40 ml-[1rem]
            ${isAnimating && !isOpen ? "menu-scale-out" : "menu-scale-in"}`}
          style={{
            transformOrigin: "top left",
          }}
        >
          <div
            className="w-[90%] rounded-xl h-[90%] mt-4 shadow-xl"
            style={{
              background: colors.menuBg,
              boxShadow: colors.shadow,
            }}
          >
            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
              <div
                className="h-[2rem] mb-[1rem] mt-[9px] flex items-center transition-all hover:scale-105 py-[4px] group"
                style={{
                  color: colors.textColor,
                }}
              >
                <RiHomeHeartFill
                  size={20}
                  className="mr-[1rem] ml-[5px]"
                  style={{ color: colors.iconColor }}
                />
                <h2 className="text-sm font-medium group-hover:text-pink-200 transition-colors">
                  home
                </h2>
              </div>
            </Link>
            <Link href="/authority/therapist" onClick={() => setIsOpen(false)}>
              <div
                className="h-[2rem] mb-[1rem] flex items-center transition-all hover:scale-105 py-[4px] group"
                style={{
                  color: colors.textColor,
                }}
              >
                <BsCalendarHeartFill
                  className="mr-[1rem] ml-[5px]"
                  style={{ color: colors.iconColor }}
                />
                <h2 className="text-sm font-medium group-hover:text-pink-200 transition-colors">
                  appointments
                </h2>
              </div>
            </Link>
            <Link
              href="/authority/therapist/tips"
              onClick={() => setIsOpen(false)}
            >
              <div
                className="h-[2rem] mb-[1rem] max-sm:w-[90%] flex items-center transition-all hover:scale-105 py-[4px] group"
                style={{
                  color: colors.textColor,
                }}
              >
                <LuNotepadTextDashed
                  className="mr-[1rem] ml-[5px]"
                  style={{ color: colors.iconColor }}
                />
                <h2 className="text-sm font-medium group-hover:text-pink-200 transition-colors">
                  give tips
                </h2>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

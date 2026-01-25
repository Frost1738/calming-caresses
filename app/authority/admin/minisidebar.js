"use client";

import Link from "next/link";
import React, { useState } from "react";
import { TiThMenuOutline } from "react-icons/ti";
import { RiHomeHeartFill } from "react-icons/ri";

import { GiFountainPen } from "react-icons/gi";
import { GiFrostfire } from "react-icons/gi";
import { BsBarChart } from "react-icons/bs";
import { FaAward } from "react-icons/fa";

export default function MiniSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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
        className="absolute top-[1rem] left-[1rem] z-50 cursor-pointer"
        onClick={toggleMenu}
      >
        <TiThMenuOutline size={24} className="text-neutral-500" />
      </div>

      {isOpen && (
        <div
          className={`absolute top-[1rem] xs:w-[40%] w-[50%] sm:w-[30%] md:w-[25%] lg:w-[20%] xl:w-[17%]  h-[19rem] flex flex-col items-center z-40 ml-[1rem]
            ${isAnimating && !isOpen ? "menu-scale-out" : "menu-scale-in"}`}
          style={{
            transformOrigin: "top left",
          }}
        >
          <div className="w-[90%] bg-[#705D56] rounded-md h-[90%] mt-4 shadow-lg">
            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
              <div className="h-[2rem] mb-[1rem] mt-[9px] flex items-center hover:bg-[#8B7355] transition-all duration-300 ease-out py-[4px] group border-l-4 border-transparent ">
                <RiHomeHeartFill
                  size={20}
                  className="mr-[1rem] ml-[5px] text-[#F0E6D2] group-hover:text-[#FFEBC1]"
                />
                <h2 className="text-sm text-[#F0E6D2] group-hover:text-[#FFEBC1] tracking-wide">
                  home
                </h2>
              </div>
            </Link>

            <Link href="/authority/admin" onClick={() => setIsOpen(false)}>
              <div className="h-[2rem] mb-[1rem] max-sm:w-[90%] flex items-center hover:bg-[#7D5A50] transition-all duration-300 ease-out py-[4px] group border-l-4 border-transparent ">
                <GiFountainPen className="mr-[1rem] ml-[5px] text-[#F0E6D2] group-hover:text-[#FFD8A8]" />
                <h2 className="text-sm text-[#F0E6D2] group-hover:text-[#FFD8A8] tracking-wide">
                  enroll
                </h2>
              </div>
            </Link>

            <Link
              href="/authority/admin/demote"
              onClick={() => setIsOpen(false)}
            >
              <div className="h-[2rem] mb-[1rem] flex items-center hover:bg-[#6D4C3D] transition-all duration-300 ease-out py-[4px] group border-l-4 border-transparent ">
                <GiFrostfire className="mr-[1rem] ml-[5px] text-[#F0E6D2] group-hover:text-[#FFA94D]" />
                <h2 className="text-sm text-[#F0E6D2] group-hover:text-[#FFA94D] tracking-wide">
                  demotion
                </h2>
              </div>
            </Link>

            <Link
              href="/authority/admin/statistics"
              onClick={() => setIsOpen(false)}
            >
              <div className="h-[2rem] mb-[1rem] max-sm:w-[90%] flex items-center hover:bg-[#5C4A42] transition-all duration-300 ease-out py-[4px] group border-l-4 border-transparent ">
                <BsBarChart className="mr-[1rem] ml-[5px] text-[#F0E6D2] group-hover:text-[#A5D8FF]" />
                <h2 className="text-sm text-[#F0E6D2] group-hover:text-[#A5D8FF] tracking-wide">
                  statistics
                </h2>
              </div>
            </Link>

            <Link
              href="/authority/admin/performers"
              onClick={() => setIsOpen(false)}
            >
              <div className="h-[2rem] mb-[1rem] max-sm:w-[90%] flex items-center hover:bg-[#4A3B32] transition-all duration-300 ease-out py-[4px] group border-l-4 border-transparent ">
                <FaAward className="mr-[1rem] ml-[5px] text-[#F0E6D2] group-hover:text-[#FFEEAD]" />
                <h2 className="text-sm text-[#F0E6D2] group-hover:text-[#FFEEAD] tracking-wide">
                  top performers
                </h2>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

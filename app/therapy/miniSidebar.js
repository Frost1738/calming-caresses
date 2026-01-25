"use client";

import Link from "next/link";
import React, { useState } from "react";
import { TiThMenuOutline } from "react-icons/ti";
import { RiHomeHeartFill } from "react-icons/ri";
import { TbBodyScan } from "react-icons/tb";
import { IoBody } from "react-icons/io5";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

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
        className="absolute top-[1rem] left-[1rem] z-[2] cursor-pointer"
        onClick={toggleMenu}
      >
        <TiThMenuOutline size={24} className="text-neutral-500" />
      </div>

      {isOpen && (
        <div
          className={`absolute top-[1rem] xs:w-[40%] w-[50%] sm:w-[30%] md:w-[25%] lg:w-[20%] xl:w-[17%]  h-[20rem] flex flex-col items-center z-[1] ml-[1rem]
            ${isAnimating && !isOpen ? "menu-scale-out" : "menu-scale-in"}`}
          style={{
            transformOrigin: "top left",
          }}
        >
          <div className="w-[90%] bg-[#705D56] rounded-md h-[90%] mt-4">
            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
              <div className="h-[2rem] mb-[1rem] mt-[9px] flex items-center  hover:bg-[#F6C28B] transition-colors py-[4px]">
                <RiHomeHeartFill size={20} className="mr-[1rem] ml-[5px]" />
                <h2 className="text-sm">Dashboard</h2>
              </div>
            </Link>
            <Link href="/therapy" onClick={() => setIsOpen(false)}>
              <div className="h-[2rem] mb-[1rem] flex items-center  hover:bg-[#F6C28B] transition-colors py-[4px]">
                <IoBody className="mr-[1rem] ml-[5px]" />{" "}
                <h2 className="text-sm">Bodywork</h2>
              </div>
            </Link>
            <Link href="/therapy/experiences" onClick={() => setIsOpen(false)}>
              <div className="h-[2rem] mb-[1rem] max-sm:w-[90%] flex  items-center  hover:bg-[#F6C28B] transition-colors py-[4px]">
                <IoChatboxEllipsesOutline className="mr-[1rem] ml-[5px] " />{" "}
                <h2 className="text-sm">Experiences</h2>
              </div>
            </Link>
            <Link
              href="/therapy/recommendations"
              onClick={() => setIsOpen(false)}
            >
              <div className="h-[2rem] mb-[1rem] flex items-center hover:bg-[#F6C28B] transition-colors justify-around py-[4px]">
                <TbBodyScan />
                <h2 className="text-sm">Personal recommendations</h2>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

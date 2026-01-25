"use client";

import React, { useContext } from "react";
import { MenuContext } from "./menuContext";
import Link from "next/link";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { TbPhysotherapist } from "react-icons/tb";
import { IoPersonSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import LogoutButton from "../authentication/logOut";
import { TbBadgesFilled } from "react-icons/tb";
//bg-[#D5C7BC]
//bg-[#ADA8BE] badge

//bg-[#C6CAED]

//bg-[#A57548]

//bg-[#734C29] best

//bg-[#1E2019]

export default function Sidebar({ children }) {
  const { isOpen } = useContext(MenuContext);
  return (
    <div
      className={`fixed left-0 z-50 top-0 h-screen w-[60%]  xs:w-[40%] sm:w-[30%] md:w-[25%] lg:w-[20%] bg-[#D5C7BC] gap-[1px]
                  transition-transform duration-300 ease-in-out flex justify-start flex-col items-center
                  ${isOpen ? "translate-x-0" : "-translate-x-full "}`}
    >
      <div className="bg-[#97776b] h-[250px] flex justify-center items-start pt-8 [clip-path:polygon(50%_100%,100%_80%,100%_0%,0%_0%,0%_80%)] rounded-md w-[97%]">
        {children}
      </div>
      <div className="h-[60%] w-[100%] ml-[20px]">
        <Link href="/dashboard">
          <div className="h-[2rem] mb-[1rem]  flex   items-center">
            <MdOutlineDashboardCustomize className="mr-[1rem] text-black" />{" "}
            <h2 className="text-sm text-black">dashboard</h2>
          </div>
        </Link>
        <Link href="/therapy">
          <div className="h-[2rem] mb-[1rem] flex  max-sm:w-[90%] items-center">
            <TbPhysotherapist className="mr-[1rem] text-black" />{" "}
            <h2 className="text-sm text-black">massage therapy</h2>
          </div>
        </Link>
        <Link href="/therapist">
          <div className="h-[2rem] mb-[1rem] flex  items-center">
            <IoPersonSharp className="mr-[1rem] text-black" />{" "}
            <h2 className="text-sm text-black">therapist</h2>
          </div>
        </Link>
        <Link href="/booking">
          <div className="h-[2rem] mb-[1rem] flex  items-center">
            <FaCalendarAlt className="mr-[1rem] text-black" />{" "}
            <h2 className="text-sm text-black">booking</h2>
          </div>
        </Link>
        <Link href="/authority">
          <div className="h-[2rem] mb-[1rem] flex  items-center">
            <TbBadgesFilled className="mr-[1rem] text-black" />{" "}
            <h2 className="text-sm text-black">rank up</h2>
          </div>
        </Link>
      </div>
      <LogoutButton />
    </div>
  );
}

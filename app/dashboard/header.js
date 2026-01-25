"use client";
import React, { useContext } from "react";
import { ImMenu } from "react-icons/im";
import { MenuContext } from "./menuContext";
import { getInitials } from "../therapy/experiences/experience";

export default function Header({ children, displayName }) {
  const { isOpen, setIsOpen } = useContext(MenuContext);

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="h-[4rem] md:h-[5rem]  p-[1rem] bg-[radial-gradient(circle_at_center,rgba(148,110,21,0.4)_0%,rgba(26,15,10,1)_50%,rgba(0,0,0,1)_100%)] flex justify-between">
      <span className="w-auto items-center flex justify-between sm:ml-[2rem]">
        <ImMenu
          className="mr-[9px] xs:mr-[2rem] min-w-[9px] z-50 text-gray-500 cursor-pointer "
          onClick={handleToggle}
        />
        {children}
      </span>
      <span className="w-auto max-xxs:w-[70%] flex justify-between items-center sm:mr-[3rem] md:mr-[5rem]">
        <div className="h-[2rem] w-[2rem] rounded-4xl max-xxs:pt-[9px] max-xxs:text-xs pt-[3px] bg-gray-600 max-xxs:text-[#F7F9F7] text-center  max-sm:pb-[2px] ">
          {getInitials(displayName)}
        </div>
        <h2 className="inline-block md:pl-[4rem] pl-[1rem] text-neutral-400">
          welcome, {displayName}
        </h2>
      </span>
    </div>
  );
}

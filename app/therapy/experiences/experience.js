"use client";

import React, { useContext } from "react";
import { GiNorthStarShuriken } from "react-icons/gi";

export function getInitials(fullName) {
  if (
    !fullName ||
    typeof fullName !== "string" ||
    fullName.trim().length === 0
  ) {
    return "";
  }
  const nameParts = fullName.trim().split(/\s+/);

  const initialsArray = nameParts.map((name) => {
    if (name.length > 0) {
      return name.charAt(0).toUpperCase();
    }
    return "";
  });

  return initialsArray.join("");
}

export default function Experience({ message, stars, name, massageTitle }) {
  //mb-[8rem] xxs:mb-[6rem] xs:mb-[3rem] sm:mb-[2rem]

  return (
    <div className="min-h-[5rem] h-auto w-[99%]  relative xxs:m-[5px]  ">
      <div className="min-h-[5rem] h-auto w-[100%] bg-[#FFFBFF] flex justify-start items-center pl-[2px] rounded-4xl">
        <div className="h-[4rem] w-[4rem]   bg-[#362417] text-amber-100  rounded-4xl flex justify-center items-center ">
          {getInitials(name)}
        </div>
        <span className="w-[90%] xxs:w-[75%] max-xxs:w-[70%] ml-[10px] ">
          <h3 className={` font-[family-name:var(--font-jost)] font-semibold `}>
            {name}&apos;s view on the {massageTitle} is
          </h3>
          <span className="flex ">
            {Array.from({ length: stars }, (_, index) => (
              <GiNorthStarShuriken color="#00000" key={index} />
            ))}
          </span>
          <p>{message}</p>
        </span>
      </div>
    </div>
  );
}

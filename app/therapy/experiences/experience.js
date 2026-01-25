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

function calculateMargin(text, basePadding) {
  if (!text || typeof text !== "string") return basePadding;
  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  const wordCount = words.length;

  const multiplier = wordCount > 7 ? 3 : 1;

  return basePadding * multiplier;
}

const marginY = 1;

export default function Experience({ message, stars, name, massageTitle }) {
  return (
    <li className={`min-h-[5rem]  mb-4 h-auto w-[99%]  relative xxs:m-[5px]`}>
      <div className="min-h-[5rem] h-auto w-[100%] bg-[#FFFBFF] flex justify-start items-center pl-[2px] rounded-4xl">
        <div className="h-[4rem] w-[4rem]   bg-[#362417] text-amber-100  rounded-4xl flex justify-center items-center ">
          {getInitials(name)}
        </div>
        <span className="w-[90%] xxs:w-[75%] max-xxs:w-[70%] ml-[10px] ">
          <h3
            className={` font-[family-name:var(--font-jost)] text-black font-semibold `}
          >
            {name}&apos;s view on the {massageTitle} is
          </h3>
          <span className="flex ">
            {Array.from({ length: stars }, (_, index) => (
              <GiNorthStarShuriken
                color="#00000"
                className="text-black"
                key={index}
              />
            ))}
          </span>
          <p className="text-black">{message}</p>
        </span>
      </div>
    </li>
  );
}

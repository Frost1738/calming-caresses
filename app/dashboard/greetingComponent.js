"use client";
import React from "react";
import { getTimeOfDay } from "../helpers/helper";
const timeGreeting = getTimeOfDay();

export default function GreetingComponent() {
  return (
    <h2 className="relative z-10 text-blue-300 xs:text-xl text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl px-4 text-center">
      Good {timeGreeting}
    </h2>
  );
}

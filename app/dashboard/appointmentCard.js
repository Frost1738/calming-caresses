"use client";
import React from "react";

// Image URL as a constant for better visibility and maintainability
const IMAGE_URL =
  "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/Flower__pot/Zc4Zmpb3vNYDr5s3AhfQ--0--0okaa.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGbG93ZXJfX3BvdC9aYzRabXBiM3ZOWURyNXMzQWhmUS0tMC0tMG9rYWEuanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MzE3ODg2MCwiZXhwIjoxODE0NzE0ODYwfQ.JMueGzdYAsJFJuxuOUhXFEUtxMhJbRDB3g64xKGC4LY";

export default function AppointmentCard({ date, time, therapist, session }) {
  return (
    <div
      className="w-[90%] h-[19rem] xl:h-[25rem] xl:max-w-[500px] rounded-xl flex justify-center items-center p-4 m-2 bg-cover bg-center"
      style={{ backgroundImage: `url(${IMAGE_URL})` }}
    >
      {/* Labels Column */}
      <div className="h-full w-[30%] flex flex-col gap-3">
        <div className="w-full h-[20%] flex justify-center items-center bg-[#A3BCF9] rounded-lg p-2 text-[#172A3A] text-center text-xs md:text-sm lg:text-base whitespace-nowrap">
          Date:
        </div>
        <div className="w-full h-[20%] flex justify-center items-center bg-[#A3BCF9] rounded-lg p-2 text-[#172A3A] text-center text-xs md:text-sm lg:text-base whitespace-nowrap">
          Time:
        </div>
        <div className="w-full h-[20%] flex justify-center items-center bg-[#A3BCF9] rounded-lg p-2 text-[#172A3A] text-center text-xs md:text-sm lg:text-base whitespace-nowrap">
          Therapist:
        </div>
        <div className="w-full h-[20%] flex justify-center items-center bg-[#A3BCF9] rounded-lg p-2 text-[#172A3A] text-center text-xs md:text-sm lg:text-base whitespace-nowrap">
          Experience:
        </div>
      </div>

      {/* Values Column */}
      <div className="h-full w-[65%] ml-2 flex flex-col gap-3">
        <div className="w-full h-[20%] flex justify-center items-center bg-[#6F185D] text-amber-100 rounded-lg text-center text-xs md:text-sm lg:text-base p-2">
          {date}
        </div>
        <div className="w-full h-[20%] flex justify-center items-center bg-[#6F185D] text-amber-100 rounded-lg text-center text-xs md:text-sm lg:text-base p-2">
          {time}
        </div>
        <div className="w-full h-[20%] flex justify-center items-center bg-[#6F185D] text-amber-100 rounded-lg text-center text-xs md:text-sm lg:text-base p-2">
          {therapist}
        </div>
        <div className="w-full h-[20%] flex justify-center items-center bg-[#6F185D] text-amber-100 rounded-lg text-center text-xs md:text-sm lg:text-base p-2">
          {session}
        </div>
      </div>
    </div>
  );
}

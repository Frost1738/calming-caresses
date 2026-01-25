"use client";
import React from "react";

export default function AppointmentCard({ date, time, therapist, session }) {
  return (
    <div className="w-[90%] max-xxs:w-[75%] md:h-[20rem] xxs:w-[80%] mdxs:w-[70%] xs:w-[60%] sm:w-[50%] md:w-[40%] lg:w-[35%] xl:w-[30%]  h-[19rem]  xl:h-[25rem] xl:mr-[20px] xl:max-w-[500px] rounded-xl flex justify-center items-center bg-cover bg-[url(https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/background--mini--001/Lucid_Origin_an_image_of_delicate_red_plum_blossoms_resembling_1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYWNrZ3JvdW5kLS1taW5pLS0wMDEvTHVjaWRfT3JpZ2luX2FuX2ltYWdlX29mX2RlbGljYXRlX3JlZF9wbHVtX2Jsb3Nzb21zX3Jlc2VtYmxpbmdfMS5qcGciLCJpYXQiOjE3NjUxOTY3MTgsImV4cCI6MTc5NjczMjcxOH0.lqBTN24cJ_mygB4IxWTrP8XnQDD4nkb3ktesWodEsVM)] p-[1rem] bg-neutral-900 m-[7px]">
      <div className="h-[100%] w-[30%]">
        <div className="w-[100%] h-[20%] mb-[1rem] flex justify-center items-center  bg-[#A3BCF9] rounded-lg p-[14px] whitespace-nowrap text-ellipsis text-[#172A3A]">
          Date :
        </div>
        <div className="w-[100%] h-[20%] mb-[1rem] flex justify-center items-center bg-[#A3BCF9] rounded-lg whitespace-nowrap text-ellipsis text-[#172A3A]">
          Time :
        </div>
        <div className="w-[100%] h-[20%] max-xs:text-xs xs:text-xs md:text-xs lg:text-base mb-[1rem] flex justify-center items-center bg-[#A3BCF9] rounded-lg p-[14px] whitespace-nowrap text-ellipsis text-[#172A3A]">
          Therapist :
        </div>
        <div className="w-[100%] h-[20%] max-xs:text-xs max-xxs:text-[10px] xs:text-xs md:text-xs lg:text-base flex justify-center items-center bg-[#A3BCF9] rounded-lg p-[14px] whitespace-nowrap text-ellipsis text-[#172A3A]">
          Experience :
        </div>
      </div>
      <div className="w-[70%] h-[100%] ml-[10px] ">
        <div className="w-[100%] h-[20%] mb-[1rem] bg-[#6F185D] text-amber-100 flex justify-center items-center rounded-lg text-center text-[#172A3A]">
          {date}
        </div>
        <div className="w-[100%] h-[20%] mb-[1rem] bg-[#6F185D] flex justify-center text-amber-100 items-center rounded-lg text-center text-[#172A3A]">
          {time}
        </div>
        <div className="w-[100%] h-[20%] mb-[1rem] bg-[#6F185D] flex justify-center text-amber-100 items-center rounded-lg text-center text-[#172A3A]">
          {therapist}
        </div>
        <div className="w-[100%] h-[20%]  bg-[#6F185D] flex justify-center items-center text-amber-100 rounded-lg text-center text-[#172A3A]">
          {session}
        </div>
      </div>
    </div>
  );
}

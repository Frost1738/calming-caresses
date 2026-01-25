import React from "react";
import Sign_in_buttton from "./Buttons/sign-in_buttton";
import Image from "next/image";
import { montserratRegular, jostRegular } from "./layout";

export const metadata = {
  title: {
    default: "calming-caress",
    template: "%s | calming caress",
  },
};

export default function Page() {
  return (
    <div className="h-screen w-full relative overflow-x-hidden  text-white flex items-center justify-between bg-no-repeat bg-left bg-cover md:bg-[url('https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/upscale%201/upscalemedia-transformed%20(1).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1cHNjYWxlIDEvdXBzY2FsZW1lZGlhLXRyYW5zZm9ybWVkICgxKS5qcGVnIiwiaWF0IjoxNzY5MjcxNzgzLCJleHAiOjE4MDA4MDc3ODN9.YAKXfl5wUa_VlBg5GQC0uKCqva0i4Gr-qSKXDCKrlUs')] bg-[url('https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/background--001/0u3X8DDpJ9p1zIcckeqQ--0--ph7zz.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYWNrZ3JvdW5kLS0wMDEvMHUzWDhERHBKOXAxekljY2tlcVEtLTAtLXBoN3p6LmpwZyIsImlhdCI6MTc2NDc4MDYzMCwiZXhwIjoxNzk2MzE2NjMwfQ.7cUTLzgTU15-tDCKSMgE_TFwWYgUPHL7iIwHS4eBdIU')]">
      <div className="h-[100%] w-[25%] flex justify-center items-start">
        <Image
          width={120}
          height={100}
          src="/icon2.png"
          alt="icon image"
          className="mt-[3rem] "
        />
      </div>
      <div className="h-[100%] w-[50%]  flex justify-center items-center ">
        <div className=" absolute  xl:top-[13.5vw]  top-1/5 pr--{10px} h-[20rem] sm:w-[40%] w-[90%]  flex justify-center flex-col ">
          <h1
            className={` ${jostRegular.className} font-semibold  text-4xl md:text-4xl  xl:text-5xl font-extrabold text-gray-50 `}
          >
            welcome to calming caresses 🍂
          </h1>
          <h1
            className={`${montserratRegular.className} text-2xl sm:text-2xl xl:text-4xl text-gray-400 tracking-widest`}
          >
            Relax and get pampered.
          </h1>
        </div>
      </div>
      <div className=" h-[100%] w-[25%] flex justify-center items-start pt-[3.5rem] md:pt-0">
        <Sign_in_buttton>Hello</Sign_in_buttton>
      </div>
    </div>
  );
}

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
    <div className="h-screen w-full relative overflow-x-hidden  text-white flex items-center justify-between bg-no-repeat bg-left bg-cover md:bg-[url('https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/background--001--big/upscalemedia-transformed%20(1).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYWNrZ3JvdW5kLS0wMDEtLWJpZy91cHNjYWxlbWVkaWEtdHJhbnNmb3JtZWQgKDEpLmpwZWciLCJpYXQiOjE3NzA4ODAxNTYsImV4cCI6MTgwMjQxNjE1Nn0.L8xYz_kX0vvFoZwGvsC_0oqLKuguNpUBmSwOxOAksik')] bg-[url('https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/background--001/0u3X8DDpJ9p1zIcckeqQ--0--65bi5.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYWNrZ3JvdW5kLS0wMDEvMHUzWDhERHBKOXAxekljY2tlcVEtLTAtLTY1Ymk1LmpwZyIsImlhdCI6MTc3MDg3OTQ2MCwiZXhwIjoxODAyNDE1NDYwfQ.NU6Q8oBoSMuTMR0eqjH6m1VusmvMblwYq7Cck47xEF0')]">
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

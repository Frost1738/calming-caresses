import React from "react";
import { badScript } from "../layout";

export default function AfterCare({ postSessionTips }) {
  const postSessionTip = postSessionTips || {
    id: 2,
    created_at: "",
    firstMaintip: "",
    firstExplanation: "",
    secondMaintip: "",
    secondExplanation: "",
    bonusTip: "",
    client_name: "",
    therapist_name: "",
    clientName: "",
    serviceConsumed: "",
  };
  return (
    <div className="w-[90%] lg:h-[90%] xl:h-[80%]  h-[80%] max-sm:h-[80%] max-xs:h-[70%] max-xxs:h-[50%]   bg-amber-200 rounded-md flex">
      <div className="h-[100%] rounded-md w-[55%] [clip-path:polygon(0%_0%,100%_0%,80%_100%,0%_100%)] bg-cover bg-[url(https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/background-mini--002/g7FysI3l3M6n9h1nLCba--0--4seq2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYWNrZ3JvdW5kLW1pbmktLTAwMi9nN0Z5c0kzbDNNNm45aDFuTENiYS0tMC0tNHNlcTIuanBnIiwiaWF0IjoxNzY1MjExNDk4LCJleHAiOjE3OTY3NDc0OTh9.-4Y9n1t7vwzOGHn2bU8sUzg-JVsmUUZhXng17-jxQu8)] bg-blue-950"></div>
      <div className="h-[100%]  w-[45%] ">
        <h1 className="font-semibold md:text-3xl md:mb-[1rem] mt-[18px] mb-[7px] max-xxs:text-xs text-[#172A3A]">
          🧘post session tip
        </h1>
        <p className="text-xs xs:text-sm sm:text-base lg:text-lg  xl:text-2xl xl:mb-[36px] md:mb-[1rem] font-[family-name:var(--font-quicksand)] xs:p-[2px] max-xxs:mb-[10px] xxs:mb-[6px] xs:mb-[15px] text-[#172A3A]">
          since you just had a{" "}
          {postSessionTip.serviceConsumed || "deep tissue massage"} massage you
          may feel tender for the next 24-48 hours
        </p>

        <p className="text-xs xs:text-sm sm:text-base lg:text-lg xl:text-2xl xl:mb-[36px] md:mb-[1rem] font-[family-name:var(--font-quicksand)] xs:p-[2px] max-xxs:mb-[10px] xxs:mb-[6px] xs:mb-[15px] text-[#172A3A]">
          <span className="font-semibold lg:text-2xl w-auto mr-[2px] xl:text-3xl font-[family-name:var(--font-montserrat)]">
            {postSessionTip.firstMaintip || "stay hydrated 💦"}
          </span>{" "}
          {postSessionTip.firstExplation ||
            "to help flush out all the toxins and reduce soreness"}
        </p>

        <p className="text-xs xs:text-sm sm:text-base lg:text-lg xl:text-2xl xl:mb-[20px] md:mb-[1rem] xs:p-[2px] max-xxs:mb-[10px] xxs:mb-[6px] xs:mb-[15px] text-[#172A3A]">
          <span className="font-semibold lg:text-2xl mr-[7px] xl:text-3xl">
            {postSessionTip.secondMaintip || "gentle stretch"}
          </span>
          <span className="font-[family-name:var(--font-quicksand)]">
            {postSessionTip.secondExplanation ||
              " try a seated foward position or cat cow stretch to keep your back  loose"}
          </span>
        </p>
        <p className="text-xs xs:text-sm sm:text-base lg:text-lg xl:text-2xl xl:mb-[10px] md:mb-[1rem] font-[family-name:var(--font-quicksand)] xs:p-[2px] xxs:mb-[6px] xs:mb-[15px] text-[#172A3A]">
          <span className="font-semibold lg:text-2xl xl:text-3xl mr-[2px] font-[family-name:var(--font-montserrat)]">
            🎁bonus :
          </span>{" "}
          {postSessionTip.bonusTip ||
            "a warm epsom salt bath tonight can ease any lingering tension"}
        </p>
      </div>
    </div>
  );
}

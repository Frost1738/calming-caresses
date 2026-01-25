import React from "react";
import Experience from "./experience";
import { getReviews } from "@/app/ApiServices/getFunctions";

export default async function Page() {
  const data = await getReviews();

  return (
    <div className="h-[auto] min-h-[1000px] w-[100%] bg-[#92817A]  md:pt-[1rem] md:pl-[2rem]">
      <ul className="min-h-[1000px]   h-auto flex  flex-col justify-around">
        {data.map((review, index) => (
          <Experience
            message={review.comment}
            stars={review.stars}
            name={review.name}
            massageTitle={review.massageTitle}
            key={index}
          />
        ))}
      </ul>
    </div>
  );
}

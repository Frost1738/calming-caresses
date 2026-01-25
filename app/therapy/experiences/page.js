import React from "react";
import Experience from "./experience";
import { getReviews } from "@/app/ApiServices/getFunctions";

export default async function Page() {
  const data = await getReviews();
  console.log(data);

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

  const comment =
    "the main reason there are no stars is cause i left all of them in the massage room beautiful work";
  const marginY = 1;

  console.log(calculateMargin(comment, marginY)); // Now returns 1.5 because it's ~20 words

  return (
    <div className="h-[auto] min-h-[200px] w-[100%] bg-[#92817A]  md:pt-[1rem] md:pl-[2rem]">
      <ul className="max-xxs:min-h-[2000px] max-xs:min-h-[1200px] xs:min-h-[1000px] sm:min-h-[900px] md:min-h-[700px]  h-auto flex  flex-col justify-around">
        {data.map((review, index) => (
          <li
            key={index}
            className={`h-[7rem] w-auto mt-[1rem] sm:mb-[1px] mb-[${calculateMargin(
              review.comment,
              marginY
            )}rem]`}
          >
            <Experience
              message={review.comment}
              stars={review.stars}
              name={review.name}
              massageTitle={review.massageTitle}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

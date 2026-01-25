import React from "react";
import TherapistCards from "./TherapistCards";
import { getAllBookings, getTherapists } from "@/app/ApiServices/getFunctions";

export default async function Page({ params }) {
  const { profile } = await params;
  const therapists = await getTherapists(profile);
  const bookings = await getAllBookings();

  return (
    <div className="min-h-screen h-auto w-full bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <div className="relative z-10 min-h-[100vh] h-auto w-full flex flex-wrap justify-center items-center p-4 md:p-8 gap-4 md:gap-8">
        {therapists.map((therapist, index) => (
          <div
            key={therapist.id || index}
            className="m-2 md:m-4 transform hover:scale-[1.02] transition-transform   max-xxs:w-[89%] xs:w-[60%] sm:w-[40%] lg:w-[26%] xl:w-[27%] m flex justify-center items-center duration-300"
          >
            <TherapistCards
              id={therapist.id}
              name={therapist.name}
              speciality={therapist.speciality}
              experience={therapist.experience}
              rating={therapist.rating}
              reviews={therapist.reviews}
              availability={therapist.availability}
              nextAvailable={therapist.nextAvailable}
              price={therapist.price}
              education={therapist.education}
              techniques={therapist.techniques}
              imageUrl={therapist.image}
              verified={therapist.verified}
              hours={therapist.hours}
              level={therapist.level}
              bookings={bookings}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

//

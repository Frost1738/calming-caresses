import React from "react";
import TherapistAppointments from "./therapistAppointments";
import { getTherapistsBooking } from "@/app/ApiServices/getFunctions";

export default async function Page({ searchParams }) {
  const { name } = await searchParams;
  const personalizedBookings = await getTherapistsBooking(name);

  return (
    <div>
      <TherapistAppointments
        personalizedBookings={personalizedBookings}
        name={name}
      />
    </div>
  );
}

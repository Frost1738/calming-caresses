import React, { useContext } from "react";
import MassageDatePicker from "./datePicker";
import BookingNav from "../bookingNav";

export default async function Page({ searchParams }) {
  const resolvedParams = await searchParams;

  const id = resolvedParams.therapistId;
  const name = resolvedParams.therapistName;

  return (
    <div>
      <BookingNav />
      <MassageDatePicker id={id} name={name} />
    </div>
  );
}

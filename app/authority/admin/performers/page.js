import React from "react";
import TopPerformersPage from "./performanceSummary";
import { getAllBookings } from "@/app/ApiServices/getFunctions";

export default async function Page() {
  const bookings = await getAllBookings();

  return (
    <div>
      <TopPerformersPage bookings={bookings} />
    </div>
  );
}

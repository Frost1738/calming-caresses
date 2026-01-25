import { getAllBookings } from "@/app/ApiServices/getFunctions";

import React from "react";
import StatisticsPage from "./statistics";

export default async function Page() {
  const bookings = await getAllBookings();

  return (
    <div>
      <StatisticsPage bookings={bookings} />
    </div>
  );
}

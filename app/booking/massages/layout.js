import React from "react";
import BookingNav from "../bookingNav";

export default function Layout({ children }) {
  return (
    <div>
      <BookingNav />
      {children}
    </div>
  );
}

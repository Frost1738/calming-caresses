import React from "react";
import BookingNav from "./bookingNav";
import CartProvider from "./cartContext";

export default function Layout({ children }) {
  return (
    <div className="w-auto h-auto overflow-hidden">
      <CartProvider>{children}</CartProvider>
    </div>
  );
}

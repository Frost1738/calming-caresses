"use client";

import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [therapistName, setTherapistName] = useState("kiki");
  const [therapistId, setTherapistId] = useState(0);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [massage, setMassage] = useState(null);
  const [isBooking, setisBooking] = useState(false);
  const [roomName, setRoomName] = useState(null);
  const [price, setPrice] = useState("0");

  const [duration, setDuration] = useState("0");

  console.log(price);
  console.log(duration);

  return (
    <CartContext.Provider
      value={{
        isBooking,
        roomName,
        therapistName,
        massage,
        time,
        therapistId,
        date,
        price,
        duration,
        setPrice,
        setDuration,
        setisBooking,
        setRoomName,
        setTherapistName,
        setTherapistId,
        setMassage,
        setDate,
        setTime,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

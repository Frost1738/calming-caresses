"use client";

import React, { createContext, useState } from "react";

export const TherapistContext = createContext();

export default function TherapistProvider({ children }) {
  const [therapistName, setTherapistName] = useState("bazuu");

  return (
    <TherapistContext.Provider value={{ therapistName, setTherapistName }}>
      {children}
    </TherapistContext.Provider>
  );
}

"use client";

import { createContext, useState } from "react";

export const TherapyContext = createContext();

export default function TherapyProvider({ children, initialUserName }) {
  const [userName, setUserName] = useState(initialUserName);
  const [formIsOpen, setFormIsOpen] = useState(false);

  return (
    <TherapyContext.Provider
      value={{ userName, setUserName, formIsOpen, setFormIsOpen }}
    >
      {children}
    </TherapyContext.Provider>
  );
}

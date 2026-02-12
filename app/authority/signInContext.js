"use client";
import React, { createContext, useState } from "react";

export const SignInContext = createContext();

export default function SignInProvider({ children }) {
  const [userName, setUserName] = useState("mimi");

  return (
    <SignInContext.Provider value={{ userName, setUserName }}>
      {children}
    </SignInContext.Provider>
  );
}

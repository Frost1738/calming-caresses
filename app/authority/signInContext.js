"use client";
import React, { createContext, useState } from "react";

export const SignInContext = createContext();

export default function SignInProvider({ children }) {
  const [userName, setUserName] = useState("mimi");
  console.log("mini bhyytryfyufu jjjj", userName);
  return (
    <SignInContext.Provider value={{ userName, setUserName }}>
      {children}
    </SignInContext.Provider>
  );
}

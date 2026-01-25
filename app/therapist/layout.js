import React from "react";
import TherapistNav from "./therapistNav";

export default function Layout({ children }) {
  return (
    <div className="w-[100vw] h-[100vh] overflow-x-hidden">
      <TherapistNav />
      <main className="w-[100vw] h-[100vh]">{children}</main>
    </div>
  );
}

import React from "react";
import MiniSidebar from "./miniSidebar";
import TherapistProvider from "./therapistContext";

export default function Layout({ children }) {
  return (
    <div>
      <MiniSidebar />
      <TherapistProvider>{children}</TherapistProvider>
    </div>
  );
}

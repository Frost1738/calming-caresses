import React from "react";
import MiniSidebar from "./minisidebar";

export default function Layout({ children }) {
  return (
    <div>
      <MiniSidebar />
      {children}
    </div>
  );
}

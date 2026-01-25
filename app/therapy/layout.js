import React from "react";
import MiniSidebar from "./miniSidebar";
import { unstable_noStore } from "next/cache";
import { supabase } from "../supabase/supabaseClient";
import TherapyProvider from "./therapyContext";

export default async function Layout({ children }) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    unstable_noStore();
  }

  const userName = user?.user_metadata?.display_name;
  console.log(userName);
  return (
    <div className="h-[100vh] w-[100vw] relative overflow-x-hidden">
      <MiniSidebar />
      <TherapyProvider initialUserName={userName}>{children}</TherapyProvider>
    </div>
  );
}

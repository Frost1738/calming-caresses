import React from "react";
import MenuProvider from "./menuContext";
import Sidebar from "./sidebar";
import Image from "next/image";
import Header from "./header";
import { unstable_noStore } from "next/cache";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { createSupabaseServerClient } from "../supabase/server";

export default async function Layout({ children }) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { session: supabaseSession },
  } = await supabase.auth.getSession();
  const supabaseUser = supabaseSession?.user;
  const supabaseMetadata = supabaseUser?.user_metadata;

  const session = await getServerSession(authOptions);

  // Check if ANY user exists (Supabase OR NextAuth)
  const hasAnyUser = !!supabaseUser || !!session?.user;

  if (!hasAnyUser) {
    unstable_noStore();
    console.log("⚠️ No user found from either auth system");
  }

  const displayName =
    supabaseMetadata?.display_name || // Supabase  name
    session?.user?.name || // NextAuth name
    "User";

  return (
    <div className="min-h-screen h-auto relative flex bg-amber-950 overflow-x-hidden">
      <MenuProvider>
        <Sidebar>
          <Image
            src="/icon2.png"
            className="mt-[2rem] lg:mr-[1rem]"
            alt="icon"
            height={60}
            width={60}
          />
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <Header displayName={displayName}>
            <Image src="/icon2.png" alt="icon" height={40} width={40} />
          </Header>
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </MenuProvider>
    </div>
  );
}

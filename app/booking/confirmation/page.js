import React from "react";
import BookingFinish from "./confirmation";
import { unstable_noStore } from "next/cache";
import { supabase } from "../../supabase/supabaseClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { createSupabaseServerClient } from "@/app/supabase/server";

export default async function page() {
  unstable_noStore();

  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getSession();

  // Safe destructuring with optional chaining and defaults
  const display_name =
    data?.session?.user?.user_metadata?.display_name || "Guest";
  const email = data?.session?.user?.user_metadata?.email || "";

  const session = await getServerSession(authOptions);

  const userName = display_name || session.user?.name;
  const userEmail = email || session?.user?.email;

  return (
    <div className="h-auto w-auto">
      <BookingFinish userName={userName} userEmail={userEmail} />
    </div>
  );
}

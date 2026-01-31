import React from "react";
import SignInPage from "./signInContent";
import SignInProvider from "../signInContext";
import { createSupabaseServerClient } from "@/app/supabase/server";
import { getRole } from "@/app/ApiServices/getFunctions";

export default async function Page({ searchParams }) {
  const supabase = await createSupabaseServerClient();
  const { rank } = await searchParams;

  const { data: sessionData } = await supabase.auth.getSession();

  const display_name =
    sessionData?.session?.user?.user_metadata?.display_name || "guest";

  const profile = await getRole(sessionData?.session?.user?.id);
  const [{ role }] = profile;

  return (
    <div>
      <SignInProvider>
        <SignInPage rank={rank} role={role} display_name={display_name} />
      </SignInProvider>
    </div>
  );
}

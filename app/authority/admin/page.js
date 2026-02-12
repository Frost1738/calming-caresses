import React from "react";
import EnrollmentPage from "./enroll";
import { createSupabaseServerClient } from "@/app/supabase/server";
import { getRole } from "@/app/ApiServices/getFunctions";

export default async function Page() {
  const supabase = await createSupabaseServerClient();

  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData?.session?.user;
  const profile = await getRole(sessionData?.session?.user?.id);
  const [{ role }] = profile;

  if (role == "admin") {
    return (
      <div>
        <EnrollmentPage />
      </div>
    );
  } else {
    return <h1>you don&apos;t have clearance</h1>;
  }
}

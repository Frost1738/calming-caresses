import React from "react";
import EnrollmentPage from "./enroll";
import { createSupabaseServerClient } from "@/app/supabase/server";

export default async function Page() {
  const supabase = await createSupabaseServerClient();

  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData?.session?.user;

  if (user?.role == "admin") {
    return (
      <div>
        <EnrollmentPage />
      </div>
    );
  }
}

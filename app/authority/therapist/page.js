import React from "react";
import TherapistAppointments from "./therapistAppointments";
import { getRole, getTherapistsBooking } from "@/app/ApiServices/getFunctions";
import { createSupabaseServerClient } from "@/app/supabase/server";

export default async function Page({ searchParams }) {
  const { name } = await searchParams;
  const personalizedBookings = await getTherapistsBooking(name);
  const supabase = await createSupabaseServerClient();

  const { data: sessionData } = await supabase.auth.getSession();

  const profile = await getRole(sessionData?.session?.user?.id);
  const [{ role }] = profile;

  if (role == "therapist") {
    return (
      <div>
        <TherapistAppointments
          personalizedBookings={personalizedBookings}
          name={name}
        />
      </div>
    );
  }
}

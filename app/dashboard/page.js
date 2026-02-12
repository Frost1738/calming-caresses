import React from "react";
import AppointmentCard from "./appointmentCard";
import AfterCare from "./afterCare";
import PackageCard from "./packageCard";

import {
  getAppointments,
  getPostSessionTip,
} from "../ApiServices/getFunctions";

import { unstable_noStore } from "next/cache";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import AppointmentsSlider from "./appointmentSlider";
import {
  datesPastToday,
  filterOutPastAppointments,
  getTimeOfDay,
} from "../helpers/helper";
import { markNoShow } from "../ApiServices/serverActions";
import { createSupabaseServerClient } from "../supabase/server";

export default async function Page() {
  unstable_noStore();
  const supabase = await createSupabaseServerClient();

  const { data: sessionData } = await supabase.auth.getSession();
  const display_name = sessionData?.session?.user?.user_metadata?.display_name;
  const email = sessionData?.session?.user?.user_metadata?.email;
  const session = await getServerSession(authOptions);
  const me = sessionData;

  const userName = display_name || session.user?.name;
  const usersEmail = email || session.user?.email;

  const timeGreeting = getTimeOfDay();
  const postSessionTips = await getPostSessionTip(usersEmail);
  const OnlyTips = postSessionTips[0];

  const rawAppointments = await getAppointments(usersEmail);

  const pastAppointments = datesPastToday(rawAppointments);

  //inamark no shows
  await Promise.all(pastAppointments.map((booking) => markNoShow(booking.id)));

  const appointments = filterOutPastAppointments(rawAppointments);

  const shouldUseSlider = appointments && appointments.length > 3;

  return (
    <div className="min-h-[100vh] h-auto bg-amber-400  overflow-y-auto overflow-x-hidden">
      <div className="w-[100%] h-[5rem] xl:h-[7rem] bg-left  max-xl:bg-cover flex justify-center items-center  bg-[url(https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/background--mini--001/FgTO3a6QvenARnKKYjWD--0--5dfww.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYWNrZ3JvdW5kLS1taW5pLS0wMDEvRmdUTzNhNlF2ZW5BUm5LS1lqV0QtLTAtLTVkZnd3LmpwZyIsImlhdCI6MTc3MDg4MDYxNywiZXhwIjoxODAyNDE2NjE3fQ.L3CEAQTdBaxPHtEjVZM8YrKC02GPpehg9Bcb0SJl73k)]">
        <h2 className="text-blue-300 xs:text-xl text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          Good {timeGreeting}
        </h2>
      </div>

      {shouldUseSlider ? (
        <AppointmentsSlider appointments={appointments} userName={userName} />
      ) : (
        <div className="h-auto relative max-xxs:pt-15 xxs:pt-16 max-xxs:pb-8 xxs:pt-8 xxs:pb-15 xl:pt-30 xs:pt-16 sm:pt-14 lg:pt-25  bg-[radial-gradient(ellipse_at_center,_rgba(255,203,71,1)_0%,_rgba(168,126,29,1)_35%,_rgba(39,41,50,1)_100%)] flex flex-col sm:flex-row  justify-center items-center  md:min-h-[80vh]">
          {appointments.length > 0 ? (
            <span className="font-semibold absolute text-[#ABA194] top-1 xxs:top-4 xs:top-5 sm:top-4 xl:top-10 lg:top-7 max-xxs:top-5 font-[family-name:var(--font-quicksand))]">
              YOU ARE SCHEDULED FOR 🗓️
            </span>
          ) : null}
          {appointments && appointments.length > 0 ? (
            appointments.map((appointment, index, array) => (
              <AppointmentCard
                key={appointment.id || index}
                date={appointment.date || ""}
                time={appointment.time || ""}
                session={appointment.massage_name || ""}
                therapist={appointment.therapistname || ""}
              />
            ))
          ) : (
            <div className="h-[60vh] flex items-center justify-center">
              <p className="text-white text-xl text-center">
                No appointments scheduled
              </p>
            </div>
          )}
        </div>
      )}

      <div className="h-[90vh]  bg-gradient-to-tl from-stone-900 via-amber-900 to-yellow-80 flex justify-center items-center">
        <AfterCare postSessionTips={OnlyTips} />
      </div>

      <div className="h-auto p-2 w-[100%] bg-gradient-to-br bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.2)_0%,transparent_50%),radial-gradient(circle_at_60%_50%,rgba(34,197,94,0.15)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(100,116,139,0.3)_0%,transparent_50%),linear-gradient(135deg,#f8fafc_0%,#f1f5f9_50%,#e2e8f0_100%)]  flex justify-center max-md:flex-col items-center overflow-hidden">
        <PackageCard
          benefit1={"free 1 hour massage once a month"}
          benefit2={"a free snack at request"}
          benefit3={"ability to select your wellness suite"}
          benefit4={"access to our drapery"}
          benefit5={"Relaxation Lounge Access"}
          price={12}
          imageUrl={
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/background--advert-001/WRVuSu6LlhwXjD7J4zKx--0--di7jr.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYWNrZ3JvdW5kLS1hZHZlcnQtMDAxL1dSVnVTdTZMbGh3WGpEN0o0ekt4LS0wLS1kaTdqci5qcGciLCJpYXQiOjE3NzA4ODE5OTcsImV4cCI6MTgwMjQxNzk5N30.auFgGlv7zfbP9CFwYCRnnCGvpf7dpJjjd1JFfQOXvSg"
          }
          from={"emerald-500"}
          via={"green-600"}
          to={"teal-700"}
          textColor={"text-[#F7FFE0]"}
        />
        <PackageCard
          benefit1={"Priority Booking & Scheduling"}
          benefit2={"Custom Aromatherapy Blends"}
          benefit3={"Monthly Wellness Assessment"}
          benefit4={"Extended 90-Minute Sessions Available"}
          benefit5={"Free Cupping Sessions"}
          price={20}
          imageUrl={
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/background--advert-002/image_1765624187319.webp_image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYWNrZ3JvdW5kLS1hZHZlcnQtMDAyL2ltYWdlXzE3NjU2MjQxODczMTkud2VicF9pbWFnZS5wbmciLCJpYXQiOjE3NzA4ODIzODUsImV4cCI6MTgwMjQxODM4NX0.A8vpi054V0ZT5HnE27mV4k61KbPrhXsGgq6LX-kjLKE"
          }
          from={"slate-900"}
          via={"gray-600"}
          to={"gray-800"}
          textColor={"text-[#DCBF85]"}
        />
        <PackageCard
          benefit1={"Unlimited Session Rollovers"}
          benefit2={"Dedicated Therapist Matching"}
          benefit3={"24/7 Virtual Wellness Consultations"}
          benefit4={" Exclusive Access to New Modalities First"}
          benefit5={"Luxury Wellness Retreat Invitation"}
          price={30}
          imageUrl={
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/background--advert-003/lucid-origin_An_otherworldly_massage_sanctuary_floating_among_clouds_at_sunset._A_single_anci-0.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYWNrZ3JvdW5kLS1hZHZlcnQtMDAzL2x1Y2lkLW9yaWdpbl9Bbl9vdGhlcndvcmxkbHlfbWFzc2FnZV9zYW5jdHVhcnlfZmxvYXRpbmdfYW1vbmdfY2xvdWRzX2F0X3N1bnNldC5fQV9zaW5nbGVfYW5jaS0wLmpwZyIsImlhdCI6MTc3MDg4MjQ1NiwiZXhwIjoxODAyNDE4NDU2fQ.RJdRd_9dBPjDRZ0y6tH5fq8FM2mPx0V5Oy6OXOBl7x8"
          }
          from={"gray-450"}
          via={"gray-300"}
          to={"gray-500"}
          textColor={"text-[#1E1B18]"}
        />
      </div>
    </div>
  );
}

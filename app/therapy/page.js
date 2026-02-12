import React from "react";
import AdvertCard from "./advertCard";

import { createSupabaseServerClient } from "@/app/supabase/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export default async function Page() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const session = await getServerSession(authOptions);

  const display_name = user?.user_metadata?.display_name || session.user?.name;

  return (
    <div className="h-[200rem] bg-[#FFFFF2] max-md:h-auto w-[100%] flex justify-center items-center">
      <main className="h-[180rem] max-md:h-auto w-[90%] bg-[#312F2F] border-rounded-md rounded-lg grid auto-rows-[600px] max-sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-[20px] p-[2rem]">
        <AdvertCard
          title="hot stone massage"
          name={display_name}
          description="Heated volcanic stones melt away tension and promote deep relaxation through targeted thermotherapy."
          address="https://www.webmd.com/balance/hot-stone-massage-what-to-know"
          images={[
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/hot-stone--001/pexels-tima-miroshnichenko-6187657.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJob3Qtc3RvbmUtLTAwMS9wZXhlbHMtdGltYS1taXJvc2huaWNoZW5rby02MTg3NjU3LmpwZyIsImlhdCI6MTc3MDg4MjU5MywiZXhwIjoxODAyNDE4NTkzfQ.DSKnSU17BrD_6WaDteiqVOuXrmRXPV72ewnvtTPCgyU",
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/hot-stone--002/people-3184615_1280.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJob3Qtc3RvbmUtLTAwMi9wZW9wbGUtMzE4NDYxNV8xMjgwLmpwZyIsImlhdCI6MTc3MDg4MjcwMSwiZXhwIjoxODAyNDE4NzAxfQ.5IxGk8p6Q5NJ6oNKo57Hf6NY2dkRdsBEMiBJS9dpeiY",
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/hot-stone--003/image_1765624075042.webp_image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJob3Qtc3RvbmUtLTAwMy9pbWFnZV8xNzY1NjI0MDc1MDQyLndlYnBfaW1hZ2UucG5nIiwiaWF0IjoxNzcwODgyNzY1LCJleHAiOjE4MDI0MTg3NjV9.MdmQljItzDPDt7811b9HmRj9MTx1_ZFlijFDcaFavQg",
          ]}
        />
        <AdvertCard
          title="swedish massage"
          name={display_name}
          description="Classic European techniques using long, flowing strokes to improve circulation and relieve muscle stiffness"
          address="https://www.webmd.com/balance/guide/swedish-massage"
          images={[
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/swedish--001/swed2.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzd2VkaXNoLS0wMDEvc3dlZDIud2VicCIsImlhdCI6MTc3MDg4MzA2MywiZXhwIjoxODAyNDE5MDYzfQ.UGv50Oy8Ppwcuce9Q9HhrxcpaAAV1B12rmptgdYmy-w",
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/swedish--003/swed3.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzd2VkaXNoLS0wMDMvc3dlZDMuanBnIiwiaWF0IjoxNzcwODgzMjExLCJleHAiOjE4MDI0MTkyMTF9.LohfjZ-jXVEK7R4G-JjAreIxO5Q6DC4aH223zfux7rE",
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/swedish--002/swed1.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzd2VkaXNoLS0wMDIvc3dlZDEud2VicCIsImlhdCI6MTc3MDg4MzI0NywiZXhwIjoxODAyNDE5MjQ3fQ.Kp9d6FY2NBcaExQ_eHrMqGea7UfsHCBTdzhWR4-Iimk",
          ]}
        />
        <AdvertCard
          title="cultural massage"
          name={display_name}
          description="Traditional healing methods from indigenous cultures, blending ancient wisdom with therapeutic touch."
          address="https://www.webmd.com/balance/guide/swedish-massage"
          images={[
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/cultural--001/Rungu-1.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjdWx0dXJhbC0tMDAxL1J1bmd1LTEucG5nIiwiaWF0IjoxNzcwODgzMzM3LCJleHAiOjE4MDI0MTkzMzd9.xu3FEEaBO_yzfbhodQ9HyWvfRxFN6K1PveUCjc_nEpk",
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/cultural--002/rungu-2.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjdWx0dXJhbC0tMDAyL3J1bmd1LTIucG5nIiwiaWF0IjoxNzcwODgzNDIyLCJleHAiOjE4MDI0MTk0MjJ9.td17K-OD1Wc7fjgEOd55CuQJUO57K3Lo1sF1GC2DuNE",
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/cultural--003/culture-3.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjdWx0dXJhbC0tMDAzL2N1bHR1cmUtMy5qcGciLCJpYXQiOjE3NzA4ODM0NzEsImV4cCI6MTgwMjQxOTQ3MX0.D8koeWGAdnKEPFQWNYBi2xYbxQrbeoGWCeId1iArMSY",
          ]}
        />
        <AdvertCard
          title="Shiatsu massage"
          name={display_name}
          description="Japanese finger pressure therapy that balances energy flow along the body's meridians for holistic harmony."
          address="https://www.webmd.com/balance/guide/swedish-massage"
          images={[
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/shiatsu/Shiatsu-Massage-Anwendung-auf-dem-Boden-e1723575890724.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaGlhdHN1L1NoaWF0c3UtTWFzc2FnZS1BbndlbmR1bmctYXVmLWRlbS1Cb2Rlbi1lMTcyMzU3NTg5MDcyNC53ZWJwIiwiaWF0IjoxNzcwODgzNTU0LCJleHAiOjE4MDI0MTk1NTR9.qsnEdVDZI88lsjdtudm7VMnPM_jVWdkkwsDpz9MCb3w",
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/thai-001/deep-tisue-2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0aGFpLTAwMS9kZWVwLXRpc3VlLTIuanBnIiwiaWF0IjoxNzcwODg2MDAwLCJleHAiOjE4MDI0MjIwMDB9.c5eTsydsFr3zdYj5fW1rvtoXxq4qMOgkS_9dhEtphng",
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/shiatsu-3/Remedial_vs_Deep_Tissue_Massage-7_480x480.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaGlhdHN1LTMvUmVtZWRpYWxfdnNfRGVlcF9UaXNzdWVfTWFzc2FnZS03XzQ4MHg0ODAud2VicCIsImlhdCI6MTc3MDg4MzczNywiZXhwIjoxODAyNDE5NzM3fQ.kqMnvxamWiM_YHgyypbMS5858AzSYkW1uosnCXRi4a4",
          ]}
        />
        <AdvertCard
          title="aromatherapy massage"
          name={display_name}
          description="Essential oil-infused treatment where scent and touch combine to enhance mood and alleviate stress."
          address="https://www.webmd.com/balance/guide/swedish-massage"
          images={[
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/aromatherapy--001/ai-generated-8328480_1280%20(1).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcm9tYXRoZXJhcHktLTAwMS9haS1nZW5lcmF0ZWQtODMyODQ4MF8xMjgwICgxKS5wbmciLCJpYXQiOjE3NzA4ODM5NjMsImV4cCI6MTgwMjQxOTk2M30.441Jnb9Tvdi4_vmOxMcYrFP0D2YMtbB69hbTvrSHow0",
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/aromatherapy--002/aromatherapy-2.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcm9tYXRoZXJhcHktLTAwMi9hcm9tYXRoZXJhcHktMi53ZWJwIiwiaWF0IjoxNzcwODg0MDI1LCJleHAiOjE4MDI0MjAwMjV9.GTI8Ft8B6RhhEU5ArwdriC3JQpPmrYnUVc46_mnqvUk",
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/aromatherapy--003/aromatherapy-3.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcm9tYXRoZXJhcHktLTAwMy9hcm9tYXRoZXJhcHktMy5qcGciLCJpYXQiOjE3NzA4ODQwOTMsImV4cCI6MTgwMjQyMDA5M30._IqN282KjxJCMBkncj96kbL6tBVxnvZIze6bqD_2o2M",
          ]}
        />
        <AdvertCard
          title="thai massage"
          name={display_name}
          description="Active, yoga-like stretching combined with pressure point work to increase flexibility and energy flow."
          address="https://www.webmd.com/balance/guide/swedish-massage"
          images={[
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/shiatsu-2/thai%204.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaGlhdHN1LTIvdGhhaSA0LmpwZyIsImlhdCI6MTc3MDg4MzYzNiwiZXhwIjoxODAyNDE5NjM2fQ.KO01SB4aXBlyHswDVpCktPTCVnGF5eQdhykXcFvQEHU",
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/thai-002/thai1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0aGFpLTAwMi90aGFpMS5qcGciLCJpYXQiOjE3NzA4ODQyMjEsImV4cCI6MTgwMjQyMDIyMX0.iJ7TajOW5Db9Jv5JIS8kvIMiWpFbCmm8NeISRJ74sUE",
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/thai-003/istockphoto-1326305183-612x612.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0aGFpLTAwMy9pc3RvY2twaG90by0xMzI2MzA1MTgzLTYxMng2MTIuanBnIiwiaWF0IjoxNzcwODg0MzUwLCJleHAiOjE4MDI0MjAzNTB9.n8fhUjSKQtjCeujBo36OjJ2zS6zsGqM8aVn1uEo0Hc8",
          ]}
        />
        <AdvertCard
          title="reflexology massage"
          name={display_name}
          description="Precise pressure applied to feet and hands, corresponding to organs and systems throughout the body."
          address="https://www.webmd.com/balance/guide/swedish-massage"
          images={[
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/reflexology-001/reflexology1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyZWZsZXhvbG9neS0wMDEvcmVmbGV4b2xvZ3kxLmpwZyIsImlhdCI6MTc3MDg4NDQyMSwiZXhwIjoxODAyNDIwNDIxfQ.3ehOlW-0q8mG0aUPFqspb8W0LufD37VamVtq9pgLBTA",
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/reflexology-002/reflexology2.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyZWZsZXhvbG9neS0wMDIvcmVmbGV4b2xvZ3kyLndlYnAiLCJpYXQiOjE3NzA4ODQ0NjksImV4cCI6MTgwMjQyMDQ2OX0.jGnGJaKgfD54SdudHBEh9KaRpGw5lPs27smCPZQW2FY",
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/reflexology-003/reflexology3.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyZWZsZXhvbG9neS0wMDMvcmVmbGV4b2xvZ3kzLmpwZyIsImlhdCI6MTc3MDg4NDUxMSwiZXhwIjoxODAyNDIwNTExfQ.a8FteFLZg5Hu0Bbgf3zTkVdhWGGlLy2xQB6o18vENOY",
          ]}
        />
        <AdvertCard
          title="Sports massage"
          name={display_name}
          description="Targeted therapy for athletes focusing on injury prevention, recovery, and peak performance preparation."
          address="https://www.webmd.com/balance/guide/swedish-massage"
          images={[
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/sports-002/sports1.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzcG9ydHMtMDAyL3Nwb3J0czEud2VicCIsImlhdCI6MTc3MDg4NjI2NywiZXhwIjoxODAyNDIyMjY3fQ.H0D8qR9nKOkQTVJwUyyEPsMSe4PkGjZTCKmSDEKVyEE",
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/sports--001/sports3.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzcG9ydHMtLTAwMS9zcG9ydHMzLmpwZyIsImlhdCI6MTc3MDg4NDU4MywiZXhwIjoxODAyNDIwNTgzfQ.h_NLZODrXVQWE4xVufvKm002Wa2bHSya8Y6FFqB-HjM",
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/sports--003/sports2.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzcG9ydHMtLTAwMy9zcG9ydHMyLndlYnAiLCJpYXQiOjE3NzA4ODYxODYsImV4cCI6MTgwMjQyMjE4Nn0.vak-grWYZ68QqrUwtuK03T9WWOpkl_KFtZDjEOB5kJo",
          ]}
        />

        <AdvertCard
          title="prenatal massage"
          name={display_name}
          description="Specialized, side-lying techniques providing comfort and relief during pregnancy's physical changes."
          address="https://www.webmd.com/balance/guide/swedish-massage"
          images={[
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/prenatal--001/beautiful-pregnant-brunette-with-long-hair-lies-her-side-reception-with-massage-therapi_926199-2409501.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcmVuYXRhbC0tMDAxL2JlYXV0aWZ1bC1wcmVnbmFudC1icnVuZXR0ZS13aXRoLWxvbmctaGFpci1saWVzLWhlci1zaWRlLXJlY2VwdGlvbi13aXRoLW1hc3NhZ2UtdGhlcmFwaV85MjYxOTktMjQwOTUwMS5qcGciLCJpYXQiOjE3NzA4ODQ3OTQsImV4cCI6MTgwMjQyMDc5NH0.VfUiinp157xX9YbW0H0oAKEixWip20mAqju8vde4i6I",
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/prenatal--002/prenatal-002.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcmVuYXRhbC0tMDAyL3ByZW5hdGFsLTAwMi5qcGciLCJpYXQiOjE3NzA4ODQ4ODgsImV4cCI6MTgwMjQyMDg4OH0.Q9zdZFAlIAOIuPyGS4infElhFgSf5wrKAI9MSnjSvyM",
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/prenatal--003/prenatal--003.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcmVuYXRhbC0tMDAzL3ByZW5hdGFsLS0wMDMuanBnIiwiaWF0IjoxNzcwODg0OTM2LCJleHAiOjE4MDI0MjA5MzZ9.vMsgwFIExz2R0haiWHNwENAUpOwpSOkdbTfkKh4IXEE",
          ]}
        />
        <AdvertCard
          title="trigger point therapy"
          name={display_name}
          description="Focused pressure on specific muscle knots to release chronic tension and referred pain patterns."
          address="https://www.webmd.com/balance/guide/swedish-massage"
          images={[
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/trigger-point--001/trigger2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0cmlnZ2VyLXBvaW50LS0wMDEvdHJpZ2dlcjIuanBnIiwiaWF0IjoxNzcwODg1MDI5LCJleHAiOjE4MDI0MjEwMjl9.wArK07fp5NZD3KXIo6dQCnpkv-G1M299gGiEs8xP-2s",
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/trigger-point--002/trigger3.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0cmlnZ2VyLXBvaW50LS0wMDIvdHJpZ2dlcjMud2VicCIsImlhdCI6MTc3MDg4NTEyNywiZXhwIjoxODAyNDIxMTI3fQ.pl4VSG4Eyi-uX4vJdW2O-GUKE3SIg6ZjCEY1BMDF-Xk",
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/trigger-point--003/trigger1.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0cmlnZ2VyLXBvaW50LS0wMDMvdHJpZ2dlcjEud2VicCIsImlhdCI6MTc3MDg4NTE2NSwiZXhwIjoxODAyNDIxMTY1fQ.Es93f_omNU3IV7NhKUcPyDF73DPbdh8f6f6MCCSZxYc",
          ]}
        />
        <AdvertCard
          name={display_name}
          title="massage chair"
          description="Automated therapeutic sessions combining vibration, kneading, and heat for convenient full-body relief."
          address="https://www.webmd.com/balance/guide/swedish-massage"
          images={[
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/massage-chair--001/bPcisBNO1Z1xo8jdhbkB--0--nf4zw.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtYXNzYWdlLWNoYWlyLS0wMDEvYlBjaXNCTk8xWjF4bzhqZGhia0ItLTAtLW5mNHp3LmpwZyIsImlhdCI6MTc3MDg4NTIyNywiZXhwIjoxODAyNDIxMjI3fQ.ml51kbn_kRbG7b6Ppt2SyjG2_1X4luzWkMtkDQDHWaA",
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/massage-chair--002/chair2.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtYXNzYWdlLWNoYWlyLS0wMDIvY2hhaXIyLndlYnAiLCJpYXQiOjE3NzA4ODU1NzUsImV4cCI6MTgwMjQyMTU3NX0.JEGVrbUTSTjgX4nK8GIxfF5GXbofpUlHtUobR9Tirj0",
            "https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/massage-chair--003/chair3.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtYXNzYWdlLWNoYWlyLS0wMDMvY2hhaXIzLndlYnAiLCJpYXQiOjE3NzA4ODU2NTgsImV4cCI6MTgwMjQyMTY1OH0.__Hr6I5Qxt9rTx4_VS6LqITGMiEMUkDIjdA2mWGFAQ8",
          ]}
        />
      </main>
    </div>
  );
}

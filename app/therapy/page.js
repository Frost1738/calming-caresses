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
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/hot-stone--001/pexels-tima-miroshnichenko-6187657.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJob3Qtc3RvbmUtLTAwMS9wZXhlbHMtdGltYS1taXJvc2huaWNoZW5rby02MTg3NjU3LmpwZyIsImlhdCI6MTc2NTYzMDQ0NiwiZXhwIjoxNzk3MTY2NDQ2fQ.bx_oJR1F_pTiO6yxbcuL-ENY0N2w9yaAiIeTVSl-vWM",
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/hot-stone--002/people-3184615_1280.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJob3Qtc3RvbmUtLTAwMi9wZW9wbGUtMzE4NDYxNV8xMjgwLmpwZyIsImlhdCI6MTc2NTYzMDk0MCwiZXhwIjoxNzk3MTY2OTQwfQ.Z74os67r9FrImcRxePqhvSniGYpvKMF4_DeTkYxqcyw",
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/hot-stone--003/image_1765624075042.webp_image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJob3Qtc3RvbmUtLTAwMy9pbWFnZV8xNzY1NjI0MDc1MDQyLndlYnBfaW1hZ2UucG5nIiwiaWF0IjoxNzY1NjMxMTE5LCJleHAiOjE3OTcxNjcxMTl9.JB7b4G4qld_4gX0P-kXo7zhpnDGQtETY0NrQowdFF10",
          ]}
        />
        <AdvertCard
          title="swedish massage"
          name={display_name}
          description="Classic European techniques using long, flowing strokes to improve circulation and relieve muscle stiffness"
          address="https://www.webmd.com/balance/guide/swedish-massage"
          images={[
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/swedish--001/image_1765624187319.webp_image.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzd2VkaXNoLS0wMDEvaW1hZ2VfMTc2NTYyNDE4NzMxOS53ZWJwX2ltYWdlLnBuZyIsImlhdCI6MTc2NTYzMTMyNiwiZXhwIjoxNzk3MTY3MzI2fQ.jTK4E8o9Ps3PWXOCoil5NRPhrLzGNbLzzQBmNy0g47s",
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/swedish--002/swed2.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzd2VkaXNoLS0wMDIvc3dlZDIud2VicCIsImlhdCI6MTc2NTYzMTQyOCwiZXhwIjoxNzk3MTY3NDI4fQ.2eE02y5KUoYIRTfS1nD0VUxcZ7jzZdunbXMzwetaTtU",
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/swedish--003/swed1.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzd2VkaXNoLS0wMDMvc3dlZDEud2VicCIsImlhdCI6MTc2NTYzMTUxNiwiZXhwIjoxNzk3MTY3NTE2fQ.LhxAjvL1J2ByoH5zS0Oc4qMFK7RDU2x5HjchvTnwxXM",
          ]}
        />
        <AdvertCard
          title="cultural massage"
          name={display_name}
          description="Traditional healing methods from indigenous cultures, blending ancient wisdom with therapeutic touch."
          address="https://www.webmd.com/balance/guide/swedish-massage"
          images={[
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/cultural--001/Rungu-1.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjdWx0dXJhbC0tMDAxL1J1bmd1LTEucG5nIiwiaWF0IjoxNzY1NjMxOTA3LCJleHAiOjE3OTcxNjc5MDd9.2XZm7-6eeiLGMG92s7RpgOwH-sS-Bda4yAV30izzQsg",
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/cultural--003/culture-3.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjdWx0dXJhbC0tMDAzL2N1bHR1cmUtMy5qcGciLCJpYXQiOjE3NjU2MzIwMTUsImV4cCI6MTc5NzE2ODAxNX0.vXr8VYXxKdaFiRNsElQI52fNtWux1LcsLRykVudh78Q",
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/cultural--002/rungu-2.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjdWx0dXJhbC0tMDAyL3J1bmd1LTIucG5nIiwiaWF0IjoxNzY1NjMxOTY1LCJleHAiOjE3OTcxNjc5NjV9.MV4OTDMKQYCfw6tIL9S7I4o-2GlDvif_SHmD6W4iZuQ",
          ]}
        />
        <AdvertCard
          title="Shiatsu massage"
          name={display_name}
          description="Japanese finger pressure therapy that balances energy flow along the body's meridians for holistic harmony."
          address="https://www.webmd.com/balance/guide/swedish-massage"
          images={[
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/shiatsu/Remedial_vs_Deep_Tissue_Massage-7_480x480.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaGlhdHN1L1JlbWVkaWFsX3ZzX0RlZXBfVGlzc3VlX01hc3NhZ2UtN180ODB4NDgwLndlYnAiLCJpYXQiOjE3NjU2MzIzODksImV4cCI6MTc5NzE2ODM4OX0.6Hkg83JFEnJPM6QEMmI37Nl0Yuya0Y3QjJvPY6OVEb4",
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/shiatsu-2/istockphoto-1326305183-612x612.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaGlhdHN1LTIvaXN0b2NrcGhvdG8tMTMyNjMwNTE4My02MTJ4NjEyLmpwZyIsImlhdCI6MTc2NTYzMjQ0OCwiZXhwIjoxNzk3MTY4NDQ4fQ.uHmqMvN7K2DYGjTvlmM84wT4JD4IpA1Z1ihr2hM-1Ao",
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/shiatsu-3/Shiatsu-Massage-Anwendung-auf-dem-Boden-e1723575890724.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaGlhdHN1LTMvU2hpYXRzdS1NYXNzYWdlLUFud2VuZHVuZy1hdWYtZGVtLUJvZGVuLWUxNzIzNTc1ODkwNzI0LndlYnAiLCJpYXQiOjE3NjU2MzI1MTIsImV4cCI6MTc5NzE2ODUxMn0.6jHL_a_KhfY_Is2A_ym_v6FDfMHD9ubatVt1-WhmEJI",
          ]}
        />
        <AdvertCard
          title="aromatherapy massage"
          name={display_name}
          description="Essential oil-infused treatment where scent and touch combine to enhance mood and alleviate stress."
          address="https://www.webmd.com/balance/guide/swedish-massage"
          images={[
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/aromatherapy--001/scent-8328482_1280.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcm9tYXRoZXJhcHktLTAwMS9zY2VudC04MzI4NDgyXzEyODAucG5nIiwiaWF0IjoxNzY1NjMyNzExLCJleHAiOjE3OTcxNjg3MTF9.kYwTIWKU7VpTkgFlAvOp8EvPujie1rGBQUTPy5K1EsM",
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/aromatherapy--002/aromatherapy-2.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcm9tYXRoZXJhcHktLTAwMi9hcm9tYXRoZXJhcHktMi53ZWJwIiwiaWF0IjoxNzY1NjMyNzYwLCJleHAiOjE3OTcxNjg3NjB9._AhvTSE_h8Nak3pRu5MuD5z3JzoKvEHrwVCEc50pxXM",
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/aromatherapy--003/aromatherapy-3.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcm9tYXRoZXJhcHktLTAwMy9hcm9tYXRoZXJhcHktMy5qcGciLCJpYXQiOjE3NjU2MzMwNDIsImV4cCI6MTc5NzE2OTA0Mn0.-JyAYRFikmEJvOJowXmOB8J8GrCztQQcJ6yx-Fu9hFI",
          ]}
        />
        <AdvertCard
          title="thai massage"
          name={display_name}
          description="Active, yoga-like stretching combined with pressure point work to increase flexibility and energy flow."
          address="https://www.webmd.com/balance/guide/swedish-massage"
          images={[
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/thai-001/thai1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0aGFpLTAwMS90aGFpMS5qcGciLCJpYXQiOjE3NjU2MzMxMDMsImV4cCI6MTc5NzE2OTEwM30.SFTNKZVuqkNPhju46MQNTNYugBetjpR9RkwR574vnuA",
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/thai-002/thai2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0aGFpLTAwMi90aGFpMi5qcGciLCJpYXQiOjE3NjU2MzMxNjAsImV4cCI6MTc5NzE2OTE2MH0.PD-aD9KImkJA2eva6y9Dma3btoT4tS5ODGy7Rbk8Yxo",
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/thai-003/thai%204.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0aGFpLTAwMy90aGFpIDQuanBnIiwiaWF0IjoxNzY1NjMzMjUzLCJleHAiOjE3OTcxNjkyNTN9.rREKxWLtN_zmoZhct4xxPZ2e7CuBG-Engkp-9eQNeJ4",
          ]}
        />
        <AdvertCard
          title="reflexology massage"
          name={display_name}
          description="Precise pressure applied to feet and hands, corresponding to organs and systems throughout the body."
          address="https://www.webmd.com/balance/guide/swedish-massage"
          images={[
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/reflexology-001/reflexology1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyZWZsZXhvbG9neS0wMDEvcmVmbGV4b2xvZ3kxLmpwZyIsImlhdCI6MTc2NTYzMzM4MSwiZXhwIjoxNzk3MTY5MzgxfQ.d0xAOxIzbD6e48lc9DdQ1MBj9t-m-rXznj97Y-V1rQo",
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/reflexology-002/reflexology2.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyZWZsZXhvbG9neS0wMDIvcmVmbGV4b2xvZ3kyLndlYnAiLCJpYXQiOjE3NjU2MzM0MjQsImV4cCI6MTc5NzE2OTQyNH0.e_bAXkRyKDIXDSFzqhE2jj6rAnaq4JxxoRpsf5622q8",
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/reflexology-003/reflexology3.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyZWZsZXhvbG9neS0wMDMvcmVmbGV4b2xvZ3kzLmpwZyIsImlhdCI6MTc2NTYzMzQ4NCwiZXhwIjoxNzk3MTY5NDg0fQ.YmmBPSburQONNk-E3ITYogLcx6MU-Pl2caDJPTgFPIg",
          ]}
        />
        <AdvertCard
          title="Sports massage"
          name={display_name}
          description="Targeted therapy for athletes focusing on injury prevention, recovery, and peak performance preparation."
          address="https://www.webmd.com/balance/guide/swedish-massage"
          images={[
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/sports--001/sports1.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzcG9ydHMtLTAwMS9zcG9ydHMxLndlYnAiLCJpYXQiOjE3NjU2MzM1ODAsImV4cCI6MTc5NzE2OTU4MH0.3E40fVwkdEdrZBmEfOUdRXoscyykkKKDzaul_eW5SiA",
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/sports-002/sports2.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzcG9ydHMtMDAyL3Nwb3J0czIud2VicCIsImlhdCI6MTc2NTYzMzYzNiwiZXhwIjoxNzk3MTY5NjM2fQ.M1hAwP6P6uYJn4-C72y1EzW3RtX4GtzbSnuUk41hSyc",
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/sports--003/sports3.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzcG9ydHMtLTAwMy9zcG9ydHMzLmpwZyIsImlhdCI6MTc2NTYzMzc1MywiZXhwIjoxNzk3MTY5NzUzfQ.gQ9LaLmGyglnfl1pZTzwIwPRJMx9R9UHCBW2AdhsDqM",
          ]}
        />

        <AdvertCard
          title="prenatal massage"
          name={display_name}
          description="Specialized, side-lying techniques providing comfort and relief during pregnancy's physical changes."
          address="https://www.webmd.com/balance/guide/swedish-massage"
          images={[
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/prenatal--001/beautiful-pregnant-brunette-with-long-hair-lies-her-side-reception-with-massage-therapi_926199-2409501.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcmVuYXRhbC0tMDAxL2JlYXV0aWZ1bC1wcmVnbmFudC1icnVuZXR0ZS13aXRoLWxvbmctaGFpci1saWVzLWhlci1zaWRlLXJlY2VwdGlvbi13aXRoLW1hc3NhZ2UtdGhlcmFwaV85MjYxOTktMjQwOTUwMS5qcGciLCJpYXQiOjE3NjU2MzM5NjgsImV4cCI6MTc5NzE2OTk2OH0.-cCEyIKZ-pHHwOeWC0vlQZXCSy2lGiw8Yai4waV0YQo",
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/prenatal--002/prenatal-002.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcmVuYXRhbC0tMDAyL3ByZW5hdGFsLTAwMi5qcGciLCJpYXQiOjE3NjU2MzQ0MzAsImV4cCI6MTc5NzE3MDQzMH0.YfI3dpFw9dnwI-3WJoiOjmkQf6QS-84A7dvkBpR_OI8",
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/prenatal--003/prenatal--003.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcmVuYXRhbC0tMDAzL3ByZW5hdGFsLS0wMDMuanBnIiwiaWF0IjoxNzY1NjM0NDk2LCJleHAiOjE3OTcxNzA0OTZ9.QFvPopK_-KwNAstaw0AyxIPqxiPmsK05Zx442Wjb8ZY",
          ]}
        />
        <AdvertCard
          title="trigger point therapy"
          name={display_name}
          description="Focused pressure on specific muscle knots to release chronic tension and referred pain patterns."
          address="https://www.webmd.com/balance/guide/swedish-massage"
          images={[
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/trigger-point--001/trigger2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0cmlnZ2VyLXBvaW50LS0wMDEvdHJpZ2dlcjIuanBnIiwiaWF0IjoxNzY1NjM0NTg0LCJleHAiOjE3OTcxNzA1ODR9.7kXpPw4Nj-fDCMjX3PazJ26Xe8tq5NHIoVhhuBEmKNE",
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/trigger-point--002/trigger3.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0cmlnZ2VyLXBvaW50LS0wMDIvdHJpZ2dlcjMud2VicCIsImlhdCI6MTc2NTYzNDY0OSwiZXhwIjoxNzk3MTcwNjQ5fQ.bYV7KojRtD4iMCdBNNXtonYjn99umlTXJ4OlWxD92Qc",
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/trigger-point--003/trigger1.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0cmlnZ2VyLXBvaW50LS0wMDMvdHJpZ2dlcjEud2VicCIsImlhdCI6MTc2NTYzNDcwNywiZXhwIjoxNzk3MTcwNzA3fQ.wNu4wC18cyYe1i6s5O4ktIsAespzWE1dw2VeFNL9aTs",
          ]}
        />
        <AdvertCard
          name={display_name}
          title="massage chair"
          description="Automated therapeutic sessions combining vibration, kneading, and heat for convenient full-body relief."
          address="https://www.webmd.com/balance/guide/swedish-massage"
          images={[
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/massage-chair--004/bPcisBNO1Z1xo8jdhbkB--0--nf4zw.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtYXNzYWdlLWNoYWlyLS0wMDQvYlBjaXNCTk8xWjF4bzhqZGhia0ItLTAtLW5mNHp3LmpwZyIsImlhdCI6MTc2NzExNTExNSwiZXhwIjoxNzk4NjUxMTE1fQ.Nx6BrzrLeMjWM59Mqjjq2ovHUVNDeZv5z5-ir0kLDG8",
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/massage-chair--002/chair2.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtYXNzYWdlLWNoYWlyLS0wMDIvY2hhaXIyLndlYnAiLCJpYXQiOjE3NjU2MzQ5MzEsImV4cCI6MTc5NzE3MDkzMX0.LtU6M4PekmnURurWj6gyh1PPVEkduj-TNDlaPVbmSl4",
            "https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/massage-chair--003/chair-1.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtYXNzYWdlLWNoYWlyLS0wMDMvY2hhaXItMS53ZWJwIiwiaWF0IjoxNzY1NjM0OTk2LCJleHAiOjE3OTcxNzA5OTZ9.nE9ZTetUFsQHrwjB1T-a3to_w4u7FtadSASKTO-pE8I",
          ]}
        />
      </main>
    </div>
  );
}

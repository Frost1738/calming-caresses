import React from "react";
import DemotionPage from "./deregister";
import { getAllTherapists } from "@/app/ApiServices/getFunctions";

export default async function Page() {
  const therapist = await getAllTherapists();

  return (
    <div>
      <DemotionPage therapist={therapist} />
    </div>
  );
}

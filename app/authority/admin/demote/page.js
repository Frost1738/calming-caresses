import React from "react";
import DemotionPage from "./deregister";
import { getAllTherapists } from "@/app/ApiServices/getFunctions";

export const dynamic = "force-dynamic";

export default async function Page() {
  // Get data safely without try/catch in JSX
  const therapistData = await getAllTherapists().catch(() => null);

  // Ensure it's an array
  const therapists = Array.isArray(therapistData)
    ? therapistData
    : therapistData?.data && Array.isArray(therapistData.data)
      ? therapistData.data
      : therapistData?.therapists && Array.isArray(therapistData.therapists)
        ? therapistData.therapists
        : [];

  return (
    <div>
      <DemotionPage therapist={therapists} />
    </div>
  );
}

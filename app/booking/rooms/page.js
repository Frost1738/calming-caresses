import React, { Suspense } from "react";
import RoomSelection from "./room";
import { getRooms } from "@/app/ApiServices/getFunctions";
import Loader from "@/app/loading";

export default async function Page() {
  const massageRooms = await getRooms();

  return (
    <div className="h-auto w-auto">
      <Suspense fallback={<Loader />}>
        <RoomSelection massageRooms={massageRooms} />
      </Suspense>
    </div>
  );
}

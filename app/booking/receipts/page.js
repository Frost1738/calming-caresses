import React from "react";
import MassageReceipts from "./receipts";
import { getReceipts } from "@/app/ApiServices/getFunctions";
import { createSupabaseServerClient } from "@/app/supabase/server";

export default async function Page() {
  const supabase = await createSupabaseServerClient();

  const { data: sessionData } = await supabase.auth.getSession();

  const email = sessionData?.session?.user?.user_metadata?.email;
  console.log(email);

  const receipts = await getReceipts(email);
  console.log(receipts);
  return (
    <div>
      <MassageReceipts receipts={receipts} />
    </div>
  );
}

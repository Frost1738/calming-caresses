import { create_Client } from "@/app/supabase/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await create_Client();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL("/dashboard", requestUrl.origin));
}

"use client";

import { LogOut, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { createBrowserSupabaseClient } from "../supabase/supabaseClient";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  //Supabase browser client
  const supabase = createBrowserSupabaseClient();

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      // Step 1: Sign out from Supabase
      const { error: supabaseError } = await supabase.auth.signOut();

      if (supabaseError) {
        console.warn("Supabase logout warning:", supabaseError.message);
        throw supabaseError;
        // Continues anyway I try NextAuth logout
      }

      // Step 2: Sign out from NextAuth
      await signOut({
        redirect: false,
        callbackUrl: "/",
      });

      // Step 3: Clears any local storage/cookies Supabase might use
      // This ensures a clean slate
      localStorage.removeItem("supabase.auth.token");
      sessionStorage.removeItem("supabase.auth.token");

      // Step 4: Redirect and refresh
      router.push("/");
      router.refresh(); // Refreshes server components

      // Optional: Force a page reload to clear any cached state
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      return { message: "Logout failed:", Reason: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 bg-[#A28497] cursor-pointer hover:bg-[#07090F] text-white rounded-lg transition-colors mb-[1rem] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
      <span>Log Out</span>
    </button>
  );
}

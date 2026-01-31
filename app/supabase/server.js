// app/supabase/server.js - UPDATED for Next.js 14+
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          // In Next.js 14+, cookieStore is a different type
          // Try these different methods:
          return (
            cookieStore.get(name)?.value || // Method 1
            cookieStore[name]?.value || // Method 2
            null
          );
        },
        set(name, value, options) {
          try {
            // Different ways to set in Next.js 14+
            if (typeof cookieStore.set === "function") {
              cookieStore.set(name, value, options);
            } else if (cookieStore.setCookie) {
              cookieStore.setCookie(name, value, options);
            }
          } catch (error) {
            // Ignore in server components
          }
        },
        remove(name, options) {
          try {
            if (typeof cookieStore.set === "function") {
              cookieStore.set(name, "", { ...options, maxAge: 0 });
            } else if (cookieStore.setCookie) {
              cookieStore.setCookie(name, "", { ...options, maxAge: 0 });
            }
          } catch (error) {
            // Ignore in server components
          }
        },
      },
    },
  );
}

// middleware.js - WORKING VERSION
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request) {
  const { pathname, origin } = request.nextUrl;

  console.log(`🔍 Middleware triggered for: ${pathname}`);

  // Get ALL cookies from the request
  const cookies = request.cookies.getAll();

  // Log all cookies for debugging
  console.log(
    "🍪 ALL COOKIES:",
    cookies.map((c) => ({
      name: c.name,
      hasValue: !!c.value,
      valueLength: c.value.length,
    })),
  );

  // Initialize response
  let response = NextResponse.next();

  // Create Supabase server client WITH cookie handling
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          response.cookies.set({ name, value: "", ...options });
        },
      },
    },
  );

  // Check 1: NextAuth Session (Google OAuth, etc.)
  let nextAuthSession = false;
  let nextAuthEmail = null;
  try {
    const nextAuthToken = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Only count it as a session if we have a valid token with email
    if (nextAuthToken?.email) {
      nextAuthSession = true;
      nextAuthEmail = nextAuthToken.email;
    }
    console.log(
      `🔑 NextAuth check: ${nextAuthSession} (${nextAuthEmail || "no email"})`,
    );
  } catch (error) {
    console.log(`❌ NextAuth error: ${error.message}`);
  }

  // Check 2: Supabase Session (email/password)
  let supabaseSession = false;
  let supabaseUserEmail = null;

  try {
    // Try to get session using the server client
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (!error && session?.user) {
      supabaseSession = true;
      supabaseUserEmail = session.user.email;
      console.log(`🔑 Supabase check: TRUE (${session.user.email})`);
    } else {
      console.log(
        `🔑 Supabase check: FALSE (${error?.message || "no session"})`,
      );
    }
  } catch (error) {
    console.log(`❌ Supabase error: ${error.message}`);
  }

  // User is ONLY authenticated if they have a valid session
  const isAuthenticated = nextAuthSession || supabaseSession;

  console.log(`📊 FINAL AUTH CHECK:
    Path: ${pathname}
    NextAuth: ${nextAuthSession} (${nextAuthEmail || "none"})
    Supabase: ${supabaseSession} (${supabaseUserEmail || "none"})
    Authenticated: ${isAuthenticated}
  `);

  // Protected routes
  const protectedRoutes = ["/dashboard", "/booking", "/therapy", "/therapist"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // ✅ REAL AUTH CHECK - NO BYPASS
  if (isProtectedRoute && !isAuthenticated) {
    console.log(`🚫 Blocking unauthorized access to: ${pathname}`);
    const loginUrl = new URL("/authentication", origin);
    loginUrl.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(loginUrl);
  }

  // ✅ Already logged in? Redirect from auth page
  if (pathname === "/authentication" && isAuthenticated) {
    console.log(`✅ Already authenticated, redirecting to dashboard`);
    return NextResponse.redirect(new URL("/dashboard", origin));
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/booking/:path*",
    "/therapist/:path*",
    "/therapy/:path*",
    "/authentication",
  ],
};

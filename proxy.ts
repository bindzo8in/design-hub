import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Instantiate NextAuth with the Edge-safe authConfig (without database adapter)
const { auth } = NextAuth(authConfig);

/**
 * Option A: Direct export of the auth function as proxy.
 * This will automatically protect paths defined in your authConfig callbacks.
 * 
 * export { auth as proxy } from "@/auth"; // If database adapter is Edge-safe
 * // Or for split config:
 * export const proxy = auth;
 */

/**
 * Option B: Wrapped-proxy pattern.
 * Allows you to run custom server-side logic before or after checking the session.
 */
export const proxy = auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");
  
  if (isDashboardRoute && !isLoggedIn) {
    // Redirect unauthenticated users to the login page
    const loginUrl = new URL("/login", nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return Response.redirect(loginUrl);
  }
});

// Configure the paths where the proxy runs
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

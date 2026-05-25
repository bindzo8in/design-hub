import type { NextAuthConfig } from "next-auth";

import { NextResponse } from "next/server";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/auth-error",
    
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isApiAuthRoute =
        nextUrl.pathname.startsWith("/api/auth");

      const publicRoutes = [
        "/",
        "/about",
        "/services",
        "/contact",
        "/portfolio",
        "/careers",
        "/login",
        "/auth-demo",
      ];

      const isPublicRoute =
        publicRoutes.includes(nextUrl.pathname);

      if (isPublicRoute || isApiAuthRoute) {
        return true;
      }

      if (!isLoggedIn) {
        const signInUrl = nextUrl.clone();
        signInUrl.pathname = "/login";
        signInUrl.searchParams.set("callbackUrl", nextUrl.href);
        signInUrl.searchParams.set("error", "AccessDenied");

        return NextResponse.redirect(signInUrl);
      }

      return true;
    },
  },
} satisfies NextAuthConfig;

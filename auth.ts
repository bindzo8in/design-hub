import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/prisma";

import authConfig from "./auth.config";

const allowedAdminEmail = process.env.ADMIN_EMAIL?.toLowerCase();

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  ...authConfig,

  events: {
    async signIn({
      user,
      account,
    }) {
      if (
        account?.provider === "google" &&
        user.id &&
        user.email?.toLowerCase() === allowedAdminEmail
      ) {
        await prisma.user.update({
          where: {
            id: user.id,
          },

          data: {
            emailVerified: new Date(),
            role: "ADMIN",
          },
        });
      }
    },
  },

  callbacks: {
    ...authConfig.callbacks,

    async signIn({ user }) {
      if (user.email?.toLowerCase() !== allowedAdminEmail) {
        return false;
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;

        (session.user as any).role = token.role;
      }

      return session;
    },
  },
});

import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";
 
export const env = createEnv({
  server: {
   DATABASE_URL: z.url(),
   ADMIN_EMAIL: z.email(),
   ADMIN_PASSWORD: z.string(),
   ADMIN_USERNAME: z.string(),
   AUTH_TRUST_HOST: z.coerce.boolean().default(true),
    AUTH_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.url(),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
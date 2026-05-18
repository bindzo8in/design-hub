import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";
 
export const env = createEnv({
  server: {
   DATABASE_URL: z.url(),
   ADMIN_EMAIL: z.email(),
   ADMIN_PASSWORD: z.string(),
   ADMIN_USERNAME: z.string(),
  },
  client: {
    
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  },
});
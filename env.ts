import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    ADMIN_EMAIL: z
      .string()
      .transform((value) =>
        value.split(",").map((email) => email.toLowerCase().trim()),
      )
      .refine(
        (emails) => emails.every((email) => z.email().safeParse(email).success),
        {
          message: "Invalid email list format",
        },
      ),
    ADMIN_PASSWORD: z.string(),
    ADMIN_USERNAME: z.string(),
    AUTH_TRUST_HOST: z.coerce.boolean().default(true),
    AUTH_SECRET: z.string(),
    CLOUDINARY_CLOUD_NAME: z.string(),
    CLOUDINARY_API_KEY: z.string(),
    CLOUDINARY_API_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    RESEND_API_KEY: z.string(),
    RESEND_FROM_EMAIL: z.email().optional(),
    RESEND_FROM_NAME: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.url(),

    NEXT_PUBLIC_SOCIAL_INSTAGRAM: z.url(),
    NEXT_PUBLIC_SOCIAL_LINKEDIN: z.url(),
    NEXT_PUBLIC_SOCIAL_FACEBOOK: z.url(),
    NEXT_PUBLIC_SOCIAL_GOOGLE: z.url(),
    NEXT_PUBLIC_ADDRESS: z.string(),
    NEXT_PUBLIC_PHONE_LABEL: z.string(),
    NEXT_PUBLIC_PHONE_NUMBER: z.string(),
    NEXT_PUBLIC_PHONE_LABEL_2: z.string(),
    NEXT_PUBLIC_PHONE_NUMBER_2: z.string(),
    NEXT_PUBLIC_PHONE_LABEL_3: z.string(),
    NEXT_PUBLIC_PHONE_NUMBER_3: z.string(),
    NEXT_PUBLIC_EMAIL: z.string(),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
    AUTH_SECRET: process.env.AUTH_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    RESEND_FROM_NAME: process.env.RESEND_FROM_NAME,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_SOCIAL_INSTAGRAM: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
    NEXT_PUBLIC_SOCIAL_LINKEDIN: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN,
    NEXT_PUBLIC_SOCIAL_FACEBOOK: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
    NEXT_PUBLIC_SOCIAL_GOOGLE: process.env.NEXT_PUBLIC_SOCIAL_GOOGLE,
    NEXT_PUBLIC_ADDRESS: process.env.NEXT_PUBLIC_ADDRESS,
    NEXT_PUBLIC_PHONE_LABEL: process.env.NEXT_PUBLIC_PHONE_LABEL,
    NEXT_PUBLIC_PHONE_NUMBER: process.env.NEXT_PUBLIC_PHONE_NUMBER,
    NEXT_PUBLIC_PHONE_LABEL_2: process.env.NEXT_PUBLIC_PHONE_LABEL_2,
    NEXT_PUBLIC_PHONE_NUMBER_2: process.env.NEXT_PUBLIC_PHONE_NUMBER_2,
    NEXT_PUBLIC_PHONE_LABEL_3: process.env.NEXT_PUBLIC_PHONE_LABEL_3,
    NEXT_PUBLIC_PHONE_NUMBER_3: process.env.NEXT_PUBLIC_PHONE_NUMBER_3,
    NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL,
  },
});

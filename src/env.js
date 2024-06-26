import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.string(),
    AUTH_SECRET: z.string().min(3),
    // AUTH_FACEBOOK_ID: z.string().min(3),
    // AUTH_FACEBOOK_SECRET: z.string().min(3),
    AUTH_GOOGLE_ID: z.string().min(3),
    AUTH_GOOGLE_SECRET: z.string().min(3),
    AUTH_RESEND_KEY: z.string().min(3),
  },
  client: {
    NEXT_PUBLIC_GOOGLE_ID: z.string(),
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    // AUTH_FACEBOOK_ID: process.env.AUTH_FACEBOOK_ID,
    // AUTH_FACEBOOK_SECRET: process.env.AUTH_FACEBOOK_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    AUTH_RESEND_KEY: process.env.AUTH_RESEND_KEY,
    NEXT_PUBLIC_GOOGLE_ID: process.env.NEXT_PUBLIC_GOOGLE_ID,
    NODE_ENV:
      process.env.NODE_ENV === "development" ? "development" : "production",
    NEXT_PUBLIC_APP_URL:
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },
  emptyStringAsUndefined: true,
});

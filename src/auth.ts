import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/prisma";
import { env } from "~/env";
import { OAuth2Client } from "google-auth-library";
export const adapter = PrismaAdapter(db);
export const googleAuthClient = new OAuth2Client(env.NEXT_PUBLIC_GOOGLE_ID);
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: adapter,
  session: { strategy: "jwt" },
  ...authConfig,
});

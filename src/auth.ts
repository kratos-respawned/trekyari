import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github"
import google from "next-auth/providers/google";
import facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./validators/sign-in-schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./server/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
  },
  adapter: DrizzleAdapter(db),

  providers: [
    google,
    facebook,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = {};
        const { email, password } = await signInSchema.parseAsync(credentials);
        // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password)

        // logic to verify if user exists
        // user = await getUserFromDb(credentials.email, pwHash)

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        // return user object with the their profile data
        return user;
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
export type {
  Account,
  DefaultSession,
  Profile,
  Session,
  User,
} from "@auth/core/types";
export type { AdapterSession } from "next-auth/adapters";

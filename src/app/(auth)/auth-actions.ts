"use server";

import { signIn } from "~/auth";

export const googleOauth = async () => {
  await signIn("google");
};

"use server";

import NextAuth from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "~/auth";
import { signInSchema } from "~/validators/sign-in-schema";

export const googleOauth = async () => {
  await signIn("google");
};

export const passwordAuth = async (values: unknown) => {
  const { data, success } = signInSchema.safeParse(values);
  if (!success) {
    console.log("Invalid data");
    return;

  }
  const { email, password } = data;
  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: true,
      redirectTo: "/",
    });
    redirect("/");
  } catch (error) {
    return;
  }
};

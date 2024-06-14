import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

import { redirect } from "next/navigation";
import { auth } from "~/auth";

export const metadata: Metadata = {
  title: "Create Account ",
  description:
    " Create your Trekyaari account to access your saved trips, reviews, and more.",
};

export default async function VerificationPage({
  _,
  searchParams,
}: {
  _: never;
  searchParams: { token: string | undefined };
}) {
  const session = await auth();
  if (session && session.user) {
    redirect("/");
  }

  return (
    <div className="lg:p-8 place-self-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "link" }),
          "absolute text-foreground hover:text-primary right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Home
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Email Verification
          </h1>
          <p className="text-sm text-muted-foreground">
            Your account has been verified. You can now login to your account.
          </p>
          <Link
            href={"/auth/login"}
            className="underline underline-offset-4 hover:text-primary"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

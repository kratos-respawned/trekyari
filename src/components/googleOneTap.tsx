"use client";
import { useSession } from "next-auth/react";
import useOneTapSignin from "~/hooks/useOneTap";

export const GoogleOneTap = () => {
  const { isLoading: oneTapIsLoading } = useOneTapSignin({
    redirect: true,
    parentContainerId: "oneTap",
  });
  const session = useSession();
  if (session?.status === "authenticated") {
    return null;
  }
  return <div id="oneTap" data-use_fedcm_for_prompt="true" className=" absolute top-14 right-0" />;
};

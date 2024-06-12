"use client";

import { useSession } from "next-auth/react";
import useOneTapSignin from "~/hooks/useOneTap";

const OneTapComponent = () => {
  const { isLoading: oneTapIsLoading } = useOneTapSignin({
    redirect: true,
    // callbackUrl:'/api/auth/callback/google',
    parentContainerId: "g_id_onload",
  });
  // const session = useSession();
  // if (session.status === "authenticated") return null;
  return (
    <>
      <div
        className="fixed top-14 right-0 z-[100]"
        id="g_id_onload"
        data-context="signin"
        data-ux_mode="popup"
        data-auto_select="true"
        data-itp_support="true"
        data-use_fedcm_for_prompt="true"
      ></div>
    </>
  );
};

export default OneTapComponent;

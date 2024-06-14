"use client";
import { env } from "~/env";
import useOneTapSignin from "~/hooks/useOneTap";
const OneTapComponent = () => {
  const { isLoading: oneTapIsLoading } = useOneTapSignin({
    redirect: true,
    parentContainerId: "g_id_onload",
  });
  return (
    <div
      className="fixed top-14 right-0 z-[100]"
      id="g_id_onload"
      data-context="signin"
      data-ux_mode="popup"
      data-auto_select="true"
      data-itp_support="true"
      data-use_fedcm_for_prompt="true"
    />
  );
};

export default OneTapComponent;

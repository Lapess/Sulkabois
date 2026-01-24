"use client";
import { exchangeCodeForSession } from "@/services/supabase/auth/session";
import router from "next/router";
import { useEffect } from "react";

interface Props {
  code: string | undefined;
}
const CallBackContainer = ({ code }: Props) => {
  useEffect(() => {
    const exchange = async () => {
      if (!code) {
        console.log("no code dude");
        return;
      }

      const success = await exchangeCodeForSession(code);

      if (!success) {
        return;
      }
      // At this point the user IS authenticated
      router.replace("/dashboard");
    };

    exchange();
  }, []);

  return <></>;
};

export default CallBackContainer;

"use client";
import { exchangeCodeForSession } from "@/services/supabase/auth/session";
import router from "next/router";
import { useEffect } from "react";

const CallBackContainer = () => {
  useEffect(() => {
    const exchange = async () => {
      const code = new URLSearchParams(window.location.search).get("code");

      if (!code) return;

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

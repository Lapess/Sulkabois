"use client";
import { createSupabaseClient } from "@/lib/supabase/client";
import router from "next/router";
import { useEffect } from "react";

const CallBackContainer = () => {
  useEffect(() => {
    const exchange = async () => {
      const code = new URLSearchParams(window.location.search).get("code");

      if (!code) return;

      const { error } =
        await createSupabaseClient().auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Auth error:", error.message);
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

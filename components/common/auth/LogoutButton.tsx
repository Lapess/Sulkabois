"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/services/supabase/auth/session";
import { Button } from "@chakra-ui/react";

export function LogoutButton() {
  const router = useRouter();
  const logout = () => {
    signOut().then(() => router.push("/auth/login"));
  };

  return (
    <Button colorPalette={"red"} variant={"outline"} onClick={logout}>
      Logout
    </Button>
  );
}

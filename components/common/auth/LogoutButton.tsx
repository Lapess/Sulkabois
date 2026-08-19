"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/services/supabase/auth/client";
import { Button } from "@chakra-ui/react";

export function LogoutButton() {
  const router = useRouter();
  const logout = async () => {
    await signOut();
    router.refresh();
    router.push("/auth/login");
  };

  return (
    <Button colorPalette={"red"} variant={"outline"} onClick={logout}>
      Kirjaudu ulos
    </Button>
  );
}

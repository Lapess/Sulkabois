"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/services/supabase/auth/client";
import { Button, Center, Text } from "@chakra-ui/react";

export function LogoutButton() {
  const router = useRouter();
  const logout = async () => {
    await signOut();
    router.refresh();
    router.push("/auth/login");
  };

  return (
    <Button onClick={logout} variant={"outline"} color={"orange"}>
      <Center>
        <Text>Kirjaudu ulos</Text>
      </Center>
    </Button>
  );
}

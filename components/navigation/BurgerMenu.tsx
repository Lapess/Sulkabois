"use client";

import {
  Separator,
  IconButton,
  Menu,
  MenuItem,
  Portal,
  Text,
} from "@chakra-ui/react";
import { Menu as MenuIcon, PlusIcon } from "lucide-react";
import { signOut } from "@/services/supabase/auth/client";
import { useRouter } from "next/navigation";

export function BurgerMenu() {
  const router = useRouter();
  const logout = async () => {
    await signOut();
    router.refresh();
    router.push("/auth/login");
  };
  return (
    <Menu.Root positioning={{ placement: "bottom-end" }}>
      <Menu.Trigger asChild>
        <IconButton
          aria-label="Valikko"
          variant="ghost"
          color="white"
          size="md"
          border={"none"}
        >
          <MenuIcon />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <MenuItem value="create-player-group">
              Luo uusi peliporukka (ei vielä käytössä)
            </MenuItem>
            <Separator my={2} />
            <MenuItem value="logout" onClick={logout}>
              Kirjaudu ulos
            </MenuItem>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

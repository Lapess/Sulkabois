"use client";
import { passwordlessSignIn } from "@/services/supabase/auth/session";
import { Button, Menu } from "@chakra-ui/react";

const TestMenu = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button>Admin</Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item
            value="1"
            onClick={() => passwordlessSignIn("ville@skolekauneus.fi")}
          >
            Kutsu
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export default TestMenu;

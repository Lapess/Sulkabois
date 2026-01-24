import { getUser } from "@/services/supabase/auth/user";
import { Button, Flex, HStack, Link } from "@chakra-ui/react";
import { LogoutButton } from "../common/auth/LogoutButton";
import TestMenu from "../Testing/TestMenu";

async function MainMenu() {
  const user = await getUser();

  return (
    <Flex gap={2} m={2} justify={"space-between"}>
      <Button p={5} colorPalette={"black"} variant={"outline"}>
        <Link href="/">Etusivu</Link>
      </Button>
      <HStack>
        <TestMenu />
        {user != null && <LogoutButton />}
      </HStack>
    </Flex>
  );
}

export default MainMenu;

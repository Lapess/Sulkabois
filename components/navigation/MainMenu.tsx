import { getUser } from "@/services/supabase/auth/user";
import { Button, Flex, HStack, Link } from "@chakra-ui/react";
import { LogoutButton } from "../common/auth/LogoutButton";
import TestMenu from "../Testing/TestMenu";
import { getPlayerWithUserId } from "@/services/supabase/players";

async function MainMenu() {
  const user = await getUser();
  let isAdminUser = false;
  if (user) isAdminUser = (await getPlayerWithUserId(user.id)).isAdmin;
  return (
    <Flex gap={2} m={2} justify={"space-between"}>
      <Button p={5} colorPalette={"black"} variant={"outline"}>
        <Link href="/">Etusivu</Link>
      </Button>
      <HStack>
        {isAdminUser && <TestMenu />}
        {user != null && <LogoutButton />}
      </HStack>
    </Flex>
  );
}

export default MainMenu;

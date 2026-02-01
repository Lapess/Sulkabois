import { getUser } from "@/services/supabase/auth/server";
import { Button, Flex, HStack, Link } from "@chakra-ui/react";
import { LogoutButton } from "../common/auth/LogoutButton";
import RestrictedRender from "../common/auth/RestrictedRender";

async function MainMenu() {
  const user = await getUser();
  return (
    <Flex gap={2} m={2} justify={"space-between"}>
      <Button p={5} colorPalette={"black"} variant={"outline"}>
        <Link href="/">Etusivu</Link>
      </Button>
      <RestrictedRender>
        <HStack>{user && <LogoutButton />}</HStack>
      </RestrictedRender>
    </Flex>
  );
}

export default MainMenu;

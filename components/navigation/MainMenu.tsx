import { getUser } from "@/services/supabase/auth/server";
import { Button, Center, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { LogoutButton } from "../common/auth/LogoutButton";

async function MainMenu() {
  const user = await getUser();
  return (
    <Flex h={"4rem"} gap={2} m={0} p={2} justify={"space-between"} bg={"black"}>
      <Center>
        <Button p={5} bg={"orange"} color={"black"} fontSize={"xl"}>
          <Link href="/">Etusivu</Link>
        </Button>
      </Center>
      {user && (
        <HStack>
          {user.player?.name && (
            <Text pr={2} color={"white"}>
              {user.player.name.split(" ")[0]}
            </Text>
          )}
          <LogoutButton />
        </HStack>
      )}
    </Flex>
  );
}

export default MainMenu;

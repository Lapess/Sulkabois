import { PlayerGroup } from "@/interfaces/PlayerGroup";
import { SessionGroup } from "@/types/SessionGroup";
import {
  Box,
  Flex,
  Text,
  Link,
  HStack,
  Spacer,
  Stack,
  Center,
} from "@chakra-ui/react";
import { ChevronRight, DotIcon } from "lucide-react";

interface Props {
  sessionGroup: SessionGroup;
  playerGroup: PlayerGroup | null;
}
const SessionGroupBlock = ({ sessionGroup, playerGroup }: Props) => {
  const sessionCount = sessionGroup.session?.length ?? 0;
  const ownerName = playerGroup?.name ?? sessionGroup.playerGroup?.name;

  return (
    <>
      <Link
        key={sessionGroup.id}
        fontSize={"2xl"}
        href={"/sessiongroups/" + sessionGroup.id}
        w={"90%"}
      >
        <Box borderWidth={1} borderColor={"orange"} p={5} w={"100%"}>
          <Flex>
            <Stack>
              <Text>{sessionGroup.name}</Text>
              <HStack gap={4} w={"100%"}>
                {ownerName && <Text fontSize={"xs"}>{ownerName}</Text>}
                {ownerName && <DotIcon />}
                <Text fontSize={"xs"}>
                  {sessionCount} pelikerta
                  {sessionCount !== 1 ? "a" : ""}
                </Text>
              </HStack>
            </Stack>
            <Spacer />
            <Center>
              <ChevronRight />
            </Center>
          </Flex>
        </Box>
      </Link>
    </>
  );
};
export default SessionGroupBlock;

import { PlayerGroup } from "@/interfaces/PlayerGroup";
import { getSessionsBySessionGroupId } from "@/services/supabase/sessions";
import { Session } from "@/types/Session";
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
import { useEffect, useState } from "react";

interface Props {
  sessionGroup: SessionGroup;
  playerGroup: PlayerGroup | null;
}
const SessionGroupBlock = ({ sessionGroup, playerGroup }: Props) => {
  const [sessions, setSessions] = useState<Session[] | null>([]);
  useEffect(() => {
    getSessionsBySessionGroupId(sessionGroup.id).then(setSessions);
  }, []);
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
                <Text fontSize={"xs"}>{playerGroup?.name}</Text>
                <DotIcon />
                <Text fontSize={"xs"}>
                  {sessions?.length} pelikerta
                  {sessions?.length! > 1 ? "a" : ""}
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

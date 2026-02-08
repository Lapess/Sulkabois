import { PlayerGroup } from "@/interfaces/PlayerGroup";
import convertDateStringToLocaleDateString from "@/services/dateStringConverter";
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
import { ArrowRight, ChevronRight, DotIcon, LockIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  session: Session;
  sessionGroupId: number;
  borderColor?: string;
}
const SessionBlock = ({ session, sessionGroupId, borderColor }: Props) => {
  const [sessions, setSessions] = useState<Session[] | null>([]);
  useEffect(() => {
    getSessionsBySessionGroupId(sessionGroupId).then(setSessions);
  }, []);
  return (
    <>
      <Link
        key={session.id}
        fontSize={"2xl"}
        href={"/sessiongroups/" + sessionGroupId + "/sessions/" + session.id}
        w={"90%"}
      >
        <Box
          borderWidth={1}
          borderColor={borderColor ?? "orange"}
          p={3}
          w={"100%"}
        >
          <Flex>
            <Stack>
              <Text>
                {convertDateStringToLocaleDateString(session.session_date)}
              </Text>
              <HStack gap={4} w={"100%"}>
                <Text fontSize={"xs"}>
                  {session.game?.length! > 0
                    ? session.game?.length + " peliä"
                    : "Ei pelejä"}
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
export default SessionBlock;

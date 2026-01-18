"use client";
import { Session } from "@/types/Session";
import convertDateStringToLocaleDateString from "@/services/dateStringConverter";
import { getSessions } from "@/services/supabase/sessions";
import {
  Box,
  Center,
  Flex,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowRight, LockIcon } from "lucide-react";
import { useEffect, useState } from "react";
import NewSessionForm from "../forms/NewSessionForm";
interface Props {
  sessionGroupId: number;
}
const SessionPageContainer = ({ sessionGroupId }: Props) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  useEffect(() => {
    getSessions().then((sessions) =>
      setSessions(
        sessions?.filter(
          (x) => x.session_group_id == sessionGroupId && x != null,
        ) ?? [],
      ),
    );
  }, []);

  return (
    <VStack>
      {sessions?.map((s) => (
        <Link
          key={s.id}
          fontSize={"2xl"}
          href={"/sessiongroups/" + sessionGroupId + "/sessions/" + s.id}
          w={"90%"}
        >
          <Box borderWidth={1} borderColor={"orange"} p={5} w={"100%"}>
            <Flex justify={"space-between"}>
              <Text>{convertDateStringToLocaleDateString(s.session_date)}</Text>
              <HStack>
                <Text pr={4}>
                  {s.game?.length! > 0 ? s.game?.length + " peliä" : ""}
                </Text>
                {s.is_locked ? <LockIcon /> : <ArrowRight />}
              </HStack>
            </Flex>
          </Box>
        </Link>
      ))}

      <NewSessionForm sessionGroupId={sessionGroupId} />
    </VStack>
  );
};

export default SessionPageContainer;

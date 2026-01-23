"use client";
import { Session } from "@/types/Session";
import convertDateStringToLocaleDateString from "@/services/dateStringConverter";
import { getSessionsBySessionGroupId } from "@/services/supabase/sessions";
import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowRight, LockIcon } from "lucide-react";
import { useEffect, useState } from "react";
import NewSessionForm from "../forms/NewSessionForm";
import { inviteUser } from "@/services/supabase/auth/session";
interface Props {
  sessionGroupId: number;
}
const SessionPageContainer = ({ sessionGroupId }: Props) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  useEffect(() => {
    getSessionsBySessionGroupId(sessionGroupId).then((sessions) =>
      setSessions(
        sessions
          ?.sort(
            (a, b) =>
              new Date(a.session_date).getTime() -
              new Date(b.session_date).getTime(),
          )
          .filter((x) => x != null) ?? [],
      ),
    );
  }, []);

  return (
    <VStack>
      <Button
        onClick={() =>
          inviteUser("ville@skolekauneus.fi").then(() => console.log(""))
        }
      >
        Kutsu
      </Button>
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

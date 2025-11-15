"use client";
import { Session } from "@/types/Session";
import { addSession, getSessions } from "@/utils/supabase/browser/sessions";
import {
  Box,
  Link,
  Text,
  Button,
  Heading,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import convertDateStringToLocaleDateString from "@/utils/dateStringConverter";

const SessionPageContainer = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  useEffect(() => {
    getSessions().then((sessions) =>
      setSessions(sessions?.filter((x) => x != null) ?? [])
    );
  }, []);

  function createSession() {
    addSession().then((data) => data && setSessions([...sessions, data]));
  }
  return (
    <>
      {sessions?.map((s) => (
        <Link fontSize={"2xl"} href={"/sessions/" + s.id} w={"90%"}>
          <Box borderWidth={1} borderColor={"orange"} p={5} w={"100%"}>
            <Flex justify={"space-between"}>
              <Text>{convertDateStringToLocaleDateString(s.session_date)}</Text>
              <HStack>
                <Text pr={4}>{s.game?.length} peliä</Text>
                <ArrowRight />
              </HStack>
            </Flex>
          </Box>
        </Link>
      ))}
      <Button
        m={10}
        size={"xl"}
        color={"black"}
        variant={"solid"}
        bgColor={"orange"}
        onClick={() => createSession()}
      >
        Uusi
      </Button>
    </>
  );
};

export default SessionPageContainer;

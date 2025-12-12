"use client";
import { Session } from "@/types/Session";
import convertDateStringToLocaleDateString from "@/utils/dateStringConverter";
import { getSessions } from "@/utils/supabase/browser/sessions";
import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { ArrowRight, LockIcon } from "lucide-react";
import { useEffect, useState } from "react";
import NewSessionForm from "../forms/NewSessionForm";

const SessionPageContainer = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  useEffect(() => {
    getSessions().then((sessions) =>
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
    <>
      {sessions?.map((s) => (
        <Link key={s.id} fontSize={"2xl"} href={"/sessions/" + s.id} w={"90%"}>
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

      <NewSessionForm />
    </>
  );
};

export default SessionPageContainer;

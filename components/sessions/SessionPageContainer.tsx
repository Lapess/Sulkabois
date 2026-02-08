"use client";
import { Session } from "@/types/Session";
import convertDateStringToLocaleDateString from "@/services/dateStringConverter";
import { getSessionsBySessionGroupId } from "@/services/supabase/sessions";
import { Box, Flex, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { ArrowRight, LockIcon } from "lucide-react";
import { useEffect, useState } from "react";
import NewSessionForm from "../forms/NewSessionForm";
import SessionBlock from "./SessionBlock";
import CollapsibleSessions from "./CollapsibleSessions";

interface Props {
  sessionGroupId: number;
}

const SessionPageContainer = ({ sessionGroupId }: Props) => {
  const [sessions, setSessions] = useState<Session[] | null>(null);
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
      {sessions && sessions.length > 0 ? (
        <>
          <CollapsibleSessions sessions={sessions.filter((x) => x.is_locked)} />
          {sessions
            ?.filter((s) => !s.is_locked)
            .map((s) => (
              <SessionBlock session={s} sessionGroupId={sessionGroupId} />
            ))}
        </>
      ) : sessions === null ? (
        <Text>Ladataan...</Text>
      ) : (
        <Text>Aloita pelit alla olevalla painikkeella!</Text>
      )}

      <HStack>
        <NewSessionForm sessionGroupId={sessionGroupId} />
      </HStack>
    </VStack>
  );
};

export default SessionPageContainer;

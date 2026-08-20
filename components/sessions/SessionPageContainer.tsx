"use client";
import { Session } from "@/types/Session";
import { getSessionsBySessionGroupId } from "@/services/supabase/sessions";
import { Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SessionBlock from "./SessionBlock";

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
          {sessions.map((s) => (
            <SessionBlock session={s} sessionGroupId={sessionGroupId} />
          ))}
        </>
      ) : sessions === null ? (
        <Text>Ladataan...</Text>
      ) : (
        <Text>Ei vielä yhtään peliä!</Text>
      )}
    </VStack>
  );
};

export default SessionPageContainer;

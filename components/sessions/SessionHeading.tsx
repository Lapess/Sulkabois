"use client";
import { Session } from "@/types/Session";
import { getSessionById } from "@/utils/supabase/browser/sessions";
import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
  sessionId: number;
}
const SessionHeading = ({ sessionId }: Props) => {
  const [session, setSession] = useState<Session | null>();
  useEffect(() => {
    getSessionById(sessionId).then(setSession);
  }, []);
  return <Heading>{session?.session_date}</Heading>;
};

export default SessionHeading;

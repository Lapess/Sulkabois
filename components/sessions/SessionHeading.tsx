"use client";
import convertDateStringToLocaleDateString from "@/services/dateStringConverter";
import { getSessionById } from "@/services/supabase/sessions";
import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
  sessionId: number;
}
const SessionHeading = ({ sessionId }: Props) => {
  const [sessionDate, setSessionDate] = useState<string>("");

  useEffect(() => {
    getSessionById(sessionId).then((session) =>
      setSessionDate(
        convertDateStringToLocaleDateString(session?.session_date ?? ""),
      ),
    );
  }, []);
  return <Heading pb={5}>Pelisessio {sessionDate}</Heading>;
};

export default SessionHeading;

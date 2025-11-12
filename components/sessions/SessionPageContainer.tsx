"use client";
import { Session } from "@/types/Session";
import { addSession, getSessions } from "@/utils/supabase/browser/sessions";
import { Link } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react/button";
import { useEffect, useState } from "react";

const SessionPageContainer = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  useEffect(() => {
    getSessions().then(setSessions);
  }, []);

  function createSession() {
    console.log("creating");
    addSession().then((data) => data && setSessions([...sessions, data]));
  }
  return (
    <>
      {sessions?.map((s) => (
        <Link fontSize={"2xl"} href={"/sessions/" + s.id}>
          {s.session_date}
        </Link>
      ))}
      <Button
        size={"xl"}
        color={"green"}
        variant={"outline"}
        onClick={() => createSession()}
      >
        Uusi
      </Button>
    </>
  );
};

export default SessionPageContainer;

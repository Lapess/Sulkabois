"use client";
import { SessionGroup } from "@/types/SessionGroup";
import { 
  getSessionGroupsByUserId,
} from "@/services/supabase/sessiongroups";
import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import NewSessionGroupForm from "../forms/NewSessionGroupForm"; 
import SessionGroupBlock from "./SessionGroupBlock";

function SessionGroupPageContainer() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sessionGroups, setSessionGroups] = useState<SessionGroup[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getSessionGroupsByUserId(user?.id ?? "")
      .then((sessionGroups: SessionGroup[] | null) => {
        setSessionGroups(
          sessionGroups?.filter((x: SessionGroup) => x != null) ?? [],
        );
      })
      .finally(() => setIsLoading(false));
  }, [user]);

  return (
    <>
      {sessionGroups?.length > 0 && (
        <>
          {sessionGroups?.map((s) => (
            <SessionGroupBlock
              key={s.id}
              playerGroup={s.}
              sessionGroup={s}
            />
          ))}
          <NewSessionGroupForm />
        </>
      )}

      {isLoading && <Spinner />}
    </>
  );
}

export default SessionGroupPageContainer;

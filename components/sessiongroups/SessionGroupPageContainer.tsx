"use client";
import { SessionGroup } from "@/types/SessionGroup";
import {
  getSessionGroupsByPlayerGroupId,
  getSessionGroupsByUserId,
} from "@/services/supabase/sessiongroups";
import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getSessionUser } from "@/services/supabase/auth/client";
import { User } from "@supabase/supabase-js";
import NewSessionGroupForm from "../forms/NewSessionGroupForm";
import { usePlayerGroup } from "../context/PlayerGroupContext";
import SessionGroupBlock from "./SessionGroupBlock";
import PlayerGroupSelection from "../navigation/PlayerGroupSelection";

function SessionGroupPageContainer() {
  const { selectedPlayerGroup } = usePlayerGroup();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sessionGroups, setSessionGroups] = useState<SessionGroup[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getSessionUser().then(setUser);
  }, []);
  useEffect(() => {
    setIsLoading(true);
    if (selectedPlayerGroup) {
      var promise =
        selectedPlayerGroup.id == 0
          ? getSessionGroupsByUserId(user?.id ?? "")
          : getSessionGroupsByPlayerGroupId(selectedPlayerGroup.id);
      promise
        .then((sessionGroups) => {
          setSessionGroups(sessionGroups?.filter((x) => x != null) ?? []);
        })
        .finally(() => setIsLoading(false));
    } else setIsLoading(false);
  }, [user, selectedPlayerGroup]);

  return (
    <>
      <Box rounded={"md"} borderWidth={"2px"} borderColor={"orange"} mb={5}>
        <Center>
          <PlayerGroupSelection />
        </Center>
      </Box>
      {sessionGroups?.length > 0 && (
        <>
          {sessionGroups?.map((s) => (
            <SessionGroupBlock
              playerGroup={selectedPlayerGroup}
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

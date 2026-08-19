"use client";
import { SessionGroupsByPlayerGroup } from "@/types/SessionGroup";
import { getSessionGroupsGroupedByPlayerGroup } from "@/services/supabase/sessiongroups";
import { Heading, Spinner, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import NewSessionGroupForm from "../forms/NewSessionGroupForm";
import SessionGroupBlock from "./SessionGroupBlock";

function SessionGroupPageContainer() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sessionGroupsByPlayerGroup, setSessionGroupsByPlayerGroup] = useState<
    SessionGroupsByPlayerGroup[]
  >([]);

  useEffect(() => {
    if (!user?.id) return;
    setIsLoading(true);
    getSessionGroupsGroupedByPlayerGroup(user.id)
      .then((groups) => {
        setSessionGroupsByPlayerGroup(groups ?? []);
      })
      .finally(() => setIsLoading(false));
  }, [user]);

  return (
    <>
      {sessionGroupsByPlayerGroup.map((group) => (
        <VStack
          key={group.playerGroup?.id ?? "personal"}
          w={"100%"}
          gap={3}
          mb={6}
        >
          <Heading fontSize={"lg"} w={"90%"}>
            {group.playerGroup?.name ?? "Omat peliryhmät"}
          </Heading>
          {group.sessionGroups.map((sessionGroup) => (
            <SessionGroupBlock
              key={sessionGroup.id}
              playerGroup={group.playerGroup}
              sessionGroup={sessionGroup}
            />
          ))}
          <NewSessionGroupForm playerGroup={group.playerGroup} />
        </VStack>
      ))}
      {isLoading && <Spinner />}
    </>
  );
}

export default SessionGroupPageContainer;

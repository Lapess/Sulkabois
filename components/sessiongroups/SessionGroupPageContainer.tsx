"use client";
import { SessionGroupsByPlayerGroup } from "@/types/SessionGroup";
import { getSessionGroupsGroupedByPlayerGroup } from "@/services/supabase/sessiongroups";
import { Center, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Carousel from "../navigation/Carousel";

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
      <Carousel sessionGroupsByPlayerGroup={sessionGroupsByPlayerGroup} />
      <Center>{isLoading && <Spinner />}</Center>
    </>
  );
}

export default SessionGroupPageContainer;

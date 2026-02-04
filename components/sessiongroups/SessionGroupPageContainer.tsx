"use client";
import { SessionGroup } from "@/types/SessionGroup";
import {
  getSessionGroupsByPlayerGroupId,
  getSessionGroupsByUserId,
} from "@/services/supabase/sessiongroups";
import { Box, Flex, HStack, Link, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getSessionUser } from "@/services/supabase/auth/client";
import { User } from "@supabase/supabase-js";
import { ArrowRight } from "lucide-react";
import NewSessionGroupForm from "../forms/NewSessionGroupForm";
import { usePlayerGroup } from "../context/PlayerGroupContext";

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
    var promise =
      selectedPlayerGroup == 0
        ? getSessionGroupsByUserId(user?.id ?? "")
        : getSessionGroupsByPlayerGroupId(selectedPlayerGroup!);
    promise
      .then((sessionGroups) => {
        setSessionGroups(sessionGroups?.filter((x) => x != null) ?? []);
      })
      .finally(() => setIsLoading(false));
  }, [user, selectedPlayerGroup]);

  return (
    <>
      {sessionGroups?.map((s) => (
        <Link
          key={s.id}
          fontSize={"2xl"}
          href={"/sessiongroups/" + s.id}
          w={"90%"}
        >
          <Box borderWidth={1} borderColor={"orange"} p={5} w={"100%"}>
            <Flex justify={"space-between"}>
              <Text>{s.name}</Text> <ArrowRight />
            </Flex>
          </Box>
        </Link>
      ))}
      <NewSessionGroupForm />
      {isLoading && <Spinner />}
    </>
  );
}

export default SessionGroupPageContainer;

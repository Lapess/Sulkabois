"use client";
import { SessionGroup } from "@/types/SessionGroup";
import { getSessionGroupsByUserId } from "@/services/supabase/sessiongroups";
import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

interface Props {
  user: User;
}
const SessionGroupPageContainer = ({ user }: Props) => {
  const [sessionGroups, setSessionGroups] = useState<SessionGroup[]>([]);

  useEffect(() => {
    getSessionGroupsByUserId(user?.id ?? "").then((sessionGroups) => {
      setSessionGroups(sessionGroups?.filter((x) => x != null) ?? []);
      console.log("sessiongroups: " + sessionGroups?.length);
    });
  }, []);

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
              <Text>{s.name}</Text>
              <HStack>
                <Text pr={4}>Tähän tulloo peliryhmän sessiot</Text>
              </HStack>
            </Flex>
          </Box>
        </Link>
      ))}
    </>
  );
};

export default SessionGroupPageContainer;

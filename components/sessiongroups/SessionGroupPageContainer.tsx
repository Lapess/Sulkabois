"use client";
import { SessionGroup } from "@/types/SessionGroup";
import { getSessionGroupsByUserId } from "@/services/supabase/sessiongroups";
import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getSessionUser } from "@/services/supabase/auth/session";
import { User } from "@supabase/supabase-js";
import { ArrowRight } from "lucide-react";

function SessionGroupPageContainer() {
  const [sessionGroups, setSessionGroups] = useState<SessionGroup[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getSessionUser().then(setUser);
  });
  useEffect(() => {
    getSessionGroupsByUserId(user?.id ?? "").then((sessionGroups) => {
      setSessionGroups(sessionGroups?.filter((x) => x != null) ?? []);
    });
  }, [user]);

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
    </>
  );
}

export default SessionGroupPageContainer;

import { Session } from "@/types/Session";
import { Box, Center, Collapsible, Stack, VStack } from "@chakra-ui/react";
import { LuChevronRight } from "react-icons/lu";
import SessionBlock from "./SessionBlock";

interface Props {
  sessions: Session[];
}
const CollapsibleSessions = ({ sessions }: Props) => {
  return (
    <Collapsible.Root w={"100%"}>
      <Box w={"100%"}>
        <Center>
          <Collapsible.Trigger
            fontSize={"xl"}
            paddingY="3"
            display="flex"
            gap="2"
            alignItems="center"
          >
            <Collapsible.Indicator
              transition="transform 0.2s"
              _open={{ transform: "rotate(90deg)" }}
            >
              <LuChevronRight />
            </Collapsible.Indicator>
            Aiemmat pelisessiot
          </Collapsible.Trigger>
        </Center>
      </Box>
      <Collapsible.Content>
        <VStack pb={6}>
          {sessions.map((session) => (
            <SessionBlock
              session={session}
              sessionGroupId={session.session_group_id!}
              borderColor={"gray"}
            />
          ))}
        </VStack>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default CollapsibleSessions;

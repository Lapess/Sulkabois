"use client";

import { Tabs as ChakraTabs, VStack } from "@chakra-ui/react";
import SessionPageContainer from "../sessions/SessionPageContainer";
import LeaderTable from "../leaderboard/LeaderTable";
import { LeaderBoardType } from "@/enums/LeaderBoardType";
import GeneralDataTable from "../leaderboard/GeneralDataTable";

const Tabs = ({ sessionGroupId }: { sessionGroupId: number }) => {
  return (
    <ChakraTabs.Root
      lazyMount
      unmountOnExit
      defaultValue="tab-1"
      minHeight={"80vh"}
    >
      <ChakraTabs.List>
        <ChakraTabs.Trigger value="tab-1">Statistiikka</ChakraTabs.Trigger>
        <ChakraTabs.Trigger value="tab-2">Aiemmat pelit</ChakraTabs.Trigger>
      </ChakraTabs.List>
      <ChakraTabs.Content value="tab-1">
        <VStack w={"100%"} gap={4} minH={1000}>
          <GeneralDataTable sessionGroupId={sessionGroupId} />
          <LeaderTable
            type={LeaderBoardType.All}
            sessionGroupId={sessionGroupId}
            w={"100%"}
            py={4}
          />
          <LeaderTable
            type={LeaderBoardType.Singles}
            sessionGroupId={sessionGroupId}
            w={"100%"}
            py={4}
          />
          <LeaderTable
            type={LeaderBoardType.Doubles}
            sessionGroupId={sessionGroupId}
            w={"100%"}
            py={4}
          />
          <LeaderTable
            type={LeaderBoardType.OneVSTwo}
            sessionGroupId={sessionGroupId}
            w={"100%"}
            py={4}
          />
        </VStack>
      </ChakraTabs.Content>{" "}
      <ChakraTabs.Content value="tab-2">
        <SessionPageContainer sessionGroupId={sessionGroupId} />
      </ChakraTabs.Content>
    </ChakraTabs.Root>
  );
};

export default Tabs;

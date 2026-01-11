import Login from "@/components/forms/auth/Login";
import GeneralDataTable from "@/components/leaderboard/GeneralDataTable";
import LeaderTable from "@/components/leaderboard/LeaderTable";
import SessionPageContainer from "@/components/sessions/SessionPageContainer";
import { LeaderBoardType } from "@/enums/LeaderBoardType";
import { Heading, VStack } from "@chakra-ui/react";

export default async function Home() {
  return (
    <>
      <VStack>
        <Heading fontSize={"2xl"}>Sulkabois</Heading>
        <Login />
        <SessionPageContainer />
        <GeneralDataTable />
        <VStack w={"100%"} gap={4}>
          <LeaderTable type={LeaderBoardType.All} w={"100%"} py={4} />
          <LeaderTable type={LeaderBoardType.Singles} w={"100%"} py={4} />
          <LeaderTable type={LeaderBoardType.Doubles} w={"100%"} py={4} />
          <LeaderTable type={LeaderBoardType.OneVSTwo} w={"100%"} py={4} />
        </VStack>
      </VStack>
    </>
  );
}

import GeneralDataTable from "@/components/leaderboard/GeneralDataTable";
import LeaderTable from "@/components/leaderboard/LeaderTable";
import SessionPageContainer from "@/components/sessions/SessionPageContainer";
import { Heading, VStack } from "@chakra-ui/react";
export default async function Home() {
  return (
    <>
      <VStack>
        <Heading fontSize={"2xl"}>Sulkabois</Heading>
        <SessionPageContainer />
        <GeneralDataTable />
        <LeaderTable />
      </VStack>
    </>
  );
}

import GeneralDataTable from "@/components/leaderboard/GeneralDataTable";
import LeaderTable from "@/components/leaderboard/LeaderTable";
import SessionGroupPageContainer from "@/components/sessiongroups/SessionGroupPageContainer";
import SessionPageContainer from "@/components/sessions/SessionPageContainer";
import { LeaderBoardType } from "@/enums/LeaderBoardType";
import { getUser } from "@/services/supabase/auth/user";
import { Heading, VStack } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/login");
  }
  return (
    <>
      <VStack>
        <Heading fontSize={"2xl"}>Sulkabois</Heading>
        <SessionGroupPageContainer user={user!} />
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

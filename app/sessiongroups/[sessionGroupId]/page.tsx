import GeneralDataTable from "@/components/leaderboard/GeneralDataTable";
import LeaderTable from "@/components/leaderboard/LeaderTable";
import SessionPageContainer from "@/components/sessions/SessionPageContainer";
import { LeaderBoardType } from "@/enums/LeaderBoardType";
import { VStack } from "@chakra-ui/react";

interface Props {
  params: Promise<{ sessionGroupId: number }>;
}

async function SessionGroupPage({ params }: Props) {
  const { sessionGroupId } = await params;
  return (
    <>
      <SessionPageContainer sessionGroupId={sessionGroupId} />
      <VStack w={"100%"} gap={4}>
        <GeneralDataTable sessionGroupId={sessionGroupId} />
        <LeaderTable type={LeaderBoardType.All} w={"100%"} py={4} />
        <LeaderTable type={LeaderBoardType.Singles} w={"100%"} py={4} />
        <LeaderTable type={LeaderBoardType.Doubles} w={"100%"} py={4} />
        <LeaderTable type={LeaderBoardType.OneVSTwo} w={"100%"} py={4} />
      </VStack>
    </>
  );
}

export default SessionGroupPage;

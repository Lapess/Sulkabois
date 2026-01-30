import RestrictedRender from "@/components/common/auth/RestrictedRender";
import GeneralDataTable from "@/components/leaderboard/GeneralDataTable";
import LeaderTable from "@/components/leaderboard/LeaderTable";
import SessionPageContainer from "@/components/sessions/SessionPageContainer";
import { LeaderBoardType } from "@/enums/LeaderBoardType";
import { Link, VStack } from "@chakra-ui/react";

interface Props {
  params: Promise<{ sessionGroupId: number }>;
}

async function SessionGroupPage({ params }: Props) {
  const { sessionGroupId } = await params;
  return (
    <RestrictedRender>
      <SessionPageContainer sessionGroupId={sessionGroupId} />
      <VStack w={"100%"} gap={4}>
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
      <VStack bg={"black"} p={10}>
        <Link
          color={"white"}
          href={"/sessiongroups/" + sessionGroupId + "/settings"}
        >
          Asetukset
        </Link>
      </VStack>
    </RestrictedRender>
  );
}

export default SessionGroupPage;

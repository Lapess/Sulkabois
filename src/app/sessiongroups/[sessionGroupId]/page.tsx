import RestrictedRender from "@/components/common/auth/RestrictedRender";
import NewSessionForm from "@/components/forms/NewSessionForm";
import GeneralDataTable from "@/components/leaderboard/GeneralDataTable";
import LeaderTable from "@/components/leaderboard/LeaderTable";
import Tabs from "@/components/navigation/Tabs";
import SessionPageContainer from "@/components/sessions/SessionPageContainer";
import { LeaderBoardType } from "@/enums/LeaderBoardType";
import { HStack, Link, VStack } from "@chakra-ui/react";
import { SettingsIcon } from "lucide-react";

interface Props {
  params: Promise<{ sessionGroupId: number }>;
}

async function SessionGroupPage({ params }: Props) {
  const { sessionGroupId } = await params;
  return (
    <RestrictedRender>
      <HStack justifyContent={"center"} w={"100%"} p={4}>
        <NewSessionForm sessionGroupId={sessionGroupId} />
      </HStack>
      <Tabs sessionGroupId={sessionGroupId} />

      <VStack bg={"black"} p={10}>
        <Link
          color={"white"}
          href={"/sessiongroups/" + sessionGroupId + "/settings"}
        >
          <SettingsIcon />
        </Link>
      </VStack>
    </RestrictedRender>
  );
}

export default SessionGroupPage;

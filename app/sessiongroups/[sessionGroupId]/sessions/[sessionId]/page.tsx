import RestrictedRender from "@/components/common/auth/RestrictedRender";
import GamePageContainer from "@/components/games/GamePageContainer";
import SessionDeleteDialog from "@/components/sessions/SessionDeleteDialog";
import SessionHeading from "@/components/sessions/SessionHeading";
import { Link, VStack } from "@chakra-ui/react";
import { ArrowLeftCircle } from "lucide-react";
interface Props {
  searchParams: Promise<{ players?: string[] | string }>;
  params: Promise<{ sessionGroupId: number; sessionId: number }>;
}
async function SessionPage({ params, searchParams }: Props) {
  const { sessionGroupId, sessionId } = await params;
  const { players } = await searchParams;
  let playerIds: string[] = [];

  if (players) {
    playerIds = Array.isArray(players) ? players : [players];
  }

  return (
    <RestrictedRender>
      <VStack>
        <Link
          p={2}
          textAlign={"left"}
          w={"100%"}
          href={"/sessiongroups/" + sessionGroupId}
        >
          <ArrowLeftCircle />
        </Link>
        <SessionHeading sessionId={sessionId} />
        <GamePageContainer
          sessionGroupId={sessionGroupId}
          sessionId={sessionId}
          playerIds={playerIds}
        />
        <SessionDeleteDialog
          sessionId={sessionId}
          sessionGroupId={sessionGroupId}
        />
      </VStack>
    </RestrictedRender>
  );
}

export default SessionPage;

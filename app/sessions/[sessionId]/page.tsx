import GamePageContainer from "@/components/games/GamePageContainer";
import SessionDeleteDialog from "@/components/sessions/SessionDeleteDialog";
import SessionHeading from "@/components/sessions/SessionHeading";
import { Link, VStack } from "@chakra-ui/react";
import { ArrowLeftCircle } from "lucide-react";
interface Props {
  searchParams: Promise<{ players?: string[] | string }>;
  params: Promise<{ sessionId: number }>;
}
async function SessionPage({ params, searchParams }: Props) {
  const { sessionId } = await params;
  const { players } = await searchParams;
  let playerIds: string[] = [];

  if (players) {
    playerIds = Array.isArray(players) ? players : [players];
  }

  return (
    <VStack>
      <Link p={2} textAlign={"left"} w={"100%"} href="/">
        <ArrowLeftCircle />
      </Link>
      <SessionHeading sessionId={sessionId} />
      <GamePageContainer sessionId={sessionId} playerIds={playerIds} />
      <SessionDeleteDialog sessionId={sessionId} />
    </VStack>
  );
}

export default SessionPage;

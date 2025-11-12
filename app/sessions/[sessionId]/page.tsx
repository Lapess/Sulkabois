import GamePageContainer from "@/components/games/GamePageContainer";
import SessionDeleteButton from "@/components/sessions/SessionDeleteButton";
import SessionHeading from "@/components/sessions/SessionHeading";
import { VStack } from "@chakra-ui/react";

async function SessionPage({
  params,
}: {
  params: Promise<{ sessionId: number }>;
}) {
  const { sessionId } = await params;

  return (
    <VStack>
      <SessionHeading sessionId={sessionId} />
      <GamePageContainer sessionId={sessionId} />
      <SessionDeleteButton sessionId={sessionId} />
    </VStack>
  );
}

export default SessionPage;

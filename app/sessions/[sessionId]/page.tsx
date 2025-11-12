import GamePageContainer from "@/components/games/GamePageContainer";
import { Heading, VStack } from "@chakra-ui/react";

async function SessionPage({
  params,
}: {
  params: Promise<{ sessionId: number }>;
}) {
  const { sessionId } = await params;

  return (
    <VStack>
      <Heading>Session id: {sessionId}</Heading>
      <GamePageContainer sessionId={sessionId} />
    </VStack>
  );
}

export default SessionPage;

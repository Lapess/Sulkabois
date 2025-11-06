import NewGameForm from "@/components/forms/NewGameForm";
import GamesList from "@/components/games/GamesList";
import { Heading, VStack } from "@chakra-ui/react";

async function SessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;

  return (
    <VStack>
      <Heading>Session id: {sessionId}</Heading>
      <GamesList sessionId={sessionId} />
      <NewGameForm />
    </VStack>
  );
}

export default SessionPage;

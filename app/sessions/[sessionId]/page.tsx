import GamePageContainer from "@/components/games/GamePageContainer";
import SessionDeleteButton from "@/components/sessions/SessionDeleteButton";
import SessionHeading from "@/components/sessions/SessionHeading";
import { Link, VStack } from "@chakra-ui/react";
import { ArrowLeftCircle } from "lucide-react";

async function SessionPage({
  params,
}: {
  params: Promise<{ sessionId: number }>;
}) {
  const { sessionId } = await params;

  return (
    <VStack>
      <Link p={2} textAlign={"left"} w={"100%"} href="/">
        <ArrowLeftCircle />
      </Link>
      <SessionHeading sessionId={sessionId} />
      <GamePageContainer sessionId={sessionId} />
      <SessionDeleteButton sessionId={sessionId} />
    </VStack>
  );
}

export default SessionPage;

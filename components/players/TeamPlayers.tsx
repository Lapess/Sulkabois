import { getTeamPlayers } from "@/utils/supabase/client";
import { Heading, VStack } from "@chakra-ui/react";
interface Props {
  gameId: number;
  courtSide: number;
}
export default async function TeamPlayers({ gameId, courtSide }: Props) {
  // if (!teamId) return;
  const players = await getTeamPlayers(gameId, courtSide);
  return (
    <VStack>
      <Heading>Team players</Heading>
      {players.map((x) => x.name)}
    </VStack>
  );
}

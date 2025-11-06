import { GameTeams } from "@/utils/supabase/client";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import TeamPlayers from "../players/TeamPlayers";

interface Props {
  game: GameTeams;
}
const GameCard = ({ game }: Props) => {
  return (
    <VStack>
      <Heading>Game id: {game.id}</Heading>
      <Box p={5}>
        <Text>Pelityyli</Text>
        {game.full_game}
      </Box>
      <Flex justify={"space-between"}>
        <VStack>
          <Heading>Joukkue 1</Heading>
          <TeamPlayers
            playerIds={
              game.teamLeft
                ?.map((x) => x.player_id)
                .filter((id) => id != null) ?? []
            }
            heading="Joukkue 1"
          />
        </VStack>
        <VStack>
          <Heading>Joukkue 2</Heading>
          <TeamPlayers
            playerIds={
              game.teamRight
                ?.map((x) => x.player_id)
                .filter((id) => id != null) ?? []
            }
            heading="Joukkue 2"
          />
        </VStack>
      </Flex>
    </VStack>
  );
};

export default GameCard;

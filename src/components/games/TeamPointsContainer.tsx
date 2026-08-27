import { Flex, Text } from "@chakra-ui/react";
import TeamPoints from "./TeamPoints";
import { CourtSide } from "@/enums/CourtSide";
import { GameWithTeams } from "@/types/Game";
interface Props {
  game: GameWithTeams;
}
const TeamPointsContainer = ({ game }: Props) => {
  const team1Points = game.team.filter((x) => x.court_side == CourtSide.A)[0]
    ?.points;
  const team2Points = game.team.filter((x) => x.court_side == CourtSide.B)[0]
    ?.points;
  const team1Players =
    game.team.filter((x) => x.court_side == CourtSide.A).map((x) => x.player) ??
    [];
  const team2Players =
    game.team.filter((x) => x.court_side == CourtSide.B).map((x) => x.player) ??
    [];
  return (
    <Flex
      borderWidth={1}
      borderColor={"orange"}
      py={2}
      w={"310px"}
      justify={"space-evenly"}
    >
      <TeamPoints
        teamPlayers={team1Players}
        points={team1Points}
        courtSide={CourtSide.A}
        winner={team1Points > team2Points}
      />
      <Text fontSize={"3xl"} mx={2} alignContent={"center"}>
        -
      </Text>
      <TeamPoints
        teamPlayers={team2Players}
        points={team2Points}
        courtSide={CourtSide.B}
        winner={team2Points > team1Points}
      />
    </Flex>
  );
};

export default TeamPointsContainer;

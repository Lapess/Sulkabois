import { CourtSide } from "@/enums/CourtSide";
import { Player, PlayerRow } from "@/types/Player";
import { Box, Center, HStack, Text, VStack } from "@chakra-ui/react";
interface Props {
  teamPlayers: (PlayerRow | null)[];
  courtSide: CourtSide;
  points: number;
  winner: boolean;
}
const TeamPoints = ({ teamPlayers, points, courtSide, winner }: Props) => {
  return (
    <Box h={"70px"} fontSize={"lg"}>
      {courtSide == CourtSide.Penkki ? (
        <HStack gap={3}>
          <VStack w={100} h={"70px"}>
            {teamPlayers.map((x) => (
              <Center h={"100%"} key={x?.id}>
                <Text>{x?.name}</Text>
              </Center>
            ))}
          </VStack>
          <Center>
            <Text
              fontSize={"xl"}
              fontWeight={"bold"}
              color={winner ? "green" : "red"}
            >
              {points}
            </Text>
          </Center>
        </HStack>
      ) : (
        <HStack gap={3}>
          <Center>
            <Text
              fontSize={"xl"}
              fontWeight={"bold"}
              color={winner ? "green" : "red"}
            >
              {points}
            </Text>
          </Center>
          <VStack w={100} h={"70px"}>
            {teamPlayers.map((x) => (
              <Center h={"100%"} key={x?.id}>
                <Text>{x?.name}</Text>
              </Center>
            ))}
          </VStack>
        </HStack>
      )}
    </Box>
  );
};

export default TeamPoints;

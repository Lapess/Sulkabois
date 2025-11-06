import { getPlayers } from "@/utils/supabase/client";
import { Heading, VStack, Text } from "@chakra-ui/react";
interface Props {
  heading: string;
  playerIds: number[];
}
export default async function TeamPlayers({ playerIds, heading }: Props) {
  const players = (await getPlayers()).filter((x) => playerIds.includes(x.id));
  return (
    <VStack>
      <Heading>{heading}</Heading>
      {players.map((x) => (
        <Text key={x.id}>{x.name}</Text>
      ))}
    </VStack>
  );
}

"use client";
import { GroupType } from "@/enums/GroupType";
import { Player } from "@/types/Player";
import { Heading, VStack, Text } from "@chakra-ui/react";
interface Props {
  heading: string;
  players: Player[];
  groupType: GroupType;
}
export default function TeamPlayers({ players, heading, groupType }: Props) {
  // const [players, setPlayers] = useState<Player[]>([]);
  // useEffect(() => {
  //   const data = getPlayers().then(setPlayers);
  // }, []);
  return (
    <VStack>
      <Heading>{heading}</Heading>
      {players.map((x) => (
        <Text key={x.id}>{x.name}</Text>
      ))}
    </VStack>
  );
}

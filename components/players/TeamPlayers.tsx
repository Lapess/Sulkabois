"use client";
import { GroupType } from "@/enums/GroupType";
import { Player } from "@/types/Player";
import { Heading, VStack, Text } from "@chakra-ui/react";
interface Props {
  heading: string;
  players: Player[];
  groupType: GroupType;
}
export default function TeamPlayers({ players, heading }: Props) {
  return (
    <VStack>
      <Heading>{heading}</Heading>
      {players.map((x) => (
        <Text key={x.id}>{x.name}</Text>
      ))}
    </VStack>
  );
}

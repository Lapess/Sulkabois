import {
  getGames,
  getPlayers,
  getSessions,
  getTeamPlayers,
} from "@/utils/supabase/client";
import { Heading, VStack, Text } from "@chakra-ui/react";
import TeamPlayers from "./TeamPlayers";

export default async function PlayerList() {
  const players = await getPlayers();
  const sessions = await getSessions();
  const games = await getGames();
  return (
    <VStack p={3}>
      <Heading fontSize={"3xl"}>Pelaajat</Heading>
      {players.map((x) => (
        <VStack key={x.id}>
          {" "}
          <Text>{x.name}</Text>
          <Text>Total games: {x.games_won_total}</Text>
        </VStack>
      ))}
      {sessions.map((x) => (
        <VStack key={x.id}>
          <Text>{x.session_date}</Text>
          <Text>{x.games?.length}</Text>
        </VStack>
      ))}

      {games.map((x) => (
        <VStack key={x.id}>
          <Text>game id: {x.id}</Text>
          team left:{" "}
          {/* <TeamPlayers gameId={x.id} courtSide={0} heading="Joukkue 1" />  */}
          team right:{" "}
          {/* <TeamPlayers gameId={x.id} courtSide={1} heading="Joukkue 2" /> */}
        </VStack>
      ))}
    </VStack>
  );
}

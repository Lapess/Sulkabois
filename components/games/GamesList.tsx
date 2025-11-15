"use client";
import { CourtSide } from "@/enums/CourtSide";
import { GameWithTeams } from "@/types/Game";
import { getGamesWithTeamsFull } from "@/utils/supabase/browser/games";
import { HStack, Link, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TeamPointsContainer from "./TeamPointsContainer";

interface Props {
  sessionId: number;
  newGameId: number | null;
}
export function GamesList({ sessionId, newGameId }: Props) {
  const [games, setGames] = useState<GameWithTeams[]>([]);
  useEffect(() => {
    getGamesWithTeamsFull().then((data) => {
      if (data) setGames(data.filter((x) => x.session_id == sessionId));
    });
  }, [newGameId]);

  return games.map((g) => (
    <Link key={g.id} href={"/sessions/" + sessionId + "/" + g.id} mx={0}>
      <TeamPointsContainer game={g} />
    </Link>
  ));
}

export default GamesList;

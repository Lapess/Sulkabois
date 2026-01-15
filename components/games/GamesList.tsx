"use client";
import { GameWithTeams } from "@/types/Game";
import { getGamesWithTeamsFull } from "@/services/supabase/games";
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

  return games.map((g) => <TeamPointsContainer key={g.id} game={g} />);
}

export default GamesList;

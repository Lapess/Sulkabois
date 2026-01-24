"use client";
import { GameWithTeams } from "@/types/Game";
import { getGamesWithTeamsBySessionId } from "@/services/supabase/games";
import { useEffect, useState } from "react";
import TeamPointsContainer from "./TeamPointsContainer";

interface Props {
  sessionId: number;
  newGameId: number | null;
}
export function GamesList({ sessionId, newGameId }: Props) {
  const [games, setGames] = useState<GameWithTeams[]>([]);
  useEffect(() => {
    getGamesWithTeamsBySessionId(sessionId).then((data) => {
      if (data) setGames(data);
    });
  }, [newGameId]);

  return games.map((g) => <TeamPointsContainer key={g.id} game={g} />);
}

export default GamesList;

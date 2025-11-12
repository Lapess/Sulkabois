"use client";
import { GameTeams } from "@/types/Game";
import { getGames } from "@/utils/supabase/browser/games";
import { Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
  sessionId: number;
}
export function GamesList({ sessionId }: Props) {
  const [games, setGames] = useState<GameTeams[]>([]);
  useEffect(() => {
    getGames().then(setGames);
  }, []);

  return games
    .filter((x) => x.session_id == sessionId)
    .map((g, index) => (
      <Link key={g.id} href={"/sessions/" + sessionId + "/" + g.id}>
        Peli {index + 1}
      </Link>
    ));
}

export default GamesList;

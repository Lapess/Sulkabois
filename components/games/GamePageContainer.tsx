"use client";
import GamesList from "./GamesList";
import NewGameForm from "../forms/NewGameForm";
import { getPlayers } from "@/utils/supabase/browser/players";
import { useEffect, useState } from "react";
import { Player } from "@/types/Player";

interface Props {
  sessionId: number;
}
const GamePageContainer = ({ sessionId }: Props) => {
  const [sessionPlayers, setSessionPlayers] = useState<Player[]>([]);
  useEffect(() => {
    getPlayers().then(setSessionPlayers);
  }, []);
  return (
    <>
      <GamesList sessionId={sessionId} />
      <NewGameForm sessionId={sessionId} sessionPlayers={sessionPlayers} />
    </>
  );
};

export default GamePageContainer;

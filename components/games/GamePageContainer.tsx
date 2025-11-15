"use client";
import GamesList from "./GamesList";
import NewGameForm from "../forms/NewGameForm";
import { getPlayers } from "@/utils/supabase/browser/players";
import { useEffect, useState } from "react";
import { Player } from "@/types/Player";
import { Center, Separator } from "@chakra-ui/react";

interface Props {
  sessionId: number;
}
const GamePageContainer = ({ sessionId }: Props) => {
  const [sessionPlayers, setSessionPlayers] = useState<Player[]>([]);
  const [newGameId, setNewGameId] = useState<number | null>(null);
  useEffect(() => {
    getPlayers().then(setSessionPlayers);
  }, []);
  return (
    <>
      <GamesList sessionId={sessionId} newGameId={newGameId} />
      <Center w={"80%"} p={5}>
        <Separator w={"100%"} colorPalette={"orange"} />
      </Center>
      <Separator />
      <NewGameForm
        sessionId={sessionId}
        sessionPlayers={sessionPlayers}
        onGameAdded={function (gameId: number | null): void {
          setNewGameId(gameId);
        }}
      />
    </>
  );
};

export default GamePageContainer;

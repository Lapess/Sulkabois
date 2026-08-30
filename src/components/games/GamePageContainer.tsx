"use client";
import { Player } from "@/types/Player";
import { getPlayersWithSessionGroupId } from "@/services/players";
import { getSessionById, updateSession } from "@/services/sessions";
import { Button, Center, Separator, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import NewGameForm from "../forms/NewGameForm";
import GamesList from "./GamesList";

interface Props {
  playerIds: string[];
  sessionId: number;
  sessionGroupId: number;
}
const GamePageContainer = ({ playerIds, sessionId, sessionGroupId }: Props) => {
  const [sessionPlayers, setSessionPlayers] = useState<Player[]>([]);
  const [newGameId, setNewGameId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sessionLocked, setSessionLocked] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    setIsLoading(true);
    getPlayersWithSessionGroupId(sessionGroupId).then((data: Player[]) => {
      playerIds.length > 0
        ? setSessionPlayers(
            data.filter((x) => playerIds.includes(x.id.toString())),
          )
        : setSessionPlayers(data);
    });
    getSessionById(sessionId).then((x) => setSessionLocked(x!.is_locked));
    setIsLoading(false);
  }, []);
  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <GamesList sessionId={sessionId} newGameId={newGameId} />
      <Center w={"80%"} p={5}>
        <Separator w={"100%"} colorPalette={"orange"} />
      </Center>
      <Separator />
      {!sessionLocked && (
        <NewGameForm
          sessionId={sessionId}
          sessionPlayers={sessionPlayers}
          onGameAdded={function (gameId: number | null): void {
            setNewGameId(gameId);
          }}
        />
      )}
      <Button
        mt={5}
        onClick={() => {
          const currentLocked = sessionLocked;
          setSessionLocked(currentLocked ? false : true);
          updateSession(sessionId, !currentLocked).then(
            () =>
              !currentLocked && router.push("/sessiongroups/" + sessionGroupId),
          );
        }}
      >
        {sessionLocked ? "Muokkaa" : "Valmista tuli!"}
      </Button>
    </>
  );
};

export default GamePageContainer;

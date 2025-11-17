"use client";
import GamesList from "./GamesList";
import NewGameForm from "../forms/NewGameForm";
import { getPlayers } from "@/utils/supabase/browser/players";
import { useEffect, useState } from "react";
import { Player } from "@/types/Player";
import { Button, Center, Separator, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import {
  getSessionById,
  updateSession,
} from "@/utils/supabase/browser/sessions";

interface Props {
  sessionId: number;
}
const GamePageContainer = ({ sessionId }: Props) => {
  const [sessionPlayers, setSessionPlayers] = useState<Player[]>([]);
  const [newGameId, setNewGameId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sessionLocked, setSessionLocked] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    setIsLoading(true);
    getPlayers().then(setSessionPlayers);
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
            () => !currentLocked && router.push("/")
          );
        }}
      >
        {sessionLocked ? "Avaa sessio" : "Lopeta sessio"}
      </Button>
    </>
  );
};

export default GamePageContainer;

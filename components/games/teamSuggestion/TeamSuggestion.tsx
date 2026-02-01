import { Button, HStack, VStack, Box, Text } from "@chakra-ui/react";
import { GameMode } from "@/enums/GameMode";
import { TeamCalculationMethod } from "@/enums/TeamCalculationMethod";
import { useState } from "react";
import { CourtSide } from "@/enums/CourtSide";
import { PlayerOption } from "@/interfaces/PlayerOption";
import shuffle from "@/utils/teamSuggestion/shuffler";
import { teamCalculationMethodOptions } from "@/data/teamSuggestion/teamCalculationMethodOptions";
import { gameModeOptions } from "@/data/teamSuggestion/gameModeOptions";

interface TeamSuggestionProps {
  players: PlayerOption[];
}

interface Teams {
  [CourtSide.A]: PlayerOption[];
  [CourtSide.B]: PlayerOption[];
}

export default function TeamSuggestion({ players }: TeamSuggestionProps) {
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.OneVsOne);
  const [calcMethod, setCalcMethod] = useState<TeamCalculationMethod>(
    TeamCalculationMethod.Random,
  );
  const [teams, setTeams] = useState<Teams>({
    [CourtSide.A]: [],
    [CourtSide.B]: [],
  });
  const [error, setError] = useState("");

  const assignTeams = () => {
    setError("");

    let requiredPlayers;
    if (gameMode === GameMode.OneVsOne) {
      requiredPlayers = 2;
    } else if (gameMode === GameMode.TwoVsTwo) {
      requiredPlayers = 4;
    } else {
      requiredPlayers = 3;
    }

    if (players.length < requiredPlayers) {
      setError("Ei tarpeeksi pelaajia sessiossa, valitse toinen pelimuoto.");
      setTeams({ [CourtSide.B]: [], [CourtSide.A]: [] });
      return;
    }

    const shuffled = shuffle(players);
    let A: PlayerOption[] = [];
    let B: PlayerOption[] = [];

    switch (gameMode) {
      case GameMode.OneVsOne:
        A = shuffled.slice(0, 1);
        B = shuffled.slice(1, 2);
        break;

      case GameMode.TwoVsTwo:
        A = shuffled.slice(0, 2);
        B = shuffled.slice(2, 4);
        break;

      case GameMode.OneVsTwo:
        if (Math.random() < 0.5) {
          A = shuffled.slice(0, 2);
          B = shuffled.slice(2, 3);
        } else {
          B = shuffled.slice(0, 2);
          A = shuffled.slice(2, 3);
        }
        break;
    }
    setTeams({ [CourtSide.A]: A, [CourtSide.B]: B });
  };

  return (
    <VStack>
      <HStack>
        <VStack>
          <Text>Pelimuoto</Text>
          <select
            value={gameMode}
            onChange={(e) => setGameMode(parseInt(e.target.value))}
          >
            {gameModeOptions.map((mode, index) => (
              <option key={index} value={mode.value}>
                {mode.title}
              </option>
            ))}
          </select>
        </VStack>

        <VStack>
          <Text>Laskentatapa</Text>
          <select
            value={calcMethod}
            onChange={(e) => setCalcMethod(parseInt(e.target.value))}
          >
            {teamCalculationMethodOptions.map((method, index) => (
              <option key={index} value={method.value}>
                {method.title}
              </option>
            ))}
          </select>
        </VStack>
      </HStack>
      <Button colorScheme="green" onClick={assignTeams}>
        Ehdota tiimi(t)
      </Button>
      {error && <Text color="red.500">{error}</Text>}

      <HStack>
        <VStack align="start">
          <Box fontWeight="bold">Kenttäpuoli A</Box>
          {teams[CourtSide.A].map((p) => (
            <Box key={p.value}>{p.label?.split(" ")[0]}</Box>
          ))}
        </VStack>

        <VStack align="start">
          <Box fontWeight="bold">Kenttäpuoli B</Box>
          {teams[CourtSide.B].map((p) => (
            <Box key={p.value}>{p.label?.split(" ")[0]}</Box>
          ))}
        </VStack>
      </HStack>
    </VStack>
  );
}

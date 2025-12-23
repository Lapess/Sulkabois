import { Button, HStack, VStack, Box, Text } from "@chakra-ui/react";
import { GameMode } from "@/enums/GameMode";
import { TeamCalculationMethod } from "@/enums/TeamCalculationMethod";
import { useState } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { CourtSide } from "@/enums/CourtSide";
import { PlayerOption } from "@/interfaces/PlayerOption";
import shuffle from "@/utils/teamSuggestion/shuffler";
import { teamCalculationMethodOptions } from "@/data/teamSuggestion/teamCalculationMethodOptions";
import { gameModeOptions } from "@/data/teamSuggestion/gameModeOptions";

interface TeamSuggestionProps {
  players: PlayerOption[];
}

interface Teams {
  [CourtSide.Padel]: PlayerOption[];
  [CourtSide.Penkki]: PlayerOption[];
}

export default function TeamSuggestion({ players }: TeamSuggestionProps) {
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.OneVsOne);
  const [calcMethod, setCalcMethod] = useState<TeamCalculationMethod>(
    TeamCalculationMethod.Random,
  );
  const [teams, setTeams] = useState<Teams>({
    [CourtSide.Padel]: [],
    [CourtSide.Penkki]: [],
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
      setTeams({ [CourtSide.Padel]: [], [CourtSide.Penkki]: [] });
      return;
    }

    const shuffled = shuffle(players);
    let padel: PlayerOption[] = [];
    let penkki: PlayerOption[] = [];

    switch (gameMode) {
      case GameMode.OneVsOne:
        padel = shuffled.slice(0, 1);
        penkki = shuffled.slice(1, 2);
        break;

      case GameMode.TwoVsTwo:
        padel = shuffled.slice(0, 2);
        penkki = shuffled.slice(2, 4);
        break;

      case GameMode.OneVsTwo:
        if (Math.random() < 0.5) {
          padel = shuffled.slice(0, 2);
          penkki = shuffled.slice(2, 3);
        } else {
          penkki = shuffled.slice(0, 2);
          padel = shuffled.slice(2, 3);
        }
        break;
    }
    setTeams({ [CourtSide.Padel]: padel, [CourtSide.Penkki]: penkki });
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
          <Box fontWeight="bold">Padel</Box>
          {teams[CourtSide.Padel].map((p) => (
            <Box key={p.value}>{p.label}</Box>
          ))}
        </VStack>

        <VStack align="start">
          <Box fontWeight="bold">Penkki</Box>
          {teams[CourtSide.Penkki].map((p) => (
            <Box key={p.value}>{p.label}</Box>
          ))}
        </VStack>
      </HStack>
    </VStack>
  );
}

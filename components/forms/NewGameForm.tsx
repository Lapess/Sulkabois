"use client";
import {
  Box,
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  Fieldset,
  Flex,
  Heading,
  HStack,
  Portal,
  Select,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { Controller, useController, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { GamePost } from "@/interfaces/GamePost";
import { CourtSide } from "@/enums/CourtSide";
import { addGame } from "@/services/supabase/games";
import { Player } from "@/types/Player";
import { PlayerOption } from "../../interfaces/PlayerOption";
import TeamSuggestion from "../games/teamSuggestion/TeamSuggestion";
import { scoreOptions } from "@/data/game/scoreOptions";
interface Props {
  sessionId: number;
  sessionPlayers: Player[];
  onGameAdded: (gameId: number | null) => void;
}

const NewGameForm = ({ sessionId, sessionPlayers, onGameAdded }: Props) => {
  const { handleSubmit, control, reset, setValue } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [team1PlayerOptions, setTeam1PlayerOptions] = useState<PlayerOption[]>(
    [],
  );
  const [team2PlayerOptions, setTeam2PlayerOptions] = useState<PlayerOption[]>(
    [],
  );
  const playerOptions: PlayerOption[] = sessionPlayers.map((p) => ({
    label: p.name,
    value: p.id.toString(),
  }));

  useEffect(() => {
    if (!sessionPlayers || sessionPlayers.length === 0) return;
    initializePlayerOptions();
  }, [sessionPlayers]);
  interface Team {
    points: number;
    courtSide: CourtSide;
    playerId: number;
  }
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const team1Score = data.team1Score[0];
    const team2Score = data.team2Score[0];
    const team1: Team[] = data.CourtSideA.map((x: number) => ({
      points: team1Score,
      courtSide: CourtSide.A,
      playerId: x,
    }));
    const team2: Team[] = data.CourtSideB.map((x: number) => ({
      points: team2Score,
      courtSide: CourtSide.B,
      playerId: x,
    }));
    const teams = [...team1, ...team2];
    const payload: GamePost = {
      sessionId: sessionId,
      fullGame: team1Score >= 21 || team2Score >= 21,
      teams: teams,
    };
    const id = await addGame(payload);
    onGameAdded(id);
    reset();
    setValue("team1Score", [0]);
    setValue("team2Score", [0]);
    initializePlayerOptions();
    setIsLoading(false);
  };
  const team1Controller = useController({
    control,
    name: "CourtSideA",
    defaultValue: [],
  });
  const team2Controller = useController({
    control,
    name: "CourtSideB",
    defaultValue: [],
  });
  function handleTeam1PlayersChange(value: string[]): void {
    team1Controller.field.onChange(value);
    setTeam2PlayerOptions(
      playerOptions.filter((x) => !value.includes(x.value ?? "")),
    );
  }

  function handleTeam2PlayersChange(value: string[]): void {
    team2Controller.field.onChange(value);
    setTeam1PlayerOptions(
      playerOptions.filter((x) => !value.includes(x.value ?? "")),
    );
  }
  function initializePlayerOptions() {
    setTeam1PlayerOptions(playerOptions);
    setTeam2PlayerOptions(playerOptions);
  }

  return (
    <>
      <VStack w={{ base: "90%", md: "40%" }} gap={6}>
        <HStack gap={5}>
          <Heading fontSize={"2xl"} fontWeight={"light"}>
            Uusi peli
          </Heading>
        </HStack>
        <TeamSuggestion players={playerOptions} />
        <Box w={"100%"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset.Root>
              <Fieldset.Content>
                <Flex justify={"space-between"}>
                  <VStack ml={5}>
                    <Heading fontWeight={"light"}>Kenttäpuoli A</Heading>
                    <CheckboxGroup
                      minH={"170px"}
                      value={team1Controller.field.value}
                      onValueChange={handleTeam1PlayersChange}
                      name={team1Controller.field.name}
                    >
                      <Fieldset.Content>
                        {team1PlayerOptions.map((item) => (
                          <Checkbox.Root
                            key={item.value}
                            value={item.value}
                            size={"lg"}
                          >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label>
                              {item.label?.split(" ")[0]}
                            </Checkbox.Label>
                          </Checkbox.Root>
                        ))}
                      </Fieldset.Content>
                    </CheckboxGroup>
                    <Controller
                      control={control}
                      name="team1Score"
                      render={({ field }) => (
                        <Select.Root
                          pt={5}
                          size={"md"}
                          name={field.name}
                          value={field.value}
                          onValueChange={({ value }) => field.onChange(value)}
                          collection={scoreOptions}
                        >
                          <Select.HiddenSelect />
                          <Select.Label>Pisteet</Select.Label>
                          <Select.Control>
                            <Select.Trigger>
                              <Select.ValueText w={10} />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>
                          <Portal>
                            <Select.Positioner>
                              <Select.Content>
                                {scoreOptions.items.map((value) => (
                                  <Select.Item item={value} key={value.value}>
                                    {value.label}
                                    <Select.ItemIndicator />
                                  </Select.Item>
                                ))}
                              </Select.Content>
                            </Select.Positioner>
                          </Portal>
                        </Select.Root>
                      )}
                    ></Controller>
                  </VStack>
                  <VStack mr={5}>
                    <Heading fontWeight={"light"}>Kenttäpuoli B</Heading>
                    <CheckboxGroup
                      minH={"170px"}
                      value={team2Controller.field.value}
                      onValueChange={handleTeam2PlayersChange}
                      name={team2Controller.field.name}
                    >
                      <Fieldset.Content>
                        {team2PlayerOptions.map((item) => (
                          <Checkbox.Root
                            key={item.value}
                            value={item.value}
                            size={"lg"}
                          >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label>
                              {item.label?.split(" ")[0]}
                            </Checkbox.Label>
                          </Checkbox.Root>
                        ))}
                      </Fieldset.Content>
                    </CheckboxGroup>{" "}
                    <Controller
                      control={control}
                      name="team2Score"
                      render={({ field }) => (
                        <Select.Root
                          pt={5}
                          size={"md"}
                          name={field.name}
                          value={field.value}
                          onValueChange={({ value }) => field.onChange(value)}
                          collection={scoreOptions}
                        >
                          <Select.HiddenSelect />
                          <Select.Label>Pisteet</Select.Label>
                          <Select.Control>
                            <Select.Trigger>
                              <Select.ValueText w={10} />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>
                          <Portal>
                            <Select.Positioner>
                              <Select.Content>
                                {scoreOptions.items.map((value) => (
                                  <Select.Item item={value} key={value.value}>
                                    {value.label}
                                    <Select.ItemIndicator />
                                  </Select.Item>
                                ))}
                              </Select.Content>
                            </Select.Positioner>
                          </Portal>
                        </Select.Root>
                      )}
                    ></Controller>
                  </VStack>
                </Flex>
              </Fieldset.Content>
            </Fieldset.Root>
            <Center mt={10}>
              {isLoading ? (
                <Spinner size={"sm"} />
              ) : (
                <Button type="submit" colorPalette={"green"}>
                  Tallenna peli
                </Button>
              )}
            </Center>
          </form>
        </Box>
      </VStack>
    </>
  );
};
export default NewGameForm;

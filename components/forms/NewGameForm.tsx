"use client";
import {
  Box,
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  createListCollection,
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
import { addGame } from "@/utils/supabase/browser/games";
import { Player } from "@/types/Player";
import { PlayerOption } from "./PlayerOption";
import { Repeat } from "lucide-react";
interface Props {
  sessionId: number;
  sessionPlayers: Player[];
  onGameAdded: (gameId: number | null) => void;
}

const NewGameForm = ({ sessionId, sessionPlayers, onGameAdded }: Props) => {
  const { handleSubmit, control, reset, setValue } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [team1PlayerOptions, setTeam1PlayerOptions] = useState<PlayerOption[]>(
    []
  );
  const [team2PlayerOptions, setTeam2PlayerOptions] = useState<PlayerOption[]>(
    []
  );
  const [rotatePlayers, setRotatePlayers] = useState<boolean>(true);
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
    const team1: Team[] = data.Penkki.map((x: number) => ({
      points: team1Score,
      courtSide: CourtSide.Penkki,
      playerId: x,
    }));
    const team2: Team[] = data.Padel.map((x: number) => ({
      points: team2Score,
      courtSide: CourtSide.Padel,
      playerId: x,
    }));
    const teams = [...team1, ...team2];
    const payload: GamePost = {
      sessionId: sessionId,
      fullGame: team1Score == 21 || team2Score == 21,
      teams: teams,
    };
    const id = await addGame(payload);
    onGameAdded(id);
    reset();
    setValue("team1Score", [0]);
    setValue("team2Score", [0]);
    initializePlayerOptions();
    // if (rotatePlayers) {
    //   handlePlayersRotate(
    //     team1.map((x) => x.playerId.toString()),
    //     team2.map((x) => x.playerId.toString())
    //   );
    // }

    setIsLoading(false);
  };
  function handlePlayersRotate(team1: string[], team2: string[]): void {
    switch (2) {
      case 2:
        setValue("Penkki", team2);
        setValue("Padel", team1);
        handleTeam1PlayersChange(team2);
        handleTeam2PlayersChange(team1);
        break;
      // case 3:
      //   break;
      // case 4:
      //   break;
    }
  }
  const team1Controller = useController({
    control,
    name: "Penkki",
    defaultValue: [],
  });
  const team2Controller = useController({
    control,
    name: "Padel",
    defaultValue: [],
  });
  function handleTeam1PlayersChange(value: string[]): void {
    team1Controller.field.onChange(value);
    console.log(team1PlayerOptions);
    setTeam2PlayerOptions(
      playerOptions.filter((x) => !value.includes(x.value ?? ""))
    );
  }

  function handleTeam2PlayersChange(value: string[]): void {
    team2Controller.field.onChange(value);
    setTeam1PlayerOptions(
      playerOptions.filter((x) => !value.includes(x.value ?? ""))
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
          {/* <Repeat
            color={rotatePlayers ? "green" : "red"}
            onClick={() => setRotatePlayers(rotatePlayers ? false : true)}
          /> */}
        </HStack>
        <Box w={"100%"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset.Root>
              <Fieldset.Content>
                {/* <Field.Root>
                <TeamPlayers
                  groupType={GroupType.Free}
                  heading="Vapaat pelaajat"
                  playerIds={[]}
                />
              </Field.Root> */}
                <Flex justify={"space-between"}>
                  <VStack ml={5}>
                    <Heading fontWeight={"light"}>Penkki</Heading>
                    <CheckboxGroup
                      minH={"170px"}
                      value={team1Controller.field.value}
                      onValueChange={handleTeam1PlayersChange}
                      name={team1Controller.field.name}
                    >
                      <Fieldset.Content>
                        {team1PlayerOptions.map((item) => (
                          <Checkbox.Root key={item.value} value={item.value}>
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label>{item.label}</Checkbox.Label>
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
                  {/* <TeamPlayers
                    groupType={GroupType.Padel}
                    heading="Penkki"
                    players={sessionPlayers}
                  /> */}
                  <VStack mr={5}>
                    <Heading fontWeight={"light"}>Padel</Heading>
                    <CheckboxGroup
                      minH={"170px"}
                      value={team2Controller.field.value}
                      onValueChange={handleTeam2PlayersChange}
                      name={team2Controller.field.name}
                    >
                      <Fieldset.Content>
                        {team2PlayerOptions.map((item) => (
                          <Checkbox.Root key={item.value} value={item.value}>
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label>{item.label}</Checkbox.Label>
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
                  Tallenna
                </Button>
              )}
            </Center>
          </form>
        </Box>
      </VStack>
    </>
  );
};

const scoreOptions = createListCollection({
  items: [
    { label: 0, value: 0 },
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
    { label: 5, value: 5 },
    { label: 6, value: 6 },
    { label: 7, value: 7 },
    { label: 8, value: 8 },
    { label: 9, value: 9 },
    { label: 10, value: 10 },
    { label: 11, value: 11 },
    { label: 12, value: 12 },
    { label: 13, value: 13 },
    { label: 14, value: 14 },
    { label: 15, value: 15 },
    { label: 16, value: 16 },
    { label: 17, value: 17 },
    { label: 18, value: 18 },
    { label: 19, value: 19 },
    { label: 20, value: 20 },
    { label: 21, value: 21 },
    { label: 22, value: 22 },
    { label: 23, value: 23 },
    { label: 24, value: 24 },
    { label: 25, value: 25 },
    { label: 26, value: 26 },
    { label: 27, value: 27 },
    { label: 28, value: 28 },
    { label: 29, value: 29 },
    { label: 30, value: 30 },
  ],
});
export default NewGameForm;

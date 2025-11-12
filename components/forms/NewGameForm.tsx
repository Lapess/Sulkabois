"use client";
import {
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  createListCollection,
  Fieldset,
  Heading,
  HStack,
  Portal,
  Select,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { Controller, useController, useForm } from "react-hook-form";
import { useState } from "react";
import { GamePost } from "@/interfaces/GamePost";
import { CourtSide } from "@/enums/CourtSide";
import { addGame } from "@/utils/supabase/browser/games";
import { Player } from "@/types/Player";
interface Props {
  sessionId: number;
  sessionPlayers: Player[];
  onGameAdded: (gameId: number | null) => void;
}

const NewGameForm = ({ sessionId, sessionPlayers, onGameAdded }: Props) => {
  const { handleSubmit, control, reset } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const team1Score = data.team1Score[0];
    const team2Score = data.team2Score[0];
    const teams = [
      ...data.Penkki.map((x: number) => ({
        points: team1Score,
        courtSide: CourtSide.Penkki,
        playerId: x,
      })),
      ...data.Padel.map((x: number) => ({
        points: team2Score,
        courtSide: CourtSide.Padel,
        playerId: x,
      })),
    ];
    const payload: GamePost = {
      sessionId: sessionId,
      fullGame: team1Score == 21 || team2Score == 21,
      teams: teams,
    };
    console.log(payload);
    const id = await addGame(payload);
    onGameAdded(id);
    reset();

    setIsLoading(false);
  };
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
  const playerOptions = sessionPlayers.map((p) => ({
    label: p.name,
    value: p.id.toString(),
  }));
  return (
    <>
      <VStack pt={8} gap={6}>
        <Heading fontSize={"2xl"}>Uusi peli</Heading>

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
              <HStack gap={10}>
                <VStack>
                  <Heading>Penkki</Heading>
                  <CheckboxGroup
                    value={team1Controller.field.value}
                    onValueChange={team1Controller.field.onChange}
                    name={team1Controller.field.name}
                  >
                    <Fieldset.Content>
                      {playerOptions.map((item) => (
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
                        size={"lg"}
                        name={field.name}
                        value={field.value}
                        onValueChange={({ value }) => field.onChange(value)}
                        collection={scoreOptions}
                      >
                        <Select.HiddenSelect />
                        <Select.Label>Pisteet</Select.Label>
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText w={20} />
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
                <VStack>
                  <Heading>Padel</Heading>
                  <CheckboxGroup
                    value={team2Controller.field.value}
                    onValueChange={team2Controller.field.onChange}
                    name={team2Controller.field.name}
                  >
                    <Fieldset.Content>
                      {playerOptions.map((item) => (
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
                        size={"lg"}
                        name={field.name}
                        value={field.value}
                        onValueChange={({ value }) => field.onChange(value)}
                        collection={scoreOptions}
                      >
                        <Select.HiddenSelect />
                        <Select.Label>Pisteet</Select.Label>
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText w={20} />
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
              </HStack>
            </Fieldset.Content>
          </Fieldset.Root>
          <Center mt={10}>
            {isLoading ? (
              <Spinner size={"sm"} />
            ) : (
              <Button type="submit">Tallenna</Button>
            )}
          </Center>
        </form>
      </VStack>
    </>
  );
};

const scoreOptions = createListCollection({
  items: [
    { label: "-", value: 0 },
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
  ],
});
export default NewGameForm;

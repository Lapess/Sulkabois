"use client";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  CloseButton,
  createListCollection,
  Dialog,
  Fieldset,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { PlayerOption } from "../../interfaces/PlayerOption";
import { getPlayers } from "@/services/supabase/players";
import { addSession } from "@/services/supabase/sessions";
import { useRouter } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  players: z.array(z.string()).min(2, {
    message: "Valitse vähintään kaksi pelaajaa",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  sessionGroupId: number;
}

const NewSessionForm = ({ sessionGroupId }: Props) => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { players: [] },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [playerOptions, setPlayerOptions] = useState<PlayerOption[]>();
  useEffect(() => {
    getPlayers().then((data) => {
      if (!data || data.length === 0) return;
      setPlayerOptions(
        data.map((p) => ({
          label: p.name,
          value: p.id.toString(),
        })),
      );
    });
  }, []);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    addSession(sessionGroupId).then((session) => {
      setIsLoading(false);
      if (session) {
        const params = new URLSearchParams();
        data.players.forEach((player: string) =>
          params.append("players", player),
        );
        router.push(
          `/sessiongroups/${sessionGroupId}/sessions/${session.id}?${params.toString()}`,
        );
      }
    });
  };
  const playerController = useController({
    control,
    name: "players",
    defaultValue: [],
  });

  const invalid = !!errors.players;
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button
            m={10}
            size={"xl"}
            color={"black"}
            variant={"solid"}
            bgColor={"orange"}
          >
            Uusi sessio
          </Button>
        </Dialog.Trigger>
        <Portal>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Uusi sessio!</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Fieldset.Root invalid={invalid}>
                    <Fieldset.Content>
                      <VStack>
                        <Text>Valitse paikalla olevat pelaajat</Text>{" "}
                        <CheckboxGroup
                          minH={"170px"}
                          value={playerController.field.value}
                          name={playerController.field.name}
                          onValueChange={playerController.field.onChange}
                        >
                          {playerOptions?.map((item) => (
                            <Checkbox.Root key={item.value} value={item.value}>
                              <Checkbox.HiddenInput />
                              <Checkbox.Control />
                              <Checkbox.Label>{item.label}</Checkbox.Label>
                            </Checkbox.Root>
                          ))}
                        </CheckboxGroup>
                        {errors.players && (
                          <Fieldset.ErrorText>
                            {errors.players.message}
                          </Fieldset.ErrorText>
                        )}
                      </VStack>
                    </Fieldset.Content>
                  </Fieldset.Root>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Peruuta</Button>
                  </Dialog.ActionTrigger>{" "}
                  <Button type="submit" colorPalette={"green"}>
                    Aloita
                  </Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </form>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default NewSessionForm;

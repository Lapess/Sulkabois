"use client";
import { Player } from "@/types/Player";
import { getPlayers } from "@/utils/supabase/browser/players";
import {
  Button,
  Checkbox,
  CloseButton,
  Dialog,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PlayerOption } from "../forms/PlayerOption";

interface Props {
  onPlayerSelect: (sessionPlayers: Player[]) => void;
}
const CreateSessionDialog = ({ onPlayerSelect }: Props) => {
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  useEffect(() => {
    getPlayers().then(setAllPlayers);
  }, []);

  const playerOptions: PlayerOption[] = allPlayers.map((p) => ({
    label: p.name,
    value: p.id.toString(),
  }));
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" colorPalette={"red"} mt={10}>
          Älä paina tätä nappia
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Uusi sessio!</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack>
                <Text>Valitse paikalla olevat pelaajat</Text>
                {playerOptions.map((item) => (
                  <Checkbox.Root key={item.value} value={item.value}>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>{item.label}</Checkbox.Label>
                  </Checkbox.Root>
                ))}
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Peruuta</Button>
              </Dialog.ActionTrigger>
              <Button
                colorPalette={"red"}
                onClick={() => {
                  onPlayerSelect([]);
                }}
              >
                Poista
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CreateSessionDialog;

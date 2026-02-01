"use client";
import { deleteSessionGroup } from "@/services/supabase/sessiongroups";
import { Button, CloseButton, Dialog, Portal, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  sessionGroupId: number;
}
const SessionGroupDeleteDialog = ({ sessionGroupId }: Props) => {
  const [error, setError] = useState<string>();
  const router = useRouter();
  function handleDelete(): void {
    deleteSessionGroup(sessionGroupId).then((data) => {
      if (data === true) router.push("/");
      else {
        setError("Virhe");
      }
    });
  }
  return (
    <>
      <Dialog.Root role="alertdialog">
        <Dialog.Trigger asChild>
          <Button variant="outline" colorPalette={"red"} mt={10}>
            Poista peliryhmä
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Peliryhmän poisto</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                Haluatko varmasti poistaa peliryhmän? Kaikki siihen liittyvät
                sessiot ja pelit poistetaan myös!
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Peruuta</Button>
                </Dialog.ActionTrigger>
                <Button
                  colorPalette={"red"}
                  onClick={() => {
                    handleDelete();
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
      {error && <Text>{error}</Text>}
    </>
  );
};

export default SessionGroupDeleteDialog;

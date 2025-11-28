"use client";
import { deleteSession } from "@/utils/supabase/browser/sessions";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  sessionId: number;
}
const SessionDeleteDialog = ({ sessionId }: Props) => {
  const router = useRouter();
  const [error, setError] = useState<string>();
  function handleDelete(): void {
    deleteSession(sessionId).then((data) => {
      if (data === true) router.push("/");
      else {
        console.log(error);
        setError("Poistaminen ei onnistu. Mitäs läksit?");
      }
    });
  }

  return (
    <>
      <Dialog.Root role="alertdialog">
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
                <Dialog.Title>Session poisto</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                Haluatko varmasti poistaa session? Kaikki siihen liittyvät pelit
                poistetaan myös!
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Peruuta</Button>
                </Dialog.ActionTrigger>
                <Button
                  colorPalette={"red"}
                  onClick={() => {
                    console.log("Deleting...");
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
    </>
  );
};

export default SessionDeleteDialog;

"use client";
import {
  Button,
  CloseButton,
  Dialog,
  Fieldset,
  Input,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import {
  addPlayerGroupToSessionGroup,
  addSessionGroup,
  addUserToSessionGroup,
} from "@/services/supabase/sessiongroups";
import { useAuth } from "@/hooks/useAuth";
import { PlayerGroup } from "@/interfaces/PlayerGroup";

const formSchema = z.object({
  name: z.string({ error: "Anna peliryhmälle nimi" }),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  playerGroup: PlayerGroup | null;
}

const NewSessionGroupForm = ({ playerGroup }: Props) => {
  const { user } = useAuth();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const { handleSubmit } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const onSubmit = async () => {
    setIsLoading(true);
    if (!nameRef.current?.value) {
      setError("Anna peliryhmälle nimi");
      setIsLoading(false);
      return;
    }
    const sessionGroup = await addSessionGroup(nameRef.current.value);
    if (!sessionGroup) {
      setIsLoading(false);
      return;
    }
    if (!playerGroup) {
      if (!user) {
        setIsLoading(false);
        return;
      }
      await addUserToSessionGroup(user.id, sessionGroup.id);
    } else {
      await addPlayerGroupToSessionGroup(playerGroup.id, sessionGroup.id);
    }
    setIsLoading(false);
    router.push(`/sessiongroups/${sessionGroup.id}`);
  };
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button
            mt={4}
            size={"lg"}
            color={"black"}
            variant={"solid"}
            bgColor={"orange"}
          >
            Luo peliryhmä
          </Button>
        </Dialog.Trigger>
        <Portal>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>
                    Uusi peliryhmä
                    {playerGroup?.name ? ` · ${playerGroup.name}` : ""}
                  </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Fieldset.Root>
                    <Fieldset.Content>
                      <VStack>
                        <Text>Peliryhmän nimi</Text>
                        <Input type="text" ref={nameRef} />
                        {error && <Text color={"red"}>{error}</Text>}
                      </VStack>
                    </Fieldset.Content>
                  </Fieldset.Root>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Peruuta</Button>
                  </Dialog.ActionTrigger>{" "}
                  <Button type="submit" colorPalette={"green"} loading={isLoading}>
                    Tallenna
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

export default NewSessionGroupForm;

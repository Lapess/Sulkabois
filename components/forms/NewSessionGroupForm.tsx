"use client";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  CloseButton,
  createListCollection,
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
  addSessionGroup,
  addUserToSessionGroup,
} from "@/services/supabase/sessiongroups";
import { getSessionUser } from "@/services/supabase/auth/session";

const formSchema = z.object({
  name: z.string({ error: "Anna peliryhmälle nimi" }),
});

type FormData = z.infer<typeof formSchema>;

const NewSessionGroupForm = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const { handleSubmit } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    if (!nameRef.current?.value) {
      setError("Anna peliryhmälle nimi");
      return;
    }
    addSessionGroup(nameRef.current.value).then((sessionGroup) => {
      getSessionUser().then((user) => {
        if (!user || !sessionGroup) return;
        addUserToSessionGroup(user, sessionGroup.id).then(() => {
          setIsLoading(false);
          router.push(`/sessiongroups/${sessionGroup.id}`);
        });
      });
    });
  };
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
            Uusi
          </Button>
        </Dialog.Trigger>
        <Portal>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Uusi peliryhmä</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Fieldset.Root>
                    <Fieldset.Content>
                      <VStack>
                        <Text>Peliryhmän nimi</Text>
                        <Input type="text" ref={nameRef} />
                      </VStack>
                    </Fieldset.Content>
                  </Fieldset.Root>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Peruuta</Button>
                  </Dialog.ActionTrigger>{" "}
                  <Button type="submit" colorPalette={"green"}>
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

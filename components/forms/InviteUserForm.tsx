import { InvitationType } from "@/enums/InvitationType";
import { inviteUser } from "@/services/supabase/invitations";
import {
  Button,
  CloseButton,
  Dialog,
  Fieldset,
  Portal,
  VStack,
  Text,
  Input,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  userEmail: z.email({
    message: "Sähköpostiosoite ei kelpaa",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  invitationType: InvitationType;
  invitationTargetId: number; // sessionId, sessionGroupId, ...
}

const InviteUserForm = ({ invitationType, invitationTargetId }: Props) => {
  const [invitationSent, setinvitationSent] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { userEmail: "" },
  });
  const onSubmit = async (data: any) => {
    inviteUser({
      email: data.userEmail,
      sessionGroupId: invitationTargetId,
    }).then(setinvitationSent);
  };

  let buttonText = "Kutsu käyttäjä";
  switch (invitationType) {
    case InvitationType.Session:
      buttonText += " pelisessioon";
      break;
    case InvitationType.SessionGroup:
      buttonText += " peliryhmään";
      break;
    // TODO later on the user can be invited to a game group i.e. Sulkabois
  }
  const invalid = !!errors.userEmail;
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
            {buttonText}
          </Button>
        </Dialog.Trigger>
        <Portal>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Kutsu käyttäjä</Dialog.Title>
                </Dialog.Header>
                {invitationSent ? (
                  <VStack>
                    <Text p={3}>Kutsu lähetetty!</Text>
                    <Dialog.ActionTrigger asChild>
                      <Button colorScheme={"green"} variant={"subtle"} m={3}>
                        Sulje
                      </Button>
                    </Dialog.ActionTrigger>
                  </VStack>
                ) : (
                  <>
                    <Dialog.Body>
                      <Fieldset.Root invalid={invalid}>
                        <Fieldset.Content>
                          <VStack>
                            <Text>Sähköpostiosoite</Text>
                            <Input type="email" {...register("userEmail")} />
                            {errors.userEmail && (
                              <Fieldset.ErrorText>
                                {errors.userEmail.message}
                              </Fieldset.ErrorText>
                            )}
                          </VStack>
                        </Fieldset.Content>
                      </Fieldset.Root>
                    </Dialog.Body>
                    <Dialog.Footer>
                      <>
                        <Dialog.ActionTrigger asChild>
                          <Button variant="outline">Peruuta</Button>
                        </Dialog.ActionTrigger>{" "}
                        <Button type="submit" colorPalette={"green"}>
                          Lähetä kutsu
                        </Button>
                      </>
                    </Dialog.Footer>
                  </>
                )}
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

export default InviteUserForm;

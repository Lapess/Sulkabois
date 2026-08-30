"use client";
import { addPlayer } from "@/services/players";
import {
  Button,
  Center,
  Field,
  Fieldset,
  Input,
  Spinner,
  VStack,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface Props {
  userId: string;
}
const NewPlayerForm = ({ userId }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  const router = useRouter();

  const formSchema = z.object({
    playerName: z.string().min(3, {
      message: "Pelaajanimen tulee olla vähintään kaksi merkkiä pitkä",
    }),
  });

  type FormData = z.infer<typeof formSchema>;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { playerName: "" },
  });
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    addPlayer({
      user_id: userId,
      name: data.playerName,
    })
      .then(() => router.push("/"))
      .catch(() => {
        setError("Virhe");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <VStack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root>
          <Fieldset.Content>
            <Field.Root>
              <Field.Label>Anna nimimerkki, josta sinut tunnistaa</Field.Label>
              <Input {...register("playerName")} />
            </Field.Root>
          </Fieldset.Content>

          {isLoading ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <Button type="submit">Aloita pelaaminen!</Button>
          )}
        </Fieldset.Root>
      </form>

      {error && <Text color={"red"}>{error}</Text>}
    </VStack>
  );
};

export default NewPlayerForm;

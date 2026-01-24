"use client";
import CredentialsDto from "@/interfaces/user/auth/CredentialsDto";
import { signIn } from "@/services/supabase/auth/session";
import {
  Button,
  Field,
  Fieldset,
  Input,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const r = useRouter();
  const { handleSubmit, register } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  const onSubmit = async (data: any) => {
    const payload: CredentialsDto = {
      email: data.email,
      password: data.password,
    };
    setIsLoading(true);
    setError(null);

    try {
      await signIn(payload);
      r.push("/");
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "Virhe kirjautumisessa",
      );
      setIsLoading(false);
    }
  };

  return (
    <VStack>
      {isLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset.Root>
            <Fieldset.Content>
              <Field.Root>
                <Field.Label>Sähköpostiosoite</Field.Label>
                <Input {...register("email")} type="email" />
              </Field.Root>
              <Field.Root>
                <Field.Label>Salasana</Field.Label>
                <Input {...register("password")} type="password" />
              </Field.Root>
            </Fieldset.Content>
            <Button type="submit">Kirjaudu</Button>
          </Fieldset.Root>
        </form>
      )}
    </VStack>
  );
};

export default LoginForm;

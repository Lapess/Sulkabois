"use client";
import CredentialsDto from "@/interfaces/auth/CredentialsDto";
import { signInWithEmail } from "@/utils/supabase/auth/signin";
import { Button, Field, Fieldset, Input, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const Login = () => {
  const { handleSubmit, register } = useForm();

  const onSubmit = async (data: any) => {
    const payload: CredentialsDto = {
      email: data.email,
      password: data.password,
    };
    await signInWithEmail(payload);
  };
  return (
    <VStack>
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
    </VStack>
  );
};

export default Login;

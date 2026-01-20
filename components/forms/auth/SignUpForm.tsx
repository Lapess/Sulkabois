"use client";

import { UserAlreadyExists } from "@/data/auth/errorcodes";
import SignUpDto from "@/interfaces/user/auth/SignUpDto";
import { signUp } from "@/services/supabase/auth/session";
import {
  Button,
  Field,
  Fieldset,
  Input,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { AuthError } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
  const r = useRouter();
  const { handleSubmit, register } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [matchingPasswords, setMatchingPasswords] = useState<boolean | null>(
    null,
  );
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    setUserExists(null);

    setMatchingPasswords(data.passwordAgain === data.password);
    if (!matchingPasswords) {
      setIsLoading(false);
      return;
    }

    const payload: SignUpDto = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    try {
      signUp(payload)
        .then((x) => r.push("/"))
        .catch((error: AuthError) => {
          if (error.code === UserAlreadyExists) setUserExists(true);
          setIsLoading(false);
        });
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Tapahtui odottamaton virhe. Yritä tunnuksen luontia uudelleen",
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
              <Field.Root invalid={userExists != null && userExists}>
                <Field.Label>Sähköpostiosoite</Field.Label>
                <Input {...register("email")} type="email" />
                {userExists != null && userExists && (
                  <Field.ErrorText>
                    Käyttäjä tällä sähköpostiosoitteella on jo olemassa
                  </Field.ErrorText>
                )}
              </Field.Root>
              <Field.Root>
                <Field.Label>Salasana</Field.Label>
                <Input {...register("password")} type="password" />
              </Field.Root>
              <Field.Root
                invalid={matchingPasswords != null && !matchingPasswords}
              >
                <Field.Label>Salasana uudelleen</Field.Label>
                <Input {...register("passwordAgain")} type="password" />
                {matchingPasswords != null && !matchingPasswords && (
                  <Field.ErrorText>Tarkista salasana</Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root>
                <Field.Label>Käyttäjänimi</Field.Label>
                <Input {...register("username")} type="text" />
              </Field.Root>
            </Fieldset.Content>
            <Button type="submit">Luo tunnus</Button>
          </Fieldset.Root>
        </form>
      )}
    </VStack>
  );
};

export default SignUpForm;

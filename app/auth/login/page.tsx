import LoginForm from "@/components/forms/auth/LoginForm";
import { getUser } from "@/services/supabase/auth/server";
import { Button, Link, VStack } from "@chakra-ui/react";
import { redirect } from "next/navigation";

async function LoginPage() {
  const user = await getUser();
  if (user) redirect("/");

  return (
    <>
      <LoginForm />
      <VStack mt={5}>
        <Button colorPalette={"navy"} variant={"outline"}>
          <Link href="/auth/signup">Luo tunnus</Link>
        </Button>
      </VStack>
    </>
  );
}

export default LoginPage;

import LoginForm from "@/components/forms/auth/LoginForm";
import { Button, Link, VStack } from "@chakra-ui/react";

async function LoginPage() {
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

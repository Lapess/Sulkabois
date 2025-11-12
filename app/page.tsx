import SessionPageContainer from "@/components/sessions/SessionPageContainer";
import { Heading, VStack } from "@chakra-ui/react";
export default async function Home() {
  return (
    <>
      <VStack>
        <Heading p={5} fontSize={"3xl"}>
          Sulkabois
        </Heading>
        {/* MOVE TO THE MENU <Link href="/players">Pelaajat</Link> */}

        <SessionPageContainer />
      </VStack>
    </>
  );
}

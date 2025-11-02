import { Heading, Link, VStack } from "@chakra-ui/react";

export default async function Home() {
  return (
    <>
      <VStack>
        <Heading fontSize={"3xl"}>Sulkabois</Heading>
        <Link href="/players">Pelaajat</Link>
      </VStack>
    </>
  );
}

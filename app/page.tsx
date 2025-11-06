import { Button, Heading, Link, VStack } from "@chakra-ui/react";
import { getSessions } from "@/utils/supabase/client";

export default async function Home() {
  const sessions = await getSessions();
  return (
    <>
      <VStack>
        <Heading p={5} fontSize={"3xl"}>
          Sulkabois
        </Heading>
        {/* MOVE TO THE MENU <Link href="/players">Pelaajat</Link> */}

        {sessions?.map((s) => (
          <Link fontSize={"2xl"} href={"/sessions/" + s.id}>
            {s.session_date}
          </Link>
        ))}
        <Button size={"xl"} color={"green"} variant={"outline"}>
          Uusi
        </Button>
      </VStack>
    </>
  );
}

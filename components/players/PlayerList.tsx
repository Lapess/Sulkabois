import { createClient } from "@/utils/supabase/client";
import { Heading, VStack, Text } from "@chakra-ui/react";

export default async function PlayerList() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .throwOnError();
  return (
    <VStack p={3}>
      <Heading fontSize={"3xl"}>Pelaajat</Heading>
      {data.map((x) => (
        <Text>{x.name}</Text>
      ))}
    </VStack>
  );
}

import NewPlayerForm from "@/components/forms/NewPlayerForm";
import { getUser } from "@/services/supabase/auth/server";
import { getPlayerWithUserId } from "@/services/supabase/players";
import { Text } from "@chakra-ui/react";
import { redirect } from "next/navigation";
// TODO test this
async function NewPlayerPage() {
  const user = await getUser();
  if (!user) redirect("/auth/login");
  const existingPlayer = await getPlayerWithUserId(user.id);
  return existingPlayer ? (
    <Text>Terppa {existingPlayer.name}!</Text>
  ) : (
    <NewPlayerForm userId={user.id} />
  );
}

export default NewPlayerPage;

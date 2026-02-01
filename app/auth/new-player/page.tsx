import NewPlayerForm from "@/components/forms/NewPlayerForm";
import { getUser } from "@/services/supabase/auth/server";
import { getPlayerWithUserId } from "@/services/supabase/players";
import { redirect } from "next/navigation";

async function NewPlayerPage() {
  const user = await getUser();
  if (!user) redirect("/auth/login");
  const existingPlayerForUser = await getPlayerWithUserId(user.id);
  if (existingPlayerForUser) redirect("/");
  return <NewPlayerForm userId={user.id} />;
}

export default NewPlayerPage;

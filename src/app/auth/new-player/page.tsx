import NewPlayerForm from "@/components/forms/NewPlayerForm";
import { getUser } from "@/services/supabase/auth/server";
import { redirect } from "next/navigation";

async function NewPlayerPage() {
  const user = await getUser();
  if (!user) redirect("/auth/login");
  if (user.player) redirect("/");
  return <NewPlayerForm userId={user.id} />;
}

export default NewPlayerPage;

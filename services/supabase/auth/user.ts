import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";

export async function getUser(): Promise<User | null> {
  const supabaseServerClient = await createClient();
  const { data } = await supabaseServerClient.auth.getUser();
  return data.user;
}

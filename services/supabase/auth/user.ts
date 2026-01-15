import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";

export async function getUser(): Promise<User | null> {
  const supabaseServerClient = await createClient();
  const { data, error } = await supabaseServerClient.auth.getUser();
  if (error) console.log("Error: " + error.message);
  return data.user;
}

import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";

export async function getUser(): Promise<User | null> {
  const supabaseServerClient = await createClient();
  const { data } = await supabaseServerClient.auth.getUser();
  return data.user;
}

export async function exchangeCodeForSession(code: string): Promise<boolean> {
  const supabaseServerClient = await createClient();
  const { error } =
    await supabaseServerClient.auth.exchangeCodeForSession(code);
  if (error) {
    console.error("Auth error:", error.message);
    return false;
  }
  return true;
}

import CredentialsDto from "@/interfaces/auth/CredentialsDto";
import { createSupabaseClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

const supabase = createSupabaseClient();

export async function signIn(credentials: CredentialsDto) {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  if (error) throw error;
}
export async function signOut() {
  await supabase.auth.signOut();
}
export async function getSessionUser(): Promise<User | null> {
  var response = await supabase.auth.getUser();
  return response.data.user;
}

import CredentialsDto from "@/interfaces/auth/CredentialsDto";
import { createSupabaseClient } from "@/lib/supabase/client";

const supabase = createSupabaseClient();

export async function signIn(credentials: CredentialsDto) {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  if (error) throw error;
  if (data.session) {
    // Force a router refresh to sync cookies
    console.log("session exists after login");
  }
}
export async function signOut() {
  await supabase.auth.signOut();
}

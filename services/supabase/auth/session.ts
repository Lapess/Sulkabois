import CredentialsDto from "@/interfaces/user/auth/CredentialsDto";
import SignUpDto from "@/interfaces/user/auth/SignUpDto";
import { createSupabaseClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { addPlayer, playerExists } from "../players";
import { Player } from "@/interfaces/user/Player";

const supabase = createSupabaseClient();

export async function signIn(credentials: CredentialsDto) {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  if (error) throw error;
}
export async function signUp(credentials: SignUpDto) {
  // Check that the user with same email or name does not exists
  if (await playerExists(credentials.username)) return;

  const { error } = await supabase.auth.signUp(credentials);
  if (error) throw error;
  const player: Player = { name: credentials.username };
  await addPlayer(player);
}
export async function signOut() {
  await supabase.auth.signOut();
}
export async function getSessionUser(): Promise<User | null> {
  var response = await supabase.auth.getUser();
  return response.data.user;
}

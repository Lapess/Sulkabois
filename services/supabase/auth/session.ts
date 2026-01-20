import CredentialsDto from "@/interfaces/user/auth/CredentialsDto";
import SignUpDto from "@/interfaces/user/auth/SignUpDto";
import { createSupabaseClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { addPlayer } from "../players";
import { Player } from "@/interfaces/user/Player";

const supabase = createSupabaseClient();

export async function signIn(credentials: CredentialsDto) {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  if (error) throw error;
}
export async function signUp(credentials: SignUpDto): Promise<boolean> {
  const { data, error } = await supabase.auth.signUp(credentials);
  // TODO handle error with already existing email
  if (error) throw error;
  const player: Player = {
    user_id: data.user?.id,
    name: credentials.username,
  };
  return await addPlayer(player);
}
export async function signOut() {
  await supabase.auth.signOut();
}
export async function getSessionUser(): Promise<User | null> {
  var response = await supabase.auth.getUser();
  return response.data.user;
}

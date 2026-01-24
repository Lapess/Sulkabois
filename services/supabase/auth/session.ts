import CredentialsDto from "@/interfaces/user/auth/CredentialsDto";
import SignUpDto from "@/interfaces/user/auth/SignUpDto";
import { createSupabaseClient } from "@/lib/supabase/client";
import { AuthError, User } from "@supabase/supabase-js";
import { addPlayer } from "../players";
import { Player } from "@/interfaces/user/Player";

const supabase = createSupabaseClient();

export async function signIn(credentials: CredentialsDto) {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  if (error) throw error;
}
export async function inviteUser(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: true,
      emailRedirectTo:
        "https://sulkabois.vercel.app/auth/login/auth/magic-callback",
    },
  });
}
export async function exchangeCodeForSession(code: string): Promise<boolean> {
  const { error } =
    await createSupabaseClient().auth.exchangeCodeForSession(code);
  if (error) {
    console.error("Auth error:", error.message);
    return false;
  }
  return true;
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

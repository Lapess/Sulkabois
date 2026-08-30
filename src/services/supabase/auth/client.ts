import CredentialsDto from "@/interfaces/user/auth/CredentialsDto";
import SignUpDto from "@/interfaces/user/auth/SignUpDto";
import { createSupabaseClient } from "@/lib/supabase/client";
import { addPlayer } from "@/services/players";
import { Player } from "@/interfaces/user/Player";

const supabase = createSupabaseClient();

export async function signIn(credentials: CredentialsDto) {
  const { error } = await supabase.auth.signInWithPassword(credentials);
  if (error) throw error;
}
export async function passwordlessSignIn(email: string): Promise<boolean> {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      // emailRedirectTo: "http://localhost:3000/auth/magic-callback", // TODO should be environment variable
      emailRedirectTo: "https://sulkabois.vercel.app/auth/magic-callback",
    },
  });
  if (error) {
    console.log(error);
    throw error;
  }
  console.log("signed up successfully");
  return data != null;
}
// GENERAL TODO: Handle every errors on api calls -> display error messages and rollback unfinished changes
export async function signUp(credentials: SignUpDto): Promise<boolean> {
  const { data, error } = await supabase.auth.signUp(credentials);
  // TODO handle error with already existing email
  // TODO implement email verification
  if (error) {
    console.log(error);
    throw error;
  }
  const player: Player = {
    user_id: data.user?.id,
    name: credentials.username,
  };
  return await addPlayer(player);
}
export async function signOut() {
  await supabase.auth.signOut();
}

import CredentialsDto from "@/interfaces/auth/CredentialsDto";
import { createSupabaseBrowserClient } from "../browserClient";
import { setAccessToken } from "./session";

const supabase = createSupabaseBrowserClient();

export async function signInWithEmail(credentials: CredentialsDto) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });
  await setAccessToken(data.session?.access_token ?? "");
}

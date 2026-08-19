import { createClient } from "@/lib/supabase/server";
import { Session, User } from "@supabase/supabase-js";
import { cache } from "react";

export const getUser = cache(async (): Promise<User | null> => {
  const supabaseServerClient = await createClient();
  const { data } = await supabaseServerClient.auth.getUser();
  return data.user;
});

export async function exchangeCodeForSession(
  code: string,
): Promise<{ user: User | null; session: Session | null } | null> {
  const supabaseServerClient = await createClient();
  const { data, error } =
    await supabaseServerClient.auth.exchangeCodeForSession(code);
  if (error) {
    console.error("Auth error:", error.message);
    return null;
  }
  return { user: data.user, session: data.session };
}
export async function verifyOtp(
  email: string,
  tokenHash: string,
): Promise<{ user: User | null; session: Session | null } | null> {
  const supabaseServerClient = await createClient();
  const { data, error } = await supabaseServerClient.auth.verifyOtp({
    email,
    token_hash: tokenHash,
    type: "email",
  });
  if (error) {
    console.error("Auth error:", error.message);
    return null;
  }
  return { user: data.user, session: data.session };
}

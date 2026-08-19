import { createClient } from "@/lib/supabase/server";
import { AppUser } from "@/types/User";
import { Session, User } from "@supabase/supabase-js";
import { cache } from "react";

export const getUser = cache(async (): Promise<AppUser | null> => {
  const supabaseServerClient = await createClient();
  const { data } = await supabaseServerClient.auth.getUser();
  if (!data.user) return null;

  const { data: player, error } = await supabaseServerClient
    .from("player")
    .select("*")
    .eq("user_id", data.user.id)
    .maybeSingle();
  if (error) console.log(error);

  return { ...data.user, player: player ?? null };
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

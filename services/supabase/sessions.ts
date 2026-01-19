import { Session } from "@/types/Session";
import { createSupabaseClient } from "../../lib/supabase/client";

const supabase = createSupabaseClient();

export async function getSessionById(
  sessionId: number,
): Promise<Session | null> {
  const { data, error } = await supabase
    .from("session")
    .select("*, game(*)")
    .eq("id", sessionId);

  return data ? data[0] : null;
}
export async function getSessionsBySessionGroupId(
  sessionGroupId: number,
): Promise<Session[] | null> {
  const { data, error } = await supabase
    .from("session")
    .select("*, game(*)")
    .eq("session_group_id", sessionGroupId);

  return data;
}
export async function addSession(
  sessionGroupId: number,
): Promise<Session | null> {
  const { data, error } = await supabase
    .from("session")
    .insert({
      session_date: new Date().toDateString(),
      session_group_id: sessionGroupId,
      is_locked: false,
    })
    .select("*, game(*)");
  if (error) console.log(error);
  return data ? data[0] : null;
}
export async function updateSession(
  sessionId: number,
  isLocked: boolean,
): Promise<Session | null> {
  const { data, error } = await supabase
    .from("session")
    .update({ is_locked: isLocked })
    .eq("id", sessionId)
    .select("*, game(*)");
  if (error) console.log(error);
  console.log("Updating " + data![0].id + " locked: " + isLocked);
  return data ? data[0] : null;
}

export async function deleteSession(sessionId: number): Promise<boolean> {
  const { data, error } = await supabase
    .from("session")
    .delete()
    .eq("id", sessionId);
  if (error) {
    console.log(error);
    return false;
  }
  return true;
}

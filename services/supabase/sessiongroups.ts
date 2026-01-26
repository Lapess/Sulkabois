import { SessionGroup } from "@/types/SessionGroup";
import { createSupabaseClient } from "../../lib/supabase/client";
import { User } from "@supabase/supabase-js";

const supabase = createSupabaseClient();

export async function getSessionGroupById(
  sessionGroupId: number,
): Promise<SessionGroup | null> {
  const { data, error } = await supabase
    .from("session_group")
    .select("*, session(*)")
    .eq("id", sessionGroupId);

  return data ? data[0] : null;
}
export async function getSessionGroupsByUserId(
  userId: string,
): Promise<SessionGroup[] | null> {
  if (!userId) return null;
  const { data, error } = await supabase
    .from("session_group")
    .select(
      `
    *,
    user_sessiongroup!user_sessiongroup_session_group_id_fkey!inner (user_id)
  `,
    )
    .eq("user_sessiongroup.user_id", userId);
  return data;
}
export async function addSessionGroup(
  sessionGroupName: string | null,
): Promise<SessionGroup | null> {
  const { data, error } = await supabase
    .from("session_group")
    .insert({ name: sessionGroupName })
    .select("*");
  if (error) {
    console.log(error);
    return null;
  }
  return data ? data[0] : null;
}

export async function addUserToSessionGroup(
  user: User,
  sessionGroupId: number,
) {
  const { data, error } = await supabase
    .from("user_sessiongroup")
    .insert({ user_id: user.id, session_group_id: sessionGroupId })
    .select("*");
  if (error) {
    console.log(error);
    return null;
  }
  return data ? data[0] : null;
}

export async function updateSessionGroup(
  sessionGroupId: number,
  sessionGroupName: string,
): Promise<SessionGroup | null> {
  const { data, error } = await supabase
    .from("session_group")
    .update({ name: sessionGroupName })
    .eq("id", sessionGroupId)
    .select("*, session(*)");
  if (error) console.log(error);
  return data ? data[0] : null;
}
// TODO SOFT DELETE
export async function deleteSessionGroup(
  sessionGroupId: number,
): Promise<boolean> {
  const { data, error } = await supabase
    .from("session_group")
    .delete()
    .eq("id", sessionGroupId);
  if (error) {
    console.log(error);
    return false;
  }
  return true;
}

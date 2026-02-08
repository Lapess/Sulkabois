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
export async function getSessionGroupsByPlayerGroupId(
  playerGroupId: number,
): Promise<SessionGroup[] | null> {
  if (!playerGroupId) return null;
  const { data, error } = await supabase
    .from("session_group")
    .select(
      `
    *,
    playergroup_sessiongroup!playergroup_sessiongroup_session_group_id_fkey!inner (player_group_id)
  `,
    )
    .eq("deleted", false)
    .eq("playergroup_sessiongroup.player_group_id", playerGroupId);
  return data;
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
    .eq("deleted", false)
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
  userId: string,
  sessionGroupId: number,
) {
  const { data, error } = await supabase
    .from("user_sessiongroup")
    .insert({ user_id: userId, session_group_id: sessionGroupId })
    .select("*");
  if (error) {
    console.log(error);
    return null;
  }
  return data ? data[0] : null;
}
export async function addPlayerGroupToSessionGroup(
  playerGroupId: number,
  sessionGroupId: number,
) {
  const { data, error } = await supabase
    .from("playergroup_sessiongroup")
    .insert({
      player_group_id: playerGroupId,
      session_group_id: sessionGroupId,
    })
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
export async function deleteSessionGroup(
  sessionGroupId: number,
): Promise<boolean> {
  const { data, error } = await supabase
    .from("session_group")
    .update({ deleted: true })
    .eq("id", sessionGroupId);
  if (error) {
    console.log(error);
    return false;
  }
  return true;
}

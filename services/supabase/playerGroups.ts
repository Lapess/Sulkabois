import { PlayerGroup } from "@/interfaces/PlayerGroup";
import { createSupabaseClient } from "@/lib/supabase/client";

const supabase = createSupabaseClient();

export async function getPlayerGroups(userId: string): Promise<PlayerGroup[]> {
  const { data, error } = await supabase
    .from("user_playergroup")
    .select("*, player_group(id, name)")
    .eq("user_id", userId);
  if (error) {
    console.log(error);
    throw error;
  }
  return data;
}

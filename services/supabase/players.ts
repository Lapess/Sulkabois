import { Player as SupabasePlayer } from "@/types/Player";
import { createSupabaseClient } from "../../lib/supabase/client";
import { Player } from "@/interfaces/user/Player";

const supabase = createSupabaseClient();

export async function addPlayer(player: Player): Promise<boolean> {
  await supabase
    .from("player")
    .insert({ user_id: player.user_id, name: player.name })
    .throwOnError();
  return true;
}

export async function getPlayers(): Promise<SupabasePlayer[]> {
  const { data } = await supabase.from("player").select("*").throwOnError();
  return data;
}

export async function getPlayerWithUserId(
  userId: string,
): Promise<SupabasePlayer> {
  const { data, error } = await supabase
    .from("player")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error) console.log(error);
  return data;
}

export async function getTeamPlayers(
  gameId: number,
  courtSide: number,
): Promise<SupabasePlayer[]> {
  const { data, error } = await supabase
    .from("team")
    .select("id, player(*)")
    .eq("game_id", gameId)
    .eq("court_side", courtSide)
    .throwOnError();

  const players: SupabasePlayer[] = data
    .flatMap((team) => team.player)
    .filter((x) => x != null);
  return players;
}

import { Player as SupabasePlayer } from "@/types/Player";
import { QueryData } from "@supabase/supabase-js";
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
  const playersQuery = supabase.from("player").select("*").throwOnError();
  type Players = QueryData<typeof playersQuery>;
  const { data, error } = await playersQuery;
  if (error) throw error;
  const players: Players = data;
  return players;
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

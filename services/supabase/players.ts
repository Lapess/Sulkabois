import { Player } from "@/types/Player";
import { QueryData } from "@supabase/supabase-js";
import { createSupabaseClient } from "../../lib/supabase/client";

const supabase = createSupabaseClient();
export async function getPlayers(): Promise<Player[]> {
  const playersQuery = supabase
    .from("player")
    .select(`created_at, id, name, games_won_total`)
    .throwOnError();
  type Players = QueryData<typeof playersQuery>;
  const { data, error } = await playersQuery;
  if (error) throw error;
  const players: Players = data;
  return players;
}

export async function getTeamPlayers(
  gameId: number,
  courtSide: number,
): Promise<Player[]> {
  const { data, error } = await supabase
    .from("team")
    .select("id, player(created_at, id, name, games_won_total)")
    .eq("game_id", gameId)
    .eq("court_side", courtSide)
    .throwOnError();

  console.log(
    "team players:",
    data.map((x) => x.player),
  );
  const players: Player[] = data
    .flatMap((team) => team.player)
    .filter((x) => x != null);
  return players;
}

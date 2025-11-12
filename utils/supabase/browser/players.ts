import { Player } from "@/types/Player";
import { QueryData } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "../browserClient";

const supabase = createSupabaseBrowserClient();
export async function getPlayers(): Promise<Player[]> {
  const playersQuery = supabase
    .from("player")
    .select(`created_at, id, name, games_won_total`)
    .throwOnError();
  type Players = QueryData<typeof playersQuery>;
  const { data, error } = await playersQuery;
  if (error) throw error;
  const players: Players = data;
  console.log("players: " + players.map((x) => x.id));
  return players;
}

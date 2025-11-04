import { Database } from "@/supabase";
import { createServerClient } from "@supabase/ssr";
import { QueryData } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
export async function getPlayers(): Promise<Player[]> {
  const supabase = await createClient();
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
export async function getTeamPlayers(
  gameId: number,
  courtSide: number
): Promise<Player[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("team")
    .select("id, player(created_at, id, name, games_won_total)")
    .eq("game_id", gameId)
    .eq("court_side", courtSide)
    .throwOnError();

  console.log(
    "team players:",
    data.map((x) => x.player)
  );
  const players: Player[] = data.flatMap((team) => team.player);
  return players;
}

export type Team = TeamRow & {
  players?: Player[] | null;
};

export type Player = PlayerRow;

export type Game = GameRow;
export type Session = SessionRow & {
  games: Game[] | null;
};
export type GameRow = Database["public"]["Tables"]["game"]["Row"];
export type SessionRow = Database["public"]["Tables"]["session"]["Row"];
export type TeamRow = Database["public"]["Tables"]["team"]["Row"];
export type PlayerRow = Database["public"]["Tables"]["player"]["Row"];
export async function getSessions(): Promise<Session[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("session")
    .select(
      "created_at, session_date, id, game(id, created_at, session_id, full_game)"
    );

  console.log("sessions:" + data?.map((x) => x.id));
  return (
    data?.map((s) => ({
      id: s.id,
      games: s.game,
      created_at: s.created_at,
      session_date: s.session_date,
    })) ?? []
  );
}
export type GameTeams = GameRow & {
  teamLeft: Team | null;
  teamRight: Team | null;
};
export async function getGames(): Promise<GameTeams[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("game")
    .select(
      "created_at, full_game, session_id, id, team(id, created_at, game_id, player_id, points, court_side)"
    );

  console.log("games:" + data?.map((x) => x.id));
  return (
    data?.map((s) => ({
      id: s.id,
      teamLeft: s.team.find((x) => x.court_side == 0) ?? null,
      teamRight: s.team.find((x) => x.court_side == 1) ?? null,
      created_at: s.created_at,
      full_game: s.full_game,
      session_id: s.session_id,
    })) ?? []
  );
}

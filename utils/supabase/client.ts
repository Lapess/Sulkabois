import { Player } from "@/types/Player";
import { Session } from "@/types/Session";
import { createServerClient } from "@supabase/ssr";

import { cookies } from "next/headers";

export async function createSupabaseServerClient() {
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

export async function getTeamPlayers(
  gameId: number,
  courtSide: number
): Promise<Player[]> {
  const supabase = await createSupabaseServerClient();

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

export async function getSessions(): Promise<Session[]> {
  const supabase = await createSupabaseServerClient();
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

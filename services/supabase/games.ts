import { GameWithTeams } from "@/types/Game";
import { createSupabaseClient } from "../../lib/supabase/client";
import { GamePost } from "@/interfaces/GamePost";
import { getSessionsBySessionGroupId } from "./sessions";

const supabase = createSupabaseClient();

export async function getGamesWithTeamsFullBySessionGroupId(
  sessionGroupId: number,
): Promise<GameWithTeams[] | null> {
  const sessions = await getSessionsBySessionGroupId(sessionGroupId);
  const sessionIds = sessions?.map((x) => x.id) ?? [];
  const { data, error } = await supabase
    .from("game")
    .select("*, team(*, player(*))")
    .in("session_id", sessionIds);
  return data;
}
export async function getGamesWithTeamsBySessionId(
  sessionId: number,
): Promise<GameWithTeams[] | null> {
  const { data, error } = await supabase
    .from("game")
    .select("*, team(*, player(*))")
    .eq("session_id", sessionId);
  return data;
}
export async function addGame(game: GamePost): Promise<number | null> {
  // Insert game
  const { data: gameData, error: gameError } = await supabase
    .from("game")
    .insert({ session_id: game.sessionId, full_game: game.fullGame })
    .select(
      "created_at, full_game, session_id, id, team(id, created_at, game_id, player_id, points, court_side)",
    );
  if (!gameData) return null;
  if (gameError) console.log(gameError);
  // Insert teams
  const { data: teamData, error: teamError } = await supabase
    .from("team")
    .insert(
      game.teams.map((x) => ({
        game_id: gameData[0].id,
        points: x.points,
        court_side: x.courtSide,
        player_id: x.playerId,
      })),
    );
  if (teamError) console.log(teamError);
  return gameData[0].id;
}

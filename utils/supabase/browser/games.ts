import { GameTeams, GameWithTeams } from "@/types/Game";
import { createSupabaseBrowserClient } from "../browserClient";
import { GamePost } from "@/interfaces/GamePost";

const supabase = createSupabaseBrowserClient();

export async function getGamesWithTeamsFull(): Promise<GameWithTeams[] | null> {
  const { data, error } = await supabase
    .from("game")
    .select("*, team(*, player(*))");
  return data;
}
export async function addGame(game: GamePost): Promise<number | null> {
  console.log("teams" + game.teams);
  // Insert game
  const { data: gameData, error: gameError } = await supabase
    .from("game")
    .insert({ session_id: game.sessionId, full_game: game.fullGame })
    .select(
      "created_at, full_game, session_id, id, team(id, created_at, game_id, player_id, points, court_side)"
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
      }))
    );
  if (teamError) console.log(teamError);
  return gameData[0].id;
}

"use server";

import { db } from "@/db";
import { games, teams } from "@/db/schema";
import { GamePost } from "@/interfaces/GamePost";
import { GameWithTeams } from "@/types/Game";
import { getSessionsBySessionGroupId } from "./sessions";

export async function getGamesWithTeamsFullBySessionGroupId(
  sessionGroupId: number,
): Promise<GameWithTeams[] | null> {
  const sessions = await getSessionsBySessionGroupId(sessionGroupId);
  const sessionIds = sessions?.map((session) => session.id) ?? [];
  if (sessionIds.length === 0) return [];

  return db.query.games.findMany({
    where: { session_id: { in: sessionIds } },
    with: {
      team: {
        with: { player: true },
      },
    },
  });
}

export async function getGamesWithTeamsBySessionId(
  sessionId: number,
): Promise<GameWithTeams[] | null> {
  return db.query.games.findMany({
    where: { session_id: sessionId },
    with: {
      team: {
        with: { player: true },
      },
    },
  });
}

export async function addGame(game: GamePost): Promise<number | null> {
  try {
    return await db.transaction(async (tx) => {
      const [inserted] = await tx
        .insert(games)
        .values({
          session_id: game.sessionId,
          full_game: game.fullGame,
        })
        .returning({ id: games.id });
      if (!inserted) return null;

      if (game.teams.length > 0) {
        await tx.insert(teams).values(
          game.teams.map((team) => ({
            game_id: inserted.id,
            points: team.points,
            court_side: team.courtSide,
            player_id: team.playerId,
          })),
        );
      }
      return inserted.id;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}

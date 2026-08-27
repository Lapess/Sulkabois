"use server";

import { db } from "@/db";
import { players } from "@/db/schema";
import { Player as PlayerInput } from "@/interfaces/user/Player";
import { Player } from "@/types/Player";

export async function addPlayer(player: PlayerInput): Promise<boolean> {
  await db.insert(players).values({
    user_id: player.user_id ?? null,
    name: player.name,
  });
  return true;
}

export async function getPlayersWithSessionGroupId(
  sessionGroupId: number,
): Promise<Player[]> {
  const sessionGroupUsers = await db.query.userSessionGroups.findMany({
    where: { session_group_id: sessionGroupId },
    columns: { user_id: true },
  });

  const playerGroupLinks = await db.query.playerGroupSessionGroups.findMany({
    where: { session_group_id: sessionGroupId },
    columns: { player_group_id: true },
  });

  const playerGroupIds = playerGroupLinks.map((link) => link.player_group_id);
  let playerGroupUserIds: string[] = [];
  if (playerGroupIds.length > 0) {
    const playerGroupUsers = await db.query.userPlayerGroups.findMany({
      where: { player_group_id: { in: playerGroupIds } },
      columns: { user_id: true },
    });
    playerGroupUserIds = playerGroupUsers.map((row) => row.user_id);
  }

  const userIds = [
    ...new Set([
      ...sessionGroupUsers.map((row) => row.user_id),
      ...playerGroupUserIds,
    ]),
  ];
  if (userIds.length === 0) return [];

  return db.query.players.findMany({
    where: { user_id: { in: userIds } },
  });
}

export async function getPlayerWithUserId(
  userId: string,
): Promise<Player | null> {
  if (!userId) return null;
  try {
    const data = await db.query.players.findFirst({
      where: { user_id: userId },
    });
    return data ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getTeamPlayers(
  gameId: number,
  courtSide: number,
): Promise<Player[]> {
  const data = await db.query.teams.findMany({
    where: {
      game_id: gameId,
      court_side: courtSide,
    },
    with: { player: true },
  });

  return data
    .map((team) => team.player)
    .filter((player): player is Player => player != null);
}

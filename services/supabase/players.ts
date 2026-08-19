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

export async function getPlayersWithSessionGroupId(
  sessionGroupId: number,
): Promise<SupabasePlayer[]> {
  const { data: sessionGroupUsers, error: sessionGroupUsersError } =
    await supabase
      .from("user_sessiongroup")
      .select("user_id")
      .eq("session_group_id", sessionGroupId);
  if (sessionGroupUsersError) {
    console.log(sessionGroupUsersError);
    throw sessionGroupUsersError;
  }

  const { data: playerGroupLinks, error: playerGroupLinksError } =
    await supabase
      .from("playergroup_sessiongroup")
      .select("player_group_id")
      .eq("session_group_id", sessionGroupId);
  if (playerGroupLinksError) {
    console.log(playerGroupLinksError);
    throw playerGroupLinksError;
  }

  const playerGroupIds = (playerGroupLinks ?? []).map(
    (link) => link.player_group_id,
  );
  let playerGroupUserIds: string[] = [];
  if (playerGroupIds.length > 0) {
    const { data: playerGroupUsers, error: playerGroupUsersError } =
      await supabase
        .from("user_playergroup")
        .select("user_id")
        .in("player_group_id", playerGroupIds);
    if (playerGroupUsersError) {
      console.log(playerGroupUsersError);
      throw playerGroupUsersError;
    }
    playerGroupUserIds = (playerGroupUsers ?? []).map((row) => row.user_id);
  }

  const userIds = [
    ...new Set([
      ...(sessionGroupUsers ?? []).map((row) => row.user_id),
      ...playerGroupUserIds,
    ]),
  ];
  if (userIds.length === 0) return [];

  const { data } = await supabase
    .from("player")
    .select("*")
    .in("user_id", userIds)
    .throwOnError();
  return data;
}

export async function getPlayerWithUserId(
  userId: string,
): Promise<SupabasePlayer | null> {
  if (!userId) return null;
  const { data, error } = await supabase
    .from("player")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
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

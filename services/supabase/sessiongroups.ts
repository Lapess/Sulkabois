import { PlayerGroup } from "@/interfaces/PlayerGroup";
import { createSupabaseClient } from "../../lib/supabase/client";
import {
  SessionGroup,
  SessionGroupRow,
  SessionGroupsByPlayerGroup,
} from "@/types/SessionGroup";
import { SessionRow } from "@/types/Session";
import { getPlayerGroups } from "./playerGroups";

const supabase = createSupabaseClient();

type PlayerGroupRow = { id: number; name: string | null };

type SessionGroupQueryRow = SessionGroupRow & {
  session?: SessionRow[] | null;
  playergroup_sessiongroup?: Array<{
    player_group: PlayerGroupRow | null;
  }> | null;
};

function toPlayerGroup(row: PlayerGroupRow | null | undefined): PlayerGroup | null {
  if (!row) return null;
  return { id: row.id, name: row.name ?? "" };
}

function toSessionGroup(
  row: SessionGroupQueryRow,
  playerGroup?: PlayerGroup | null,
): SessionGroup {
  return {
    id: row.id,
    created_at: row.created_at,
    deleted: row.deleted,
    name: row.name,
    session: row.session ?? null,
    playerGroup:
      playerGroup ?? toPlayerGroup(row.playergroup_sessiongroup?.[0]?.player_group),
  };
}

function groupSessionGroupsByPlayerGroup(
  sessionGroups: SessionGroup[],
  playerGroups: PlayerGroup[] = [],
): SessionGroupsByPlayerGroup[] {
  const groups = new Map<number | "personal", SessionGroupsByPlayerGroup>();

  for (const playerGroup of playerGroups) {
    groups.set(playerGroup.id, { playerGroup, sessionGroups: [] });
  }

  for (const sessionGroup of sessionGroups) {
    const key = sessionGroup.playerGroup?.id ?? "personal";
    const existing = groups.get(key);
    if (existing) {
      existing.sessionGroups.push(sessionGroup);
    } else {
      groups.set(key, {
        playerGroup: sessionGroup.playerGroup ?? null,
        sessionGroups: [sessionGroup],
      });
    }
  }

  if (playerGroups.length === 0 && !groups.has("personal")) {
    groups.set("personal", { playerGroup: null, sessionGroups: [] });
  }

  const result = Array.from(groups.values());
  result.sort((a, b) => {
    if (a.playerGroup == null) return 1;
    if (b.playerGroup == null) return -1;
    return a.playerGroup.name.localeCompare(b.playerGroup.name, "fi");
  });
  for (const group of result) {
    group.sessionGroups.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }
  return result;
}

export async function getSessionGroupById(
  sessionGroupId: number,
): Promise<SessionGroup | null> {
  const { data } = await supabase
    .from("session_group")
    .select(
      `
      *,
      session(*),
      playergroup_sessiongroup (
        player_group (id, name)
      )
    `,
    )
    .eq("id", sessionGroupId);

  return data?.[0] ? toSessionGroup(data[0] as SessionGroupQueryRow) : null;
}

export async function getSessionGroupsByPlayerGroupId(
  playerGroupId: number,
): Promise<SessionGroup[] | null> {
  if (!playerGroupId) return null;
  const { data, error } = await supabase
    .from("session_group")
    .select(
      `
    *,
    session(*),
    playergroup_sessiongroup!playergroup_sessiongroup_session_group_id_fkey!inner (
      player_group (id, name)
    )
  `,
    )
    .eq("deleted", false)
    .eq("playergroup_sessiongroup.player_group_id", playerGroupId);
  if (error) {
    console.log(error);
    return null;
  }
  return (data ?? []).map((row) => toSessionGroup(row as SessionGroupQueryRow));
}

export async function getSessionGroupsByUserId(
  userId: string,
  knownPlayerGroups?: PlayerGroup[],
): Promise<SessionGroup[] | null> {
  if (!userId) return null;

  const playerGroups = knownPlayerGroups ?? (await getPlayerGroups(userId));
  const playerGroupIds = playerGroups.map((group) => group.id);

  const personalQuery = supabase
    .from("session_group")
    .select(
      `
      *,
      session(*),
      playergroup_sessiongroup (
        player_group (id, name)
      ),
      user_sessiongroup!user_sessiongroup_session_group_id_fkey!inner (user_id)
    `,
    )
    .eq("deleted", false)
    .eq("user_sessiongroup.user_id", userId);

  const playerGroupQuery =
    playerGroupIds.length > 0
      ? supabase
          .from("session_group")
          .select(
            `
            *,
            session(*),
            playergroup_sessiongroup!playergroup_sessiongroup_session_group_id_fkey!inner (
              player_group (id, name)
            )
          `,
          )
          .eq("deleted", false)
          .in("playergroup_sessiongroup.player_group_id", playerGroupIds)
      : Promise.resolve({ data: [] as SessionGroupQueryRow[], error: null });

  const [viaUser, viaPlayerGroup] = await Promise.all([
    personalQuery,
    playerGroupQuery,
  ]);

  if (viaUser.error) console.log(viaUser.error);
  if (viaPlayerGroup.error) console.log(viaPlayerGroup.error);

  const byId = new Map<number, SessionGroup>();
  for (const row of [
    ...((viaUser.data ?? []) as SessionGroupQueryRow[]),
    ...((viaPlayerGroup.data ?? []) as SessionGroupQueryRow[]),
  ]) {
    const mapped = toSessionGroup(row);
    const existing = byId.get(mapped.id);
    if (!existing || (!existing.playerGroup && mapped.playerGroup)) {
      byId.set(mapped.id, mapped);
    }
  }

  return Array.from(byId.values());
}

export async function getSessionGroupsGroupedByPlayerGroup(
  userId: string,
): Promise<SessionGroupsByPlayerGroup[] | null> {
  if (!userId) return null;
  const playerGroups = await getPlayerGroups(userId);
  const sessionGroups = await getSessionGroupsByUserId(userId, playerGroups);
  if (!sessionGroups) return null;
  return groupSessionGroupsByPlayerGroup(sessionGroups, playerGroups);
}

export async function addSessionGroup(
  sessionGroupName: string | null,
): Promise<SessionGroup | null> {
  const { data, error } = await supabase
    .from("session_group")
    .insert({ name: sessionGroupName })
    .select("*");
  if (error) {
    console.log(error);
    return null;
  }
  return data ? toSessionGroup(data[0] as SessionGroupQueryRow) : null;
}

export async function addUserToSessionGroup(
  userId: string,
  sessionGroupId: number,
) {
  const { data, error } = await supabase
    .from("user_sessiongroup")
    .insert({ user_id: userId, session_group_id: sessionGroupId })
    .select("*");
  if (error) {
    console.log(error);
    return null;
  }
  return data ? data[0] : null;
}

export async function addPlayerGroupToSessionGroup(
  playerGroupId: number,
  sessionGroupId: number,
) {
  const { data, error } = await supabase
    .from("playergroup_sessiongroup")
    .insert({
      player_group_id: playerGroupId,
      session_group_id: sessionGroupId,
    })
    .select("*");
  if (error) {
    console.log(error);
    return null;
  }
  return data ? data[0] : null;
}

export async function updateSessionGroup(
  sessionGroupId: number,
  sessionGroupName: string,
): Promise<SessionGroup | null> {
  const { data, error } = await supabase
    .from("session_group")
    .update({ name: sessionGroupName })
    .eq("id", sessionGroupId)
    .select(
      `
      *,
      session(*),
      playergroup_sessiongroup (
        player_group (id, name)
      )
    `,
    );
  if (error) console.log(error);
  return data?.[0] ? toSessionGroup(data[0] as SessionGroupQueryRow) : null;
}

export async function deleteSessionGroup(
  sessionGroupId: number,
): Promise<boolean> {
  const { error } = await supabase
    .from("session_group")
    .update({ deleted: true })
    .eq("id", sessionGroupId);
  if (error) {
    console.log(error);
    return false;
  }
  return true;
}

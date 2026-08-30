"use server";

import { db } from "@/db";
import {
  playerGroupSessionGroups,
  sessionGroups,
  userSessionGroups,
} from "@/db/schema";
import { PlayerGroup } from "@/interfaces/PlayerGroup";
import { SessionGroup, SessionGroupsByPlayerGroup } from "@/types/SessionGroup";
import { SessionRow } from "@/types/Session";
import { eq, inArray } from "drizzle-orm";
import { getPlayerGroups } from "./playerGroups";

type SessionGroupQueryRow = typeof sessionGroups.$inferSelect & {
  session?: SessionRow[] | null;
  playerGroups?: Array<{ id: number; name: string | null }> | null;
};

function toPlayerGroup(
  row: { id: number; name: string | null } | null | undefined,
): PlayerGroup | null {
  if (!row) return null;
  return { id: row.id, name: row.name ?? "" };
}

function toSessionGroup(row: SessionGroupQueryRow): SessionGroup {
  return {
    id: row.id,
    created_at: row.created_at,
    deleted: row.deleted,
    name: row.name,
    session: row.session ?? null,
    playerGroup: toPlayerGroup(row.playerGroups?.[0]),
  };
}

function groupSessionGroupsByPlayerGroup(
  mappedSessionGroups: SessionGroup[],
  knownPlayerGroups: PlayerGroup[] = [],
): SessionGroupsByPlayerGroup[] {
  const groups = new Map<number | "personal", SessionGroupsByPlayerGroup>();

  for (const playerGroup of knownPlayerGroups) {
    groups.set(playerGroup.id, { playerGroup, sessionGroups: [] });
  }

  for (const sessionGroup of mappedSessionGroups) {
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

  if (knownPlayerGroups.length === 0 && !groups.has("personal")) {
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

async function loadSessionGroupsByIds(
  ids: number[],
): Promise<SessionGroupQueryRow[]> {
  if (ids.length === 0) return [];
  return db.query.sessionGroups.findMany({
    where: {
      deleted: false,
      id: { in: ids },
    },
    with: {
      session: true,
      playerGroups: {
        columns: { id: true, name: true },
      },
    },
  });
}

export async function getSessionGroupById(
  sessionGroupId: number,
): Promise<SessionGroup | null> {
  const data = await db.query.sessionGroups.findFirst({
    where: { id: sessionGroupId },
    with: {
      session: true,
      playerGroups: {
        columns: { id: true, name: true },
      },
    },
  });
  return data ? toSessionGroup(data) : null;
}

export async function getSessionGroupsByPlayerGroupId(
  playerGroupId: number,
): Promise<SessionGroup[] | null> {
  if (!playerGroupId) return null;
  try {
    const links = await db
      .select({
        session_group_id: playerGroupSessionGroups.session_group_id,
      })
      .from(playerGroupSessionGroups)
      .where(eq(playerGroupSessionGroups.player_group_id, playerGroupId));
    const rows = await loadSessionGroupsByIds(
      links.map((link) => link.session_group_id),
    );
    return rows.map(toSessionGroup);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getSessionGroupsByUserId(
  userId: string,
  knownPlayerGroups?: PlayerGroup[],
): Promise<SessionGroup[] | null> {
  if (!userId) return null;

  const playerGroups = knownPlayerGroups ?? (await getPlayerGroups(userId));
  const playerGroupIds = playerGroups.map((group) => group.id);

  try {
    const viaUser = await db
      .select({ session_group_id: userSessionGroups.session_group_id })
      .from(userSessionGroups)
      .where(eq(userSessionGroups.user_id, userId));

    const viaPlayerGroup =
      playerGroupIds.length > 0
        ? await db
            .select({
              session_group_id: playerGroupSessionGroups.session_group_id,
            })
            .from(playerGroupSessionGroups)
            .where(
              inArray(playerGroupSessionGroups.player_group_id, playerGroupIds),
            )
        : [];

    const ids = [
      ...new Set(
        [...viaUser, ...viaPlayerGroup].map((row) => row.session_group_id),
      ),
    ];
    const rows = await loadSessionGroupsByIds(ids);
    return rows.map(toSessionGroup);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getSessionGroupsGroupedByPlayerGroup(
  userId: string,
): Promise<SessionGroupsByPlayerGroup[] | null> {
  if (!userId) return null;
  const playerGroups = await getPlayerGroups(userId);
  const mappedSessionGroups = await getSessionGroupsByUserId(
    userId,
    playerGroups,
  );
  if (!mappedSessionGroups) return null;
  return groupSessionGroupsByPlayerGroup(mappedSessionGroups, playerGroups);
}

export async function addSessionGroup(
  sessionGroupName: string | null,
): Promise<SessionGroup | null> {
  try {
    const [inserted] = await db
      .insert(sessionGroups)
      .values({ name: sessionGroupName })
      .returning();
    if (!inserted) return null;
    return toSessionGroup({ ...inserted, session: [], playerGroups: [] });
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addUserToSessionGroup(
  userId: string,
  sessionGroupId: number,
) {
  try {
    const [inserted] = await db
      .insert(userSessionGroups)
      .values({ user_id: userId, session_group_id: sessionGroupId })
      .returning();
    return inserted ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addPlayerGroupToSessionGroup(
  playerGroupId: number,
  sessionGroupId: number,
) {
  try {
    const [inserted] = await db
      .insert(playerGroupSessionGroups)
      .values({
        player_group_id: playerGroupId,
        session_group_id: sessionGroupId,
      })
      .returning();
    return inserted ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateSessionGroup(
  sessionGroupId: number,
  sessionGroupName: string,
): Promise<SessionGroup | null> {
  try {
    await db
      .update(sessionGroups)
      .set({ name: sessionGroupName })
      .where(eq(sessionGroups.id, sessionGroupId));
    return getSessionGroupById(sessionGroupId);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteSessionGroup(
  sessionGroupId: number,
): Promise<boolean> {
  try {
    await db
      .update(sessionGroups)
      .set({ deleted: true })
      .where(eq(sessionGroups.id, sessionGroupId));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

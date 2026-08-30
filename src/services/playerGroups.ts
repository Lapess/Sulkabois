"use server";

import { db } from "@/db";
import { PlayerGroup } from "@/interfaces/PlayerGroup";

export async function getPlayerGroups(userId: string): Promise<PlayerGroup[]> {
  const data = await db.query.userPlayerGroups.findMany({
    where: { user_id: userId },
    with: {
      playerGroup: {
        columns: { id: true, name: true },
      },
    },
  });

  return data.flatMap((row) =>
    row.playerGroup
      ? [{ id: row.playerGroup.id, name: row.playerGroup.name ?? "" }]
      : [],
  );
}

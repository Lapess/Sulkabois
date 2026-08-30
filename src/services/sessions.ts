"use server";

import { db } from "@/db";
import { sessions } from "@/db/schema";
import { Session } from "@/types/Session";
import { eq } from "drizzle-orm";

export async function getSessionById(
  sessionId: number,
): Promise<Session | null> {
  const data = await db.query.sessions.findFirst({
    where: { id: sessionId },
    with: { game: true },
  });
  return data ?? null;
}

export async function getSessionsBySessionGroupId(
  sessionGroupId: number,
): Promise<Session[] | null> {
  return db.query.sessions.findMany({
    where: { session_group_id: sessionGroupId },
    with: { game: true },
  });
}

export async function addSession(
  sessionGroupId: number,
): Promise<Session | null> {
  try {
    const [inserted] = await db
      .insert(sessions)
      .values({
        session_date: new Date().toDateString(),
        session_group_id: sessionGroupId,
        is_locked: false,
      })
      .returning();
    if (!inserted) return null;
    return { ...inserted, game: [] };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateSession(
  sessionId: number,
  isLocked: boolean,
): Promise<Session | null> {
  try {
    await db
      .update(sessions)
      .set({ is_locked: isLocked })
      .where(eq(sessions.id, sessionId));
    const updated = await getSessionById(sessionId);
    if (updated) {
      console.log("Updating " + updated.id + " locked: " + isLocked);
    }
    return updated;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteSession(sessionId: number): Promise<boolean> {
  try {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

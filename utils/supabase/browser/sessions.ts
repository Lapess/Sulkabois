import { Session } from "@/types/Session";
import { createSupabaseBrowserClient } from "../browserClient";

const supabase = createSupabaseBrowserClient();

export async function getSessionById(
  sessionId: number
): Promise<Session | null> {
  const { data, error } = await supabase
    .from("session")
    .select(
      "created_at, session_date, id, game(id, created_at, session_id, full_game)"
    )
    .eq("id", sessionId);

  return data
    ? {
        id: data[0].id,
        games: [],
        created_at: data[0].created_at,
        session_date: data[0].session_date,
      }
    : null;
}
export async function getSessions(): Promise<Session[]> {
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
export async function addSession(): Promise<Session | null> {
  const { data, error } = await supabase
    .from("session")
    .insert({ session_date: new Date().toDateString() })
    .select(
      "id, session_date, created_at, game(id, created_at, session_id, full_game)"
    );
  if (error) console.log(error);
  return data
    ? {
        id: data[0].id,
        games: [],
        created_at: data[0].created_at,
        session_date: data[0].session_date,
      }
    : null;
}

export async function deleteSession(sessionId: number): Promise<boolean> {
  const { data, error } = await supabase
    .from("session")
    .delete()
    .eq("id", sessionId);
  if (error) {
    console.log(error);
    return false;
  }
  return true;
}

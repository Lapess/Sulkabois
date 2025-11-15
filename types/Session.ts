import { Database } from "@/supabase";
import { GameRow } from "./Game";

export type SessionRow = Database["public"]["Tables"]["session"]["Row"];

export type Session = SessionRow & {
  game: GameRow[] | null;
};

import { Database } from "@/supabase";
import { Game } from "./Game";

export type SessionRow = Database["public"]["Tables"]["session"]["Row"];

export type Session = SessionRow & {
  games: Game[] | null;
};

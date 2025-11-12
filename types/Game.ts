import { Database } from "@/supabase";
import { Team } from "./Team";

export type GameRow = Database["public"]["Tables"]["game"]["Row"];
export type GameTeams = GameRow & {
  teamLeft: Team[] | null;
  teamRight: Team[] | null;
};
export type Game = GameRow;

import { Database } from "@/supabase";
import { TeamRow } from "./Team";
import { PlayerRow } from "./Player";

export type GameRow = Database["public"]["Tables"]["game"]["Row"];
export type GameWithTeams = GameRow & {
  team: (TeamRow & {
    player: PlayerRow | null;
  })[];
};

export type Game = GameRow;

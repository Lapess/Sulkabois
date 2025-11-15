import { Database } from "@/supabase";
import { Team, TeamRow } from "./Team";
import { PlayerRow } from "./Player";

export type GameRow = Database["public"]["Tables"]["game"]["Row"];
export type GameTeams = GameRow & {
  teamLeft: Team[] | null;
  teamRight: Team[] | null;
};
export type GameWithTeams = GameRow & {
  team: (TeamRow & {
    player: PlayerRow | null;
  })[];
};

export type Game = GameRow;

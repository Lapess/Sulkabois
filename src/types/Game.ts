import { games } from "@/db/schema";
import { TeamRow } from "./Team";
import { PlayerRow } from "./Player";

export type GameRow = typeof games.$inferSelect;
export type GameWithTeams = GameRow & {
  team: (TeamRow & {
    player: PlayerRow | null;
  })[];
};

export type Game = GameRow;

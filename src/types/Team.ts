import { teams } from "@/db/schema";
import { Player } from "./Player";

export type TeamRow = typeof teams.$inferSelect;
export type Team = TeamRow & {
  player?: Player[] | null;
};

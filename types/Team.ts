import { Database } from "@/supabase";
import { Player } from "./Player";

export type TeamRow = Database["public"]["Tables"]["team"]["Row"];
export type Team = TeamRow & {
  player?: Player[] | null;
};

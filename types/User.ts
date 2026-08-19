import { User } from "@supabase/supabase-js";
import { Player } from "./Player";

export type AppUser = User & {
  player: Player | null;
};

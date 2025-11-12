import { Database } from "@/supabase";

export type PlayerRow = Database["public"]["Tables"]["player"]["Row"];

export type Player = PlayerRow;

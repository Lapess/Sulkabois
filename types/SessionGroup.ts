import { Database } from "@/supabase";
import { SessionRow } from "./Session";

export type SessionGroupRow =
  Database["public"]["Tables"]["session_group"]["Row"];

export type SessionGroup = SessionGroupRow & {
  session: SessionRow[] | null;
};

import { PlayerGroup } from "@/interfaces/PlayerGroup";
import { sessionGroups } from "@/db/schema";
import { SessionRow } from "./Session";

export type SessionGroupRow = typeof sessionGroups.$inferSelect;

export type SessionGroup = SessionGroupRow & {
  session: SessionRow[] | null;
  playerGroup?: PlayerGroup | null;
};

export type SessionGroupsByPlayerGroup = {
  playerGroup: PlayerGroup | null;
  sessionGroups: SessionGroup[];
};

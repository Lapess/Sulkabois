import { sessions } from "@/db/schema";
import { GameRow } from "./Game";

export type SessionRow = typeof sessions.$inferSelect;

export type Session = SessionRow & {
  game: GameRow[] | null;
};

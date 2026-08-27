import { players } from "@/db/schema";

export type PlayerRow = typeof players.$inferSelect;

export type Player = PlayerRow;

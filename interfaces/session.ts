import { Game } from "./game";

export interface Session {
  id: number;
  session_date: Date;
}

export interface SessionGames {
  sessionId: number;
  sessionDate: Date;
  games: Game[];
}

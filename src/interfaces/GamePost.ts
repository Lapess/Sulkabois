import { TeamPost } from "./TeamPost";

export interface GamePost {
  sessionId: number;
  fullGame: boolean;
  teams: TeamPost[];
}

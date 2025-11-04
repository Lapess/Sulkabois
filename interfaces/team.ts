import { Game } from "./game";
import { Player } from "./player";

export interface Team {
  id: number;
  players: Player[];
  points: number;
  game: Game;
}

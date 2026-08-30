import { CourtSide } from "@/enums/CourtSide";

export interface TeamPost {
  points: number;
  courtSide: CourtSide;
  playerId: number;
}

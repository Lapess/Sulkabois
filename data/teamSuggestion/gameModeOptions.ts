import { GameMode } from "@/enums/GameMode";
interface GameModeOption {
  title: string;
  value: GameMode;
}
export const gameModeOptions: GameModeOption[] = [
  {
    title: "1 vs 1",
    value: GameMode.OneVsOne,
  },
  {
    title: "1 vs 2",
    value: GameMode.OneVsTwo,
  },
  {
    title: "2 vs 2",
    value: GameMode.TwoVsTwo,
  },
];

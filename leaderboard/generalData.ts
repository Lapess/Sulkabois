import { GeneralDataTableItem } from "@/interfaces/GeneralDataTableItem";
import { getGamesCountByLeaderBoardType } from "./calcHelpers";
import { LeaderBoardType } from "@/enums/LeaderBoardType";
import { GameWithTeams } from "@/types/Game";
import { Session } from "@/types/Session";

export function getGeneralDataTableItems(
  games: GameWithTeams[],
  sessions: Session[],
): GeneralDataTableItem[] {
  return [
    { id: 0, title: "Sessiot", value: sessions?.length ?? 0 },
    { id: 1, title: "Pelit", value: games?.length ?? 0 },
    {
      id: 2,
      title: "Kaksinpelit",
      value: getGamesCountByLeaderBoardType(
        games ?? [],
        LeaderBoardType.Singles,
      ),
    },
    {
      id: 3,
      title: "Nelinpelit",
      value: getGamesCountByLeaderBoardType(
        games ?? [],
        LeaderBoardType.Doubles,
      ),
    },
    {
      id: 4,
      title: "1 vs 2",
      value: getGamesCountByLeaderBoardType(
        games ?? [],
        LeaderBoardType.OneVSTwo,
      ),
    },
  ];
}

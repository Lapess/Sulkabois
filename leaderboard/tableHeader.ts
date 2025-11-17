import { LeaderBoardType } from "@/enums/LeaderBoardType";

export function getTableHeader(type: LeaderBoardType) {
  switch (type) {
    case LeaderBoardType.All:
      return "Voitot kaikissa peleissä";
    case LeaderBoardType.Singles:
      return "Voitot kaksinpeleissä";
    case LeaderBoardType.Doubles:
      return "Voitot nelinpeleissä";
    case LeaderBoardType.OneVSTwo:
      return "Voitot 1 vs 2 -peleissä";
  }
}

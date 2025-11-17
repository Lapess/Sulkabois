import { LeaderBoardType } from "@/enums/LeaderBoardType";
import { GameWithTeams } from "@/types/Game";

export function getPlayerWinsCount(
  playerId: number,
  games: GameWithTeams[],
  leaderBoardType: LeaderBoardType
): number {
  const playersGames = getPlayerGames(playerId, games, leaderBoardType);
  return playersGames.filter((game) => {
    const playerSide = game.team.find(
      (x) => x.player_id == playerId
    )?.court_side;

    const playersTeamPoints = game.team.find(
      (team) => team.court_side == playerSide
    )?.points;

    const otherTeamPoints = game.team.find(
      (team) => team.court_side != playerSide
    )?.points;
    return (playersTeamPoints ?? 0) > (otherTeamPoints ?? 0);
  }).length;
}

export function getPlayerGames(
  playerId: number,
  games: GameWithTeams[],
  leaderBoardType: LeaderBoardType
): GameWithTeams[] {
  switch (leaderBoardType) {
    case LeaderBoardType.Singles:
      return games.filter((game) => {
        let gameTeamPlayerIds = game.team.map((x) => x.player_id);
        return (
          gameTeamPlayerIds.length == 2 && gameTeamPlayerIds.includes(playerId)
        );
      });
    case LeaderBoardType.Doubles:
      return games.filter((game) => {
        let gameTeamPlayerIds = game.team.map((x) => x.player_id);
        return (
          gameTeamPlayerIds.length == 4 && gameTeamPlayerIds.includes(playerId)
        );
      });
    case LeaderBoardType.OneVSTwo:
      return games.filter((game) => {
        let gameTeamPlayerIds = game.team.map((x) => x.player_id);
        return (
          gameTeamPlayerIds.length == 3 && gameTeamPlayerIds.includes(playerId)
        );
      });
    case LeaderBoardType.All:
    default:
      return games.filter((game) => {
        let gameTeamPlayerIds = game.team.map((x) => x.player_id);
        return gameTeamPlayerIds.includes(playerId);
      });
  }
}
export function getGamesCountByLeaderBoardType(
  games: GameWithTeams[],
  leaderBoardType: LeaderBoardType
): number {
  switch (leaderBoardType) {
    case LeaderBoardType.Singles:
      return games.filter((game) => {
        let gameTeamPlayerIds = game.team.map((x) => x.player_id);
        return gameTeamPlayerIds.length == 2;
      }).length;
    case LeaderBoardType.Doubles:
      return games.filter((game) => {
        let gameTeamPlayerIds = game.team.map((x) => x.player_id);
        return gameTeamPlayerIds.length == 4;
      }).length;
    case LeaderBoardType.OneVSTwo:
      return games.filter((game) => {
        let gameTeamPlayerIds = game.team.map((x) => x.player_id);
        return gameTeamPlayerIds.length == 3;
      }).length;
    case LeaderBoardType.All:
    default:
      return games.length;
  }
}
export function getPlayerWinPercentage(
  playerId: number,
  games: GameWithTeams[],
  leaderBoardType: LeaderBoardType
): number {
  const winCount = getPlayerWinsCount(playerId, games, leaderBoardType);
  const playersGames = getPlayerGames(playerId, games, leaderBoardType).length;
  if (playersGames == 0) return 0;
  return Math.round((winCount / playersGames) * 100);
}

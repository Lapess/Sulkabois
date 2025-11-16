import { GameWithTeams } from "@/types/Game";

export function getPlayerWinsCount(
  playerId: number,
  games: GameWithTeams[]
): number {
  const playersGames = getPlayerGames(playerId, games);
  console.log(playerId + " " + playersGames.length);
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
  games: GameWithTeams[]
): GameWithTeams[] {
  return games.filter((game) => {
    let gameTeamPlayerIds = game.team.map((x) => x.player_id);
    return gameTeamPlayerIds.includes(playerId);
  });
}
export function getPlayerWinPercentage(
  playerId: number,
  games: GameWithTeams[]
): number {
  const winCount = getPlayerWinsCount(playerId, games);
  const playersGames = getPlayerGames(playerId, games).length;
  if (playersGames == 0) return 0;
  return Math.round((winCount / playersGames) * 100);
}

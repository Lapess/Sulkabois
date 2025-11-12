import GameCard from "@/components/games/GameCard";

async function GamePage({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = await params;
  const game = null; //await getGames()).find((x) => x.id.toString() == gameId);
  if (!game) return;
  return <GameCard game={game} />;
}

export default GamePage;

import GameCard from "@/components/games/GameCard";
import { getGames } from "@/utils/supabase/client";

async function GamePage({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = await params;
  const game = (await getGames()).find((x) => x.id.toString() == gameId);
  if (!game) return;
  return <GameCard game={game} />;
}

export default GamePage;

import { getGames } from "@/utils/supabase/client";
import { Link } from "@chakra-ui/react";

interface Props {
  sessionId: string;
}
export async function GamesList({ sessionId }: Props) {
  const games = (await getGames()).filter(
    (x) => x.session_id.toString() == sessionId
  );
  return games.map((g, index) => (
    <Link key={g.id} href={"/sessions/" + sessionId + "/" + g.id}>
      Peli {index + 1}
    </Link>
  ));
}

export default GamesList;

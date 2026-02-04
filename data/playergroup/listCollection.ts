import { getPlayerGroups } from "@/services/supabase/playerGroups";
import {
  createListCollection,
  ListCollection,
} from "@chakra-ui/react/collection";

export async function getPlayerGroupListCollection(
  userId: string,
): Promise<ListCollection<{ label: string; value: string }>> {
  let playerGroups = await getPlayerGroups(userId);
  playerGroups = [...playerGroups, { id: 2, name: "testiryhmä" }];
  const collection = createListCollection({
    items: playerGroups.map((group) => ({
      label: group.name,
      value: group.id.toString(),
    })),
  });
  return collection;
}

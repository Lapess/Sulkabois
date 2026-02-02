import { getPlayerGroups } from "@/services/supabase/playerGroups";
import {
  createListCollection,
  ListCollection,
} from "@chakra-ui/react/collection";

export async function getPlayerGroupListCollection(
  userId: string,
): Promise<ListCollection> {
  const playerGroups = await getPlayerGroups(userId);
  const collection = createListCollection({
    items: playerGroups.map((group) => ({
      label: group.name,
      value: group.id,
    })),
  });
  return collection;
}

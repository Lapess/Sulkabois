"use client";
import { getPlayerGroupListCollection } from "@/data/playergroup/listCollection";
import { getSessionUser } from "@/services/supabase/auth/client";
import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const PlayerGroupSelection = () => {
  const [playerGroupCollection, setPlayerGroupCollection] = useState<any>(null);
  useEffect(() => {
    getSessionUser().then((user) => {
      getPlayerGroupListCollection(user?.id!).then((collection) => {
        setPlayerGroupCollection(collection);
      });
    });
  }, []);

  return (
    <Select.Root collection={playerGroupCollection}>
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText>Valitse peliryhmä</Select.ValueText>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
          <Select.ClearTrigger />
        </Select.IndicatorGroup>
      </Select.Control>

      <Select.Positioner>
        <Select.Content>
          {playerGroupCollection?.items?.map(
            (group: { label: string; value: string }) => (
              <Select.Item key={group.value} item={group}>
                {group.label}
              </Select.Item>
            ),
          )}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
};
export default PlayerGroupSelection;

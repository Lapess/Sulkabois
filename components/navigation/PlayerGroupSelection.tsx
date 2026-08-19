"use client";
import { getPlayerGroupListCollection } from "@/data/playergroup/listCollection";
import { createListCollection, ListCollection, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { usePlayerGroup } from "../context/PlayerGroupContext";
import { useAuth } from "@/hooks/useAuth";

const PlayerGroupSelection = () => {
  const { setSelectedPlayerGroup } = usePlayerGroup();
  const { user } = useAuth();

  const [playerGroupCollection, setPlayerGroupCollection] = useState<
    ListCollection<{ label: string; value: string }>
  >(createListCollection({ items: [{ label: "", value: "" }] }));
  useEffect(() => {
    if (!user?.id) return;
    getPlayerGroupListCollection(user.id).then((collection) => {
      setPlayerGroupCollection(collection);
    });
  }, [user]);

  return (
    <Select.Root
      key={playerGroupCollection.items.length} // enforces the component rerender when the collection is updated
      collection={playerGroupCollection}
      size={"lg"}
      onValueChange={(e) => {
        console.log(e.value[0]);
        setSelectedPlayerGroup({
          name: e.items.find((x) => x.value == e.value[0])?.label ?? "",
          id: parseInt(e.value[0]),
        });
      }}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText
            placeholder={"Aloita valitsemalla peliporukka"}
            minW={"300px"}
          />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>

      <Select.Positioner>
        <Select.Content>
          {playerGroupCollection?.items?.map((group) => (
            <Select.Item key={group.value} item={group}>
              {group.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
};
export default PlayerGroupSelection;
